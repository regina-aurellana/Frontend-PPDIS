import React, { useEffect, useState, useRef } from "react";
import Sidenav from "../../layout/Sidenav";
import { Button, Space, Row, Col, Input } from "antd";
import Navbar from "../../layout/Navbar";
import Footernav from "../../layout/Footernav";
import TableComponents from "../../resources/TableComponents";
import ModalComponents from "../../resources/ModalComponents";
import UploadFilesModal from "../../resources/modal_fields/UploadFilesModal";
import MaterialFieldsModal from "../../resources/modal_fields/MaterialFieldsModal";
import Swal from "sweetalert2";
import { axios } from "../../../axios-client";
import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
  PlusOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";

import { LoadingSwal } from "../../resources/swal/LoadingSwal";
import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";
import createSwal from "../../resources/swal/CreateSwalAlert";

import { Layout } from "antd";
import csrfCookie from "../../../utilities/csrf-cookie";

//gateway
import { api } from "../../../utilities/axios-gateway";

import exportFiles from "../../../utilities/export";

const { Content } = Layout;

const Materials = () => {
  const [searchedText, setSearchedText] = useState("");
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [materials, setMaterials] = useState(null);
  const [isShowModal, isSetShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [isUploadModal, setIsUploadModal] = useState(true);
  const [materialFormData, setMaterialFormData] = useState({
    item_code: "",
    name: "",
    unit: "",
    unit_cost: "",
    material_id: "",
  });
  const [filesUpload, setFilesUpload] = useState(
    "Hi im from parent components"
  );
  const pondRef = useRef(null);

  const link = "/material";
  const importMaterialLink = "/import-material";
  const Toast = createSwal();

  // RETRIEVE ALL MATERIALS INFORMATION
  const fetchMaterials = async () => {
    api
      .get(link)
      .then(function (response) {
        setMaterials(response.data);
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

  //CANCEL MODAL
  const handleCancel = () => {
    isSetShowModal(false);
  };

  //CLEAR FIELD WHEN CLICK CREATE BUTTON
  const createMaterials = () => {
    setIsUploadModal(false);
    setMaterialFormData({
      ...materialFormData,
      item_code: "",
      name: "",
      unit: "",
      unit_cost: "",
      material_id: "",
    });
    setModalTitle("Create Material");
    isSetShowModal(true);
  };

  //UPDATE OR CREATE MATERIALS
  const onSubmit = async () => {
    var swal = Swal.fire(LoadingSwal);

    await csrfCookie();
    const formData = new FormData();
    formData.append("filepond", filesUpload[0].file);
    isUploadModal
      ? api
          .post(importMaterialLink, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: "Upload File",
              text: "successfully uploaded file",
            });

            isSetShowModal(false);
            setIsTableLoading(true);
            fetchMaterials();
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
          .post(link, materialFormData)
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            setIsTableLoading(true);
            fetchMaterials();
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

  //POPULATE FIELD WHEN CLICK UPDATE BUTTON
  const updateMaterials = (id) => {
    setIsUploadModal(false);
    api
      .get(link + "/" + id)
      .then(function (response) {
        setMaterialFormData({
          ...materialFormData,
          material_id: response.data.id,
          item_code: response.data.item_code,
          name: response.data.name,
          unit: response.data.unit,
          unit_cost: response.data.unit_cost,
        });
        setModalTitle("Update Material");
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

  //DELETE SPECIFIC MATERIAL
  const deleteMaterials = (id) => {
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
            fetchMaterials();
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
    setModalTitle("Upload Material File - CSV/Excel");
    isSetShowModal(true);
  };

  // TABLE COLUMN HEADER
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
            onClick={() => updateMaterials(text)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteMaterials(text)}
          ></Button>
        </Space>
      ),
    },
    {
      title: "Item Code",
      dataIndex: "item_code",
      width: "10%",
      key: "item_code",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.item_code)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.unit).toLowerCase().includes(value.toLowerCase()) ||
          String(record.unit_cost).toLowerCase().includes(value.toLowerCase())
        );
      },
      sorter: (a, b) => a.item_code.localeCompare(b.item_code),
    },
    {
      title: "Materials Name",
      dataIndex: "name",
      width: "40%",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
      width: "20%",
      sorter: (a, b) => a.unit.localeCompare(b.unit),
    },
    {
      title: "Unit Cost",
      dataIndex: "unit_cost",
      key: "unit_cost",
      width: "20%",
      sorter: (a, b) => a.unit_cost.localeCompare(b.unit_cost),
    },
  ];

  useEffect(() => {
    fetchMaterials();
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
                <CloudUploadOutlined />
                Import File
              </Button>
              <Button
                onClick={() => exportFiles("export-material", "Materials")}
                className="btn-export-file"
                type="primary"
              >
                <CloudDownloadOutlined />
                Export List
              </Button>
              <Button
                type="primary"
                onClick={createMaterials}
                className="btn-create-b3"
                style={{ backgroundColor: "#539165" }}
              >
                <PlusOutlined /> Create Material
              </Button>
            </Space>
          </Row>
          <div className="main-component-container">
            <Row justify="space-between">
              <Col span={12}>
                <p className="project-title">
                  <OrderedListOutlined /> Materials List
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
                dataSource={materials}
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
                  <MaterialFieldsModal
                    materialFormData={materialFormData}
                    setMaterialFormData={setMaterialFormData}
                    modalTitle={modalTitle}
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

export default Materials;
