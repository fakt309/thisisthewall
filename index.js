const express = require('express');
const url = require('url');
const fs = require('fs').promises;
const path = require('path');

const cronNews = require('./cron/news.js');
const cronDaily = require('./cron/daily.js');

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
  const resolution = getResolution(req.url);

  try {
    await fs.stat(path.join(__dirname, `/resources/news/world/${resolution}.png`));
    res.sendFile(path.join(__dirname, `/resources/news/world/${resolution}.png`));
    return new Promise(res => res());
  } catch (e) {
    try {
      await fs.stat(path.join(__dirname, `/resources/holiday/world/${resolution}.png`));
      res.sendFile(path.join(__dirname, `/resources/holiday/world/${resolution}.png`));
      return new Promise(res => res());
    } catch (e) {
      res.sendFile(path.join(__dirname, `/resources/default/${resolution}.png`));
      return new Promise(res => res());
    }
  }
});

app.get('/api/us', async (req, res) => {
  const resolution = getResolution(req.url);

  try {
    await fs.stat(path.join(__dirname, `/resources/news/us/${resolution}.png`));
    res.sendFile(path.join(__dirname, `/resources/news/us/${resolution}.png`));
    return new Promise(res => res());
  } catch (e) {
    try {
      await fs.stat(path.join(__dirname, `/resources/holiday/us/${resolution}.png`));
      res.sendFile(path.join(__dirname, `/resources/holiday/us/${resolution}.png`));
      return new Promise(res => res());
    } catch (e) {
      res.sendFile(path.join(__dirname, `/resources/default/${resolution}.png`));
      return new Promise(res => res());
    }
  }
});

app.get('/api/ru', async (req, res) => {
  const resolution = getResolution(req.url);

  try {
    await fs.stat(path.join(__dirname, `/resources/news/ru/${resolution}.png`));
    res.sendFile(path.join(__dirname, `/resources/news/ru/${resolution}.png`));
    return new Promise(res => res());
  } catch (e) {
    try {
      await fs.stat(path.join(__dirname, `/resources/holiday/ru/${resolution}.png`));
      res.sendFile(path.join(__dirname, `/resources/holiday/ru/${resolution}.png`));
      return new Promise(res => res());
    } catch (e) {
      res.sendFile(path.join(__dirname, `/resources/default/${resolution}.png`));
      return new Promise(res => res());
    }
  }
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
