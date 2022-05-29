// const connect = require('./db/connect');
// const pexels = require('./api/pexels');
// const standardize = require('./actions/standardize');
// const insert = require('./db/insert');
// const getMeta = require('./db/getMeta');
// const remove = require('./db/remove');
// const getImage = require('./db/getImage');
// const ttest = async () => {
//   const mongodb = await connect();
//   // const url = await pexels('default');
//   // const picture = Buffer.from(await standardize(url, '1k'), 'base64');
//   // await insert(mongodb, 'default/1k', picture, url);
//   // const meta = await getMeta(mongodb, 'default/2k');
//   // console.log(meta);
//   // await remove(mongodb, 'default/1k')
//   // console.log(await getImage(mongodb, 'default/1k'))
//   mongodb.close();
// }
// ttest();

const express = require('express');
const url = require('url');
const fs = require('fs').promises;
const path = require('path');

const cronNews = require('./cron/news.js');
const cronDaily = require('./cron/daily.js');

const connect = require('./db/connect');
const getImage = require('./db/getImage');

const app = express();

const { updateKey: API_KEY } = require('./config');

const getResolution = (link) => {
  const query = url.parse(link, true).query;
  let resolution = '2k'
  if (query.resolution && (query.resolution === '1k' || query.resolution === '2k' || query.resolution === '4k' || query.resolution === '8k')) {
    resolution = query.resolution;
  }
  return resolution
}

const testApiKey = (link) => {
  const query = url.parse(link, true).query;
  if (query?.key === API_KEY) return true
  return false
}

app.use(express.static(path.join(__dirname, 'resources')));

app.get('/api', async (req, res) => {

  const mongo = await connect();

  const resolution = getResolution(req.url);

  let picture;

  if (picture = await getImage(mongo, `news/world/${resolution}`)) {
  } else if (picture = await getImage(mongo, `holiday/world/${resolution}`)) {
  } else if (picture = await getImage(mongo, `default/${resolution}`)) {}

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': picture.length
  });
  res.end(picture);

  mongo.close();

});

app.get('/api/us', async (req, res) => {

  const mongo = await connect();

  const resolution = getResolution(req.url);

  let picture;

  if (picture = await getImage(mongo, `news/us/${resolution}`)) {
  } else if (picture = await getImage(mongo, `holiday/us/${resolution}`)) {
  } else if (picture = await getImage(mongo, `default/${resolution}`)) {}

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': picture.length
  });
  res.end(picture);

  mongo.close();

});

app.get('/api/ru', async (req, res) => {

  const mongo = await connect();

  const resolution = getResolution(req.url);

  let picture;

  if (picture = await getImage(mongo, `news/ru/${resolution}`)) {
  } else if (picture = await getImage(mongo, `holiday/ru/${resolution}`)) {
  } else if (picture = await getImage(mongo, `default/${resolution}`)) {}

  res.writeHead(200, {
    'Content-Type': 'image/png',
    'Content-Length': picture.length
  });
  res.end(picture);

  mongo.close();

});

app.get('/refresh/daily', async (req, res) => {
  if (testApiKey(req.url)) cronDaily();
  res.send();
});

app.get('/refresh/news', async (req, res) => {
  if (testApiKey(req.url)) cronNews();
  res.send();
});

const PORT = process.env?.PORT || 8080;
const HOST = process.env?.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log('Server started on ' + HOST + ':' + PORT);
});
