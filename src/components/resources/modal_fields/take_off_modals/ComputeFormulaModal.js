import React, { useState, useEffect } from "react";
import { Input, Row, Col, Button, Divider } from "antd";

const ComputeFormulaModal = ({
  fetchTakeoffMeasurement,
  tableFormula,
  setTableFormula,
}) => {
  const [formula, setFormula] = useState("");

  // diplay value of clicked formula to input
  const displayValue = (value) => {
    const updatedFormula = formula + value;
    setFormula(updatedFormula);
    setTableFormula((prevTableFormula) => ({
      ...prevTableFormula,
      formula: updatedFormula,
    }));
  };

  // undo the display formula
  const undo = () => {
    setFormula((prevFormula) => {
      if (prevFormula.length === 0) return prevFormula;
      return prevFormula.slice(0, -1);
    });
  };

  // clear the display input
  const clear = () => {
    setFormula("");
  };

  // const tableId = fetchTakeoffMeasurement.measurement_id;

  return (
    <div>
      <Row></Row>
      <div style={{ marginBottom: 10 }}>
        <p className="field-label">Formula</p>
        <Input
          placeholder="Formula Display Here .."
          disabled
          style={{ height: "50px", color: "black" }}
          value={formula}
        />
      </div>

      <Row gutter={[8, 8]}>
        <Col span={9}>
          <div className="card-calculator">
            <Row style={{ marginBottom: 5 }}>
              <p className="calculator-name">Calculator</p>
            </Row>

            <Row gutter={[8, 8]} align="center">
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
          <div className="card-calculator">
            <Row style={{ marginBottom: 5 }}>
              <p className="calculator-name">Measurement</p>
            </Row>

            <Row gutter={[8, 8]}>
              {fetchTakeoffMeasurement.map(
                (table) =>
                  table.id == tableFormula.take_off_table_id &&
                  Object.values(
                    table.take_off_table_field.reduce((acc, fields) => {
                      if (!acc[fields.name]) {
                        acc[fields.name] = fields;
                      }
                      return acc;
                    }, {})
                  ).map((fields) => (
                    <Col span={12} style={{ textAlign: "center" }}>
                      <Button
                        className="calculator-button"
                        type="primary"
                        value={fields.name}
                        onClick={() => {
                          displayValue(fields.name);
                        }}
                      >
                        <span className="operator-name">{fields.name}</span>
                      </Button>
                    </Col>
                  ))
              )}
            </Row>
          </div>
        </Col>
      </Row>
      <Divider />
    </div>
  );
};

export default ComputeFormulaModal;
