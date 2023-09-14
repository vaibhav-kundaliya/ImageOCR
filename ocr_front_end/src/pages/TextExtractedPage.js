import React, { useEffect, useState } from "react";
import { List, Row, Col, Button, Spin } from "antd";
import { ExportOutlined } from "@ant-design/icons";
import SendPostRequest from "../utility/SendPostRequest";
import SendGetRequest from "../utility/SendGetRequest";
import { LoadingOutlined } from '@ant-design/icons';

const TextExtractedPage = ({ fileList }) => {
   const [fileWithExtractedText, setFileWithExtractedText] = useState();
   const [isLoading, setLoading] = useState(true);
   useEffect(() => {
      const fetchList = async () => {
         if (fileList.length > 0) {
            const response = await SendPostRequest(process.env.REACT_APP_SERVER + "extractText", fileList);
            setLoading(false);
            setFileWithExtractedText(response.data);
         }
      };
      fetchList();
   }, []);

   const downloadFile = async () => {
      const response = await SendGetRequest(process.env.REACT_APP_SERVER + "/downloadFile");
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "exported_data.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Release the blob URL after the download
      window.URL.revokeObjectURL(url);
   };

   return (
      <div
         style={{
            width: "70%",
            margin: "auto",
         }}
      >
         <div style={{ textAlign: "center" }}>
            <h1> Your Extracted text is here</h1>
         </div>
         <Spin indicator={< LoadingOutlined />}  spinning={isLoading} size="large" tip="Wait we are reading your images...">
            <div style={{ display: "flex", justifyContent: "end", margin: "2rem 0rem" }}>
               <Button type="primary" onClick={downloadFile}>
                  <ExportOutlined /> Export
               </Button>
            </div>
            <List
               itemLayout="vertical"
               size="small"
               pagination={{
                  pageSize: 4,
               }}
               dataSource={fileWithExtractedText}
               renderItem={(item) => (
                  <List.Item key={item.id}>
                     <Row style={{ justifyContent: "space-between" }}>
                        <Col>
                           <List.Item.Meta title={item.id} />
                           <table>
                              <tbody>
                                 <tr>
                                    <th>Email:</th>
                                    <td>{item.email}</td>
                                 </tr>
                                 <tr>
                                    <th>Contact:</th>
                                    <td>{item.contact}</td>
                                 </tr>
                                 <tr>
                                    <th>Website:</th>
                                    <td>{item.website}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </Col>
                        <Col>
                           <img width={272} height={200} alt="logo" src={process.env.REACT_APP_SERVER + "getImage/" + item.fileName} />
                        </Col>
                     </Row>
                  </List.Item>
               )}
            />
         </Spin>
      </div>
   );
};
export default TextExtractedPage;
