const { createCanvas, loadImage } = require('canvas');
const Jimp = require('jimp');

module.exports = async (url, standart = '2k') => {
  let resolution;
  if (standart === '1k') {
    resolution = [ 1280, 720 ];
  } else if (standart === '2k') {
    resolution = [ 1920, 1080 ];
  } else if (standart === '4k') {
    resolution = [ 3840, 2160 ];
  } else if (standart === '8k') {
    resolution = [ 7680, 4320 ];
  }

  const canvas = createCanvas(resolution[0], resolution[1]);
  const ctx = canvas.getContext('2d');

  let img = await Jimp.read(url);

  if (img.bitmap.width < resolution[0] && img.bitmap.height < resolution[1]) {
    let img1 = img.clone();
    img1.cover(resolution[0], resolution[1], Jimp.HORIZONTAL_ALIGN_CENTER, Jimp.VERTICAL_ALIGN_MIDDLE);
    img1.blur(Math.ceil(0.005*resolution[1]));
    img1 = await loadImage(await img1.getBase64Async(Jimp.MIME_PNG));
    ctx.drawImage(img1, 0, 0, img1.naturalWidth, img1.naturalHeight);
    // let img2 = img.clone();
    // img2 = await loadImage(await img2.getBase64Async(Jimp.MIME_PNG));
    // ctx.drawImage(img2, (resolution[0]-img2.naturalWidth)/2, (resolution[1]-img2.naturalHeight)/2, img2.naturalWidth, img2.naturalHeight);
  } else if (img.bitmap.width < resolution[0] || img.bitmap.height < resolution[1]) {
    let img1 = img.clone();
    img1.cover(resolution[0], resolution[1], Jimp.HORIZONTAL_ALIGN_CENTER, Jimp.VERTICAL_ALIGN_MIDDLE);
    img1.blur(Math.ceil(0.005*resolution[1]));
    img1 = await loadImage(await img1.getBase64Async(Jimp.MIME_PNG));
    ctx.drawImage(img1, 0, 0, img1.naturalWidth, img1.naturalHeight);
    // let img2 = img.clone();
    // img2.contain(resolution[0], resolution[1], Jimp.HORIZONTAL_ALIGN_CENTER, Jimp.VERTICAL_ALIGN_MIDDLE);
    // img2 = await loadImage(await img2.getBase64Async(Jimp.MIME_PNG));
    // ctx.drawImage(img2, 0, 0, img2.naturalWidth, img2.naturalHeight);
  } else {
    img.cover(resolution[0], resolution[1], Jimp.HORIZONTAL_ALIGN_CENTER, Jimp.VERTICAL_ALIGN_MIDDLE);
    img = await loadImage(await img.getBase64Async(Jimp.MIME_PNG));
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
  }

  return new Promise(resolve => {
    resolve(canvas.toDataURL('png', 1))
  });
}
