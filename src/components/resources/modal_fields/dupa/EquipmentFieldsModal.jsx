import React from "react";
import { Row, Col, Select, Input } from "antd";
const { Option } = Select;

const EquipmentFieldsModal = ({
  equipmentFormData,
  setEquipmentFormData,
  equipment,
}) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <p className="field-label">Equipment</p>
          <Select
            value={equipmentFormData.equipment_id || undefined}
            onChange={(value) =>
              setEquipmentFormData({
                ...equipmentFormData,
                equipment_id: value,
              })
            }
            style={{ width: "100%" }}
            placeholder="Select a Equipment"
          >
            {equipment.map((items) => (
              <Option className="OptionItems" value={items.id}>
                {items.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <p className="field-label">No. of Unit</p>
          <Input
            placeholder="Enter No. of Unit"
            value={equipmentFormData.no_of_unit}
            onChange={(event) =>
              setEquipmentFormData({
                ...equipmentFormData,
                no_of_unit: event.target.value,
              })
            }
          />
        </Col>
        <Col span={24}>
          <p className="field-label">No. of Hour</p>
          <Input
            placeholder="Enter No. of Hour"
            value={equipmentFormData.no_of_hour}
            onChange={(event) =>
              setEquipmentFormData({
                ...equipmentFormData,
                no_of_hour: event.target.value,
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default EquipmentFieldsModal;
