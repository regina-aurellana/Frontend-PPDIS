import React from "react";
import { Row, Col, Select, Input } from "antd";
const { Option } = Select;

const LaborFieldsModal = ({
  materialFormData,
  setMaterialFormData,
  material,
}) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <p className="field-label">Material</p>
          <Select
            value={materialFormData.material_id || undefined}
            onChange={(value) =>
              setMaterialFormData({ ...materialFormData, material_id: value })
            }
            style={{ width: "100%" }}
            placeholder="Select a Material"
          >
            {material.map((items) => (
              <Option className="OptionItems" value={items.id}>
                {items.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <p className="field-label">Quantity</p>
          <Input
            placeholder="Enter Quantity"
            value={materialFormData.quantity}
            onChange={(event) =>
              setMaterialFormData({
                ...materialFormData,
                quantity: event.target.value,
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default LaborFieldsModal;
