import React, { useState } from "react";
import { Layout, Menu, Image, Row, Col, Divider } from "antd";
import Logo from "../../img/OIP.jpg";
import {
  FaFolderOpen,
  FaHardHat,
  FaThList,
  FaSuperscript,
  FaTruckLoading,
  FaSquareRootAlt,
  FaRegNewspaper,
  FaCalculator,
  FaBuromobelexperte,
  FaColumns,
} from "react-icons/fa";
import { SettingFilled,UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const items = [
  getItem(<a href="/"> B3 Projects</a>, "0", <FaThList />),
  getItem("Configuration", "sub1", <SettingFilled />, [
    getItem("Project Category", "sub-item-1", <FaFolderOpen />, [
      getItem(<Link to="/project/nature">Nature</Link>, "item1"),
      getItem(<Link to="/project/nature-type">Nature Type</Link>, "item2"),
    ]),
    getItem("Scope of Work", "sub-item-2", <FaHardHat />, [
      getItem(<Link to="/take-off/sow"> SOW</Link>, "item5"),
      getItem(<Link to="/take-off/sow-sub"> SOW Sub Category</Link>, "item6"),
    ]),

    getItem("Work Items", "sub-item-5", <FaTruckLoading />, [
      getItem(<Link to="/work-items/materials">Material</Link>, "item9"),
      getItem(<Link to="/work-items/labors">Labors</Link>, "item10"),
      getItem(<Link to="/work-items/equipments">Equipments</Link>, "item11"),
    ]),
    getItem("Take-Off Config", "sub-item-6", <FaCalculator />, [
      getItem(<Link to="/formula">Formula</Link>, "item12"),
      getItem(<Link to="/table-dupa-component">Dupa Component</Link>, "item13"),
      getItem(
        <Link to="/formula-assignment">Formula Assignment</Link>,
        "item14"
      ),
    ]),
    getItem(<Link to="/measurement">Measurement</Link>, "8", <FaSuperscript />),
    getItem("User Accounts", "sub-item-7", <UserOutlined />, [
      getItem(<Link to="/users">Users</Link>, "item15"),
    ]),
  ]),
  getItem(<Link to="/dupa">Dupa</Link>, "item7", <FaSquareRootAlt />),
  getItem(
    <Link to="/team-project">Team Project</Link>,
    "10",
    <FaRegNewspaper />
  ),
];

const Sidenav = () => {
  return (
    <Sider
      style={{ background: "#fff" }}
      breakpoint="lg"
      collapsedWidth="0"
      width="240"
    >
      <div style={{ paddingBottom: "20px", paddingTop: "20px" }}>
        <Row justify="space-around" align="middle">
          <Image width="50%" src={Logo} preview={false} />
        </Row>
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        className="sidenav-menu"
      />
    </Sider>
  );
};

export default Sidenav;
