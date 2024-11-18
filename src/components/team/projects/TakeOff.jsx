import {
  Col,
  Row,
  Space,
  Spin,
  Button,
  Card,
  Tabs,
  Alert,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { axios } from "../../../axios-client";
import { useParams } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
  CloudUploadOutlined,
  FolderViewOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import csrfCookie from "../../../utilities/csrf-cookie";
import createSwal from "../../resources/swal/CreateSwalAlert";
import ModalComponents from "../../resources/ModalComponents";
import CreateTakeOffModal from "../../resources/modal_fields/take_off_modals/CreateTakeOffModal";
import CreateTable from "../../resources/modal_fields/take_off_modals/CreateTable";
import CreateContingency from "../../resources/modal_fields/take_off_modals/CreateContingency";
import Swal from "sweetalert2";
import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";
import UpdateRowTable from "../../resources/modal_fields/take_off_modals/UpdateRowTable";
import TabPane from "antd/es/tabs/TabPane";
import { SaveSwalAlert } from "../../resources/swal/SaveSwalAlert";
import UploadFilesModal from "../../resources/modal_fields/UploadFilesModal";
import PreviewModal from "../../resources/modal_fields/take_off_modals/PreviewModal";
import { LoadingSwal } from "../../resources/swal/LoadingSwal";

import { api } from "../../../utilities/axios-gateway";

const Toast = createSwal();

const ProjApi = "/project";
const TakeOffApi = "/take-off";
const TakeOffTblApi = "/take-off-table-select";
const TakeOffTblByTakeOffIdApi = "/take-off-table-by-takeoff-id";
const SOWCatApi = "/sowcat";
const TblDupaCompApi = "/dupa-per-project_list";
const TakeOffTblField = "/take-off-table-field";
const TakeOffTableCompute = "/take-off-table-input-compute";
const ContingencyApi = "/take-off-table-contingency/";
const EditRowTableApi = "/take-off-table-field-input"; // /take-off-table-field-input/
const UploadTakeOffApi = "/import-takeoff/";
const TakeOffTableTransferQuantity =
  "/take-off-table-transfer-quantity-to-pow/";

const TakeOff = ({
  latestDUPA,
  dupaGroupId,
  onUpdateDupaQuantity,
  setHasTakeOffData,
}) => {
  const { id } = useParams();
  const footer = useRef(true);
  const [project, setProject] = useState(null);
  const [takeOff, setTakeOff] = useState([]);
  const [sowCat, setSOWCat] = useState([]);
  const [tblDupaComp, setTblDupaComp] = useState([]);
  const [takeOffTable, setTakeOffTable] = useState([]);
  const [takeOffTableField, setTakeOffTableField] = useState([]);
  const [inputFields, setInputFields] = useState({});
  const [location, setLocation] = useState();
  const [takeOffTblCompute, setTakeOffTblCompute] = useState([]);
  const [tableFieldName, setTableFieldName] = useState([]);
  const [editTakeOffTableId, setEditTakeOffTableId] = useState();
  const [uploadTakeOffId, setUploadTakeOffId] = useState();

  const [dataLoading, setDataLoading] = useState(true);
  const [isShowModal, isSetShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [selectedContent, setSelectedContent] = useState(null);
  const [contingencyApiId, setContingencyApiId] = useState("");
  const [modalWidth, setModalWidth] = useState();
  const [takeOffHeaderModal, setTakeOffHeaderModal] = useState();

  const [takeoffFormData, setTakeOffFormData] = useState({
    b3_project_id: id,
  });
  const [limitNLenghtFormData, setLimitNLenghtFormData] = useState({
    limit: "",
    length: "",
    b3_project_id: "",
  });
  const [takeOffTableFormData, setTakeOffTableFormData] = useState({
    take_off_id: "",
    sow_category_id: [],
    dupa_per_project_id: [],
  });
  const [contingencyFormData, setContingencyFormData] = useState({
    contingency: "",
  });
  const [rowTableEditFormData, setRowTableEditFormData] = useState({
    row_no: "",
    take_off_table_id: "",
    take_off_table_field_id: "",
    value: "",
    mark_description: "",
  });
  const [filesUpload, setFilesUpload] = useState(
    "Hi im from parent components"
  );

  const fetchSOWCat = async () => {
    api
      .get(SOWCatApi)
      .then(function (response) {
        setSOWCat(response.data);
        setDataLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchTakeOffProject = async () => {
    try {
      const response = await api.get(ProjApi + "/" + id);
      setProject(response.data);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTakeOff = async () => {
    try {
      const response = await api.get(TakeOffApi + "/" + id);
      setTakeOff(response.data);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTakeOffTable = async (take_off_id) => {
    try {
      const response = await api.get(
        TakeOffTblByTakeOffIdApi + "/" + take_off_id
      );
      setTakeOffTable(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTakeOffTableField = async () => {
    try {
      const response = await api.get(TakeOffTblField + "/" + id);
      setTakeOffTableField(response.data);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTakeOffTblCompute = async () => {
    api
      .get(TakeOffTableCompute + "/" + id)
      .then(function (response) {
        setTakeOffTblCompute(response.data);
        setDataLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createTakeOff = async () => {
    setModalWidth(500);
    footer.current = true;
    if (takeOff.length === 0 && project.project_nature_id === 1) {
      message.error(
        "Cannot create take off when the limit and length are not set."
      );
    } else {
      await csrfCookie();
      Swal.fire(SaveSwalAlert).then((result) => {
        if (result.isConfirmed) {
          api
            .post(TakeOffApi, takeoffFormData)
            .then(function (response) {
              Toast.fire({
                icon: "success",
                title: response.data.status,
                text: response.data.message,
              });
              isSetShowModal(false);
              fetchTakeOff();
              setDataLoading(true);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    }
  };

  const createLimitNLength = () => {
    setLimitNLenghtFormData({
      ...limitNLenghtFormData,
      b3_project_id: id,
      limit: "",
      length: "",
    });
    setSelectedContent("Set Limit and Length");
    setModalTitle("Set Limit and Length");
    isSetShowModal(true);
    footer.current = true;
    setModalWidth(500);
  };

  const createTakeOffTable = async (take_off_id) => {
    setSelectedContent("Create Takeoff Table");
    setModalTitle("Select DUPA");
    isSetShowModal(true);
    setModalWidth(500);
    footer.current = true;

    await fetchTakeOffTable(take_off_id);
    try {
      const response = await api.get(
        `${TblDupaCompApi}/${id}/take_off/${take_off_id}`
      );
      setTblDupaComp(response.data);
      console.log(response.data);

      setTakeOffTableFormData({
        ...takeOffTableFormData,
        take_off_id: take_off_id,
        sow_category_id: [],
        dupa_per_project_id: [],
      });

      setDataLoading(false);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };

  const createContingency = (table_id) => {
    const newContingencyApiId = ContingencyApi + table_id;
    setContingencyApiId(newContingencyApiId);
    setContingencyFormData({
      ...contingencyFormData,
      contingency: "",
    });
    setSelectedContent("Create Contingency");
    setModalTitle("Create Contingency");
    isSetShowModal(true);
    footer.current = true;
    setModalWidth(500);
  };

  const getSOWCat = async (value) => {
    setTakeOffTableFormData({
      ...takeOffTableFormData,
      sow_category_id: value,
    });
  };

  const onSubmit = async () => {
    var swal = Swal.fire(LoadingSwal);
    await csrfCookie();
    let POWContentLink, POWContentForm;
    const formData = new FormData();

    if (selectedContent === "Set Limit and Length") {
      POWContentLink = TakeOffApi;
      POWContentForm = limitNLenghtFormData;
    } else if (selectedContent === "Create Takeoff Table") {
      POWContentLink = TakeOffTblApi;
      POWContentForm = takeOffTableFormData;
    } else if (selectedContent === "Create Contingency") {
      POWContentLink = contingencyApiId;
      POWContentForm = contingencyFormData;
    } else if (selectedContent === "Update Row Table") {
      POWContentLink = EditRowTableApi + editTakeOffTableId;
      POWContentForm = rowTableEditFormData;
    } else if (selectedContent === "Upload Take Off File") {
      POWContentLink = UploadTakeOffApi;
      POWContentForm = formData;
    } else {
      return null;
    }

    try {
      if (selectedContent === "Update Row Table") {
        const response = await api.put(POWContentLink, POWContentForm);

        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        }).then(async (res2) => {
          await api.post(
            `${TakeOffTableTransferQuantity}${POWContentForm.take_off_table_id}`,
            POWContentForm
          );
          onUpdateDupaQuantity(POWContentForm);
        });
      } else if (selectedContent === "Upload Take Off File") {
        formData.append("filepond", filesUpload[0].file);
        formData.append("take_off_id", uploadTakeOffId);
        const response = await api.post(POWContentLink, POWContentForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        Toast.fire({
          icon: "success",
          title: "Upload File",
          text: "successfully uploaded file",
        });
        console.log(response);
      } else if (selectedContent === "Create Contingency") {
        const response = api.post(POWContentLink, POWContentForm);

        response.then((res) => {
          Toast.fire({
            icon: "success",
            title: res.data.status,
            text: res.data.message,
          }).then(async (res2) => {
            await api.post(
              `${TakeOffTableTransferQuantity}${POWContentForm.id}`,
              POWContentForm
            );
            onUpdateDupaQuantity(contingencyFormData.contingency);
          });
        });
      } else {
        const response = await api.post(POWContentLink, POWContentForm);
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
      }

      isSetShowModal(false);
      fetchTakeOff();
      fetchTakeOffTable();
      fetchTakeOffTblCompute();
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
    }
  };

  const updateRowTable = (rowItem, table, mark) => {
    const takeOffTableID = rowItem.take_off_table_id;
    const rowItems = parseInt(rowItem.row_no);
    const rowData = table[rowItems].map((test) => test.take_off_table_field_id);
    const rowValue = table[rowItems].map((val) => val.value);
    const measurementName = table[rowItems].map((mName) => mName.name);

    setTableFieldName(measurementName);
    setEditTakeOffTableId(takeOffTableID);

    setRowTableEditFormData((rowTableEditFormData) => ({
      ...rowTableEditFormData,
      row_no: rowItems,
      take_off_table_id: takeOffTableID,
      take_off_table_field_id: rowData,
      value: rowValue,
      mark_description: mark,
    }));

    setSelectedContent("Update Row Table");
    setModalTitle("Update Row Table");
    setModalWidth(500);
    footer.current = true;
    isSetShowModal(true);
  };

  const deleteTakeOffTableInput = (id, takeOffId) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(EditRowTableApi + "/" + id)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            }).then(() => {
              fetchTakeOff();
              fetchTakeOffTable();
              fetchTakeOffTblCompute();
              api.post(
                `${TakeOffTableTransferQuantity}${takeOffId}`,
                takeOffId
              );
              onUpdateDupaQuantity(takeOffId);
            });
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

  const setContentField = () => {
    switch (selectedContent) {
      case "Set Limit and Length":
        return (
          <CreateTakeOffModal
            modalTitle={modalTitle}
            limitNLenghtFormData={limitNLenghtFormData}
            setLimitNLenghtFormData={setLimitNLenghtFormData}
          />
        );
      case "Create Takeoff Table":
        return (
          <CreateTable
            modalTitle={modalTitle}
            sowCat={sowCat}
            tblDupaComp={tblDupaComp}
            getSOWCat={getSOWCat}
            takeOffTableFormData={takeOffTableFormData}
            setTakeOffTableFormData={setTakeOffTableFormData}
          />
        );
      case "Create Contingency":
        return (
          <CreateContingency
            modalTitle={modalTitle}
            contingencyFormData={contingencyFormData}
            setContingencyFormData={setContingencyFormData}
          />
        );
      case "Update Row Table":
        return (
          <UpdateRowTable
            modalTitle={modalTitle}
            takeOff={takeOff}
            tableFieldName={tableFieldName}
            setRowTableEditFormData={setRowTableEditFormData}
            rowTableEditFormData={rowTableEditFormData}
          />
        );
      case "Upload Take Off File":
        return (
          <UploadFilesModal
            modalTitle={modalTitle}
            setFilesUpload={setFilesUpload}
          />
        );
      case "Preview TakeOff":
        return (
          <PreviewModal
            takeOff={takeOff}
            takeOffHeaderModal={takeOffHeaderModal}
            project={project}
            isSetShowModal={isSetShowModal}
          />
        );
    }
  };

  const handleCancel = () => {
    isSetShowModal(false);
  };

  const handleInputChange = (table_id, index, value, fieldName) => {
    setInputFields((prevState) => {
      const updatedFields = [...prevState[table_id]];
      updatedFields[index] = { ...updatedFields[index], [fieldName]: value };
      return {
        ...prevState,
        [table_id]: updatedFields,
      };
    });
    console.log(inputFields);
  };

  const handleAddFields = (table_id) => {
    setInputFields((prevState) => ({
      ...prevState,
      [table_id]: [...(prevState[table_id] || []), ""],
    }));
  };

  const handleRemoveFields = (tableId, index) => {
    const updatedInputFields = { ...inputFields };
    if (updatedInputFields[tableId]) {
      updatedInputFields[tableId].splice(index, 1);
      setInputFields(updatedInputFields);
    } else {
      console.error(`Field ${tableId} is undefined`);
    }
  };

  // save the row data of field to take off part1 table
  const handleGetRowData = async (index, table_id) => {
    var swal = Swal.fire(LoadingSwal);
    await csrfCookie();
    const rowData = inputFields[table_id][index] || [];
    const valuesArray = Object.values(rowData);
    const indexesArray = Object.keys(rowData).map(Number);
    const tableMeasurementData = {
      take_off_table_id: table_id,
      take_off_table_field_id: indexesArray,
      value: valuesArray,
      mark_description: location,
    };

    api
      .post(EditRowTableApi, tableMeasurementData)
      .then(function (response) {
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        }).then(() => {
          fetchTakeOff();
          setInputFields({});
          api.post(
            `${TakeOffTableTransferQuantity}${tableMeasurementData.take_off_table_id}`,
            tableMeasurementData
          );
          onUpdateDupaQuantity(tableMeasurementData);
        });
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

  // UPDATE CONTINGENCY
  const updateContingency = async (tbl) => {
    const newContingencyApiId = ContingencyApi + tbl.id;
    setContingencyApiId(newContingencyApiId);
    setContingencyFormData({
      ...contingencyFormData,
      id: tbl.id,
      contingency: tbl.contingency,
    });
    setSelectedContent("Create Contingency");
    setModalTitle("Update Contingency");
    isSetShowModal(true);
    footer.current = true;
    setModalWidth(500);
  };

  //UPLOAD FILE
  const uploadFiles = (take_off_id) => {
    setUploadTakeOffId(take_off_id);
    isSetShowModal(true);
    setModalTitle("Upload Take Off File - CSV/Excel");
    setSelectedContent("Upload Take Off File");
    setModalWidth(500);
    isSetShowModal(true);
    footer.current = true;
  };

  // PREVIEW TAKEOFF
  const previewTakeOFf = (take_off) => {
    setTakeOffHeaderModal(take_off);
    setSelectedContent("Preview TakeOff");
    setDataLoading(false);
    isSetShowModal(true);
    setModalWidth(1300);
    footer.current = false;
  };

  useEffect(() => {
    fetchSOWCat();
    fetchTakeOffProject();
    fetchTakeOffTable();
    fetchTakeOffTableField();
    fetchTakeOffTblCompute();
  }, []);

  useEffect(() => {
    fetchTakeOff();
  }, [latestDUPA, dupaGroupId]);

  // CHECKING THE TAKEOFF DATA FOR THE SUBMISSION FOR APPROVAL
  useEffect(() => {
    if (takeOff[0]?.take_off_table?.length > 0) {
      setHasTakeOffData(true);
    } else {
      setHasTakeOffData(false);
    }
  }, [takeOff]);

  return (
    <div>
      <div>
        <Row>
          <Col span={14}>
            <p className="takeoff-proj">
              <strong>B ID#: </strong> 202305
            </p>
            <p className="takeoff-proj">
              <strong>Project Registry No.(DED): </strong>
              {project?.registry_no}
            </p>
            <p className="takeoff-proj">
              <strong>Project Name: </strong> {project?.project_title}
            </p>
            <p className="takeoff-proj">
              <strong>Location: </strong> {project?.location}
            </p>
          </Col>
          <Col span={10}>
            <p className="takeoff-proj">
              <strong>Project Category: </strong>
              {project?.project_nature}
            </p>
            <p className="takeoff-proj">
              <strong>Project Subject: </strong>
              {project?.project_nature_type}
            </p>
            {project?.project_nature_id === 1 ? (
              <div>
                <p className="takeoff-proj">
                  <strong>Limit: </strong>
                  {takeOff[0]?.limit ? takeOff[0]?.limit : "N/A"}
                </p>
                <p className="takeoff-proj">
                  <strong>Length: </strong>
                  {takeOff[0]?.length ? takeOff[0]?.length : "N/A"}
                </p>
              </div>
            ) : null}
          </Col>

          <Col span={24} align="center">
            <p className="quantity-proj">QUANTITY TAKE-OFF</p>
            <p className="takeoff-proj">
              {project?.project_nature}/{project?.project_nature_type}
            </p>
          </Col>
          <Col span={24}>
            {takeOff.length === 0 && project?.project_nature_id === 1 ? (
              <Button
                onClick={createLimitNLength}
                type="primary"
                icon={<PlusOutlined />}
                style={{ backgroundColor: "#539165", marginBottom: "10px" }}
              >
                Set Length and Limit
              </Button>
            ) : null}
          </Col>
        </Row>

        {dataLoading ? (
          <Space direction="vertical" style={{ width: "100%" }}>
            <Spin size="medium">
              <div className="content" />
            </Spin>
          </Space>
        ) : takeOff.length === 0 && project?.project_nature_id === 2 ? (
          <div>
            <Button
              onClick={createTakeOff}
              type="primary"
              icon={<PlusOutlined />}
              style={{ backgroundColor: "#539165", marginBottom: "10px" }}
            >
              Create TakeOff
            </Button>
            <Alert
              message="No takeoff data available. Click the 'Create TakeOff' button to add data."
              type="info"
              showIcon
            />
          </div>
        ) : (
          takeOff.length > 0 && (
            <div>
              <Card>
                <Tabs>
                  {takeOff.map((data, index) => {
                    return (
                      <TabPane
                        tab={
                          data.name
                            ? data.name
                            : data.b3_projects?.project_nature.id === 1
                            ? "Street " + data.group_no
                            : "Building " + data.group_no
                        }
                        key={data.id}
                        onClick=""
                      >
                        <Space>
                          <Button
                            onClick={() => createTakeOffTable(data.id)}
                            type="primary"
                            icon={<SelectOutlined />}
                            style={{
                              backgroundColor: "#539165",
                            }}
                          >
                            Select DUPA
                          </Button>

                          <Button
                            onClick={() => previewTakeOFf(data)}
                            type="primary"
                            icon={<FolderViewOutlined />}
                            style={{
                              backgroundColor: "#176B87",
                            }}
                          >
                            Preview TakeOff
                          </Button>

                          <Button
                            className="btn-import-file"
                            onClick={() => uploadFiles(data.id)}
                            icon={<CloudUploadOutlined />}
                          >
                            Import File
                          </Button>
                        </Space>

                        {data.take_off_table.length > 0 &&
                          data.take_off_table.map((tbl, tableIndex) => (
                            <>
                              <div
                                className="take-off-table-component"
                                key={tableIndex}
                                style={{ marginTop: 10 }}
                              >
                                <React.Fragment key={tableIndex}>
                                  {tableIndex === 0 ||
                                  (tableIndex > 0 &&
                                    tbl.sow_category_name !==
                                      data.take_off_table[tableIndex - 1]
                                        .sow_category_name) ? (
                                    <div className="table-title-container">
                                      <h1 className="table-title">
                                        {tbl.sow_category_name}
                                      </h1>
                                    </div>
                                  ) : null}
                                </React.Fragment>

                                <Row className="takeoff-table-row-header">
                                  <Col className="item-code-container" span={6}>
                                    <span className="takeoff-dupa-comp-name">
                                      Item Code: {tbl.item_number}
                                    </span>
                                  </Col>
                                  <Col className="name-container" span={8}>
                                    {tbl.name === null ? (
                                      <span className="takeoff-dupa-comp-name">
                                        {tbl.description}
                                      </span>
                                    ) : (
                                      <span className="takeoff-dupa-comp-name">
                                        {tbl.description} - {tbl.name}
                                      </span>
                                    )}
                                  </Col>
                                  <Col className="buttons-container" span={10}>
                                    <Space>
                                      <Button
                                        onClick={() => handleAddFields(tbl.id)}
                                        type="primary"
                                        className="btn-add-row"
                                        style={{
                                          backgroundColor: "#539165",
                                        }}
                                      >
                                        <PlusOutlined /> Add Row
                                      </Button>
                                    </Space>
                                  </Col>
                                </Row>
                              </div>

                              {/* ============== SHOW ROW INPUT FIELD VALUES WHEN ROW HAS A DATA ========== */}

                              <Row key={tbl.id}>
                                <table className="takeoff-table">
                                  <thead>
                                    <tr>
                                      <th>Location</th>
                                      {tbl.Result?.fieldName.map(
                                        (tblHead, idx) => (
                                          <th>{tblHead}</th>
                                        )
                                      )}
                                      <th>{tbl.result}</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {tbl.hasOwnProperty("Result") &&
                                      Object.keys(tbl.Result?.fieldValue)
                                        .filter((key) => key.startsWith("row"))
                                        .map((rowKey, idx) => (
                                          <tr key={idx}>
                                            <td>
                                              <input
                                                value={
                                                  tbl.Result.mark[idx]
                                                    .mark_description ||
                                                  undefined
                                                }
                                                className="table-input"
                                                type="text"
                                                disabled={true}
                                                style={{
                                                  backgroundColor: "#f5f5f5",
                                                }}
                                              />
                                            </td>

                                            {tbl.Result?.fieldValue[rowKey].map(
                                              (value, valueIdx) => (
                                                <td key={valueIdx}>
                                                  <input
                                                    value={value || undefined}
                                                    className="table-input"
                                                    type="text"
                                                    disabled={true}
                                                    style={{
                                                      backgroundColor:
                                                        "#f5f5f5",
                                                    }}
                                                  />
                                                </td>
                                              )
                                            )}

                                            <td>
                                              <input
                                                value={
                                                  tbl.Result.row_result[idx] ||
                                                  undefined
                                                }
                                                className="table-input"
                                                type="text"
                                                disabled={true}
                                                style={{
                                                  backgroundColor: "#f5f5f5",
                                                }}
                                              />
                                            </td>
                                            <td
                                              className="action-column"
                                              style={{ width: "10%" }}
                                            >
                                              <Button
                                                icon={<EditOutlined />}
                                                type="link"
                                                primary
                                                onClick={() =>
                                                  updateRowTable(
                                                    tbl.Result.mark[idx],
                                                    tbl.takeOffTableFieldsInputDatas,
                                                    tbl.Result.mark[idx]
                                                      .mark_description
                                                  )
                                                }
                                              ></Button>
                                              <Button
                                                type="link"
                                                icon={<DeleteOutlined />}
                                                danger
                                                onClick={() =>
                                                  deleteTakeOffTableInput(
                                                    tbl.Result.mark[idx].row_no,
                                                    tbl.id
                                                  )
                                                }
                                              ></Button>
                                            </td>
                                          </tr>
                                        ))}

                                    {/* ============== SHOW ROW INPUT FIELD WHEN ROW HAS NO DATA ========== */}

                                    {inputFields[tbl.id]?.map(
                                      (field, fldIndex) => (
                                        <tr key={fldIndex}>
                                          <td>
                                            <input
                                              className="table-input"
                                              type="text"
                                              placeholder="Enter Location"
                                              onChange={(event) =>
                                                setLocation(event.target.value)
                                              }
                                            />
                                          </td>

                                          {tbl?.take_off_table_field?.map(
                                            (fld, fldIdx) => (
                                              <td key={fldIdx}>
                                                <input
                                                  className="table-input"
                                                  type="text"
                                                  placeholder="Enter a value"
                                                  onChange={(e) =>
                                                    handleInputChange(
                                                      tbl.id,
                                                      fldIndex,
                                                      e.target.value,
                                                      fld.id
                                                    )
                                                  }
                                                />
                                              </td>
                                            )
                                          )}

                                          <td>
                                            <input
                                              placeholder="Total value of row"
                                              className="table-input"
                                              type="text"
                                              disabled={true}
                                              style={{
                                                backgroundColor: "#f5f5f5",
                                              }}
                                            />
                                          </td>

                                          <td className="action-column">
                                            <Space>
                                              <Button
                                                className="success-button"
                                                type="link"
                                                icon={<SaveOutlined />}
                                                onClick={() =>
                                                  handleGetRowData(
                                                    fldIndex,
                                                    tbl.id
                                                  )
                                                }
                                              ></Button>
                                              <Button
                                                type="link"
                                                icon={<DeleteOutlined />}
                                                danger
                                                onClick={() =>
                                                  handleRemoveFields(
                                                    tbl.id,
                                                    index
                                                  )
                                                }
                                              ></Button>
                                            </Space>
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>

                                {/*====================== Table Footer ==================== */}

                                <div className="takeoff-table-footer">
                                  <Row className="dupa-total-direct-cost">
                                    <Col span={12}>
                                      <p>
                                        <strong>Total:</strong>
                                      </p>
                                    </Col>
                                    <Col
                                      span={12}
                                      style={{
                                        textAlign: "right",
                                      }}
                                    >
                                      <p>
                                        <strong>
                                          {tbl.Result?.table_total}
                                        </strong>
                                      </p>
                                    </Col>
                                  </Row>

                                  <Row className="dupa-total-direct-cost">
                                    <Col span={12}>
                                      <p>
                                        <strong>Contingency:</strong>
                                      </p>
                                    </Col>
                                    <Col
                                      span={12}
                                      style={{
                                        textAlign: "right",
                                      }}
                                    >
                                      {tbl.Result?.contingency === null ? (
                                        <Button
                                          className="btn-add-contingency"
                                          onClick={() =>
                                            createContingency(tbl.id)
                                          }
                                          type="default"
                                        >
                                          <PlusOutlined /> Add Contingency
                                        </Button>
                                      ) : (
                                        <p>
                                          <Space>
                                            <Button
                                              className="btn-add-contingency"
                                              onClick={() =>
                                                updateContingency(tbl)
                                              }
                                              type="default"
                                            >
                                              <EditOutlined />
                                            </Button>
                                            <strong>
                                              {tbl.Result?.contingency} %
                                            </strong>
                                          </Space>
                                        </p>
                                      )}
                                    </Col>
                                  </Row>

                                  <Row className="dupa-total-direct-cost">
                                    <Col span={12}>
                                      <p>
                                        <strong>Say:</strong>
                                      </p>
                                    </Col>
                                    <Col
                                      span={12}
                                      style={{
                                        textAlign: "right",
                                      }}
                                    >
                                      <p>
                                        <strong>{tbl.Result?.table_say}</strong>
                                      </p>
                                    </Col>
                                  </Row>
                                </div>
                              </Row>
                            </>
                          ))}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </Card>
            </div>
          )
        )}
      </div>

      <ModalComponents
        className="custom-modals"
        modalContent={setContentField()}
        isShownModal={isShowModal}
        handleOk={onSubmit}
        handleCancel={handleCancel}
        okText={"Submit"}
        destroyOnClose={true}
        modalWidth={modalWidth}
        footer={footer.current}
      />
    </div>
  );
};

export default TakeOff;
