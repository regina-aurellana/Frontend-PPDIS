import React, { useRef } from "react";
import { Col, Row, Select } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import FilepondUploadComponents from "../FilepondUploadComponents";
import { Option } from "antd/es/mentions";

const UploadFilesModal = ({
  modalTitle,
  setFilesUpload,
  dupaCategory,
  subCategory,
  dupaFormData,
  setDupaFormData,
  showCategorySelect,
  onUploadCancel,
}) => {

  const handleCategoryChange = (value, test) => {
    setDupaFormData({ ...dupaFormData, category_dupa_id: value, subcategory_id: test });
    // Call onSubmit with the selected category
  };

  const handleSubCategoryChange = (value) => {
    setDupaFormData({ ...dupaFormData, subcategory_id: value });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Row gutter={[16, 16]} style={{ rowGap: "0px" }}>
        <p className="ModalTitle" style={{ marginLeft: "10px" }}>
          <CloudUploadOutlined /> {modalTitle}
        </p>
        <FilepondUploadComponents setFilesUpload={setFilesUpload} />

        {showCategorySelect && (
          <Col span={24}>
            <p className="field-label">DUPA Category</p>
            <Select
              value={dupaFormData.category_dupa_id || undefined}
              onChange={handleCategoryChange}
              style={{ width: "100%", marginBottom: "10px" }}
              placeholder="Select a Dupa Category"
            >
              {dupaCategory.map((items) => (
                <Option className="OptionItems" value={items.id} key={items.id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}
  
        {showCategorySelect && (
          <Col span={24}>
            <p className="field-label">DUPA Sub Category</p>
            <Select
              value={dupaFormData.subcategory_id || undefined}
              onChange={handleSubCategoryChange}
              style={{ width: "100%", marginBottom: "10px" }}
              placeholder="Select a Parent SubCategory"
            >
              {subCategory.map((items) => (
                <Option className="OptionItems" value={items.id} key={items.id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}


      </Row>
    </div>
  );
};

export default UploadFilesModal;
