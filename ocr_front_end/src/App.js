import { React, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileCapturePage from "./pages/FileCapturePage";
import TextExtractedPage from "./pages/TextExtractedPage";
import SendGetRequest from "./utility/SendGetRequest";
import { message } from "antd";

export default function App() {
   const webCamref = useRef(null);
   const storedFileList = JSON.parse(localStorage.getItem("fileList"));
   const [fileList, setFileList] = useState(storedFileList ? storedFileList : []);
   const [messageApi, contextHolder] = message.useMessage();

   const addFile = (file) => {
      const newList = fileList;
      newList.push(file);
      newList.reverse();
      setFileList([...newList]);
      localStorage.setItem("fileList", JSON.stringify([...newList]));
   };

   const removeFile = async (removedFile) => {
      const newList = fileList.filter((file) => removedFile.id !== file.id);
      try {
         const response = await SendGetRequest(process.env.REACT_APP_SERVER + "removeImage/" + removedFile.fileName);
         messageApi.open({
            key: "success",
            type: "success",
            content: response.data,
         });
      } catch (error) {
         console.log(error)
         messageApi.open({
            key: "error",
            type: "error",
            content: error.data,
         });
      }
      setFileList(newList);
      localStorage.setItem("fileList", JSON.stringify(newList));
   };

   const removeAllFiles = async () => {
      try {
         const response = await SendGetRequest(process.env.REACT_APP_SERVER + "removeAllImages");
         messageApi.open({
            key: "success",
            type: "success",
            content: response.data,
         });
         setFileList([]);
         localStorage.removeItem("fileList");
      } catch (error) {
         messageApi.open({
            key: "error",
            type: "error",
            content: error.data,
         });
      }
   };

   return (
      <div>
         {contextHolder}
         <Router>
            <Routes>
               <Route path="/" element={<FileCapturePage webCamref={webCamref} fileList={fileList} addFile={addFile} removeFile={removeFile} removeAllFiles={removeAllFiles} />} />
               <Route path="/text-extraction" element={<TextExtractedPage fileList={fileList} setFileList={setFileList} />} />
            </Routes>
         </Router>
      </div>
   );
}
