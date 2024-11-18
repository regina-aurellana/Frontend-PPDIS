import React, { useState, useEffect } from "react";
import { Button, Tag, Row, Col, Input, Layout } from "antd";
import "../../styles/Styles.css";
import Sidenav from "../layout/Sidenav";
import Navbar from "../layout/Navbar";
import Footernav from "../layout/Footernav";
import ModalComponents from "../resources/ModalComponents";
import TableComponents from "../resources/TableComponents";
import ProjModalFields from "../resources/modal_fields/ProjFieldsModal";
import { axios } from "../../axios-client";
import createSwal from "../resources/swal/CreateSwalAlert";
import {
  EditOutlined,
  PlusOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import { LoadingSwal } from "../resources/swal/LoadingSwal";

import csrfCookie from "../../utilities/csrf-cookie";
import { api } from "../../utilities/axios-gateway";

const { Content } = Layout;

const Projects = () => {
  const [searchedText, setSearchedText] = useState();
  const [proj, setProj] = useState(null);
  const [projNature, setProjNature] = useState([]);
  const [projNatureType, setProjNatureType] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isShowModal, isSetShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [formData, setFormData] = useState({
    registry_no: "",
    project_title: "",
    project_nature_id: "",
    project_nature_type_id: "",
    concerned_division: "",
    barangay_id: "",
    district_id: "",
    duration: "",
    contractor: "",
    location: "",
    status: "Pending",
  });
  const [district, setDistrict] = useState(null);
  const [barangay, setBarangay] = useState(null);

  const projlink = "/project";
  const natureLink = "/nature";
  const natureTypeLink = "/type";
  const districtAPI = "district/";
  const barangayAPI = "barangay/";

  const Toast = createSwal();

  //FETCH DISTRICT
  const fetchDistrict = () => {
    api(districtAPI)
      .then((response) => {
        setDistrict(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //RETRIEVE ALL PROJECT -- GET Request --
  const fetchProj = () => {
    api
      .get(projlink)
      .then(function (response) {
        setProj(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //RETRIEVE ALL PROJECT NATURE -- GET Request --
  const fetchProjNature = async () => {
    api
      .get(natureLink)
      .then(function (response) {
        setProjNature(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //RETRIEVE ALL PROJECT NATURE TYPE -- GET Request By Id Nature --
  const getProjNature = async (id) => {
    setFormData({ ...formData, project_nature_id: id });
    api
      .get(natureTypeLink + "/" + id)
      .then(function (response) {
        setProjNatureType(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getProjNatureType = (value) => {
    setFormData({ ...formData, project_nature_type_id: value });
  };

  // CREATE B3 PROJECT
  const createProj = () => {
    setFormData({
      ...formData,
      project_title: "",
      registry_no: "",
      project_nature_id: "",
      project_nature_type_id: "",
      concerned_division: "",
      barangay_id: "",
      district_id: "",
      duration: "",
      contractor: "",
      location: "",
    });
    setModalTitle("Create B3 Project");

    isSetShowModal(true);
  };

  // MODAL CANCEL TRIGGER
  const handleCancel = () => {
    isSetShowModal(false);
  };

  //MODAL ON SUBMIT FORM
  const onSubmit = async () => {
    var swal = Swal.fire(LoadingSwal);
    console.log(["onsub", formData]);
    await csrfCookie();
    api
      .post(projlink, formData)
      .then(function (response) {
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
        isSetShowModal(false);
        setIsTableLoading(true);
        fetchProj();
      })
      .catch(function (error) {
        swal.close();

        var errors = "";

        // Object.values(error.response.data.errors).map(
        //   (value) => (errors += `<li>${value}</li>`)
        // );

        Toast.fire({
          icon: "error",
          title: "Error",
          html: errors,
        });
      });
  };

  // UPDATE B3 PROJECTS
  const updateProj = async (id) => {
    api
      .get(projlink + "/" + id)
      .then(function (response) {
        setFormData({
          ...formData,
          project_title: response.data.project_title,
          registry_no: response.data.registry_no,
          project_nature_id: response.data.project_nature_id,
          project_nature_type_id: response.data.project_nature_type_id,
          concerned_division: response.data.concerned_division,
          barangay_id: response.data.barangay_id,
          district_id: response.data.district_id,
          duration: response.data.duration,
          contractor: response.data.contractor,
          location: response.data.location,
        });
        setModalTitle("Update B3 Project");
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

  useEffect(() => {
    fetchProj();
    fetchProjNature();
    fetchDistrict();
  }, []);

  // FETCH DATA TO TABLE
  const columns = [
    {
      title: "",
      key: "action",
      dataIndex: "id",
      render: (int) => (
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => updateProj(int)}
        ></Button>
      ),
    },
    {
      title: "Project title",
      dataIndex: "project_title",
      width: "30%",
      key: "project_title",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.project_title)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.project_nature_id)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.project_nature_type)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.location).toLowerCase().includes(value.toLowerCase()) ||
          String(record.registry_no)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.status).toLowerCase().includes(value.toLowerCase())
        );
      },
      sorter: (a, b) => a.project_title.localeCompare(b.project_title),
    },
    {
      title: "Project Nature",
      dataIndex: "project_nature_id",
      width: "15%",
      key: "project_nature_id",
      sorter: (a, b) => a.project_nature_id.localeCompare(b.project_nature_id),
    },
    {
      title: "Nature type",
      dataIndex: "project_nature_type_id",
      key: "project_nature_type_id",
      width: "15%",
      sorter: (a, b) =>
        a.project_nature_type_id.localeCompare(b.project_nature_type_id),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: "30%",
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Registry No.",
      dataIndex: "registry_no",
      key: "registry_no",
      sorter: (a, b) => a.registry_no.localeCompare(b.registry_no),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => {
        let badgeStatus = "default";
        if (text === "Completed") {
          badgeStatus = "#609966";
        } else if (text === "Pending") {
          badgeStatus = "#E97777";
        } else if (text === "On-going") {
          badgeStatus = "#97DEFF";
        }
        return <Tag color={badgeStatus}>{text}</Tag>;
      },
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
              onClick={createProj}
              type="primary"
              className="btn-create-b3"
              style={{ backgroundColor: "#539165" }}
            >
              <PlusOutlined /> Create B3 Project
            </Button>
          </Row>

          <div className="main-component-container">
            <Row justify="space-between">
              <Col span={12}>
                <p className="project-title">
                  <OrderedListOutlined /> B3 Projects List
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
                dataSource={proj}
              />
            </div>

            <ModalComponents
              className="custom-modals"
              modalContent={
                <ProjModalFields
                  formData={formData}
                  setFormData={setFormData}
                  projNature={projNature}
                  projNatureType={projNatureType}
                  getProjNature={getProjNature}
                  getProjNatureType={getProjNatureType}
                  district={district}
                  setDistrict={setDistrict}
                  barangay={barangay}
                  setBarangay={setBarangay}
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

export default Projects;
