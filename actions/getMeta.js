var fs = require('fs').promises;
const standartize = require('../actions/standardize.js');

module.exports = async (path) => {
  try {
    await fs.stat(`resources/${path}`);
    const data = await fs.readFile(`resources/${path}/meta.json`);
    return new Promise(resolve => resolve(JSON.parse(data))
)
  } catch (error) {
    return new Promise(resolve => resolve(null))
  }
}
