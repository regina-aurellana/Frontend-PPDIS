import { Col, Input, Row } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";

const CreateContingency = ({
  modalTitle,
  contingencyFormData,
  setContingencyFormData,
}) => {
  return (
    <Row>
      <Col span={24}>
        <p className="title-takeoff-modal">
          <PlusOutlined /> {modalTitle}
        </p>
      </Col>

      <Col span={24}>
        <p className="field-label">Contingency</p>
        <Input
          placeholder="Enter Contingency"
          value={contingencyFormData.contingency || undefined}
          onChange={(event) =>
            setContingencyFormData({
              ...contingencyFormData,
              contingency: event.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </Col>
    </Row>
  );
};

export default CreateContingency;
