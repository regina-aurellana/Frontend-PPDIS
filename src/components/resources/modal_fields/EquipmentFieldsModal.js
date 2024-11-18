import React, { useState } from "react";
import { Row, Col, Input, Button } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const EquipmentFieldsModal = ({
  equipmentFormData,
  setEquipmentFormData,
  modalTitle,
  setEquipmentItem,
}) => {
  const [equipmentList, setEquipmentList] = useState([]);

  const handleRemoveComponent = (index) => {
    const updatedEquipmentList = [...equipmentList];
    updatedEquipmentList.splice(index, 1);

    setEquipmentList(updatedEquipmentList);

    const updatedComponentName = [...equipmentFormData.component_name];
    updatedComponentName.splice(index, 1);
    setEquipmentFormData({
      ...equipmentFormData,
      component_name: updatedComponentName,
    });
    setEquipmentItem(updatedEquipmentList);
  };

  const handleAdd = () => {
    const newItem = ""; 
    const updatedEquipmentList = [...equipmentList, newItem];
    setEquipmentList(updatedEquipmentList);

    const updatedComponentName = [...equipmentFormData.component_name, newItem];
    setEquipmentFormData({
      ...equipmentFormData,
      component_name: updatedComponentName,
    });
    setEquipmentItem(updatedEquipmentList);
  };

  const handleChange = (onChangeValue, index) => {
    const inputData = [...equipmentList];
    inputData[index] = onChangeValue.target.value;
    setEquipmentList(inputData);

    const updatedComponentName = [...equipmentFormData.component_name];
    updatedComponentName[index] = onChangeValue.target.value;
    setEquipmentFormData({
      ...equipmentFormData,
      component_name: updatedComponentName,
    });

    setEquipmentItem(inputData);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <EditOutlined /> {modalTitle}
        </p>
        <Col span={24}>
          <p className="field-label">Item Code</p>
          <Input
            placeholder="Enter Item Code"
            value={equipmentFormData.item_code}
            onChange={(event) =>
              setEquipmentFormData({
                ...equipmentFormData,
                item_code: event.target.value,
              })
            }
          />
        </Col>

        <Row
          justify="space-between"
          align="middle"
          style={{ marginLeft: "7px" }}
        >
          <Col span={19}>
            <p className="field-label">Equipment Name</p>
            <Input
              placeholder="Enter Equipment Name"
              value={equipmentFormData.name}
              onChange={(event) =>
                setEquipmentFormData({
                  ...equipmentFormData,
                  name: event.target.value,
                })
              }
            />
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              onClick={() => handleAdd()}
              className="add-component"
              style={{ backgroundColor: "#539165", marginTop: "20px" }}
            >
              <PlusOutlined /> Add Component
            </Button>
          </Col>
        </Row>

        {equipmentFormData.component_name.map((component, index) => {
          return (
            <Col span={24} key={index}>
              <Row justify="space-between" align="middle" key={index}>
                <Col span={21}>
                  <p className="field-label">{`Component ${index + 1}`}</p>
                  <Input
                    placeholder="Enter Component"
                    value={component}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Col>
                <Col span={2}>
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => handleRemoveComponent(index)}
                    style={{ marginTop: "20px" }}
                  ></Button>
                </Col>
              </Row>
            </Col>
          );
        })}

        {/* {equipmentList.map((data, index) => {
          console.log(data);
          return (
            <Col span={24} key={index}>
              <Row justify="space-between" align="middle" key={index}>
                <Col span={21}>
                  <p className="field-label">{`Component ${index + 1}`}</p>
                  <Input
                    placeholder="Enter Component"
                    value={data}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Col>

                <Col span={2}>
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => handleRemoveComponent(index)}
                    style={{ marginTop: "20px" }}
                  ></Button>
                </Col>
              </Row>
            </Col>
          );
        })} */}

        {/* {equipmentList.map((data, index) => {
          return (
            <Col span={24} key={index}>
              <Row justify="space-between" align="middle" key={index}>
                <Col span={21}>
                  <p className="field-label">{`Component ${index + 1}`}</p>
                  <Input
                    placeholder="Enter Component"
                    value={data}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Col>

                <Col span={2}>
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => handleRemoveComponent(index)}
                    style={{ marginTop: "20px" }}
                  ></Button>
                </Col>
              </Row>
            </Col>
          );
        })} */}

        {/* {equipmentFormData.component_name.map((component, index) => {
          console.log();
          return (
            <Col span={24} key={index}>
              <Row justify="space-between" align="middle" key={index}>
                <Col span={21}>
                  <p className="field-label">{`Component ${index + 1}`}</p>
                  <Input
                    placeholder="Enter Component"
                    value={component}
                    onChange={(e) => handleChange(e, index)}
                  />
                </Col>
                <Col span={2}>
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => handleRemoveComponent(index)}
                    style={{ marginTop: "20px" }}
                  ></Button>
                </Col>
              </Row>
            </Col>
          );
        })} */}

        {/* {equipmentList.map((equipment, index) => (
          <Col span={24} key={index}>
            <Row justify="space-between" align="middle" key={index}>
              <Col span={21}>
                <p className="field-label">{`Component ${index + 1}`}</p>
                <Input
                  placeholder="Enter Component"
                  value={equipment.component_name}
                  onChange={(event) => getComponent(event, index)}
                />
              </Col>

              <Col span={2}>
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleRemoveComponent(index)}
                  style={{ marginTop: "20px" }}
                ></Button>
              </Col>
            </Row>
          </Col>
        ))} */}
        

        <Col span={24}>
          <p className="field-label">Hourly Rate</p>
          <Input
            placeholder="Enter Hourly Rate"
            value={equipmentFormData.hourly_rate}
            onChange={(event) =>
              setEquipmentFormData({
                ...equipmentFormData,
                hourly_rate: event.target.value,
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default EquipmentFieldsModal;
