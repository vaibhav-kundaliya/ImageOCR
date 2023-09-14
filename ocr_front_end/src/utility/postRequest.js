const postRequest = async (listOfFiles) => {
   const formData = new FormData();

   for (let i in listOfFiles) 
   {
      console.log(i,listOfFiles[i])
      formData.append("file_" + i, listOfFiles[i].fileObject, listOfFiles[i].fileName);
   }
   await fetch(process.env.REACT_APP_SERVER+"saveImage", {
      method: "POST",
      body: formData,
      withCredentials: true,
   });
};

export default postRequest;
