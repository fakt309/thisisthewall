const connect = require('../db/connect');
const newsapi = require("../api/newsapi.js");
const standardize = require('../actions/standardize');
const insert = require('../db/insert');
const getMeta = require('../db/getMeta');
const remove = require('../db/remove');

module.exports = async () => {

  const mongo = await connect();

  let url, picture, meta;

  console.log('getting news world ...');
  url = await newsapi('world');
  console.log(url);
  if (url !== null) {
    meta = await getMeta(mongo, 'news/world/1k');
    if (meta === null) {
      console.log('insert news world 1k ...');
      await insert(mongo, 'news/world/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
      console.log('insert news world 2k ...');
      await insert(mongo, 'news/world/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
    } if (meta.source === url) {
      console.log('cleaning news world ...');
      await remove(mongo, 'news/world/1k');
      await remove(mongo, 'news/world/2k');
    } else if (meta.source !== url) {
      await remove(mongo, 'news/world/1k');
      await remove(mongo, 'news/world/2k');
      console.log('insert news world 1k ...');
      await insert(mongo, 'news/world/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
      console.log('insert news world 2k ...');
      await insert(mongo, 'news/world/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
    }
  } else {
    console.log('cleaning news world ...');
    await remove(mongo, 'news/world/1k');
    await remove(mongo, 'news/world/2k');
  }

  console.log('getting news us ...');
  url = await newsapi('us');
  console.log(url);
  if (url !== null) {
    meta = await getMeta(mongo, 'news/us/1k');
    if (meta === null) {
      console.log('insert news us 1k ...');
      await insert(mongo, 'news/us/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
      console.log('insert news us 2k ...');
      await insert(mongo, 'news/us/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
    } if (meta.source === url) {
      console.log('cleaning news us ...');
      await remove(mongo, 'news/us/1k');
      await remove(mongo, 'news/us/2k');
    } else if (meta.source !== url) {
      await remove(mongo, 'news/us/1k');
      await remove(mongo, 'news/us/2k');
      console.log('insert news us 1k ...');
      await insert(mongo, 'news/us/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
      console.log('insert news us 2k ...');
      await insert(mongo, 'news/us/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
    }
  } else {
    console.log('cleaning news us ...');
    await remove(mongo, 'news/us/1k');
    await remove(mongo, 'news/us/2k');
  }

  console.log('getting news ru ...');
  url = await newsapi('ru');
  console.log(url);
  if (url !== null) {
    meta = await getMeta(mongo, 'news/ru/1k');
    if (meta === null) {
      console.log('insert news ru 1k ...');
      await insert(mongo, 'news/ru/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
      console.log('insert news ru 2k ...');
      await insert(mongo, 'news/ru/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
    } if (meta.source === url) {
      console.log('cleaning news ru ...');
      await remove(mongo, 'news/ru/1k');
      await remove(mongo, 'news/ru/2k');
    } else if (meta.source !== url) {
      await remove(mongo, 'news/ru/1k');
      await remove(mongo, 'news/ru/2k');
      console.log('insert news ru 1k ...');
      await insert(mongo, 'news/ru/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
      console.log('insert news ru 2k ...');
      await insert(mongo, 'news/ru/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
    }
  } else {
    console.log('cleaning news ru ...');
    await remove(mongo, 'news/ru/1k');
    await remove(mongo, 'news/ru/2k');
  }

  mongo.close();

  console.log('-----------------');

  return new Promise(res => res());
}
