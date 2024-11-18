import React from "react";
import { Row, Col, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

const SowFieldsModal = ({ sowFormData, setSowFormData, modalTitle }) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <p className="ModalTitle">
            <EditOutlined /> {modalTitle}
          </p>
          <p className="field-label" style={{ marginTop: "20px" }}>
            Item Code
          </p>
          <Input
            placeholder="Enter Item Code"
            value={sowFormData.item_code}
            onChange={(event) =>
              setSowFormData({ ...sowFormData, item_code: event.target.value })
            }
          />
        </Col>
        <Col span={24}>
          <p className="field-label">Name</p>
          <Input
            placeholder="Enter Name"
            value={sowFormData.name}
            onChange={(event) =>
              setSowFormData({ ...sowFormData, name: event.target.value })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default SowFieldsModal;
