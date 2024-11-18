import React from "react";
import { Table } from "antd";

const TableComponents = ({
  loading,
  className,
  columns,
  dataSource,
  pagination,
  size,
}) => {
  return (
    <Table
      bordered
      loading={loading}
      className={className}
      columns={columns}
      dataSource={dataSource}
      pagination={pagination}
      size={size}
    />
  );
};

export default TableComponents;
