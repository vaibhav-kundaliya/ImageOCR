import React from "react";
import { v4 as uuid } from "uuid";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import SendPostRequest from "../../utility/SendPostRequest";

export default function UploadFilesComponent({ addFile }) {
   const [messageApi, contextHolder] = message.useMessage();

   const customRequest = async ({ file, onSuccess }) => {
      const id = uuid();
      const form = new FormData();
      const fileExtension = file.type.split("/")[1];
      const newFileName = `${id}.${fileExtension}`;
      form.append("file", file, newFileName);

      try {
         const response = await SendPostRequest(process.env.REACT_APP_SERVER + "saveImage", form);
         addFile({
            id: id,
            fileName: newFileName,
         });
         messageApi.open({
            key: "success",
            type: "success",
            content: response.data,
         });
         onSuccess();
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
