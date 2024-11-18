import React, { useState, useEffect } from "react";
import Sidenav from "../../layout/Sidenav";
import Navbar from "../../layout/Navbar";
import Footernav from "../../layout/Footernav";
import { Button, Space, Layout } from "antd";
import TableComponents from "../../resources/TableComponents";
import { Link } from "react-router-dom";
import { axios } from "../../../axios-client";
import {
  FolderViewOutlined,
  OrderedListOutlined,
  EditOutlined,
} from "@ant-design/icons";

//gateway
import csrfCookie from "../../../utilities/csrf-cookie";
import { api } from "../../../utilities/axios-gateway";

const { Content } = Layout;

const ProjApi = "/project";

const B3TeamProj = () => {
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [projTakeOffData, setProjTakeOffData] = useState(null);
  const [showActionButton, setShowActionButton] = useState(true);

  // FETCHING POW DATA
  const getB3Proj = async () => {
    api
      .get(ProjApi)
      .then(function (response) {
        setProjTakeOffData(response.data);
        setIsTableLoading(false);
        setShowActionButton(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getB3Proj();
  }, []);

  const columns = [
    {
      title: "",
      key: "action",
      dataIndex: "id",
      render: (text) => (
        <Space size="small">
          {showActionButton ? (
            <Link to={`/team-project/${text}`}>
              <Button
                type="primary"
                icon={<FolderViewOutlined />}
                className="btn-create-b3"
                style={{ backgroundColor: "#176B87" }}
              >
                View Project
              </Button>
            </Link>
          ) : (
            <Link to={`/team-project/${text}`}>
              <Button
                type="link"
                style={{ color: "black" }}
                icon={<FolderViewOutlined />}
              ></Button>

              <Button type="link" icon={<EditOutlined />}></Button>
            </Link>
          )}
        </Space>
      ),
    },
    {
      title: "Project title",
      dataIndex: "project_title",
      width: "30%",
      key: "project_title",
    },
    {
      title: "Registry No.",
      dataIndex: "registry_no",
      width: "15%",
      key: "registry_no",
      sorter: (a, b) => a.registry_no.localeCompare(b.registry_no),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: "20%",
      sorter: (a, b) => a.location.localeCompare(b.location),
    },
    {
      title: "Project Nature",
      dataIndex: "project_nature_id",
      key: "project_nature_id",
      width: "20%",
      sorter: (a, b) => a.project_nature_id.localeCompare(b.location),
    },
  ];

  // if(!isTableLoading) {
  return (
    <Layout className="layout-container">
      <Sidenav />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: 20 }}>
          <div className="main-component-container">
            <h1 className="project-title">
              <OrderedListOutlined /> Team Project List
            </h1>
            <div className="responsive-table">
              <TableComponents
                loading={isTableLoading}
                className="project-table"
                columns={columns}
                dataSource={projTakeOffData}
              />
            </div>
          </div>
        </Content>
        <Footernav />
      </Layout>
    </Layout>
  );
  // }

  // return <LoadingPage />
};

export default B3TeamProj;
