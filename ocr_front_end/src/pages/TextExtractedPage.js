import React, { useEffect, useState } from "react";
import { List, Row, Col, Button, Spin, message } from "antd";
import { ExportOutlined, LeftOutlined } from "@ant-design/icons";
import SendPostRequest from "../utility/SendPostRequest";
import SendGetRequest from "../utility/SendGetRequest";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const TextExtractedPage = ({ fileList, setFileList }) => {
   const [fileWithExtractedText, setFileWithExtractedText] = useState();
   const [isLoading, setLoading] = useState(true);
   const [messageApi, contextHolder] = message.useMessage();
   const navigate = useNavigate()

   useEffect(() => {
      const fetchList = async () => {
         try {
            const response = await SendPostRequest(process.env.REACT_APP_SERVER + "extractText", fileList);
            setFileWithExtractedText(response.data);
            setLoading(false);
            if(response)
            messageApi.open({
               key:"success",
               type: "success",
               content: "Your data is here",
            });
         } catch (error) {
            messageApi.open({
               key:"error",
               type: "error",
               content: error.response.data,
            });
            setLoading(false);
         }
      };
      fetchList();
   }, []);

   const goToFileCapturePage = () => {
      navigate("/")
   }

   const downloadFile = async () => {
      try {
         const response = await SendGetRequest(process.env.REACT_APP_SERVER + "/downloadFile");
         const url = window.URL.createObjectURL(new Blob([response.data]));
         const a = document.createElement("a");
         a.href = url;
         a.download = "export_data.csv";
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
         window.URL.revokeObjectURL(url);
      } catch (error) {
         messageApi.open({
            type: "error",
            content: error.response.data,
         });
      }
   };

   return (
      <div
         style={{
            width: "70%",
            margin: "auto",
         }}
      >
         {contextHolder}
         <div style={{ textAlign: "center" }}>
            <h1> Your Extracted text will be displayed here</h1>
         </div>
         <Spin indicator={<LoadingOutlined />} spinning={isLoading} size="large" tip="Wait we are reading your images...">
            <div style={{ display: "flex", justifyContent: "space-between", margin: "2rem 0rem" }}>
               <Button onClick={goToFileCapturePage}>
               <LeftOutlined /> Go Back
               </Button>
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
                           <List.Item.Meta title="Buisness Card" />
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
