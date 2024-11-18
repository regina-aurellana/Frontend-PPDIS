import { Col, Input, Row } from 'antd'
import React from 'react'

const DupaAddMaterialArea = ({ areaMaterialFormData, setAreaMaterialFormData}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <p className="field-label">Area</p>
        <Input
          placeholder="Enter Area of Material"
          value={areaMaterialFormData.area}
          onChange={(event) =>
            setAreaMaterialFormData({
              ...areaMaterialFormData,
              area: event.target.value,
            })
          }
        />
      </Col>
    </Row>
  )
}

export default DupaAddMaterialArea
