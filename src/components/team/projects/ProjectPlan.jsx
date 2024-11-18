import React, { useState, useEffect, useRef } from 'react'
import FileHeader from "../../resources/FileHeader";
import { api } from '../../../utilities/axios-gateway';
import { Button, Space, Layout, Divider, Spin, Tabs, Row, Col } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useParams } from 'react-router';
import TableComponents from "../../resources/TableComponents";
import { useReactToPrint } from 'react-to-print';
import "../../../styles/Styles.css";
import {
    DeleteOutlined,
    EditOutlined,
    OrderedListOutlined,
    CloudUploadOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import Swal from 'sweetalert2';
import { LoadingSwal } from '../../resources/swal/LoadingSwal';
import csrfCookie from '../../../utilities/csrf-cookie';
import { DeleteSwalConfig } from '../../resources/swal/DeleteSwalConfig';
import ModalComponents from '../../resources/ModalComponents';
import AddLOPE from '../../resources/modal_fields/lope_modal/AddLOPE';
import EditLOPE from '../../resources/modal_fields/lope_modal/EditLOPE';
import createSwal from '../../resources/swal/CreateSwalAlert';
import PDFViewer from './PDFViewer';
import UploadProjectPlan from '../../resources/modal_fields/UploadProjectPlan';
import { axios } from '../../../axios-client';
import EditUploadProjectPlan from '../../resources/modal_fields/EditUploadProjectPlan';
const Toast = createSwal();


function ProjectPlan({ sowCatData, projectData }) {
    const { id } = useParams();
    const [isUploadModal, setIsUploadModal] = useState(null);
    const [submitedData, setSubmittedData] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    //MODAL CONFIGURATION STATE
    const [modalTitle, setModalTitle] = useState();
    const [isShowModal, isSetShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const footer = useRef(true);
    const [modalWidth, setModalWidth] = useState();

    const [projectPlan, setProjectPlan] = useState([])

    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState([]);
    const [updateFormData, setUpdateFormData] = useState([]);
    const [removeFileFunction, setRemoveFileFunction] = useState(null); // Store the remove file function

    const [trigger, setTrigger] = useState(null);


    //FETCH PROJECT PLAN DATA
    const fetchProjectPlan = async () => {
        setIsLoading(true)

        api
            .get(`/project-plan/b3-project/${id}`)
            .then(function ({ data }) {
                console.log(data)
                setProjectPlan(data);
                setIsLoading(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    //IMPORT PROJECT PLAN
    const importProjectPlan = () => {
        setFiles([])
        setFormData([])
        setIsUploadModal(true);
        setModalTitle("Import Project Plan - PDF");
        isSetShowModal(true);
    };

    //UPDATE PROJECT PLAN
    const updateProjectPlan = (singleProjectPlan) => {
        setFiles([])
        setUpdateFormData([])
        setUpdateFormData((prevFormData) => [
            ...prevFormData,
            { id: singleProjectPlan.id, name: singleProjectPlan.name, file: singleProjectPlan.file },
        ]);
        setIsUploadModal(true);
        setModalTitle("Update Project Plan - PDF");
        isSetShowModal(true);
        setTrigger(true);
    };


    const handleCancel = () => {
        setFiles([])
        setFormData([])
        setIsUploadModal(false)
        isSetShowModal(false);
        setTrigger(false)
    };

    const removeFileIfNotChange = (data, modalTitle) => {
        if (modalTitle === "Update Project Plan - PDF") {
            data.project_plans.forEach(plan => {
                // Check if the first element of the filepond array is an object
                if (plan.file.length > 0 && typeof plan.file[0] === 'object') {
                    plan.file = [];
                }
            });
        }

        if (modalTitle === "Import Project Plan - PDF") {
            data.project_plans.forEach(plan => {
                // Check if the first element of the filepond array is an object
                if (plan.filepond.length > 0 && typeof plan.filepond[0] === 'object') {
                    plan.filepond = [];
                }
            });
        }

        return data;

    }

    //CREATE/UPDATE ON SUBMIT PROJECT PLAN
    const onSubmit = async () => {
        setIsLoading(true)
        var swal = Swal.fire(LoadingSwal);
        await csrfCookie();

        let payload;

        if (modalTitle === "Import Project Plan - PDF") {
            payload = {
                b3_project_id: id,
                project_plans: formData
            }
        }

        if (modalTitle === "Update Project Plan - PDF") {
            payload = {
                b3_project_id: id,
                project_plans: updateFormData
            }
        }

        let finalFormData = removeFileIfNotChange(payload, modalTitle)

        api
            .post("/project-plan/store", payload)
            .then(function (response) {
                Toast.fire({
                    icon: "success",
                    title: "Upload File",
                    text: response.data.message,
                });
                isSetShowModal(false);
                setIsLoading(false)
                setSubmittedData(finalFormData)
            })
            .catch(function (error) {
                // swal.close();
                console.log('error', error)
                var errors = "";

                Object.values(error.response.data.errors).map(
                    (value) => (errors += `<li>${value}</li>`)
                );

                Toast.fire({
                    icon: "error",
                    title: "Error",
                    html: errors,
                });
                setIsLoading(false)
            })
    };

    const setContentField = () => {
        switch (modalTitle) {
            case "Import Project Plan - PDF":
                return (
                    <UploadProjectPlan
                        modalTitle={modalTitle}
                        files={files}
                        setFiles={setFiles}
                        onSubmit={onSubmit}
                        isShowModal={isShowModal}
                        setRemoveFileFunction={setRemoveFileFunction}
                        setFormData={setFormData}
                        formData={formData}
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                );
            case "Update Project Plan - PDF":
                return (
                    <EditUploadProjectPlan
                        modalTitle={modalTitle}
                        files={files}
                        setFiles={setFiles}
                        onSubmit={onSubmit}
                        isShowModal={isShowModal}
                        setRemoveFileFunction={setRemoveFileFunction}
                        setFormData={setUpdateFormData}
                        formData={updateFormData}
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                );
        }
    };


    useEffect(() => {
        fetchProjectPlan();
    }, [submitedData])


    return (
        <div>
            <div className="responsive-table" id="componentToPrint">
                <FileHeader />
                <Divider />
                <Row>
                    <Col span={14}>
                        <p className="takeoff-proj">
                            <strong>B ID#: </strong> 202305
                        </p>
                        <p className="takeoff-proj">
                            <strong>Project Registry No.(DED): </strong>
                            {projectData?.registry_no}
                        </p>
                        <p className="takeoff-proj">
                            <strong>Project Name: </strong>
                            {projectData?.project_title}
                        </p>
                        <p className="takeoff-proj">
                            <strong>Location: </strong>
                            {projectData?.location}
                        </p>
                    </Col>
                    <Col span={10}>
                        <p className="takeoff-proj">
                            <strong>Project Category: </strong>
                            {projectData?.project_nature}
                        </p>
                        <p className="takeoff-proj">
                            <strong>Project Subject: </strong>
                            {projectData?.project_nature_type}
                        </p>
                    </Col>
                    {/* <Col span={24} align="center">
                        <p className="quantity-proj">Project Plan</p>
                        <p className="takeoff-proj">
                            {projectData?.project_nature}/
                            {projectData?.project_nature_type}
                        </p>
                    </Col> */}
                </Row>
                <br />
                <div style={{ display: 'flex', justifyContent: 'start', marginBottom: 10 }}>
                    <Button
                        onClick={importProjectPlan}
                        style={{ color: "#4096ff" }}
                    >
                        <CloudUploadOutlined /> Import File
                    </Button>
                </div>

                {isLoading && (
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Spin size="medium">
                            <div className="content" />
                        </Spin>
                    </Space>
                )}

                {!isLoading && projectPlan.data && projectPlan.data.length === 0 && (
                    <div style={{ textAlign: "center", }}>No data found.</div>
                )}

                {!isLoading && projectPlan.data && projectPlan.data.length > 0 && projectPlan.data.map((singleProjectPlan, index) => (
                    <div style={{ marginTop: 50 }} key={index}>
                        <Button
                            className="btn-export-file"
                            type="primary"
                            style={{ float: 'right', margin: 10 }}
                            onClick={() => updateProjectPlan(singleProjectPlan)}
                        >
                            Update File
                        </Button>

                        <p style={{ display: 'flex', justifyContent: 'center' }}>
                            {singleProjectPlan.name}
                        </p>

                        {singleProjectPlan.file.map((file, index) => (
                            <PDFViewer url={file.url} />
                        ))}
                    </div>
                ))}

                <ModalComponents
                    className="custom-modals"
                    modalContent={
                        setContentField()
                    }
                    isShownModal={isShowModal}
                    handleOk={() =>
                        onSubmit()
                    }
                    handleCancel={handleCancel}
                    okText={"Submit"}
                />
            </div>

        </div >
    )
}

export default ProjectPlan
