import React from "react";
import { Row, Col, Input } from "antd";

const EditMaterialFieldsModal = ({ materialFormData, setMaterialFormData }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <p className="field-label" style={{ fontWeight: "bold" }}>
            {materialFormData.name}
          </p>
        </Col>
        <Col span={24}>
          <p className="field-label">Quantity</p>
          <Input
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

export default EditMaterialFieldsModal;
