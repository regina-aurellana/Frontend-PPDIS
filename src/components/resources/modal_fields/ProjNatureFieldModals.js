import React from "react";
import { Row, Col, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

const FieldInputProjNature = ({ formData, setFormData, modalTitle }) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <EditOutlined /> {modalTitle}
        </p>
        <Col span={24}>
          <p className="field-label">Project Nature Name</p>
          <Input
            placeholder="Enter Project Nature Name"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default FieldInputProjNature;
