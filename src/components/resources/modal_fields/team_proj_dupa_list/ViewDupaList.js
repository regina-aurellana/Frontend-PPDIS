import { Col, Row } from "antd";
import React from "react";
import { FolderViewOutlined } from "@ant-design/icons";
import DupaPerProjectDetails from "./DupaPerProjectDetails";

function ViewDupaList({ modalTitle, perProjectId, perDupaId }) {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">{modalTitle}</p>
      </Row>

      <Col span={24}>
        <DupaPerProjectDetails
          perProjectId={perProjectId}
          perDupaId={perDupaId}
        />
      </Col>
    </div>
  );
}

export default ViewDupaList;
