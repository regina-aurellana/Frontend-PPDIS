import React, { useEffect, useState, useRef } from "react";
import Sidenav from "../../layout/Sidenav";
import { Button, Space, Row, Col, Input } from "antd";
import Navbar from "../../layout/Navbar";
import Footernav from "../../layout/Footernav";
import TableComponents from "../../resources/TableComponents";
import ModalComponents from "../../resources/ModalComponents";
import LaborFieldModal from "../../resources/modal_fields/LaborFieldModal";
import UploadFilesModal from "../../resources/modal_fields/UploadFilesModal";
import { axios } from "../../../axios-client";
import Swal from "sweetalert2";
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

const Labors = () => {
  const [searchedText, setSearchedText] = useState("");
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [labor, setLabor] = useState(null);
  const [isShowModal, isSetShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [isUploadModal, setIsUploadModal] = useState(true);
  const [laborFormData, setLaborFormData] = useState({
    item_code: "",
    designation: "",
    hourly_rate: "",
    labor_id: "",
  });
  const [filesUpload, setFilesUpload] = useState(
    "Hi im from parent components"
  );
  const pondRef = useRef(null);

  const link = "/labor";
  const importLaborLink = "/import-labor";

  const Toast = createSwal();

  // RETRIEVE ALL LABOR INFORMATION
  const fetchLabor = async () => {
    api
      .get(link)
      .then(function (response) {
        setLabor(response.data);
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

  //CLEAR FIELD WHEN CLICK CREATE BUTTON
  const createLabor = () => {
    setIsUploadModal(false);
    setLaborFormData({
      ...laborFormData,
      item_code: "",
      name: "",
      designation: "",
      hourly_rate: "",
    });
    setModalTitle("Create Labor");
    isSetShowModal(true);
  };

  //UPDATE OR CREATE Labor
  const onSubmit = async () => {
    var swal = Swal.fire(LoadingSwal);

    await csrfCookie();
    const formData = new FormData();
    formData.append("filepond", filesUpload[0].file);
    isUploadModal
      ? api
          .post(importLaborLink, formData)
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: "Upload File",
              text: "successfully uploaded file",
            });
            isSetShowModal(false);
            setIsTableLoading(true);
            fetchLabor();
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
          .post(link, laborFormData)
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            setIsTableLoading(true);
            fetchLabor();
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
  const updateLabor = async (id) => {
    setIsUploadModal(false);
    api
      .get(link + "/" + id)
      .then(function (response) {
        setLaborFormData({
          ...laborFormData,
          labor_id: response.data.id,
          item_code: response.data.item_code,
          designation: response.data.designation,
          hourly_rate: response.data.hourly_rate,
        });
        setModalTitle("Update Labor");
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

  const deleteLabor = (id) => {
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
            fetchLabor();
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
    setModalTitle("Upload Labor File - CSV/Excel");
    isSetShowModal(true);
  };

  const columns = [
    {
      title: "",
      key: "action",
      dataIndex: "id",
      width: "8%",
      render: (text) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => updateLabor(text)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteLabor(text)}
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
          String(record.designation)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.hourly_rate).toLowerCase().includes(value.toLowerCase())
        );
      },
      sorter: (a, b) => a.item_code.localeCompare(b.item_code),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      sorter: (a, b) => a.designation.localeCompare(b.designation),
    },
    {
      title: "Hourly Rate",
      dataIndex: "hourly_rate",
      key: "hourly_rate",
      sorter: (a, b) => a.hourly_rate.localeCompare(b.hourly_rate),
    },
  ];

  useEffect(() => {
    fetchLabor();
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
                onClick={() => exportFiles("export-labor", "Labors")}
                className="btn-create-b3"
                type="primary"
              >
                <CloudDownloadOutlined /> Export List
              </Button>
              <Button
                type="primary"
                onClick={createLabor}
                className="btn-create-b3"
                style={{ backgroundColor: "#539165" }}
              >
                <PlusOutlined /> Create Labor
              </Button>
            </Space>
          </Row>

          <div className="main-component-container">
            <Row justify="space-between">
              <Col span={12}>
                <p className="project-title">
                  {" "}
                  <OrderedListOutlined /> Labor List
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
                dataSource={labor}
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
                  <LaborFieldModal
                    laborFormData={laborFormData}
                    setLaborFormData={setLaborFormData}
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

export default Labors;
