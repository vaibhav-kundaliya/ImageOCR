import React, { useEffect, useState } from "react";
import { List, Row, Col, Button, Spin, message, Typography } from "antd";
import { ExportOutlined, LeftOutlined } from "@ant-design/icons";
import SendPostRequest from "../utility/SendPostRequest";
import SendGetRequest from "../utility/SendGetRequest";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import downloadFile from "../utility/downloadCSVfile";

const { Paragraph } = Typography;

const TextExtractedPage = ({ fileList, setFileList }) => {
   const [fileWithExtractedText, setFileWithExtractedText] = useState([]);
   const [isLoading, setLoading] = useState(true);
   const [messageApi, contextHolder] = message.useMessage();
   const navigate = useNavigate();

   const isFilesUpdated = () => {
      const StoredList = JSON.parse(localStorage.getItem("ExtractedTextList"));
      const minLenght = StoredList.length < fileList.length ? StoredList.length : fileList.length;
      for (let i = 0; i < minLenght; i++) {
         if (StoredList[i].id !== fileList[i].id) return true;
      }
      return false;
   };

   useEffect(() => {
      const fetchList = async () => {
         try {
            if (!localStorage.getItem("ExtractedTextList") || isFilesUpdated()) {
               const response = await SendPostRequest("extractText", fileList);
               setFileWithExtractedText(response.data);
               localStorage.setItem("ExtractedTextList", JSON.stringify(response.data));
               if (response)
                  messageApi.open({
                     key: "success",
                     type: "success",
                     content: "Your data is here",
                  });
            } else {
               setFileWithExtractedText(JSON.parse(localStorage.getItem("ExtractedTextList")));
            }

            setLoading(false);
         } catch (error) {
            messageApi.open({
               key: "error",
               type: "error",
               content: error.data,
            });
            setLoading(false);
         }
      };
      fetchList();
   }, []);

   const goToFileCapturePage = () => {
      navigate("/");
   };

   const updateExtractedText = (event, id, perameter) => {
      const updatedList = fileWithExtractedText;
      for (let i = 0; i < fileWithExtractedText.length; i++) {
         if (updatedList[i].id === id) updatedList[i][perameter] = event;
      }
      setFileWithExtractedText([...updatedList]);
      localStorage.setItem("ExtractedTextList", JSON.stringify([...updatedList]));
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
                                    <Paragraph
                                       style={{ marginBottom: 0 }}
                                       editable={{
                                          onChange: (event) => updateExtractedText(event, item.id, "email"),
                                       }}
                                    >
                                       {item.email}
                                    </Paragraph>
                                 </tr>
                                 <tr>
                                    <th>Contact:</th>
                                    <Paragraph
                                       style={{ marginBottom: 0 }}
                                       editable={{
                                          onChange: (event) => updateExtractedText(event, item.id, "contact"),
                                       }}
                                    >
                                       {item.contact}
                                    </Paragraph>
                                 </tr>
                                 <tr>
                                    <th>Website:</th>
                                    <Paragraph
                                       style={{ marginBottom: 0 }}
                                       editable={{
                                          onChange: (event) => updateExtractedText(event, item.id, "website"),
                                       }}
                                    >
                                       {item.website}
                                    </Paragraph>
                                 </tr>
                              </tbody>
                           </table>
                        </Col>
                        <Col>
                           <img width={272} height={200} alt="logo" src={process.env.REACT_APP_BACKEND_URL + "getImage/" + item.fileName} />
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
