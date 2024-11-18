import React from "react";
import { Row, Col, Select, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Option } = Select;

const MaterialFieldsModal = ({
  materialFormData,
  setMaterialFormData,
  modalTitle,
}) => {
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
            value={materialFormData.item_code}
            onChange={(event) =>
              setMaterialFormData({
                ...materialFormData,
                item_code: event.target.value,
              })
            }
          />
        </Col>
        <Col span={24}>
          <p className="field-label">Material Name</p>
          <Input
          placeholder="Enter Material Name"
            value={materialFormData.name}
            onChange={(event) =>
              setMaterialFormData({
                ...materialFormData,
                name: event.target.value,
              })
            }
          />
        </Col>

        <Col span={24}>
          <p className="field-label">Unit</p>
          <Input
          placeholder="Enter Unit"
            value={materialFormData.unit}
            onChange={(event) =>
              setMaterialFormData({
                ...materialFormData,
                unit: event.target.value,
              })
            }
          />
        </Col>

        <Col span={24}>
          <p className="field-label">Unit Cost</p>
          <Input
          placeholder="Enter Unit Cost"
            value={materialFormData.unit_cost}
            onChange={(event) =>
              setMaterialFormData({
                ...materialFormData,
                unit_cost: event.target.value,
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default MaterialFieldsModal;
