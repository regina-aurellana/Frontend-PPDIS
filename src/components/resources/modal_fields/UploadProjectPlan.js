import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import CustomFileInput from '../CustomFileInput';

const UploadProjectPlan = ({ modalTitle, setFormData, formData, trigger, setTrigger }) => {
    useEffect(() => {
        if (formData.length === 0) {
            setFormData([{ name: '', filepond: [] }]);
        }
    }, [formData, setFormData]);

    const handleFileChange = (files, index) => {
        const updatedFields = [...formData];
        updatedFields[index].filepond = files; // Update filepond data for the specific field
        setFormData(updatedFields);
    };

    const handleInputChange = (index, event) => {
        const { value } = event.target;
        const updatedFields = [...formData];
        updatedFields[index].name = value; // Update name field for the specific field
        setFormData(updatedFields);
    };

    const handleAddField = () => {
        const newField = { name: '', filepond: [] };
        setFormData([...formData, newField]); // Add a new field
    };

    const handleRemoveField = (index) => {
        const updatedFields = formData.filter((_, i) => i !== index);
        setFormData(updatedFields); // Remove a field
    };

    return (
        <div style={{ marginTop: '20px', overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
            <Row gutter={[16, 16]} style={{ rowGap: '0px' }}>
                <p className="ModalTitle" style={{ marginLeft: '10px' }}>
                    <CloudUploadOutlined /> {modalTitle}
                </p>
                {formData.map((field, index) => (
                    <Col span={24} key={index} style={{ marginBottom: 10 }}>
                        <p className="field-label">Name</p>
                        <Input
                            placeholder="Enter field value"
                            value={field.name}
                            onChange={(event) => handleInputChange(index, event)}
                            style={{ marginBottom: 5 }}
                        />
                        <CustomFileInput
                            onChange={(files) => handleFileChange(files, index)}
                            rowIndex={index}
                            formData={formData}
                            setFormData={setFormData}
                            modalTitle={modalTitle}
                            setTrigger={setTrigger}
                            trigger={trigger}
                        />
                        {modalTitle === "Import Project Plan - PDF" && (
                            <Button
                                onClick={() => handleRemoveField(index)}
                                disabled={formData.length === 1}
                                style={{ marginTop: 10 }}
                            >
                                Remove
                            </Button>
                        )}
                    </Col>
                ))}
                {modalTitle === "Import Project Plan - PDF" && (
                    <Col span={24} style={{ marginTop: 10 }}>
                        <Button type="dashed" onClick={handleAddField}>
                            Add Field
                        </Button>
                    </Col>
                )}

            </Row>
        </div>
    );
};

export default UploadProjectPlan;
