import React, { useEffect, useRef, useState } from "react";
import Sidenav from "../layout/Sidenav";
import { Button, Space, Row, Col, Input } from "antd";
import Navbar from "../layout/Navbar";
import Footernav from "../layout/Footernav";
import TableComponents from "../resources/TableComponents";
import ModalComponents from "../resources/ModalComponents";
import DupaFieldsModal from "../resources/modal_fields/dupa/DupaFieldsModal";
import UploadFilesModal from "../resources/modal_fields/UploadFilesModal";
import Swal from "sweetalert2";
import createSwal from "../resources/swal/CreateSwalAlert";
import { axios } from "../../axios-client";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { DeleteSwalConfig } from "../resources/swal/DeleteSwalConfig";
import {
  DeleteOutlined,
  EditOutlined,
  FolderViewOutlined,
  PlusOutlined,
  OrderedListOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import csrfCookie from "../../utilities/csrf-cookie";
import { LoadingSwal } from "../resources/swal/LoadingSwal";
import exportFiles from "../../utilities/export";
import { api } from "../../utilities/axios-gateway";

const { Content } = Layout;

const Dupa = () => {
  const [searchedText, setSearchedText] = useState("");
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [dupa, setDupa] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [dupaCategory, setDupaCategory] = useState(null);
  const [measurement, setMeasurement] = useState(null);
  const [isShowModal, isSetShowModal] = useState(false);
  const [dupaFormData, setDupaFormData] = useState({
    subcategory_id: "",
    item_number: "",
    description: "",
    unit_id: "",
    output_per_hour: "",
    category_dupa_id: "",
    id: "",
  });
  const [isUploadModal, setIsUploadModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [filesUpload, setFilesUpload] = useState(
    "Hi im from parent components"
  );
  const pondRef = useRef(null);
  // const [showCategorySelect, setShowCategorySelect] = useState(false);

  const link = "/dupa";
  const subCatLink = "/subcat";
  const measurementLink = "/measurement";
  const dupaCategoryLink = "/category-dupa";
  const importDupaLink = "/import-dupa";
  const Toast = createSwal();

  const fetchSubCategory = async () => {
    api
      .get(subCatLink)
      .then(function (response) {
        setSubCategory(response.data);
        setIsTableLoading(false);
        console.log("api", api.getUri);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchDupaCategory = async () => {
    api
      .get(dupaCategoryLink)
      .then(function (response) {
        setDupaCategory(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchMeasurement = async () => {
    api
      .get(measurementLink)
      .then(function (response) {
        setMeasurement(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchDupa = async () => {
    api
      .get(link)
      .then(function (response) {
        setDupa(response.data.data);
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
  const createDUPA = () => {
    setDupaFormData({
      ...dupaFormData,
      subcategory_id: "",
      item_number: "",
      description: "",
      unit_id: "",
      output_per_hour: "",
      category_dupa_id: "",
      id: "",
    });
    setModalTitle("Create Dupa");
    isSetShowModal(true);
    setIsUploadModal(false);
  };

  //CREATE AND UPLOAD DUPA
  const onSubmit = async (selectedCategory, selectedSubCategory) => {
    var swal = Swal.fire(LoadingSwal);
    await csrfCookie();
    const formData = new FormData();
    formData.append("filepond", filesUpload[0].file);
    formData.append("category_dupa_id", selectedCategory);
    formData.append("subcategory_id", selectedSubCategory);
    isUploadModal
      ? api
          .post(importDupaLink, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: "Upload File",
              text: "successfully uploaded file",
            });
            isSetShowModal(false);
            setIsTableLoading(true);
            fetchDupa();
            fetchDupaCategory();
            fetchMeasurement();
            fetchSubCategory();
          })
          .catch(function (error) {
            swal.close();
            console.log("error", error);
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
          .post(link, dupaFormData)
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            setIsTableLoading(true);
            fetchDupa();
            fetchDupaCategory();
            fetchMeasurement();
            fetchSubCategory();
          })
          .catch(function (error) {
            swal.close();

            Toast.fire({
              icon: "error",
              title: "Error",
              html: error.response.data.message,
            });
          });
  };

  //POPULATE FIELD WHEN CLICK UPDATE BUTTON
  const updateDupa = (id) => {
    api
      .get(link + "/" + id)
      .then(function (response) {
        setDupaFormData({
          ...dupaFormData,
          id: response.data.id,
          subcategory_id: response.data.subcategory_id,
          item_number: response.data.item_number,
          description: response.data.description,
          unit_id: response.data.unit_id,
          output_per_hour: response.data.output_per_hour,
          category_dupa_id: response.data.category_dupa_id,
        });
        setModalTitle("Update Dupa");
        isSetShowModal(true);
      })
      .catch(function (error) {
        Toast.fire({
          icon: "error",
          title: "Error",
          html: error.response.data.message,
        });
      });
  };

  const viewDupa = (id) => {
    api
      .get(link + "/" + id)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteDupa = (id) => {
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
            fetchDupa();
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

  //IMPORT CSV/EXCEL
  const importDUPA = () => {
    setIsUploadModal(true);
    setModalTitle("Import DUPA - CSV/Excel");
    isSetShowModal(true);
  };

  const columns = [
    {
      title: "Action",
      key: "action",
      width: "12%",
      dataIndex: "id",
      render: (text) => (
        <Space size="small">
          <Link to={"/dupa/" + text}>
            <Button
              type="link"
              icon={<FolderViewOutlined />}
              style={{ color: "black" }}
              onClick={() => viewDupa(text)}
            ></Button>
          </Link>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => updateDupa(text)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteDupa(text)}
          ></Button>
        </Space>
      ),
    },
    {
      title: "Item Code",
      dataIndex: "item_number",
      width: "11%",
      key: "item_code",
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.item_number)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.description)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.abbreviation)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.dupa_category)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.scope_of_work_subcategory)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      sorter: (a, b) => a.item_number.localeCompare(b.item_number),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: "Unit",
      dataIndex: "abbreviation",
      key: "abbreviation",
      sorter: (a, b) => a.abbreviation.localeCompare(b.abbreviation),
    },
    {
      title: "Category",
      dataIndex: "dupa_category",
      key: "dupa_category",
      sorter: (a, b) => a.dupa_category.localeCompare(b.dupa_category),
    },
    {
      title: "Sub Category",
      dataIndex: "scope_of_work_subcategory",
      key: "scope_of_work_subcategory",
      sorter: (a, b) =>
        a.scope_of_work_subcategory.localeCompare(b.scope_of_work_subcategory),
    },
  ];

  useEffect(() => {
    fetchDupa();
    fetchSubCategory();
    fetchMeasurement();
    fetchDupaCategory();
  }, []);

  return (
    <Layout className="layout-container">
      <Sidenav />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: 20 }}>
          <Row justify="end" style={{ marginBottom: "10px" }}>
            <Space>
              <Button onClick={importDUPA} className="btn-import-file">
                <CloudUploadOutlined />
                Import File
              </Button>
              <Button
                onClick={() => exportFiles("export-dupa", "Dupa-List")}
                className="btn-export-file"
                type="primary"
              >
                <CloudDownloadOutlined /> Export List
              </Button>
              <Button
                type="primary"
                onClick={createDUPA}
                className="btn-create-b3"
                style={{ backgroundColor: "#539165", color: "#fff" }}
              >
                <PlusOutlined /> Create DUPA
              </Button>
            </Space>
          </Row>
          <div className="main-component-container">
            <Row justify="space-between">
              <Col span={12}>
                <p className="project-title">
                  <OrderedListOutlined /> DUPA List
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
                dataSource={dupa}
              />
            </div>
            <ModalComponents
              className="custom-modals"
              modalContent={
                isUploadModal ? (
                  <UploadFilesModal
                    modalTitle={modalTitle}
                    setFilesUpload={setFilesUpload}
                    dupaCategory={dupaCategory ?? []}
                    subCategory={subCategory ?? []}
                    dupaFormData={dupaFormData}
                    setDupaFormData={setDupaFormData}
                    onSubmit={onSubmit}
                    showCategorySelect={true}
                    showSubCategorySelect={true}
                  />
                ) : (
                  <DupaFieldsModal
                    dupaFormData={dupaFormData}
                    setDupaFormData={setDupaFormData}
                    subCategory={subCategory || []}
                    measurement={measurement || []}
                    dupaCategory={dupaCategory || []}
                    modalTitle={modalTitle}
                  />
                )
              }
              isShownModal={isShowModal}
              handleOk={() =>
                onSubmit(
                  dupaFormData.category_dupa_id,
                  dupaFormData.subcategory_id
                )
              }
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

export default Dupa;
