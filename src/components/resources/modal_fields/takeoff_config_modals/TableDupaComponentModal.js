import { Col, Input, Row, Select } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

const TableDupaComponentModal = ({
  modalTitle,
  dupa,
  setTblDupaCompFormData,
  tblDupaCompFormData,
  getDupa,
}) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <PlusOutlined /> {modalTitle}
        </p>
        <Col span={24}>
          <p className="field-label">Dupa</p>
          <Select
            placeholder="Select Dupa"
            value={tblDupaCompFormData.dupa_id || undefined}
            onChange={(value) => getDupa(value)}
            style={{ width: "100%" }}
          >
            {dupa.map((items) => (
              <Option className="OptionItems" value={items.id}>
                {items.description}
              </Option>
            ))}
          </Select>
        </Col>

        <Col span={24}>
          <p className="field-label">Dupa Component Name</p>
          <Input
            placeholder="Enter Dupa Component Name"
            value={tblDupaCompFormData.name}
            onChange={(event) =>
              setTblDupaCompFormData({
                ...tblDupaCompFormData,
                name: event.target.value,
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default TableDupaComponentModal;
