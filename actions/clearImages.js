const fs = require('fs').promises;
const getMeta = require('../actions/getMeta.js');

module.exports = async (path) => {
  let meta = null;
  try {
    await fs.stat(`resources/${path}`);
    meta = await getMeta(path);
    await fs.rm(`resources/${path}`, {recursive: true, force: true});
  } catch (error) { } finally {
    await fs.mkdir(`resources/${path}`);
    if (meta !== null) {
      await fs.writeFile(`resources/${path}/meta.json`, JSON.stringify(meta));
    } else {
      await fs.writeFile(`resources/${path}/meta.json`, JSON.stringify({
        time: Date.now(),
        src: 'none'
      }));
    }
  }
  return new Promise(resolve => resolve(true))
}
