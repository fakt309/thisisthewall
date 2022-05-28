const pexels = require('../api/pexels.js');
const setImages = require('../actions/setImages.js');
const getMeta = require('../actions/getMeta.js');
const clearImages = require('../actions/clearImages.js');

module.exports = async () => {
  let url, photo

  console.log('setting default ...');
  url = await pexels('default');
  console.log(url);
  await setImages(url, 'default');

  console.log('checking for world holidays ...');
  url = await pexels('world');
  console.log(url);
  if (url !== null) {
    console.log('world holidays was found');
    await setImages(url, 'holiday/world');
  } else {
    console.log('clear world holidays');
    await clearImages('holiday/world');
  }

  console.log('checking for us holidays ...');
  url = await pexels('us');
  console.log(url);
  if (url !== null) {
    console.log('us holidays was found');
    await setImages(url, 'holiday/us');
  } else {
    console.log('clear us holidays');
    await clearImages('holiday/us');
  }

  console.log('checking for ru holidays ...');
  url = await pexels('ru');
  console.log(url);
  if (url !== null) {
    console.log('ru holidays was found');
    await setImages(url, 'holiday/ru');
  } else {
    console.log('clear ru holidays');
    await clearImages('holiday/ru');
  }

  return new Promise(res => res());
}
