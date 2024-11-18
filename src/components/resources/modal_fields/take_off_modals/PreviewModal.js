import { Button, Col, Divider, Row, Space } from "antd";
import React, { useRef } from "react";
import FileHeader from "../../FileHeader";
import { PrinterOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";

const PreviewModal = ({
  takeOff,
  takeOffHeaderModal,
  project,
  isSetShowModal,
}) => {
  const componentRef = useRef();
  let previousCategoryName = null;

  //HANDLE PRINTING
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //HANDLE CANCEL IN MODAL
  const handleCancel = () => {
    isSetShowModal(false);
  };

  return (
    <div>
      <div className="prev-container" ref={componentRef}>
        <FileHeader />
        <Divider />
        <Row>
          <Col span={14}>
            <p className="takeoff-proj">
              <strong>B ID#: </strong> 202305
            </p>
            <p className="takeoff-proj">
              <strong>Project Registry No.(DED): </strong>
              {project?.registry_no}
            </p>
            <p className="takeoff-proj">
              <strong>Project Name: </strong> {project?.project_title}
            </p>
            <p className="takeoff-proj">
              <strong>Location: </strong> {project?.location}
            </p>
          </Col>
          <Col span={10}>
            <p className="takeoff-proj">
              <strong>Project Category: </strong>
              {project?.project_nature}
            </p>
            <p className="takeoff-proj">
              <strong>Project Subject: </strong>
              {project?.project_nature_type}
            </p>
            {project?.project_nature_id === 1 ? (
              <div>
                <p className="takeoff-proj">
                  <strong>Limit: </strong>
                  {takeOffHeaderModal?.limit
                    ? takeOffHeaderModal?.limit
                    : "N/A"}
                </p>
                <p className="takeoff-proj">
                  <strong>Length: </strong>
                  {takeOffHeaderModal?.length
                    ? takeOffHeaderModal?.length
                    : "N/A"}
                </p>
              </div>
            ) : null}
          </Col>

          <Col span={24} align="center">
            <p className="quantity-proj">QUANTITY TAKE-OFF</p>
            <p className="takeoff-proj">
              {project?.project_nature}/{project?.project_nature_type}
            </p>
          </Col>
        </Row>

        <Col span={24} align="center">
          {takeOff.map((data, index) => (
            <Row>
              <Col span={24} align="center">
                <p className="quantity-proj" key={index}>
                  {project?.project_nature_id === 1
                    ? "Street " + parseInt(index + 1)
                    : "Building " + parseInt(index + 1)}
                </p>
              </Col>
              {console.log(data)}
              {data.take_off_table &&
                data.take_off_table.map((tbl, idx) => (
                  <>
                    <React.Fragment key={idx}>
                      {idx === 0 ||
                      (idx > 0 &&
                        tbl.sow_category_name !==
                          data.take_off_table[idx - 1].sow_category_name) ? (
                        <Col
                          span={24}
                          align="center"
                          className="preview-sow-title"
                        >
                          {tbl.sow_category_name}
                        </Col>
                      ) : null}
                    </React.Fragment>

                    <Col span={24} align="center" className="preview-desc">
                      {tbl.item_number} - {tbl.description}
                    </Col>

                    <Col span={24} align="center">
                      <table className="takeoff-table">
                        <thead>
                          <tr>
                            <th>Location</th>
                            {tbl.Result?.fieldName.map((tblHead, idx) => (
                              <th>{tblHead}</th>
                            ))}
                            <th>{tbl.result}</th>
                          </tr>
                        </thead>

                        <tbody>
                          {tbl.hasOwnProperty("Result") &&
                            Object.keys(tbl.Result?.fieldValue)
                              .filter((key) => key.startsWith("row"))
                              .map((rowKey, idx) => (
                                <tr key={idx}>
                                  <td>
                                    {tbl.Result.mark[idx].mark_description}
                                  </td>

                                  {tbl.Result?.fieldValue[rowKey].map(
                                    (value, valueIdx) => (
                                      <td key={valueIdx}>{value}</td>
                                    )
                                  )}

                                  <td>{tbl.Result.row_result[idx]}</td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                      <div>
                        <Row>
                          <Col className="prev-footer-label" span={18}>
                            <p>Total:</p>
                          </Col>
                          <Col className="prev-footer-value" span={6}>
                            <p>{tbl.Result?.table_total}</p>
                          </Col>
                        </Row>

                        <Row>
                          <Col className="prev-footer-label" span={18}>
                            <p>Contingency:</p>
                          </Col>
                          <Col span={6} className="prev-footer-value">
                            {tbl.Result?.contingency === null ? (
                              <p>With 0% Contingency</p>
                            ) : (
                              <p>With {tbl.Result?.contingency}% Contingency</p>
                            )}
                          </Col>
                        </Row>

                        <Row>
                          <Col className="prev-footer-label" span={18}>
                            <p>
                              <strong>Say:</strong>
                            </p>
                          </Col>
                          <Col span={6} className="prev-footer-value">
                            <p>
                              <strong>{tbl.Result?.table_say}</strong>
                            </p>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </>
                ))}
            </Row>
          ))}
        </Col>
      </div>
      <Divider />
      <Col style={{ textAlign: "right" }}>
        <Space>
          <Button
            onClick={handleCancel}
            type="default"
            style={{
              marginBottom: 10,
              paddingLeft: 35,
              paddingRight: 35,
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handlePrint}
            type="primary"
            icon={<PrinterOutlined />}
            style={{
              backgroundColor: "#176B87",
              marginBottom: 10,
              paddingLeft: 35,
              paddingRight: 35,
            }}
          >
            Print
          </Button>
        </Space>
      </Col>
    </div>
  );
};

export default PreviewModal;
