import { Col, Input, Row, Select } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

function AddProjectDuration({
  modalTitle,
  setProjectDurationFormData,
  projectDurationFormData,
}) {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <PlusOutlined /> {modalTitle}
        </p>

        <Col span={24}>
          <p className="field-label">Duration</p>
          <Input
            placeholder="Enter Duration"
            value={projectDurationFormData.no_of_days || undefined}
            onChange={(event) =>
              setProjectDurationFormData({
                ...projectDurationFormData,
                no_of_days: event.target.value,
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
}

export default AddProjectDuration;
