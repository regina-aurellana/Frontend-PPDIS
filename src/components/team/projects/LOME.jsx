import React, { useState, useEffect } from "react";
import FileHeader from "../../resources/FileHeader";
import { api } from "../../../utilities/axios-gateway";
import { Button, Space, Layout, Divider, Spin, Tabs } from "antd";
import {
  PrinterOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router";
import TableComponents from "../../resources/TableComponents";
import csrfCookie from "../../../utilities/csrf-cookie";
import Swal from "sweetalert2";
import createSwal from "../../resources/swal/CreateSwalAlert";
import { SaveSwalAlert } from "../../resources/swal/SaveSwalAlert";
import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";
import { LoadingSwal } from "../../resources/swal/LoadingSwal";
import ModalComponents from "../../resources/ModalComponents";
import EditLome from "../../resources/modal_fields/lome_modal/EditLome";
import ViewLome from "../../resources/modal_fields/lome_modal/ViewLome";
const Toast = createSwal();

function LOME({ sowCatData, projectData }) {
  const [materialsData, setMaterialsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editLome, setEditLome] = useState({
    id: "",
    quantity: "",
  });
  const [modalContents, setModalContents] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalWidth, setModalWidth] = useState(500);
  const [materialRecord, setMaterialRecord] = useState(null);
  const [footer, setFooter] = useState(true);
  const { id } = useParams();

  const dupaListAPI = "dupa-list-by-project/";
  const dupaContentsAPI = "dupa-content-per-project/";
  const lomeAPI = "lome/";

  const fetchLome = async () => {
    try {
      setLoading(true);
      await api(lomeAPI + id).then((response) => {
        if (response) {
          setMaterialsData(
            response.data.map((item, index) => {
              return {
                id: item.id,
                material_id: item.id,
                item_code: item.item_code,
                name: item.name,
                quantity: item.quantity,
              };
            })
          );
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateLome = async () => {
    await csrfCookie().catch((err) => {
      Toast.fire({
        icon: "error",
        title: "Incorrect Data",
        text: "Something went wrong when posting the data.",
      });
    });
    await api
      .put(lomeAPI + editLome.id, editLome)
      .then(function (response) {
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
        fetchLome();
        handleCancel();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteLome = async (_id) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(lomeAPI + _id)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            fetchLome();
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

  const lomeModal = () => {
    switch (modalContents) {
      case "edit lome":
        return (
          <EditLome
            materialRecord={materialRecord}
            editLome={editLome}
            setEditLome={setEditLome}
          />
        );
      case "view lome":
        return (
          <ViewLome
            FileHeader={FileHeader}
            projectData={projectData}
            materialsData={materialsData}
            TableComponents={TableComponents}
            loading={loading}
            PrinterOutlined={PrinterOutlined}
            Divider={Divider}
            Button={Button}
          />
        );
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setModalContents(null);
    setModalTitle(null);
    setModalWidth(500);
    setFooter(true);
    setEditLome({
      id: "",
      quantity: "",
    });
    setMaterialRecord(null);
  };

  useEffect(() => {
    fetchLome();
  }, []);

  const table_columns = [
    {
      title: "Material ID",
      dataIndex: "material_id",
      key: "material_id",
      align: "center",
    },
    {
      title: "Item Code",
      dataIndex: "item_code",
      key: "item_code",
      align: "center",
    },
    {
      title: "Material Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Material Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
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
            icon={<EditOutlined />}
            onClick={() => {
              setShowModal(true);
              setModalContents("edit lome");
              setModalTitle("Edit");
              setMaterialRecord(record);
            }}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteLome(text)}
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="responsive-table">
        <FileHeader />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textTransform: "uppercase",
          }}
        >
          {projectData != null ? (
            <p>{projectData.project_title},</p>
          ) : (
            <p>PROJECT TITLE</p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textTransform: "uppercase",
          }}
        >
          {projectData != null ? (
            <p>{projectData.location}</p>
          ) : (
            <p>PROJECT LOCATION</p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textTransform: "uppercase",
          }}
        >
          <p>
            <b>LIST OF MATERIALS</b>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            onClick={fetchLome}
            type="primary"
            className="btn-add-area"
            style={{
              marginBottom: 10,
              marginTop: 20,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: "#176B87",
            }}
          >
            <ReloadOutlined />
          </Button>
        </div>
        <br />
        <TableComponents
          loading={loading}
          className="project-table"
          columns={table_columns}
          dataSource={materialsData}
          pagination={false}
        />
      </div>
      <Divider />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          onClick={() => {
            setShowModal(true);
            setModalContents("view lome");
            setModalWidth(1100);
            setFooter(false);
          }}
          type="primary"
          className="btn-add-area"
          style={{
            marginBottom: 10,
            marginTop: 20,
            paddingLeft: 35,
            paddingRight: 35,
            backgroundColor: "#176B87",
          }}
        >
          <EyeOutlined /> Preview
        </Button>
      </div>
      <ModalComponents
        className="custom-modals"
        isShownModal={showModal}
        modalContent={lomeModal()}
        handleCancel={handleCancel}
        okText={"Submit"}
        handleOk={updateLome}
        footer={footer}
        title={modalTitle}
        modalWidth={modalWidth}
      />
    </div>
  );
}

export default LOME;
