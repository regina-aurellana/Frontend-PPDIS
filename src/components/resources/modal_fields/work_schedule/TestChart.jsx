// TestChart.js
import React, { useEffect, useState, useRef } from "react";
import Chart from "react-apexcharts";

const TestChart = ({ workSchedule, dates, setDates, maxYlabel }) => {
  const [totalCost, setTotalCost] = useState(0);
  const [seriesData, setSeriesData] = useState([]);
  const totalCostRef = useRef(0);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "S-Curve",
        data: [],
        type: "line",
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      markers: {
        size: 0,
      },
      colors: ["#FF1654", "#247BA0"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      // title: {
      //   text: "S - Curve",
      //   align: "left",
      // },
      grid: {
        show: false,
        // row: {
        //   colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        //   opacity: 0.5,
        // },
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
    },
  });

  useEffect(() => {
    const temp_data = [];
    const temp_categ = [];
    const quantity_of_work = [];
    if (workSchedule) {
      workSchedule.map((per_work_sched, i1) => {
        per_work_sched.b3_project.program_of_work.pow_table.map(
          (pow_table_data, i2) => {
            pow_table_data.contents.map((pow_contents, i3) => {
              pow_contents.dupa_items_per_project.map(
                (items_per_project, i4) => {
                  totalCostRef.current += parseFloat(
                    items_per_project.total_estimated_direct_cost
                  );
                  items_per_project.dupa_per_project.work_schedule_item.schedule.map(
                    (scheds, i5) => {
                      temp_data.push({
                        week_no: scheds.week_no,
                        week_duration: scheds.duration_no,
                        item_duration:
                          items_per_project.dupa_per_project.work_schedule_item
                            .duration,
                        quantity: items_per_project.quantity,
                        unit_cost:
                          items_per_project.dupa_per_project.direct_unit_cost,
                      });
                    }
                  );
                }
              );
            });
          }
        );
      });

      temp_data.map((data, i) => {
        quantity_of_work.push({
          week: data.week_no,
          unit_cost: data.unit_cost,
          q_work: (
            ((parseFloat(data.quantity) *
              (parseFloat(data.week_duration) /
                parseFloat(data.item_duration)) *
              parseFloat(data.unit_cost)) /
              parseFloat(totalCostRef.current)) *
            100
          ).toFixed(4),
        });
      });

      const summedQuantities = quantity_of_work.reduce(
        (accumulator, currentValue) => {
          const existingItem = accumulator.find(
            (item) => item.week === currentValue.week
          );
          if (existingItem) {
            existingItem.q_work += parseFloat(
              parseFloat(currentValue.q_work).toFixed(4)
            );
          } else {
            accumulator.push({
              week: currentValue.week,
              q_work: parseFloat(parseFloat(currentValue.q_work).toFixed(4)),
            });
          }

          return accumulator;
        },
        []
      );

      let runningSum = 0;

      summedQuantities.forEach((item) => {
        runningSum += parseFloat(item.q_work);
        item.q_work = parseFloat(runningSum.toFixed(4));
      });

      // if (dates.date == "monthly") {
      //   let result = [];
      //   for (let i = 3; i < summedQuantities.length; i += 4) {
      //     result.push(summedQuantities[i]);
      //   }

      //   let lastElement = summedQuantities[summedQuantities.length - 1];

      //   if (result[result.length - 1] !== lastElement) {
      //     result.push(lastElement);
      //   }

      //   // console.log("res", result);
      //   result.forEach((data) => {
      //     temp_categ.push({
      //       x: data.week,
      //       y: data.q_work,
      //     });
      //   });
      // } else {
      summedQuantities.forEach((data) => {
        temp_categ.push({
          x: data.week,
          y: data.q_work,
        });
      });
      // }

      setSeriesData(temp_categ);
      console.log("summed", summedQuantities);
    }
  }, [workSchedule]);

  return (
    <div
      style={{
        position: "absolute",
        left: "180px",
        top: "30px",
        width: "100%",
      }}
    >
      {/* {console.log("tc", totalCostRef)} */}
      <Chart
        options={chartData.options}
        series={[{ data: seriesData, name: "S-Curve" }]}
        height={"330px"}
        width={"85%"}
      />
    </div>
  );
};
export default TestChart;
