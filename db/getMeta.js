module.exports = async (monogodb, name) => {

  let meta = await monogodb.db('wowcutegift').collection('image.files')
    .findOne({ filename: name }, { projection: { _id: 0, metadata: 1 } });

  if (meta !== null) {
    return new Promise(resolve => resolve(meta.metadata))
  }

  return new Promise(resolve => resolve(null))

}
