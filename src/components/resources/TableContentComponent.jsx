import React from "react";
import { Table } from "antd";

const TableContentComponent = ({
  loading,
  className,
  columns,
  dataSource,
  subTotal,
  header,
  showSubTotal,
}) => {
  return (
    <Table
      bordered
      loading={loading}
      className={className}
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 50, position: ["none"] }}
      title={header}
      footer={
        showSubTotal
          ? () => (
              <div className="dupa-sub-total">
                <span>Subtotal:</span>
                <span style={{ float: "right" }}>{subTotal}</span>
              </div>
            )
          : null
      }
    />
  );
};

export default TableContentComponent;
