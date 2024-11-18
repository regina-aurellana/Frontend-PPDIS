import React from "react";
import { Row, Col, Select, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Option } = Select;

const FieldInputProjNature = ({
  formData,
  setFormData,
  getProjNature,
  projNature,
  modalTitle,
}) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <p className="ModalTitle">
            <EditOutlined /> {modalTitle}
          </p>
          <p style={{ marginTop: "20px" }} className="field-label">
            Project Nature Type Name
          </p>
          <Input
            placeholder="Enter Project Nature Type Name"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
          />
        </Col>
        <Col span={24}>
          <p className="field-label">Project Nature</p>
          <Select
            placeholder="Select project nature"
            value={formData.project_nature_id || undefined}
            onChange={(value) => getProjNature(value)}
            style={{ width: "100%" }}
          >
            {projNature.map((items) => (
              <Option className="OptionItems" value={items.id}>
                {items.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default FieldInputProjNature;
