import React from "react";
import { Row, Col, Select, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Option } = Select;

const SowSubFieldsModal = ({ sowSubFormData, setSowSubFormData, sow, modalTitle, sowSub }) => {

  const handleCategoryChange = (value) => {
    setSowSubFormData({
      ...sowSubFormData,
      sow_category_id: value,
      parent_sub_cat_id: null // Clearing the Parent Sub Category dropdown
    });
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <p className="ModalTitle">
            <EditOutlined /> {modalTitle}
          </p>

          <p className="field-label" style={{ marginTop: "20px" }}>
            Item Code
          </p>
          <Input
            placeholder="Enter Item Code"
            value={sowSubFormData.item_code}
            onChange={(event) =>
              setSowSubFormData({
                ...sowSubFormData,
                item_code: event.target.value,
              })
            }
          />
        </Col>
        <Col span={24}>
          <p className="field-label">Category</p>
          <Select
            style={{ width: "100%" }}
            placeholder="Select Category"
            value={sowSubFormData.sow_category_id || undefined}
            allowClear
            onChange={handleCategoryChange}

          >
            {sow.map((items) => (
              <Option className="OptionItems" value={items.id}>
                {items.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <p className='field-label'>Parent Sub Category</p>
          <Select
            placeholder="Select a Parent Sub Category"
            value={sowSubFormData.parent_sub_cat_id || undefined}
            allowClear
            onChange={(value) =>
              setSowSubFormData({ ...sowSubFormData, parent_sub_cat_id: value })
            }
            style={{ width: '100%' }}
          //disabled={!sowSubFormData.sow_category_id}
          >
            {sowSub
              .filter((item) => item.sow_category_id === sowSubFormData.sow_category_id)
              .map((items) => (
                <Option className="OptionItems" value={items.id}>{items.name}</Option>
              ))}
          </Select>
        </Col>

        <Col span={24}>
          <p className='field-label'>Sub Category Name</p>
          <Input
            placeholder="Enter Sub Category Name"
            value={sowSubFormData.name}
            onChange={(event) =>
              setSowSubFormData({ ...sowSubFormData, name: event.target.value })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default SowSubFieldsModal;
