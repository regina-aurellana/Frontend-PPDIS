import { Button, Col, Layout, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import Sidenav from "../../layout/Sidenav";
import Navbar from "../../layout/Navbar";
import { Content } from "antd/es/layout/layout";
import {
  DeleteOutlined,
  EditOutlined,
  OrderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Footernav from "../../layout/Footernav";
import TableComponents from "../../resources/TableComponents";
import ModalComponents from "../../resources/ModalComponents";
import TableDupaComponentModal from "../../resources/modal_fields/takeoff_config_modals/TableDupaComponentModal";
import { axios } from "../../../axios-client";
import csrfCookie from "../../../utilities/csrf-cookie";
import createSwal from "../../resources/swal/CreateSwalAlert";
import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";
import Swal from "sweetalert2";
import { LoadingSwal } from "../../resources/swal/LoadingSwal";

//gateway
import { api } from "../../../utilities/axios-gateway";

const Toast = createSwal();

const DupaApi = "/dupa";
const TblDupaCompApi = "/table-dupa-component";

const TableDupaComponent = () => {
  const [tblDupaCompFormData, setTblDupaCompFormData] = useState({
    dupa_id: "",
    name: "",
  });
  const [modalTitle, setModalTitle] = useState();
  const [isShowModal, isSetShowModal] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [dupa, setDupa] = useState(null);
  const [tblDupaComp, setTblDupaComp] = useState(null);

  // FETCH DUPA TO MODAL
  const fetchDupa = async () => {
    api
      .get(DupaApi)
      .then(function (response) {
        setDupa(response.data.data);
        // console.log(response.data.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // FETCH TABLE DUPA COMPONENT TO TABLE
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
            onClick={() => updateTblDupaComp(text)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteTblDupaComp(text)}
          ></Button>
        </Space>
      ),
    },
    {
      title: "Dupa",
      dataIndex: "description",
      key: "description",
      width: "46%",
    },
    {
      title: "Dupa Component Name",
      dataIndex: "name",
      key: "name",
      width: "46%",
      render: (text, record) => (
        <span>
          {record.name ? capitalizeFirstLetter(text) : record.description}
        </span>
      ),
    },
  ];

  // CREATE TABLE DUPA COMPONENT
  const createTblDupaComp = () => {
    setTblDupaCompFormData({
      ...tblDupaCompFormData,
      dupa_id: "",
      name: "",
    });
    setModalTitle("Create Table Dupa Component");
    isSetShowModal(true);
  };

  // GET DUPA FORM DATA
  const getDupa = async (value) => {
    setTblDupaCompFormData({ ...tblDupaCompFormData, dupa_id: value });
  };

  // ON SUBMIT MODAL
  const onSubmit = async () => {
    var swal = Swal.fire(LoadingSwal);
    await csrfCookie();
    api
      .post(TblDupaCompApi, tblDupaCompFormData)
      .then(function (response) {
        if (response.data.message.includes("Column 'dupa_id' cannot be null")) {
          Toast.fire({
            icon: "warning",
            title: "warning",
            text: "The Dupa field is required. (and 1 more error)",
          });
          setIsTableLoading(false);
          fetchTblDupaComp();
        } else {
          Toast.fire({
            icon: "success",
            title: response.data.status,
            text: response.data.message,
          });
          setIsTableLoading(false);
          isSetShowModal(false);
          fetchTblDupaComp();
        }
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

  //UPDATE TABLE DUPA COMPONENT
  const updateTblDupaComp = async (id) => {
    api
      .get(TblDupaCompApi + "/" + id)
      .then((response) => {
        setTblDupaCompFormData({
          ...tblDupaCompFormData,
          dupa_id: response.data.dupa_id,
          name: response.data.name,
          id: id,
        });
        setModalTitle("Update Table Dupa Component");
        isSetShowModal(true);
        setIsTableLoading(false);
        fetchTblDupaComp();
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      });
  };

  // DELETE TABLE DUPA COMPONENT
  const deleteTblDupaComp = async (id) => {
    await csrfCookie();
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(TblDupaCompApi + "/" + id)
          .then((response) => {
            if (
              response.data.message.includes(
                "Cannot be deleted due to associated content"
              )
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
            fetchTblDupaComp();
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

  // CANCEL TO MODAL
  const handleCancel = () => {
    setTblDupaCompFormData({
      ...tblDupaCompFormData,
      dupa_id: "",
      name: "",
      id: "",
    });
    isSetShowModal(false);
  };

  useEffect(() => {
    fetchDupa();
    fetchTblDupaComp();
  }, []);

  return (
    <Layout className="layout-container">
      <Sidenav />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: 20 }}>
          <Row justify="end" style={{ marginBottom: "10px" }}>
            <Button
              onClick={createTblDupaComp}
              type="primary"
              className="btn-create-b3"
              style={{ backgroundColor: "#539165" }}
            >
              <PlusOutlined /> Create Dupa Component
            </Button>
          </Row>

          <div className="main-component-container">
            <Row justify="space-between">
              <Col span={12}>
                <p className="project-title">
                  <OrderedListOutlined /> Dupa Component List
                </p>
              </Col>
            </Row>
            <div className="responsive-table">
              <TableComponents
                loading={isTableLoading}
                className="project-table"
                columns={columns}
                dataSource={tblDupaComp}
                pagination={{ pageSize: 5 }}
              />
            </div>
            <ModalComponents
              className="custom-modals"
              modalContent={
                <TableDupaComponentModal
                  modalTitle={modalTitle}
                  dupa={dupa}
                  setTblDupaCompFormData={setTblDupaCompFormData}
                  tblDupaCompFormData={tblDupaCompFormData}
                  getDupa={getDupa}
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

export default TableDupaComponent;
