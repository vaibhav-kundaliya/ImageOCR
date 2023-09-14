import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";

export default function UploadFilesComponent({ addFile }) {
   const customRequest = ({ file, onSuccess }) => {
      let fileType;
      if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") fileType = "image";
      else {
         fileType = "zip";
      }
      const id = Date.now()
      addFile({
         id: id,
         file: URL.createObjectURL(file),
         fileType: fileType,
         fileName: `${id}_${file.name}`,
         fileObject: file,
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
