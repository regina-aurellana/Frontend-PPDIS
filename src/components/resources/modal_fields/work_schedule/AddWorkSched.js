import React, { useState } from "react";
import { Col, Input, Row, Select, Button, Divider, Form } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const AddWorkSched = ({
  modalTitle,
  dupaItem,
  setWorkScheduleDupaFormData,
  onSubmit,
}) => {
  const [durationDay, setDurationDays] = useState("");
  const [splitWeek, setSplitWeek] = useState(1);
  const [fieldGroups, setFieldGroups] = useState([]);

  const handleInputChangeDurationDay = (e) => {
    // Ensure the input only contains numeric values
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setDurationDays(newValue);
  };

  const handleSplitWeekChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSplitWeek(value);
    generateFieldGroups(value);
    setWorkScheduleDupaFormData([]);
  };

  const generateFieldGroups = (count) => {
    const newFieldGroups = [];
    for (let i = 0; i < count; i++) {
      newFieldGroups.push({
        week_no: "",
        day_no: "",
        duration_no: "",
      });
    }
    setFieldGroups(newFieldGroups);
  };

  const handleFieldChange = (index, field, value) => {
    const newFieldGroups = [...fieldGroups];
    newFieldGroups[index][field] = value;
    setFieldGroups(newFieldGroups);
    setWorkScheduleDupaFormData(newFieldGroups);
    console.log("Updated Field Groups:", newFieldGroups);
  };

  const handleDeleteGroup = (index) => {
    const newFieldGroups = [...fieldGroups];
    newFieldGroups.splice(index, 1);
    setFieldGroups(newFieldGroups);
    setWorkScheduleDupaFormData(newFieldGroups);
    console.log("Updated Field Groups:", newFieldGroups);
  };

  const handleAddGroup = () => {
    const newFieldGroups = [
      ...fieldGroups,
      { week_no: "", day_no: "", duration_no: "" },
    ];
    setFieldGroups(newFieldGroups);
    setWorkScheduleDupaFormData(newFieldGroups);
    console.log("Updated Field Groups:", newFieldGroups);
  };

  return (
    <Form onFinish={onSubmit}>
      <p className="ModalTitle">{modalTitle}</p>
      <p style={{ marginBottom: 20, fontSize: 18 }}>
        {dupaItem.item_code} - {dupaItem.description}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 10,
          justifyContent: "space-between",
          columnGap: 10,
        }}
      >
        <div>
          <p>
            <strong> Duration (no. of days) </strong>
          </p>
          <p>{dupaItem.duration}</p>
        </div>
        <div>
          <p>
            <strong> Split Schedule </strong>
          </p>
          <Input
            type="number"
            id="splitSchedInput"
            value={splitWeek}
            onChange={handleSplitWeekChange}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Button onClick={() => handleAddGroup()} icon={<PlusOutlined />}>
          Week
        </Button>
      </div>
      <hr style={{ marginBottom: 10 }} />
      {fieldGroups.map((group, index) => (
        <div key={index}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 10,
              justifyContent: "space-between",
              columnGap: 10,
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Col span={10}>
                <p>
                  <strong> Week </strong>
                </p>
              </Col>
              <Col span={12}>
                <Input
                  type="number"
                  value={group.week_no}
                  onChange={(e) =>
                    handleFieldChange(index, "week_no", e.target.value)
                  }
                  required
                />
              </Col>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Col span={10}>
                <p>
                  <strong> Days </strong>
                </p>
              </Col>
              <Col span={12}>
                <Input
                  type="number"
                  value={group.day_no}
                  onChange={(e) =>
                    handleFieldChange(index, "day_no", e.target.value)
                  }
                  required
                />
              </Col>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Col span={12}>
                <p>
                  <strong> Duration </strong>
                </p>
              </Col>
              <Col span={12}>
                <Input
                  type="number"
                  value={group.duration_no}
                  onChange={(e) =>
                    handleFieldChange(index, "duration_no", e.target.value)
                  }
                  required
                />
              </Col>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Col span={4}>
                <Button
                  onClick={() => handleDeleteGroup(index)}
                  icon={<DeleteOutlined />}
                ></Button>
              </Col>
            </div>
          </div>
        </div>
      ))}
      <hr style={{ marginBottom: 10 }} />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default AddWorkSched;
