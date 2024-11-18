import { Button, Card, Col, Row, Space, Spin, Tabs } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { axios } from "../../../axios-client";
import { useParams } from "react-router";
import {
  DeleteOutlined,
  FolderViewOutlined,
  PlusOutlined,
  EditOutlined,
} from "@ant-design/icons";
import TableComponents from "../../resources/TableComponents";
import ModalComponents from "../../resources/ModalComponents";
import AddDupaList from "../../resources/modal_fields/team_proj_dupa_list/AddDupaList";
import csrfCookie from "../../../utilities/csrf-cookie";
import createSwal from "../../resources/swal/CreateSwalAlert";
import Swal from "sweetalert2";
import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";
import ViewDupaList from "../../resources/modal_fields/team_proj_dupa_list/ViewDupaList";
import UpdateDupaGroupName from "../../resources/modal_fields/dupa_group_modal/UpdateDupaGroupName";
import { api } from "../../../utilities/axios-gateway";
import { SaveSwalAlert } from "../../resources/swal/SaveSwalAlert";
import { LoadingSwal } from "../../resources/swal/LoadingSwal";

const Toast = createSwal();

const ProjApi = "/project";
const DupaPerProjApi = "/dupa-per-project";
const DupaListPerProjApi = "/dupa-list-by-project";
const DupaPerProjectGroup = "dupa-per-project-group/";
const DupaApi = "/dupa";

const DupaPerProject = ({
  sowCatData,
  setShowTab,
  onInsertNewDUPA,
  onDeleteDupaGroup,
  setHasDupaData,
}) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [dupaPerProject, setDupaPerProject] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [isShowModal, isSetShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [dupa, setDupa] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [modalWidth, setModalWidth] = useState();
  const [perProjectId, setPerProjectId] = useState(null);
  const [perDupaId, setPerDupaId] = useState(null);
  const [editDupaGroup, setEditDupaGroup] = useState({
    name: "",
  });
  const [nameUpdateModal, setNameUpdateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({
    id: "",
    name: "",
  });

  const [activeKey, setActiveKey] = useState(null);
  const [dupaPerTable, setDupaPerTable] = useState(null);
  const [items, setItems] = useState(null);
  const newTabIndex = useRef(0);

  const [dupaFormData, setDupaFormData] = useState({
    b3_project_id: "",
    sow_category_id: "",
    dupas: [],
  });

  const footer = useRef(true);

  const [dataIsCreated, setIsDataCreated] = useState();

  if (!sowCatData) {
    footer.current = false;
  } else {
    footer.current = true;
  }

  const fetchTakeOffProject = async () => {
    try {
      const response = await api.get(ProjApi + "/" + id);
      setProject(response.data);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDupaPerProject = async () => {
    try {
      await api(DupaPerProjectGroup + id).then((response) => {
        if (response.data) {
          response.data[0].dupa_per_project_group[0].dupa_per_project.length >=
          1
            ? setShowTab(false)
            : setShowTab(true);
          setDupaPerProject(response.data[0]);

          setIsDataCreated(
            response.data[0].dupa_per_project_group[0].dupa_per_project
          );

          setItems(
            response.data[0].dupa_per_project_group.map((item, index) => {
              return {
                key: item.id,
                label: (
                  <>
                    {item.name
                      ? item.name
                      : response.data[0].project_nature.name === "Horizontal"
                      ? "Street " + item.group_no
                      : "Building " + item.group_no}
                    &nbsp;&nbsp;
                    <Button
                      on
                      style={{
                        margin: 0,
                        paddingLeft: 8,
                        paddingRight: 8,
                      }}
                      onClick={() => {
                        isSetShowModal(true);
                        setSelectedContent("Rename Group");
                        setModalWidth(300);
                        setNameUpdateModal(true);
                        setSelectedGroup({
                          id: item.id,
                          name: item.name ? item.name : item.group_no,
                        });
                      }}
                      icon={<EditOutlined style={{ fontSize: "12px" }} />}
                    />
                  </>
                ),
                children: "",
              };
            })
          );
          setActiveKey(
            response.data[0].dupa_per_project_group[
              response.data[0].dupa_per_project_group.length - 1
            ].id
          );
        }
        setDataLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDupa = async () => {
    try {
      const response = await api.get(DupaApi);
      setDupa(response.data.data);
      // console.log(response.data.data);
      setDataLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Item Code",
      width: "10%",
      dataIndex: "item_number",
      key: "item_number",
    },
    {
      title: () => <div style={{ textAlign: "center" }}>Description</div>,
      //   width: "30%",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "",
      width: "8%",
      key: "id",
      dataIndex: "id",
      render: (text, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<FolderViewOutlined />}
            onClick={() => viewDupaPerProject(text)}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteDupaPerProject(text)}
          ></Button>
        </Space>
      ),
    },
  ];

  const setContentField = () => {
    switch (selectedContent) {
      case "Select Sow Category and DUPA":
        return (
          <AddDupaList
            sowCatData={sowCatData}
            modalTitle={modalTitle}
            dupa={dupa}
            getSOWCat={getSOWCat}
            getDupas={getDupas}
            dupaFormData={dupaFormData}
            setDupaFormData={setDupaFormData}
          />
        );
      case "View Dupa Per Project":
        console.log("ppid", perProjectId);
        return (
          <ViewDupaList
            modalTitle={modalTitle}
            perProjectId={perProjectId}
            perDupaId={perDupaId}
          />
        );
      case "Rename Group":
        return (
          <UpdateDupaGroupName
            modalTitle={modalTitle}
            perProjectId={perProjectId}
            perDupaId={perDupaId}
            setEditDupaGroup={setEditDupaGroup}
            editDupaGroup={editDupaGroup}
            selectedGroup={selectedGroup}
          />
        );
    }
  };

  const viewDupaPerProject = async (_id) => {
    await api(DupaPerProjApi + "/" + _id)
      .then((response) => {
        if (response) {
          setPerProjectId(response.data.dupa_content_per_project_id);
          setPerDupaId(response.data.id);
        }
        console.log("this", response.data.dupa_content_per_project_id);
      })
      .catch((err) => console.log(err));

    setSelectedContent("View Dupa Per Project");
    setModalTitle("View Dupa Per Project");
    isSetShowModal(true);
    setModalWidth(1300);
    footer.current = false;
  };

  const addDupa = () => {
    setDupaFormData({
      ...dupaFormData,
      b3_project_id: id,
      sow_category_id: "",
      dupa_per_project_group_id: activeKey,
      dupas: [],
    });
    setSelectedContent("Select Sow Category and DUPA");
    setModalTitle("Select Sow Category and DUPA");
    isSetShowModal(true);
    setModalWidth(500);
    footer.current = true;
  };

  const getSOWCat = async (value) => {
    setDupaFormData({
      ...dupaFormData,
      sow_category_id: value,
    });
  };

  const getDupas = async (value) => {
    setDupaFormData({
      ...dupaFormData,
      dupas: [value],
    });
  };

  const onSubmit = async () => {
    var swal = Swal.fire(LoadingSwal);
    await csrfCookie();
    nameUpdateModal
      ? api
          .put(DupaPerProjectGroup + selectedGroup.id, editDupaGroup)
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchDupaPerProject();
            setEditDupaGroup({
              name: "",
            });
            setNameUpdateModal(false);
            setSelectedGroup({
              id: "",
              name: "",
            });
            setSelectedContent(null);
          })
          .catch(function (error) {
            swal.close();
            Toast.fire({
              icon: "error",
              title: "Error",
              html: error,
            });
          })
      : api
          .post(DupaPerProjApi, dupaFormData)
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchDupaPerProject();
            onInsertNewDUPA(dupaFormData);
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

  const deleteDupaPerProject = (id) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(DupaPerProjApi + "/" + id)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            }).then(() => {
              fetchDupaPerProject();
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

  const handleCancel = () => {
    isSetShowModal(false);
    setEditDupaGroup({
      name: "",
    });
    setNameUpdateModal(false);
    setSelectedGroup({
      id: "",
      name: "",
    });
    setSelectedContent(null);
  };

  const AddDupaGroup = async (value) => {
    Swal.fire(SaveSwalAlert).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        csrfCookie().catch((err) => {
          console.log("Something went wrong when posting the data", err);
        });

        api
          .post(DupaPerProjectGroup, value)
          .then(async (response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            fetchDupaPerProject();
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    });
  };

  const RemoveDupaGroup = (_id) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(DupaPerProjectGroup + _id)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            fetchDupaPerProject();
            onDeleteDupaGroup(_id);
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

  // TABS
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    AddDupaGroup({ b3_project_id: id });
  };
  const remove = (targetKey) => {
    const activeIndex = activeKey;
    RemoveDupaGroup(targetKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };
  // ENDTABS

  useEffect(() => {
    fetchTakeOffProject();
    fetchDupaPerProject();
    fetchDupa();
  }, []);

  useEffect(() => {
    const tableKey = dupaPerProject?.dupa_per_project_group?.find(
      (group_id) => group_id.id === activeKey
    );
    setDupaPerTable(tableKey?.dupa_per_project);
  }, [activeKey, fetchDupaPerProject]);

  // CHECKING DUPA PER PROJECT DATA FOR THE SUBMISSION FOR APPROVAL
  useEffect(() => {
    if (dataIsCreated?.length > 0) {
      setHasDupaData(true);
    } else {
      setHasDupaData(false);
    }
  }, [dupaPerProject]);

  return (
    <div>
      <Row>
        <Col span={14}>
          <p className="dupa-list-proj">
            <strong>B ID#: </strong> 202305
          </p>
          <p className="dupa-list-proj">
            <strong>Project Registry No.(DED): </strong>
            {project?.registry_no}
          </p>
          <p className="dupa-list-proj">
            <strong>Project Name: </strong> {project?.project_title}
          </p>
          <p className="dupa-list-proj">
            <strong>Location: </strong> {project?.location}
          </p>
        </Col>
        <Col span={10}>
          <p className="dupa-list-proj">
            <strong>Project Category: </strong>
            {project?.project_nature}
          </p>
          <p className="dupa-list-proj">
            <strong>Project Subject: </strong>
            {project?.project_nature_type}
          </p>
        </Col>

        <Col span={24} align="center">
          <p className="quantity-proj">DUPA LIST</p>
          <p className="dupa-list-proj">
            {project?.project_nature}/{project?.project_nature_type}
          </p>
        </Col>
      </Row>

      <Card>
        <div
          style={{
            marginBottom: 16,
          }}
        >
          {/* TABS */}

          <Tabs
            type="editable-card"
            onChange={onChange}
            activeKey={activeKey}
            onEdit={onEdit}
            items={items}
          />

          {/*  ENDTABS */}

          <Space>
            <Button
              onClick={addDupa}
              type="primary"
              icon={<PlusOutlined />}
              style={{ backgroundColor: "#539165", marginBottom: "10px" }}
            >
              Add DUPA
            </Button>
          </Space>
        </div>

        {dataLoading ? (
          <Space direction="vertical" style={{ width: "100%" }}>
            <Spin size="medium">
              <div className="content" />
            </Spin>
          </Space>
        ) : (
          <div className="responsive-table">
            <TableComponents
              loading={dataLoading}
              className="project-table"
              columns={columns}
              dataSource={dupaPerTable}
            />
          </div>
        )}
      </Card>

      <ModalComponents
        className="custom-modals"
        modalContent={setContentField()}
        isShownModal={isShowModal}
        handleOk={onSubmit}
        handleCancel={handleCancel}
        okText={"Submit"}
        modalWidth={modalWidth}
        footer={footer.current}
      />
    </div>
  );
};

export default DupaPerProject;
