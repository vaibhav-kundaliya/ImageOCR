import React from "react";
import Webcam from "react-webcam";
import { CameraFilled } from "@ant-design/icons";
import { Button, Tooltip, message } from "antd";
import SendPostRequest from "../../utility/SendPostRequest";
import { v4 as uuid } from "uuid";

export default function CaptureImageComponent({ webCamref, addFile }) {
   const [messageApi, contextHolder] = message.useMessage();

   const captureImage = async () => {
      const image = webCamref.current.getScreenshot();
      const id = uuid();
      const file = await fetch(image);
      const object = await file.blob();
      let formData = new FormData();
      formData.append("file", object, `${id}.jpg`);
      try {
         const response = await SendPostRequest(process.env.REACT_APP_SERVER + "saveImage", formData);
         addFile(
            {
               id: id,
               fileName: `${id}.jpg`,
            },
         );
         messageApi.open({
            key: "success",
            type: "success",
            content: response.data,
         });
      } catch (error) {
         messageApi.open({
            key: "error",
            type: "error",
            content: "This is an error message",
         });
      }
   };

   return (
      <div>
         {contextHolder}
         <Webcam width={"100%"} ref={webCamref} screenshotFormat="image/jpeg" mirrored={true} screenshotQuality={1} />
         <div
            style={{
               display: "flex",
               justifyContent: "flex-end",
               gap: "1rem",
            }}
         >
            <Tooltip title="Capture">
               <Button type="primary" shape="circle" size="large" onClick={captureImage} icon={<CameraFilled />} />
            </Tooltip>
         </div>
      </div>
   );
}
