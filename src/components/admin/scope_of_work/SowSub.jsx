import React, { useEffect, useState } from "react";
import Sidenav from "../../layout/Sidenav";
import { Button, Space, Row, Col, Input } from "antd";
import Navbar from "../../layout/Navbar";
import Footernav from "../../layout/Footernav";
import TableComponents from "../../resources/TableComponents";
import ModalComponents from "../../resources/ModalComponents";
import SowSubFieldsModal from "../../resources/modal_fields/SowSubFieldsModal";
import Swal from "sweetalert2";
import createSwal from "../../resources/swal/CreateSwalAlert";
import { axios } from "../../../axios-client";
import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
  PlusOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";

import { Layout } from "antd";
import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";
import UploadFilesModal from "../../resources/modal_fields/UploadFilesModal";
import csrfCookie from "../../../utilities/csrf-cookie";
import { LoadingSwal } from "../../resources/swal/LoadingSwal";

//gateway
import { api } from "../../../utilities/axios-gateway";

const { Content } = Layout;

const SowSub = () => {
  const [modalTitle, setModalTitle] = useState();
  const [searchedText, setSearchedText] = useState("");
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [sowSub, setSowSub] = useState(null);
  const [isShowModal, isSetShowModal] = useState(false);
  const [sow, setSow] = useState(false);
  const [isUploadModal, setIsUploadModal] = useState(false);
  const [filesUpload, setFilesUpload] = useState(
    "Hi im from parent components"
  );
  const [sowSubFormData, setSowSubFormData] = useState({
    item_code: "",
    sow_category_id: "",
    name: "",
    parent_sub_cat_id: "",
    id: "",
  });

  const link = "/subcat";
  const linkSOW = "/sowcat";
  const importSubcat = "/import-subcat";
  const Toast = createSwal();

  const fetchSowSub = async () => {
    api
      .get(link)
      .then(function (response) {
        setSowSub(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchSow = async () => {
    api
      .get(linkSOW)
      .then(function (response) {
        setSow(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCancel = () => {
    isSetShowModal(false);
  };

  //CLEAR FIELD WHEN CLICK CREATE BUTTOM
  const createSowSub = () => {
    setSowSubFormData({
      ...sowSubFormData,
      id: "",
      item_code: "",
      sow_category_id: "",
      name: "",
      parent_sub_cat_id: "",
    });
    isSetShowModal(true);
    setIsUploadModal(false);
    setModalTitle("Create SOW Sub Category");
  };

  //UPDATE OR CREATE SOW SUB
  const onSubmit = async () => {
    try {
      setIsTableLoading(true);
      const formData = new FormData();
      var swal = Swal.fire(LoadingSwal);
      await csrfCookie();
      formData.append("filepond", filesUpload[0].file);
      if (isUploadModal) {
        await api.post(importSubcat, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
        Toast.fire({
          icon: "success",
          title: "File Uploaded",
          text: "Successfully uploaded file",
        });
      } else {
        await api.post(link, sowSubFormData);
        const actionMessage = sowSubFormData.id ? "updated" : "created";
        Toast.fire({
          icon: "success",
          title: `SOW Sub Category ${actionMessage}`,
          text: `SOW Sub successfully ${actionMessage}`,
        });
      }
      isSetShowModal(false);
      setIsTableLoading(true);
      fetchSowSub();
      fetchSow();
    } catch (error) {
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
    } finally {
      setIsTableLoading(false);
    }
  };

  //POPULATE FIELD WHEN CLICK UPDATE BUTTON
  const updateSowSub = (id) => {
    api
      .get(link + "/" + id)
      .then(function (response) {
        console.log(response);
        const parentSubCategory =
          response.data.parent_sub_category &&
          response.data.parent_sub_category.length > 0
            ? response.data.parent_sub_category[0].name
            : null;

        setSowSubFormData({
          ...sowSubFormData,
          id: response.data.id,
          item_code: response.data.item_code,
          sow_category_id: response.data.sow_category_id,
          name: response.data.name,
          parent_sub_cat_id: parentSubCategory,
        });
        setModalTitle("Update SOW Sub Category");
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

  //DELETE SPECIFIC SOW SUB
  const deleteSowSub = (id) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(link + "/" + id)
          .then((response) => {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchSowSub();
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
            onClick={() => updateSowSub(text)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteSowSub(text)}
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
          String(record.category).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase())
        );
      },
      sorter: (a, b) => a.item_code.localeCompare(b.item_code),
    },
    {
      title: "Category",
      dataIndex: "sow_category",
      key: "sow_category",
      render: (item) => (item ? item.name : " "),
      sorter: (a, b) => {
        const categoryNameA = a.sow_category ? a.sow_category.name : "";
        const categoryNameB = b.sow_category ? b.sow_category.name : "";
        return categoryNameA.localeCompare(categoryNameB);
      },
    },
    {
      title: "Sub-Category",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
  ];

  const importSOWSubCat = () => {
    setIsUploadModal(true);
    setModalTitle("Import SOW Sub Category - CSV/Excel");
    isSetShowModal(true);
    console.log("import sow sub");
  };

  useEffect(() => {
    fetchSowSub();
    fetchSow();
  }, []);

  return (
    <Layout className="layout-container">
      <Sidenav />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: 20 }}>
          <Row justify="end" style={{ marginBottom: "10px" }}>
            <Space>
              <Button onClick={importSOWSubCat} className="btn-import-file">
                <CloudUploadOutlined />
                Import File
              </Button>
              <Button
                type="primary"
                onClick={createSowSub}
                className="btn-create-b3"
                style={{ backgroundColor: "#539165" }}
              >
                <PlusOutlined /> Create SOW Sub Category
              </Button>
            </Space>
          </Row>
          <div className="main-component-container">
            <Row justify="space-between">
              <Col span={12}>
                <p className="project-title">
                  <OrderedListOutlined /> SOW Sub Category List
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
                dataSource={sowSub}
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
                  <SowSubFieldsModal
                    sowSubFormData={sowSubFormData}
                    setSowSubFormData={setSowSubFormData}
                    sow={sow}
                    modalTitle={modalTitle}
                    sowSub={sowSub}
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

export default SowSub;
