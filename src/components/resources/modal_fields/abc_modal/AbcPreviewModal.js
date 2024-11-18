import React, { useEffect, useRef, useState } from "react";
import FileHeader from "../../FileHeader";
import { Button, Col, Divider, Row, Space } from "antd";
import { useReactToPrint } from "react-to-print";
import TableComponents from "../../TableComponents";
import { PrinterOutlined } from "@ant-design/icons";

const AbcPreviewModal = ({
  abcData,
  abcContent,
  isSetShowModal,
  tableData,
}) => {
  const componentRef = useRef();
  const [isloading, setLoading] = useState(true);
  const [dataFiltered, setDataFiltered] = useState(null);

  //HANDLE PRINTING
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //SET UP TABLE COLUMS
  const table_columns = [
    {
      title: "Item Code",
      dataIndex: "item_code",
      key: "item_code",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
    },
    {
      title: "Estimated Cost",
      dataIndex: "estimated_cost",
      key: "estimated_cost",
      align: "center",
    },
    {
      title: "Total Mark-up",
      dataIndex: "",
      key: "",
      align: "center",
      children: [
        {
          title: "%",
          dataIndex: "percentage",
          key: "percentage",
          align: "center",
        },
        {
          title: "Value",
          dataIndex: "markup_value",
          key: "markup_value",
          align: "center",
        },
      ],
    },
    {
      title: "VAT",
      dataIndex: "vat",
      key: "vat",
      align: "center",
    },
    {
      title: "Total Indirect Cost",
      dataIndex: "indirect_cost",
      key: "indirect_cost",
      align: "center",
    },
    {
      title: "Total Cost",
      dataIndex: "total_cost",
      key: "total_cost",
      align: "center",
    },
  ];

  // MODAL HANLDE CANCEL
  const handleCancel = () => {
    isSetShowModal(false);
  };

  // DISPLAY TO THE DATA TABLE USEEFFECT
  useEffect(() => {
    const contentData = () => {
      if (abcContent && abcContent.length > 0) {
        const filteredSource = {};
        const totalData = [];
        abcContent.forEach((content) => {
          content.b3_project.pow_table.forEach((table, index) => {
            const headData = {
              id: table.id,
              item_code: "Part " + parseInt(index + 1),
              description: table.sow_category_name,
              estimated_cost: "",
              percentage: "",
              markup_value: "",
              vat: "",
              indirect_cost: "",
              total_cost: "",
            };

            if (!filteredSource[table.id]) {
              filteredSource[table.id] = [];
            }

            filteredSource[table.id].push(headData);
            table.contents.forEach((subContent) => {
              const subcon = {
                item_code: subContent.sow_sub_item_code,
                description: subContent.sow_sub_caterory_name,
                estimated_cost: subContent.total_per_letter,
                percentage: subContent.percentage * 100 + "%",
                markup_value: subContent.markup_value_per_letter,
                vat: subContent.vat_per_letter,
                indirect_cost: subContent.indirect_cost_per_letter,
                total_cost: subContent.cost_per_letter,
              };

              filteredSource[table.id].push(subcon);
            });

            const partTotalData = {
              item_code: "",
              description: (
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                  TOTAL OF Part {parseInt(index + 1)}
                </div>
              ),
              estimated_cost: table.total_per_part,
              percentage: table.percentage * 100 + "%",
              markup_value: table.total_markup_value_per_part_number,
              vat: table.total_vat_per_part_number,
              indirect_cost: table.total_indirect_cost_per_part_number,
              total_cost: table.total_cost_per_part_number,
            };
            filteredSource[table.id].push(partTotalData);

            const totalDrainage = {
              item_code: "",
              description: (
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                  TOTAL OF (ROAD AND DRAINAGE)
                </div>
              ),
              estimated_cost: content.road_and_drainage_total,
              percentage: content.percentage * 100 + "%",
              markup_value: content.road_and_drainage_markup_value,
              vat: content.road_and_drainage_vat,
              indirect_cost: content.road_and_drainage_indirect_cost,
              total_cost: content.road_and_drainage_cost,
            };
            filteredSource[table.id].push(totalDrainage);
            const finalTotal = {
              item_code: "",
              description: (
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                  TOTAL
                </div>
              ),
              estimated_cost: tableData.grand_total,
              percentage: "",
              markup_value: tableData.overall_markup_value,
              vat: tableData.overall_vat,
              indirect_cost: tableData.overall_indirect_cost,
              total_cost: tableData.overall_cost,
            };
            filteredSource[table.id].push(finalTotal);
          });
        });
        setDataFiltered(filteredSource);
      }
      setLoading(false);
    };
    contentData();
  }, [abcContent]);

  return (
    <div>
      <div className="prev-container" ref={componentRef}>
        <FileHeader />
        <Divider />
        <Row>
          <Col span={24} align="center" className="preview-abc">
            {abcData.abc_content !== 0 ? (
              <p>{abcData.b3_project.project_title},</p>
            ) : (
              <p>Project title</p>
            )}

            {abcData.abc_content !== 0 ? (
              <p>{abcData.b3_project.location}</p>
            ) : (
              <p>Project location</p>
            )}

            <b>APPROVED BUDGET for the CONTRACT</b>
          </Col>

          <Col span={24} align="center">
            {dataFiltered &&
              Object.keys(dataFiltered).map((id, index) => (
                <React.Fragment key={id}>
                  <p className="quantity-proj" key={id} style={{ padding: 10 }}>
                    {abcData.b3_project.project_nature_id === 1
                      ? "Street " + parseInt(index + 1)
                      : "Building " + parseInt(index + 1)}
                  </p>
                  <Col span={24} align="center">
                    <TableComponents
                      loading={isloading}
                      className="project-table"
                      columns={table_columns}
                      dataSource={dataFiltered[id]}
                      pagination={false}
                    />
                  </Col>
                </React.Fragment>
              ))}
          </Col>
        </Row>
      </div>
      <Divider />
      <Col style={{ textAlign: "right" }}>
        <Space>
          <Button
            onClick={handleCancel}
            type="default"
            style={{
              marginBottom: 10,
              paddingLeft: 35,
              paddingRight: 35,
            }}
          >
            Cancel
          </Button>

          <Button
            // onClick={}
            type="primary"
            icon={<PrinterOutlined />}
            style={{
              marginBottom: 10,
              paddingLeft: 35,
              paddingRight: 35,
            }}
          >
            Export
          </Button>

          <Button
            onClick={handlePrint}
            type="primary"
            icon={<PrinterOutlined />}
            style={{
              backgroundColor: "#176B87",
              marginBottom: 10,
              paddingLeft: 35,
              paddingRight: 35,
            }}
          >
            Print
          </Button>
        </Space>
      </Col>
    </div>
  );
};

export default AbcPreviewModal;
