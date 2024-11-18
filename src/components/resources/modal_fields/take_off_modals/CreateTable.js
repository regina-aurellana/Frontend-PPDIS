import React, { useEffect, useState } from "react";
import { Row, Col, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { message } from "antd";
const { Option } = Select;

const CreateTable = ({
  modalTitle,
  tblDupaComp,
  takeOffTableFormData,
  setTakeOffTableFormData,
}) => {
  const [selectedDupas, setSelectedDupas] = useState(
    takeOffTableFormData.dupa_per_project_id || []
  );
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDupaChange = (selectedIds) => {
    setSelectedDupas(selectedIds);
    // Filter data based on selectedIds
    const selectedData = tblDupaComp[0]?.group.filter((item) =>
      selectedIds.includes(item.dupa_per_project_id)
    );

    // Extract unique sow_category_ids
    const sowCategoryIds = selectedData.map((item) => item.sow_category_id);
    const uniqueSowCategoryIds = [...new Set(sowCategoryIds)];

    // Check if more than one unique sow_category_id is selected
    if (uniqueSowCategoryIds.length > 1) {
      message.error(
        "Dupa per project cannot be selected because it has different sowCategoryIds."
      );
      return; // Abort further execution
    }

    setTakeOffTableFormData({
      ...takeOffTableFormData,
      dupa_per_project_id: selectedIds,
      sow_category_id: uniqueSowCategoryIds.join(),
    });
  };

  const isOptionDisabled = (optionValue) => {
    if (!selectedDupas.length || !tblDupaComp || !tblDupaComp[0]?.group) return false;
    const firstSelectedOption = tblDupaComp[0]?.group.find(
      (item) => item.dupa_per_project_id === selectedDupas[0]
    );
    return firstSelectedOption && firstSelectedOption.sow_category_id !== optionValue;
  };
  

  useEffect(() => {
    setSelectedDupas(takeOffTableFormData.dupa_per_project_id || []);
  }, [takeOffTableFormData.dupa_per_project_id]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <PlusOutlined /> {modalTitle}
        </p>
        {/* <Col span={24}>
          <p className="field-label">SOW Category</p>

          <Select
            style={{ width: "100%" }}
            placeholder="Select SOW Category"
            value={takeOffTableFormData.sow_category_id || undefined}
            onChange={(value) => getSOWCat(value)}
          >
            {sowCat &&
              sowCat.map((items) => (
                <Option className="OptionItems" value={items.id}>
                  {items.name}
                </Option>
              ))}
          </Select>
        </Col> */}

        <Col span={24}>
          <p className="field-label">Dupa Per Projects</p>
          <Select
            allowClear={true}
            placeholder="Select Dupa Per Projects"
            mode="multiple"
            value={selectedDupas || undefined}
            onChange={handleDupaChange}
            style={{ width: "100%" }}
          >
            {tblDupaComp[0]?.group.map((item) => (
              <Option
                key={item.dupa_per_project_id}
                className="OptionItems"
                value={item.dupa_per_project_id}
                disabled={isOptionDisabled(item.sow_category_id)}
              >
                {item.description}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default CreateTable;
