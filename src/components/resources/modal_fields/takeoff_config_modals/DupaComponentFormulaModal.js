import { Col, Row, Select } from "antd";
import { Option } from "antd/es/mentions";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";

const DupaComponentFormulaModal = ({
  modalTitle,
  formula,
  tblDupaCompFormulaFormData,
  getFormula,
  tblDupaComp,
  getDupaComponent,
  setTblDupaComp,
}) => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <PlusOutlined /> {modalTitle}
        </p>
        <Col span={24}>
          <p className="field-label">Formula</p>
          <Select
            placeholder="Select Formula"
            value={tblDupaCompFormulaFormData.formula_id || undefined}
            onChange={(value) => getFormula(value)}
            style={{ width: "100%" }}
          >
            {formula.map((items) => (
              <Option className="OptionItems" value={items.id}>
                {items.formula}
              </Option>
            ))}
          </Select>
        </Col>

        <Col span={24}>
          <p className="field-label">Dupa Component</p>
          <Select
            placeholder="Select Dupa Component"
            value={
              tblDupaCompFormulaFormData.table_dupa_component_id || undefined
            }
            onChange={(value) => getDupaComponent(value)}
            style={{ width: "100%" }}
          >
            {tblDupaComp.map((items) => (
              <Option className="OptionItems" value={items.id}>
                {items.description + (items.name == null ? '' : ' - ' + items.name)}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default DupaComponentFormulaModal;
