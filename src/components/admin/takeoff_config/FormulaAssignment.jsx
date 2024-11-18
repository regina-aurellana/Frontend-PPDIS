import { Button, Col, Layout, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import Sidenav from "../../layout/Sidenav";
import Navbar from "../../layout/Navbar";
import { Content } from "antd/es/layout/layout";
import Footernav from "../../layout/Footernav";
import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import TableComponents from "../../resources/TableComponents";
import ModalComponents from "../../resources/ModalComponents";
import DupaComponentFormulaModal from "../../resources/modal_fields/takeoff_config_modals/DupaComponentFormulaModal";
import { axios } from "../../../axios-client";
import csrfCookie from "../../../utilities/csrf-cookie";
import createSwal from "../../resources/swal/CreateSwalAlert";
import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";
import Swal from "sweetalert2";
import { LoadingSwal } from "../../resources/swal/LoadingSwal";

//gateway
import { api } from "../../../utilities/axios-gateway";

const Toast = createSwal();

const FormulaApi = "/formula";
const TblDupaCompApi = "/table-dupa-component";
const TblDupaCompFormulaApi = "/table-dupa-component-formula";

const FormulaAssignment = () => {
  const [tblDupaCompFormulaFormData, setTblDupaCompFormulaFormData] = useState({
    table_dupa_component_id: "",
    formula_id: "",
  });
  const [modalTitle, setModalTitle] = useState();
  const [isShowModal, isSetShowModal] = useState(false);
  const [formula, setFormula] = useState(null);
  const [tblDupaComp, setTblDupaComp] = useState(null);
  const [tblDupaCompFormula, setTblDupaCompFormula] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(true);

  // FETCH FORMULA TO MODAL
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

  // FETCH TABLE DUPA COMPONENT TO MODAL
  const fetchTblDupaComp = async () => {
    api
      .get(TblDupaCompApi)
      .then(function (response) {
        setTblDupaComp(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // FETCH TABLE DUPA COMPONENT FORMULA TO TABLE
  const fetchTblDupaCompFormula = async (url) => {
    api
      .get(url)
      .then(function (response) {
        setTblDupaCompFormula(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // CREATE TABLE DUPA COMPONENT FORMULA FORM DATA TO MODAL
  const createTblDupaCompFormula = () => {
    setTblDupaCompFormulaFormData({
      ...tblDupaCompFormulaFormData,
      table_dupa_component_id: "",
      formula_id: "",
    });
    setModalTitle("Create Dupa Component Formula");
    isSetShowModal(true);
  };

  // GET FORMULA VALUE
  const getFormula = async (value) => {
    setTblDupaCompFormulaFormData({
      ...tblDupaCompFormulaFormData,
      formula_id: value,
    });
  };

  // GET TABLE DUPA COMPONENT VALUE
  const getDupaComponent = async (value) => {
    setTblDupaCompFormulaFormData({
      ...tblDupaCompFormulaFormData,
      table_dupa_component_id: value,
    });
  };

  // ON SUBMIT MODAL
  const onSubmit = async () => {
    var swal = Swal.fire(LoadingSwal);

    await csrfCookie();
    api
      .post(TblDupaCompFormulaApi, tblDupaCompFormulaFormData)
      .then(function (response) {
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
        isSetShowModal(false);
        setIsTableLoading(false);
        fetchTblDupaCompFormula(TblDupaCompFormulaApi);
        fetchTblDupaComp();
        swal.close();
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

  // UPDATE TABLE DUPA COMPONENT FORMULA
  const updateTblDupaCompFormula = async (id) => {
    setIsTableLoading(true);
    api
      .get(TblDupaCompFormulaApi + "/" + id)
      .then((response) => {
        setTblDupaCompFormulaFormData({
          ...tblDupaCompFormulaFormData,
          formula_id: response.data.formula_id,
          table_dupa_component_id: response.data.table_dupa_component_id,
          id: id,
        });
        setModalTitle("Update Dupa Component Formula");
        isSetShowModal(true);
        setIsTableLoading(false);
        // fetchTblDupaCompFormula(TblDupaCompFormulaApi);
        fetchTblDupaComp();
      })
      .catch((error) => {
        console.error("Error deleting item", error);
      });
  };

  // DELETE TABLE DUPA COMPONENT FORMULA
  const deleteTblDupaCompFormula = async (id) => {
    setIsTableLoading(true);
    await csrfCookie();
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(TblDupaCompFormulaApi + "/" + id)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            setIsTableLoading(false);
            fetchTblDupaCompFormula(TblDupaCompFormulaApi);
          })
          .catch((error) => {
            console.error("Error deleting item", error);
          });
      }
    });
  };

  // CAPITALIZE THE FIRST LETTER
  const capitalizeFirstLetter = (str) => {
    if (str == null) {
      // Handle the case when str is null or undefined
      return "";
    }

    return str.replace(/\b\w/g, (char) => char.toUpperCase());
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
            onClick={() => updateTblDupaCompFormula(text)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteTblDupaCompFormula(text)}
          ></Button>
        </Space>
      ),
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result",
      width: "10%",
      render: (text) => <span>{text.toUpperCase()}</span>,
    },
    {
      title: "Formula",
      dataIndex: "formula",
      key: "formula",
      width: "40%",
      render: (text) => <span>{text.toUpperCase()}</span>,
    },
    {
      title: "Dupa Component",
      dataIndex: "name",
      key: "name",
      width: "42%",
      render: (text) => <span>{capitalizeFirstLetter(text)}</span>,
    },
  ];

  // CANCEL TO MODAL
  const handleCancel = () => {
    setTblDupaCompFormulaFormData({
      ...tblDupaCompFormulaFormData,
      table_dupa_component_id: "",
      formula_id: "",
    });
    isSetShowModal(false);
  };

  useEffect(() => {
    fetchFormula();
    fetchTblDupaComp();
    fetchTblDupaCompFormula(TblDupaCompFormulaApi);
  }, []);

  return (
    <Layout className="layout-container">
      <Sidenav />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: 20 }}>
          <Row justify="end" style={{ marginBottom: "10px" }}>
            <Button
              onClick={createTblDupaCompFormula}
              type="primary"
              className="btn-create-b3"
              style={{ backgroundColor: "#539165" }}
            >
              <PlusOutlined /> Create Formula Assignment
            </Button>
          </Row>

          <div className="main-component-container">
            <Row justify="space-between">
              <Col span={12}>
                <p className="project-title">
                  <OrderedListOutlined /> Formula Assignment List
                </p>
              </Col>
            </Row>
            <div className="responsive-table">
              <TableComponents
                loading={isTableLoading}
                className="project-table"
                columns={columns}
                dataSource={
                  tblDupaCompFormula &&
                  tblDupaCompFormula.data.map((item) => ({
                    id: item.id,
                    result: item.formula.result,
                    formula: item.formula.formula,
                    name:
                      item.table_dupa_component[0].dupa[0].description +
                      (item.table_dupa_component[0].name == null
                        ? ""
                        : " - " + item.table_dupa_component[0].name),
                  }))
                }
                pagination={{
                  current: tblDupaCompFormula?.current_page,
                  pageSize: tblDupaCompFormula?.per_page,
                  total: tblDupaCompFormula?.total,
                  onChange: (page, pageSize) => {
                    setIsTableLoading(true);
                    fetchTblDupaCompFormula(
                      TblDupaCompFormulaApi + "?page=" + page
                    );
                  },
                }}
              />
            </div>
            <ModalComponents
              className="custom-modals"
              modalContent={
                <DupaComponentFormulaModal
                  modalTitle={modalTitle}
                  formula={formula}
                  tblDupaCompFormulaFormData={tblDupaCompFormulaFormData}
                  setTblDupaCompFormulaFormData={setTblDupaCompFormulaFormData}
                  getFormula={getFormula}
                  tblDupaComp={tblDupaComp}
                  setTblDupaComp={setTblDupaComp}
                  getDupaComponent={getDupaComponent}
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

export default FormulaAssignment;
