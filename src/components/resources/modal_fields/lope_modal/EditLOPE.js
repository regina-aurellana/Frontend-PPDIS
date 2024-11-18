import { Col, Input, Row } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";

const EditLOPE = ({
    modalTitle,
    //   powTableContent,
    lopeFormData,
    setLopeFormData,
}) => {
    return (
        <div>
            <Row gutter={[16, 16]}>
                <p className="ModalTitle">
                    <PlusOutlined /> {modalTitle}
                </p>

                <Col span={24}>
                    <p className="field-label">Number</p>
                    <Input
                        placeholder="Enter Number"
                        value={lopeFormData.number || undefined}
                        onChange={(event) =>
                            setLopeFormData({
                                ...lopeFormData,
                                number: event.target.value,
                            })
                        }
                        style={{ width: "100%" }}
                    />
                </Col>
                <Col span={24}>
                    <p className="field-label">Key Personnel</p>
                    <Input
                        placeholder="Enter Key Personnel"
                        value={lopeFormData.key_personnel || undefined}
                        onChange={(event) =>
                            setLopeFormData({
                                ...lopeFormData,
                                key_personnel: event.target.value,
                            })
                        }
                        style={{ width: "100%" }}
                    />
                </Col>
                <Col span={24}>
                    <p className="field-label">Quantity</p>
                    <Input
                        type="integer"
                        placeholder="Enter Quantity"
                        value={lopeFormData.quantity || undefined}
                        onChange={(event) =>
                            setLopeFormData({
                                ...lopeFormData,
                                quantity: event.target.value,
                            })
                        }
                        style={{ width: "100%" }}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default EditLOPE;
