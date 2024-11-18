import React, { useState, useRef, useEffect } from 'react';
import { Button, Col, Divider, Row, Space, Spin, Table, Pagination, Progress } from "antd";
import { BiArrowBack } from 'react-icons/bi';
import FileHeader from '../../FileHeader';
import { useReactToPrint } from 'react-to-print';
import { PrinterOutlined } from "@ant-design/icons";
import Chart from 'chart.js/auto';

function PreviewWorkSchedule({
  projectData,
  workScheduleWithDupa,
  projectDuration,
}) {
  const componentRef = useRef();

  let inputData = []
  let workSchedData = []
  workScheduleWithDupa.map((value, i) => {
    value.b3_project.program_of_work.pow_table.map((part_numbers, index) => {
      let counter = 1
      workSchedData.push({
        key: i + '-' + index,
        item_code: <strong>{part_numbers.sow_category.item_code.toUpperCase()}</strong>,
        description: <strong>{part_numbers.sow_category.name.toUpperCase()}</strong>,
      });
      part_numbers.contents.map((part_letters, index2) => {
        workSchedData.push({
          key: i + '-' + index + '-' + index2,
          item_code: <strong>{`PART ${convertNumberToLetter(
            parseInt(counter++)
          )}`}</strong>,
          description: <strong>{part_letters.sow_subcategory.name}</strong>,
        });
        part_letters.dupa_items_per_project.map((dupas, index3) => {
          workSchedData.push({
            key: i + '-' + index + '-' + index2 + '-' + index3,
            work_sched_item_id: dupas.id,
            item_code: dupas.dupa_per_project.item_number,
            description: dupas.dupa_per_project.description,
            quantity: dupas.quantity,
            unit: dupas.dupa_per_project.measures.abbreviation,
            duration_of_days: dupas.dupa_per_project.work_schedule_item.duration,
            work_schedule: [dupas.id, dupas.dupa_per_project.work_schedule_item.schedule],
          });

          dupas.dupa_per_project.work_schedule_item.schedule.map((sched, index4) => {
            inputData.push({
              key: i + '-' + index + '-' + index2 + '-' + index3,
              week_no: sched.week_no,
              day_no: sched.day_no,
              duration_no: sched.duration_no,
              quantity: dupas.quantity,
              duration_of_days: dupas.dupa_per_project.work_schedule_item.duration,
            })
          })
        })
      })
    })
  })

  const dataSource = []
  dataSource.push(...workSchedData)

  function convertNumberToLetter(number) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number >= 1 && number <= 26) {
      return letters[number - 1];
    } else {
      return "Invalid Input";
    }
  }

  const getWeekNumber = (day) => {
    const weekNo = Math.ceil(day / 7);
    return weekNo;
  };

  const columns = [
    {
      title: 'ITEM CODE',
      dataIndex: 'item_code',
      key: 'item_code',
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'QUANTITY',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'UNIT',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'DURATION # OF DAYS',
      dataIndex: 'duration_of_days',
      key: 'duration_of_days',
    },
    ...generateWeekColumns(1, 7, getWeekNumber(projectDuration), inputData)
  ];

  function generateWeekColumns(start, end, numberOfWeeks, inputData) {
    const columns = [];
    for (let weekIndex = 1; weekIndex <= numberOfWeeks; weekIndex++) {
      const weekTitle = `Week ${weekIndex}`;
      const weekStart = start + (weekIndex - 1) * 7;
      const weekEnd = Math.min(end + (weekIndex - 1) * 7, weekIndex * 7);
      const weekNumbers = generateWeekNumbers(weekStart, weekEnd);
      columns.push({
        title: weekTitle,
        key: weekTitle,
        children: weekNumbers.map((weekNumber, index) => ({
          title: weekNumber,
          dataIndex: `weeks${weekIndex}[${index}]`,
          key: `week${weekIndex}-${weekNumber}`,
          render: (_, record) => {
            const rowKey = record.key;
            const rowData = inputData.find(dataItem => dataItem.key === rowKey);
            if (rowData && rowData.key === rowKey) {
              const totalDays = parseInt(rowData.day_no) + parseInt(rowData.duration_no);
              let rate = 0;
              let counter = 0
              for (let i = parseInt(rowData.day_no); i < totalDays; i++) { //
                counter += 1;
                if (i % 7 === 0 || i === totalDays - 1) {
                  for (let j = i; j > i - counter; j--) {
                    if (`week${weekIndex}-${j}` === `week${weekIndex}-${weekNumber}`) {
                      rate = rowData.quantity * (counter / rowData.duration_of_days);
                      let subtract = (counter % 2) == 0 ? counter / 2 : (counter - 1) / 2
                      if (j === i - subtract) {
                        return {
                          children: <div style={{ padding: 2 }}>
                            <strong>{rate.toFixed(2)}</strong>
                          </div>,
                          props: {
                            style: {
                              background: weekIndex % 2 ? '#d9e4fa' : '#ffdbdf',
                              borderTop: '1px solid black',
                              borderBottom: '1px solid black',
                              borderRight: counter == 1 ? '1px solid black' : '',
                              borderLeft: counter <= 2 ? '1px solid black' : ''
                            },
                          },
                        };
                      }
                      return {
                        props: {
                          style: {
                            background: weekIndex % 2 ? '#d9e4fa' : '#ffdbdf',
                            borderTop: '1px solid black',
                            borderBottom: '1px solid black',
                            borderRight: j == i ? '1px solid black' : '',
                            borderLeft: j == i - (counter - 1) ? '1px solid black' : ''
                          },
                        }
                      };
                    }
                  }
                  let span = counter
                  counter = 0
                }
              }
              counter = 0
            }
            return null;
          },
        })),
      });
    }
    return columns;
  }

  function generateWeekNumbers(start, end) {
    const weekNumbers = [];
    for (let i = start; i <= end; i++) {
      weekNumbers.push(i);
    }
    return weekNumbers;
  }
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    if (chartRef.current && chartRef.current.getContext) {
      const ctx = chartRef.current.getContext('2d');

      if (chartInstance) {
        chartInstance.destroy(); // Destroy previous chart instance
      }
      const firstRow = [2.51, 3.35, 2.62, 3.18, 8.53, 16.77, 10.32, 13.73, 6.73, 4.73, 3.40, 9.28, 14.85];
      const secondRow = [2.51, 5.86, 8.48, 11.66, 20.19, 36.96, 47.28, 61.01, 67.74, 72.47, 75.87, 85.15, 100.00];

      chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12', 'Week 13',],
          datasets: [{
            label: 'S-Curve',
            data: [
              { x: 0, y: 2.51 },
              { x: 0, y: 5.86 },
              { x: 0, y: 8.48 },
              { x: 0, y: 11.66 },
              { x: 0, y: 20.19 },
              { x: 0, y: 36.96 },
              { x: 0, y: 47.28 },
              { x: 0, y: 61.01 },
              { x: 0, y: 67.74 },
              { x: 0, y: 72.47 },
              { x: 0, y: 75.87 },
              { x: 0, y: 85.15 },
              { x: 0, y: 100.100 },
            ],
            borderColor: 'blue',
            fill: false,
          }]
        },
        options: {
          scales: {
            x: {
              display: true,
              title: {
                display: false,
                text: 'Progress (%)'
              },
              ticks: {
                callback: (value, index, values) => {
                  return [firstRow[index] + '%', secondRow[index] + '%'];
                }
              }
            },
            y: {
              display: false,
              ticks: {
                callback: (value, index, values) => {
                  return value + '%';
                },
                min: 0, // Start the y-axis from 0%
                max: 100, // End the y-axis at 100%
                stepSize: 10 // Increment by 10%
              }
            }
          },
          plugins: {
            legend: {
              display: false // Hide the legend
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy chart instance on component unmount
      }
    };
  }, []);

  return (
    <div>
      <div ref={componentRef}>
        <FileHeader />
        <Divider />
        <Row>
          <Col span={14}>
            <p className="work-schedule">
              <strong>B ID#: </strong> 202305
            </p>
            <p className="work-schedule">
              <strong>Project Registry No.(DED): </strong>
              {projectData?.registry_no}
            </p>
            <p className="work-schedule">
              <strong>Project Name: </strong>
              {projectData?.project_title}
            </p>
            <p className="work-schedule">
              <strong>Location: </strong>
              {projectData?.location}
            </p>
          </Col>
          <Col span={24} align="center">
            <p className="quantity-proj">Work Schedule</p>
          </Col>
        </Row>
        <div style={{ marginTop: 20, marginBottom: 50 }}>
          <div style={{ overflow: 'auto' }}>
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false} // You can enable pagination if needed
            />
          </div>
        </div>
        < Divider />
        <div>
          <canvas ref={chartRef} width="800" height="400"></canvas>
        </div>
      </div>
      <div>
        < Divider />
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            onClick={handlePrint}
            type="primary"
            className="btn-add-area"
            style={{
              marginBottom: 10,
              marginTop: 20,
              paddingLeft: 35,
              paddingRight: 35,
              backgroundColor: "#176B87",
            }}
          >
            <PrinterOutlined /> Print
          </Button>
        </div>
      </div>
    </div>
  );

};

export default PreviewWorkSchedule;
