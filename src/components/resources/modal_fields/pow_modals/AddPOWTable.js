import { Col, Row, Select } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

const AddPOWTable = ({
  modalTitle,
  sowCatData,
  powTableFormData,
  setPowTableFormData,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedOption(event);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <PlusOutlined /> {modalTitle}
        </p>

        <Col span={24}>
          <p className="field-label">SOW Category</p>
          <Select
            placeholder="Select SOW Category"
            value={powTableFormData.sow_category_id || undefined}
            allowClear
            onChange={(value) =>
              setPowTableFormData({
                ...powTableFormData,
                sow_category_id: value,
              })
            }
            style={{ width: "100%" }}
          >
            {sowCatData.map((items) => (
              <Option className="OptionItems" value={items.id}>
                {items.name}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default AddPOWTable;
