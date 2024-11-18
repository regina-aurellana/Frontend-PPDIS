import { Button, Col, Layout, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import Sidenav from "../../layout/Sidenav";
import Navbar from "../../layout/Navbar";
import Footernav from "../../layout/Footernav";
import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import TableComponents from "../../resources/TableComponents";
import ModalComponents from "../../resources/ModalComponents";
import FormulaModal from "../../resources/modal_fields/FormulaModal";
import { axios } from "../../../axios-client";
import csrfCookie from "../../../utilities/csrf-cookie";
import createSwal from "../../resources/swal/CreateSwalAlert";
import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";
import Swal from "sweetalert2";
import { LoadingSwal } from "../../resources/swal/LoadingSwal";

//gateway
import { api } from "../../../utilities/axios-gateway";

const { Content } = Layout;
const Toast = createSwal();

const MeasurementApi = "/measurement";
const FormulaApi = "/formula";

const Formula = () => {
  const [formulaFormData, setFormulaFormData] = useState({
    result: "",
    formula: "",
  });
  const [modalTitle, setModalTitle] = useState();
  const [isShowModal, isSetShowModal] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [measurement, setMeasurement] = useState(null);
  const [formula, setFormula] = useState(null);

  // FETCH ALL MEASUREMENT TO DISPLAY TO MODAL FIELDS
  const fetchMeasurement = async () => {
    api
      .get(MeasurementApi)
      .then(function (response) {
        setMeasurement(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // FETCH ALL FORMULA TO DISPLAY TO DATA TABLES
  const fetchFormula = async () => {
    api
      .get(FormulaApi)
      .then(function (response) {
        setFormula(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // COLUMNS OF THE DATA TABLES
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
            onClick={() => updateFormula(text)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteFormula(text)}
          ></Button>
        </Space>
      ),
    },
    {
      title: "Formula",
      dataIndex: "formula",
      width: "46%",
      key: "formula",
      render: (text) => <span>{text.toUpperCase()}</span>,
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      width: "46%",
      render: (text) => <span>{text.toUpperCase()}</span>,
    },
  ];

  // ON SUBMIT BUTTON TO MODAL
  const onSubmit = async () => {
    Swal.fire(LoadingSwal);
    await csrfCookie();
    api
      .post(FormulaApi, formulaFormData)
      .then(function (response) {
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
        fetchFormula();
        isSetShowModal(false);
        setIsTableLoading(true);

        setFormulaFormData({
          result: "",
          formula: "",
        });
      })
      .catch(function (error) {
        Toast.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      });
  };

  // CREATE FORMULA
  const createFormula = () => {
    setFormulaFormData({
      ...formulaFormData,
      result: "",
      formula: "",
    });
    setModalTitle("Create Formula");
    isSetShowModal(true);
  };

  // DELETE FORMULA
  const deleteFormula = async (id) => {
    await csrfCookie();
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        var swal = Swal.fire(LoadingSwal);
        api
          .delete(FormulaApi + "/" + id)
          .then((response) => {
            if (
              response.data.message.includes("Integrity constraint violation")
            ) {
              Toast.fire({
                icon: "error",
                title: "Error",
                text: "Cannot be deleted due to associated content",
              });
            } else {
              Toast.fire({
                icon: "success",
                title: response.data.status,
                text: response.data.message,
              });
            }
            isSetShowModal(false);
            setIsTableLoading(false);
            fetchFormula();
          })
          .catch((error) => {
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
      }
    });
  };

  // UPDATE FORMULA BY ID
  const updateFormula = async (id) => {
    api
      .get(FormulaApi + "/" + id)
      .then((response) => {
        setFormulaFormData({
          ...formulaFormData,
          result: response.data.result,
          formula: response.data.formula,
          id: id,
        });
        setModalTitle("Update Formula");
        isSetShowModal(true);
        fetchFormula();
      })
      .catch((error) => {
        console.error("Error deleting item", error);
      });
  };

  // CANCEL BUTTON ON MODAL
  const handleCancel = () => {
    setFormulaFormData({
      formula: "",
      result: "",
    });
    isSetShowModal(false);
  };

  useEffect(() => {
    fetchMeasurement();
    fetchFormula();
  }, []);

  return (
    <Layout className="layout-container">
      <Sidenav />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: 20 }}>
          <Row justify="end" style={{ marginBottom: "10px" }}>
            <Button
              onClick={createFormula}
              type="primary"
              className="btn-create-b3"
              style={{ backgroundColor: "#539165" }}
            >
              <PlusOutlined /> Create Formula
            </Button>
          </Row>

          <div className="main-component-container">
            <Row justify="space-between">
              <Col span={12}>
                <p className="project-title">
                  <OrderedListOutlined /> Formula List
                </p>
              </Col>
            </Row>
            <div className="responsive-table">
              <TableComponents
                loading={isTableLoading}
                className="project-table"
                columns={columns}
                dataSource={formula}
                pagination={{ pageSize: 5 }}
              />
            </div>
            <ModalComponents
              className="custom-modals"
              modalContent={
                <FormulaModal
                  modalTitle={modalTitle}
                  measurement={measurement}
                  formulaFormData={formulaFormData}
                  setFormulaFormData={setFormulaFormData}
                  isSetShowModal={isSetShowModal}
                  handleCancel={handleCancel}
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

export default Formula;
