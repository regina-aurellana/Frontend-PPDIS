import React, { useState, useEffect } from "react";
import { Button, Row, Col, Input } from "antd";
import "../../../styles/Styles.css";
import { Layout, Space } from "antd";
import Sidenav from "../../layout/Sidenav";
import Navbar from "../../layout/Navbar";
import Footernav from "../../layout/Footernav";
import ModalComponents from "../../resources/ModalComponents";
import TableComponents from "../../resources/TableComponents";
import ProjNatureTypeFieldModals from "../../resources/modal_fields/ProjNatureTypeFieldModals";
import createSwal from "../../resources/swal/CreateSwalAlert";
import Swal from "sweetalert2";
import { axios } from "../../../axios-client";
import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";
import csrfCookie from "../../../utilities/csrf-cookie";
import { LoadingSwal } from "../../resources/swal/LoadingSwal";

//gateway
import { api } from "../../../utilities/axios-gateway";

const { Content } = Layout;

const NatureType = () => {
  const [searchedText, setSearchedText] = useState("");
  const [projNature, setProjNature] = useState([]);
  const [projNatureType, setProjNatureType] = useState([]);
  const [modalTitle, setModalTitle] = useState();
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isShowModal, isSetShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    registry_no: "",
    project_title: "",
    project_nature_id: "",
    project_nature_type_id: "",
    location: "",
    status: "Pending",
  });

  const link = "/type";
  const nature = "/nature";
  const Toast = createSwal();

  const fetchProjNatureType = async () => {
    api
      .get(link)
      .then(function (response) {
        setProjNatureType(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleCancel = () => {
    isSetShowModal(false);
  };

  const fetchProjNature = async () => {
    api
      .get(nature)
      .then(function (response) {
        setProjNature(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getProjNature = async (value) => {
    setFormData({ ...formData, project_nature_id: value });
  };

  const createProjNatureType = () => {
    setFormData({
      ...formData,
      name: "",
      project_nature_id: "",
    });
    setModalTitle("Create Nature Type");
    isSetShowModal(true);
  };

  const onSubmit = async () => {
    var swal = Swal.fire(LoadingSwal);

    await csrfCookie();
    api
      .post(link, formData)
      .then(function (response) {
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
        isSetShowModal(false);
        fetchProjNatureType();
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

  const updateProjNatureType = async (id) => {
    await csrfCookie();
    api
      .get(link + "/" + id)
      .then(function (response) {
        console.log("res", response);
        setFormData({
          ...formData,
          name: response.data[0].name,
          project_nature_id: response.data[0].project_nature_id,
          id: response.data[0].id,
        });
        setModalTitle("Update Nature Type");
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

  //DELETE SPECIFIC NATURE TYPE
  const deleteProjectNatureType = (id) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(link + "/" + id)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchProjNatureType();
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

  useEffect(() => {
    fetchProjNatureType();
    fetchProjNature();
  }, []);

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
            onClick={() => updateProjNatureType(text)}
          ></Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteProjectNatureType(text)}
          ></Button>
        </Space>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "65%",
      key: "name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.project_nature)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.project_nature_id)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.project_nature_name)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Project Nature",
      dataIndex: "project_nature_name",
      key: "project_nature_name",
      sorter: (a, b) =>
        a.project_nature_name.localeCompare(b.project_nature_name),
    },
  ];

  return (
    <Layout className="layout-container">
      <Sidenav />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: 20 }}>
          <Row justify="end" style={{ marginBottom: "10px" }}>
            <Button
              onClick={createProjNatureType}
              type="primary"
              className="btn-create-b3"
              style={{ backgroundColor: "#539165" }}
            >
              <PlusOutlined />
              Create Project Nature Type
            </Button>
          </Row>

          <div className="main-component-container">
            <Row justify="space-between">
              <Col span={12}>
                <p className="project-title">
                  {" "}
                  <OrderedListOutlined /> Nature Type List
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
                dataSource={projNatureType}
                pagination={{ pageSize: 5 }}
              />
            </div>

            <ModalComponents
              className="custom-modals"
              modalContent={
                <ProjNatureTypeFieldModals
                  formData={formData}
                  setFormData={setFormData}
                  getProjNature={getProjNature}
                  projNature={projNature}
                  modalTitle={modalTitle}
                />
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

export default NatureType;
