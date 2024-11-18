import React, { useEffect, useRef, useState } from "react";
import TablePreviewComponent from "../../TablePreviewComponent";
import axios from "axios";
import { Button, Col, Divider, Row, Space, Spin } from "antd";
import { useReactToPrint } from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";
import FileHeader from "../../FileHeader";

import { api } from "../../../../utilities/axios-gateway";

function PreviewPOWModal({
  setIsTableLoading,
  isTableLoading,
  b3ProjectId,
  latestDUPA,
  dupaGroupId,
}) {
  const [fetchPreviewPOWData, setFetchPreviewPOWData] = useState(null);

  // FETCHING POW DATA
  const fetchPreviewPOWTable = async () => {
    await api
      .get(`/pow/calculation/content/${b3ProjectId}`)
      .then(function (response) {
        setFetchPreviewPOWData(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Item Code",
      dataIndex: "item_code",
      key: "item_code",
      width: "10%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "25%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Estimated Direct Cost",
      dataIndex: "estimated_direct_cost",
      key: "estimated_direct_cost",
      width: "15%",
    },
    {
      title: "% OCM",
      dataIndex: "ocm",
      key: "ocm",
      width: "7%",
    },
    {
      title: "% profit",
      dataIndex: "profit",
      key: "profit",
      width: "8%",
    },
    {
      title: "%",
      dataIndex: "mark_up_percentage",
      key: "mark_up_percentage",
    },
    {
      title: "Value",
      dataIndex: "mark_up_value",
      key: "mark_up_value",
    },
    {
      title: "VAT",
      dataIndex: "vat",
      key: "vat",
    },
    {
      title: "Total Indirect Cost",
      dataIndex: "indirect_cost",
      key: "indirect_cost",
      width: "10%",
    },
    {
      title: "Total Cost",
      dataIndex: "total_cost",
      key: "total_cost",
      width: "8%",
    },
    {
      title: "Unit Cost",
      dataIndex: "unit_cost",
      key: "unit_cost",
    },
  ];

  function romanize(num) {
    var lookup = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
      },
      roman = "",
      i;
    for (i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }

  function convertNumberToLetter(number) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (number >= 1 && number <= 26) {
      return letters[number - 1];
    } else {
      return "Invalid Input";
    }
  }

  const componentRef = useRef();

  //HANDLE PRINTING
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  let tableContent;
  let POWdupaContent = [];

  if (fetchPreviewPOWData && fetchPreviewPOWData.length > 0) {
    tableContent = fetchPreviewPOWData.map((structure, structureIndex) => {
      POWdupaContent = [];
      structure.pow_table.map((part_numbers, index) => {
        let counter = 1;

        const item_code = "";
        const description = `TOTAL PART ${romanize(parseInt(index + 1))}`;
        const quantity = "";
        const unit = "";
        const estimated_direct_cost = `${part_numbers.total_per_part}`;
        const ocm = "";
        const profit = "";
        const mark_up_percentage = `${part_numbers.percentage}`;
        const mark_up_value = `${part_numbers.total_markup_value_per_part_number}`;
        const vat_per_dupa = `${part_numbers.total_vat_per_part_number}`;
        const indirect_cost = `${part_numbers.total_indirect_cost_per_part_number}`;
        const total_cost = `${part_numbers.total_cost_per_part_number}`;
        const unit_cost = "";

        // if (part_numbers.total_per_part) {
        POWdupaContent.push({
          item_code: <strong>{`PART ${romanize(parseInt(index + 1))}`}</strong>,
          description: <strong>{part_numbers.part_number_sowcat_name_}</strong>,
          quantity: "",
          unit: "",
          estimated_direct_cost: "",
          ocm: "",
          profit: "",
          mark_up_percentage: "",
          mark_up_value: "",
          vat: "",
          indirect_cost: "",
          total_cost: "",
          unit_cost: "",
        });
        // }

        part_numbers.contents.map((part_letters, index2) => {
          const item_code2 = "";
          const description2 = `TOTAL PART ${convertNumberToLetter(
            parseInt(counter++)
          )}`;
          const quantity2 = "";
          const unit2 = "";
          const estimated_direct_cost2 = `${part_letters.total_per_letter}`;
          const ocm2 = "";
          const profit2 = "";
          const mark_up_percentage2 = `${part_letters.percentage}`;
          const mark_up_value2 = `${part_letters.markup_value_per_letter}`;
          const vat_per_dupa2 = `${part_letters.vat_per_letter}`;
          const indirect_cost2 = `${part_letters.indirect_cost_per_letter}`;
          const total_cost2 = `${part_letters.cost_per_letter}`;
          const unit_cost2 = "";

          // POWdupaContent.push({
          //   item_code: part_letters.part_letter_sub_cat_item_code,
          //   description: part_letters.part_letter_sub_cat_name,
          //   quantity: "",
          //   unit: "",
          //   estimated_direct_cost: "",
          //   ocm: "",
          //   profit: "",
          //   mark_up_percentage: "",
          //   mark_up_value: "",
          //   vat: "",
          //   indirect_cost: "",
          //   total_cost: "",
          //   unit_cost: "",
          // });

          part_letters.dupa_items_per_project.map((dupas, index3) => {
            const item_code3 = `${dupas.item_number}`;
            const description3 = `${dupas.description}`;
            const quantity3 = `${dupas.quantity}`;
            const unit3 = `${dupas.unit_measure_abbreviation}`;
            const estimated_direct_cost3 = `${dupas.total_estimated_direct_cost}`;
            const ocm3 = `${dupas.ocm}`;
            const profit3 = `${dupas.profit}`;
            const mark_up_percentage3 = `${dupas.percentage}`;
            const mark_up_value3 = `${dupas.markup_value_per_dupa}`;
            const vat_per_dupa3 = `${dupas.vat_per_dupa}`;
            const indirect_cost3 = `${dupas.indirect_cost_per_dupa}`;
            const total_cost3 = `${dupas.cost_per_dupa}`;
            const unit_cost3 =
              parseFloat(`${dupas.quantity}`).toFixed(2) *
              parseFloat(`${dupas.cost_per_dupa}`).toFixed(2);

            POWdupaContent.push({
              item_code: item_code3,
              description: description3,
              quantity: quantity3,
              unit: unit3,
              estimated_direct_cost: parseFloat(estimated_direct_cost3).toFixed(
                2
              ),
              ocm: ocm3,
              profit: profit3,
              mark_up_percentage: mark_up_percentage3,
              mark_up_value: mark_up_value3,
              vat: parseFloat(vat_per_dupa3).toFixed(2),
              indirect_cost: parseFloat(indirect_cost3).toFixed(2),
              total_cost: parseFloat(total_cost3).toFixed(2),
              unit_cost: parseFloat(unit_cost3).toFixed(2),
            });
          });

          POWdupaContent.push({
            item_code: item_code2,
            description: <strong>{description2}</strong>,
            quantity: quantity2,
            unit: unit2,
            estimated_direct_cost: (
              <strong>{parseFloat(estimated_direct_cost2).toFixed(2)}</strong>
            ),
            ocm: ocm2,
            profit: profit2,
            mark_up_percentage: <strong>{mark_up_percentage2}</strong>,
            mark_up_value: <strong>{mark_up_value2}</strong>,
            vat: <strong>{parseFloat(vat_per_dupa2).toFixed(2)}</strong>,
            indirect_cost: (
              <strong>{parseFloat(indirect_cost2).toFixed(2)}</strong>
            ),
            total_cost: <strong>{parseFloat(total_cost2).toFixed(2)}</strong>,
            unit_cost: <strong>{unit_cost2}</strong>,
          });
        });

        if (part_numbers.grand_total) {
          POWdupaContent.push({
            item_code: item_code,
            description: <strong>{description}</strong>,
            quantity: quantity,
            unit: unit,
            estimated_direct_cost: (
              <strong>{parseFloat(estimated_direct_cost).toFixed(2)}</strong>
            ),
            ocm: ocm,
            profit: profit,
            mark_up_percentage: <strong>{mark_up_percentage}</strong>,
            mark_up_value: <strong>{mark_up_value}</strong>,
            vat: <strong>{parseFloat(vat_per_dupa).toFixed(2)}</strong>,
            indirect_cost: (
              <strong>{parseFloat(indirect_cost).toFixed(2)}</strong>
            ),
            total_cost: <strong>{parseFloat(total_cost).toFixed(2)}</strong>,
            unit_cost: <strong>{unit_cost}</strong>,
          });

          if (fetchPreviewPOWData.length > 1) {
            if (structure.road_and_drainage_total) {
              POWdupaContent.push({
                item_code: "",
                description: <strong>TOTAL OF (Road and Drainage)</strong>,
                quantity: "",
                unit: "",
                estimated_direct_cost: (
                  <strong>
                    {parseFloat(structure.road_and_drainage_total).toFixed(2)}
                  </strong>
                ),
                ocm: "",
                profit: "",
                mark_up_percentage: "",
                mark_up_value: (
                  <strong>
                    {parseFloat(
                      structure.road_and_drainage_markup_value
                    ).toFixed(2)}
                  </strong>
                ),
                vat: (
                  <strong>
                    {parseFloat(structure.road_and_drainage_vat).toFixed(2)}
                  </strong>
                ),
                indirect_cost: (
                  <strong>
                    {parseFloat(
                      structure.road_and_drainage_indirect_cost
                    ).toFixed(2)}
                  </strong>
                ),
                total_cost: (
                  <strong>
                    {parseFloat(structure.road_and_drainage_cost).toFixed(2)}
                  </strong>
                ),
                unit_cost: "",
              });
            }

            if (structure.grand_total) {
              POWdupaContent.push({
                item_code: "",
                description: <strong>GRAND TOTAL</strong>,
                quantity: "",
                unit: "",
                estimated_direct_cost: (
                  <strong>
                    {parseFloat(structure.grand_total).toFixed(2)}
                  </strong>
                ),
                ocm: "",
                profit: "",
                mark_up_percentage: "",
                mark_up_value: (
                  <strong>
                    {parseFloat(structure.overall_markup_value).toFixed(2)}
                  </strong>
                ),
                vat: (
                  <strong>
                    {parseFloat(structure.overall_vat).toFixed(2)}
                  </strong>
                ),
                indirect_cost: (
                  <strong>
                    {parseFloat(structure.overall_indirect_cost).toFixed(2)}
                  </strong>
                ),
                total_cost: (
                  <strong>
                    {parseFloat(structure.overall_cost).toFixed(2)}
                  </strong>
                ),
                unit_cost: "",
              });
            }
          }
        }
      });
      return (
        <div style={{ marginTop: 20 }}>
          <h3 className="text-red" style={{ textAlign: "center" }}>
            {structure.b3_project.project_nature_id === 1
              ? "Street " + parseInt(structureIndex + 1)
              : "Building " + parseInt(structureIndex + 1)}
          </h3>
          <TablePreviewComponent
            loading={isTableLoading}
            className="preview-pow-table"
            columns={columns}
            dataSource={POWdupaContent}
            pagination={false}
          />
        </div>
      );
    });

    if (fetchPreviewPOWData.length == 1) {
      let structure = fetchPreviewPOWData[0];

      if (structure.road_and_drainage_total) {
        POWdupaContent.push({
          item_code: "",
          description: <strong>TOTAL OF (Road and Drainage)</strong>,
          quantity: "",
          unit: "",
          estimated_direct_cost: (
            <strong>
              {parseFloat(structure.road_and_drainage_total).toFixed(2)}
            </strong>
          ),
          ocm: "",
          profit: "",
          mark_up_percentage: "",
          mark_up_value: (
            <strong>
              {parseFloat(structure.road_and_drainage_markup_value).toFixed(2)}
            </strong>
          ),
          vat: (
            <strong>
              {parseFloat(structure.road_and_drainage_vat).toFixed(2)}
            </strong>
          ),
          indirect_cost: (
            <strong>
              {parseFloat(structure.road_and_drainage_indirect_cost).toFixed(2)}
            </strong>
          ),
          total_cost: (
            <strong>
              {parseFloat(structure.road_and_drainage_cost).toFixed(2)}
            </strong>
          ),
          unit_cost: "",
        });
      }

      if (structure.grand_total) {
        POWdupaContent.push({
          item_code: "",
          description: <strong>GRAND TOTAL</strong>,
          quantity: "",
          unit: "",
          estimated_direct_cost: (
            <strong>{parseFloat(structure.grand_total).toFixed(2)}</strong>
          ),
          ocm: "",
          profit: "",
          mark_up_percentage: "",
          mark_up_value: (
            <strong>
              {parseFloat(structure.overall_markup_value).toFixed(2)}
            </strong>
          ),
          vat: <strong>{parseFloat(structure.overall_vat).toFixed(2)}</strong>,
          indirect_cost: (
            <strong>
              {parseFloat(structure.overall_indirect_cost).toFixed(2)}
            </strong>
          ),
          total_cost: (
            <strong>{parseFloat(structure.overall_cost).toFixed(2)}</strong>
          ),
          unit_cost: "",
        });
      }
    }
  }

  useEffect(() => {
    fetchPreviewPOWTable();
  }, [b3ProjectId, latestDUPA, dupaGroupId]);

  return (
    <div>
      {POWdupaContent.length == 0 ? (
        <Space direction="vertical" style={{ width: "100%" }}>
          <Spin size="medium">
            <div className="content" />
          </Spin>
          <div style={{ textAlign: "center", marginTop: 10 }}>
            Please wait...
          </div>
        </Space>
      ) : (
        <>
          <div className="prev-container" ref={componentRef}>
            <FileHeader />
            <Divider />
            <Row>
              <Col span={24} align="center" className="preview-abc">
                {fetchPreviewPOWData.length > 0 ? (
                  <p>{fetchPreviewPOWData[0].b3_project.project_title},</p>
                ) : (
                  <p>Project title</p>
                )}

                {fetchPreviewPOWData.length > 0 ? (
                  <p>{fetchPreviewPOWData[0].b3_project.location}</p>
                ) : (
                  <p>Project location</p>
                )}

                <b>Program of Works</b>
              </Col>
            </Row>
            {tableContent}
          </div>
          <div style={{ textAlign: "end", marginTop: 12, marginRight: 12 }}>
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
          </div>
        </>
      )}
    </div>
  );
}

export default PreviewPOWModal;
