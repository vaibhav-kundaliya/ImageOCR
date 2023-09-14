import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import UploadImageToServer from "../../utility/UploadImageToServer";
import SendPostRequest from "../../utility/SendPostRequest";

export default function UploadFilesComponent({ addFile }) {
   const customRequest = async ({ file, onSuccess }) => {
      
      const id = Date.now()
      const form = new FormData()
      form.append("file", file, `${id}.jpg`)
      const res = await SendPostRequest(process.env.REACT_APP_SERVER+"saveImage", form)
      
      addFile({
         id: id,
         fileName: `${id}.jpg`
      });

      onSuccess();
   };

   return (
      <div>
         <Upload.Dragger name="file" accept="image/png, image/jpeg, .zip, .rar" multiple={true} customRequest={customRequest} showUploadList={false}>
            <p className="ant-upload-drag-icon">
               <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Kindly upload single or mutiple buisness cards.</p>
         </Upload.Dragger>
      </div>
   );
}
