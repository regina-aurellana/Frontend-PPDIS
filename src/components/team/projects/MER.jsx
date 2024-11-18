import React, { useState, useEffect, useRef } from "react";
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
import EditMer from "../../resources/modal_fields/mer_modal/EditMer";
import ViewMer from "../../resources/modal_fields/mer_modal/ViewMer";
const Toast = createSwal();

function MER({ projectData }) {
  const [equipmentData, setEquipmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMer, setEditMer] = useState({
    id: "",
    quantity: "",
  });
  const [modalContents, setModalContents] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalWidth, setModalWidth] = useState(500);
  const [equipmentRecord, setEquipmentRecord] = useState(null);
  const [footer, setFooter] = useState(true);
  const { id } = useParams();
  const componentRef = useRef();

  const merAPI = "mer/";

  // const fetchDupaEquipmentsPerProject = async () => {
  //   try {
  //     setLoading(true)
  //     const responses = await Promise.all(
  //       dupaPerProjectId.map(async (item) => {
  //         return await api(dupaContentsAPI + item.id)
  //       })
  //     )

  //     //FILTER ALL MATERIALS FROM DUPA CONTENTS AND ADD QUANTITIY OF SIMILAR MATERIALS
  //     const filtered_data = [];
  //     let total_quantity = 0;
  //     const newData = responses.map((response) => {
  //       const items = response.data.dupa_content.dupa_equipment_per_project.map((item) => {
  //         const newEquipment = { 'id': item.equipment.item_code, 'name': item.name, 'quantity': item.no_of_unit };
  //         const existingObject = filtered_data.find((f_item) => f_item.id === item.equipment.item_code);

  //         if (existingObject) {
  //           existingObject.quantity += newEquipment.quantity;
  //         } else {
  //           filtered_data.push(newEquipment)
  //         }
  //       })
  //     })

  //     for (const item of filtered_data) {
  //       if (item.hasOwnProperty('quantity')) {
  //         total_quantity += parseInt(item.quantity);
  //       }
  //     }
  //     filtered_data.push({ 'id': 'TOTAL', 'name': '', 'quantity': total_quantity })

  //     console.log('filtered', filtered_data)
  //     setEquipmentData(filtered_data)
  //     setEquipmentTotal(total_quantity)

  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const fetchMer = async () => {
    try {
      await api(merAPI + id).then((response) => {
        setEquipmentData(
          response.data.map((item, index) => {
            return {
              id: item.id,
              equipment_id: item.id,
              item_code: item.item_code,
              name: item.name,
              quantity: item.quantity,
              hourly_rate: item.hourly_rate,
            };
          })
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateMer = async () => {
    await csrfCookie().catch((err) => {
      Toast.fire({
        icon: "error",
        title: "Incorrect Data",
        text: "Something went wrong when posting the data.",
      });
    });
    await api
      .put(merAPI + editMer.id, editMer)
      .then(function (response) {
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
        fetchMer();
        handleCancel();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteMer = async (_id) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(merAPI + _id)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            fetchMer();
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

  const merModal = () => {
    switch (modalContents) {
      case "edit mer":
        return (
          <EditMer
            equipmentRecord={equipmentRecord}
            editMer={editMer}
            setEditMer={setEditMer}
          />
        );
      case "view mer":
        return (
          <ViewMer
            FileHeader={FileHeader}
            projectData={projectData}
            equipmentData={equipmentData}
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
    setEditMer({
      id: "",
      quantity: "",
    });
    setEquipmentRecord(null);
  };

  useEffect(() => {
    fetchMer();
  }, []);

  const table_columns = [
    {
      title: "ITEM CODE",
      dataIndex: "item_code",
      key: "item_code",
      align: "center",
    },

    {
      title: "EQUIPMENT DESCRIPTION",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "HOURLY RATE",
      dataIndex: "hourly_rate",
      key: "hourly_rate",
      align: "center",
    },
    {
      title: "No. of Equipments",
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
              setModalContents("edit mer");
              setModalTitle("Edit");
              setEquipmentRecord(record);
            }}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => deleteMer(text)}
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="responsive-table" ref={componentRef}>
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
            <b>MINIMUM EQUIPMENT REQUIREMENTS</b>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            onClick={fetchMer}
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
          dataSource={equipmentData}
          pagination={false}
        />
      </div>
      <Divider />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          onClick={() => {
            setShowModal(true);
            setModalContents("view mer");
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
        modalContent={merModal()}
        handleCancel={handleCancel}
        okText={"Submit"}
        handleOk={updateMer}
        footer={footer}
        title={modalTitle}
        modalWidth={modalWidth}
      />
    </div>
  );
}

export default MER;
