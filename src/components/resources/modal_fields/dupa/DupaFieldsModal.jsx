import React from "react";
import { Row, Col, Select, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Option } = Select;

const DupaFieldsModal = ({
  dupaFormData,
  setDupaFormData,
  subCategory,
  measurement,
  dupaCategory,
  modalTitle,
}) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <EditOutlined /> {modalTitle}
        </p>
        <Col span={24}>
          <p className="field-label">Unit of Measurement</p>
          <Select
            value={dupaFormData.unit_id || undefined}
            onChange={(value) =>
              setDupaFormData({ ...dupaFormData, unit_id: value })
            }
            style={{ width: "100%" }}
            placeholder="Select a Unit of Measurement"
          >
            {measurement.map((items) => (
              <Option className="OptionItems" value={items.id}>
                {items.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <p className="field-label">Sub Category</p>
          <Select
            value={dupaFormData.subcategory_id || undefined}
            onChange={(value) =>
              setDupaFormData({ ...dupaFormData, subcategory_id: value })
            }
            style={{ width: "100%" }}
            placeholder="Select a Sub Category"
          >
            {subCategory.map((items) => (
              <Option className="OptionItems" value={items.id}>
                {items.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={12}>
          <p className="field-label">Output Per Hour</p>
          <Input
            placeholder="Enter Output Per Hour"
            value={dupaFormData.output_per_hour}
            onChange={(event) =>
              setDupaFormData({
                ...dupaFormData,
                output_per_hour: event.target.value,
              })
            }
          />
        </Col>
        <Col span={24}>
          <p className="field-label">DUPA Category</p>
          <Select
            value={dupaFormData.category_dupa_id || undefined}
            onChange={(value) =>
              setDupaFormData({ ...dupaFormData, category_dupa_id: value })
            }
            style={{ width: "100%" }}
            placeholder="Select a Dupa Category"
          >
            {dupaCategory.map((items) => (
              <Option className="OptionItems" value={items.id}>
                {items.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={24}>
          <p className="field-label">Item Number</p>
          <Input
            placeholder="Enter Item Number"
            value={dupaFormData.item_number}
            onChange={(event) =>
              setDupaFormData({
                ...dupaFormData,
                item_number: event.target.value,
              })
            }
          />
        </Col>
        <Col span={24}>
          <p className="field-label">Description</p>
          <Input
            placeholder="Enter Description"
            value={dupaFormData.description}
            onChange={(event) =>
              setDupaFormData({
                ...dupaFormData,
                description: event.target.value,
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default DupaFieldsModal;
