import React, { useState, useEffect } from "react";
import Sidenav from "../../layout/Sidenav";
import Navbar from "../../layout/Navbar";
import Footernav from "../../layout/Footernav";
import { Button, Tabs, Layout, Card, Breadcrumb, Divider, Modal } from "antd";
import { Link } from "react-router-dom";
import { axios } from "../../../axios-client";
import { useParams } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import TeamTakeOff from "../projects/TakeOff";
import POW from "../projects/POW";
import ABC from "./ABC";
import LOME from "./LOME";
import MER from "./MER";
import Certification from "./Certification";
import FileHeader from "../../resources/FileHeader";
import CreateTakeOffModal from "../../resources/modal_fields/take_off_modals/CreateTakeOffModal";
import { createLimitNLength } from "../../resources/api/Api";
import createSwal from "../../resources/swal/CreateSwalAlert";
import WorkSchedule from "./WorkSchedule";
import csrfCookie from "../../../utilities/csrf-cookie";
import DupaPerProject from "./DupaPerProject";
import { TechSpec } from "./TechSpec";
import LOPE from "./LOPE";
import ProjectPlan from "./ProjectPlan";
import { api } from "../../../utilities/axios-gateway";
const { TabPane } = Tabs;
const { Content } = Layout;
const Toast = createSwal();

const ProjApi = "/project";
const TakeOffApi = "/take-off";
const SOWCatApi = "/sowcat";

const B3TeamProjDetails = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isShowModal, isSetShowModal] = useState(false);
  const [showTab, setShowTab] = useState(true);
  const [isTakeoffDetailNull, setIsTakeOffDetailNull] = useState();
  const [limitNLenghtFormData, setLimitNLenghtFormData] = useState({
    limit: "",
    length: "",
    b3_project_id: id,
  });
  const [dataSOWCat, setDataSOWCat] = useState(null);
  const [latestDUPA, setLatestDUPA] = useState(null);
  const [dupaGroupId, setDupaGroupId] = useState(null);
  const [dupaQuantity, setDupaQuantity] = useState(null);

  const [hasDupaData, setHasDupaData] = useState(false);
  const [hasTakeOffData, setHasTakeOffData] = useState(false);
  const [hasPOWData, setHasPOWData] = useState(false);
  const [hasABCData, setHasABCData] = useState(false);
  const [hasWorkScheduleData, setHasWorkScheduleData] = useState(false);

  // FETCH ABC TO CHECK FOR THE SUBMISSION OF PROJECT FOR APPROVAL
  const fetchAbc = async () => {
    setIsTableLoading(true);
    await api("abc/" + id).then((response) => {
      if (Object.keys(response.data).length > 0) {
        setHasABCData(true);
      } else {
        setHasABCData(false);
      }
      setIsTableLoading(false);
    });
  };

  // FETCH TAKEOFF TO CHECK FOR THE SUBMISSION OF PROJECT FOR APPROVAL
  const fetchTakeOff = async () => {
    setIsTableLoading(true);
    await api("take-off/" + id).then((response) => {
      if (response.data[0]?.take_off_table?.length > 0) {
        setHasTakeOffData(true);
      } else {
        setHasTakeOffData(false);
      }
      setIsTableLoading(false);
    });
  };

  // FETCH POW TO CHECK FOR THE SUBMISSION OF PROJECT FOR APPROVAL
  const fetchPOW = async () => {
    setIsTableLoading(true);
    await api("pow/" + id).then((response) => {
      if (Object.keys(response.data).length > 0) {
        setHasPOWData(true);
      } else {
        setHasPOWData(false);
      }
      setIsTableLoading(false);
    });
  };

  // FETCH WORKSCHEDULE TO CHECK FOR THE SUBMISSION OF PROJECT FOR APPROVAL
  const fetchWorkSchedule = async () => {
    setIsTableLoading(true);
    await api("project/work-schedule/" + id).then((response) => {
      if (response.data.work_schedule.length > 0) {
        setHasWorkScheduleData(true);
      } else {
        setHasWorkScheduleData(false);
      }
      setIsTableLoading(false);
    });
  };

  const fetchProject = async () => {
    api
      .get(ProjApi + "/" + id)
      .then(function (response) {
        setProjectData(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // FETCH SOW CATEGORIES API
  const fetchSOWCat = async () => {
    api
      .get(SOWCatApi)
      .then(function (response) {
        setDataSOWCat(response.data);
        // console.log(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // HANDLE TAB CLICK TO TEAM PROJECT CONTENTS
  function handleTabClick(tabKey) {
    console.log(`Tab ${tabKey} clicked`);
  }

  function handleLatestDupaClick(data) {
    setLatestDUPA(data);
  }

  function handleDeleteDupaGroup(_id) {
    setDupaGroupId(_id);
  }

  function handleQuantitySubmit(quantity) {
    setDupaQuantity(quantity);
  }

  const onSubmit = async () => {
    await csrfCookie();
    api
      .post(TakeOffApi, limitNLenghtFormData)
      .then(function (response) {
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
        isSetShowModal(false);
        // fetchTakeOff();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmitForApproval = async () => {
    const missingData = [];

    if (!hasDupaData) missingData.push("DUPA");
    if (!hasTakeOffData) missingData.push("Take Off");
    if (!hasPOWData) missingData.push("POW");
    if (!hasABCData) missingData.push("ABC");
    if (!hasWorkScheduleData) missingData.push("Work Schedule");

    if (missingData.length > 0) {
      Toast.fire({
        icon: "error",
        title: "Missing Data",
        html: `Please ensure the following sections have data created before submission: <strong>${missingData.join(
          ", "
        )}</strong>.`,
      });
      return;
    }

    try {
      setIsTableLoading(true);
      await csrfCookie();
      const response = await api.put(`/b3-project/${id}/for-approval`);
      Toast.fire({
        icon: "success",
        title: response.data.status,
        text: response.data.message,
      });
      fetchProject();
      setIsTableLoading(false);
    } catch (error) {
      console.error("Error submitting for approval:", error);
      Toast.fire({
        icon: "error",
        title: "Error",
        text: "There was an error submitting for approval. Please try again later.",
      });
    }
  };

  useEffect(() => {
    fetchProject();
    fetchSOWCat();
    fetchAbc();
    fetchTakeOff();
    fetchPOW();
    fetchWorkSchedule();
  }, []);

  return (
    <Layout className="layout-container">
      <Sidenav />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Breadcrumb
              className="bread-crumb"
              items={[
                {
                  title: (
                    <Link to="/team-project">
                      <BiHomeAlt2 /> Team Project
                    </Link>
                  ),
                },
                {
                  title: <a href="">Details</a>,
                },
              ]}
            />

            {isTableLoading ? (
              <Button
                type="primary"
                style={{
                  backgroundColor: "#539165",
                  margin: 0,
                }}
              >
                Loading...
              </Button>
            ) : (
              <Button
                onClick={handleSubmitForApproval}
                disabled={projectData?.status === "for approval"}
                type="primary"
                style={{
                  backgroundColor:
                    projectData?.status === "for approval"
                      ? "#3388FF"
                      : "#539165",
                  color: projectData?.status === "for approval" && "#fff",
                  margin: 0,
                }}
              >
                {projectData?.status === "for approval"
                  ? "For Approval"
                  : "Submit for Approval"}
              </Button>
            )}
          </div>

          <div style={{ marginTop: "20px" }}>
            <Card>
              <Tabs defaultActiveKey="1">
                <TabPane tab="DUPA" key="1" onClick={() => handleTabClick("1")}>
                  <FileHeader />
                  <Divider />
                  <DupaPerProject
                    sowCatData={dataSOWCat}
                    setShowTab={setShowTab}
                    onInsertNewDUPA={handleLatestDupaClick}
                    onDeleteDupaGroup={handleDeleteDupaGroup}
                    setHasDupaData={setHasDupaData}
                  />
                </TabPane>

                <TabPane
                  tab="Take Off"
                  key="2"
                  onClick={() => handleTabClick("2")}
                  disabled={showTab}
                >
                  <FileHeader />
                  <Divider />
                  <TeamTakeOff
                    takeOffDetails={isTakeoffDetailNull}
                    latestDUPA={latestDUPA}
                    dupaGroupId={dupaGroupId}
                    onUpdateDupaQuantity={handleQuantitySubmit}
                    setHasTakeOffData={setHasTakeOffData}
                  />
                </TabPane>

                <TabPane
                  tab="POW"
                  key="3"
                  onClick={() => handleTabClick("3")}
                  disabled={showTab}
                >
                  <POW
                    sowCatData={dataSOWCat}
                    projectData={projectData}
                    latestDUPA={latestDUPA}
                    dupaGroupId={dupaGroupId}
                    onUpdateDupaQuantity={handleQuantitySubmit}
                    dupaQuantity={dupaQuantity}
                    setHasPOWData={setHasPOWData}
                  />
                </TabPane>

                <TabPane
                  tab="ABC"
                  key="4"
                  onClick={() => handleTabClick("4")}
                  disabled={showTab}
                >
                  <ABC
                    sowCatData={dataSOWCat}
                    projectData={projectData}
                    latestDUPA={latestDUPA}
                    dupaGroupId={dupaGroupId}
                    powQuantity={dupaQuantity}
                    setHasABCData={setHasABCData}
                  />
                </TabPane>

                <TabPane
                  tab="Work Schedule"
                  key="5"
                  onClick={() => handleTabClick("5")}
                  disabled={showTab}
                >
                  <WorkSchedule
                    sowCatData={dataSOWCat}
                    projectData={projectData}
                    latestDUPA={latestDUPA}
                    dupaGroupId={dupaGroupId}
                    setHasWorkScheduleData={setHasWorkScheduleData}
                  />
                </TabPane>

                <TabPane
                  tab="Project Plan"
                  key="11"
                  onClick={() => handleTabClick("11")}
                  disabled={showTab}
                >
                  <ProjectPlan
                    sowCatData={dataSOWCat}
                    projectData={projectData}
                  />
                </TabPane>

                <TabPane
                  tab="LOPE"
                  key="10"
                  onClick={() => handleTabClick("10")}
                  disabled={showTab}
                >
                  <LOPE sowCatData={dataSOWCat} projectData={projectData} />
                </TabPane>

                <TabPane
                  tab="LOME"
                  key="6"
                  onClick={() => handleTabClick("6")}
                  disabled={showTab}
                >
                  <LOME sowCatData={dataSOWCat} projectData={projectData} />
                </TabPane>

                <TabPane
                  tab="MER"
                  key="7"
                  onClick={() => handleTabClick("7")}
                  disabled={showTab}
                >
                  <MER sowCatData={dataSOWCat} projectData={projectData} />
                </TabPane>

                <TabPane
                  tab="Certification"
                  key="9"
                  onClick={() => handleTabClick("9")}
                  disabled={showTab}
                >
                  <Certification
                    sowCatData={dataSOWCat}
                    projectData={projectData}
                  />
                </TabPane>

                <TabPane
                  tab="Tech Specs"
                  key="8"
                  onClick={() => handleTabClick("8")}
                  disabled={showTab}
                >
                  <TechSpec sowCatData={dataSOWCat} projectData={projectData} />
                </TabPane>
              </Tabs>
            </Card>
          </div>

          <Modal
            open={isShowModal}
            okText="Submit"
            closable={false}
            footer={null}
          >
            <CreateTakeOffModal
              limitNLenghtFormData={limitNLenghtFormData}
              setLimitNLenghtFormData={setLimitNLenghtFormData}
            />
            <div style={{ textAlign: "right", marginTop: 10 }}>
              <Button style={{ marginRight: 10 }}>
                <Link to="/team-project">Cancel</Link>
              </Button>
              <Button onClick={onSubmit} type="primary">
                Submit
              </Button>
            </div>
          </Modal>
        </Content>
        <Footernav />
      </Layout>
    </Layout>
  );
};

export default B3TeamProjDetails;
