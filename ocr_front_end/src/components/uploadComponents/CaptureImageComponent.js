import React from "react";
import Webcam from "react-webcam";
import { CameraFilled } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import UploadImageToServer from "../../utility/UploadImageToServer";

export default function CaptureImageComponent({ webCamref, addFile }) {
   const captureImage = async () => {
      const image = webCamref.current.getScreenshot();
      const id = Date.now();
      await UploadImageToServer(image, "webcamImage", `${id}.jpg`);
      addFile({
         id: id,
         fileName: `${id}.jpg`
      });
   };

   return (
      <div>
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
