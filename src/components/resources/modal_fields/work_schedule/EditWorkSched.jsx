import React, { useState, useEffect } from "react";
import { Col, Input, Row, Select, Button, Divider, Form, Dropdown } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SaveOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { DeleteSwalConfig } from "../../../resources/swal/DeleteSwalConfig";

const EditWorkSched = ({
  modalTitle,
  dupaItem,
  setWorkScheduleDupaFormData,
  onSubmit,
  worksched,
  api,
  csrfCookie,
  fetchWorkSchedId,
  Toast,
  modified,
  setModified,
}) => {
  const [durationDay, setDurationDays] = useState("");
  const [splitWeek, setSplitWeek] = useState("");
  const [fieldGroups, setFieldGroups] = useState([]);
  const [splitCount, setSplitCount] = useState(null);
  const [show, setShow] = useState([]);
  const [dropItems, setDropItems] = useState([]);
  // console.log("worksched", show);

  useEffect(() => {
    if (worksched) {
      const worschedItems = worksched.schedule.map((item, index) => {
        return {
          id: item.id,
          work_sched_item_id: item.work_sched_item_id,
          group_no: item.group_no,
          week_no: item.week_no,
          day_no: item.day_no,
          duration_no: item.duration_no,
        };
      });

      console.log(
        "ws_items",
        worschedItems.sort((a, b) => a.id - b.id)
      );
      setSplitWeek(worksched.split_no);
      setSplitCount(worksched.split_no);
      setFieldGroups(worschedItems.sort((a, b) => a.id - b.id));
      setWorkScheduleDupaFormData(worschedItems);
    }
  }, [worksched]);

  const handleDropItems = (index, field, group) => {
    console.log("selected group", group);
    if (group.week_no != null) {
      if (group.week_no > 0) {
        const items = [];
        const named_days = ["S", "M", "T", "W", "TH", "F", "S"];
        let ctr = -1;
        const start_day = group.week_no * 7 - 6;
        console.log("sd", start_day);
        for (let i = start_day; i <= start_day + 6; i++) {
          ctr++;
          items.push({
            key: i,
            label: `${named_days[ctr]} - ${i}`,
            onClick: (e) => handleFieldChange(index, field, e.key, group),
          });
        }
        setDropItems(items);
      }
    } else {
      setDropItems([]);
    }
  };

  const handleInputChangeDurationDay = (e) => {
    // Ensure the input only contains numeric values
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setDurationDays(newValue);
  };

  const handleSplitWeekChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSplitWeek(value);
    generateFieldGroups(value);
    setWorkScheduleDupaFormData(fieldGroups);
  };

  const generateFieldGroups = (count) => {
    const newFieldGroups = [...fieldGroups.filter((obj) => "id" in obj)];
    if (count > splitCount) {
      for (let i = 0; i < count - splitCount; i++) {
        newFieldGroups.push({
          week_no: "",
          day_no: "",
          duration_no: "",
        });
      }
    } else if (count <= splitCount && count >= 1) {
      setSplitWeek(splitCount);
    }

    setFieldGroups(newFieldGroups);
  };

  const handleFieldChange = (index, field, value, group) => {
    // AddWorkSched_v2.log("field", field);
    const newFieldGroups = [...fieldGroups];
    newFieldGroups[index][field] = value;
    if (field == "day_no") {
      newFieldGroups[index]["duration_no"] = 7 * group.week_no + 1 - value;
    }
    setFieldGroups(newFieldGroups);
    setWorkScheduleDupaFormData(newFieldGroups);
    console.log("Updated Field Groups:", newFieldGroups);
    // if(field != 'duration_no'){
    if (group.id != null || group.id != undefined) {
      if (!show.includes(group.id)) {
        setShow((prevItems) => [...prevItems, group.id]);
      }
    } else {
      setModified(true);
    }
    // }
  };

  const handleDeleteGroup = (index, group) => {
    const newFieldGroups = [...fieldGroups];
    const split = parseInt(splitWeek, 10) - 1;
    const updatedItems = show.filter((item) => item !== group.id);
    setShow(updatedItems);
    newFieldGroups.splice(index, 1);
    setFieldGroups(newFieldGroups);
    setWorkScheduleDupaFormData(newFieldGroups);
    // console.log("Updated Field Groups:", newFieldGroups);
    setSplitWeek(split);

    // }
  };

  const handleAddGroup = () => {
    const newFieldGroups = [
      ...fieldGroups,
      { week_no: "", day_no: "", duration_no: "" },
    ];
    const split = parseInt(splitWeek, 10) + 1;
    setFieldGroups(newFieldGroups);
    setWorkScheduleDupaFormData(newFieldGroups);
    setSplitWeek(split);
    // console.log("Updated Field Groups:", newFieldGroups);
  };

  const handleEditGroup = async (index, group) => {
    const sumOfDurations = fieldGroups
      .map((obj) => obj.duration_no)
      .reduce((acc, duration) => acc + parseInt(duration, 10), 0);

    if (sumOfDurations != dupaItem.duration) {
      Toast.fire({
        icon: "error",
        title: "Incorrect Data",
        text: "The total number of duration is not equal to the total duration inputted.",
      });
    } else {
      await csrfCookie().catch((err) => {
        Toast.fire({
          icon: "error",
          title: "Incorrect Data",
          text: "Something went wrong when posting the data.",
        });
      });
      await api
        .post("/schedule", group)
        .then(function (response) {
          Toast.fire({
            icon: "success",
            title: response.data.status,
            text: response.data.message,
          });

          const updatedItems = show.filter((item) => item !== group.id);
          setShow(updatedItems);

          // fetchWorkSchedId(group.work_sched_item_id)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Form onFinish={onSubmit}>
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
            <strong> Duration (no. of days) </strong>
          </p>
          <p>{dupaItem.duration}</p>
        </div>
        <div>
          <p>
            <strong> Split Schedule </strong>
          </p>
          <Input
            type="number"
            id="splitSchedInput"
            value={splitWeek}
            onChange={handleSplitWeekChange}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Button onClick={() => handleAddGroup()} icon={<PlusOutlined />}>
          Week
        </Button>
      </div>
      <hr style={{ marginBottom: 10 }} />

      {fieldGroups.map((group, index) => (
        <div key={index}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: 10,
              justifyContent: "space-between",
              columnGap: 10,
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Col span={10}>
                <p>
                  <strong> Week </strong>
                </p>
              </Col>
              <Col span={12}>
                <Input
                  type="number"
                  value={group.week_no}
                  onChange={(e) =>
                    handleFieldChange(index, "week_no", e.target.value, group)
                  }
                  required
                />
              </Col>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Col span={8}>
                <p>
                  <strong> Day </strong>
                </p>
              </Col>
              {/* <Col span={25}> */}
              {/* <Input
                  type="number"
                  value={group.day_no}
                  onChange={(e) =>
                    handleFieldChange(index, "day_no", e.target.value, group)
                  }
                  required
                /> */}
              <Dropdown
                menu={{ items: dropItems }}
                trigger={["click"]}
                placement="bottom"
                name={"day_no"}

                // disabled={startWeek ? false : true}
              >
                <Button
                  onClick={() => handleDropItems(index, "day_no", group)}
                  style={{ width: "80px" }}
                >
                  {group.day_no}
                </Button>
              </Dropdown>
              {/* </Col> */}
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Col span={12}>
                <p>
                  <strong> Duration </strong>
                </p>
              </Col>
              <Col span={12}>
                <Input
                  max={7}
                  min={1}
                  type="number"
                  value={group.duration_no}
                  onChange={(e) =>
                    handleFieldChange(
                      index,
                      "duration_no",
                      e.target.value,
                      group
                    )
                  }
                  required
                />
              </Col>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Col span={4}>
                <Button
                  onClick={() => handleDeleteGroup(index, group)}
                  icon={<DeleteOutlined />}
                ></Button>
              </Col>
            </div>
            {group.id ? (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Col span={4}>
                  <Button
                    onClick={() => handleEditGroup(index, group)}
                    icon={<SaveOutlined />}
                    style={{ color: "blue" }}
                  ></Button>
                </Col>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}

      <hr style={{ marginBottom: 10 }} />
      {modified && (
        <div style={{ color: "red" }}>
          <WarningOutlined /> New Entries have been made, Click Submit to save.
        </div>
      )}
      {show.length == 0 ? (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button htmlType="submit" type="primary" onClick={() => setShow([])}>
            Submit
          </Button>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button htmlType="submit" type="default" danger>
            {" "}
            Unsaved Changes!
          </Button>
        </div>
      )}
    </Form>
  );
};

export default EditWorkSched;
