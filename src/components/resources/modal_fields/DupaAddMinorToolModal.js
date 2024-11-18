import { Col, Input, Row } from "antd";
import React from "react";

const DupaAddMinorToolModal = ({ minorToolFormData, setMinorToolFormData }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <p className="field-label">Minor Tool</p>
        <Input
          placeholder="Enter % of Minor Tool"
          value={minorToolFormData.minor}
          onChange={(event) =>
            setMinorToolFormData({
              ...minorToolFormData,
              minor: event.target.value,
              minor_tool_percentage:event.target.value
            })
          }
        />
      </Col>
    </Row>
  );
};

export default DupaAddMinorToolModal;
