module.exports = async (monogodb, name) => {

  let id = await monogodb.db('wowcutegift').collection('image.files')
    .findOne({ filename: name }, { projection: { _id: 1 } });
  if (id !== null) {
    id = id._id;
  } else {
    return new Promise(resolve => resolve(false));
  }

  const data = await monogodb.db('wowcutegift').collection('image.chunks')
    .findOne({ files_id: id }, { projection: { _id: 0, data: 1 } });

  if (data !== null) {
    let d = data.data;
    d = data.data.toString('base64');
    d = d.replace('dataimage/pngbase64', '');
    d = Buffer.from(d, 'base64');
    return new Promise(resolve => resolve(d));
  }

  return new Promise(resolve => resolve(false))

}
