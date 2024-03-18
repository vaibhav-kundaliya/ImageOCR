import { React } from "react";
import { Typography, Tabs, Button, Modal } from "antd";
import {
    UploadOutlined,
    CameraOutlined,
    RightOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import UploadFilesComponent from "../components/uploadComponents/UploadFilesComponent";
import CaptureImageComponent from "../components/uploadComponents/CaptureImageComponent";
import DisplayImagesComponent from "../components/displayImagesComponent/DisplayImagesComponent";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function FileCapturePage({
    webCamref,
    fileList,
    addFile,
    removeFile,
    removeAllFiles,
}) {
    const navigate = useNavigate();
    const [modal, contextHolder] = Modal.useModal();

    const confirm = () => {
        modal.confirm({
            title: "Are You Sure?",
            icon: <ExclamationCircleOutlined />,
            content: "You want to delete all images..",
            okText: "Yes",
            cancelText: "Cancel",
            onOk: removeAllFiles,
        });
    };

    const navigateToNextPage = () => {
        navigate("/text-extraction");
    };

    return (
        <div>
            {contextHolder}
            <div
                style={{
                    textAlign: "center",
                    width: "80%",
                    margin: "auto",
                }}
            >
                <Title>We are here to read your images...</Title>
            </div>
            <div
                style={{
                    width: "80%",
                    margin: "auto",
                }}
            >
                <Tabs
                    centered={true}
                    defaultActiveKey="1"
                    items={[
                        {
                            label: (
                                <span
                                    style={{
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    <UploadOutlined />
                                    Upload Files
                                </span>
                            ),
                            key: "1",
                            children: (
                                <UploadFilesComponent
                                    webCamref={webCamref}
                                    addFile={addFile}
                                />
                            ),
                        },
                        {
                            label: (
                                <span
                                    style={{
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    <CameraOutlined />
                                    Capture Image
                                </span>
                            ),
                            key: "2",
                            children: (
                                <CaptureImageComponent
                                    webCamref={webCamref}
                                    addFile={addFile}
                                />
                            ),
                        },
                    ]}
                />
            </div>

            <div
                style={{
                    width: "80%",
                    margin: "2rem auto",
                }}
            >
                <div 
                    style={{
                        marginBottom: "2rem",
                        display: "flex",
                        justifyContent: fileList.length==0 ? "flex-end" : "space-between",
                    }}
                >
                    <Button
                        type="primary"
                        danger
                        onClick={confirm}
                        style={{ display: fileList.length==0 ? "none" : "" }}
                    >
                        Clear <DeleteOutlined />
                    </Button>

                    <Button type="primary" onClick={navigateToNextPage}>
                        {fileList.length==0 ? "Existing Card List" : "Extract Text"} <RightOutlined />
                    </Button>
                </div>

                <DisplayImagesComponent
                    fileList={fileList}
                    removeFile={removeFile}
                />
            </div>
        </div>
    );
}

export default FileCapturePage;
