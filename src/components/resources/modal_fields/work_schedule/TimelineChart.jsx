import React, { Component, useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import { Radio } from "antd";
const TimelineChart = ({
  workSchedule,
  dates,
  setDates,
  maxYlabel,
  buttonRef,
}) => {
  const [timelineY, setTimelineY] = useState([]);
  const [barOptions, setBarOptions] = useState({});
  const maxMonth = useRef(0);

  const handleChange = (e) => {
    setDates({
      date: e.target.value,
    });
  };

  useEffect(() => {
    const data = [];
    const temp_data = [];

    if (workSchedule != null) {
      workSchedule.map((dupa, i) => {
        dupa.b3_project.program_of_work.pow_table.map((pow_contents, i2) => {
          pow_contents.contents.map((dupa_items, i3) => {
            dupa_items.dupa_items_per_project.map((items_per_project, i4) => {
              items_per_project.dupa_per_project.work_schedule_item.schedule.map(
                (scheds, i5) => {
                  temp_data.push({
                    week: parseInt(scheds.week_no),
                    duration: parseInt(scheds.duration_no),
                  });
                  if (maxYlabel.current < parseInt(scheds.week_no)) {
                    maxYlabel.current = parseInt(scheds.week_no);
                    maxMonth.current = Math.ceil(parseInt(scheds.week_no) / 4);
                  }
                  if (scheds != null) {
                    // if (dates.date == "monthly") {
                    // } else {
                    if (parseInt(scheds.duration_no) == 1) {
                      data.push({
                        x: items_per_project.dupa_per_project.description,
                        y: [
                          parseInt(scheds.day_no),
                          parseInt(scheds.day_no) + 0.5,
                        ],
                        week: parseInt(scheds.week_no),
                        duration: parseInt(scheds.duration_no),
                        total_days: parseInt(
                          items_per_project.dupa_per_project.work_schedule_item
                            .duration
                        ),
                        quantity: parseInt(items_per_project.quantity),
                      });
                    } else {
                      data.push({
                        x: items_per_project.dupa_per_project.description,
                        y: [
                          parseInt(scheds.day_no),
                          parseInt(scheds.day_no) +
                            parseInt(scheds.duration_no) -
                            1,
                        ],
                        week: parseInt(scheds.week_no),
                        duration: parseInt(scheds.duration_no),
                        total_days: parseInt(
                          items_per_project.dupa_per_project.work_schedule_item
                            .duration
                        ),
                        quantity: parseInt(items_per_project.quantity),
                      });
                    }
                    // }
                  }
                }
              );
            });
          });
        });
      });

      setBarOptions({
        chart: {
          type: "rangeBar",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: true,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        grid: {
          row: {
            colors: ["#e5e5e5", "transparent"],
            opacity: 0.5,
          },
          column: {
            colors: ["#f8f8f8", "transparent"],
            opacity: 0.2,
          },
          xaxis: {
            lines: {
              show: false,
            },
          },
        },

        dataLabels: {
          enabled: true,
          textAnchor: "middle",
          // offsetX: -18,
          // offsetY: -10,
          style: {
            fontSize: "14px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold",
            colors: ["white"],
          },
          formatter: function (value, { seriesIndex, dataPointIndex, w }) {
            let a =
              w.config.series[0].data[dataPointIndex].quantity *
              (w.config.series[0].data[dataPointIndex].duration /
                w.config.series[0].data[dataPointIndex].total_days);
            return a.toFixed(2);
          },
        },
        tooltip: {
          enabled: true,
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return (
              "Week: " +
              w.config.series[0].data[dataPointIndex].week +
              '<div class="arrow_box">' +
              "<span>" +
              "Day: " +
              w.config.series[0].data[dataPointIndex].y[0] +
              " " +
              "-" +
              " " +
              "Day: " +
              Math.floor(w.config.series[0].data[dataPointIndex].y[1]) +
              " " +
              "</span>" +
              "</div>"
            );
          },
        },
        yaxis: {
          min: 1,
          max: () => {
            if (dates.date == "weekly") {
              return maxYlabel.current * 7;
            }
            if ((maxYlabel.current * 7) % 28 === 0) {
              return maxYlabel.current * 7;
            }
            return (
              maxYlabel.current * 7 + (28 - ((maxYlabel.current * 7) % 28))
            );
          },
        },
        xaxis: {
          min: 1,
          max: () => {
            if (dates.date == "weekly") {
              return maxYlabel.current * 7;
            }
            if ((maxYlabel.current * 7) % 28 === 0) {
              return maxYlabel.current * 7;
            }
            return (
              maxYlabel.current * 7 + (28 - ((maxYlabel.current * 7) % 28))
            );
          },
          // stepSize: 7,
          tickAmount:
            dates.date == "weekly"
              ? maxYlabel.current
              : (maxYlabel.current * 7) / 28,
          labels: {
            formatter: function (value, timestamp, opts) {
              let default_label = "W: " + Math.ceil((Math.ceil(value) + 6) / 7);
              if (dates.date == "monthly") {
                default_label =
                  "M: " + (Math.ceil((Math.ceil(value) + 6) / 7) + 3) / 4;
              }
              return default_label;
            },
          },
          // tickPlacement: "between",
          axisTicks: {
            show: true,
            borderType: "solid",
            color: "#78909C",
            width: 6,
            offsetX: 10,
            offsetY: 0,
          },
        },
      });
    }

    setTimelineY(data);
  }, [workSchedule, dates]);
  return (
    <div style={{ position: "absolute", left: "0", top: "0", width: "100%" }}>
      <Radio.Group
        defaultValue={"weekly"}
        onChange={handleChange}
        ref={buttonRef}
      >
        {/* <Radio.Button value="daily">Daily</Radio.Button> */}
        <Radio.Button value="weekly">Weekly</Radio.Button>
        <Radio.Button value="monthly">Monthly</Radio.Button>
      </Radio.Group>
      <Chart
        options={barOptions}
        series={[{ data: timelineY, name: "timeline" }]}
        type="rangeBar"
        height="350"
      />
    </div>
  );
};

export default TimelineChart;
