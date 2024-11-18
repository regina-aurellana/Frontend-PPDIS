import React from "react";
import { Row, Col, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

const LaborFieldModal = ({ laborFormData, setLaborFormData, modalTitle }) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <EditOutlined /> {modalTitle}
        </p>
        <Col span={24}>
          <p className="field-label">Item Code</p>
          <Input
            placeholder="Enter Item Code"
            value={laborFormData.item_code}
            onChange={(event) =>
              setLaborFormData({
                ...laborFormData,
                item_code: event.target.value,
              })
            }
          />
        </Col>
        <Col span={24}>
          <p className="field-label">Designation</p>
          <Input
            placeholder="Enter Designation"
            value={laborFormData.designation}
            onChange={(event) =>
              setLaborFormData({
                ...laborFormData,
                designation: event.target.value,
              })
            }
          />
        </Col>

        <Col span={24}>
          <p className="field-label">Hourly Rate</p>
          <Input
            placeholder="Enter Hourly Rate"
            value={laborFormData.hourly_rate}
            onChange={(event) =>
              setLaborFormData({
                ...laborFormData,
                hourly_rate: event.target.value,
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default LaborFieldModal;
