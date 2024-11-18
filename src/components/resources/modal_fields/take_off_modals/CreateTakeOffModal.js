import { Input, Row, Col } from "antd";
import React from "react";
import { RadiusSettingOutlined } from "@ant-design/icons";

const CreateTakeOffModal = ({
  setLimitNLenghtFormData,
  limitNLenghtFormData,
  modalTitle,
}) => {
  return (
    <Row>
      <Col span={24}>
        <p className="note-title-modal">
          * Requirements Needed Before Creating Horizontal Take-off
        </p>
        <p className="title-takeoff-modal" style={{ marginTop: "10px" }}>
          <RadiusSettingOutlined /> {modalTitle}
        </p>
      </Col>

      <Col span={24}>
        <p className="field-label">Project Limit</p>
        <Input
          placeholder="Enter Project Limit"
          onChange={(event) =>
            setLimitNLenghtFormData({
              ...limitNLenghtFormData,
              limit: event.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </Col>
      <Col span={24}>
        <p className="field-label">Project Length</p>
        <Input
          placeholder="Enter Project Length"
          onChange={(event) =>
            setLimitNLenghtFormData({
              ...limitNLenghtFormData,
              length: event.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </Col>
    </Row>
  );
};

export default CreateTakeOffModal;
