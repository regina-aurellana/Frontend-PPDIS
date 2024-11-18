import React from "react";
import { Row, Col, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";

const MeasurementUnitFieldsModal = ({
  measurementFormData,
  setMeasurementFormData,
  modalTitle,
}) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <EditOutlined /> {modalTitle}
        </p>
        <Col span={24}>
          <p className="field-label">Measurement Name</p>
          <Input
            placeholder="Enter Measurement Name"
            value={measurementFormData.name}
            onChange={(event) =>
              setMeasurementFormData({
                ...measurementFormData,
                name: event.target.value,
              })
            }
          />
        </Col>

        <Col span={24}>
          <p className="field-label">Abbreviation</p>
          <Input
            placeholder="Enter Abbreviation"
            value={measurementFormData.abbreviation}
            onChange={(event) =>
              setMeasurementFormData({
                ...measurementFormData,
                abbreviation: event.target.value,
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};
export default MeasurementUnitFieldsModal;
