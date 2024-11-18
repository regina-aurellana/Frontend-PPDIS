import React, { useState, useRef } from "react";
import {
  Button,
  Col,
  Divider,
  Row,
  Space,
  Spin,
  Table,
  Pagination,
  Progress,
} from "antd";
import { BiArrowBack } from "react-icons/bi";

function ViewWorkSchedule({
  modalTitle,
  projectData,
  handleCancel,
  dupaItemSchedule,
  dupaItemDuration,
  dupaItemData,
}) {
  const endDuration = useRef(1);
  const generateData = () => {
    const datas = [];
    let idCounter = 1;

    dupaItemSchedule.forEach((data) => {
      let start = getWeekNumber(parseInt(data.day_no));
      let end = getWeekNumber(
        parseInt(data.day_no) + parseInt(data.duration_no)
      );
      endDuration.current = end;
      for (let day = start.startDay; day <= end.endDay; day++) {
        const weekNo = getWeekNumber(day);
        datas.push({
          id: idCounter++,
          week_no: weekNo.weekNo,
          day_no: day,
        });
      }
    });

    return datas;
  };

  const getWeekNumber = (day) => {
    const weekNo = Math.ceil(day / 7);
    const startDay = (weekNo - 1) * 7 + 1;
    const endDay = startDay + 6; // Assuming a week is 7 days

    return { weekNo, startDay, endDay };
  };

  const data = generateData();
  const daysPerPage = 7; // Number of days per page
  const [currentPage, setCurrentPage] = useState(1);

  const groupedData = data.reduce((result, item) => {
    const weekNo = item.week_no;
    if (!result[weekNo]) {
      result[weekNo] = [];
    }
    result[weekNo].push(item);
    return result;
  }, {});

  const highlightedRanges = dupaItemSchedule;
  const columns = groupedData[currentPage]
    ? groupedData[currentPage].map((dayData, index) => ({
        title: index === 0 ? `Week ${dayData.week_no}` : "",
        dataIndex: `day_${dayData.day_no}`,
        key: `day_${dayData.day_no}`,
        colSpan: index === 0 ? 7 : 0,
        render: (text, record) => {
          const hasDecimal = /\./.test(text); // Check if text has a decimal number

          return {
            props: {
              style: {
                background: hasDecimal ? "blue" : "transparent",
                color: record.someOtherField === "someValue" ? "blue" : "black",
                borderBottom: "2px solid #e8e8e8",
              },
            },
            children: hasDecimal ? (
              <div style={{ color: "yellow" }}>{text}</div>
            ) : (
              <div>{text}</div>
            ),
          };
        },
      }))
    : [];

  let totalDuration = 0;
  const dataSource = [
    {
      key: "1",
      ...groupedData[currentPage]?.reduce((result, dayData) => {
        if (dayData.day_no) {
          result[`day_${dayData.day_no}`] = dayData.day_no;
        }
        return result;
      }, {}),
    },
    {
      key: "highlighted",
      ...highlightedRanges.reduce((result, range) => {
        let weekSum = 0;
        totalDuration = parseInt(range.duration_no) + parseInt(range.day_no);

        for (let i = parseInt(range.day_no); i < totalDuration; i++) {
          weekSum += 1; // Add 1 to the sum for each highlighted day

          // If it's the 7th day or the last day, update the sums array
          if (i % 7 === 0 || i === totalDuration - 1) {
            for (let j = i; j > i - weekSum; j--) {
              let rate =
                dupaItemData.quantity * (weekSum / dupaItemData.duration);
              result[`day_${j}`] = parseFloat(rate).toFixed(2);
            }
            weekSum = 0; // Reset the sum for the next 7 days
          }
        }

        return result;
      }, {}),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginationConfig = {
    current: currentPage,
    total: endDuration.current.endDay,
    pageSize: daysPerPage,
    onChange: handlePageChange,
    showSizeChanger: false,
    itemRender: (current, type, originalElement) => {
      if (type === "page") {
        return <span> W {current}</span>;
      }

      return originalElement;
    },
  };

  const tableStyle = {
    borderCollapse: "collapse", // Set border-collapse to collapse
    border: "2px solid #e8e8e8",
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ marginBottom: 10 }}>
        <Button onClick={handleCancel} icon={<BiArrowBack />}></Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={paginationConfig}
        style={tableStyle} // Apply the custom style
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
      >
        {/* <Pagination {...paginationConfig} /> */}
      </div>
    </div>
  );
}

export default ViewWorkSchedule;
