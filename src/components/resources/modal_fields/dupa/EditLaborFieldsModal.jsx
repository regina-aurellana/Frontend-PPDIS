import React, { useState } from "react";
import { Row, Col, Input, Select } from "antd";
const { Option } = Select;

const EditLaborFieldsModal = ({
  laborFormData,
  setLaborFormData,
  storedItemsList,
}) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupChange = (value) => {
    setSelectedGroup(value);
    setLaborFormData({ ...laborFormData, group: value });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <p className="field-label" style={{ fontWeight: "bold" }}>
            {laborFormData.designation}
          </p>
        </Col>
        <Col span={24}>
          <p className="field-label">Group</p>
          <Select
            value={laborFormData.group}
            onChange={handleGroupChange}
            style={{ width: "100%" }}
            placeholder="Select a Group"
          >
            {storedItemsList.map((group, index) => (
              <Option key={index} value={group}>
                {group}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <p className="field-label">No. of Person</p>
          <Input
            value={laborFormData.no_of_person}
            onChange={(event) =>
              setLaborFormData({
                ...laborFormData,
                no_of_person: event.target.value,
              })
            }
          />
        </Col>
        <Col span={24}>
          <p className="field-label">No. of Hour</p>
          <Input
            value={laborFormData.no_of_hour}
            onChange={(event) =>
              setLaborFormData({
                ...laborFormData,
                no_of_hour: event.target.value,
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default EditLaborFieldsModal;
