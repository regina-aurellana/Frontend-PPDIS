import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { DeleteSwalConfig } from "../swal/DeleteSwalConfig";

const GroupLaborModal = ({ groupList, setGroupList, dupaContent, perProject }) => {
  const [item, setItem] = useState("");
  const [itemsList, setItemsList] = useState([]);

  // HANDLE THE ADDED ITEM TO THE ITEM LIST
  const handleAddItem = () => {
    if (item.trim() !== "") {
      const updatedItemsList = [...itemsList, item];
      setItemsList(updatedItemsList);
      setGroupList([...groupList, item]);
      setItem("");
      localStorage.setItem("itemsList", JSON.stringify(updatedItemsList));
    }
  };

  // HANDLE REMOVE ITEM TO THE LOCAL STORAGE
  const handleRemoveItem = (indexToRemove) => {
    Swal.fire(DeleteSwalConfig).then((result) => {
      if (result.isConfirmed) {
        const updatedList = itemsList.filter(
          (_, index) => index !== indexToRemove
        );
        setItemsList(updatedList);
        localStorage.setItem("itemsList", JSON.stringify(updatedList));
      }
    });
  };
// STORING ITEM LIST TO JSON PARSE
  useEffect(() => {
    const storedItemsList = localStorage.getItem("itemsList");
    if (storedItemsList) {
      setItemsList(JSON.parse(storedItemsList));
    }
  }, []);

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col span={21}>
          <p className="field-label">Item</p>
          <Input
            placeholder="Enter Item Name"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </Col>
        <Col span={3}>
          <Button
            type="link"
            primary
            className="add-component"
            style={{
              marginTop: "21px",
              marginLeft: "10px",
              backgroundColor: "#F1EFEF",
            }}
            onClick={handleAddItem}
          >
            <PlusOutlined />
          </Button>
        </Col>
      </Row>

      <div>
        <h2 style={{ margin: "auto" }}>Item List</h2>
        {itemsList.map((item, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <Input
              value={item}
              readOnly
              placeholder="Item Name"
              style={{ marginTop: "10px" }}
            />
            {perProject ? dupaContent?.dupa_content.dupa_labor_per_project.some(
              (val) => val.group === item
            ) ? (
              <Button
                disabled={true}
                type="link"
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleRemoveItem(index)}
                style={{ marginLeft: "10px", marginTop: "5px" }}
              />
            ) : (
              <Button
                disabled={false}
                type="link"
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleRemoveItem(index)}
                style={{ marginLeft: "10px", marginTop: "5px" }}
              />
            ):dupaContent?.dupa_content.dupa_labor.some(
              (val) => val.group === item
            ) ? (
              <Button
                disabled={true}
                type="link"
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleRemoveItem(index)}
                style={{ marginLeft: "10px", marginTop: "5px" }}
              />
            ) : (
              <Button
                disabled={false}
                type="link"
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleRemoveItem(index)}
                style={{ marginLeft: "10px", marginTop: "5px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupLaborModal;
