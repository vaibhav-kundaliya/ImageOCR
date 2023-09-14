const ConvertToBlobURLobject = async (object) => {
   const file = await fetch(object)
   const blobObject = await file.blob()
   
   return {BlobUrl:URL.createObjectURL(blobObject), BlobObject:blobObject}
}


export default ConvertToBlobURLobject