import React, { useState, useEffect } from "react";
import { Button, Row, Col, Input, Layout, Space } from "antd";
import Sidenav from "../layout/Sidenav";
import Navbar from "../layout/Navbar";
import Footernav from "../layout/Footernav";
import TableComponents from "../resources/TableComponents";
import MeasurementUnitFieldsModal from "../resources/modal_fields/MeasurementUnitFieldsModal";
import ModalComponents from "../resources/ModalComponents";
import Swal from "sweetalert2";
import { axios } from "../../axios-client";
import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { DeleteSwalConfig } from "../resources/swal/DeleteSwalConfig";
import createSwal from "../resources/swal/CreateSwalAlert";
import { LoadingSwal } from "../resources/swal/LoadingSwal";

//gateway
import csrfCookie from "../../utilities/csrf-cookie";
import { api } from "../../utilities/axios-gateway";

const { Content } = Layout;

const Measurement = () => {
  const [searchedText, setSearchedText] = useState("");
  const [measurementFormData, setMeasurementFormData] = useState({
    name: "",
    abbreviation: "",
    measurement_id: "",
  });
  const [modalTitle, setModalTitle] = useState();
  const [isShowModal, isSetShowModal] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [measurement, setMeasurement] = useState(null);

  const link = "/measurement";
  const Toast = createSwal();

  const fetchMeasurement = async () => {
    api
      .get(link)
      .then(function (response) {
        setMeasurement(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleCancel = () => {
    isSetShowModal(false);
  };

  const createMeasurement = () => {
    setMeasurementFormData({
      ...measurementFormData,
      name: "",
      abbreviation: "",
      measurement_id: "",
    });
    setModalTitle("Create Measurement");
    isSetShowModal(true);
  };

  const onSubmit = async () => {
    var swal = Swal.fire(LoadingSwal);
    await csrfCookie();
    api
      .post(link, measurementFormData)
      .then(function (response) {
        console.log(response);
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
        isSetShowModal(false);
        setIsTableLoading(true);
        fetchMeasurement();
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

  const updateMeasurement = async (id) => {
    api
      .get(link + "/" + id)
      .then(function (response) {
        setMeasurementFormData({
          ...measurementFormData,
          measurement_id: response.data.id,
          name: response.data.name,
          abbreviation: response.data.abbreviation,
        });
        setModalTitle("Update Measurement");
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

  const deleteMeasurement = (id) => {
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
            fetchMeasurement();
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
    fetchMeasurement();
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
            onClick={() => updateMeasurement(text)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteMeasurement(text)}
          ></Button>
        </Space>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "45%",
      key: "name",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.abbreviation)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Abbreviation",
      dataIndex: "abbreviation",
      key: "abbreviation",
      width: "45%",
      sorter: (a, b) => a.abbreviation.localeCompare(b.abbreviation),
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
              onClick={createMeasurement}
              type="primary"
              className="btn-create-b3"
              style={{ backgroundColor: "#539165" }}
            >
              <PlusOutlined /> Create Measurement
            </Button>
          </Row>
          <div className="main-component-container">
            <Row justify="space-between">
              <Col span={12}>
                <p className="project-title">
                  <OrderedListOutlined /> Measurement List
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
                dataSource={measurement}
                pagination={{ pageSize: 5 }}
              />
            </div>
            <ModalComponents
              className="custom-modals"
              modalContent={
                <MeasurementUnitFieldsModal
                  measurementFormData={measurementFormData}
                  setMeasurementFormData={setMeasurementFormData}
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

export default Measurement;
