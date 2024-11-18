import React, { useEffect, useState } from "react";
import Sidenav from "../../layout/Sidenav";
import { Button, Space, Row, Col, Input } from "antd";
import Navbar from "../../layout/Navbar";
import Footernav from "../../layout/Footernav";
import TableComponents from "../../resources/TableComponents";
import ModalComponents from "../../resources/ModalComponents";
import SowFieldsModal from "../../resources/modal_fields/SowFieldsModal";
import Swal from "sweetalert2";
import createSwal from "../../resources/swal/CreateSwalAlert";
import { axios } from "../../../axios-client";
import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { Layout } from "antd";
import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";
import csrfCookie from "../../../utilities/csrf-cookie";
import { LoadingSwal } from "../../resources/swal/LoadingSwal";

//gateway
import { api } from "../../../utilities/axios-gateway";

const { Content } = Layout;

const Sow = () => {
  const [searchedText, setSearchedText] = useState("");
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [sow, setSow] = useState(null);
  const [modalTitle, setModalTitle] = useState();
  const [isShowModal, isSetShowModal] = useState(false);
  const [sowFormData, setSowFormData] = useState({
    item_code: "",
    name: "",
    id: "",
  });

  const link = "/sowcat";
  const Toast = createSwal();

  const fetchSow = async () => {
    api
      .get(link)
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
  const createSow = () => {
    setSowFormData({
      ...sowFormData,
      item_code: "",
      name: "",
      id: "",
    });
    setModalTitle("Create SOW");
    isSetShowModal(true);
  };

  //UPDATE OR CREATE SOW
  const onSubmit = async () => {
    var swal = Swal.fire(LoadingSwal);
    await csrfCookie();
    api
      .post(link, sowFormData)
      .then(function (response) {
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
        isSetShowModal(false);
        fetchSow();
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
  const updateSow = async (id) => {
    api
      .get(link)
      .then(function (response) {
        const data = response.data.filter((item) => item.id === id);
        setSowFormData({
          ...sowFormData,
          item_code: data[0].item_code,
          name: data[0].name,
          id: id,
        });
        setModalTitle("Update SOW");
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

  //DELETE SPECIFIC SOW
  const deleteSow = (id) => {
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
            fetchSow();
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
            onClick={() => updateSow(text)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteSow(text)}
          ></Button>
        </Space>
      ),
    },
    {
      title: "Item Code",
      dataIndex: "item_code",
      width: "15%",
      key: "item_code",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.item_code)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase())
        );
      },
      sorter: (a, b) => a.item_code.localeCompare(b.item_code),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
  ];

  useEffect(() => {
    fetchSow();
  }, []);

  return (
    <Layout className="layout-container">
      <Sidenav />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: 20 }}>
          <Row justify="end" style={{ marginBottom: "10px" }}>
            <Button
              type="primary"
              onClick={createSow}
              className="btn-create-b3"
              style={{ backgroundColor: "#539165" }}
            >
              <PlusOutlined /> Create SOW
            </Button>
          </Row>
          <div className="main-component-container">
            <Row justify="space-between">
              <Col span={12}>
                <p className="project-title">
                  <OrderedListOutlined /> SOW List
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
                dataSource={sow}
              />
            </div>
            <ModalComponents
              className="custom-modals"
              modalContent={
                <SowFieldsModal
                  sowFormData={sowFormData}
                  setSowFormData={setSowFormData}
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

export default Sow;
