import SendPostRequest from "./SendPostRequest"

const UploadImageToServer = async (object, type, destFileName) => {
   
   
   let formData = new FormData()

   if(type=="webcamImage")
   {
      const file = await fetch(object)
      object = await file.blob()
   }
   
   formData.append("file", object, destFileName)
   
   await SendPostRequest(process.env.REACT_APP_SERVER+"saveImage", formData);
   
}


export default UploadImageToServer