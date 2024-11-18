import React, { useState } from "react";
import { Row, Col, Select, Input } from "antd";
const { Option } = Select;

const LaborFieldsModal = ({
  laborFormData,
  setLaborFormData,
  labor,
  storedItemsList,
  groupList,
}) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupChange = (value) => {
    setSelectedGroup(value);
    setLaborFormData({ ...laborFormData, group: value });
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <p className="field-label">Designation</p>
          <Select
            value={laborFormData.labor_id || undefined}
            onChange={(value) =>
              setLaborFormData({ ...laborFormData, labor_id: value })
            }
            style={{ width: "100%" }}
            placeholder="Select a Designation"
          >
            {labor.map((items) => (
              <Option className="OptionItems" value={items.id}>
                {items.designation}
              </Option>
            ))}
          </Select>
        </Col>

        <Col span={24}>
          <p className="field-label">Group</p>
          <Select
            value={selectedGroup || undefined}
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
            placeholder="Enter No. of Person"
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
            placeholder="Enter No. of Hour"
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

export default LaborFieldsModal;
