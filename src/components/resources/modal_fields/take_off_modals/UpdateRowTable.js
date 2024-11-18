import { Col, Input, Row } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";

const UpdateRowTable = ({
  modalTitle,
  takeOff,
  tableFieldName,
  setRowTableEditFormData,
  rowTableEditFormData,
}) => {
  return (
    <Row>
      <Col span={24}>
        <p className="title-takeoff-modal" style={{ marginTop: "10px" }}>
          <EditOutlined /> {modalTitle}
        </p>
      </Col>

      <Col span={24}>
        <p className="field-label">Location</p>
        <Input
          placeholder="Enter Location"
          value={rowTableEditFormData.mark_description || undefined}
          onChange={(event) =>
            setRowTableEditFormData({
              ...rowTableEditFormData,
              mark_description: event.target.value,
            })
          }
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </Col>

      {tableFieldName.map((mName, mIdx) => (
        <Col key={mIdx} span={24}>
          <p className="field-label">{mName}</p>
          <Input
            value={rowTableEditFormData.value[mIdx] || undefined}
            onChange={(event) => {
              const updatedValues = [...rowTableEditFormData.value];
              updatedValues[mIdx] = event.target.value;

              setRowTableEditFormData({
                ...rowTableEditFormData,
                value: updatedValues,
              });
            }}
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </Col>
      ))}
    </Row>
  );
};

export default UpdateRowTable;
