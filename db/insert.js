module.exports = async (monogodb, name, file, url) => {

  const result = await monogodb.db('wowcutegift').collection('image.files')
    .insertOne({
      length: file.toString().length,
      chunkSize: 255,
      uploadDate: new Date(),
      //md5: ,
      filename: name,
      contentType: 'image/png',
      //aliases: ,
      metadata: {
        source: url
      }
    });

  let lastN = await monogodb.db('wowcutegift').collection('image.chunks')
    .find()
    .project({ _id: 0, n: 1 })
    .sort({ n: -1 })
    .limit(1)
    .toArray();
  if (lastN[0] === undefined) {
    lastN = -1;
  } else {
    lastN = lastN[0].n
  }

  const id = result.insertedId;

  await monogodb.db('wowcutegift').collection('image.chunks')
    .insertOne({
      files_id: result.insertedId,
      n: lastN+1,
      data: file
    });

  return new Promise(resolve => resolve())

}
