import React, { useState, useRef } from "react";
import { Typography, Tabs, Button } from "antd";
import { UploadOutlined, CameraOutlined, RightOutlined } from "@ant-design/icons";
import UploadFilesComponent from "../components/uploadComponents/UploadFilesComponent";
import CaptureImageComponent from "../components/uploadComponents/CaptureImageComponent";
import DisplayImagesComponent from "../components/displayImagesComponent/DisplayImagesComponent";
import postRequest from "../utility/postRequest";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function FileCapturePage() {
   const webCamref = useRef(null);
   const [fileList, setFileList] = useState([]);
   const navigate = useNavigate()

   const addFile = (file) => {
      console.log(file)
      setFileList([file, ...fileList]);
   };

   const removeFile = (removedFile) => {
      let newList = [];
      fileList.map((file) => {
         if (removedFile !== file.id) newList.push(file);
      });
      setFileList(newList);
   };

   const sendPostRequest = () => {
      postRequest(fileList);
      navigate("/text-extraction")
   };

   return (
      <div>
         <div
            style={{
               textAlign: "center",
               width: "80%",
               margin: "auto",
            }}
         >
            <Title>We are here to read your images...</Title>
         </div>

         <div
            style={{
               width: "80%",
               margin: "auto",
            }}
         >
            <Tabs
               centered={true}
               defaultActiveKey="1"
               items={[
                  {
                     label: (
                        <span
                           style={{
                              fontSize: "1.2rem",
                           }}
                        >
                           <UploadOutlined />
                           Upload Files
                        </span>
                     ),
                     key: "1",
                     children: <UploadFilesComponent webCamref={webCamref} addFile={addFile} />,
                  },
                  {
                     label: (
                        <span
                           style={{
                              fontSize: "1.2rem",
                           }}
                        >
                           <CameraOutlined />
                           Capture Image
                        </span>
                     ),
                     key: "2",
                     children: <CaptureImageComponent webCamref={webCamref} addFile={addFile} />,
                  },
               ]}
            />
         </div>

         <div
            style={{
               width: "80%",
               margin: "2rem auto",
            }}
         >
            <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "flex-end" }}>
               {fileList?.length > 0 ? (
                  <Button type="primary" onClick={sendPostRequest}>
                     Next <RightOutlined />
                  </Button>
               ) : (
                  <></>
               )}
            </div>

            <DisplayImagesComponent fileList={fileList} removeFile={removeFile} />
         </div>
      </div>
   );
}

export default FileCapturePage;
