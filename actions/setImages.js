var fs = require('fs').promises;
const standartize = require('../actions/standardize.js');

module.exports = async (url, path) => {
  let data;
  try {
    await fs.stat(`resources/${path}`);
    await fs.rm(`resources/${path}`, {recursive: true, force: true});
  } catch (error) { } finally {
    await fs.mkdir(`resources/${path}`);

    console.log('setting 1k ...');
    await fs.writeFile(
      `resources/${path}/1k.png`,
      Buffer.from((await standartize(url, '1k')).replace(/^data:image\/\w+;base64,/, ""), 'base64')
    );

    console.log('setting 2k ...');
    await fs.writeFile(
      `resources/${path}/2k.png`,
      Buffer.from((await standartize(url, '2k')).replace(/^data:image\/\w+;base64,/, ""), 'base64')
    );

    // console.log('setting 4k ...');
    // await fs.writeFile(
    //   `resources/${path}/4k.png`,
    //   Buffer.from((await standartize(url, '4k')).replace(/^data:image\/\w+;base64,/, ""), 'base64')
    // );

    // await fs.writeFile(
    //   `resources/${path}/8k.png`,
    //   Buffer.from((await standartize(url, '8k')).replace(/^data:image\/\w+;base64,/, ""), 'base64')
    // );

    await fs.writeFile(
      `resources/${path}/meta.json`,
      JSON.stringify({
        time: Date.now(),
        src: url
      })
    );
  }
  return new Promise(resolve => resolve(true))
}
