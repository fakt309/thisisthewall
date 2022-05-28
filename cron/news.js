const newsapi = require("../api/newsapi.js");
const setImages = require('../actions/setImages.js');
const getMeta = require('../actions/getMeta.js');
const clearImages = require('../actions/clearImages.js');

module.exports = async () => {
  let url, meta

  console.log('setting world news ...');
  url = await newsapi('world');
  console.log(url);
  if (url !== null) {
    meta = await getMeta('news/world');
    if (meta !== null) {
      if (meta.src === url) {
        console.log('clear world news ...');
        await clearImages('news/world');
      } else {
        console.log('load world news ...');
        await setImages(url, 'news/world');
      }
    } else {
      console.log('load world news ...');
      await setImages(url, 'news/world');
    }
  } else {
    console.log('clear world news ...');
    await clearImages('news/world');
  }

  console.log('setting us news ...');
  url = await newsapi('us');
  console.log(url);
  if (url !== null) {
    meta = await getMeta('news/us');
    if (meta !== null) {
      if (meta.src === url) {
        console.log('clear us news ...');
        await clearImages('news/us');
      } else {
        console.log('load us news ...');
        await setImages(url, 'news/us');
      }
    } else {
      console.log('load us news ...');
      await setImages(url, 'news/us');
    }
  } else {
    console.log('clear us news ...');
    await clearImages('news/us');
  }

  console.log('setting ru news ...');
  url = await newsapi('ru');
  console.log(url);
  if (url !== null) {
    meta = await getMeta('news/ru');
    if (meta !== null) {
      if (meta.src === url) {
        console.log('clear ru news ...');
        await clearImages('news/ru');
      } else {
        console.log('load ru news ...');
        await setImages(url, 'news/ru');
      }
    } else {
      console.log('load ru news ...');
      await setImages(url, 'news/ru');
    }
  } else {
    console.log('clear ru news ...');
    await clearImages('news/ru');
  }

  return new Promise(res => res());
}
