import {
  Paragraph,
  TextRun,
  Table,
  TableCell,
  TableRow,
  WidthType,
  VerticalAlign,
  AlignmentType,
} from "docx";

const __size = 3000;
const __type = WidthType.DXA;
const __row_height = 250;
// const __vertical_align = VerticalAlign.CENTER;
const __text = "";
const __header = false;
const __row_span = 0;
const __column_span = 0;
const __cell_spacing = 0;
const __cell_align = AlignmentType.CENTER;

const TechSpecTable = (tableData) => {
  const { data } = tableData;
  const table = new Table({
    rows: data.map((rowData) => {
      return new TableRow({
        height: {
          value: rowData.height ?? __row_height,
        },
        tableHeader: rowData.header ?? __header,
        children: rowData.children.map((cellData) => {
          return new TableCell({
            width: {
              size: cellData.size ?? __size,
              type: cellData.type ?? __type,
            },
            // VerticalAlign: cellData.v_align ?? __vertical_align,
            columnSpan: cellData.col_span ?? __column_span,
            rowSpan: cellData.row_span ?? __row_span,
            children: [
              new Paragraph({
                spacing: { after: cellData.data.spacing ?? __cell_spacing },
                alignment: cellData.data.align ?? __cell_align,
                children: [new TextRun(cellData.data ?? { text: __text })],
              }),
            ],
          });
        }),
      });
    }),
  });

  return table;
};

export default TechSpecTable;
