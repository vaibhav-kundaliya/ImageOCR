import React from "react";
import Webcam from "react-webcam";
import { CameraFilled } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import ConvertToBlobURLobject from "../../utility/ConvertToBlobURLobject";

export default function CaptureImageComponent({ webCamref, addFile }) {
   const captureImage = async () => {
      const image = webCamref.current.getScreenshot();
      const { BlobUrl, BlobObject } = await ConvertToBlobURLobject(image);
      const id = Date.now();
      addFile({
         id: id,
         file: BlobUrl,
         fileType: "image",
         fileName: `${id}_WebcamImage.jpg`,
         fileObject: BlobObject,
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
