import React from "react";
import { Typography, Tabs, Button } from "antd";
import { UploadOutlined, CameraOutlined, RightOutlined } from "@ant-design/icons";
import UploadFilesComponent from "../components/uploadComponents/UploadFilesComponent";
import CaptureImageComponent from "../components/uploadComponents/CaptureImageComponent";
import DisplayImagesComponent from "../components/displayImagesComponent/DisplayImagesComponent";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function FileCapturePage({webCamref, fileList, addFile, removeFile }) {
   const navigate = useNavigate();
   
   const sendPostRequest = () => {
      navigate("/text-extraction");
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
