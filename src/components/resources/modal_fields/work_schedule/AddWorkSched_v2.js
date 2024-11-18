import React, { useState, useEffect } from "react";
import {
  Col,
  Input,
  Row,
  Select,
  Button,
  Divider,
  Form,
  Dropdown,
  Space,
  InputNumber,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownOutlined,
} from "@ant-design/icons";

const AddWorkSched_v2 = ({
  modalTitle,
  dupaItem,
  setWorkScheduleDupaFormData,
  onSubmit,
}) => {
  const [durationDay, setDurationDays] = useState("");
  const [splitWeek, setSplitWeek] = useState(1);
  const [startWeek, setStartWeek] = useState(1);
  const [startDay, setStartDay] = useState(null);
  const [dropItems, setDropItems] = useState([]);
  const [schedule, setSchedule] = useState([
    {
      week_no: 1,
      day_no: "",
    },
  ]);

  const handleFieldChange = (f, e) => {
    const newFieldGroups = [...schedule];
    newFieldGroups[0]["day_no"] = e.key;
    setStartDay(e.key);
    setSchedule(newFieldGroups);
    setWorkScheduleDupaFormData(newFieldGroups);
    console.log("Updated Field Groups:", newFieldGroups);
    console.log("e", e);
  };

  const handleWeekChange = (e) => {
    const newFieldGroups = [...schedule];
    newFieldGroups[0]["week_no"] = e.target.value;
    newFieldGroups[0]["day_no"] = "";
    setStartDay(null);
    setStartWeek(e.target.value);
    setSchedule(newFieldGroups);
    setWorkScheduleDupaFormData(newFieldGroups);
    console.log("Updated Field Groups:", newFieldGroups);
    console.log("t_duration", dupaItem);
  };

  const handleDropItems = () => {
    if (startWeek != null) {
      if (startWeek > 0) {
        const items = [];
        const named_days = ["S", "M", "T", "W", "TH", "F", "S"];
        let ctr = -1;
        const start_day = startWeek * 7 - 6;
        console.log("sd", start_day);
        for (let i = start_day; i <= start_day + 6; i++) {
          ctr++;
          items.push({
            key: i,
            label: `${named_days[ctr]} - ${i}`,
            onClick: (e) => handleFieldChange("day_no", e),
          });
        }
        setDropItems(items);
      }
    } else {
      setDropItems([]);
    }
  };

  useEffect(() => {
    handleDropItems();
  }, []);

  return (
    <Form onFinish={onSubmit}>
      {/* {console.log("sw", startWeek)}

      {console.log("items", dropItems)} */}
      <p className="ModalTitle">{modalTitle}</p>
      <p style={{ marginBottom: 20, fontSize: 18 }}>
        {dupaItem.item_code} - {dupaItem.description}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 10,
          justifyContent: "space-between",
          columnGap: 10,
        }}
      >
        <div>
          <p>
            <strong> Duration (no. of days):</strong> &nbsp; {dupaItem.duration}
          </p>
        </div>
      </div>
      <br />
      <hr style={{ marginBottom: 10 }} />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 10,
          justifyContent: "center",
          alignItems: "center",
          // columnGap: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Col span={10}>
            <p>
              <strong> Start Week </strong>
            </p>
          </Col>
          <Col span={10}>
            <Input
              min={1}
              defaultValue={startWeek}
              onChange={handleWeekChange}
              required
            />
          </Col>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
          }}
        >
          {/* <Col span={10}>
            <p>
              <strong> Start Day </strong>
            </p>
          </Col> */}
          {/* <Col span={10}> */}
          <Dropdown
            menu={{ items: dropItems }}
            trigger={["click"]}
            placement="bottom"
            name={"day_no"}
            disabled={startWeek ? false : true}
          >
            <Button onClick={handleDropItems}>Start Day</Button>
          </Dropdown>
          &nbsp;&nbsp;
          <Input value={startDay} readOnly={true} />
          {/* </Col> */}
        </div>
      </div>
      <hr style={{ marginBottom: 10 }} />

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default AddWorkSched_v2;
