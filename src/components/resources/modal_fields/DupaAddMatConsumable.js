import { Col, Input, Row } from "antd";
import React from "react";

const DupaAddMatConsumable = ({
  consumablesFormData,
  setConsumablesFormData,
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <p className="field-label">Consumable</p>
        <Input
          placeholder="Enter % Of Consumables"
          value={consumablesFormData.consumable}
          onChange={(event) =>
            setConsumablesFormData({
              ...consumablesFormData,
              consumable: event.target.value,
              consumable_percentage: event.target.value,
            })
          }
        />
      </Col>
    </Row>
  );
};

export default DupaAddMatConsumable;
