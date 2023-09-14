import { React, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileCapturePage from "./pages/FileCapturePage";
import TextExtractedPage from "./pages/TextExtractedPage";
import SendGetRequest from "./utility/SendGetRequest";

export default function App() {
   const webCamref = useRef(null);
   const storedFileList = JSON.parse(localStorage.getItem("fileList"));
   const [fileList, setFileList] = useState(storedFileList ? storedFileList : []);

   const addFile = (file) => {
      setFileList([file, ...fileList]);
      localStorage.setItem("fileList", JSON.stringify([file, ...fileList]));
   };

   const removeFile = async (removedFile) => {
      const newList = fileList.filter((file) => removedFile.id !== file.id);
      localStorage.setItem("fileList", JSON.stringify(newList));
      await SendGetRequest(process.env.REACT_APP_SERVER + "removeImage/" + removedFile.fileName);
      setFileList(newList);
   };

   return (
      <div>
         <Router>
            <Routes>
               <Route path="/" element={<FileCapturePage webCamref={webCamref} fileList={fileList} addFile={addFile} removeFile={removeFile} />} />
               <Route path="/text-extraction" element={<TextExtractedPage fileList={fileList} />} />
            </Routes>
         </Router>
      </div>
   );
}
