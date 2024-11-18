import React, { useEffect, useState } from "react";
import Layout from "antd/es/layout/layout";
import Sidenav from "../../layout/Sidenav";
import Navbar from "../../layout/Navbar";
import { Content } from "antd/es/layout/layout";
import Footernav from "../../layout/Footernav";
import {
  Tag,
  Button,
  Modal,
  Form,
  Input,
  Divider,
  Select,
  Space,
  Spin,
  Checkbox,
  Alert,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import createSwal from "../../resources/swal/CreateSwalAlert";
import { api } from "../../../utilities/axios-gateway";
import csrfCookie from "../../../utilities/csrf-cookie";
import { useAuth } from "../../../context/auth";

const AccountSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRoles, setUserRoles] = useState(null);
  const { user, getUser } = useAuth();
  const [teamData, setTeamData] = useState(null);
  const [showTeam, setShowTeam] = useState(false);
  const Toast = createSwal();

  useEffect(() => {
    fetchRoles();
    fetchTeam();
    if (user.team_id) {
      setShowTeam(true);
    }
  }, []);

  const fetchRoles = async () => {
    await api("/role")
      .then((response) => {
        setUserRoles(
          response.data.map((role, index) => {
            return { value: role.id, label: role.name };
          })
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const fetchTeam = async () => {
    await api("/team")
      .then((response) => {
        setTeamData(
          response.data.map((team, index) => {
            return { value: team.id, label: "Team " + team.name };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 0 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 6,
        offset: 0,
      },
      sm: {
        span: 18,
        offset: 0,
      },
    },
  };

  const handleChange = (value, option) => {
    if (option.label == "Engineer") {
      setShowTeam(true);
      console.log("clicked");
    } else {
      setShowTeam(false);
    }
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    await csrfCookie().catch((err) => {
      setError("Something went wrong when posting the data");
      console.log(err);
    });
    await api
      .post("/user", values)
      .then(async (response) => {
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
        getUser();
      })
      .catch((err) => {
        setError(err.response.data.errors);
      });
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleClose = () => {
    setError(null);
  };

  return (
    <Layout className="layout-container">
      <Sidenav />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: 50 }}>
          <div className="main-component-container">
            <h3>Account Settings</h3>
            <Divider />
            {error &&
              Object.keys(error).map((msg, index) => {
                return (
                  <Alert
                    message={error[msg]}
                    type="error"
                    style={{ marginBottom: "15px" }}
                    closable
                    banner={true}
                    onClose={handleClose}
                  />
                );
              })}
            {isLoading ? (
              <Space direction="vertical" style={{ width: "100%" }}>
                <Spin size="medium">
                  <div className="content" />
                </Spin>
              </Space>
            ) : (
              <Form
                {...formItemLayout}
                size="middle"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item name={"id"} initialValue={user.id}>
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item
                  name={"name"}
                  label={"Fullname"}
                  {...tailFormItemLayout}
                  initialValue={user.name}
                >
                  <Input
                    placeholder={" Enter your Full name..."}
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
                <br />
                <Form.Item
                  name={"username"}
                  label={"Username"}
                  {...tailFormItemLayout}
                  initialValue={user.username}
                >
                  <Input
                    placeholder={"Enter Username..."}
                    prefix={<UserOutlined />}
                  />
                </Form.Item>
                <br />
                <Form.Item
                  name={"position"}
                  label={"Position"}
                  {...tailFormItemLayout}
                  initialValue={user.position}
                >
                  <Input placeholder={"Enter Position..."} />
                </Form.Item>
                <br />
                <Form.Item
                  name={"role_id"}
                  label={"Role"}
                  {...tailFormItemLayout}
                  initialValue={user.role_id}
                >
                  <Select onChange={handleChange} options={userRoles} />
                </Form.Item>
                {showTeam ? (
                  <>
                    <br />
                    <Form.Item
                      name={"team_id"}
                      label={"Team"}
                      {...tailFormItemLayout}
                      initialValue={
                        user.team_id
                          ? user.team_id
                          : Object.values(teamData)[0].value
                      }
                    >
                      <Select options={teamData} />
                    </Form.Item>
                  </>
                ) : (
                  <></>
                )}
                <br />
                <Form.Item
                  name={"password"}
                  label={"New Password"}
                  {...tailFormItemLayout}
                  initialValue={null}
                >
                  <Input.Password placeholder="input password..." />
                </Form.Item>
                <br />
                <Form.Item
                  name={"password_confirmation"}
                  label={"Repeat New Password"}
                  {...tailFormItemLayout}
                  initialValue={null}
                >
                  <Input.Password placeholder="Repeat password..." />
                </Form.Item>
                <br />
                <Form.Item
                  name={"is_active"}
                  label={"Status"}
                  {...tailFormItemLayout}
                  valuePropName="checked"
                  initialValue={user.is_active}
                >
                  <Checkbox>
                    {user.is_active ? "Active" : "Deactivated"}
                  </Checkbox>
                </Form.Item>
                <br />
                <Form.Item
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    marginRight: "1.25rem",
                  }}
                >
                  <Button type="default" htmlType="submit">
                    <span>
                      <SaveOutlined /> Edit Account
                    </span>
                  </Button>
                </Form.Item>
              </Form>
            )}
          </div>
        </Content>
        <Footernav />
      </Layout>
    </Layout>
  );
};

export default AccountSettings;
