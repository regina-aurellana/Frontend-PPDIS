import { Col, Input, Row } from "antd";
import React from "react";

const DupaAddAreaModal = ({ areaFormData, setAreaFormData }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <p className="field-label">Area</p>
        <Input
          placeholder="Enter Area of Equipement"
          value={areaFormData.area}
          onChange={(event) =>
            setAreaFormData({
              ...areaFormData,
              area: event.target.value,
            })
          }
        />
      </Col>
    </Row>
  );
};

export default DupaAddAreaModal;
