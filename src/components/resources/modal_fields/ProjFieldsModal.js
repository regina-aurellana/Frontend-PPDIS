import React, { useEffect } from "react";
import { Row, Col, Select, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
const { Option } = Select;

const FieldInput = ({
  formData,
  setFormData,
  projNature,
  getProjNature,
  projNatureType,
  getProjNatureType,
  district,
  setDistrict,
  barangay,
  setBarangay,
  modalTitle,
}) => {
  useEffect(() => {
    getProjNature(formData.project_nature_id);
  }, [formData.project_nature_id]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        <p className="ModalTitle">
          <EditOutlined /> {modalTitle}
        </p>
        <Col span={24}>
          <p className="field-label">Project Title</p>
          <Input
            placeholder="Enter Project Title"
            value={formData.project_title}
            onChange={(event) =>
              setFormData({ ...formData, project_title: event.target.value })
            }
          />
        </Col>
        <Col span={24}>
          <p className="field-label">Project Nature</p>
          {modalTitle === "Create B3 Project" ? (
            <Select
              placeholder="Select Project Nature"
              onChange={(value) => getProjNature(value)}
              style={{ width: "100%" }}
            >
              {projNature.map((items) => (
                <Option className="OptionItems" value={items.id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          ) : (
            <Select
              value={formData.project_nature_id}
              placement="Select Project Nature"
              onChange={(value) => getProjNature(value)}
              style={{ width: "100%" }}
            >
              {projNature.map((items) => (
                <Option className="OptionItems" value={items.id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          )}
          {/* <Select
            placement="Select Project Nature"
            value={formData.project_nature_id}
            onChange={(value) => getProjNature(value)}
            style={{ width: "100%" }}
          >
            {projNature.map((items) => (
              <Option className="OptionItems" value={items.id}>
                {items.name}
              </Option>
            ))}
          </Select> */}
        </Col>
        <Col span={24}>
          <p className="field-label">Project Nature Type</p>
          {modalTitle === "Create B3 Project" ? (
            <Select
              placeholder="Enter Project Nature Type"
              onChange={(value) => getProjNatureType(value)}
              style={{ width: "100%" }}
            >
              {projNatureType.map((items) => (
                <Option className="OptionItems" value={items.id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          ) : (
            <Select
              placeholder="Enter Project Nature Type"
              value={formData.project_nature_type_id}
              onChange={(value) => getProjNatureType(value)}
              style={{ width: "100%" }}
            >
              {projNatureType.map((items) => (
                <Option className="OptionItems" value={items.id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          )}
        </Col>
        <Col span={24}>
          <p className="field-label">Concerned Division</p>
          <Input
            placeholder="Enter Concerned Division"
            value={formData.concerned_division}
            onChange={(event) =>
              setFormData({
                ...formData,
                concerned_division: event.target.value,
              })
            }
          />
        </Col>
        {/* BARANGAY/DISTRICT */}
        <Col span={24}>
          <p className="field-label">District</p>
          {modalTitle === "Create B3 Project" ? (
            <Select
              placeholder="Enter District"
              onChange={(value) => {
                setFormData({
                  ...formData,
                  district_id: value,
                });
                setBarangay(district.find((dist) => dist.id === value));
              }}
              style={{ width: "100%" }}
            >
              {district.map((items) => (
                <Option className="OptionItems" value={items.id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          ) : (
            <Select
              placeholder="Enter District"
              value={formData.district_id}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  district_id: value,
                });
                setBarangay(district.find((dist) => dist.id === value));
              }}
              style={{ width: "100%" }}
            >
              {district.map((items) => (
                <Option className="OptionItems" value={items.id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          )}
        </Col>
        <Col span={24}>
          <p className="field-label">Barangay</p>
          {modalTitle === "Create B3 Project" ? (
            <Select
              placeholder="Enter Barangay"
              onChange={(value) =>
                setFormData({
                  ...formData,
                  barangay_id: value,
                })
              }
              style={{ width: "100%" }}
            >
              {barangay?.barangay.map((items) => (
                <Option className="OptionItems" value={items.id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          ) : (
            <Select
              placeholder="Enter District"
              value={formData.barangay_id}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  barangay_id: value,
                })
              }
              style={{ width: "100%" }}
            >
              {barangay?.barangay.map((items) => (
                <Option className="OptionItems" value={items.id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          )}
        </Col>
        <Col span={24}>
          <p className="field-label">Project Location</p>
          <Input
            placeholder="Enter Project Location"
            value={formData.location}
            onChange={(event) =>
              setFormData({ ...formData, location: event.target.value })
            }
          />
        </Col>
        <Col span={24}>
          <p className="field-label">Duration</p>
          <Input
            placeholder="Enter Duration"
            value={formData.duration}
            onChange={(event) =>
              setFormData({ ...formData, duration: event.target.value })
            }
          />
        </Col>
        <Col span={24}>
          <p className="field-label">Contractor</p>
          <Input
            placeholder="Enter Contractor"
            value={formData.contractor}
            onChange={(event) =>
              setFormData({ ...formData, contractor: event.target.value })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default FieldInput;
