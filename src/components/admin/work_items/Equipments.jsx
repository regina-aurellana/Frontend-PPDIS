import React, { useEffect, useState, useRef } from "react";
import Sidenav from "../../layout/Sidenav";
import { Button, Space, Row, Col, Input } from "antd";
import Navbar from "../../layout/Navbar";
import Footernav from "../../layout/Footernav";
import TableComponents from "../../resources/TableComponents";
import ModalComponents from "../../resources/ModalComponents";
import UploadFilesModal from "../../resources/modal_fields/UploadFilesModal";
import EquipmentFieldsModal from "../../resources/modal_fields/EquipmentFieldsModal";
import { axios } from "../../../axios-client";
import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
  PlusOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";

import createSwal from "../../resources/swal/CreateSwalAlert";
import { LoadingSwal } from "../../resources/swal/LoadingSwal";
import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";

import { Layout } from "antd";
import Swal from "sweetalert2";
import csrfCookie from "../../../utilities/csrf-cookie";

//gateway
import { api } from "../../../utilities/axios-gateway";

import exportFiles from "../../../utilities/export";

const { Content } = Layout;

const Equipments = () => {
  const [searchedText, setSearchedText] = useState("");
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [equipment, setEquipment] = useState(null);
  const [modalTitle, setModalTitle] = useState();
  const [isUploadModal, setIsUploadModal] = useState(true);
  const [isShowModal, isSetShowModal] = useState(false);
  const [equipmentFormData, setEquipmentFormData] = useState({
    item_code: "",
    name: "",
    hourly_rate: "",
    component_name: [],
  });
  const [equipmentList, setEquipmentList] = useState(null);
  const [equipmentData, setEquipmentData] = useState(null);

  const [filesUpload, setFilesUpload] = useState(
    "Hi im from parent components"
  );
  const pondRef = useRef(null);

  const link = "/equipment";
  const importEquipmentLink = "/import-equipment";
  const Toast = createSwal();

  const fetchEquipment = async () => {
    api
      .get(link)
      .then(function (response) {
        setEquipment(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        Toast.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      });
  };

  const handleCancel = () => {
    isSetShowModal(false);
  };

  const createEquipment = () => {
    setIsUploadModal(false);
    setEquipmentFormData({
      ...equipmentFormData,
      item_code: "",
      name: "",
      hourly_rate: "",
      component_name: [],
    });
    setModalTitle("Create Equipment");
    isSetShowModal(true);
  };

  const onSubmit = async () => {
    var swal = Swal.fire(LoadingSwal);

    await csrfCookie();
    const formData = new FormData();
    formData.append("filepond", filesUpload[0].file);
    isUploadModal
      ? api
          .post(importEquipmentLink, formData)
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: "Upload File",
              text: "successfully uploaded file",
            });
            isSetShowModal(false);
            setIsTableLoading(true);
            fetchEquipment();
            pondRef.current.removeFile(filesUpload[0].file);
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
          })
      : api
          .post(link, equipmentFormData)
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });

            isSetShowModal(false);
            setIsTableLoading(true);
            fetchEquipment();
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
  };

  const updateEquipment = async (id) => {
    setIsUploadModal(false);
    api
      .get(link + "/" + id)
      .then(function (response) {
        const equipmentComponent = response.data.equipment_component;
        const filteredComponents = equipmentComponent.filter(
          (item) => item.equip_id === id
        );
        // console.log(filteredComponents);
        setEquipmentFormData({
          ...equipmentFormData,
          equipment_id: response.data.id,
          item_code: response.data.item_code,
          name: response.data.name,
          hourly_rate: response.data.hourly_rate,
          component_name: filteredComponents.map((item) => item.component_name),
        });
        // console.log(response.data);
        setModalTitle("Update Equipment");
        isSetShowModal(true);
      })
      .catch(function (error) {
        Toast.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      });
  };

  const deleteEquipment = (id) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(link + "/" + id)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchEquipment();
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

  //UPLOAD CSV/EXCEL
  const uploadFiles = () => {
    setIsUploadModal(true);
    setModalTitle("Upload Equipment File - CSV/Exel");
    isSetShowModal(true);
  };

  const columns = [
    {
      title: "",
      key: "action",
      width: "8%",
      dataIndex: "id",
      render: (text) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => updateEquipment(text)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteEquipment(text)}
          ></Button>
        </Space>
      ),
    },
    {
      title: "Item Code",
      dataIndex: "item_code",
      key: "item_code",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.item_code)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.hourly_rate).toLowerCase().includes(value.toLowerCase())
        );
      },
      sorter: (a, b) => a.item_code.localeCompare(b.item_code),
    },
    {
      title: "Equipment Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Hourly Rate",
      dataIndex: "hourly_rate",
      key: "hourly_rate",
      sorter: (a, b) => a.hourly_rate.localeCompare(b.hourly_rate),
    },
  ];

  useEffect(() => {
    fetchEquipment();
  }, []);

  return (
    <Layout className="layout-container">
      <Sidenav />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: 20 }}>
          <Row justify="end" style={{ marginBottom: "10px" }}>
            <Space>
              <Button onClick={uploadFiles} className="btn-import-file">
                <CloudUploadOutlined /> Import File
              </Button>
              <Button
                onClick={() => exportFiles("export-equipment", "Equipments")}
                className="btn-export-file"
                type="primary"
              >
                <CloudDownloadOutlined /> Export List
              </Button>
              <Button
                type="primary"
                onClick={createEquipment}
                className="btn-create-b3"
                style={{ backgroundColor: "#539165" }}
              >
                <PlusOutlined /> Create Equipment
              </Button>
            </Space>
          </Row>

          <div className="main-component-container">
            <Row justify="space-between">
              <Col span={12}>
                <p className="project-title">
                  <OrderedListOutlined /> Equipments List
                </p>
              </Col>
              <Col span={12} align="end">
                <Input.Search
                  placeholder="Search here..."
                  style={{ marginBottom: 8 }}
                  onSearch={(value) => {
                    setSearchedText(value);
                  }}
                  onChange={(e) => {
                    setSearchedText(e.target.value);
                  }}
                />
              </Col>
            </Row>
            <div className="responsive-table">
              <TableComponents
                loading={isTableLoading}
                className="project-table"
                columns={columns}
                dataSource={equipment}
                pagination={{ pageSize: 5 }}
              />
            </div>
            <ModalComponents
              className="custom-modals"
              modalContent={
                isUploadModal ? (
                  <UploadFilesModal
                    modalTitle={modalTitle}
                    setFilesUpload={setFilesUpload}
                  />
                ) : (
                  <EquipmentFieldsModal
                    equipmentFormData={equipmentFormData}
                    setEquipmentFormData={setEquipmentFormData}
                    modalTitle={modalTitle}
                    setEquipmentItem={setEquipmentList}
                  />
                )
              }
              isShownModal={isShowModal}
              handleOk={onSubmit}
              handleCancel={handleCancel}
              okText={"Submit"}
            />
          </div>
        </Content>
        <Footernav />
      </Layout>
    </Layout>
  );
};

export default Equipments;
