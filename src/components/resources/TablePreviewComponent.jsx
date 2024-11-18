import React from 'react'
import { Table } from 'antd';

const TablePreviewComponent = ({ loading, className, columns, dataSource, pagination }) => {
  return (
    <div>
      <Table
        bordered
        loading={loading}
        className={className}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
      />
    </div>

  )
}

export default TablePreviewComponent
