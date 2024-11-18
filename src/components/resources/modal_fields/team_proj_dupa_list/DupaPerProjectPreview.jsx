import React, { useEffect, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { Space, Table, Tag } from "antd";
import * as XLSX from "xlsx/xlsx.mjs";
import "../../../../styles/PreviewStyles.css";

const DupaPerProjectPreview = ({
  open,
  cancel,
  content,
  dupa,
  equipmentSource,
}) => {
  const [previewData, setPreviewData] = useState(null);
  const [exportData, setExportData] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(true);

  useEffect(() => {
    if (open && content) {
      const filtered_data = [];
      const export_data = [];
      const labor_content = content.dupa_content.dupa_labor_per_project.map(
        (item, index) => {
          filtered_data.push({
            item: "",
            labor_id: item.labor_id,
            designation: item.designation,
            group: item.group,
            number_of_person: item.no_of_person,
            number_of_hour: item.no_of_hour,
            hourly_rate: item.hourly_rate,
            amount: item.labor_amount,
          });
        }
      );
      filtered_data.push(
        {
          item: "Subtotal:",
          labor_id: "",
          designation: "",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.a_dupaLaborTotal,
        },
        {
          item: "B. Equipment",
          labor_id: "Equipment ID",
          designation: "Name",
          group: "",
          number_of_person: "No. of Unit/s",
          number_of_hour: "No. of Hour/s",
          hourly_rate: "Hourly Rate",
          amount: "Amount",
        }
      );
      const equipment_content =
        content.dupa_content.dupa_equipment_per_project.map((item, index) => {
          filtered_data.push({
            item: "",
            labor_id: item.equipment_id,
            designation: item.name,
            group: "",
            number_of_person: item.no_of_unit,
            number_of_hour: item.no_of_hour,
            hourly_rate: item.hourly_rate,
            amount: item.equipment_amount,
          });
        });
      filtered_data.push(
        {
          item: "Subtotal:",
          labor_id: "",
          designation: "",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.b_dupaEquipmentTotal,
        },
        {
          item: "C.",
          labor_id: "Total (A + B)",
          designation: "",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.c_total_ab,
        },
        {
          item: "D.",
          labor_id: "OUTPUT PER HOUR",
          designation: "",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.e_output_per_hour,
        },
        {
          item: "E.",
          labor_id: "DIRECT UNIT COST (C + D)",
          designation: "",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.d_direct_unit_cost_c_d,
        },
        {
          item: "F. Materials",
          labor_id: "Material ID",
          designation: "Name",
          group: "",
          number_of_person: "Quantity",
          number_of_hour: "",
          hourly_rate: "Unit Cost",
          amount: "Amount",
        }
      );
      const material_content =
        content.dupa_content.dupa_material_per_project.map((item, index) => {
          filtered_data.push({
            item: "",
            labor_id: item.material_id,
            designation: item.name,
            group: "",
            number_of_person: item.quantity,
            number_of_hour: "",
            hourly_rate: item.unit_cost,
            amount: item.material_amount,
          });
        });
      filtered_data.push(
        {
          item: "Subtotal:",
          labor_id: "",
          designation: "",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.f_dupaMaterialTotal,
        },
        {
          item: "G.",
          labor_id: "DIRECT UNIT COST (E + F)",
          designation: "",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.g_direct_unit_cost_e_f,
        }
        // {
        //   item: "H.",
        //   labor_id: "OVERHEAD, CONTINGENCIES & MISCELLANEOUS (OCM)",
        //   designation: "",
        //   group: "",
        //   number_of_person: "",
        //   number_of_hour: "",
        //   hourly_rate: "",
        //   amount: content.h_ocm,
        // },
        // {
        //   item: "I.",
        //   labor_id: "CONTRACTOR'S PROFIT (CP)",
        //   designation: "",
        //   group: "",
        //   number_of_person: "",
        //   number_of_hour: "",
        //   hourly_rate: "",
        //   amount: content.i_contractors_profit,
        // },
        // {
        //   item: "J.",
        //   labor_id: "VALUE ADDED TAX (VAT)",
        //   designation: "",
        //   group: "",
        //   number_of_person: "",
        //   number_of_hour: "",
        //   hourly_rate: "",
        //   amount: content.j_vat,
        // },
        // {
        //   item: "K.",
        //   labor_id: "TOTAL UNIT COST",
        //   designation: "",
        //   group: "",
        //   number_of_person: "",
        //   number_of_hour: "",
        //   hourly_rate: "",
        //   amount: content.k_total_unit_cost,
        // }
      );

      // EXPORT DATA FORMATTING
      export_data.push(
        {
          item: "DETAILED UNIT PRICE ANALYSIS (DUPA)",
          designation: null,
          group: "",
          number_of_person: null,
          number_of_hour: null,
          hourly_rate: null,
          amount: null,
        },
        {
          item:
            "Item Code: " + content.dupa_content.dupa_per_project.item_number,
          designation: null,
          group: null,
          number_of_person: null,
          number_of_hour: null,
          hourly_rate: null,
          amount: null,
        },
        {
          item:
            "Destription: " + content.dupa_content.dupa_per_project.description,
          designation: null,
          group: null,
          number_of_person: null,
          number_of_hour: null,
          hourly_rate: null,
          amount: null,
        },
        {
          item: "Unit: " + dupa?.abbreviation,
          designation: null,
          group: null,
          number_of_person: null,
          number_of_hour: null,
          hourly_rate: null,
          amount: null,
        },
        {
          item:
            "Output/Hr.: " +
            content.dupa_content.dupa_per_project.output_per_hour,
          designation: null,
          group: null,
          number_of_person: null,
          number_of_hour: null,
          hourly_rate: null,
          amount: null,
        },
        {
          item: "",
          designation: "Designation",
          group: "Group",
          number_of_person: "No. of Person",
          number_of_hour: "No. of Hour",
          hourly_rate: "Hourly Rate",
          amount: "Amount (Php)",
        },
        // { item: null,   designation:null,   group:null,number_of_person:null,number_of_hour:null,hourly_rate:null,amount:null},
        {
          item: "A.1",
          designation: "Labor",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        }
      );

      content.dupa_content.dupa_labor_per_project.map((item, index) => {
        export_data.push({
          item: "",
          designation: item.designation,
          group: item.group,
          number_of_person: item.no_of_person,
          number_of_hour: item.no_of_hour,
          hourly_rate: item.hourly_rate,
          amount: item.labor_amount,
        });
      });

      export_data.push(
        {
          item: "",
          designation: "Subtotal for A.1 - As Submitted",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.a_dupaLaborTotal,
        },
        {
          item: "A.2",
          designation: "Labor",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        }
      );

      content.dupa_content.dupa_labor_per_project.map((item, index) => {
        export_data.push({
          item: "",
          designation: "",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        });
      });

      export_data.push(
        {
          item: "",
          designation: "Subtotal for A.2 - As Evaluated",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        },
        {
          item: "\n",
          designation: "Name and Capacity",
          group: "",
          number_of_person: "No. of Unit/s",
          number_of_hour: "No. of Hour/s",
          hourly_rate: "Hourly Rate",
          amount: "Amount (Php)",
        },
        // { item: '',       designation:'',   group:'',   number_of_person:''  ,number_of_hour:''   ,hourly_rate:''   ,amount:''},
        {
          item: "B.1",
          designation: "Equipment",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        }
      );

      content.dupa_content.dupa_equipment_per_project.map((item, index) => {
        export_data.push({
          item: "",
          designation: item.name,
          group: "",
          number_of_person: item.no_of_unit,
          number_of_hour: item.no_of_hour,
          hourly_rate: item.hourly_rate,
          amount: item.equipment_amount,
        });
      });

      export_data.push(
        {
          item: "",
          designation: "Subtotal for B.1 - As Submitted",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.b_dupaEquipmentTotal,
        },
        {
          item: "B.2",
          designation: "Equipment",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        }
      );

      content.dupa_content.dupa_equipment_per_project.map((item, index) => {
        export_data.push({
          item: "",
          designation: "",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        });
      });

      export_data.push(
        {
          item: "",
          designation: "Subtotal for B.2 - As Evaluated",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        },
        {
          item: "C.1",
          designation: "Total (A + B) - As Submitted",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.c_total_ab,
        },
        {
          item: "C.2",
          designation: "Total (A + B) - As Evaluated",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        },
        {
          item: "D.1",
          designation: "Output = - As Submitted",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.e_output_per_hour,
        },
        {
          item: "D.2",
          designation: "Output = - As Evaluated",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        },
        {
          item: "E.1",
          designation: "Direct Unit Cost (C / D) As Submitted",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.d_direct_unit_cost_c_d,
        },
        {
          item: "E.2",
          designation: "Direct Unit Cost (C / D) As Evaluated",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        },
        {
          item: "",
          designation: "Name and Specifications",
          group: "",
          number_of_person: "Unit",
          number_of_hour: "Quantity",
          hourly_rate: "Unit Cost",
          amount: "Amount (Php)",
        },
        // { item: '',       designation:'',   group:'',   number_of_person:''  ,number_of_hour:''   ,hourly_rate:''   ,amount:''},
        {
          item: "F.1",
          designation: "Materials",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        }
      );

      content.dupa_content.dupa_material_per_project.map((item, index) => {
        export_data.push({
          item: "",
          designation: item.name,
          group: "",
          number_of_person: "",
          number_of_hour: item.quantity,
          hourly_rate: item.unit_cost,
          amount: item.material_amount,
        });
      });

      export_data.push(
        {
          item: "",
          designation: "Subtotal for F.1 - As Submitted",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.f_dupaMaterialTotal,
        },
        {
          item: "F.2",
          designation: "Materials",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        }
      );

      content.dupa_content.dupa_material_per_project.map((item, index) => {
        export_data.push({
          item: "",
          designation: "",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        });
      });

      export_data.push(
        {
          item: "",
          designation: "Subtotal for F.2 - As Evaluated",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        },
        {
          item: "G.1",
          designation: "Direct Unit Cost (E + F) - As Submitted",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: content.g_direct_unit_cost_e_f,
        },
        {
          item: "G.2",
          designation: "Direct Unit Cost (E + F) - As Evaluated",
          group: "",
          number_of_person: "",
          number_of_hour: "",
          hourly_rate: "",
          amount: "",
        }
        // {
        //   item: "H.1",
        //   designation:
        //     "Overhead, Contingencies & Miscellaneous (OCM) Expenses - As Submitted 15%",
        //   group: "",
        //   number_of_person: "",
        //   number_of_hour: "",
        //   hourly_rate: "",
        //   amount: content.h_ocm,
        // },
        // {
        //   item: "H.2",
        //   designation:
        //     "Overhead, Contingencies & Miscellaneous (OCM) Expenses - As Submitted ",
        //   group: "",
        //   number_of_person: "",
        //   number_of_hour: "",
        //   hourly_rate: "",
        //   amount: "",
        // },
        // {
        //   item: "I.1",
        //   designation: "Contractors Profit (CP) - As Submitted 10%",
        //   group: "",
        //   number_of_person: "",
        //   number_of_hour: "",
        //   hourly_rate: "",
        //   amount: content.i_contractors_profit,
        // },
        // {
        //   item: "I.2",
        //   designation: "Contractors Profit (CP) - As Evaluated",
        //   group: "",
        //   number_of_person: "",
        //   number_of_hour: "",
        //   hourly_rate: "",
        //   amount: "",
        // },
        // {
        //   item: "J",
        //   designation: "VAT",
        //   group: "",
        //   number_of_person: "",
        //   number_of_hour: "",
        //   hourly_rate: "",
        //   amount: content.j_vat,
        // },
        // {
        //   item: "K",
        //   designation: "Total Unit Cost",
        //   group: "",
        //   number_of_person: "",
        //   number_of_hour: "",
        //   hourly_rate: "",
        //   amount: content.k_total_unit_cost,
        // }
      );

      setPreviewData(filtered_data);
      setExportData(export_data);
    }
  }, [open]);

  const columns = [
    {
      title: "A. Labor",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Labor ID",
      dataIndex: "labor_id",
      key: "labor_id",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
      align: "center",
    },
    {
      title: "No. of person/s",
      dataIndex: "number_of_person",
      key: "number_of_person",
      align: "center",
    },
    {
      title: "No. of Hour/s",
      dataIndex: "number_of_hour",
      key: "number_of_hour",
      align: "center",
    },
    {
      title: "Hourly Rate",
      dataIndex: "hourly_rate",
      key: "hourly_rate",
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
  ];

  const handleOk = () => {
    console.log(exportData);
    const XLSX = require("sheetjs-style");
    const wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(exportData, { skipHeader: true });
    ws["!cols"] = [
      { wch: 15 },
      { wch: 70 },
      { wch: 30 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
      { wch: 15 },
    ];

    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 6 } },
      { s: { r: 3, c: 0 }, e: { r: 3, c: 6 } },
      { s: { r: 4, c: 0 }, e: { r: 4, c: 6 } },
    ];

    function mergeCellsByValues(sheet, valuesToMerge) {
      var range = XLSX.utils.decode_range(sheet["!ref"]);

      for (var R = range.s.r; R <= range.e.r; ++R) {
        for (var C = range.s.c; C <= range.e.c; ++C) {
          var cell_address = { c: C, r: R };
          var cell_ref = XLSX.utils.encode_cell(cell_address);
          var cell = sheet[cell_ref];

          if (
            cell &&
            cell.v !== null &&
            cell.v !== undefined &&
            valuesToMerge.includes(cell.v)
          ) {
            var next_row_address = { c: C, r: R + 1 };
            var next_row_ref = XLSX.utils.encode_cell(next_row_address);

            while (R < range.e.r) {
              var next_cell_address = { c: C, r: R + 1 };
              var next_cell_ref = XLSX.utils.encode_cell(next_cell_address);
              var next_cell = sheet[next_cell_ref];

              if (
                next_cell &&
                next_cell.v !== null &&
                next_cell.v !== undefined &&
                next_cell.v !== ""
              ) {
                break;
              }

              R++;
            }

            sheet["!merges"] = sheet["!merges"] || [];
            sheet["!merges"].push({ s: cell_address, e: { c: C, r: R } });

            // Center the value in the merged cell
            sheet[cell_ref].s = {
              alignment: { horizontal: "center", vertical: "center" },
              font: { bold: true },
            };
          }
        }
      }
    }
    mergeCellsByValues(ws, [
      "DETAILED UNIT PRICE ANALYSIS (DUPA)",
      "A.1",
      "A.2",
      "B.1",
      "B.2",
      "F.1",
      "F.2",
    ]);

    function applyStylesWithoutMerging(sheet, valuesToStyle) {
      var range = XLSX.utils.decode_range(sheet["!ref"]);

      for (var R = range.s.r; R <= range.e.r; ++R) {
        var applyStyleToRow = false;

        for (var C = range.s.c; C <= range.e.c; ++C) {
          var cell_address = { c: C, r: R };
          var cell_ref = XLSX.utils.encode_cell(cell_address);
          var cell = sheet[cell_ref];

          // Check if the current cell has a value in the array
          if (
            cell &&
            cell.v !== null &&
            cell.v !== undefined &&
            valuesToStyle.includes(cell.v)
          ) {
            applyStyleToRow = true;
          }
        }

        if (applyStyleToRow) {
          // Apply styles to all cells in the row (center the values horizontally and vertically)
          for (var C = range.s.c; C <= range.e.c; ++C) {
            var cell_address = { c: C, r: R };
            var cell_ref = XLSX.utils.encode_cell(cell_address);
            sheet[cell_ref].s = {
              alignment: { horizontal: "left", vertical: "center" },
              font: { bold: true },
            };
          }
        }
      }
    }

    applyStylesWithoutMerging(ws, [
      "A.1",
      "A.2",
      "B.1",
      "B.2",
      "C.1",
      "C.2",
      "D.1",
      "D.2",
      "E.1",
      "E.2",
      "F.1",
      "F.2",
      "G.1",
      "G.2",
      "H.1",
      "H.2",
      "I.1",
      "I.2",
      "J",
      "K",
      "Designation",
      "Name and Capacity",
      "Name and Specifications",
    ]);

    XLSX.utils.book_append_sheet(
      wb,
      ws,
      content.dupa_content.dupa_per_project.item_number
    );
    XLSX.writeFile(
      wb,
      content.dupa_content.dupa_per_project.item_number + ".xlsx"
    );
  };

  const handleCancel = () => {
    cancel(false);
  };
  return (
    <Modal
      title="DUPA DETAILS PREVIEW"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1600}
      okText="Export (.xlsx)"
    >
      {!content ? (
        <Spin></Spin>
      ) : (
        <div>
          <div>
            <h3>
              {" "}
              Item Code: {content.dupa_content.dupa_per_project.item_number}
            </h3>
            <h3>
              {" "}
              Description: {content.dupa_content.dupa_per_project.description}
            </h3>
            <h3> Unit: {dupa?.abbreviation} </h3>
            <h3>
              {" "}
              Output/Hr.:{" "}
              {content.dupa_content.dupa_per_project.output_per_hour}{" "}
            </h3>
          </div>
          <br />
          <Table
            columns={columns}
            pagination={false}
            dataSource={previewData}
            rowClassName={(record, index) => {
              if (record.item != "" && record.labor_id != "") {
                return "inTableHeader";
              }
            }}
          ></Table>
        </div>
      )}
    </Modal>
  );
};

export default DupaPerProjectPreview;
