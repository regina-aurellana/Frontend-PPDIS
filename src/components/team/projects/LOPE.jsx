import React, { useState, useEffect, useRef } from 'react'
import FileHeader from "../../resources/FileHeader";
import { api } from '../../../utilities/axios-gateway';
import { Button, Space, Layout, Divider, Spin, Tabs } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useParams } from 'react-router';
import TableComponents from "../../resources/TableComponents";
import { useReactToPrint } from 'react-to-print';
import "../../../styles/Styles.css";

import {
    DeleteOutlined,
    EditOutlined,
    OrderedListOutlined,
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
const Toast = createSwal();


function LOPE({ sowCatData, projectData }) {
    const [dupaPerProjectId, setDupaPerProjectId] = useState(null);
    const [materialsData, setMaterialsData] = useState([]);
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const componentRef = useRef();

    const listOfKeyPersonnel = 'lope';
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [lopeFormData, setLopeFormData] = useState({
        b3_project_id: id,
        id: "",
        number: "",
        key_personnel: "",
        quantity: ""
    });

    //MODAL CONFIGURATION STATE
    const [modalTitle, setModalTitle] = useState();
    const [isShowModal, isSetShowModal] = useState(false);
    const [selectedContent, setSelectedContent] = useState(null);
    const footer = useRef(true);
    const [modalWidth, setModalWidth] = useState();

    const dupaListAPI = 'dupa-list-by-project/';
    const dupaContentsAPI = 'dupa-content-per-project/';

    const [lope, setLOPE] = useState(null)

    //FETCH LOPE DATA
    const fetchLOPE = async () => {
        api
            .get(`${listOfKeyPersonnel}/${id}`)
            .then(function (response) {
                setLOPE(response.data);
                setIsTableLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    //OPEN CREATE LOPE MODAL
    const createLOPE = () => {
        setLopeFormData({
            ...lopeFormData,
            number: "",
            key_personnel: "",
            quantity: ""
        });
        setSelectedContent("Add LOPE");
        setModalTitle("Add Key Personnel");
        isSetShowModal(true);
        setModalWidth(500);
        footer.current = true;
    };

    //SUBMIT LOPE (CREATE / UPDATE)
    const onSubmit = async () => {
        var swal = Swal.fire(LoadingSwal);
        await csrfCookie();

        let link;

        switch (selectedContent) {
            case 'Add LOPE':
                link = `${listOfKeyPersonnel}/store/${lopeFormData.b3_project_id}`;
                await api
                    .post(link, lopeFormData)
                    .then(function (response) {
                        Toast.fire({
                            icon: "success",
                            title: response.data.status,
                            text: response.data.message,
                        });
                        isSetShowModal(false);
                        setIsTableLoading(true);
                        fetchLOPE();
                    })
                    .catch(function (error) {
                        swal.close();

                        var errors = "";

                        Object.values(error.response.data.errors).map(
                            (value) => (errors += `<li>${value}</li>`)
                        );

                        Toast.fire({
                            icon: "error",
                            title: "Error",
                            html: errors,
                        });
                    });
                break;
            case 'Edit LOPE':
                link = `${listOfKeyPersonnel}/${lopeFormData.id}`;
                await api
                    .put(link, lopeFormData)
                    .then(function (response) {
                        Toast.fire({
                            icon: "success",
                            title: response.data.status,
                            text: response.data.message,
                        });
                        isSetShowModal(false);
                        setIsTableLoading(true);
                        fetchLOPE();
                    })
                    .catch(function (error) {
                        swal.close();

                        var errors = "";

                        Object.values(error.response.data.errors).map(
                            (value) => (errors += `<li>${value}</li>`)
                        );

                        Toast.fire({
                            icon: "error",
                            title: "Error",
                            html: errors,
                        });
                    });
                break;
            default:
                throw new Error('Invalid selected content');
        }


    };

    const updateLOPE = async (record) => {
        const existingData = lope.data.filter((singleLope) => singleLope.id == record);

        setLopeFormData({
            ...lopeFormData,
            number: existingData[0].number,
            key_personnel: existingData[0].key_personnel,
            quantity: existingData[0].quantity,
            id: record
        });

        setSelectedContent("Edit LOPE");
        setModalTitle("Edit Key Personnel");
        isSetShowModal(true);
        setModalWidth(500);
        footer.current = true;
    };

    const deleteLOPE = (id) => {
        Swal.fire(DeleteSwalConfig).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(LoadingSwal);
                api
                    .delete(listOfKeyPersonnel + "/" + id)
                    .then((response) => {
                        Toast.fire({
                            icon: "success",
                            title: response.data.status,
                            text: response.data.message,
                        });
                        isSetShowModal(false);
                        fetchLOPE();
                    })
                    .catch((error) => {
                        Toast.fire({
                            icon: "error",
                            title: "Error",
                            text: error.response.data.message,
                        });
                    });
            }
        });
    };

    const elementToHideRef = React.useRef(null);

    const handlePrint = useReactToPrint({
        content: () => {
            // Hide the element when printing
            if (elementToHideRef.current) {
                elementToHideRef.current.style.display = 'none';
            }
            return document.getElementById('componentToPrint');
        },
        onAfterPrint: () => {
            // Show the element after printing is done or canceled
            if (elementToHideRef.current) {
                elementToHideRef.current.style.display = 'block'; // Or any other appropriate display value
            }
        },
    });

    useEffect(() => {
        fetchLOPE();
    }, [])

    const setContentField = () => {
        switch (selectedContent) {
            case "Add LOPE":
                return (
                    <AddLOPE
                        modalTitle={modalTitle}
                        lopeFormData={lopeFormData}
                        setLopeFormData={setLopeFormData}
                    />
                );
            case "Edit LOPE":
                return (
                    <EditLOPE
                        modalTitle={modalTitle}
                        lopeFormData={lopeFormData}
                        setLopeFormData={setLopeFormData}
                    />
                );
        }
    };

    const handleCancel = () => {
        isSetShowModal(false);
    };

    const table_columns = [
        {
            title: "",
            key: "action",
            width: "8%",
            dataIndex: "id",
            className: "action-column",
            render: (text) => (
                <Space size="small">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => updateLOPE(text)}
                    ></Button>
                    <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => deleteLOPE(text)}
                    ></Button>
                </Space>
            ),
        },
        {
            title: "Number",
            dataIndex: 'number',
            key: 'number',
            align: 'center'
        },
        {
            title: "Key Personnel",
            dataIndex: 'key_personnel',
            key: 'key_personnel',
            align: 'center'
        },
        {
            title: "Quantity",
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center'
        }
    ]

    return (
        <div>
            <div className="responsive-table" id="componentToPrint">
                <FileHeader />
                <div style={{ display: 'flex', justifyContent: 'center', textTransform: 'uppercase' }}>
                    {projectData != null ? <p>{projectData.project_title},</p> : <p>PROJECT TITLE</p>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', textTransform: 'uppercase' }}>
                    {projectData != null ? <p>{projectData.location}</p> : <p>PROJECT LOCATION</p>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', textTransform: 'uppercase' }}>
                    <p><b>LIST OF KEY PERSONNEL</b></p>
                </div>
                <br />
                <div style={{ display: 'flex', justifyContent: 'start', marginBottom: 10 }} ref={elementToHideRef}>
                    <Button
                        onClick={createLOPE}
                        type="primary"
                        className="btn-create-b3"
                        style={{ backgroundColor: "#539165" }}
                    >
                        <PlusOutlined /> Add Key Personnel
                    </Button>
                </div>

                <TableComponents
                    loading={isTableLoading}
                    className="project-table"
                    columns={table_columns}
                    dataSource={lope ? lope.data : []}
                    pagination={false}
                // pagination={{ pageSize: 5 }}

                />


                <ModalComponents
                    className="custom-modals"
                    isShownModal={isShowModal}
                    modalContent={setContentField()}
                    handleCancel={handleCancel}
                    okText={"Submit"}
                    handleOk={onSubmit}
                    modalWidth={modalWidth}
                    footer={footer.current}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Button
                    onClick={handlePrint}
                    type="primary"
                    className="btn-add-area"
                    style={{
                        marginBottom: 10,
                        marginTop: 20,
                        paddingLeft: 35,
                        paddingRight: 35,
                        backgroundColor: "#176B87",
                    }}
                >
                    <PrinterOutlined /> Print
                </Button>
            </div>
        </div >
    )
}

export default LOPE