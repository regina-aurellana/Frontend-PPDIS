import { Col, Row, Select, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

const AddDupaList = ({
  modalTitle,
  sowCatData,
  dupa,
  getSOWCat,
  dupaFormData,
  getDupas,
  setDupaFormData,
}) => {
  const [selectedDupas, setSelectedDupas] = useState(dupaFormData.dupas || []);

  const handleDupaChange = (selectedIds) => {
    setSelectedDupas(selectedIds);
    setDupaFormData({ ...dupaFormData, dupas: selectedIds });
  };

  useEffect(() => {
    // Update selectedDupas when dupaFormData.dupas changes
    setSelectedDupas(dupaFormData.dupas || []);
  }, [dupaFormData.dupas]);

  return (
    <Row>
      {sowCatData && sowCatData.length > 0 ?
        <>
          <Col span={24}>
            <p className="title-takeoff-modal" style={{ marginTop: "10px" }}>
              <PlusOutlined /> {modalTitle}
            </p>
          </Col>

          <Col span={24}>
            <p className="field-label">SOW Category</p>
            <Select
              placeholder="Select SOW Category"
              value={dupaFormData.sow_category_id || undefined}
              onChange={(value) => getSOWCat(value)}
              style={{ width: "100%", marginBottom: "10px" }}
            >
              {sowCatData?.map((items) => (
                <Option className="OptionItems" value={items.id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={24}>
            <p className="field-label">DUPA Name</p>
            <Select
              placeholder="Select DUPA Name"
              mode="multiple"
              value={selectedDupas || undefined}
              onChange={handleDupaChange}
              style={{ width: "100%" }}
            >
              {dupa.map((items) => (
                <Option className="OptionItems" value={items.id}>
                  {items.description}
                </Option>
              ))}
            </Select>
          </Col>
        </>
        :
        (
          <Space direction="vertical" style={{ width: "100%", marginTop: 20 }}>
            <Spin size="medium">
              <div className="content" />
            </Spin>
            <div style={{ textAlign: 'center', marginTop: 10 }}>Please wait...</div>
          </Space>
        )
      }
    </Row>
  );
};

export default AddDupaList;
