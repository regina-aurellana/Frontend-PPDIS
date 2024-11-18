import React, { useState, useRef } from 'react';
import { Button, Col, Divider, Row, Space, Spin, Table, Pagination, Progress, Input } from "antd";
import { BiArrowBack } from 'react-icons/bi';
import FileHeader from '../../FileHeader';
import { useReactToPrint } from 'react-to-print';
import { PrinterOutlined } from "@ant-design/icons";
import { FormOutlined } from "@ant-design/icons";


function UpdateWorkScheduleItemDuration({
  modalTitle,
  setWorkScheduleItemDurationFormData,
  workScheduleItemDurationFormData
}) {

  return (
    <Row gutter={[16, 16]}>
      <p className="ModalTitle">
        <FormOutlined /> {modalTitle}
      </p>

      <Col span={24}>
        <Input
          type="number"
          placeholder="Enter Duration No. of Days"
          value={workScheduleItemDurationFormData.duration || undefined}
          onChange={(event) =>
            setWorkScheduleItemDurationFormData({
              ...workScheduleItemDurationFormData,
              duration: event.target.value,
            })
          }
        />
      </Col>
    </Row>
  );

};

export default UpdateWorkScheduleItemDuration;
