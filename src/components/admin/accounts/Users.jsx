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
import TableComponents from "../../resources/TableComponents";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import Swal from "sweetalert2";
import createSwal from "../../resources/swal/CreateSwalAlert";
import { DeleteSwalConfig } from "../../resources/swal/DeleteSwalConfig";
import { api } from "../../../utilities/axios-gateway";
import csrfCookie from "../../../utilities/csrf-cookie";

function Users() {
  const [usersData, setUsersData] = useState(null);
  const [userEditData, setUserEditData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userModal, setUserModal] = useState(false);
  const [teamModal, setTeamModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userRoles, setUserRoles] = useState(null);
  const [teamData, setTeamData] = useState(null);
  const [error, setError] = useState(null);
  const [showTeam, setShowTeam] = useState(false);
  const Toast = createSwal();

  useEffect(() => {
    fetchRoles();
    fetchUserAccounts();
    fetchTeam();
  }, []);

  const fetchRoles = async () => {
    await api("/role")
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        }
        setUserRoles(
          response.data.map((role, index) => {
            return { value: role.id, label: role.name };
          })
        );
      })
      .catch((err) => {
        setError(err.response);
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

  const fetchUserAccounts = () => {
    api("/user")
      .then((response) => {
        setUsersData(
          response.data.map((user, index) => {
            return {
              id: user.id,
              name: user.name,
              username: user.username,
              role_id: user.role_id,
              team_id: user.team_id,
              role: user.role.name,
              team: user.team ? user.team.name : "",
              position: user.position,
              is_active: user.is_active,
            };
          })
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response);
      });
  };

  const fetchUserEditData = (id) => {
    api("user/" + id).then((response) => {
      setUserEditData({
        id: response.data.id,
        name: response.data.name,
        username: response.data.username,
        role_id: response.data.role_id,
        team_id: response.data.team_id,
        role: response.data.role.name,
        team: response.data.team ? response.data.team.name : "",
        position: response.data.position,
        is_active: response.data.is_active,
      });
    });
  };

  const closeCreateModal = () => {
    setUserModal(false);
    fetchUserAccounts();
    setError(null);
    console.log("modal closed");
  };

  const openCreateModal = (e) => {
    e.preventDefault();
    setUserModal(true);
  };

  const openAddTeams = (e) => {
    e.preventDefault();
    setTeamModal(true);
  };

  const closeAddTeams = () => {
    setTeamModal(false);
    fetchTeam();
    console.log("modal closed");
  };

  const closeEditModal = () => {
    setEditModal(false);
    setUserEditData(null);
    setShowTeam(false);
    fetchUserAccounts();
    setError(null);
    console.log("modal  Edit closed");
  };

  const openEditModal = (id) => {
    setEditModal(true);
    fetchUserEditData(id);
  };

  const deleteAccount = (id) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        api
          .delete("user/" + id)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            fetchUserAccounts();
          })
          .catch((error) => {
            console.error("Error deleting item", error.response.data);
          });
      }
    });
  };

  const usersTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: ["role", "team"],
      key: "name",
      align: "center",
      render: (text, record) => {
        return (
          <span>
            {record.role} {record.team && "(Team " + record.team + ")"}{" "}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      align: "center",
      render: (text, record, index) => {
        if (record.is_active == 1) return <Tag color={"#609966"}>Active</Tag>;
        return <Tag color={"#E97777"}>Inactive</Tag>;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "edit",
      width: "20%",
      align: "center",
      render: (text, record, index) => {
        return (
          <div>
            <Button onClick={() => openEditModal(record.id)}>
              <EditOutlined style={{ color: "blue" }} />{" "}
              <span style={{ color: "blue" }}>Edit</span>{" "}
            </Button>{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button onClick={() => deleteAccount(record.id)}>
              <DeleteOutlined style={{ color: "#E97777" }} />{" "}
              <span style={{ color: "#E97777" }}>Delete</span>{" "}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Layout className="layout-container">
      <Sidenav />
      <Layout className="site-layout">
        <Navbar />
        <Content style={{ margin: 20 }}>
          <div className="main-component-container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>USER ACCOUNTS</h3>
              <div>
                <Button onClick={openAddTeams}>Edit Team List +</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button onClick={openCreateModal}>Create Account +</Button>
              </div>
              <AddTeam
                open={teamModal}
                onCancel={closeAddTeams}
                userRoles={userRoles}
                teamData={teamData}
              />
              <CreateUser
                open={userModal}
                onCancel={closeCreateModal}
                userRoles={userRoles}
                teamData={teamData}
                error={error}
                setError={setError}
              />
              <EditUser
                open={editModal}
                onCancel={closeEditModal}
                userEditData={userEditData}
                userRoles={userRoles}
                teamData={teamData}
                showTeam={showTeam}
                setShowTeam={setShowTeam}
                error={error}
                setError={setError}
                fetchUserEditData={fetchUserEditData}
                setUserEditData={setUserEditData}
              />
            </div>
            <br />
            <div className="responsive-table">
              <TableComponents
                loading={isLoading}
                className="project-table"
                columns={usersTableColumns}
                dataSource={usersData}
              />
            </div>
          </div>
        </Content>
        <Footernav />
      </Layout>
    </Layout>
  );
}

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

const CreateUser = ({
  open,
  onCancel,
  userRoles,
  teamData,
  error,
  setError,
}) => {
  const [showTeam, setShowTeam] = useState(false);
  const [formLoad, setFormLoad] = useState(false);
  const Toast = createSwal();

  const handleChange = (value, option) => {
    if (option.label == "Engineer") {
      setShowTeam(true);
    } else {
      setShowTeam(false);
    }
  };

  const onFinish = async (values) => {
    setFormLoad(true);
    await csrfCookie().catch((err) => {
      setError("Something went wrong when posting the data");
    });
    await api
      .post("/user", values)
      .then(async (response) => {
        if (response.data.error) {
          setError(response.data.error);
        }
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
      })
      .catch((err) => {
        setError(err.response.data.errors);
      });
    setFormLoad(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setError(errorInfo);
  };

  const handleClose = () => {
    setError(null);
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Create User Account"
      footer={null}
    >
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
      {formLoad ? (
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
          <Form.Item name={"name"} label={"Fullname"} {...tailFormItemLayout}>
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
          >
            <Input placeholder={"Enter Position..."} />
          </Form.Item>
          <br />
          <Form.Item name={"role_id"} label={"Role"} {...tailFormItemLayout}>
            <Select
              onChange={handleChange}
              options={userRoles}
              defaultValue={"Select Role"}
            />
          </Form.Item>
          {showTeam && (
            <>
              <br />
              <Form.Item
                name={"team_id"}
                label={"Team"}
                {...tailFormItemLayout}
              >
                <Select options={teamData} defaultValue={"Select Team"} />
              </Form.Item>
            </>
          )}
          <br />
          <Form.Item
            name={"password"}
            label={"Password"}
            {...tailFormItemLayout}
          >
            <Input.Password placeholder="input password..." />
          </Form.Item>
          <br />
          <Form.Item
            name={"password_confirmation"}
            label={"Repeat Pass"}
            {...tailFormItemLayout}
          >
            <Input.Password placeholder="Repeat password..." />
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
                <SaveOutlined /> Create Account
              </span>
            </Button>
          </Form.Item>
        </Form>
      )}
      <Divider />
    </Modal>
  );
};

const EditUser = ({
  open,
  onCancel,
  userEditData,
  userRoles,
  fetchUserEditData,
  setUserEditData,
  teamData,
  showTeam,
  setShowTeam,
  error,
  setError,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const Toast = createSwal();

  const handleChange = (value, option) => {
    setUserEditData({ ...userEditData, role: null });
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
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.errors);
      });
    setUserEditData(null);
    fetchUserEditData(values.id);
    setIsLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  const handleClose = () => {
    setError(null);
  };
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title="Edit Account"
      footer={null}
      destroyOnClose={true}
    >
      {userEditData == null || isLoading ? (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Spin size="medium">
            <div className="content" />
          </Spin>
        </Space>
      ) : (
        <>
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
          <Form
            {...formItemLayout}
            size="middle"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name={"id"} initialValue={userEditData.id}>
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              name={"name"}
              label={"Fullname"}
              {...tailFormItemLayout}
              initialValue={userEditData.name}
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
              initialValue={userEditData.username}
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
              initialValue={userEditData.position}
            >
              <Input placeholder={"Enter Position..."} />
            </Form.Item>
            <br />
            <Form.Item
              name={"role_id"}
              label={"Role"}
              {...tailFormItemLayout}
              initialValue={userEditData.role_id}
            >
              <Select onChange={handleChange} options={userRoles} />
            </Form.Item>
            {showTeam || userEditData.role == "Engineer" ? (
              <>
                <br />
                {console.log(userEditData.team_id)}
                <Form.Item
                  name={"team_id"}
                  label={"Team"}
                  {...tailFormItemLayout}
                  initialValue={
                    userEditData.team_id
                      ? userEditData.team_id
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
              label={"Password"}
              {...tailFormItemLayout}
              initialValue={null}
            >
              <Input.Password placeholder="input password..." />
            </Form.Item>
            <br />
            <Form.Item
              name={"password_confirmation"}
              label={"Repeat Pass"}
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
              initialValue={userEditData.is_active}
            >
              <Checkbox>
                {userEditData.is_active ? "Active" : "Deactivated"}
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
        </>
      )}
    </Modal>
  );
};

const AddTeam = ({ open, onCancel }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);
  const [error, setError] = useState(null);
  const Toast = createSwal();

  useEffect(() => {
    fetchTeam();
  }, []);

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
    setIsLoading(false);
  };

  const createNewTeam = async () => {
    setIsLoading(true);
    await csrfCookie().catch((err) => {
      setError("Something went wrong when posting the data");
      console.log(err);
    });
    await api
      .post("/team")
      .then((response) => {
        Toast.fire({
          icon: "success",
          title: response.data.status,
          text: response.data.message,
        });
        fetchTeam();
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const deleteTeam = (id) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        api
          .delete("team/" + id)
          .then((response) => {
            Toast.fire({
              icon: "success",
              title: response.data.status,
              text: response.data.message,
            });
            fetchTeam();
          })
          .catch((error) => {
            console.error("Error deleting item", error.response.data);
          });
      }
    });
  };

  const columns = [
    { title: "Name", dataIndex: "label", key: "label", align: "center" },
    {
      title: "Delete",
      dataIndex: "label",
      key: "label",
      align: "center",
      render: (text, record, index) => {
        return (
          <div>
            <Button onClick={() => deleteTeam(record.value)}>
              <DeleteOutlined style={{ color: "#E97777" }} />{" "}
              <span style={{ color: "#E97777" }}>Delete</span>{" "}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Modal open={open} onCancel={onCancel} title="Edit team List" footer={null}>
      <h3>Team List</h3>
      <div className="responsive-table">
        <TableComponents
          loading={isLoading}
          className="project-table"
          columns={columns}
          dataSource={teamData}
          pagination={false}
        />
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button onClick={createNewTeam}>Create New Team </Button>
      </div>
    </Modal>
  );
};
export default Users;
