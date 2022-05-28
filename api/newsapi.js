const axios = require("axios").default;
const natural = require('natural');

const { newsapiKey: API_KEY } = require('./config');

const getNominative = (string) => {
  string = string.split(' ')
  for (let i = 0; i < string.length; i++) {
    if (!/\p{Lu}/u.test(string[i][0])) {
      string.splice(i, 1);
      i--;
    }
  }
  return string.join(' ')
}

// const sources = {
//   world: [
//     'the-wall-street-journal',
//     'nytimes.com',
//     'washingtonpost.com'
//   ].join(','),
//   us: [
//     'wsj.com',
//     'nytimes.com',
//     'usatoday.com',
//     'washingtonpost.com',
//     'latimes.com',
//     'tampabay.com',
//     'nypost.com',
//     'chicagotribune.com',
//     'startribune.com',
//     'newsday.com',
//   ].join(','),
//   ru: [
//     'meduza.io',
//     'zona.media',
//     'fontanka.ru',
//     'rosbalt.ru',
//     'ovdinfo.org',
//     'theins.ru',
//     'thebell.io',
//     'currenttime.tv'
//   ].join(',')
// }

// const langs = {
//   world: 'en',
//   us: 'en',
//   ru: 'ru'
// }

module.exports = async (country) => {

  const c = country === 'world' ? 'us' : country;

  const options = {
    method: 'GET',
    url: `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=${c}`,
    params: {},
    headers: {}
  };

  try {
    const response = await axios.request(options);

    let news = response.data.articles;
    for (let i = 0; i < news.length; i++) {
      news[i].id = i;
    }

    let mapNews = new Map()

    for (let i of news) {
      for (let j of news) {
        if (i.title === j.title || i.source.id === j.source.id) continue;
        if (natural.JaroWinklerDistance(getNominative(i.title), getNominative(j.title)) > 0.7) {
          if (mapNews.has(i.id)) {
            let count = mapNews.get(i.id)
            count++;
            mapNews.set(i.id, count);
          } else {
            mapNews.set(i.id, 1)
          }
        }
      }
    }

    let answer = []
    let max = 0
    mapNews.forEach((v, k) => {
      if (v == max) {
        answer.push(k);
      } else if (v > max) {
        max = v;
        answer = [k];
      }
    })

    if (max < 3) new Promise(resolve => resolve(null))

    let endNews = []
    for (let i = 0; i < answer.length; i++) {
      endNews.push(news.find(n => n.id === answer[i]));
    }

    let output = null
    let date = new Date("1000-01-01T00:00:00Z").valueOf();
    for (var i = 0; i < endNews.length; i++) {
      const d = new Date(endNews[i].publishedAt).valueOf();
      if (output === null || d > date) {
        output = endNews[i];
        date = d;
      }
    }

    if (output.urlToImage && output.urlToImage !== '') {
      return new Promise(resolve => resolve(output.urlToImage))
    } else {
      return new Promise(resolve => resolve(null))
    }
  } catch (error) {
    return new Promise(resolve => resolve(null))
  }
}
