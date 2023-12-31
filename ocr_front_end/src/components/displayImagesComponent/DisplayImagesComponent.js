import React from "react";
import { Card, Row, Col, Button, Image } from "antd";

export default function DisplayImagesComponent({ fileList, removeFile }) {
   return (
      <div style={{ display: "flex", justifyContent: "center" }}>
         <Row style={{ width: "fit-content", gap: "1rem" }}>
            {fileList?.map((file) => (
               <Col key={file.id}>
                  <Card
                     hoverable
                     style={{ border: "1px solid gray", padding: "0.5rem" }}
                     cover={
                        file.fileType === "zip" ? (
                           <div style={{ margin: "12px" }}>{file.fileName}</div>
                        ) : (
                           <Image src={`${process.env.REACT_APP_BACKEND_URL}/getImage/${file.fileName}`} alt={file.file} width={250} height={150} />
                        )
                     }
                  >
                     <Button danger onClick={() => removeFile(file)}>
                        Remove
                     </Button>
                  </Card>
               </Col>
            ))}
         </Row>
      </div>
   );
}
