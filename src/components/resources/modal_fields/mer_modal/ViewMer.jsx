import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ViewMer = ({
  equipmentData,
  projectData,
  FileHeader,
  TableComponents,
  loading,
  PrinterOutlined,
  Divider,
  Button,
}) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const table_columns = [
    {
      title: "Equipment ID",
      dataIndex: "equipment_id",
      key: "equipment_id",
      align: "center",
    },
    {
      title: "Item Code",
      dataIndex: "item_code",
      key: "item_code",
      align: "center",
    },
    {
      title: "Equipment Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Equipment Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
  ];

  return (
    <>
      <div ref={componentRef}>
        <FileHeader />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textTransform: "uppercase",
          }}
        >
          {projectData != null ? (
            <p>{projectData.project_title},</p>
          ) : (
            <p>PROJECT TITLE</p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textTransform: "uppercase",
          }}
        >
          {projectData != null ? (
            <p>{projectData.location}</p>
          ) : (
            <p>PROJECT LOCATION</p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textTransform: "uppercase",
          }}
        >
          <p>
            <b>LIST OF MATERIALS</b>
          </p>
        </div>
        <br />
        <TableComponents
          loading={loading}
          className="project-table"
          columns={table_columns}
          dataSource={equipmentData}
          pagination={false}
        />
      </div>
      <Divider />
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          onClick={handlePrint}
          type="primary"
          className="btn-add-area"
          style={{
            marginBottom: 10,
            marginTop: 20,
            paddingLeft: 35,
            paddingRight: 35,
            backgroundColor: "#176B87",
          }}
        >
          <PrinterOutlined /> Print
        </Button>
      </div>
    </>
  );
};

export default ViewMer;