import { Col, Input, Row } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";

const EditQuantity = ({
  modalTitle,
//   powTableContent,
  quantityFormData,
  setQuantityFormData,
}) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <EditOutlined /> {modalTitle}
        </p>

        <Col span={24}>
          <p className="field-label">Quantity</p>
          <Input
            placeholder="Enter Quantity"
            value={quantityFormData.quantity || undefined}
            onChange={(event) =>
              setQuantityFormData({
                ...quantityFormData,
                quantity: event.target.value,
              })
            }
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default EditQuantity;
