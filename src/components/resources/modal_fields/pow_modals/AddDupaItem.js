import { Col, Input, Row, Select } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

function AddDupaItem({
  modalTitle,
  sowSubData,
  dupaData,
  tableFormData,
  setTableFormData,
}) {
  return (
    <div>
      {dupaData === "No Dupa to show" ? (
        <Row gutter={[16, 16]}>
          <p className="ModalTitle">
            <PlusOutlined /> {modalTitle}
          </p>

          <Col span={24}>
            <p className="field-label">SOW Sub Category</p>
            <Select
              disabled
              placeholder="Select SOW Sub Category"
              value="No Dupa"
              style={{ width: "100%" }}
            ></Select>
          </Col>

          <Col span={24}>
            <p className="field-label">DUPA</p>
            <Select
              placeholder="No Dupa To Show"
              disabled
              style={{ width: "100%" }}
              value="No Dupa"
            ></Select>
          </Col>

          <Col span={24}>
            <p className="field-label">Quantity</p>
            <Input disabled placeholder="Enter Quantity" value="No Dupa" />
          </Col>

          <Col span={24}>
            <p>
              <span style={{ color: "red", fontStyle: "italic" }}>
                * Cannot select fields and add a dupa item because there is no
                dupa to show.
              </span>
            </p>
          </Col>
        </Row>
      ) : (
        <Row gutter={[16, 16]}>
          <p className="ModalTitle">
            <PlusOutlined /> {modalTitle}
          </p>

          <Col span={24}>
            <p className="field-label">SOW Sub Category</p>
            <Select
              placeholder="Select SOW Sub Category"
              value={tableFormData.sow_subcategory_id || undefined}
              onChange={(value) =>
                setTableFormData({
                  ...tableFormData,
                  sow_subcategory_id: value,
                })
              }
              style={{ width: "100%" }}
            >
              {sowSubData.map((items) => (
                <Option
                  className="OptionItems"
                  value={items.sow_sub_category_id}
                >
                  {items.name}
                </Option>
              ))}
            </Select>
          </Col>

          <Col span={24}>
            <p className="field-label">DUPA</p>
            <Select
              placeholder="Select DUPA"
              value={tableFormData.dupa_id || undefined}
              onChange={(value) =>
                setTableFormData({ ...tableFormData, dupa_id: value })
              }
              style={{ width: "100%" }}
            >
              {dupaData &&
                dupaData.map((items) => (
                  <Option className="OptionItems" value={items.id}>
                    {items.description}
                  </Option>
                ))}
            </Select>
          </Col>

          <Col span={24}>
            <p className="field-label">Quantity</p>
            <Input
              placeholder="Enter Quantity"
              value={tableFormData.quantity || undefined}
              onChange={(event) =>
                setTableFormData({
                  ...tableFormData,
                  quantity: event.target.value,
                })
              }
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default AddDupaItem;
