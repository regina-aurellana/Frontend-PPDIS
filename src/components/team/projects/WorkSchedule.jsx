import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Divider, Row, Space, Spin, Tabs, Card } from "antd";
import FileHeader from "../../resources/FileHeader";
import {
  PlusOutlined,
  EditOutlined,
  PrinterOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import createSwal from "../../resources/swal/CreateSwalAlert";
import { SaveSwalAlert } from "../../resources/swal/SaveSwalAlert";

import ModalComponents from "../../resources/ModalComponents";
import AddProjectDuration from "../../resources/modal_fields/work_schedule/AddProjectDuration";
import EditProjectDuration from "../../resources/modal_fields/work_schedule/EditProjectDuration";
import { axios } from "../../../axios-client";
import { useParams } from "react-router";
import TableComponents from "../../resources/TableComponents";
import ViewWorkSchedule from "../../resources/modal_fields/work_schedule/ViewWorkSchedule";
import AddWorkSched_v2 from "../../resources/modal_fields/work_schedule/AddWorkSched_v2";
import EditWorkSched from "../../resources/modal_fields/work_schedule/EditWorkSched";
import { api } from "../../../utilities/axios-gateway";
import csrfCookie from "../../../utilities/csrf-cookie";
import PreviewWorkSchedule from "../../resources/modal_fields/work_schedule/PreviewWorkSchedule";
import UpdateWorkScheduleItemDuration from "../../resources/modal_fields/work_schedule/UpdateWorkScheduleItemDuration";
import TimelineChart from "../../resources/modal_fields/work_schedule/TimelineChart";
import TestChart from "../../resources/modal_fields/work_schedule/TestChart";
import { useReactToPrint } from "react-to-print";

const { TabPane } = Tabs;
const Toast = createSwal();

const WorkSchedule = ({
  setHasWorkScheduleData,
  projectData,
  latestDUPA,
  dupaGroupId,
}) => {
  const { id } = useParams();
  const B3WorkScheduleAPI = "/project/work-schedule";
  const storeProjectDurationAPI = "/project-duration";
  const workScheduleAPI = "/work-schedule";
  const AddDurationAPI = "/work-schedule-item/add-duration";
  const UpdateWorkScheduleItemDurationAPI = "/work-schedule-item";
  const workSchedItemAPI = "/work-schedule-item";
  const StartScheduleAPI = "/schedule/start-schedule";
  const [workScheduleFormData, setWorkScheduleFormData] = useState({
    id: null,
    b3_project_id: id,
  });
  const [dates, setDates] = useState({
    date: "weekly",
  });
  const maxYlabel = useRef(0);

  const [isTableLoading, setIsTableLoading] = useState(true);
  const [modalTitle, setModalTitle] = useState();
  const [modalWidth, setModalWidth] = useState();
  const [isShowModal, isSetShowModal] = useState(false);
  const [isViewWorkSchedule, isSetViewWorkSchedule] = useState(false);
  const [isPreviewWorkSchedule, isSetPreviewWorkSchedule] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [duration, setDuration] = useState(null);
  const [dupaItem, setDupaItem] = useState();
  const [dupaItemSchedule, setDupaItemSchedule] = useState(null);
  const [dupaItemDuration, setDupaItemDuration] = useState(null);
  const [dupaItemData, setDupaItemData] = useState(null);
  const [workSchedItem, setWorkSchedItem] = useState(null);
  const [closable, setClosable] = useState(true);
  const [modified, setModified] = useState(false);
  const [projectDuration, setProjectDuration] = useState(0);
  const footer = useRef(true);

  const [estimatedDuration, setEstimatedDuration] = useState(0);

  const [fetchWorkScheduleData, setFetchWorkScheduleData] = useState([]);
  const [workScheduleWithDupa, setWorkScheduleWithDupa] = useState([]);
  const [projectDurationFormData, setProjectDurationFormData] = useState({
    work_sched_id: "",
    no_of_days: "",
  });

  const [
    workScheduleItemDurationFormData,
    setWorkScheduleItemDurationFormData,
  ] = useState({
    work_schedule_item_id: "",
    duration: "",
  });

  const [workScheduleDupaFormData, setWorkScheduleDupaFormData] = useState([]);
  const componentRef = useRef();
  const printRef = useRef();
  const buttonRef = useRef();
  const promiseResolveRef = useRef(null);
  const [printing, setPrinting] = useState(false);
  const [printingData, setPrintingData] = useState(null);

  //PRINTING
  const handlePrint = useReactToPrint({
    onBeforeGetContent: () => {
      printRef.current.style.visibility = "hidden";
      buttonRef.current.style.visibility = "hidden";
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setPrinting(true);
        const inputData = [];
        const workSchedData = [];
        workScheduleWithDupa.map((value, i) => {
          value.b3_project.program_of_work.pow_table.map(
            (part_numbers, index) => {
              let counter = 1;
              workSchedData.push({
                key: i + "-" + index,
                item_code: (
                  <strong>
                    {part_numbers.sow_category.item_code.toUpperCase()}
                  </strong>
                ),
                description: (
                  <strong>
                    {part_numbers.sow_category.name.toUpperCase()}
                  </strong>
                ),
              });
              part_numbers.contents.map((part_letters, index2) => {
                workSchedData.push({
                  key: i + "-" + index + "-" + index2,
                  item_code: (
                    <strong>{`PART ${convertNumberToLetter(
                      parseInt(counter++)
                    )}`}</strong>
                  ),
                  description: (
                    <strong>{part_letters.sow_subcategory.name}</strong>
                  ),
                });
                part_letters.dupa_items_per_project.map((dupas, index3) => {
                  workSchedData.push({
                    key: i + "-" + index + "-" + index2 + "-" + index3,
                    work_sched_item_id: dupas.id,
                    item_code: dupas.dupa_per_project.item_number,
                    description: dupas.dupa_per_project.description,
                    quantity: dupas.quantity,
                    unit: dupas.dupa_per_project.measures.abbreviation,
                    duration:
                      dupas.dupa_per_project.work_schedule_item.duration,
                    cost: dupas.total_estimated_direct_cost,
                    unit_cost: dupas.dupa_per_project.direct_unit_cost,
                    work_schedule: [
                      dupas.id,
                      dupas.dupa_per_project.work_schedule_item.schedule,
                    ],
                  });

                  dupas.dupa_per_project.work_schedule_item.schedule.map(
                    (sched, index4) => {
                      inputData.push({
                        key: i + "-" + index + "-" + index2 + "-" + index3,
                        week_no: sched.week_no,
                        day_no: sched.day_no,
                        duration_no: sched.duration_no,
                        quantity: dupas.quantity,
                        duration:
                          dupas.dupa_per_project.work_schedule_item.duration,
                        cost: dupas.total_estimated_direct_cost,
                        unit_cost: dupas.dupa_per_project.direct_unit_cost,
                      });
                    }
                  );
                });
              });
            }
          );
        });
        console.log("pd", workSchedData);
        setPrintingData(workSchedData);
      });
    },
    content: () => componentRef.current,
    onAfterPrint: () => {
      printRef.current.style.visibility = "visible";
      buttonRef.current.style.visibility = "visible";
      promiseResolveRef.current = null;
      setPrinting(false);
    },
  });

  useEffect(() => {
    if (printing && promiseResolveRef.current) {
      promiseResolveRef.current();
    }
  }, [printing]);

  // FETCHING WORK SCHEDULE DATA
  const fetchWorkSchedule = async () => {
    api
      .get(B3WorkScheduleAPI + "/" + id)
      .then(function (response) {
        setFetchWorkScheduleData(response.data.work_schedule);
        setProjectDurationFormData({
          ...projectDurationFormData,
          work_sched_id: response.data.work_schedule.id,
        });
        setDuration({
          days: response.data.work_schedule.project_duration?.no_of_days,
          id: response.data.work_schedule.project_duration?.id,
        });
        setIsTableLoading(false);
        fetchWorkScheduleWithDupas(id);
      })
      .catch(function (error) {
        console.log(error);
        setIsTableLoading(false);
      });
  };

  // FETCHING WORK SCHEDULE WITH DUPA DATA
  const fetchWorkScheduleWithDupas = async (workSchedID) => {
    if (workSchedID) {
      api
        .get(workScheduleAPI + "/" + workSchedID)
        .then(function (response) {
          setWorkScheduleWithDupa(response.data);
          setIsTableLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setIsTableLoading(false);
        });
    } else {
      setIsTableLoading(false);
    }
  };

  //FETCH SPECIFIC WORK SCHEDULE ITEM
  const fetchWorkScheduleItem = async (workSchedItemID) => {
    await api(workSchedItemAPI + "/" + workSchedItemID)
      .then((response) => {
        setWorkSchedItem({
          sched_id: response.data[0].id,
          schedule: response.data[0].schedule,
          split_no: response.data[0].split_no,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function convertNumberToLetter(number) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number >= 1 && number <= 26) {
      return letters[number - 1];
    } else {
      return "Invalid Input";
    }
  }

  // ADD PROJECT DURATION
  const AddDuration = (id) => {
    isSetShowModal(true);
    setModalWidth(500);
    setModalTitle("Add Duration");
    setSelectedContent("Add Duration");
    setProjectDurationFormData({
      ...projectDurationFormData,
      work_sched_id: id,
    });
    footer.current = true;
  };

  //EDIT PROJECT DURATION
  const EditDuration = (id, workSchedID, noOfDays) => {
    isSetShowModal(true);
    setModalWidth(500);
    setModalTitle("Edit Duration");
    setSelectedContent("Edit Duration");
    setProjectDurationFormData({
      ...projectDurationFormData,
      id: id,
      work_sched_id: workSchedID,
      no_of_days: noOfDays,
    });
    footer.current = true;
  };

  const handleButtonSetSchedule = (dupa) => {
    isSetShowModal(true);
    setModalWidth(500);
    setModalTitle("Set Work Schedule");
    setSelectedContent("Set Work Schedule");
    setDupaItem(dupa);
    footer.current = false;
  };
  // EDIT SCHEDULE
  const handleButtonEditSchedule = (dupa) => {
    isSetShowModal(true);
    setModalWidth(600);
    setModalTitle("Edit Work Schedule");
    setSelectedContent("Edit Work Schedule");
    setDupaItem(dupa);
    fetchWorkScheduleItem(dupa.work_sched_item_id);
    footer.current = false;
  };

  const setContentField = () => {
    switch (selectedContent) {
      case "Add Duration":
        return (
          <AddProjectDuration
            modalTitle={modalTitle}
            setProjectDurationFormData={setProjectDurationFormData}
            projectDurationFormData={projectDurationFormData}
          />
        );
      case "Set Work Schedule":
        return (
          <AddWorkSched_v2
            modalTitle={modalTitle}
            dupaItem={dupaItem}
            setWorkScheduleDupaFormData={setWorkScheduleDupaFormData}
            onSubmit={onSubmit}
          />
        );
      case "Edit Duration":
        return (
          <EditProjectDuration
            modalTitle={modalTitle}
            setProjectDurationFormData={setProjectDurationFormData}
            projectDurationFormData={projectDurationFormData}
            onSubmit={onSubmit}
          />
        );
      case "Edit Work Schedule":
        return (
          <EditWorkSched
            modalTitle={modalTitle}
            dupaItem={dupaItem}
            setWorkScheduleDupaFormData={setWorkScheduleDupaFormData}
            onSubmit={onSubmit}
            worksched={workSchedItem}
            api={api}
            csrfCookie={csrfCookie}
            fetchWorkSchedId={fetchWorkScheduleItem}
            Toast={Toast}
            modified={modified}
            setModified={setModified}
          />
        );
      case "Set Preview":
        return (
          <PreviewWorkSchedule
            modalTitle={modalTitle}
            projectData={projectData}
            handleCancel={handleCancel}
            workScheduleWithDupa={workScheduleWithDupa}
            projectDuration={projectDuration}
          />
        );
      case "Update Work Schedule Item Duration":
        return (
          <UpdateWorkScheduleItemDuration
            modalTitle={modalTitle}
            setWorkScheduleItemDurationFormData={
              setWorkScheduleItemDurationFormData
            }
            workScheduleItemDurationFormData={workScheduleItemDurationFormData}
            handleCancel={handleCancel}
          />
        );
    }
  };

  // MULTIPLE ON SUBMIT MODALS
  const onSubmit = () => {
    switch (selectedContent) {
      case "Add Duration":
        //SUBMIT MODAL BUTTON STORE PROJECT DURATION
        api
          .post(storeProjectDurationAPI, projectDurationFormData)
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchWorkSchedule();
          })
          .catch(function (error) {
            console.log(error);
            isSetShowModal(false);
          });
        break;

      case "Set Work Schedule":
        // var total_duration = 0;
        // workScheduleDupaFormData.forEach((data) => {
        //   if (data.duration_no) {
        //     total_duration += parseFloat(data.duration_no);
        //   }
        // });

        // if (total_duration != parseFloat(dupaItem.duration)) {
        //   Toast.fire({
        //     icon: "error",
        //     title: "Incorrect Data",
        //     text: "The total number of duration is not equal to the total duration inputted.",
        //   });
        //   break;
        // }

        // // SUBMIT MODAL BUTTON STORE WORK SCHEDULE PER DUPA
        csrfCookie().catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Incorrect Data",
            text: "Something went wrong when posting the data.",
          });
        });
        // console.log("wsfd", workScheduleDupaFormData);
        api
          .post(StartScheduleAPI, {
            work_sched_item_id: dupaItem.work_sched_item_id,
            start_week: workScheduleDupaFormData[0].week_no,
            start_day: workScheduleDupaFormData[0].day_no,
            duration: dupaItem.duration,
          })
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            fetchWorkSchedule();
            isSetShowModal(false);
          })
          .catch(function (error) {
            console.log(error);
            Toast.fire({
              icon: "error",
              title: error.response.status,
              text: error.response.data.message,
            });
          });
        break;

      case "Edit Duration":
        csrfCookie().catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Incorrect Data",
            text: "Something went wrong when posting the data.",
          });
        });
        api
          .post("/project-duration", projectDurationFormData)
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            isSetShowModal(false);
            fetchWorkSchedule();
          })
          .catch(function (error) {
            console.log(error);
            isSetShowModal(false);
          });
        break;

      case "Edit Work Schedule":
        // console.log("wdfd", workScheduleDupaFormData);
        // console.log("wdfd length", workScheduleDupaFormData.length);
        let total_durations = 0;
        workScheduleDupaFormData.forEach((data) => {
          if (data.duration_no) {
            total_durations += parseFloat(data.duration_no);
          }
        });
        if (total_durations != parseFloat(dupaItem.duration)) {
          Toast.fire({
            icon: "error",
            title: "Incorrect Data",
            text: "The total number of duration is not equal to the total duration inputted.",
          });
          break;
        }

        api
          .post(AddDurationAPI + "/" + dupaItem.work_sched_item_id, {
            dates: workScheduleDupaFormData,
            split_no: workScheduleDupaFormData.length,
            duration: dupaItem.duration,
          })
          .then(function (response) {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            fetchWorkSchedule();
            isSetShowModal(false);
            setClosable(true);
            setModified(false);
          })
          .catch(function (error) {
            console.log(error);
            Toast.fire({
              icon: "error",
              title: error.response.status,
              text: error.response.data.message,
            });
          });

        return "success";
        break;

      case "Update Work Schedule Item Duration":
        //SUBMIT MODAL BUTTON UPDATE WORK SCHEDULE ITEM DURATION
        api
          .put(
            UpdateWorkScheduleItemDurationAPI +
              "/" +
              workScheduleItemDurationFormData.work_schedule_item_id,
            workScheduleItemDurationFormData
          )
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            fetchWorkSchedule();
            isSetShowModal(false);
          })
          .catch((error) => {
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
        break;
    }
  };

  // HANDLE CANCEL FOR MODALS
  const handleCancel = () => {
    isSetShowModal(false);
    isSetViewWorkSchedule(false);
  };

  // CREATING POW
  const createWorkSchedule = () => {
    Swal.fire(SaveSwalAlert).then((result) => {
      if (result.isConfirmed) {
        if (fetchWorkScheduleData.length === 0) {
          api
            .post(workScheduleAPI, workScheduleFormData)
            .then(function (response) {
              Toast.fire({
                icon: "success",
                title: response.data.status,
                text: response.data.message,
              });
              setIsTableLoading(true);
              fetchWorkSchedule();
            })
            .catch(function (error) {
              console.log(error);
              setIsTableLoading(false);
            });
        } else {
          Toast.fire({
            icon: "info",
            title: "Important",
            text: "Creating a schedule requires having a Program of Work(POW) beforehand.",
          });
        }
        setIsTableLoading(false);
      }
    });
  };

  const handleButtonViewSchedule = (record) => {
    isSetViewWorkSchedule(true);
    setDupaItemData(record);
    setDupaItemSchedule(record.action[1]);
    setDupaItemDuration(record.duration);
  };

  // const handleButtonPreview = () => {
  //   isSetShowModal(true);
  //   setModalWidth("90%");
  //   setModalTitle("Set Preview");
  //   setSelectedContent("Set Preview");
  //   footer.current = false;
  // };

  const updateWorkScheduleItemDuration = (data) => {
    // console.log("wis", data);
    isSetShowModal(true);
    setModalWidth(500);
    setModalTitle("Duration No. of Days");
    setSelectedContent("Update Work Schedule Item Duration");
    setWorkScheduleItemDurationFormData({
      ...workScheduleItemDurationFormData,
      work_schedule_item_id: data.work_sched_item_id,
      work_schedule_id: data.work_sched_id,
      duration: data.duration,
    });
  };

  // DATA TABLE
  const columns = [
    {
      title: "Item Code",
      dataIndex: "item_code",
      key: "item_code",
      width: "5%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
    },
    {
      title: "Quantity (unit)",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      width: "5%",
      render: (text, record, index) => {
        if (text) {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>{record.quantity}</span>&nbsp;&nbsp;
              <span>{record.unit}</span>&nbsp;&nbsp;
            </div>
          );
        }
      },
    },
    {
      title: "Duration ",
      dataIndex: "duration",
      key: "duration",
      align: "center",
      width: "10%",
      render: (text, record, index) => {
        if (text) {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>{text}</span>
              {/* <Button
                type="link"
                icon={<EditOutlined />}
                onClick={() => updateWorkScheduleItemDuration(record)}
              /> */}
            </div>
          );
        }
      },
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
      align: "center",
      width: "10%",
      render: (text, record, index) => {
        if (text) {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>{text}</span>
            </div>
          );
        }
      },
    },
    {
      title: "Unit Cost",
      dataIndex: "unit_cost",
      key: "unit_cost",
      align: "center",
      width: "10%",
      render: (text, record, index) => {
        // console.log("table_text", record);
        if (text) {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>{text}</span>
            </div>
          );
        }
      },
    },
  ];

  !printing &&
    columns.push({
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      // width: 0,
      render: (text, record) =>
        record.action[1] && record.action[1].length > 0 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* <Button onClick={() => handleButtonViewSchedule(record)}>
          View Schedule
        </Button> */}
            &nbsp;
            <Button
              onClick={() => handleButtonEditSchedule(record)}
              style={{ color: "blue" }}
            >
              <EditOutlined /> Edit Schedule
            </Button>
          </div>
        ) : record.action[0] ? (
          <Button onClick={() => handleButtonSetSchedule(record)}>
            Set Schedule
          </Button>
        ) : null,
    });

  useEffect(() => {
    fetchWorkSchedule();
  }, [latestDUPA, dupaGroupId]);

  // CHECKING THE WORKSCHEDULE DATA FOR THE SUBMISSION FOR APPROVAL
  useEffect(() => {
    if (fetchWorkScheduleData.length > 0) {
      setHasWorkScheduleData(true);
    } else {
      setHasWorkScheduleData(false);
    }
  }, [fetchWorkScheduleData]);

  return (
    <div ref={componentRef}>
      {fetchWorkScheduleData.length === 0 ? (
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
                  <p className="work-schedule">
                    <strong>B ID#: </strong> 202305
                  </p>
                  <p className="work-schedule">
                    <strong>Project Registry No.(DED): </strong>
                    {projectData?.registry_no}
                  </p>
                  <p className="work-schedule">
                    <strong>Project Name: </strong>
                    {projectData?.project_title}
                  </p>
                  <p className="work-schedule">
                    <strong>Location: </strong>
                    {projectData?.location}
                  </p>
                </Col>
                <Col span={24} align="center">
                  <p className="quantity-proj">Work Schedule</p>
                </Col>
              </Row>
              <Space>
                <h1>Want to create Work Schedule ?</h1>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={createWorkSchedule}
                  style={{
                    backgroundColor: "#539165",
                  }}
                >
                  Create
                </Button>
              </Space>
            </div>
          )}
        </div>
      ) : (
        <div>
          <FileHeader />
          <Divider />
          <Row>
            <Col span={14}>
              <p className="work-schedule">
                <strong>B ID#: </strong> 202305
              </p>
              <p className="work-schedule">
                <strong>Project Registry No.(DED): </strong>
                {projectData?.registry_no}
              </p>
              <p className="work-schedule">
                <strong>Project Name: </strong>
                {projectData?.project_title}
              </p>
              <p className="work-schedule">
                <strong>Location: </strong>
                {projectData?.location}
              </p>
            </Col>
            <Col span={24} align="center">
              <p className="quantity-proj">Work Schedule</p>
            </Col>
          </Row>
          {isViewWorkSchedule === true ? (
            <ViewWorkSchedule
              projectData={projectData}
              handleCancel={handleCancel}
              dupaItemDuration={dupaItemDuration}
              dupaItemSchedule={dupaItemSchedule}
              dupaItemData={dupaItemData}
            />
          ) : (
            <div style={{ marginTop: 50, marginBottom: 50 }}>
              <Card>
                {/* <Button
                  type="primary"
                  style={{
                    marginBottom: 10,
                    backgroundColor: "#176B87",
                    alignContent: "end",
                  }}
                  onClick={() => handleButtonPreview()}
                >
                  Preview
                </Button> */}
                {!printing ? (
                  <Tabs defaultActiveKey="1">
                    {workScheduleWithDupa.map((value, i) => {
                      if (value.project_duration !== null) {
                        let duration = parseInt(
                          value.project_duration.no_of_days
                        );
                        if (duration > projectDuration) {
                          setProjectDuration(duration);
                        }
                      }
                      let workSchedData = [];
                      value.b3_project.program_of_work.pow_table.map(
                        (part_numbers, index) => {
                          let counter = 1;
                          workSchedData = [
                            {
                              key: index,
                              item_code: (
                                <strong>
                                  {part_numbers.sow_category.item_code.toUpperCase()}
                                </strong>
                              ),
                              description: (
                                <strong>
                                  {part_numbers.sow_category.name.toUpperCase()}
                                </strong>
                              ),
                              quantity: "",
                              unit: "",
                              duration: "",
                              action: "",
                            },
                          ];
                          part_numbers.contents.map((part_letters, index2) => {
                            workSchedData.push({
                              key: index + "-" + index2,
                              item_code: (
                                <strong>{`PART ${convertNumberToLetter(
                                  parseInt(counter++)
                                )}`}</strong>
                              ),
                              description: (
                                <strong>
                                  {part_letters.sow_subcategory.name}
                                </strong>
                              ),
                              quantity: "",
                              unit: "",
                              duration: "",
                              action: "",
                            });
                            part_letters.dupa_items_per_project.map(
                              (dupas, index3) => {
                                workSchedData.push({
                                  key: index + "-" + index2 + "-" + index3,
                                  work_sched_id:
                                    dupas.dupa_per_project.work_schedule_item
                                      .work_sched_id,
                                  work_sched_item_id:
                                    dupas.dupa_per_project.work_schedule_item
                                      .id,
                                  item_code: dupas.dupa_per_project.item_number,
                                  description:
                                    dupas.dupa_per_project.description,
                                  quantity: dupas.quantity,
                                  cost: dupas.total_estimated_direct_cost,
                                  unit_cost:
                                    dupas.dupa_per_project.direct_unit_cost,
                                  unit: dupas.dupa_per_project.measures
                                    .abbreviation,
                                  duration:
                                    dupas.dupa_per_project.work_schedule_item
                                      .duration,
                                  action: [
                                    dupas.id,
                                    dupas.dupa_per_project.work_schedule_item
                                      .schedule,
                                  ],
                                });
                              }
                            );
                          });
                        }
                      );
                      return (
                        <TabPane
                          tab={
                            value.b3_project.group.name
                              ? value.b3_project.group.name
                              : value.b3_project.project_nature_id === 1
                              ? "Street " + value.b3_project.group.group_no
                              : "Building " + value.b3_project.group.group_no
                          }
                          key={value.id}
                        >
                          <p
                            className="work-schedule"
                            style={{ marginBottom: 20 }}
                          >
                            <strong>Project Duration: </strong>
                            {value.project_duration?.no_of_days}
                          </p>

                          {value.project_duration === null ? (
                            <Button
                              type="primary"
                              icon={<PlusOutlined />}
                              onClick={() => AddDuration(value.id)}
                              style={{
                                backgroundColor: "#539165",
                                marginBottom: 20,
                              }}
                            >
                              Create Duration
                            </Button>
                          ) : !printing ? (
                            <Button
                              type="primary"
                              icon={<PlusOutlined />}
                              onClick={() =>
                                EditDuration(
                                  value.project_duration.id,
                                  value.project_duration.work_sched_id,
                                  value.project_duration.no_of_days
                                )
                              }
                              style={{
                                backgroundColor: "",
                                marginBottom: 20,
                              }}
                            >
                              Edit Duration
                            </Button>
                          ) : (
                            <></>
                          )}
                          <TableComponents
                            className="preview-ws-dupa-table"
                            columns={columns}
                            dataSource={workSchedData}
                            pagination={false}
                            size="medium"
                          />
                        </TabPane>
                      );
                    })}
                  </Tabs>
                ) : (
                  <TableComponents
                    className="preview-ws-dupa-table"
                    columns={columns}
                    dataSource={printingData}
                    pagination={false}
                    size="medium"
                  />
                )}
              </Card>
            </div>
          )}
        </div>
      )}
      <ModalComponents
        className="custom-modals"
        isShownModal={isShowModal}
        modalContent={setContentField()}
        handleCancel={handleCancel}
        okText={"Submit"}
        handleOk={onSubmit}
        modalWidth={modalWidth}
        footer={footer.current}
        closable={closable}
      />
      {/* <Divider /> */}
      <div
        style={{
          position: "relative",
          width: "100% ",
          // border: "1px",
          // borderColor: "red",
          // borderStyle: "Solid",
          minHeight: "450px",
        }}
      >
        <TimelineChart
          workSchedule={workScheduleWithDupa}
          dates={dates}
          setDates={setDates}
          maxYlabel={maxYlabel}
          buttonRef={buttonRef}
        />
        <TestChart
          workSchedule={workScheduleWithDupa}
          dates={dates}
          setDates={setDates}
          maxYlabel={maxYlabel}
        />
      </div>
      <Divider />
      <div style={{ display: "flex", justifyContent: "end" }} ref={printRef}>
        <Button
          onClick={handlePrint}
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
          <PrinterOutlined /> Print
        </Button>
      </div>
    </div>
  );
};

export default WorkSchedule;
