const connect = require('../db/connect');
const pexels = require('../api/pexels');
const standardize = require('../actions/standardize');
const insert = require('../db/insert');
const getMeta = require('../db/getMeta');
const remove = require('../db/remove');

module.exports = async () => {

  const mongo = await connect();

  let url, picture, meta;

  console.log('getting default url ...');
  url = await pexels('default');
  console.log(url);

  console.log('setting 1k default ...');
  meta = await getMeta(mongo, 'default/1k');
  if (meta === null) {
    await insert(mongo, 'default/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
  } else if (meta !== null && meta.source !== url) {
    await remove(mongo, 'default/1k');
    await insert(mongo, 'default/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
  }

  console.log('setting 2k default ...');
  meta = await getMeta(mongo, 'default/2k');
  if (meta === null) {
    await insert(mongo, 'default/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
  } else if (meta !== null && meta.source !== url) {
    await remove(mongo, 'default/2k');
    await insert(mongo, 'default/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
  }

  console.log('getting holiday world url ...');
  url = await pexels('world');
  console.log(url);
  if (url !== null) {
    console.log('setting 1k holiday world ...');
    meta = await getMeta(mongo, 'holiday/world/1k');
    if (meta === null) {
      await insert(mongo, 'holiday/world/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
    } else if (meta !== null && meta.source !== url) {
      await remove(mongo, 'holiday/world/1k');
      await insert(mongo, 'holiday/world/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
    }

    console.log('setting 2k holiday world ...');
    meta = await getMeta(mongo, 'holiday/world/2k');
    if (meta === null) {
      await insert(mongo, 'holiday/world/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
    } else if (meta !== null && meta.source !== url) {
      await remove(mongo, 'holiday/world/2k');
      await insert(mongo, 'holiday/world/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
    }
  } else {
    console.log('cleaning holiday world ...');
    await remove(mongo, 'holiday/world/1k');
    await remove(mongo, 'holiday/world/2k');
  }

  console.log('getting holiday us url ...');
  url = await pexels('us');
  console.log(url);
  if (url !== null) {
    console.log('setting 1k holiday us ...');
    meta = await getMeta(mongo, 'holiday/us/1k');
    if (meta === null) {
      await insert(mongo, 'holiday/us/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
    } else if (meta !== null && meta.source !== url) {
      await remove(mongo, 'holiday/us/1k');
      await insert(mongo, 'holiday/us/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
    }

    console.log('setting 2k holiday us ...');
    meta = await getMeta(mongo, 'holiday/us/2k');
    if (meta === null) {
      await insert(mongo, 'holiday/us/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
    } else if (meta !== null && meta.source !== url) {
      await remove(mongo, 'holiday/us/2k');
      await insert(mongo, 'holiday/us/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
    }
  } else {
    console.log('cleaning holiday us ...');
    await remove(mongo, 'holiday/us/1k');
    await remove(mongo, 'holiday/us/2k');
  }

  console.log('getting holiday ru url ...');
  url = await pexels('ru');
  console.log(url);
  if (url !== null) {
    console.log('setting 1k holiday ru ...');
    meta = await getMeta(mongo, 'holiday/ru/1k');
    if (meta === null) {
      await insert(mongo, 'holiday/ru/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
    } else if (meta !== null && meta.source !== url) {
      await remove(mongo, 'holiday/ru/1k');
      await insert(mongo, 'holiday/ru/1k', Buffer.from(await standardize(url, '1k'), 'base64'), url);
    }

    console.log('setting 2k holiday ru ...');
    meta = await getMeta(mongo, 'holiday/ru/2k');
    if (meta === null) {
      await insert(mongo, 'holiday/ru/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
    } else if (meta !== null && meta.source !== url) {
      await remove(mongo, 'holiday/ru/2k');
      await insert(mongo, 'holiday/ru/2k', Buffer.from(await standardize(url, '2k'), 'base64'), url);
    }
  } else {
    console.log('cleaning holiday ru ...');
    await remove(mongo, 'holiday/ru/1k');
    await remove(mongo, 'holiday/ru/2k');
  }

  mongo.close();

  console.log('-----------------');

  return new Promise(res => res());
}
