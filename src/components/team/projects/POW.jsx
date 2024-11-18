import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Spin,
  Tabs,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import createSwal from "../../resources/swal/CreateSwalAlert";
import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";
import Swal from "sweetalert2";
import { SaveSwalAlert } from "../../resources/swal/SaveSwalAlert";
import { axios } from "../../../axios-client";
import { useParams } from "react-router";
import FileHeader from "../../resources/FileHeader";
import ModalComponents from "../../resources/ModalComponents";
import AddPOWTable from "../../resources/modal_fields/pow_modals/AddPOWTable";
import TableContentComponent from "../../resources/TableContentComponent";
import AddDupaItem from "../../resources/modal_fields/pow_modals/AddDupaItem";
import PreviewPOWModal from "../../resources/modal_fields/pow_modals/PreviewPOWModal";
import csrfCookie from "../../../utilities/csrf-cookie";
import TabPane from "antd/es/tabs/TabPane";
import EditQuantity from "../../resources/modal_fields/pow_modals/EditQuantity";
import { LoadingSwal } from "../../resources/swal/LoadingSwal";

import { api } from "../../../utilities/axios-gateway";

const Toast = createSwal();

const POWApi = "/pow";
const POWTblList = "/pow-table-list";
const POWTableContent = "/pow/calculation/content";
const CreatePOWContent = "/pow-table-content";
const POWTableApi = "/pow-table";
const PreviewPOWTableApi = "/pow/calculation/content";
const UpdateQuantityApi = "/pow-table-content-dupa-update";
const DeleteQuantityApi = "/pow-table-content-dupa-delete";

const POW = ({
  sowCatData,
  projectData,
  latestDUPA,
  dupaGroupId,
  onUpdateDupaQuantity,
  dupaQuantity,
  setHasPOWData,
}) => {
  const { id } = useParams();
  const footer = useRef(true);
  const [modalTitle, setModalTitle] = useState();
  const [modalWidth, setModalWidth] = useState();
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [fetchPOWData, setFetchPOWData] = useState(null);
  const [fetchPreviewPOWData, setFetchPreviewPOWData] = useState(null);
  const [isPOWCreated, setIsPOWCreated] = useState(false);
  const [isShowModal, isSetShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [dupaData, setDupaData] = useState(null);
  const [POWTbl, setPOWTbl] = useState(null);
  const [powTableContent, setPowTableContent] = useState([]);
  const [sowSubData, setSowSubData] = useState(null);
  const [powTable, setPowTable] = useState([]);
  const [currentPOW, setCurrentPOW] = useState(null);
  const [powFormData, setPOWFormData] = useState({
    b3_project_id: id,
  });
  const [powTableFormData, setPowTableFormData] = useState({
    program_of_work_id: "",
    sow_category_id: "",
    id: "",
  });
  const [tableFormData, setTableFormData] = useState({
    pow_table_id: "",
    sow_category_id: "",
    sow_subcategory_id: "",
    dupa_id: "",
    quantity: "",
    id: "",
  });
  const [quantityFormData, setQuantityFormData] = useState({
    quantity: "",
  });

  // FETCHING POW DATA
  const fetchPOW = async () => {
    api
      .get(POWApi + "/" + id)
      .then(function (response) {
        setFetchPOWData(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // FETCH POW TABLELIST USING API
  const fetchPOWTableList = async () => {
    await api
      .get(POWTblList + "/" + id)
      .then(function (response) {
        setPowTable(response.data);
        // setCurrentPOW(response.dataresponse.data[0])
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // FETCH POW TABLE USING API
  const fetchPOWtable = async () => {
    api
      .get(POWTableApi)
      .then(function (response) {
        setPOWTbl(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // FETCHING POW TABLE CONTENT USING API
  const fetchPOWTableContent = async () => {
    api
      .get(POWTableContent + "/" + id)
      .then(function (response) {
        setPowTableContent(response.data);
        setCurrentPOW(response.data.length > 0 ? [response.data[0]] : null);
        // console.log(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // CREATING POW
  const createPOW = async () => {
    await csrfCookie();
    Swal.fire(SaveSwalAlert).then((result) => {
      if (result.isConfirmed) {
        api
          .post(POWApi, powFormData)
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            setIsPOWCreated(true);
            fetchPOW();
            fetchPOWTableContent();
            setIsTableLoading(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  // FETCHING POW DATA
  const fetchPreviewPOWTable = async () => {
    api
      .get(PreviewPOWTableApi + "/" + id)
      .then(function (response) {
        setFetchPreviewPOWData(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const setContentField = () => {
    switch (selectedContent) {
      case "Add dupa item":
        return (
          <AddDupaItem
            modalTitle={modalTitle}
            sowSubData={sowSubData}
            dupaData={dupaData}
            setDupaData={setDupaData}
            tableFormData={tableFormData}
            setTableFormData={setTableFormData}
            setModalWidth={setTableFormData}
          />
        );
      case "Add POW table":
        return (
          <AddPOWTable
            modalTitle={modalTitle}
            sowCatData={sowCatData}
            powTableFormData={powTableFormData}
            setPowTableFormData={setPowTableFormData}
          />
        );
      case "Preview POW table":
        return (
          <PreviewPOWModal
            modalTitle={modalTitle}
            b3ProjectId={id}
            isTableLoading={isTableLoading}
            setIsTableLoading={setIsTableLoading}
            latestDUPA={latestDUPA}
            dupaGroupId={dupaGroupId}
          />
        );
      case "Edit Quantity":
        return (
          <EditQuantity
            modalTitle={modalTitle}
            // powTableContent={powTableContent}
            quantityFormData={quantityFormData}
            setQuantityFormData={setQuantityFormData}
          />
        );
    }
  };

  // MULTIPLE ON SUBMIT MODALS
  const onSubmit = async () => {
    var swal = Swal.fire(LoadingSwal);
    let POWContentLink, POWContentForm;
    await csrfCookie();

    if (selectedContent === "Add POW table") {
      POWContentLink = POWTableApi;
      POWContentForm = powTableFormData;
    } else if (selectedContent === "Add dupa item") {
      if (tableFormData.sow_subcategory_id === "") {
        message.warning("Cannot add without DUPA to show.");
        return;
      } else {
        POWContentLink = CreatePOWContent;
        POWContentForm = tableFormData;
      }
    } else if (selectedContent === "Edit Quantity") {
      POWContentLink = UpdateQuantityApi + "/" + quantityFormData.id;
      POWContentForm = quantityFormData;
    } else {
      return null;
    }

    //SUBMIT MODAL BUTTON WHICHEVER CONTENT IS SELECTED
    api
      .post(POWContentLink, POWContentForm)
      .then(function (response) {
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
        isSetShowModal(false);
        fetchPOWTableList();
        fetchPOWTableContent();

        if (selectedContent == "Edit Quantity") {
          onUpdateDupaQuantity(quantityFormData.quantity);
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

  // DATA TABLE
  const columns = [
    {
      title: "Item Code",
      dataIndex: "item_code",
      key: "item_code",
      width: "9%",
    },
    {
      title: "Description",
      dataIndex: "name",
      key: "name",
      width: "37%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Estimated Direct Cost",
      dataIndex: "estimated_direct_cost",
      key: "estimated_direct_cost",
    },
    {
      title: "Unit Cost",
      dataIndex: "unitcost",
      key: "unitcost",
    },
    {
      title: "Action",
      width: "8%",
      key: "action",
      dataIndex: "action",
      render: (text, record, index) => {
        if ("action" in record) {
          if (record.table_say === null) {
            return (
              <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => updateContentQuantity(record)}
              ></Button>
            );
          }
        }
        // const isFirstRow = index === 0;
        // const hasContentData = contentArray.length > 0;
        // const isTotalPerPart =
        //   record.id && record.id.toString().startsWith("total_per_part_");

        // const hasSpecificData = contentArray.some((content) => {
        //   return (
        //     content.content_dupa_id === record.id &&
        //     content.description === record.name &&
        //     content.item_number === record.item_code
        //   );
        // });

        // if (isFirstRow) {
        //   return (
        //     <Button
        //       key={index}
        //       type="link"
        //       icon={<EditOutlined />}
        //       onClick={() => updatePOWTable(record)}
        //     ></Button>
        //   );
        // }

        // if (isTotalPerPart) {
        //   return null;
        // }

        // if (hasSpecificData) {
        //   return (
        //     <Space size="small">
        //       <Button
        //         type="link"
        //         icon={<EditOutlined />}
        //         onClick={() => updateContentQuantity(record)}
        //       ></Button>
        //       <Button
        //         type="link"
        //         icon={<DeleteOutlined />}
        //         danger
        //         onClick={() => deletePOWDupa(record)}
        //       ></Button>
        //     </Space>
        //   );
        // }

        // return (
        //   <div style={{ display: "flex", justifyContent: "flex-end" }}>
        //     <Space size="small">
        //       <Button
        //         type="link"
        //         icon={<DeleteOutlined />}
        //         danger
        //         onClick={() => deleteContentWithDupa(record)}
        //       ></Button>
        //     </Space>
        //   </div>
        // );
      },
    },
  ];

  // HANDLE CANCEL FOR MODALS
  const handleCancel = () => {
    isSetShowModal(false);
  };

  // ADD POW TABLE BY PART
  // const AddPOWTablePart = () => {
  //   setPowTableFormData({
  //     ...powTableFormData,
  //     program_of_work_id: id,
  //     sow_category_id: "",
  //     id: "",
  //   });
  //   setSelectedContent("Add POW table");
  //   setModalTitle("Add Program of Work Table");
  //   isSetShowModal(true);
  //   setModalWidth(500);
  //   footer.current = true;
  // };

  // PREVIEW POW TABLES TO MODAL
  const PreviewPOWTable = () => {
    setSelectedContent("Preview POW table");
    setModalTitle("Preview POW Table");
    setIsTableLoading(false);
    isSetShowModal(true);
    setModalWidth(1500);
    footer.current = false;
  };

  // ADD DUPA ITEM TO MODAL (ADD POW TABLE CONTENT WITH DUPAS)
  // const AddDupaItemModal = (data) => {
  //   api
  //     .get(subCatApi + "/" + data.sow_category_id)
  //     .then(function (response) {
  //       setSowSubData(response.data);

  //       api
  //         .get(DUPAApi + "/" + data.sow_category_id)
  //         .then(function (response) {
  //           setDupaData(response.data);

  //           setIsTableLoading(false);

  //           setTableFormData({
  //             ...tableFormData,
  //             pow_table_id: data.id,
  //             sow_category_id: data.sow_category_id,
  //             sow_subcategory_id: "",
  //             dupa_id: "",
  //             quantity: "",
  //             id: "",
  //           });
  //           setSelectedContent("Add dupa item");
  //           setModalTitle("Add DUPA Item");
  //           isSetShowModal(true);
  //           setModalWidth(500);
  //           fetchPreviewPOWTable();
  //           setIsTableLoading(false);
  //           footer.current = true;
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //           setIsTableLoading(false);
  //         });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       setIsTableLoading(false);
  //     });
  // };

  // const testingData =
  //   powTableContent &&
  //   powTableContent.map((data) => console.log(data));

  // console.log(testingData);

  // console.log(powTableContent[0].pow_table);

  let contentArray = [];

  if (powTableContent && powTableContent[0] && powTableContent[0].pow_table) {
    powTableContent[0].pow_table.forEach((data) => {
      data.contents.forEach((content) => {
        if (content.dupa_items_per_project.length >= 0) {
          const dupaItem = content.dupa_items_per_project?.[0];
          contentArray.push({
            id: content.id,
            pow_table_id: content.pow_table_id,
            item_code: content.sow_sub_category_item_code,
            name: content.sow_sub_category_name,
            quantity: dupaItem?.quantity,
            unit: dupaItem?.unit_measure_abbreviation,
            estimated_direct_cost: dupaItem?.total_estimated_direct_cost,
            unitcost: dupaItem
              ? dupaItem.total_estimated_direct_cost / dupaItem.quantity
              : undefined,
            description: dupaItem?.description,
            item_number: dupaItem?.item_number,
            total_per_part: data.total_per_part,
            content_dupa_id: dupaItem?.id,
          });
        }
      });
    });
  } else {
    contentArray = [];
  }

  // UPDATE POW TABLE
  const updatePOWTable = async (record) => {
    const tblId = record.id;
    try {
      const response = await api.get(POWTableApi);
      const data = response.data.filter(
        (item) => item.sow_category_id === tblId
      );
      if (
        contentArray.length > 0 &&
        contentArray[0] &&
        contentArray[0].pow_table_id &&
        data[0].id === contentArray[0].pow_table_id
      ) {
        message.error("Unable to edit the table due to associated content.");
        isSetShowModal(false);
      } else {
        const updatedFormData = {
          program_of_work_id: data[0].program_of_work_id,
          sow_category_id: tblId,
          id: data[0].id,
        };
        setPowTableFormData(updatedFormData);
        setSelectedContent("Add POW table");
        setModalTitle("Edit Program of Work Table");
        isSetShowModal(true);
        setModalWidth(500);
      }
    } catch (error) {
      console.error(error);
      setIsTableLoading(false);
    }
  };

  // UPDATE CONTENT WITH DUPA
  // const updateContentDupa = async (record) => {
  //   const ContId = record.id;
  //   try {
  //     const responseContent = await api.get(
  //       "/pow-table-content"
  //     );
  //     const data = responseContent.data.filter((item) => item.id === ContId);

  //     const responseSubCat = await api.get(
  //       subCatApi + "/" + data[0].content.sow_category_id
  //     );
  //     setSowSubData(responseSubCat.data);

  //     const responseDupa = await api.get(
  //       DUPAApi + "/" + data[0].content.sow_category_id
  //     );
  //     setDupaData(responseDupa.data);

  //     setIsTableLoading(false);

  //     setTableFormData((prevFormData) => ({
  //       ...prevFormData,
  //       pow_table_id: data[0].content.pow_table_id,
  //       sow_category_id: data[0].content.sow_category_id,
  //       sow_subcategory_id: data[0].content.sow_subcategory_id,
  //       dupa_id: data[0].dupa.id,
  //       quantity: data[0].quantity,
  //       id: ContId,
  //     }));
  //     console.log(tableFormData);

  //     setSelectedContent("Add dupa item");
  //     setModalTitle("Edit DUPA Item");
  //     isSetShowModal(true);
  //     setModalWidth(500);
  //   } catch (error) {
  //     console.log(error);
  //     setIsTableLoading(false);
  //   }
  // };

  const updateContentQuantity = async (record) => {
    try {
      // const response = await api.get(UpdateQuantityApi + "/" + record.id);
      // console.log(response);
      // const data = response.data.filter((item) => item.id === record.id);
      // console.log(data);
      setQuantityFormData({
        ...quantityFormData,
        quantity: record.quantity,
        id: record.action,
      });
      setSelectedContent("Edit Quantity");
      setModalTitle("Edit Quantity");
      isSetShowModal(true);
      setModalWidth(500);
      footer.current = true;
    } catch (error) {
      console.error(error);
      setIsTableLoading(false);
    }
  };

  // DELETE POW TABLE
  const deletePOWTable = (id) => {
    const hasAssociatedContent = contentArray.some(
      (content) => content.pow_table_id === id
    );

    if (hasAssociatedContent) {
      message.error("Cannot delete table as it has associated content.");
    } else {
      Swal.fire(DeleteSwalConfig).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(POWTableApi + "/" + id)
            .then((response) => {
              Toast.fire({
                icon: "success",
                title: response.data.status,
                text: response.data.message,
              });
              isSetShowModal(false);
              fetchPOWTableList();
              fetchPOWtable();
              fetchPOWTableContent();
              fetchPreviewPOWTable();
            })
            .catch((error) => {
              console.error("Error deleting item", error);
            });
        }
      });
    }
  };

  // DELETE POW TABLE CONTENT WITH DUPA
  const deleteContentWithDupa = (record) => {
    const ContDupaId = record.id;

    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(CreatePOWContent + "/" + ContDupaId)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchPOWTableList();
            fetchPOWtable();
            fetchPOWTableContent();
            fetchPreviewPOWTable();
          })
          .catch((error) => {
            console.error("Error deleting item", error);
          });
      }
    });
  };

  const deletePOWDupa = (record) => {
    const dupaId = record.id;

    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(DeleteQuantityApi + "/" + dupaId)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchPOWTableList();
            fetchPOWtable();
            fetchPOWTableContent();
            fetchPreviewPOWTable();
          })
          .catch((error) => {
            console.error("Error deleting item", error);
          });
      }
    });
    setModalWidth(500);
    footer.current = true;
    // });
  };

  function handleTabClick(tabKey) {
    console.log(`Tab ${tabKey} clicked`);
  }

  function convertNumberToLetter(number) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number >= 1 && number <= 26) {
      return letters[number - 1];
    } else {
      return "Invalid Input";
    }
  }

  function romanize(num) {
    var lookup = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
      },
      roman = "",
      i;
    for (i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }

  // const fetchInitialPOW = () => {
  //   let initial = powTableContent.length > 0 ? powTableContent[0] : null;
  //   setCurrentPOW(initial)
  // }

  // useEffect(() => {
  //   fetchInitialPOW()
  // }, [currentPOW])

  const handleTabChange = (key) => {
    const filtered = powTableContent.filter(
      (table) => table.id === parseInt(key)
    );
    setCurrentPOW(filtered);
  };

  useEffect(() => {
    fetchPOW();
    fetchPOWTableList();
    fetchPOWtable();
    fetchPreviewPOWTable();
  }, []);

  useEffect(() => {
    fetchPOWTableContent();
  }, [latestDUPA, dupaGroupId, dupaQuantity]);

  // CHECKING THE POW DATA FOR THE SUBMISSION FOR APPROVAL
  useEffect(() => {
    if (fetchPOWData && Object.keys(fetchPOWData).length > 0) {
      setHasPOWData(true);
    } else {
      setHasPOWData(false);
    }
  }, [fetchPOWData]);

  let tableData = [];

  return (
    <div>
      {fetchPOWData === null ? (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Spin size="medium">
            <div className="content" />
          </Spin>
        </Space>
      ) : fetchPOWData &&
        fetchPOWData.b3_project_id === fetchPOWData.b3_project?.id ? (
        <div>
          {isTableLoading ? (
            <Space direction="vertical" style={{ width: "100%" }}>
              <Spin size="medium">
                <div className="content" />
              </Spin>
            </Space>
          ) : (
            <div>
              <FileHeader />
              <Divider />
              <Row>
                <Col span={14}>
                  <p className="takeoff-proj">
                    <strong>B ID#: </strong> 202305
                  </p>
                  <p className="takeoff-proj">
                    <strong>Project Registry No.(DED): </strong>
                    {projectData?.registry_no}
                  </p>
                  <p className="takeoff-proj">
                    <strong>Project Name: </strong>
                    {projectData?.project_title}
                  </p>
                  <p className="takeoff-proj">
                    <strong>Location: </strong>
                    {projectData?.location}
                  </p>
                </Col>
                <Col span={10}>
                  <p className="takeoff-proj">
                    <strong>Project Category: </strong>
                    {projectData?.project_nature}
                  </p>
                  <p className="takeoff-proj">
                    <strong>Project Subject: </strong>
                    {projectData?.project_nature_type}
                  </p>
                </Col>
                <Col span={24} align="center">
                  <p className="quantity-proj">Program of Works</p>
                  <p className="takeoff-proj">
                    {projectData?.project_nature}/
                    {projectData?.project_nature_type}
                  </p>
                </Col>
              </Row>
            </div>
          )}
          {powTableContent.length == 0 && (
            <div>
              <Space>
                <h1>Want to create Program of Work ?</h1>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={createPOW}
                  style={{
                    backgroundColor: "#539165",
                  }}
                >
                  Create
                </Button>
              </Space>
            </div>
          )}
          {powTableContent.length > 0 ? (
            <Card>
              <Space>
                <Button
                  onClick={PreviewPOWTable}
                  type="primary"
                  className="btn-add-area"
                  style={{
                    marginBottom: 10,
                    backgroundColor: "#176B87",
                  }}
                >
                  <EyeOutlined /> Preview
                </Button>
              </Space>
              <Tabs onChange={handleTabChange}>
                {powTableContent.map((value, index) => {
                  return (
                    <TabPane
                      tab={
                        value.b3_project.dupa_per_project_group[index].name
                          ? value.b3_project.dupa_per_project_group[index].name
                          : value.b3_project.project_nature_id === 1
                          ? "Street " + parseInt(index + 1)
                          : "Building " + parseInt(index + 1)
                      }
                      key={value.id}
                      onClick=""
                    >
                      {value.pow_table.map((table, tableIndex) => {
                        tableData = [];
                        let counter = 1;
                        tableData.push({
                          // 'item_code': table.part_number_sowcat_item_code,
                          item_code: `Part ${romanize(
                            parseInt(tableIndex + 1)
                          )}`,
                          name: table.part_number_sowcat_name_,
                        });
                        table.contents.map((content, contentIndex) => {
                          tableData.push({
                            item_code: `${convertNumberToLetter(
                              parseInt(counter++)
                            )}.`,
                          });
                          let total = 0;
                          content.dupa_items_per_project.map(
                            (dupaPerProject, perProjectIndex) => {
                              tableData.push({
                                item_code: dupaPerProject.item_number,
                                name: dupaPerProject.description,
                                quantity: dupaPerProject.quantity,
                                unit: dupaPerProject.unit_measure_abbreviation,
                                estimated_direct_cost:
                                  dupaPerProject.total_estimated_direct_cost,
                                unitcost: isNaN(
                                  dupaPerProject.total_estimated_direct_cost /
                                    dupaPerProject.quantity
                                )
                                  ? 0
                                  : dupaPerProject.total_estimated_direct_cost /
                                    dupaPerProject.quantity,
                                table_say: dupaPerProject.table_say,
                                action: dupaPerProject.id,
                              });
                              total += parseInt(
                                dupaPerProject.total_estimated_direct_cost
                              );
                            }
                          );
                          tableData.push({
                            name: "Total",
                            estimated_direct_cost: total,
                          });
                        });
                        return (
                          <TableContentComponent
                            key={index}
                            columns={columns}
                            dataSource={tableData}
                          />
                        );
                      })}
                    </TabPane>
                  );
                })}
              </Tabs>
            </Card>
          ) : (
            " "
          )}
        </div>
      ) : null}

      <ModalComponents
        className="custom-modals"
        isShownModal={isShowModal}
        modalContent={setContentField()}
        handleCancel={handleCancel}
        okText={"Submit"}
        handleOk={onSubmit}
        modalWidth={modalWidth}
        footer={footer.current}
        // handleOk={() => handleOk(selectedContent)}
      />
    </div>
  );
};

export default POW;
