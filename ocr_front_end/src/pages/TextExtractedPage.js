import React, { useEffect, useState } from "react";
import {
    List,
    Row,
    Col,
    Button,
    Spin,
    message,
    Typography,
    Image,
    Skeleton,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import SendPostRequest from "../utility/SendPostRequest";
import { LoadingOutlined } from "@ant-design/icons";
import { json, useNavigate } from "react-router-dom";
import DownloadComponent from "../components/downloadComponents/DownloadComponent";

const { Paragraph } = Typography;

const TextExtractedPage = ({ fileList, setFileList }) => {
    let initCardlist = [];
    if (localStorage.getItem("ExtractedTextList"))
        initCardlist = JSON.parse(localStorage.getItem("ExtractedTextList"));

    const [cardList, setCardList] = useState(initCardlist);
    const [isLoading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const updateCardList = (newData) => {
        localStorage.setItem("ExtractedTextList", JSON.stringify(newData));
        setCardList([...newData]);
    };

    const removeFromFetchedList = (id) => {
        const cardList = JSON.parse(localStorage.getItem("fileList"));
        let newfetchedList = [];
        cardList.forEach((element) => {
            if (element.id !== id) newfetchedList.push(element);
        });
        localStorage.setItem("fileList", JSON.stringify(newfetchedList));
        setFileList([...newfetchedList]);
    };

    const goToFileCapturePage = () => {
        navigate("/");
    };

    const updateExtractedText = (event, id, perameter) => {
        const updatedList = cardList;
        for (let i = 0; i < cardList.length; i++) {
            if (updatedList[i].id === id) updatedList[i][perameter] = event;
        }
        updateCardList(updatedList);
    };

    useEffect(() => {
        const fetchList = async (fileList) => {
            try {
                for (let i = 0; i < fileList.length; i++) {
                    const element = fileList[i];
                    setLoading(true);
                    const response = await SendPostRequest("extractText", [
                        element,
                    ]);
                    if (response) {
                        const data = response.data[0];
                        messageApi.open({
                            key: "success",
                            type: "success",
                            content: "Your data is here",
                        });
                        updateCardList([data, ...cardList]);
                        removeFromFetchedList(data.id);
                    }
                }
            } catch (error) {
                messageApi.open({
                    key: "error",
                    type: "error",
                    content: error.data,
                });
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        if (fileList.length) fetchList(fileList);
    }, []);

    const removeCard = (id) => {
        const existingList = JSON.parse(
            localStorage.getItem("ExtractedTextList")
        );
        const updatedList = existingList.filter((element) => {
            return element.id !== id;
        });
        updateCardList(updatedList);
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "2rem 0rem",
                }}
            >
                <Button onClick={goToFileCapturePage}>
                    <LeftOutlined /> Go Back
                </Button>

                <DownloadComponent data={cardList} />
            </div>
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    xs: { pageSize: 4 },
                    sm: { pageSize: 4 },
                    md: { pageSize: 6 },
                    lg: { pageSize: 6 },
                    xl: { pageSize: 6 },
                    xxl: { pageSize: 9 },
                }}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 2,
                    xl: 2,
                    xxl: 3,
                }}
                dataSource={
                    isLoading ? [{ Loading: true }, ...cardList] : cardList
                }
                renderItem={(item) => {
                    if (!item.Loading) {
                        return (
                            <List.Item
                                key={item.id}
                                style={{
                                    border: "1px solid gray",
                                    padding: "1rem",
                                }}
                            >
                                <Row
                                    style={{
                                        alignItems: "space-between",
                                        flexDirection: "column",
                                        textAlign: "left",
                                        minHeight: "500px",
                                    }}
                                >
                                    <Col>
                                        <Image
                                            alt="logo"
                                            src={
                                                process.env
                                                    .REACT_APP_BACKEND_URL +
                                                "getImage/" +
                                                item.fileName
                                            }
                                        />
                                    </Col>
                                    <Col>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Company Name:</th>
                                                    <Paragraph
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                        editable={{
                                                            onChange: (event) =>
                                                                updateExtractedText(
                                                                    event,
                                                                    item.id,
                                                                    "companyName"
                                                                ),
                                                        }}
                                                    >
                                                        {item.companyName}
                                                    </Paragraph>
                                                </tr>
                                                <tr>
                                                    <th>Email:</th>
                                                    <td>
                                                        <Paragraph
                                                            style={{
                                                                marginBottom: 0,
                                                            }}
                                                            editable={{
                                                                onChange: (
                                                                    event
                                                                ) =>
                                                                    updateExtractedText(
                                                                        event,
                                                                        item.id,
                                                                        "email"
                                                                    ),
                                                            }}
                                                        >
                                                            {item.email}
                                                        </Paragraph>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Contact:</th>
                                                    <Paragraph
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                        editable={{
                                                            onChange: (event) =>
                                                                updateExtractedText(
                                                                    event,
                                                                    item.id,
                                                                    "contact"
                                                                ),
                                                        }}
                                                    >
                                                        {item.contact}
                                                    </Paragraph>
                                                </tr>
                                                <tr>
                                                    <th>Website:</th>
                                                    <Paragraph
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                        editable={{
                                                            onChange: (event) =>
                                                                updateExtractedText(
                                                                    event,
                                                                    item.id,
                                                                    "website"
                                                                ),
                                                        }}
                                                    >
                                                        {item.website}
                                                    </Paragraph>
                                                </tr>
                                                <tr>
                                                    <div
                                                        style={{
                                                            marginTop: "1rem",
                                                        }}
                                                    ></div>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Col>
                                    <Col>
                                        <Button
                                            danger
                                            onClick={() => {
                                                removeCard(item.id);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </List.Item>
                        );
                    } else {
                        return (
                            <List.Item
                                key={item.id}
                                style={{
                                    border: "1px solid gray",
                                    padding: "1rem",
                                }}
                            >
                                <Row
                                    style={{
                                        alignItems: "space-between",
                                        flexDirection: "column",
                                        textAlign: "left",
                                        minHeight: "500px",
                                    }}
                                >
                                    <Col>
                                        <Image
                                            width={200}
                                            height={200}
                                            src="error"
                                            fallback="data:image/png;base64,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"
                                        />
                                    </Col>

                                    <Col>
                                        <Skeleton
                                            active={true}
                                            style={{
                                                width: "100%",
                                            }}
                                        />
                                    </Col>

                                    <Col>
                                        <Skeleton.Button />
                                    </Col>
                                </Row>
                            </List.Item>
                        );
                    }
                }}
            />
        </div>
    );
};
export default TextExtractedPage;
