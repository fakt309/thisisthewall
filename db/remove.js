module.exports = async (monogodb, name) => {

  let id = await monogodb.db('wowcutegift').collection('image.files')
    .findOne({ filename: name }, { projection: { _id: 1 } });
  if (id !== null) {
    id = id._id;
  } else {
    return new Promise(resolve => resolve(false));
  }

  await monogodb.db('wowcutegift').collection('image.files')
    .deleteOne({ _id: id });

  await monogodb.db('wowcutegift').collection('image.chunks')
    .deleteOne({ files_id: id });

  return new Promise(resolve => resolve(true));

}
