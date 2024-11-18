import React, { Children } from "react";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  AlignmentType,
  LevelFormat,
  PageNumber,
  NumberFormat,
  Footer,
  Header,
} from "docx";

import { saveAs } from "file-saver";
import { qc_header_b64 } from "../../../img/qc_header_base64.js";

export const CertificationFile = (projectData, abcTotal, day, year, month) => {
  const header_image = new ImageRun({
    type: "jpeg",
    data: Uint8Array.from(atob(qc_header_b64), (c) => c.charCodeAt(0)),
    transformation: {
      width: 600,
      height: 100,
    },
  });
  console.log(abcTotal);
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            size: "20",
            font: "Arial",
            alignment: AlignmentType.CENTER,
          },
          paragraph: {
            alignment: AlignmentType.CENTER,
          },
        },
      },
    },
    sections: [
      {
        children: [
          new Paragraph({
            children: [header_image],
            spacing: {
              after: 350,
            },
          }),
          new Paragraph({
            spacing: {
              before: 400,
              after: 150,
            },
            children: [
              new TextRun({
                text: `CERTIFICATION`,
                bold: true,
                size: 60,
              }),
              new TextRun({
                text: `This is to certify that this Department prepared the Detailed Engineering Documents for the project listed hereunder in accordance with the Engineering Standards.`,
                size: 20,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 600, hanging: 0 },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `PROJECT TITLE: ${projectData?.project_title}`,
                break: 2,
              }),
              new TextRun({
                text: `BARANGAY: ___________________________`,
                break: 4,
              }),
              new TextRun({
                text: `DISTRICT: ___________________________`,
                break: 4,
              }),
              new TextRun({
                text: `APPROVED BUDGET FOR THE CONTRACT: Php ${abcTotal}`,
                break: 4,
              }),
              new TextRun({
                text: `Issued this ${day} of ${month}, ${year}, ${projectData?.location}`,
                break: 4,
              }),
            ],
          }),

          new Paragraph({
            spacing: {
              before: 3000,
            },
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: `______________________________`,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            indent: { right: 1000, hanging: 0 },
            children: [
              new TextRun({
                text: `ADMIN TITLE`,
                break: 1,
              }),
            ],
          }),
        ],
      },
    ],
  });
  Packer.toBlob(doc).then((blob) => {
    console.log(blob);
    saveAs(blob, "Certification-" + projectData?.project_title + ".docx");
  });
};
