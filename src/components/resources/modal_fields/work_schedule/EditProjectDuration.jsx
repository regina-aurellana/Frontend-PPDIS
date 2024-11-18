import React from 'react'
import { Col, Input, Row, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";

const EditProjectDuration = ({
  modalTitle,
  setProjectDurationFormData,
  projectDurationFormData,
}) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <EditOutlined /> {modalTitle}
        </p>
        <Col span={24}>
          <p className="field-label">Edit Number of days:</p>
          <Input
            placeholder="Enter Duration"
            value={projectDurationFormData.no_of_days}
            onChange={(event) =>
              setProjectDurationFormData({
                ...projectDurationFormData,
                id: projectDurationFormData.id,
                work_sched_id: projectDurationFormData.work_sched_id,
                no_of_days: event.target.value,
              })
            }
          />
        </Col>
      </Row>
    </div>
  )
}

export default EditProjectDuration