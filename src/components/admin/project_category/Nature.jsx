import React, { useState, useEffect } from "react";
import { Button, Row, Col, Input, Space } from "antd";
import "../../../styles/Styles.css";
import { Layout } from "antd";
import Sidenav from "../../layout/Sidenav";
import Navbar from "../../layout/Navbar";
import Footernav from "../../layout/Footernav";
import ModalComponents from "../../resources/ModalComponents";
import TableComponents from "../../resources/TableComponents";
import ProjNatureFieldModals from "../../resources/modal_fields/ProjNatureFieldModals";
import createSwal from "../../resources/swal/CreateSwalAlert";
import { axios } from "../../../axios-client";
import Swal from "sweetalert2";
import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import csrfCookie from "../../../utilities/csrf-cookie";
import { LoadingSwal } from "../../resources/swal/LoadingSwal";

//gateway
import { api } from "../../../utilities/axios-gateway";

const { Content } = Layout;

const Nature = () => {
  const [searchedText, setSearchedText] = useState("");
  const [projNature, setProjNature] = useState([]);
  const [modalTitle, setModalTitle] = useState();
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isShowModal, isSetShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", projNature_id: "" });

  const link = "/nature";
  const Toast = createSwal();

  // FETCH PROJECT NATURE
  const fetchProjNature = async () => {
    api
      .get(link)
      .then(function (response) {
        setProjNature(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // MODAL CANCEL BUTTON
  const handleCancel = () => {
    isSetShowModal(false);
  };

  // CREATE PROJECT NATURE
  const createProjNature = () => {
    setFormData({
      ...formData,
      name: "",
      projNature_id: "",
    });
    setModalTitle("Create Nature");
    isSetShowModal(true);
  };

  // CREATE PROJECT NATURE ON SUBMIT
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
        fetchProjNature();
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

  // UPDATE NATURE PROJECT
  const updateProjNature = async (id) => {
    api
      .get(link + "/" + id)
      .then(function (response) {
        setFormData({
          ...formData,
          projNature_id: response.data.id,
          name: response.data.name,
        });
        setModalTitle("Update Nature");
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

  // DELETE NATURE PROJECT
  const deleteProjNature = (id) => {
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
            fetchProjNature();
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
    fetchProjNature();
  }, []);

  const columns = [
    {
      title: "",
      key: "action",
      dataIndex: "id",
      render: (int) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => updateProjNature(int)}
          ></Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteProjNature(int)}
          ></Button>
        </Space>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "90%",
      key: "name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
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
              onClick={createProjNature}
              type="primary"
              className="btn-create-b3"
              style={{ backgroundColor: "#539165" }}
            >
              <PlusOutlined /> Create Nature
            </Button>
          </Row>

          <div className="main-component-container">
            <Row justify="space-between">
              <Col span={12}>
                <p className="project-title">
                  {" "}
                  <OrderedListOutlined /> B3 Nature List
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
                dataSource={projNature}
              />
            </div>

            <ModalComponents
              className="custom-modals"
              modalContent={
                <ProjNatureFieldModals
                  formData={formData}
                  setFormData={setFormData}
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

export default Nature;
