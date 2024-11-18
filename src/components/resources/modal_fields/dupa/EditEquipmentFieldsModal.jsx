import React from 'react';
import { Row, Col, Input } from 'antd';

const EditEquipmentFieldsModal = ({ equipmentFormData, setEquipmentFormData }) => {

    return (
        <div style={{ marginTop: '20px' }}>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <p className='field-label' style={{ fontWeight: 'bold' }}>{equipmentFormData.name}</p>
                </Col>
                <Col span={24}>
                    <p className='field-label'>No. of Unit</p>
                    <Input
                        value={equipmentFormData.no_of_unit}
                        onChange={(event) => setEquipmentFormData({ ...equipmentFormData, no_of_unit: event.target.value })}
                    />
                </Col>
                <Col span={24}>
                    <p className='field-label'>No. of Hour</p>
                    <Input
                        value={equipmentFormData.no_of_hour}
                        onChange={(event) => setEquipmentFormData({ ...equipmentFormData, no_of_hour: event.target.value })}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default EditEquipmentFieldsModal