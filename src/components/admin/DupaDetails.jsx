import React, { useEffect, useState } from "react";
import Sidenav from "../layout/Sidenav";
import {
  Button,
  Space,
  Breadcrumb,
  Row,
  Col,
  Layout,
  Card,
  Divider,
  Spin,
} from "antd";
import Navbar from "../layout/Navbar";
import Footernav from "../layout/Footernav";
import { BiHomeAlt2 } from "react-icons/bi";

import TableContentComponent from "../resources/TableContentComponent";
import ModalComponents from "../resources/ModalComponents";
import Swal from "sweetalert2";
import createSwal from "../resources/swal/CreateSwalAlert";
import { axios } from "../../axios-client";
import { useParams, Link } from "react-router-dom";
import { DeleteSwalConfig } from "../resources/swal/DeleteSwalConfig";
import FileHeader from "../resources/FileHeader";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";

//gateway
import csrfCookie from "../../utilities/csrf-cookie";
import { api } from "../../utilities/axios-gateway";

//Field Modals
import LaborFieldsModal from "../resources/modal_fields/dupa/LaborFieldsModal";
import EditLaborFieldsModal from "../resources/modal_fields/dupa/EditLaborFieldsModal";
import EquipmentFieldsModal from "../resources/modal_fields/dupa/EquipmentFieldsModal";
import EditEquipmentFieldsModal from "../resources/modal_fields/dupa/EditEquipmentFieldsModal";
import MaterialFieldsModal from "../resources/modal_fields/dupa/MaterialFieldsModal";
import EditMaterialFieldsModal from "../resources/modal_fields/dupa/EditMaterialFieldsModal";
import DupaFieldsModal from "../resources/modal_fields/dupa/DupaFieldsModal";
import GroupLaborModal from "../resources/modal_fields/GroupLaborModal";
import DupaAddAreaModal from "../resources/modal_fields/DupaAddAreaModal";
import DupaAddMinorToolModal from "../resources/modal_fields/DupaAddMinorToolModal";
import DupaAddMaterialArea from "../resources/modal_fields/DupaAddMaterialArea";
import DupaAddMatConsumable from "../resources/modal_fields/DupaAddMatConsumable";
import DupaPreview from "../admin/dupa/DupaPreview";
import { LoadingSwal } from "../resources/swal/LoadingSwal";

const { Content } = Layout;

const DupaDetails = () => {
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isDupaContentLoading, setIsDupaContentLoading] = useState(true);
  const [dupa, setDupa] = useState(null);
  const [dupaContent, setDupaContent] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isShowModal, isSetShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { id } = useParams();

  //Items for select boxes
  const [subCategory, setSubCategory] = useState(null);
  const [dupaCategory, setDupaCategory] = useState(null);
  const [measurement, setMeasurement] = useState(null);

  //Forms for adding dupa content
  const [laborFormData, setLaborFormData] = useState({
    id: id,
    dupa_content_id: id,
    labor_id: "",
    no_of_person: "",
    no_of_hour: "",
    group: "",
  });
  const [equipmentFormData, setEquipmentFormData] = useState({
    id: id,
    dupa_content_id: id,
    equipment_id: "",
    no_of_unit: "",
    no_of_hour: "",
  });
  const [materialFormData, setMaterialFormData] = useState({
    id: id,
    dupa_content_id: id,
    material_id: "",
    quantity: "",
  });

  //Forms for editing DUPA
  const [dupaFormData, setDupaFormData] = useState({
    item_number: "",
    description: "",
    output_per_hour: "",
    unit_id: "",
    direct_unit_cost: "",
    dupa_category: "",
  });

  const [areaFormData, setAreaFormData] = useState({
    area: "",
  });
  const [areaMaterialFormData, setAreaMaterialFormData] = useState({
    area: "",
  });
  const [minorToolFormData, setMinorToolFormData] = useState({
    minor: "",
  });
  const [consumablesFormData, setConsumablesFormData] = useState({
    consumable: "",
  });

  //For getting items inside select fields
  const [labor, setLabor] = useState(null);
  const [equipment, setEquipment] = useState(null);
  const [material, setMaterial] = useState(null);
  const [area, setArea] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [showSubTotal, setShowSubTotal] = useState(true);

  //Links for fetching in database
  const dupaLink = "/dupa";
  const dupaContentLink = "/content/" + id;
  const laborLink = "/labor";
  const equipmentLink = "/equipment";
  const materialLink = "/material";
  const subCatLink = "/subcat";
  const measurementLink = "/measurement";
  const dupaCategoryLink = "/category-dupa";

  //Links for axios adding dupa content
  const dupaLaborLink = "/dupalabor";
  const dupaEquipmentLink = "/dupaequipment";
  const dupaMaterialLink = "/dupamaterial";

  const dupaEquipmentAreaLink = "/dupa-area/" + id;
  const dupaEquipmentMinorToolLink = "/minor-tool/" + id;
  const dupaAreaMaterialLink = "/dupa-mat-area/" + id;
  const dupaConsumableMatLink = "/consumable/" + id;

  const Toast = createSwal();

  // FETCHING SUB CATEGORY DATA
  const fetchSubCategory = async () => {
    api
      .get(subCatLink)
      .then(function (response) {
        setSubCategory(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // FETCHING DUPA CATEGORY DATA
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

  // FETCHING MEASUREMENT DATA
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

  // UPDATE DUPA
  const updateDupa = async (id) => {
    api
      .get(dupaLink + "/" + id)
      .then(function (response) {
        setDupaFormData({
          ...dupaFormData,
          id: response.data.id,
          item_number: response.data.item_number,
          description: response.data.description,
          output_per_hour: response.data.output_per_hour,
          unit_id: response.data.unit_id,
          direct_unit_cost: response.data.direct_unit_cost,
          category_dupa_id: response.data.category_dupa_id,
          subcategory_id: response.data.subcategory_id,
        });
        setSelectedContent("DUPA");
        setModalTitle("Update DUPA");
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

  // UPDATE DUPA LABOR
  const updateDupaLabor = async (id) => {
    api
      .get(dupaLaborLink)
      .then(function (response) {
        const data = response.data.filter((item) => item.id === id);
        setLaborFormData({
          ...laborFormData,
          id: data[0].id,
          labor_id: data[0].labor_id,
          dupa_content_id: data[0].dupa_content_id,
          no_of_person: data[0].no_of_person,
          no_of_hour: data[0].no_of_hour,
          designation: data[0].labor.designation,
          group: data[0].group,
        });
        setSelectedContent("Edit Labor");
        setModalTitle("Edit Labor");
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

  // DELETE DUPA LABOR
  const deleteDupaLabor = (id) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(dupaLaborLink + "/" + id)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchDupaContent();
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

  // UPDATE DUPA EQUIPMENT
  const updateDupaEquipment = async (id) => {
    api
      .get(dupaEquipmentLink)
      .then(function (response) {
        const data = response.data.filter((item) => item.id === id);
        setEquipmentFormData({
          ...equipmentFormData,
          id: data[0].id,
          equipment_id: data[0].equipment_id,
          dupa_content_id: data[0].dupa_content_id,
          no_of_unit: data[0].no_of_unit,
          no_of_hour: data[0].no_of_hour,
          name: data[0].equipment.name,
        });
        setSelectedContent("Edit Equipment");
        setModalTitle("Edit Equipment");
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

  // DELETE DUPA EQUIPMENT
  const deleteDupaEquipment = (id) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(dupaEquipmentLink + "/" + id)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchDupaContent();
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

  // UPDATE DUPA MATERIAL
  const updateDupaMaterial = async (id) => {
    api
      .get(dupaMaterialLink)
      .then(function (response) {
        const data = response.data.filter((item) => item.id === id);
        setMaterialFormData({
          ...materialFormData,
          id: data[0].id,
          material_id: data[0].material_id,
          dupa_content_id: data[0].dupa_content_id,
          quantity: data[0].quantity,
          name: data[0].material.name,
        });
        setSelectedContent("Edit Material");
        setModalTitle("Edit Material");
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

  // DELETE DUPA MATERIAL
  const deleteDupaMaterial = (id) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(dupaMaterialLink + "/" + id)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchDupaContent();
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

  // DELETE DUPA EQUIPMENT AREA
  const deleteEquipmentArea = () => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(dupaEquipmentAreaLink)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });

            isSetShowModal(false);
            fetchDupaContent();
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

  // DELETE DUPA MATERIAL AREA
  const deleteMaterialArea = () => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(dupaAreaMaterialLink)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchDupaContent();
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

  // DELETE DUPA MATERIAL CONSUMABLE
  const deleteMatConsumable = () => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(dupaConsumableMatLink)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchDupaContent();
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

  // DELETE DUPA EQUIPMENT MINORTOOL
  const deleteEquipmentMinorTool = () => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(LoadingSwal);
        api
          .delete(dupaEquipmentMinorToolLink)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchDupaContent();
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

  // MODALS ON SUMBIT
  const onSubmit = async () => {
    // Perform actions based on selected field
    var swal = Swal.fire(LoadingSwal);
    let dupaContentLink, dupaContentForm;

    if (selectedContent === "Labor") {
      dupaContentLink = dupaLaborLink;
      dupaContentForm = laborFormData;
      setLaborFormData({
        dupa_content_id: id,
        labor_id: "",
        no_of_person: "",
        no_of_hour: "",
        group: "",
      });
    } else if (selectedContent === "Edit Labor") {
      dupaContentLink = dupaLaborLink;
      dupaContentForm = laborFormData;
    } else if (selectedContent === "Equipment") {
      dupaContentLink = dupaEquipmentLink;
      dupaContentForm = equipmentFormData;
      setEquipmentFormData({
        id: id,
        dupa_content_id: id,
        equipment_id: "",
        no_of_unit: "",
        no_of_hour: "",
      });
    } else if (selectedContent === "Edit Equipment") {
      dupaContentLink = dupaEquipmentLink;
      dupaContentForm = equipmentFormData;
    } else if (selectedContent === "Material") {
      dupaContentLink = dupaMaterialLink;
      dupaContentForm = materialFormData;
      setMaterialFormData({
        id: id,
        dupa_content_id: id,
        material_id: "",
        quantity: "",
      });
    } else if (selectedContent === "Edit Material") {
      dupaContentLink = dupaMaterialLink;
      dupaContentForm = materialFormData;
    } else if (selectedContent === "DUPA") {
      dupaContentLink = dupaLink;
      dupaContentForm = dupaFormData;
    } else if (selectedContent === "Add Area") {
      dupaContentLink = dupaEquipmentAreaLink;
      dupaContentForm = areaFormData;
    } else if (selectedContent === "Add Minor Tool") {
      dupaContentLink = dupaEquipmentMinorToolLink;
      dupaContentForm = minorToolFormData;
    } else if (selectedContent === "Add Area Mat") {
      dupaContentLink = dupaAreaMaterialLink;
      dupaContentForm = areaMaterialFormData;
    } else if (selectedContent === "Add Mat Consumables") {
      dupaContentLink = dupaConsumableMatLink;
      dupaContentForm = consumablesFormData;
    } else {
      return null;
    }
    //Adds dupa content whichever content is selected
    await csrfCookie();
    api
      .post(dupaContentLink, dupaContentForm)
      .then(function (response) {
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
        isSetShowModal(false);
        setIsTableLoading(true);
        fetchDupaContent();
        fetchDupa();
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

  const handleCancel = () => {
    isSetShowModal(false);
  };

  const fetchDupa = async () => {
    api
      .get(dupaLink + "/" + id)
      .then(function (response) {
        setDupa(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchLabor = async () => {
    api
      .get(laborLink)
      .then(function (response) {
        setLabor(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchEquipment = async () => {
    api
      .get(equipmentLink)
      .then(function (response) {
        setEquipment(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchMaterial = async () => {
    api
      .get(materialLink)
      .then(function (response) {
        setMaterial(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchDupaContent = async () => {
    api
      .get(dupaContentLink)
      .then(function (response) {
        setDupaContent(response.data);
        setIsDupaContentLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDupa();
    fetchDupaContent();
    fetchLabor();
    fetchEquipment();
    fetchMaterial();
    fetchMeasurement();
    fetchSubCategory();
    fetchDupaCategory();
  }, []);

  useEffect(() => {
    const storedItemsList = localStorage.getItem("itemsList");
    if (storedItemsList) {
      setItemsList(JSON.parse(storedItemsList));
    }
  }, []);

  const addLaborFields = () => {
    setLaborFormData({
      dupa_content_id: id,
      labor_id: "",
      no_of_person: "",
      no_of_hour: "",
      group: "",
    });
    setSelectedContent("Labor");
    setModalTitle("Add Labor Field");
    isSetShowModal(true);
  };

  const addEquipmentFields = () => {
    setEquipmentFormData({
      dupa_content_id: id,
      equipment_id: "",
      no_of_unit: "",
      no_of_hour: "",
    });
    setSelectedContent("Equipment");
    setModalTitle("Add Equipment Field");
    isSetShowModal(true);
  };

  const addMaterialFields = () => {
    setMaterialFormData({
      dupa_content_id: id,
      material_id: "",
      quantity: "",
    });
    setSelectedContent("Material");
    setModalTitle("Add Material Field");
    isSetShowModal(true);
  };

  const AddLaborGroups = () => {
    setSelectedContent("Labor Groups");
    setModalTitle("Add Labor Groups");
    isSetShowModal(true);
  };

  const AddAreaToEquipment = () => {
    setAreaFormData({
      area: "",
    });
    setSelectedContent("Add Area");
    setModalTitle("Add Area");
    isSetShowModal(true);
  };

  const AddAreaToMaterial = () => {
    setAreaMaterialFormData({
      area: "",
    });
    setSelectedContent("Add Area Mat");
    setModalTitle("Add Area");
    isSetShowModal(true);
  };

  const AddMinorToolToEquipment = () => {
    setMinorToolFormData({
      minor: "",
    });
    setSelectedContent("Add Minor Tool");
    setModalTitle("Add Minor Tool");
    isSetShowModal(true);
  };

  const AddMaterialConsumables = () => {
    setConsumablesFormData({
      consumable: "",
    });
    setSelectedContent("Add Mat Consumables");
    setModalTitle("Add Consumable");
    isSetShowModal(true);
  };

  //Sets the content for modal
  const setContentField = () => {
    switch (selectedContent) {
      case "Add Mat Consumables":
        return (
          <DupaAddMatConsumable
            consumablesFormData={consumablesFormData}
            setConsumablesFormData={setConsumablesFormData}
          />
        );
      case "Add Area Mat":
        return (
          <DupaAddMaterialArea
            areaMaterialFormData={areaMaterialFormData}
            setAreaMaterialFormData={setAreaMaterialFormData}
          />
        );
      case "Add Minor Tool":
        return (
          <DupaAddMinorToolModal
            minorToolFormData={minorToolFormData}
            setMinorToolFormData={setMinorToolFormData}
          />
        );
      case "Add Area":
        return (
          <DupaAddAreaModal
            areaFormData={areaFormData}
            setAreaFormData={setAreaFormData}
          />
        );
      case "Labor Groups":
        return (
          <GroupLaborModal
            groupList={groupList}
            setGroupList={setGroupList}
            dupaContent={dupaContent}
          />
        );
      case "Labor":
        return (
          <LaborFieldsModal
            laborFormData={laborFormData}
            setLaborFormData={setLaborFormData}
            labor={labor}
            groupList={groupList}
            storedItemsList={itemsList}
          />
        );
      case "Edit Labor":
        return (
          <EditLaborFieldsModal
            laborFormData={laborFormData}
            setLaborFormData={setLaborFormData}
            groupList={groupList}
            storedItemsList={itemsList}
          />
        );
      case "Equipment":
        return (
          <EquipmentFieldsModal
            equipmentFormData={equipmentFormData}
            setEquipmentFormData={setEquipmentFormData}
            equipment={equipment}
          />
        );
      case "Edit Equipment":
        return (
          <EditEquipmentFieldsModal
            equipmentFormData={equipmentFormData}
            setEquipmentFormData={setEquipmentFormData}
          />
        );
      case "Material":
        return (
          <MaterialFieldsModal
            materialFormData={materialFormData}
            setMaterialFormData={setMaterialFormData}
            material={material}
          />
        );
      case "Edit Material":
        return (
          <EditMaterialFieldsModal
            materialFormData={materialFormData}
            setMaterialFormData={setMaterialFormData}
          />
        );
      case "DUPA":
        return (
          <DupaFieldsModal
            dupaFormData={dupaFormData}
            setDupaFormData={setDupaFormData}
            subCategory={subCategory}
            measurement={measurement}
            dupaCategory={dupaCategory}
          />
        );
      default:
        return null;
    }
  };

  //EQUIPMENT DATA TABLE
  const equipmentColumns = [
    {
      title: "",
      key: "action",
      width: "8%",
      dataIndex: "id",
      render: (text, record) => (
        <Space size="small">
          {record.equipment_area ? (
            <Button
              danger
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => deleteEquipmentArea(text)}
            ></Button>
          ) : record.minor_tool_percentage ? (
            <Button
              danger
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => deleteEquipmentMinorTool(text)}
            ></Button>
          ) : (
            <Space>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => updateDupaEquipment(text)}
              ></Button>
              <Button
                danger
                type="link"
                icon={<DeleteOutlined />}
                onClick={() => deleteDupaEquipment(text)}
              ></Button>
            </Space>
          )}
        </Space>
      ),
    },
    {
      title: "Equipment ID",
      dataIndex: "equipment_id",
      key: "equipment_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          {text}
          {record.equipment_area ? (
            <p>Area = {record.equipment_area} sq.m</p>
          ) : null}
          {record.minor_tool_percentage ? (
            <p>
              <span>
                Minor Tools ({record.minor_tool_percentage}% of Labor Cost)
              </span>
            </p>
          ) : null}
        </div>
      ),
    },
    {
      title: "No. of Unit",
      dataIndex: "no_of_unit",
      key: "no_of_unit",
    },
    {
      title: "No. of Hour",
      dataIndex: "no_of_hour",
      key: "no_of_hour",
    },
    {
      title: "Hourly Rate",
      dataIndex: "hourly_rate",
      key: "hourly_rate",
    },
    {
      title: "Amount",
      dataIndex: "equipment_amount",
      key: "equipment_amount",
      render: (text, record) => (
        <div>
          {text}
          {record.minor_tool_percentage ? (
            <p>{dupaContent.minor_tool_percentage_labor_cost}</p>
          ) : null}
        </div>
      ),
    },
  ];

  //LABOR DATA TABLE
  const laborColumns = [
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
            onClick={() => updateDupaLabor(text)}
          ></Button>
          <Button
            danger
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => deleteDupaLabor(text)}
          ></Button>
        </Space>
      ),
    },
    {
      title: "Labor ID",
      dataIndex: "labor_id",
      key: "labor_id",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "No. of Person",
      dataIndex: "no_of_person",
      key: "no_of_person",
    },
    {
      title: "No. of Hour",
      dataIndex: "no_of_hour",
      key: "no_of_hour",
    },
    {
      title: "Hourly Rate",
      dataIndex: "hourly_rate",
      key: "hourly_rate",
    },
    {
      title: "Amount",
      dataIndex: "labor_amount",
      key: "labor_amount",
    },
  ];

  //MATERIAL DATA TABLE
  const materialColumns = [
    {
      title: "",
      key: "action",
      width: "8%",
      dataIndex: "id",
      render: (text, record) => (
        <Space size="small">
          {record.material_area ? (
            <Button
              danger
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => deleteMaterialArea(text)}
            ></Button>
          ) : record.consumable_percentage ? (
            <Button
              danger
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => deleteMatConsumable(text)}
            ></Button>
          ) : (
            <Space>
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => updateDupaMaterial(text)}
              ></Button>
              <Button
                danger
                type="link"
                icon={<DeleteOutlined />}
                onClick={() => deleteDupaMaterial(text)}
              ></Button>
            </Space>
          )}
        </Space>
      ),
    },
    {
      title: "Material ID",
      dataIndex: "material_id",
      key: "material_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          {text}
          {record.material_area ? (
            <p>Area = {record.material_area} sq.m</p>
          ) : null}
          {record.consumable_percentage ? (
            <p>
              <span>
                Consumables ({record.consumable_percentage}% of Material Cost)
              </span>
            </p>
          ) : null}
        </div>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit Cost",
      dataIndex: "unit_cost",
      key: "unit_cost",
    },
    {
      title: "Amount",
      dataIndex: "material_amount",
      key: "material_amount",
      render: (text, record) => (
        <div>
          {text}
          {record.consumable_percentage ? (
            <p>{dupaContent?.mat_consumable_total}</p>
          ) : null}
        </div>
      ),
    },
  ];

  // Create a new row with the area value
  const areaRow = {
    equipment_area: dupaContent?.dupa_content?.equipment_area, // Access area value from dupaContent
    // Add other properties as needed
  };

  const areaMatRow = {
    material_area: dupaContent?.dupa_content?.material_area,
  };

  const minorToolRow = {
    minor_tool_percentage: dupaContent?.dupa_content?.minor_tool_percentage,
  };

  const matConsumable = {
    consumable_percentage: dupaContent?.dupa_content?.consumable_percentage,
  };

  // UPDATED DATA SOURCE TO DUPA EQUIPMENT
  const updatedDataSource = [
    ...(areaRow.equipment_area ? [areaRow] : []),
    ...(dupaContent?.dupa_content?.dupa_equipment || []),
    ...(minorToolRow.minor_tool_percentage ? [minorToolRow] : []),
  ];

  // UPDATED DATA SOURCE TO DUPA MATERIAL
  const updatedDataSourceMaterial = [
    ...(areaMatRow.material_area ? [areaMatRow] : []),
    ...(dupaContent?.dupa_content.dupa_material || []),
    ...(matConsumable.consumable_percentage ? [matConsumable] : []),
  ];

  return (
    <Layout className="layout-container">
      <Sidenav />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: 20 }}>
          <Breadcrumb
            className="bread-crumb"
            items={[
              {
                title: (
                  <Link to="/dupa">
                    <BiHomeAlt2 /> Home
                  </Link>
                ),
              },
              { title: <a href="">Dupa Details</a> },
            ]}
          />

          <Card style={{ marginTop: 10 }}>
            <FileHeader />
            <Divider />
            {isDupaContentLoading ? (
              <Spin size="medium">
                <div className="content" />
              </Spin>
            ) : (
              <div>
                <Row>
                  <Col span={24}>
                    <p className="dupa-details">
                      <strong>Item Code : </strong> {dupa?.item_number}
                    </p>
                    <p className="dupa-details">
                      <strong>Description : </strong> {dupa?.description}
                    </p>
                    <p className="dupa-details">
                      <strong>Unit : </strong> {dupa?.abbreviation}
                    </p>
                    <p className="dupa-details">
                      <strong>Output per Hour: </strong> {dupa?.output_per_hour}
                    </p>
                  </Col>
                  <Col span={24} align="center">
                    <p className="quantity-proj">
                      DETAILED UNIT PRICE ANALYSIS(DUPA)
                    </p>
                  </Col>
                </Row>

                <div className="responsive-table dupa-table-container">
                  <TableContentComponent
                    showSubTotal={true}
                    loading={isTableLoading}
                    className="project-table"
                    columns={laborColumns}
                    dataSource={dupaContent?.dupa_content.dupa_labor}
                    subTotal={dupaContent?.a_dupaLaborTotal}
                    header={() => (
                      <div>
                        <span className="dupa-work-items-name">A. Labor</span>
                        <span style={{ float: "right" }}>
                          <Space>
                            <Button
                              onClick={AddLaborGroups}
                              type="primary"
                              className="btn-add-area"
                              style={{
                                marginBottom: 10,
                                backgroundColor: "#176B87",
                              }}
                            >
                              <PlusOutlined /> Add Groups
                            </Button>
                            <Button
                              onClick={addLaborFields}
                              type="primary"
                              className="btn-create-b3"
                              style={{
                                marginBottom: 10,
                                backgroundColor: "#539165",
                              }}
                            >
                              <PlusOutlined /> Add Fields
                            </Button>
                          </Space>
                        </span>
                      </div>
                    )}
                  />
                </div>
                <div className="responsive-table dupa-table-container">
                  <TableContentComponent
                    showSubTotal={true}
                    loading={isTableLoading}
                    className="project-table"
                    columns={equipmentColumns}
                    dataSource={updatedDataSource}
                    subTotal={dupaContent?.b_dupaEquipmentTotal}
                    header={() => (
                      <div>
                        <span className="dupa-work-items-name">
                          B. Equipment
                        </span>
                        <span style={{ float: "right" }}>
                          <Space>
                            <Button
                              onClick={AddMinorToolToEquipment}
                              type="primary"
                              className="btn-add-minor"
                              style={{
                                marginBottom: 10,
                                backgroundColor: "#232D3F",
                              }}
                            >
                              <PlusOutlined /> Add Minor Tool
                            </Button>
                            <Button
                              onClick={AddAreaToEquipment}
                              type="primary"
                              className="btn-add-area"
                              style={{
                                marginBottom: 10,
                                backgroundColor: "#176B87",
                              }}
                            >
                              <PlusOutlined /> Add Area
                            </Button>
                            <Button
                              onClick={addEquipmentFields}
                              type="primary"
                              className="btn-add-fields"
                              style={{
                                marginBottom: 10,
                                backgroundColor: "#539165",
                              }}
                            >
                              <PlusOutlined /> Add Fields
                            </Button>
                          </Space>
                        </span>
                      </div>
                    )}
                  />
                </div>
                <Row className="dupa-total-direct-cost">
                  <Col span={12}>
                    <p>
                      <strong>C.</strong> Total (A + B)
                    </p>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <p>{dupaContent?.c_total_ab}</p>
                  </Col>
                </Row>

                <Row className="dupa-total-direct-cost">
                  <Col span={12}>
                    <p>
                      <strong>D.</strong> Output per Hour
                    </p>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <p>{dupa?.output_per_hour}</p>
                  </Col>
                </Row>

                <Row className="dupa-total-direct-cost">
                  <Col span={12}>
                    <p>
                      <strong>E.</strong> Direct Unit Cost (C + D)
                    </p>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <p>{dupaContent?.d_direct_unit_cost_c_d}</p>
                  </Col>
                </Row>

                <div className="responsive-table dupa-table-container">
                  <TableContentComponent
                    showSubTotal={true}
                    loading={isTableLoading}
                    className="project-table"
                    columns={materialColumns}
                    dataSource={updatedDataSourceMaterial}
                    subTotal={dupaContent?.f_dupaMaterialTotal}
                    header={() => (
                      <div>
                        <span className="dupa-work-items-name">
                          F. Materials
                        </span>
                        <span style={{ float: "right" }}>
                          <Space>
                            <Button
                              onClick={AddMaterialConsumables}
                              type="primary"
                              className="btn-add-consumable"
                              style={{
                                marginBottom: 10,
                                backgroundColor: "#232D3F",
                              }}
                            >
                              <PlusOutlined /> Add Consumables
                            </Button>
                            <Button
                              onClick={AddAreaToMaterial}
                              type="primary"
                              className="btn-add-minor"
                              style={{
                                marginBottom: 10,
                                backgroundColor: "#176B87",
                              }}
                            >
                              <PlusOutlined /> Add Area
                            </Button>
                            <Button
                              onClick={addMaterialFields}
                              type="primary"
                              className="btn-create-b3"
                              style={{
                                marginBottom: 10,
                                backgroundColor: "#539165",
                              }}
                            >
                              <PlusOutlined /> Add Fields
                            </Button>
                          </Space>
                        </span>
                      </div>
                    )}
                  />
                </div>

                <Row className="dupa-total-direct-cost">
                  <Col span={12}>
                    <p>
                      <strong>G.</strong> Direct Unit Cost (E + F)
                    </p>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <p>{dupaContent?.g_direct_unit_cost_e_f}</p>
                  </Col>
                </Row>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                onClick={() => setIsPreviewOpen(true)}
                type="primary"
                className="btn-add-area"
                style={{
                  marginBottom: 10,
                  backgroundColor: "#176B87",
                  marginTop: 30,
                }}
              >
                <EyeOutlined /> Preview Table
              </Button>
              <DupaPreview
                open={isPreviewOpen}
                cancel={setIsPreviewOpen}
                content={dupaContent}
                dupa={dupa}
                equipmentSource={updatedDataSource}
              />
            </div>
          </Card>
        </Content>
        <Footernav />
      </Layout>

      <ModalComponents
        className="custom-modals"
        title={modalTitle}
        isShownModal={isShowModal}
        modalContent={setContentField()}
        handleOk={() => {
          if (selectedContent === "Labor Groups") {
            window.location.reload();
          } else {
            onSubmit();
          }
        }}
        handleCancel={handleCancel}
        okText={"Submit"}
      />
    </Layout>
  );
};

export default DupaDetails;
