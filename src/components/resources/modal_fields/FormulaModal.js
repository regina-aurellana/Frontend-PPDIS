import { Button, Col, Input, Row, Select } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";

const FormulaModal = ({
  modalTitle,
  measurement,
  formulaFormData,
  setFormulaFormData,
}) => {
  const [formula, setFormula] = useState("");

  // DISPLAY VALUE OF CLICKING IN CALCULATOR BUTTONS
  const displayValue = (value) => {
    const updatedFormula = formula + value.toUpperCase();
    setFormula(updatedFormula);
    setFormulaFormData((prevTableFormula) => ({
      ...prevTableFormula,
      formula: updatedFormula,
    }));
  };

  // UNDO PER LETTER OR PER OPERATOR ADDED
  const undo = () => {
    setFormula((prevFormula) => {
      if (prevFormula.length === 0) return prevFormula;
      const updatedFormula = prevFormula.slice(0, -1);
      setFormulaFormData((prevFormData) => ({
        ...prevFormData,
        formula: updatedFormula,
      }));
      return updatedFormula;
    });
  };

  // CLEAR THE DISPLAY INPUT TO FORMULA FIELD
  const clear = () => {
    setFormula("");
    setFormulaFormData((prevFormData) => ({
      ...prevFormData,
      formula: "",
    }));
  };

  // GET SELECTED RESULT
  const getResult = async (value) => {
    const uppercaseValue = value.toUpperCase();
    setFormulaFormData((prevFormula) => ({
      ...prevFormula,
      result: uppercaseValue,
    }));
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <PlusOutlined /> {modalTitle}
        </p>
        <Col span={24}>
          <p className="field-label">Result</p>
          <Select
            placeholder="Select Result"
            value={formulaFormData.result || undefined}
            onChange={(value) => getResult(value)}
            style={{ width: "100%" }}
          >
            {measurement.map((items) => (
              <Option className="OptionItems" value={items.name}>
                {items.name}
              </Option>
            ))}
          </Select>
        </Col>

        <Col span={24}>
          <p className="field-label">Formula</p>
          <Input
            value={formulaFormData.formula}
            readOnly
            placeholder="Formula"
            onChange={(e) =>
              setFormulaFormData({ ...formulaFormData, result: e.target.value })
            }
            onClick={() => {
              undo();
            }}
          />
        </Col>

        <Row gutter={[8, 8]}>
          <Col span={9}>
            <div className="card-calculator">
              <Row
                style={{
                  marginBottom: 5,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p className="calculator-name">Operator</p>
              </Row>

              <Row gutter={[8, 8]} align="center">
                <Col span={6}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("0")}
                  >
                    <span className="operator-name">0</span>
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("1")}
                  >
                    <span className="operator-name">1</span>
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("2")}
                  >
                    <span className="operator-name">2</span>
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("3")}
                  >
                    <span className="operator-name">3</span>
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("4")}
                  >
                    <span className="operator-name">4</span>
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("5")}
                  >
                    <span className="operator-name">5</span>
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("6")}
                  >
                    <span className="operator-name">6</span>
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("7")}
                  >
                    <span className="operator-name">7</span>
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("8")}
                  >
                    <span className="operator-name">8</span>
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("9")}
                  >
                    <span className="operator-name">9</span>
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("+")}
                  >
                    <span className="operator-name">+</span>
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("-")}
                  >
                    <span className="operator-name">-</span>
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("*")}
                  >
                    <span className="operator-name">*</span>
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("/")}
                  >
                    <span className="operator-name">/</span>
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue("(")}
                  >
                    <span className="operator-name">(</span>
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    className="calculator-button"
                    type="primary"
                    onClick={() => displayValue(")")}
                  >
                    <span className="operator-name">)</span>
                  </Button>
                </Col>

                <Col span={24}>
                  <Button
                    type="primary"
                    style={{
                      marginTop: "5px",
                      width: "100%",
                    }}
                    onClick={undo}
                  >
                    Undo
                  </Button>
                </Col>

                <Col span={24}>
                  <Button
                    type="primary"
                    style={{
                      marginTop: "5px",
                      width: "100%",
                    }}
                    onClick={clear}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>

          <Col span={15}>
            <div
              className="card-calculator"
              style={{ overflow: "auto", maxHeight: "373px" }}
            >
              <Row
                style={{
                  marginBottom: 5,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p className="calculator-name">Measurement Fields</p>
              </Row>

              <Row gutter={[8, 8]}>
                {measurement.map((table) => (
                  <Col span={12} style={{ textAlign: "center" }}>
                    <Button
                      style={{ overflow: "hidden" }}
                      className="calculator-button"
                      type="primary"
                      value={table.name}
                      onClick={() => {
                        displayValue(table.name);
                      }}
                    >
                      <span className="operator-name">{table.name}</span>
                    </Button>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default FormulaModal;
