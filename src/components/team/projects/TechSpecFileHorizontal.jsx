import React from "react";
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
  WidthType,
} from "docx";

import { saveAs } from "file-saver";
import { qc_header_b64 } from "../../../img/qc_header_base64.js";
import TechSpecTable from "./TechSpecTable.jsx";
import * as h_tables from "./tech_spec_tables/HorizontalTables.jsx";

export const TechSpecFileHorizontal = ({ projectData }) => {
  const header_image = new ImageRun({
    type: "jpeg",
    data: Uint8Array.from(atob(qc_header_b64), (c) => c.charCodeAt(0)),
    transformation: {
      width: 600,
      height: 100,
    },
  });

  // NUMBERING STYLES AND PARAGRAPH INDENTS
  const numbering_config = [
    {
      reference: "rule-numbering",
      levels: [
        {
          level: 0,
          format: LevelFormat.UPPER_ROMAN,
          alignment: AlignmentType.START,
          text: "%1.",
          style: {
            run: {
              bold: true,
            },
          },
        },
        {
          level: 1,
          format: LevelFormat.UPPER_LETTER,
          alignment: AlignmentType.LOW_KASHIDA,
          text: "%2.",
          style: {
            run: {
              bold: false,
            },
            paragraph: {
              indent: { left: 1000, hanging: 250 },
            },
          },
        },
        {
          level: 2,
          format: LevelFormat.DECIMAL,
          alignment: AlignmentType.LOW_KASHIDA,
          text: "%3.",
          style: {
            paragraph: {
              indent: { left: 800, hanging: 250 },
            },
          },
        },
        {
          level: 3,
          format: LevelFormat.LOWER_LETTER,
          alignment: AlignmentType.START,
          text: "%4.",
          style: {
            paragraph: {
              indent: { left: 1200, hanging: 250 },
            },
          },
        },
        {
          level: 4,
          format: LevelFormat.LOWER_ROMAN,
          alignment: AlignmentType.START,
          text: "%5.",
          style: {
            paragraph: {
              indent: { left: 1700, hanging: 250 },
            },
          },
        },
      ],
    },
    {
      reference: "horizontal-numbering",
      levels: [
        {
          level: 0,
          format: LevelFormat.DECIMAL,
          alignment: AlignmentType.START,
          text: "%1.",
          style: {
            run: {
              bold: false,
            },
            paragraph: {
              indent: { left: 800, hanging: 250 },
            },
          },
        },
        {
          level: 1,
          format: LevelFormat.LOWER_LETTER,
          alignment: AlignmentType.LOW_KASHIDA,
          text: "%2.",
          style: {
            paragraph: {
              indent: { left: 1000, hanging: 250 },
            },
          },
        },
      ],
    },
  ];

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            size: "20",
            font: "Arial",
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              line: 1080,
            },
          },
          paragraph: {
            alignment: AlignmentType.LEFT,
            spacing: {
              after: 180,
            },
          },
        },
      },
    },
    numbering: {
      config: numbering_config,
    },
    sections: [
      {
        properties: {
          page: {
            pageNumbers: {
              start: 1,
              formatType: NumberFormat.DECIMAL,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.END,
                children: [
                  new TextRun({
                    children: ["DEDxxxx_xxx"],
                  }),
                ],
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    children: ["Page ", PageNumber.CURRENT],
                  }),
                  new TextRun({
                    children: [" of ", PageNumber.TOTAL_PAGES],
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Paragraph({
            children: [header_image],
            spacing: {
              after: 350,
            },
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: "PROJECT TITLE: " + projectData?.project_title,
                allCaps: true,
                break: 1,
              }),
              new TextRun({
                text: "PROJECT LOCATION: " + projectData?.location,
                allCaps: true,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "TECHNICAL SPECIFICATIONS",
                allCaps: true,
                bold: true,
                underline: { type: "single", color: "#000000" },
                size: 28,
                break: 1,
              }),
            ],
            spacing: {
              after: 350,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "GENERAL NOTES:",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            children: [
              new TextRun({
                text: "The above-mentioned project is subject to the Standards Specifications listed herein where applicable.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            children: [
              new TextRun({
                text: "STANDARD SPECIFICATIONS",
              }),
              new TextRun({
                text: "All works shall comply with DPWH STANDARD SPECIFICATIONS FOR HIGHWAYS AND BRIDGES 2013 Edition supplemental specification pertaining to this project and provision of the contract.",
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            children: [
              new TextRun({
                text: "DIMENSIONS",
              }),
              new TextRun({
                text: "Unless otherwise specified, all dimensions which include stationing, distances between control points and elevations are measured in meters.",
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            children: [
              new TextRun({
                text: "ALIGNMENT AND GRADE",
              }),
              new TextRun({
                text: "No alteration or change in alignment and grade shall be made unless existing field condition so warrant and only upon the written order by the Engineer-In-charge and approved by the propoer authority concerned.",
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            children: [
              new TextRun({
                text: "REMOVAL OF EXISTING STRUCTURES AND OBSTRUCTIONS",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "Existing structures affected in this project shall be done with the required tools and equipment. All debris shall be immediately disposed.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "Portion of existing utilities such as MWSS Pipelines, PLDT Posts, MERALCO Posts, etc. that may cause obstructions to the construction of ths project shall be relocated by the entity or owner concerned. Extreme precaution shall be exercised, damaged thereof shall be the account of the contractor.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            children: [
              new TextRun({
                text: "SUB-GRADE, SUB BASE AND BASE.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "Unsuitable sub-grade material shall be excavated below the ground surface to the required width and depth. The area to be excavated shall be backfilled with approved material.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "No embankment material shall be placed until the foundation is stable.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "All agregate sub-base and base course shall be spread, laid and compacted in accordance with the required thickness and proposed elevation.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            children: [
              new TextRun({
                text: "CONCRETE AND CONCRETE PAVEMENT",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "All concrete to be used in this project shall be Class “A” unless otherwise indicated.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "No Admixtures or additives will be allowed for all concrete works without prior approval by the City Engineer or his duly representative.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "Traffic shall be required to reduced speed when passing the vicinity of the newly laid concrete pavement until such time that it has obtained the required strength.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            children: [
              new TextRun({
                text: "ASPHALT PAVEMENT 	",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "Prepared or Existing Base shall be thoroughly cleaned and free from dirt by utilizing a push broom as required. Emulsified asphalt (SS1) shall be used and spread evenly on the surface prepared by utilizing an asphalt distributor as required.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "Asphalt Plant Hot Mix shall be laid evenly by utilizing an asphalt paver to a thickness as required in the plan or program of work.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            children: [
              new TextRun({
                text: "REINFORCING STEEL BARS",
              }),
              new TextRun({
                text: "Reinforcing steel shall conform to AASHTO M31 (ASTM615), Grade 40 for Bars 16 mm. diameter and smaller (40,000 psi), fy = 275 MPa, and for Bars greater than 16 mm Diam., Grade 60 (60,000 psi) fy = 414 MPa.",
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            children: [
              new TextRun({
                text: "DRAINAGE ",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "Exact location, slope, outfalls and invert elevation of drainage structures shall be checked in the field by the Engineer-In-Charge, minor adjustment maybe made by the approval of the Engineer to suit actual field condition.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "Existing drainage structures or part thereof removed by the contractor that are still serviceable shall be turned over to the Government and shall be deposited at a place within the project site designated by the Engineer-In-Charge without any extra compensation. Extreme precaution shall be exercised by the contractor not to damage these materials during the removal and handling.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            children: [
              new TextRun({
                text: "CONSTRUCTION STAKES",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "The contractor will be responsible for the true and proper setting out of the work or improvement and for correctness of position, level slope and continuous profile grade in road work. He will set construction stakes, establishing lines, slope and continuous profile work and other line and benchmark for bridge work.",
              }),
              new TextRun({
                text: "Grade in road protective and necessary structures and appurtenances culvert work, as are deemed necessary from the reference date to be furnished by the Engineer-In-Charge in writing.",
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            children: [
              new TextRun({
                text: "The checking of construction stakes by the Engineer-In-Charge shall not in any way relieve the contractor of his responsibility for the correctness thereof and the contractor shall carefully protect preserve all benchmark, pegs and other things used in setting out of the work.",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 104 – REMOVAL OF EXISTING STRUCTURES",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: "This Item shall consist of the removal wholly or in part, and satisfactory disposal of all buildings, fences, structures, old pavements, abandoned pipe lines, and any other obstructions which are not designated or permitted to remain, except for the obstructions to be removed and disposed off under other items in the Contract. It shall also include the salvaging of designated materials and backfilling the resulting trenches, holes, and pits. ",
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 105 – ROADWAY EXCAVATION ",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: "Roadway excavation will include excavation and grading for roadways, parking areas, intersections, approaches, slope rounding, benching, waterways and ditches; removal of unsuitable material from the roadbed and beneath embankment areas; and excavating selected material found in the roadway as ordered by the Engineer for specific use in the improvement.",
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 106 – EXCAVATION FOR STRUCTURES",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: "This item shall consist of the necessary excavation for reinforced concrete pipes, lined canal, box culverts and other structures not otherwise provided for in the Specifications. Except as otherwise provided for pipe culverts, the backfilling of completed structures and the disposal of all excavated materials shall be in accordance with this specification and in reasonably close conformity with the Plans or as established by the Engineer-In-Charge. This Item shall include necessary diverting of live streams, bailing, pumping, draining, sheeting, bracing, and the necessary construction of cribs and cofferdams, and furnishing the materials therefore, and the subsequent removal of cribs and cofferdams and the placing of all necessary backfill. It shall also include the furnishing and placing of approved foundation fill material to replace unsuitable material encountered below the foundation elevation of structures.",
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 107 - COMMON BORROW",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: "This Item shall consist of the construction of embankment in accordance with this Specification and in conformity with the lines, grades and dimensions shown on the Plans or established by the Engineer-In-Charge.",
                break: 2,
              }),
              new TextRun({
                text: "Construction of Embankment shall consist of constructing roadway embankments, including preparation of the areas upon which they are to be placed; the construction of dikes within or adjacent to the roadway; the placing and compacting of approved material within roadway areas where unsuitable material has been removed; and the placing and compacting of embankment material in holes, pits, and other depressions within the roadway area. ",
                break: 1,
              }),
              new TextRun({
                text: "Embankments and backfills shall contain no muck, peat, sod, roots or other deleterious matter. Rocks, broken concrete or other solid, bulky materials shall not be placed in embankment areas where piling is to be placed or driven. ",
                break: 1,
              }),
              new TextRun({
                text: "MATERIAL REQUIREMENTS",
                break: 2,
              }),
              new TextRun({
                text: "Embankments shall be constructed of suitable materials, in consonance with the following definitions:",
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "horizontal-numbering",
              level: 0,
            },
            children: [
              new TextRun({
                text: "Suitable Material - Material which is acceptable in accordance with the Contract and which can be compacted in the manner specified in this Item. It can be common material or rock.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "horizontal-numbering",
              level: 0,
            },
            children: [
              new TextRun({
                text: "Unsuitable Material - Material other than suitable materials such as: ",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "horizontal-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: "Materials containing detrimental quantities of organic materials, such as grass, roots and sewerage.",
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "horizontal-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Organic soils such as peat and muck`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "horizontal-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Soils with liquid limit exceeding 80 and/or plasticity index exceeding 55. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "horizontal-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Soils with a natural water content exceeding 100%.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "horizontal-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Soils with very low natural density, 800 kg/m3 or lower. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "horizontal-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Soils that cannot be properly compacted as determined by the Engineer-In-Charge. `,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 108 – AGGREGATE SUBBASE COURSE",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of furnishing, placing and compacting an aggregate subbase course on a prepared subgrade in accordance with this Specification and the lines, grades and cross-sections shown on the Plans, or as directed by the Engineer-in-charge.`,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Aggregate for subbase shall consist of hard, durable particles or fragments of crushed stone, crushed slag, or crushed or natural gravel and filler of natural or crushed sand or other finely divided mineral matter. The composite material shall be free from vegetable matter and lumps or balls of clay, and shall be of such nature that it can be compacted readily to form a firm, stable subbase.
                `,
                break: 2,
              }),
              new TextRun({
                text: `The subbase material shall conform to Table 200.1, Grading Requirements 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 200.1 – Grading Requirements`,
                break: 2,
              }),
            ],
          }),
          // TABLE 200.1
          h_tables.Table200_1,
          new Paragraph({
            children: [
              new TextRun({
                text: `The fraction passing the 0.075 mm (No. 200) sieve shall not be greater than 0.66 (two thirds) of the fraction passing the 0.425 mm (No. 40) sieve. The fraction passing the 0.425 mm (No. 40) sieve shall have a liquid limit not greater than 35 and plasticity index not greater than 12 as determined by AASHTO T 89 and T 90, respectively. The coarse portion, retained on a 2.00 mm (No. 10) sieve, shall have a mass percent of wear not exceeding 50 by the Los Angeles Abrasion Tests as determined by AASHTO T 96. The material shall have a soaked CBR value of not less than 25% as determined by AASHTO T 193. The CBR value shall be obtained at the maximum dry density and determined by AASHTO T 180, Method D. `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 200 – AGGREGATE BASE COURSE",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This Item shall consist of furnishing, placing and compacting an aggregate base course on a prepared subgrade/subbase in accordance with this Specification and the lines, grades, thickness and typical cross-sections shown on the Plans, or as established by the Engineer-In-charge.`,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Aggregate for base course shall consist of hard, durable particles or fragments of crushed stone, crushed slag or crushed or natural gravel and filler of natural or crushed sand or other finely divided mineral matter. The composite material shall be free from vegetable matter and lumps or balls of clay, and shall be of such nature that it can be compacted readily to form a firm, stable base. In some areas where the conventional base course materials are scarce or non-available, the use of 40% weathered limestone blended with 60% crushed stones or gravel shall be allowed, provided that the blended materials meet the requirements of this Item. 
                `,
                break: 2,
              }),
              new TextRun({
                text: `The base course material shall conform to Table 201.1, whichever is called for in the Bill of Quantities.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 201.1 – Grading Requirements`,
                break: 2,
              }),
            ],
          }),
          // TABLE 201.1
          h_tables.Table201_1,
          new Paragraph({
            children: [
              new TextRun({
                text: `The fraction passing the 0.075 mm (No. 200) sieve shall not be greater than 0.66 (two thirds) of the fraction passing the 0.425 mm (No. 40) sieve. The fraction passing the 0.425 mm (No. 40) sieve shall have a liquid limit not greater than 25 and plasticity index not greater than 6 as determined by AASHTO T 89 and T 90, respectively. The coarse portion, retained on a 2.00 mm (No. 10) sieve shall have a mass percent of wear not exceeding 50 by the Los Angeles Abrasion test determined by AASHTO T 96. The material passing the 19 mm (3/4 inch) sieve shall have a soaked CBR value of not less than 80% as determined by AASHTO T 193. The CBR value shall be obtained at the maximum dry density (MDD) as determined by AASHTO T 180, Method D. If filler, in addition to that naturally present, is necessary for meeting the grading requirements or for satisfactory bonding, it shall be uniformly blended with the base course material on the road or in a pug mill unless otherwise specified or approved. Filler shall be taken from sources approved by the Engineer, shall be free from hard lumps and shall not contain more than 15 percent of material retained on the 4.75 mm (No. 4) sieve. `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 302 – BITUMINOUS PRIME COAT",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This Item shall consist of preparing and treating an aggregate base course with material in accordance with the Plans and Specifications, preparatory to the construction of a bituminous surface course.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Bituminous material shall be either Rapid Curing (RC) or Medium Curing (MC) Cut-back Asphalt, whichever is called for in the Bill of Quantities. It shall conform to the requirements of Item 702, Bituminous Materials. The type and grade shall be specified in the Special Provisions.
                `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 310 – BITUMINOUS CONCRETE SURFACE COURSE, HOT LAID",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This Item shall consist of constructing a bituminous concrete surface course composed of aggregates, mineral filler, and bituminous material mixed in a central plant, constructed and laid hot on the prepared base in accordance with this Specification and in conformity with lines, grades, thickness and typical cross-section shown on the Plans. 
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `COMPOSITION AND QUALITY OF BITUMINOUS MIXTURE (Job-Mix Formula)
                The bituminous mixture shall be composed of aggregate, mineral filler, hydrated lime, and bituminous material. At least three weeks prior to production, the Contractor shall submit in writing a job-mix formula for each mixture supported by laboratory test data along with samples and sources of the components and viscosity-temperature relationships information to the Engineer for testing and approval.                
                `,
                break: 2,
              }),
              new TextRun({
                text: `Each job-mix formula submitted shall propose definite single values for:              
                `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `1. The percentage of aggregate passing each specified sieve size.`,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `2. The percentage of bituminous material to be added.`,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `3. The temperature of the mixture delivered on the road.`,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `4. The kind and percentage of additive to be used.`,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `5. The kind and percentage of mineral filler to be used.`,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `After the job-mix is established, all mixture furnished for the project shall conform thereto within the following ranges of tolerances: `,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 0 },
            children: [
              new TextRun({
                text: `Passing No. 4 and larger sieves 	             ±	7 percent `,
              }),
              new TextRun({
                text: `Passing No. 8 to No. 100 sieves (inclusive) 	±	4 percent`,
                break: 1,
              }),
              new TextRun({
                text: `Passing No. 200 sieve 	                                       ±	2 percent `,
                break: 1,
              }),
              new TextRun({
                text: `Bituminous Material 	                                       ±	0.4 percent `,
                break: 1,
              }),
              new TextRun({
                text: `Temperature of Mixture	                                       ±	10֯ C`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Should a change in source of material be proposed or should a job-mix formula prove unsatisfactory, a new job-mix formula shall be submitted by the Contractor in writing and be approved by the Engineer prior to production. Approval of a new job mix formula may require laboratory testing and verification. The mixture shall have a minimum compressive strength of 1.4 MPa (200 psi). The mixture shall have a mass percent air voids with the range of 3 to 5. The mixture shall also have an index of retained strength of not less than `,
              }),
              new TextRun({
                text: `70 when tested by AASHTO T 165. For aggregates having maximum sizes over 25 mm (1 inch), AASHTO T 165 will be modified to use 150 mm x 150 mm (6 x 6 inches) cylindrical specimens. The 150 mm (6 inches’ cylinders will be compacted by the procedures outlined in AASHTO T 167 modified to employ 10 repetitions of a molding load of 9.6 MPa (1400 psi), with no appreciable holding time after each application of the full load.  `,
                break: 1,
              }),
              new TextRun({
                text: `BITUMINOUS MATERIAL`,
                break: 2,
              }),
              new TextRun({
                text: `It shall be Penetration Grade Asphalt Cement. Asphalt cement shall conform to the requirements of AASHTO M 226.`,
                break: 1,
              }),
              new TextRun({
                text: `AGGREGATES`,
                break: 1,
              }),
              new TextRun({
                text: `It shall be uniformly graded from coarse to fine. Target value for the intermediate sieve sizes shall be established within the limits shown in table 703.1. The contractor shall submit the proposed target value in writing to the Engineer-In-Charge for approval. The target gradation is subject to confirmation testing in accordance with section 307.2 before approval by the engineer. Any changes in the target gradation are subject to confirmation testing in accordance with section 307.2., unless otherwise approved in writing by the engineer. No target gradation adjustment will be permitted during the span of a lot.`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `TABLE 703.1 – Range of Gradation Target Values`,
              }),
            ],
          }),
          // TABLE 703.1
          h_tables.Table703_1,
          new Paragraph({
            children: [
              new TextRun({
                text: `No intermediate size of aggregate shall be removed for other purposes without written consent of the engineer. If crushed gravel is used, not less than 50 mass percent of the material retained on the 4.75 mm (No. 4) sieve shall be particles having at least one fractured face. That portion of the composite material passing a 4.75 mm (No. 4) sieve shall have a sand equivalent of not less than 35, as determined by AASHTO T 176, Alternate Method No. 2. The aggregate shall show a durability index not less than 35 (coarse and fine) as determined by AASHTO T 210. The material shall be free of clay balls and adherent films of clay or other matter that would prevent thorough coating with the bituminous material.`,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `MINERAL FILLER`,
              }),
              new TextRun({
                text: `Filler material for bituminous bases or pavements shall meet the requirements of AASHTO M 17, Mineral Filler for Bituminous Paving Mixtures`,
                break: 1,
              }),
              new TextRun({
                text: `Mineral filler shall be graded within the following limits:`,
                break: 1,
              }),
            ],
            //  TABLE Mineral filler shall be graded within the following limits:
          }),
          h_tables.Mineral_filler,
          new Paragraph({
            children: [
              new TextRun({
                text: `The mineral filler shall have a plasticity index not greater than 4. Plasticity Index limits are not appropriate for hydraulic lime and cement.`,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `HYDRATED LIME `,
              }),
              new TextRun({
                text: `Hydrated lime shall conform to the requirements of PHILSA I-1-68 or ASTM C 207-76 and shall be of the following type: `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 0 },
            children: [
              new TextRun({
                text: `Type N 	-	Normal hydrated lime for masonry purposes.`,
              }),
              new TextRun({
                text: `Type S 	-     Special hydrated lime for masonry purposes. `,
                break: 1,
              }),
              new TextRun({
                text: `Type NA 	-	Normal air-entraining hydrated lime for masonry purposes. `,
                break: 1,
              }),
              new TextRun({
                text: `Type SA 	-	Special air-entraining hydrated lime for masonry purposes. `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Type N and S are suitable for use in mortar, in scratch and brown coats of cement plaster, for stucco and for addition to Portland Cement concrete. Type NA and SA are air-entrained hydrated limes that are suitable for use in any of the above uses where air-entrainment are desired. Type S and SA hydrated lime develop high, early plasticity and higher water retentivity and by a limitation on their unhydrated oxide content. It is the intent of this Specification to use either the Type N or S for soil stabilization and as filler requirement to bituminous plant mixtures. It is expected to provide pavements with greater resistance to the detrimental effects of water, especially flooding during the rainy season. `,
              }),
              new TextRun({
                text: `PROPORTIONING OF MIXTURES`,
                break: 2,
              }),
              new TextRun({
                text: `The proportion of bituminous material on the basis of total dry aggregate shall be from 5.0 to 8.0 mass percent. The exact percentage to be used shall be fixed by the Engineer in accordance with the job-mix formula and the other quality control requirements. During the mixing operation, one-half to one (0.5 to 1.0) mass percent of hydrated lime, dry aggregate basis, shall be added to the mixture. The lower percentage limit is applicable to aggregates which are predominantly calcareous. `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 316 – PORTLAND CEMENT CONCRETE PAVEMENT ",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This Item shall consist of pavement of Portland Cement Concrete, with or without reinforcement, constructed on the prepared base in accordance with this Specification and in conformity with lines, grades, thickness and typical cross- section shown on the Plans. Compressive strength for concrete mix to be used shall not be less than 4,000 psi.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `PORTLAND CEMENT
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the applicable requirements of Item 700, Hydraulic Cement. Only Type I Portland Cement shall be used unless otherwise provided for in the Special Provisions. Different brands or the same brands from different mills shall not be mixed nor shall they be used alternately unless the mix is approved by the Engineer. However, the use of Portland Pozzolana Cement Type IP meeting the requirements of AASHTO M 240/ASTM C 695, Specifications for Blended Hydraulic Cement shall be allowed, provided that trial mixes shall be done and that the mixes meet the concrete strength requirements, the AASHTO/ASTM provisions pertinent to the use of Portland Pozzolana Type IP shall be adopted. Cement which for any reason, has become partially set or which contains lumps of caked cement shall be rejected. Samples of cement shall be obtained in accordance with AASHTO T 127.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FINE AGGREGATES`,
              }),
              new TextRun({
                text: `It shall consist of natural sand, stone screenings or other inert materials with similar characteristics, or combinations thereof, having hard, strong and durable particles. Fine aggregate from different sources of supply shall not be mixed or stored in the same pile nor used alternately in the same class of concrete without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `It shall not contain more than three (3) mass percent of material passing the 0.075 mm (No. 200 sieve) by washing nor more than one (1) mass percent each of clay lumps or shale. The use of beach sand will not be allowed without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `If the fine aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 10 mass percent. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be free from injurious amounts of organic impurities. If subjected to the colorimetric test for organic impurities and a color darker than the standard is produced, it shall be rejected. However, when tested for the effect of organic impurities of strength of mortar by AASHTO T 71, the fine aggregate may be used if the relative strength at 7 and 28 days is not less than 95 mass percent.  
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be well-graded from coarse to fine and shall conform to Table 311.1.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.1 – Grading Requirements for Fine Aggregate`,
              }),
            ],
          }),
          // TABLE 311.1
          h_tables.Table311_1,
          new Paragraph({
            children: [
              new TextRun({
                text: `COARSE AGGREGATES`,
                break: 2,
              }),
              new TextRun({
                text: `It shall consist of crushed stone, gravel, blast furnace slag, or other approved inert materials of similar characteristics, or combinations thereof, having hard, strong, durable pieces and free from any adherent coatings. `,
                break: 1,
              }),
              new TextRun({
                text: `It shall contain not more than one (1) mass percent of material passing the 
                0.075 mm (No. 200) sieve, not more than 0.25 mass percent of clay lumps, nor more than 3.5 mass percent of soft fragments. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `If the coarse aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 12 mass percent. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `It shall have a mass percent of wear not exceeding 40 when tested by AASHTO T 96. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `If the slag is used, its density shall not be less than 1120 kg/m3 (70 lb./cu. ft.). The gradation of the coarse aggregate shall conform to Table 311.2. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `Only one grading specification shall be used from any one source.
                 `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.2 – Grading Requirements for Coarse Aggregate`,
              }),
            ],
          }),
          // TABLE 311.2
          h_tables.Table311_2,
          new Paragraph({
            children: [
              new TextRun({
                text: `WATER`,
                break: 2,
              }),
              new TextRun({
                text: `Water used in mixing, curing or other designated application shall be reasonably clean and free of oil, salt, acid, alkali, grass or other substances injurious to the finished product. Water will be tested in accordance with and shall meet the requirements of Item 714, Water. Water which is drinkable may be used without test. Where the source of water is shallow, the intake shall be so enclosed as to exclude silt, mud, grass or other foreign materials.  
                `,
                break: 1,
              }),
              new TextRun({
                text: `REINFORCING STEEL
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the requirements of Item 404, Reinforcing Steel. Dowels and tie bars shall conform to the requirements of AASHTO M 31 or M 42, except that rail steel shall not be used for tie bars that are to be bent and straightened during construction. Tie bars shall be deformed bars. Dowels shall be plain round bars. Before delivery to the site of work, one-half of the length of each dowel shall be painted with one coat of approved lead or tar paint. The sleeves for dowel bars shall be metal of approved design to cover 50 mm (2 inches), plus or minus 5 mm (1/4 inch) of the dowel, with a closed end, and with a suitable stop to hold the end of the sleeve at least 25 mm (1 inch) from the end of the dowel. Sleeves shall be of such design that they do not collapse during construction. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `JOINT FILLERS
                `,
                break: 2,
              }),
              new TextRun({
                text: `Poured joint fillers shall be mixed asphalt and mineral or rubber filler conforming to the applicable requirements of Item 705, Joint Materials. 
                `,
                break: 2,
              }),
              new TextRun({
                text: `Preformed joint filler shall conform to the applicable requirements of Item 705. It shall be punched to admit the dowels where called for in the Plans. The filler for each joint shall be furnished in a single piece for the full depth and width required for the joint. 
                `,
                break: 2,
              }),
              new TextRun({
                text: `ADMIXTURES
                `,
                break: 2,
              }),
              new TextRun({
                text: `Air-entraining admixture shall conform to the requirements of AASHTO M 154. Chemical admixtures, if specified or permitted, shall conform to the requirements of AASHTO M 194. Fly Ash, if specified or permitted as a mineral admixture and as 20% partial replacement of Portland Cement in concrete mix shall conform to the requirements of ASTM C 618. Admixture should be added only to the concrete mix to produce some desired modifications to the properties of concrete where necessary, but not as partial replacement of cement.  
                `,
                break: 1,
              }),
              new TextRun({
                text: `CURING MATERIALS
                `,
                break: 2,
              }),
              new TextRun({
                text: `Curing materials shall conform to the following requirements as specified;   
                `,
                break: 1,
              }),
              new TextRun({
                text: `a) Burlap cloth - AASHTO M 182   `,
                break: 1,
              }),
              new TextRun({
                text: `b) Liquid membrane forming compounds - AASHTO M 148`,
                break: 1,
              }),
              new TextRun({
                text: `c) Sheeting (film) materials - AASHTO M 171 `,
                break: 1,
              }),
              new TextRun({
                text: `Cotton mats and water-proof paper can be used.                 `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `CALCIUM CHLORIDE/CALCIUM NITRATE`,
              }),
              new TextRun({
                text: `It shall conform to AASHTO M 144, if specified or permitted by the Engineer-in-charge, as accelerator.`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `STORAGE OF CEMENT AND AGGREGATE`,
              }),
              new TextRun({
                text: `All cement shall be stored, immediately upon delivery at the Site, in weatherproof building which will protect the cement from dampness. The floor shall be raised from the ground. The buildings shall be placed in locations approved by the Engineer. Provisions for storage shall be ample, and the shipments of cement as received shall be separately stored in such a manner as to allow the earliest deliveries to be used first and to provide easy access for identification and inspection of each shipment. Storage buildings shall have capacity for storage of a sufficient quantity of cement to allow sampling at least twelve (12) days before the cement is to be used. Bulk cement, if used, shall be transferred to elevated air tight and weatherproof bins. Stored cement shall meet the test requirements at any time after storage when retest is ordered by the Engineer-in-charge. At the time of use, all cement shall be free-flowing and free of lumps. The handling and storing of concrete aggregates shall be such as to prevent segregation or the inclusion of foreign materials. The Engineer may require that aggregates be stored on separate platforms at satisfactory locations. In order to secure greater uniformity of concrete mix, the Engineer may require that the coarse aggregate be separated into two or more sizes. Different sizes of aggregate shall be stored in separate bins or in separate stockpiles sufficiently removed from each other to prevent the material at the edges of the piles from becoming intermixed. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 405 – STRUCTURAL CONCRETE ",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This Item shall consist of furnishing, bending, placing and finishing concrete in all structures except pavements in accordance with this Specification and conforming to the lines, grades, and dimensions shown on the Plans. Concrete shall consist of a mixture of Portland Cement, fine aggregate, coarse aggregate, admixture when specified, and water mixed in the proportions specified or approved by the Engineer-In-Charge.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `PORTLAND CEMENT
                `,
                break: 2,
              }),
              new TextRun({
                text: `it shall conform to all the requirements in Portland Cement section
                `,
                break: 1,
              }),
              new TextRun({
                text: `FINE AGGREGATES
                `,
                break: 1,
              }),
              new TextRun({
                text: `it shall conform to all the requirements in Find Aggregates section.
                `,
                break: 1,
              }),
              new TextRun({
                text: `COARSE AGGREGATES
                `,
                break: 1,
              }),
              new TextRun({
                text: `it shall conform to all the requirements in Find Aggregates section. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `Except that gradation shall conform to Table 405.1.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 405.1 – Grading Requirements for Coarse Aggregate
                `,
                break: 2,
              }),
            ],
          }),
          // TABLE 405.1
          h_tables.Table405_1,
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `The measured cement content shall be within plus (+) or minus (-) 2 mass percent of the design cement content. 
                `,
                break: 2,
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `WATER`,
              }),
              new TextRun({
                text: `it shall conform to all the requirements in water section. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `REINFORCING STEEL `,
              }),
              new TextRun({
                text: `Reinforcing steel shall conform to the requirements of the following specifications: 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `(For concrete reinforcement)`,
                italics: true,
              }),
            ],
          }),
          //  TABLE For concrete reinforcement
          h_tables.Concrete_reinforcement,
          new Paragraph({
            children: [
              new TextRun({
                text: `Bar reinforcement for concrete structures, except No. 2 bars shall be deformed in accordance with AASHTO M 42, M 31 and M 53 for Nos. 3 through 11. Dowel and tie bars shall conform to the requirements of AASHTO M 31 or AASHTO M 42 except that rail steel shall not be used for tie bars that are to be bent and re-straightened during construction. Tie bars shall be deformed bars. Dowel bars shall be plain round bars. They shall be free from burring or other deformation restricting slippage in the concrete. Before delivery to the site of the work, a minimum of one half (1/2) the length of each dowel bar shall be painted with one coat of approved lead or tar paint. The sleeves for dowel bars shall be metal of an approved design to cover 50 mm (2 inches), plus or minus 6.3 mm of the dowel, with a closed end, and with a suitable stop to hold the end of the sleeve at least 25 mm (1 inch) from the end of the dowel bar. Sleeves shall be of such design that they do not collapse during construction. Plastic coated dowel bar conforming to AASHTO M 254 may be used. `,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ADMIXTURES`,
              }),
              new TextRun({
                text: `Admixtures shall conform to the requirements in admixture section.  
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `CURING MATERIALS`,
              }),
              new TextRun({
                text: `Curing materials shall conform to the requirements in curing materials section.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `EXPANSION JOIN MATERIALS`,
              }),
              new TextRun({
                text: `Expansion joint materials shall be: 
                `,
                break: 1,
              }),
              new TextRun({
                text: `Preformed Sponge Rubber and Cork, conforming to AASHTO M 153. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `Hot-Poured Elastic Type, conforming to AASHTO M 173. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `Preformed Fillers, conforming to AASHTO M 213. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ELASTOMERIC COMPRESSION JOINT SEALS`,
              }),
              new TextRun({
                text: `These shall conform to AASHTO M 220. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ELASTOMERIC BEARING PADS`,
              }),
              new TextRun({
                text: `These shall conform to AASHTO M 251 or Item 412 - Elastomeric Bearing Pads. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `STORAGE OF CEMENT AND AGGREGATES`,
              }),
              new TextRun({
                text: `Storage of cement and aggregates shall conform to all the requirements of Subsection 311.2.10.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `SAMPLING AND TESTING OF STRUCTURAL CONCRETE`,
              }),
              new TextRun({
                text: `As work progresses, at least one (1) sample consisting of three (3) 
                concrete cylinder test specimens, 150 x 300mm (6 x 12 inches), shall be taken from each seventy-five (75) cubic meters of each class of concrete or fraction thereof placed each day.
                
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 413 - PIPE CULVERT AND STORM DRAINS",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of the construction or reconstruction of pipe culverts and storm drains, hereinafter referred to as "conduit" in accordance with this Specification and in conformity with the lines and grades shown on the Plans or as established by the Engineer. `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Material shall meet the requirements specified in the following specifications: 
                `,
                break: 2,
              }),
            ],
          }),
          // TABLE Material shall meet the requirements specified in the following specifications:
          h_tables.Material_requirements,
          new Paragraph({
            children: [
              new TextRun({
                text: `JOINT MORTAR`,
                break: 2,
              }),
              new TextRun({
                text: `Joint mortar for concrete pipes shall consist of 1 part, by volume of Portland Cement and two (2) parts of approved sand with water as necessary to obtain the required consistency. Portland Cement and sand shall conform to the requirements of Item 405, Structural Concrete. Mortar shall be used within 30 minutes after its preparation.
                `,
                break: 1,
              }),
            ],
          }),
          // TABLE JOINT MORTAR
          h_tables.Joint_mortar,
          new Paragraph({
            children: [
              new TextRun({
                text: `OAKUM`,
                break: 2,
              }),
              new TextRun({
                text: `JOakum for joints in bell and spigot pipes shall be made from hemp (Cannavis Sativa) line or Benares Sunn fiber or from a combination of these fibers. The oakum shall be thoroughly corded and finished and practically free from lumps, dirt and extraneous matter. 
                `,
                break: 1,
              }),
            ],
          }),
          // TABLE OAKUM
          h_tables.Oakum,
          new Paragraph({
            children: [
              new TextRun({
                text: `Bedding material shall conform to the requirements of Subsection 500.3.2, Bedding. Backfill material shall conform to the requirements of Subsection 500.3.6, Backfilling. When the location of manufacturing plants allows, the plants will be inspected periodically for compliance with specified manufacturing methods, and material samples will be obtained for laboratory testing for compliance with materials quality requirements. This shall be the basis for acceptance of manufacturing lots as to quality. Prior to and during incorporation of materials in the work, these materials will be subjected to the latest inspection and approval of the Engineer. `,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 500 – RIPRAP AND GROUTED RIPRAP",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of the furnishing and placing of riprap with or without grout as the case may be, with or without filter backing, furnished and constructed in accordance with this Specification and to the lines and grades and dimensions shown on the Plans. `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `STONES`,
                break: 2,
              }),
              new TextRun({
                text: `Stones for riprap shall consist of rock as nearly as rectangular in section as is practical, except that riprap of Class A may consist of round natural stones. The stones shall be sound, tough, durable, dense, resistant to the action of air and water, and suitable in all respects for the purpose intended. 
                Stones for riprap shall be one of the following classes as shown on the Plans or determined by the Engineer. `,
                break: 1,
              }),
              new TextRun({
                text: `Stones for riprap shall be one of the following classes as shown on the Plans or determined by the Engineer. `,
                break: 1,
              }),
            ],
          }),
          // TABLE STONES
          h_tables.Stones,
          new Paragraph({
            children: [
              new TextRun({
                text: `Sound pieces of broken concrete obtained from the removal of bridges, culverts and other structures may be substituted for stone with the approval of the Engineer-in-charge. `,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FILTER MATERIALS`,
              }),
              new TextRun({
                text: `When required, the riprap shall be placed on a filter layer to prevent fine embankment materials to be washed out through the voids of the face stones. The grading of the filter material shall be as specified on the Plans, or in the Special Provisions. If not so specified, it will be required that D15 of the filter is at least 4 times the size D85 for the embankment material, where D15 percent and 85 percent, respectively, passing (by mass) in a grain size analysis. Fine aggregate passing grading requirements for Item 405, Structural Concrete, will satisfy foregoing requirements. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `MORTAR`,
              }),
              new TextRun({
                text: `Mortar for grouted riprap shall consist of sand, cement and water conforming to the requirements given under Item 405, Structural Concrete, mixed in the proportion of one-part cement to three parts sand by volume, and sufficient water to obtain the required consistency. The horizontal and vertical contact surface between stones shall be embedded by cement mortar having a minimum thickness of 20 mm. Sufficient mortar shall be used to completely fill all voids leaving the face of the stones exposed. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 502 – CONCRETE CURB AND GUTTER",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This Item shall consist of the construction of curb and gutter either Precast or Cast in place, made of concrete in accordance with this Specification at the location, and in conformity with the lines, grades, dimensions and design, shown on the Plans or as required by the Engineer-in-charge.`,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL FOR BED COURSE`,
                break: 2,
              }),
              new TextRun({
                text: `Bed course materials as shown on the Plans shall consist of cinders, sand, slag, gravel, crushed stone, or other approved porous material of such grading that all the particles will pass through 12.5 mm (1/2 inch) sieve. `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `CONCRETE`,
              }),
              new TextRun({
                text: `Concrete shall be of the class indicated on the Plans and shall conform to the requirements of Item 405, Structural Concrete. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `EXPANSION JOINT FILLER`,
              }),
              new TextRun({
                text: `Expansion joint filler shall conform to the requirements of AASHTO M 153/ joint materials.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `CEMENT MORTAR`,
              }),
              new TextRun({
                text: `Cement mortar shall consist of one part of Portland cement and two parts of fine aggregates with water added as necessary to obtain the required consistency. The mortar shall be used within 30 minutes of preparation. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `BONDING COMPOUND`,
              }),
              new TextRun({
                text: `Where bonding compound is used, it shall conform to AASHTO M 200.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FORMS`,
              }),
              new TextRun({
                text: `Forms shall be of wood or metal as approved by the Engineer and shall extend to the full depth of the concrete. All forms shall be straight, free from warps and of adequate strength to resist distortion.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 503 – CONCRETE SIDEWALK",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This Item shall consist of the construction of asphalt or Portland Cement concrete sidewalk in accordance with this Specification and to the lines, grades, levels and dimensions shown on the Plans, or as required by the Engineer-in-charge.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `PORTLAND CEMENT CONCRETE`,
                break: 2,
              }),
              new TextRun({
                text: `The cement concrete shall be Class A as specified in Item 405, Structural Concrete. `,
                break: 1,
              }),
              new TextRun({
                text: `ASPHALT`,
                break: 2,
              }),
              new TextRun({
                text: `Asphaltic material shall be as specified in Item 308, Bituminous Plant-Mix Surface Course, Cold-Laid, or Item 310, Bituminous Concrete Surface Course, Hot- Laid. `,
                break: 1,
              }),
              new TextRun({
                text: `EXPANSION JOINT FILLER`,
                break: 2,
              }),
              new TextRun({
                text: `Unless otherwise ordered, the preformed joint filler shall have a thickness of 5 mm and shall conform to the requirements of Item 311, Portland Cement Concrete Pavement. `,
                break: 1,
              }),
              new TextRun({
                text: `FORMS`,
                break: 2,
              }),
              new TextRun({
                text: `Forms shall be of wood or metal as approved by the Engineer and shall extend to the full depth of the concrete. All forms shall be straight, free from warps and of adequate strength to resist distortion. `,
                break: 1,
              }),
              new TextRun({
                text: `BED COURSE MATERIAL`,
                break: 2,
              }),
              new TextRun({
                text: `Bed course material consists of cinders, sand, slag, gravel, crushed stone or other approved permeable granular material of such grading that all particles shall pass a 12.5 mm (1/2 inch) sieve.  `,
                break: 1,
              }),
              new TextRun({
                text: `ASPHALTIC PRIME COAT`,
                break: 2,
              }),
              new TextRun({
                text: `Prime coat shall be cut-back asphalt conforming to the requirements of Item 301, Bituminous Prime Coat. `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM 505 – CMH WITH AB AND CAST IRON",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of construction of manholes and inlets in accordance with the Standard Specifications for Public Works and Highways and in reasonably close conformity with the lines and grades shown on the plans or as established by the Engineer-In-Charge.`,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Concrete for these structures shall meet the requirements of Item 405, Structural Concrete. Other materials shall meet the following specifications:`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `CORRUGATED METAL UNITS`,
              }),
              new TextRun({
                text: `The units shall conform to Plan dimensions and the metal to AASHTO M 36. Bituminous coating, when specified, shall conform to ASTM D 1187, Asphalt-base Emulsion for use as Protective Coating for Metal
                `,
                break: 1,
              }),
            ],
          }),
          // TABLE CORRUGATED METAL UNITS
          h_tables.Corrugated_metal_units,
          new Paragraph({
            children: [
              new TextRun({
                text: `JOINT MORTAR`,
                break: 2,
              }),
              new TextRun({
                text: `Unless otherwise indicated on the Plans, joints mortar shall be composed of one part Portland Cement and two parts fine aggregate by volume to which hydrated lime has been added in an amount equal to 10 percent of the cement by weight. All materials for mortar shall meet the requirements of Item 405, Structural Concrete.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FRAMES, GRATINGS, COVERS AND LADDER RUNGS`,
                break: 2,
              }),
              new TextRun({
                text: `Metal units shall conform to the plan dimensions and to the following specification requirements for the designated materials. Metal gratings and covers which are to rest on frames shall bear on them evenly. They shall be assembled before shipment and so marked that the same pieces may be reassembled readily in the same position when installed. Inaccuracy of bearings shall be corrected by machining, if necessary. A frame and a grating or cover to be used with it shall constitute one pair. 
                All castings shall be uniformly coated with asphalt-based emulsion meeting the requirements of ASTM D 1187, Asphalt-base Emulsion for use as Protective Coating for Metal. Samples of the material in casting shall be taken during the casting of the units and shall be separate casting poured from the same material as the casting they represent`,
                break: 1,
              }),
            ],
          }),
          // TABLE FRAMES GRATINGS COVERS AND LADDER LUNGS
          h_tables.Frames,
          new Paragraph({
            children: [
              new TextRun({
                text: `PRE-CAST CONCRETE UNITS`,
                break: 2,
              }),
              new TextRun({
                text: `These units shall be cast in substantial permanent steel forms. Structural concrete used shall attain a minimum 28-day compressive strength of 20.682 MPa (3000 psi). The pre-cast units shall be cured in accordance with AASHTO M 171. Water absorption of individual cores taken from such units shall not exceed 7 percent. Additional reinforcement shall be provided as necessary to provide for handling of the pre-cast units. A sufficient number of cylinders shall be cast from the concrete for each unit permit compression tests at 7, 14 and 28 days, and to allow for at least 3 cylinders for each test. If the strength requirement is met at 7 or 14 days, the units shall be certified for use 14 days from the date of casting. If the strength is not met at 28 days, all units made from that batch or load will be rejected. Cracks in units, honeycombed or patched areas in excess of 2,000 square millimeters, excessive water absorption and failure to meet strength requirements shall be the causes for rejection. Pre-cast reinforced concrete manhole risers and tops shall conform to the requirements of AASHTO M 199. The plants will be inspected periodically for compliance with specified manufacturing methods, and material samples will be obtained for laboratory testing for compliance with material quality requirements. This may be the basis for acceptance of manufacturing lots as the quality. All materials shall be subjected to inspection for acceptance as to condition at the latest practicable time the Engineer has the opportunity to check for compliance prior to or during incorporation of materials into the work.`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL1 – CMH WITH AB AND CAST IRON (Rdwy.)",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of construction of manholes and inlets in accordance with the Standard Specifications for Public Works and Highways and in reasonably close conformity with the lines and grades shown on the plans or as established by the Engineer-In-Charge.`,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Concrete for these structures shall meet the requirements of Item 405, Structural Concrete. Other materials shall meet the following specifications:`,
                break: 1,
              }),
              new TextRun({
                text: `CORRUGATED METAL UNITS`,
                break: 2,
              }),
              new TextRun({
                text: `The units shall conform to Plan dimensions and the metal to AASHTO M 36. Bituminous coating, when specified, shall conform to ASTM D 1187, Asphalt-base Emulsion for use as Protective Coating for Metal.`,
                break: 1,
              }),
            ],
          }),
          // TABLE CORRUGATED METAL UNITS
          h_tables.Corrugated_metal_units,
          new Paragraph({
            children: [
              new TextRun({
                text: `JOINT MORTAR`,
                break: 2,
              }),
              new TextRun({
                text: `Unless otherwise indicated on the Plans, joints mortar shall be composed of one part Portland Cement and two parts fine aggregate by volume to which hydrated lime has been added in an amount equal to 10 percent of the cement by weight. All materials for mortar shall meet the requirements of Item 405, Structural Concrete.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FRAMES, GRATINGS, COVERS AND LADDER RUNGS`,
                break: 2,
              }),
              new TextRun({
                text: `Metal units shall conform to the plan dimensions and to the following specification requirements for the designated materials. Metal gratings and covers which are to rest on frames shall bear on them evenly. They shall be assembled before shipment and so marked that the same pieces may be reassembled readily in the same position when installed. Inaccuracy of bearings shall be corrected by machining, if necessary. A frame and a grating or cover to be used with it shall constitute one pair. 
                All castings shall be uniformly coated with asphalt-based emulsion meeting the requirements of ASTM D 1187, Asphalt-base Emulsion for use as Protective Coating for Metal. Samples of the material in casting shall be taken during the casting of the units and shall be separate casting poured from the same material as the casting they represent
                
                `,
                break: 1,
              }),
            ],
          }),
          // TABLE FRAMES, GRATINGS, COVERS AND LADDER RUNGS
          h_tables.Frames,
          new Paragraph({
            children: [
              new TextRun({
                text: `PRE-CAST CONCRETE UNITS`,
                break: 2,
              }),
              new TextRun({
                text: `These units shall be cast in substantial permanent steel forms. Structural concrete used shall attain a minimum 28-day compressive strength of 20.682 MPa (3000 psi). The pre-cast units shall be cured in accordance with AASHTO M 171. Water absorption of individual cores taken from such units shall not exceed 7 percent. Additional reinforcement shall be provided as necessary to provide for handling of the pre-cast units. A sufficient number of cylinders shall be cast from the concrete for each unit permit compression tests at 7, 14 and 28 days, and to allow for at least 3 cylinders for each test. If the strength requirement is met at 7 or 14 days, the units shall be certified for use 14 days from the date of casting. If the strength is not met at 28 days, all units made from that batch or load will be rejected. Cracks in units, honeycombed or patched areas in excess of 2,000 square millimeters, excessive water absorption and failure to meet strength requirements shall be the causes for rejection. Pre-cast reinforced concrete manhole risers and tops shall conform to the requirements of AASHTO M 199. The plants will be inspected periodically for compliance with specified manufacturing methods, and material samples will be obtained for laboratory testing for compliance with material quality requirements. This may be the basis for acceptance of manufacturing lots as the quality. All materials shall be subjected to inspection for acceptance as to condition at the latest practicable time the Engineer has the opportunity to check for compliance prior to or during incorporation of materials into the work.
                
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL 2 – CHB LINED CANAL",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of construction of manholes and inlets in accordance with the Standard Specifications for Public Works and Highways and in reasonably close conformity with the lines and grades shown on the plans or as established by the Engineer-In-Charge.`,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Concrete for these structures shall meet the requirements of Item 405, Structural Concrete. Other materials shall meet the following specifications:`,
                break: 1,
              }),
              new TextRun({
                text: `CORRUGATED METAL UNITS`,
                break: 2,
              }),
              new TextRun({
                text: `The units shall conform to Plan dimensions and the metal to AASHTO M 36. Bituminous coating, when specified, shall conform to ASTM D 1187, Asphalt-base Emulsion for use as Protective Coating for Metal.`,
                break: 1,
              }),
            ],
          }),
          // TABLE CORRUGATED METAL UNITS
          h_tables.Corrugated_metal_units,
          new Paragraph({
            children: [
              new TextRun({
                text: `JOINT MORTAR`,
                break: 2,
              }),
              new TextRun({
                text: `Unless otherwise indicated on the Plans, joints mortar shall be composed of one part Portland Cement and two parts fine aggregate by volume to which hydrated lime has been added in an amount equal to 10 percent of the cement by weight. All materials for mortar shall meet the requirements of Item 405, Structural Concrete.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FRAMES, GRATINGS, COVERS AND LADDER RUNGS`,
                break: 2,
              }),
              new TextRun({
                text: `Metal units shall conform to the plan dimensions and to the following specification requirements for the designated materials. Metal gratings and covers which are to rest on frames shall bear on them evenly. They shall be assembled before shipment and so marked that the same pieces may be reassembled readily in the same position when installed. Inaccuracy of bearings shall be corrected by machining, if necessary. A frame and a grating or cover to be used with it shall constitute one pair. All castings shall be uniformly coated with asphalt-based emulsion meeting the requirements of ASTM D 1187, Asphalt-base Emulsion for use as Protective Coating for Metal. Samples of the material in casting shall be taken during the casting of the units and shall be separate casting poured from the same material as the casting they represent
                
                `,
                break: 1,
              }),
            ],
          }),
          // TABLE FRAMES, GRATINGS, COVERS AND LADDER RUNGS
          h_tables.Frames,
          new Paragraph({
            children: [
              new TextRun({
                text: `PRE-CAST CONCRETE UNITS`,
                break: 2,
              }),
              new TextRun({
                text: `These units shall be cast in substantial permanent steel forms. Structural concrete used shall attain a minimum 28-day compressive strength of 20.682 MPa (3000 psi). The pre-cast units shall be cured in accordance with AASHTO M 171. Water absorption of individual cores taken from such units shall not exceed 7 percent. Additional reinforcement shall be provided as necessary to provide for handling of the pre-cast units. A sufficient number of cylinders shall be cast from the concrete for each unit permit compression tests at 7, 14 and 28 days, and to allow for at least 3 cylinders for each test. If the strength requirement is met at 7 or 14 days, the units shall be certified for use 14 days from the date of casting. If the strength is not met at 28 days, all units made from that batch or load will be rejected. Cracks in units, honeycombed or patched areas in excess of 2,000 square millimeters, excessive water absorption and failure to meet strength requirements shall be the causes for rejection. Pre-cast reinforced concrete manhole risers and tops shall conform to the requirements of AASHTO M 199. The plants will be inspected periodically for compliance with specified manufacturing methods, and material samples will be obtained for laboratory testing for compliance with material quality requirements. This may be the basis for acceptance of manufacturing lots as the quality. All materials shall be subjected to inspection for acceptance as to condition at the latest practicable time the Engineer has the opportunity to check for compliance prior to or during incorporation of materials into the work.
                
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL 3 – SECTIONAL SQUARING AND ASPHALT PATCHING",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of preparing and treating an existing base, asphalt pavement and existing concrete pavement with material in accordance with the Plans and Specifications preparatory to the construction of a bituminous surface course. This item shall consist of constructing a bituminous concrete surface course composed of aggregates, mineral filler and bituminous material mixed in a central plant, constructed and laid hot on the prepared base in accordance with this Specification and in conformity with the lines, grades, thickness and cross-section shown on the Plans. 
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Bituminous material shall be either Rapid Curing (RC) Cut-back or Emulsified Asphalt, whichever is called for in the Bill of Quantities. It shall conform to the requirements of Item 702, Bituminous Materials. The type and grade will be specified in the Special Provisions. `,
                break: 2,
              }),
              new TextRun({
                text: `COMPOSITION AND QUALITY OF BITUMINOUS MIXTURE (Job-Mix Formula)
                The bituminous mixture shall be composed of aggregate, mineral filler, hydrated lime, and bituminous material. At least three weeks prior to production, the Contractor shall submit in writing a job-mix formula for each mixture supported by laboratory test data along with samples and sources of the components and viscosity-temperature relationships information to the Engineer for testing and approval.        
                `,
                break: 2,
              }),
              new TextRun({
                text: `Each job-mix formula submitted shall propose definite single values for:              
                `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `1. The percentage of aggregate passing each specified sieve size.`,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `2. The percentage of bituminous material to be added.`,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `3. The temperature of the mixture delivered on the road.`,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `4. The kind and percentage of additive to be used.`,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `5. The kind and percentage of mineral filler to be used.`,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `After the job-mix is established, all mixture furnished for the project shall conform thereto within the following ranges of tolerances: `,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 0 },
            children: [
              new TextRun({
                text: `Passing No. 4 and larger sieves 	             ±	7 percent `,
              }),
              new TextRun({
                text: `Passing No. 8 to No. 100 sieves (inclusive) 	±	4 percent`,
                break: 1,
              }),
              new TextRun({
                text: `Passing No. 200 sieve 	                                       ±	2 percent `,
                break: 1,
              }),
              new TextRun({
                text: `Bituminous Material 	                                       ±	0.4 percent `,
                break: 1,
              }),
              new TextRun({
                text: `Temperature of Mixture	                                       ±	10֯ C`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Should a change in source of material be proposed or should a job-mix formula prove unsatisfactory, a new job-mix formula shall be submitted by the Contractor in writing and be approved by the Engineer prior to production. Approval of a new job mix formula may require laboratory testing and verification. The mixture shall have a minimum compressive strength of 1.4 MPa (200 psi). The mixture shall have a mass percent air voids with the range of 3 to 5. The mixture shall also have an index of retained strength of not less than `,
              }),
              new TextRun({
                text: `70 when tested by AASHTO T 165. For aggregates having maximum sizes over 25 mm (1 inch), AASHTO T 165 will be modified to use 150 mm x 150 mm (6 x 6 inches) cylindrical specimens. The 150 mm (6 inches’ cylinders will be compacted by the procedures outlined in AASHTO T 167 modified to employ 10 repetitions of a molding load of 9.6 MPa (1400 psi), with no appreciable holding time after each application of the full load.  `,
                break: 1,
              }),
              new TextRun({
                text: `BITUMINOUS MATERIAL`,
                break: 2,
              }),
              new TextRun({
                text: `It shall be Penetration Grade Asphalt Cement. Asphalt cement shall conform to the requirements of AASHTO M 226.`,
                break: 1,
              }),
              new TextRun({
                text: `AGGREGATES`,
                break: 2,
              }),
              new TextRun({
                text: `It shall be uniformly graded from coarse to fine. Target value for the intermediate sieve sizes shall be established within the limits shown in table 703.1. The contractor shall submit the proposed target value in writing to the Engineer-In-Charge for approval. The target gradation is subject to confirmation testing in accordance with section 307.2 before approval by the engineer. Any changes in the target gradation are subject to confirmation testing in accordance with section 307.2., unless otherwise approved in writing by the engineer. No target gradation adjustment will be permitted during the span of a lot.`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL 4 – BARRICADE FOR EXCAVATION & MH WITH CAUTION TAPE",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of furnishing, placing and finishing concrete and reinforcing bars in all structures of the concrete barricade in conformity to the lines, grades, and dimensions shown on the Plans. Compressive strength of concrete shall be 4000 psi and reinforcing steel bars shall not be less than Grade 60.`,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `PORTLAND CEMENT`,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the applicable requirements of AASHTO M 85, Hydraulic Cement. Only Type I Portland Cement shall be used unless otherwise provided for in the Special Provisions. Different brands or the same brands from different mills shall not be mixed nor shall they be used alternately unless the mix is approved by the Engineer. Cement which for any reason, has become partially set or which contains lumps of caked cement shall be rejected. Samples of cement shall be obtained in accordance with AASHTO T 127.`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FINE AGGREGATES`,
                break: 2,
              }),
              new TextRun({
                text: `It shall consist of natural sand, stone screenings or other inert materials with similar characteristics, or combinations thereof, having hard, strong and durable particles. Fine aggregate from different sources of supply shall not be mixed or stored in the same pile nor used alternately in the same class of concrete without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `It shall not contain more than three (3) mass percent of material passing the 0.075 mm (No. 200 sieve) by washing nor more than one (1) mass percent each of clay lumps or shale. The use of beach sand will not be allowed without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `If the fine aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 10 mass percent. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be free from injurious amounts of organic impurities. If subjected to the colorimetric test for organic impurities and a color darker than the standard is produced, it shall be rejected. However, when tested for the effect of organic impurities of strength of mortar by AASHTO T 71, the fine aggregate may be used if the relative strength at 7 and 28 days is not less than 95 mass percent.  
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be well-graded from coarse to fine and shall conform to Table 311.1.
                `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.1 – Grading Requirements for Fine Aggregate`,
                break: 2,
              }),
            ],
          }),
          // TABLE 311.1
          h_tables.Table311_1,
          new Paragraph({
            children: [
              new TextRun({
                text: `COARSE AGGREGATES `,
                break: 2,
              }),
              new TextRun({
                text: `It shall consist of crushed stone, gravel, blast furnace slag, or other approved inert materials of similar characteristics, or combinations thereof, having hard, strong, durable pieces and free from any adherent coatings. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `It shall contain not more than one (1) mass percent of material passing the 0.075 mm (No. 200) sieve, not more than 0.25 mass percent of clay lumps, nor more than 3.5 mass percent of soft fragments. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `If the coarse aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 12 mass percent. 
                 
                `,
                break: 1,
              }),
              new TextRun({
                text: `It shall have a mass percent of wear not exceeding 40 when tested by AASHTO T 96. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `If the slag is used, its density shall not be less than 1120 kg/m3 (70 lb./cu. ft.). The gradation of the coarse aggregate shall conform to Table 311.2. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `Only one grading specification shall be used from any one source.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.2 – Grading Requirements for Coarse Aggregate`,
                break: 2,
              }),
            ],
          }),
          // TABLE 311.2
          h_tables.Table311_2_90,
          new Paragraph({
            children: [
              new TextRun({
                text: `WATER`,
                break: 2,
              }),
              new TextRun({
                text: `Water used in mixing, curing or other designated application shall be reasonably clean and free of oil, salt, acid, alkali, grass or other substances injurious to the finished product. Water will be tested in accordance with and shall meet the requirements of Item 714, Water. Water which is drinkable may be used without test. Where the source of water is shallow, the intake shall be so enclosed as to exclude silt, mud, grass or other foreign materials. 
                
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `REINFORCING STEEL`,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the requirements of Item 404, Reinforcing Steel. Dowels and tie bars shall conform to the requirements of AASHTO M 31 or M 42, except that rail steel shall not be used for tie bars that are to be bent and straightened during construction. Tie bars shall be deformed bars. Dowels shall be plain round bars. Before delivery to the site of work, one-half of the length of each dowel shall be painted with one coat of approved lead or tar paint. The sleeves for dowel bars shall be metal of approved design to cover 50 mm (2 inches), plus or minus 5 mm (1/4 inch) of the dowel, with a closed end, and with a suitable stop to hold the end of the sleeve at least 25 mm (1 inch) from the end of the dowel. Sleeves shall be of such design that they do not collapse during construction. 
                
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ADMIXTURES`,
                break: 2,
              }),
              new TextRun({
                text: `Air-entraining admixture shall conform to the requirements of AASHTO M 154. Chemical admixtures, if specified or permitted, shall conform to the requirements of AASHTO M 194. Fly Ash, if specified or permitted as a mineral admixture and as 20% partial replacement of Portland Cement in concrete mix shall conform to the requirements of ASTM C 618. Admixture should be added only to the concrete mix to produce some desired modifications to the properties of concrete where necessary, but not as partial replacement of cement. If specified, monofilament polypropylene synthetic fibrin fibers, which are used as admixture to prevent the formation of temperature/shrinkage cracks and increase impact resistance of concrete slabs shall be applied in the dosage rate recommended by its manufacturer.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `STORAGE OF CEMENT AND AGGREGATE`,
                break: 2,
              }),
              new TextRun({
                text: `All cement shall be stored, immediately upon delivery at the Site, in weatherproof building which will protect the cement from dampness. The floor shall be raised from the ground. The buildings shall be placed in locations approved by the Engineer. Provisions for storage shall be ample, and the 
                shipments of cement as received shall be separately stored in such a manner as to allow the earliest deliveries to be used first and to provide easy access for identification and inspection of each shipment. Storage buildings shall have capacity for storage of a sufficient quantity of cement to allow sampling at least twelve (12) days before the cement is to be used. Bulk cement, if used, shall be transferred to elevated air tight and weatherproof bins. Stored cement shall meet the test requirements at any time after storage when retest is ordered by the Engineer-in-charge. At the time of use, all cement shall be free-flowing and free of lumps. The handling and storing of concrete aggregates shall be such as to prevent segregation or the inclusion of foreign materials. The Engineer may require that aggregates be stored on separate platforms at satisfactory locations. In order to secure greater uniformity of concrete mix, the Engineer may require that the coarse aggregate be separated into two or more sizes. Different sizes of aggregate shall be stored in separate bins or in separate stockpiles sufficiently removed from each other to prevent the material at the edges of the piles from becoming intermixed. 
                
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FORM LUMBER`,
                break: 2,
              }),
              new TextRun({
                text: `It shall be specified on the plans. It shall be free from loose knots, splits, worn holes, decay, warp, ring separation, or any defects which will impair its strength or render it unfit for its intended use.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL5 – TAPPING DRAINAGE ",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of tapping of affected drainage systems of houses and other building structures within the road-right-of-way in conformity with the Standard Specifications for Public Works and Highways and on location as shown on the plans.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({}),
              new TextRun({
                text: `Joint mortar for concrete pipes shall consist of one-part, by volume of Portland Cement and two-parts of approved sand with water as necessary to obtain the required consistency. Mortar shall be used within 30 minutes after its preparation   
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `PORTLAND CEMENT`,
                break: 2,
              }),
              new TextRun({
                text: `
                It shall conform to the applicable requirements of AASHTO M 85, Hydraulic Cement. Only Type I Portland Cement shall be used unless otherwise provided for in the Special Provisions. Different brands or the same brands from different mills shall not be mixed nor shall they be used alternately unless the mix is approved by the Engineer-in-charge. Cement which for any reason, has become partially set or which contains lumps of caked cement shall be rejected. Cement salvaged from the discarded or used bags shall not be used. Samples of cement shall be obtained in accordance with AASHTO T 127
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FINE AGGREGATES`,
                break: 2,
              }),
              new TextRun({
                text: `
                It shall consist of natural sand, stone screenings or other inert materials with similar characteristics, or combinations thereof, having hard, strong and durable particles. Fine aggregate from different sources of supply shall not be mixed or stored in the same pile nor used alternately in the same class of concrete without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `
                It shall not contain more than three (3) mass percent of material passing the 0.075 mm (No. 200 sieve) by washing nor more than one (1) mass percent each of clay lumps or shale. The use of beach sand will not be allowed without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `
                If the fine aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 10 mass percent. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `
                The fine aggregate shall be free from injurious amounts of organic impurities. If subjected to the colorimetric test for organic impurities and a color darker than the standard is produced, it shall be rejected. However, when tested for the effect of organic impurities of strength of mortar by AASHTO T 71, the fine aggregate may be used if the relative strength at 7 and 28 days is not less than 95 mass percent. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `
                The fine aggregate shall be well-graded from coarse to fine and shall conform to Table 311.1 
                `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.1 – Grading Requirements for Fine Aggregate`,
                break: 2,
              }),
            ],
          }),
          // TABLE 311.1
          h_tables.Table311_1,
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL 6 – NAWASA LEAK / 20 Meters",
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of repair of any MWSS/NAWASA lines that would be affected in excavation of roadway in accordance with the MWSS Standard Specification.
                `,
                break: 2,
              }),
              new TextRun({
                text: `Based on MWSS MATERIAL REQUIREMENTS`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL 7 – BILLBOARD",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of installation of Billboards on locations as established by the Engineer-In-Charge in conformity with the standard size, design, layout and dimension as shown in the Plans.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Based on the standard design approved by and material requirement of the implementing agency.`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL 8 – CONCRETE CURB",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of the construction of concrete curb made of concrete in accordance with the Standard Specifications for Public Works and Highways at the location and in conformity with the lines, grades, dimensions and design shown on the Plans or as required by the Engineer-In-Charge. Compressive strength for concrete mix to be used shall not be less than 4,000 psi.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL FOR BED COURSE`,
                break: 2,
              }),
              new TextRun({
                text: `Bed course materials as shown on the Plans shall consist of cinders, sand, slag, gravel, crushed stone, or other approved porous material of such grading that all the particles will pass through 12.5 mm (1/2 inch) sieve. `,
                break: 1,
              }),
              new TextRun({
                text: `CONCRETE`,
                break: 2,
              }),
              new TextRun({
                text: `Concrete shall be of the class indicated on the Plans and shall conform to the requirements of Item 405, Structural Concrete. `,
                break: 1,
              }),
              new TextRun({
                text: `EXPANSION JOINT FILLER`,
                break: 2,
              }),
              new TextRun({
                text: `Expansion joint filler shall conform to the requirements of AASHTO M 153/ joint materials.`,
                break: 1,
              }),
              new TextRun({
                text: `CEMENT MORTAR`,
                break: 2,
              }),
              new TextRun({
                text: `Cement mortar shall consist of one part of Portland cement and two parts of fine aggregates with water added as necessary to obtain the required consistency. The mortar shall be used within 30 minutes of preparation. `,
                break: 1,
              }),
              new TextRun({
                text: `BONDING COMPOUND`,
                break: 2,
              }),
              new TextRun({
                text: `Where bonding compound is used, it shall conform to AASHTO M 200. `,
                break: 1,
              }),
              new TextRun({
                text: `FORMS`,
                break: 2,
              }),
              new TextRun({
                text: `Forms shall be of wood or metal as approved by the Engineer and shall extend to the full depth of the concrete. All forms shall be straight, free from warps and of adequate strength to resist distortion.`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL9-CONCRETE PATHWALK",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of the construction of pathwalk made of concrete in accordance with the Standard Specifications for Public Works and Highways at the location and in conformity with the lines, grades, dimensions and design shown on the Plans or as required by the Engineer-In-Charge. Compressive strength for concrete mix to be used shall not be less than 4,000 psi.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `PORTLAND CEMENT CONCRETE`,
                break: 2,
              }),
              new TextRun({
                text: `The cement concrete shall be Class A as specified in Item 405, Structural Concrete. `,
                break: 1,
              }),
              new TextRun({
                text: `EXPANSION JOINT FILLER`,
                break: 2,
              }),
              new TextRun({
                text: `Unless otherwise ordered, the preformed joint filler shall have a thickness of 5 mm and shall conform to the requirements of Item 311, Portland Cement Concrete Pavement. `,
                break: 1,
              }),
              new TextRun({
                text: `FORMS`,
                break: 2,
              }),
              new TextRun({
                text: `Forms shall be of wood or metal as approved by the Engineer and shall extend to the full depth of the concrete. All forms shall be straight, free from warps and of adequate strength to resist distortion. `,
                break: 1,
              }),
              new TextRun({
                text: `BED COURSE MATERIAL`,
                break: 2,
              }),
              new TextRun({
                text: `Bed course material consists of cinders, sand, slag, gravel, crushed stone or other approved permeable granular material of such grading that all particles shall pass a 12.5 mm (1/2 inch) sieve.  `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL10 – DOUBLE HANDLING OF CONSTRUCTION MATERIALS",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `this item shall consist of the transport and delivery of all materials necessary in the implementation of all scope of works covered by the contract.
                `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL 10a/10b – THERMOPLASTIC MARKINGS (WHITE/YELLOW)",
                bold: true,
              }),
              new TextRun({
                text: "MATERIAL REQUIREMENTS",
                break: 1,
              }),
              new TextRun({
                text: `Reflectorized thermoplastic pavement material shall be homogeneously composed of pigment, filler, resins, and glass reflectorizing spheres.
                `,
                break: 2,
              }),
              new TextRun({
                text: `The thermoplastic materials shall be available to both white and yellow.
                `,
                break: 1,
              }),
              new TextRun({
                text: `Glass Beads (Pre-mix) shall be uncoated and shall comply with the following requirements:
                `,
                break: 1,
              }),
              new TextRun({
                text: `Refractive Index, min. – 1.5 
                `,
                break: 1,
              }),
              new TextRun({
                text: `Spheres Percent, min. – 90 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Gradation:`,
                break: 2,
              }),
            ],
          }),
          // TABLE GRADATION
          h_tables.Gradation,
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL 11- MANHOLE WITH ANGULAR BAR and SG (Ht. = Variable)",
                bold: true,
                break: 2,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of construction of manholes and inlets in accordance with the Standard Specifications for Public Works and Highways and in reasonably close conformity with the lines and grades shown on the plans or as established by the Engineer-In-Charge.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Concrete for these structures shall meet the requirements of Item 405, Structural Concrete. Other materials shall meet the following specifications:`,
                break: 2,
              }),
              new TextRun({
                text: `CORRUGATED METAL UNITS`,
                break: 2,
              }),
              new TextRun({
                text: `The units shall conform to Plan dimensions and the metal to AASHTO M 36. Bituminous coating, when specified, shall conform to ASTM D 1187, Asphalt-base Emulsion for use as Protective Coating for Metal.`,
                break: 1,
              }),
            ],
          }),
          // TABLE CORRUGATED META UNITS
          h_tables.Corrugated_metal_units,
          new Paragraph({
            children: [
              new TextRun({
                text: `JOINT MORTAR`,
                break: 2,
              }),
              new TextRun({
                text: `Unless otherwise indicated on the Plans, joints mortar shall be composed of one part Portland Cement and two parts fine aggregate by volume to which hydrated lime has been added in an amount equal to 10 percent of the cement by weight. All materials for mortar shall meet the requirements of Item 405, Structural Concrete.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FRAMES, GRATINGS, COVERS AND LADDER RUNGS`,
                break: 2,
              }),
              new TextRun({
                text: `Metal units shall conform to the plan dimensions and to the following specification requirements for the designated materials. Metal gratings and covers which are to rest on frames shall bear on them evenly. They shall be assembled before shipment and so marked that the same pieces may be reassembled readily in the same position when installed. Inaccuracy of bearings shall be corrected by machining, if necessary. A frame and a grating or cover to be used with it shall constitute one pair. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `All castings shall be uniformly coated with asphalt-based emulsion meeting the requirements of ASTM D 1187, Asphalt-base Emulsion for use as Protective Coating for Metal. Samples of the material in casting shall be taken during the casting of the units and shall be separate casting poured from the same material as the casting they represent
                `,
                break: 1,
              }),
            ],
          }),
          // TABLE FRAMES GRATINGS COVERS AND LADDER LUNGS
          h_tables.Frames,
          new Paragraph({
            children: [
              new TextRun({
                text: `PRE-CAST CONCRETE UNITS`,
                break: 2,
              }),
              new TextRun({
                text: `These units shall be cast in substantial permanent steel forms. Structural concrete used shall attain a minimum 28-day compressive strength of 20.682 MPa (3000 psi). The pre-cast units shall be cured in accordance with AASHTO M 171. Water absorption of individual cores taken from such units shall not exceed 7 percent. Additional reinforcement shall be provided as necessary to provide for handling of the pre-cast units. A sufficient number of cylinders shall be cast from the concrete for each unit permit compression tests at 7, 14 and 28 days, and to allow for at least 3 cylinders for each test. If the strength requirement is met at 7 or 14 days, the units shall be certified for use 14 days from the date of casting. If the strength is not met at 28 days, all units made from that batch or load will be rejected. Cracks in units, honeycombed or patched areas in excess of 2,000 square millimeters, excessive water absorption and failure to meet strength requirements shall be the causes for rejection. Pre-cast reinforced concrete manhole risers and tops shall conform to the requirements of AASHTO M 199. The plants will be inspected periodically for compliance with specified manufacturing methods, and material samples will be obtained for laboratory testing for compliance with material quality requirements. This may be the basis for acceptance of manufacturing lots as the quality. All materials shall be subjected to inspection for acceptance as to condition at the latest practicable time the Engineer has the opportunity to check for compliance prior to or during incorporation of materials into the work.`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL 12 CONSTRUCTION SAFETY AND HEALTH ",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall include necessary provision of construction safety and health gear such as safety vest, Safety helmet, First Aid Kit, Safety Boots and Gloves. All materials delivered and utilized for the project shall be turned-over to the Implementing agency after the completion of the project.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Based on the standard design and specifications approved by and material requirement of the implementing agency.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL 13 STEEL BARRIER (RENTAL)",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of installation of steel barriers on locations as established by the Engineer-In-Charge in conformity with the Standard size, design, layout and dimension as shown in the Plans.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Based on the standard design approved by and material requirement of the implementing agency.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL 14 – ASPHALT PAVEMENT / APPROACH",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of preparing and treating an existing base, asphalt pavement and existing concrete pavement with material in accordance with the Plans and Specifications preparatory to the construction of a bituminous surface course. This item shall consist of constructing a bituminous concrete surface course composed of aggregates, mineral filler and bituminous material mixed in a central plant, constructed and laid hot on the prepared base in accordance with this Specification and in conformity with the lines, grades, thickness and cross-section shown on the Plans.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Bituminous material shall be either Rapid Curing (RC) Cut-back or Emulsified Asphalt, whichever is called for in the Bill of Quantities. It shall conform to the requirements of Item 702, Bituminous Materials. The type and grade will be specified in the Special Provisions.               
                `,
                break: 2,
              }),
              new TextRun({
                text: `COMPOSITION AND QUALITY OF BITUMINOUS MIXTURE (Job-Mix Formula)
                The bituminous mixture shall be composed of aggregate, mineral filler, hydrated lime, and bituminous material. At least three weeks prior to production, the Contractor shall submit in writing a job-mix formula for each mixture supported by laboratory test data along with samples and sources of the components and viscosity-temperature relationships information to the Engineer for testing and approval.          
                `,
                break: 2,
              }),
              new TextRun({
                text: `Each job-mix formula submitted shall propose definite single values for:              
                `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `1. The percentage of aggregate passing each specified sieve size.`,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `2. The percentage of bituminous material to be added.`,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `3. The temperature of the mixture delivered on the road.`,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `4. The kind and percentage of additive to be used.`,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 250 },
            children: [
              new TextRun({
                text: `5. The kind and percentage of mineral filler to be used.`,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `After the job-mix is established, all mixture furnished for the project shall conform thereto within the following ranges of tolerances: `,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 800, hanging: 0 },
            children: [
              new TextRun({
                text: `Passing No. 4 and larger sieves 	             ±	7 percent `,
              }),
              new TextRun({
                text: `Passing No. 8 to No. 100 sieves (inclusive) 	±	4 percent`,
                break: 1,
              }),
              new TextRun({
                text: `Passing No. 200 sieve 	                                       ±	2 percent `,
                break: 1,
              }),
              new TextRun({
                text: `Bituminous Material 	                                       ±	0.4 percent `,
                break: 1,
              }),
              new TextRun({
                text: `Temperature of Mixture	                                       ±	10֯ C`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Should a change in source of material be proposed or should a job-mix formula prove unsatisfactory, a new job-mix formula shall be submitted by the Contractor in writing and be approved by the Engineer prior to production. Approval of a new job mix formula may require laboratory testing and verification. The mixture shall have a minimum compressive strength of 1.4 MPa (200 psi). The mixture shall have a mass percent air voids with the range of 3 to 5. The mixture shall also have an index of retained strength of not less than `,
              }),
              new TextRun({
                text: `70 when tested by AASHTO T 165. For aggregates having maximum sizes over 25 mm (1 inch), AASHTO T 165 will be modified to use 150 mm x 150 mm (6 x 6 inches) cylindrical specimens. The 150 mm (6 inches’ cylinders will be compacted by the procedures outlined in AASHTO T 167 modified to employ 10 repetitions of a molding load of 9.6 MPa (1400 psi), with no appreciable holding time after each application of the full load.  `,
                break: 1,
              }),
              new TextRun({
                text: `BITUMINOUS MATERIAL`,
                break: 2,
              }),
              new TextRun({
                text: `It shall be Penetration Grade Asphalt Cement. Asphalt cement shall conform to the requirements of AASHTO M 226.`,
                break: 1,
              }),
              new TextRun({
                text: `AGGREGATES`,
                break: 1,
              }),
              new TextRun({
                text: `It shall be uniformly graded from coarse to fine. Target value for the intermediate sieve sizes shall be established within the limits shown in table 703.1. The contractor shall submit the proposed target value in writing to the Engineer-In-Charge for approval. The target gradation is subject to confirmation testing in accordance with section 307.2 before approval by the engineer. Any changes in the target gradation are subject to confirmation testing in accordance with section 307.2., unless otherwise approved in writing by the engineer. No target gradation adjustment will be permitted during the span of a lot.`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL 15 – DECLOGGING",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of cleaning and reconditioning of existing drainage system and appurtenant structures in reasonably close conformity with the Standard Specification for Public Works and Highways and as shown on the Plans.
                `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL – REINFORCED CONCRETE FOOTING OF RIPRAP",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of furnishing, placing and finishing concrete and reinforcing bars in all structures of the concrete barricade in conformity to the lines, grades, and dimensions shown on the Plans. Compressive strength of concrete shall be 4000 psi and reinforcing steel bars shall not be less than Grade 60.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `PORTLAND CEMENT       
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the applicable requirements of AASHTO M 85, Hydraulic Cement. Only Type I Portland Cement shall be used unless otherwise provided for in the Special Provisions. Different brands or the same brands from different mills shall not be mixed nor shall they be used alternately unless the mix is approved by the Engineer. Cement which for any reason, has become partially set or which contains lumps of caked cement shall be rejected. Samples of cement shall be obtained in accordance with AASHTO T 127.            
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FINE AGGREGATES`,
                break: 2,
              }),
              new TextRun({
                text: `It shall consist of natural sand, stone screenings or other inert materials with similar characteristics, or combinations thereof, having hard, strong and durable particles. Fine aggregate from different sources of supply shall not be mixed or stored in the same pile nor used alternately in the same class of concrete without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `It shall not contain more than three (3) mass percent of material passing the 0.075 mm (No. 200 sieve) by washing nor more than one (1) mass percent each of clay lumps or shale. The use of beach sand will not be allowed without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `If the fine aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 10 mass percent. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be free from injurious amounts of organic impurities. If subjected to the colorimetric test for organic impurities and a color darker than the standard is produced, it shall be rejected. However, when tested for the effect of organic impurities of strength of mortar by AASHTO T 71, the fine aggregate may be used if the relative strength at 7 and 28 days is not less than 95 mass percent.  
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be well-graded from coarse to fine and shall conform to Table 311.1.
                `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.1 – Grading Requirements for Fine Aggregate`,
              }),
            ],
          }),
          // TABLE 311.1
          h_tables.Table311_1,
          new Paragraph({
            children: [
              new TextRun({
                text: `COARSE AGGREGATES`,
                break: 2,
              }),
              new TextRun({
                text: `It shall consist of crushed stone, gravel, blast furnace slag, or other approved inert materials of similar characteristics, or combinations thereof, having hard, strong, durable pieces and free from any adherent coatings. `,
                break: 1,
              }),
              new TextRun({
                text: `It shall contain not more than one (1) mass percent of material passing the 
                0.075 mm (No. 200) sieve, not more than 0.25 mass percent of clay lumps, nor more than 3.5 mass percent of soft fragments. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `If the coarse aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 12 mass percent. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `It shall have a mass percent of wear not exceeding 40 when tested by AASHTO T 96. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `If the slag is used, its density shall not be less than 1120 kg/m3 (70 lb./cu. ft.). The gradation of the coarse aggregate shall conform to Table 311.2. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `Only one grading specification shall be used from any one source.
                 `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.2 – Grading Requirements for Coarse Aggregate`,
              }),
            ],
          }),
          // TABLE 311.2
          h_tables.Table311_2_3,
          new Paragraph({
            children: [
              new TextRun({
                text: `WATER
                `,
                break: 2,
              }),
              new TextRun({
                text: `Water used in mixing, curing or other designated application shall be reasonably clean and free of oil, salt, acid, alkali, grass or other substances injurious to the finished product. Water will be tested in accordance with and shall meet the requirements of Item 714, Water. Water which is drinkable may be used without test. Where the source of water is shallow, the intake shall be so enclosed as to exclude silt, mud, grass or other foreign materials.  
                `,
                break: 1,
              }),
              new TextRun({
                text: `REINFORCING STEEL
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the requirements of Item 404, Reinforcing Steel. Dowels and tie bars shall conform to the requirements of AASHTO M 31 or M 42, except that rail steel shall not be used for tie bars that are to be bent and straightened during construction. Tie bars shall be deformed bars. Dowels shall be plain round bars. Before delivery to the site of work, one-half of the length of each dowel shall be painted with one coat of approved lead or tar paint. The sleeves for dowel bars shall be metal of approved design to cover 50 mm (2 inches), plus or minus 5 mm (1/4 inch) of the dowel, with a closed end, and with a suitable stop to hold the end of the sleeve at least 25 mm (1 inch) from the end of the dowel. Sleeves shall be of such design that they do not collapse during construction.  
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ADMIXTURES
                `,
              }),
              new TextRun({
                text: `Air-entraining admixture shall conform to the requirements of AASHTO M 154. Chemical admixtures, if specified or permitted, shall conform to the requirements of AASHTO M 194. Fly Ash, if specified or permitted as a mineral admixture and as 20% partial replacement of Portland Cement in concrete mix shall conform to the requirements of ASTM C 618. Admixture should be added only to the concrete mix to produce some desired modifications to the properties of concrete where necessary, but not as partial replacement of cement. If specified, monofilament polypropylene synthetic fibrin fibers, which are used as admixture to prevent the formation of temperature/shrinkage cracks and increase impact resistance of concrete slabs shall be applied in the dosage rate recommended by its manufacturer.
                `,
                break: 1,
              }),
              new TextRun({
                text: `STORAGE OF CEMENT AND AGGREGATE
                `,
                break: 2,
              }),
              new TextRun({
                text: `All cement shall be stored, immediately upon delivery at the Site, in weatherproof building which will protect the cement from dampness. The floor shall be raised from the ground. The buildings shall be placed in locations approved by the Engineer. Provisions for storage shall be ample, and the 
                shipments of cement as received shall be separately stored in such a manner as to allow the earliest deliveries to be used first and to provide easy access for identification and inspection of each shipment. Storage buildings shall have capacity for storage of a sufficient quantity of cement to allow sampling at least twelve (12) days before the cement is to be used. Bulk cement, if used, shall be transferred to elevated air tight and weatherproof bins. Stored cement shall meet the test requirements at any time after storage when retest is ordered by the Engineer-in-charge. At the time of use, all cement shall be free-flowing and free of lumps. The handling and storing of concrete aggregates shall be such as to prevent segregation or the inclusion of foreign materials. The Engineer may require that aggregates be stored on separate platforms at satisfactory locations. In order to secure greater uniformity of concrete mix, the Engineer may require that the coarse aggregate be separated into two or more sizes. Different sizes of aggregate shall be stored in separate bins or in separate stockpiles sufficiently removed from each other to prevent the material at the edges of the piles from becoming intermixed. 
                
                `,
                break: 1,
              }),
              new TextRun({
                text: `FORM LUMBER
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall be specified on the plans. It shall be free from loose knots, splits, worn holes, decay, warp, ring separation, or any defects which will impair its strength or render it unfit for its intended use.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL – DRAINAGE INTERCEPTOR ",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of construction of manholes and inlets in accordance with the Standard Specifications for Public Works and Highways and in reasonably close conformity with the lines and grades shown on the plans or as established by the Engineer-In-Charge.`,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Concrete for these structures shall meet the requirements of Item 405, Structural Concrete. Other materials shall meet the following specifications:`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `CORRUGATED METAL UNITS`,
              }),
              new TextRun({
                text: `The units shall conform to Plan dimensions and the metal to AASHTO M 36. Bituminous coating, when specified, shall conform to ASTM D 1187, Asphalt-base Emulsion for use as Protective Coating for Metal
                `,
                break: 1,
              }),
            ],
          }),
          // TABLE CORRUGATED METAL UNITS
          h_tables.Corrugated_metal_units,
          new Paragraph({
            children: [
              new TextRun({
                text: `JOINT MORTAR`,
              }),
              new TextRun({
                text: `Unless otherwise indicated on the Plans, joints mortar shall be composed of one part Portland Cement and two parts fine aggregate by volume to which hydrated lime has been added in an amount equal to 10 percent of the cement by weight. All materials for mortar shall meet the requirements of Item 405, Structural Concrete.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FRAMES, GRATINGS, COVERS AND LADDER RUNGS`,
                break: 2,
              }),
              new TextRun({
                text: `Metal units shall conform to the plan dimensions and to the following specification requirements for the designated materials. Metal gratings and covers which are to rest on frames shall bear on them evenly. They shall be assembled before shipment and so marked that the same pieces may be reassembled readily in the same position when installed. Inaccuracy of bearings shall be corrected by machining, if necessary. A frame and a grating or cover to be used with it shall constitute one pair. 
                All castings shall be uniformly coated with asphalt-based emulsion meeting the requirements of ASTM D 1187, Asphalt-base Emulsion for use as Protective Coating for Metal. Samples of the material in casting shall be taken during the casting of the units and shall be separate casting poured from the same material as the casting they represent`,
                break: 1,
              }),
            ],
          }),
          // TABLE FRAMES GRATINGS COVERS AND LADDER LUNGS
          h_tables.Frames,
          new Paragraph({
            children: [
              new TextRun({
                text: `PRE-CAST CONCRETE UNITS`,
                break: 2,
              }),
              new TextRun({
                text: `These units shall be cast in substantial permanent steel forms. Structural concrete used shall attain a minimum 28-day compressive strength of 20.682 MPa (3000 psi). The pre-cast units shall be cured in accordance with AASHTO M 171. Water absorption of individual cores taken from such units shall not exceed 7 percent. Additional reinforcement shall be provided as necessary to provide for handling of the pre-cast units. A sufficient number of cylinders shall be cast from the concrete for each unit permit compression tests at 7, 14 and 28 days, and to allow for at least 3 cylinders for each test. If the strength requirement is met at 7 or 14 days, the units shall be certified for use 14 days from the date of casting. If the strength is not met at 28 days, all units made from that batch or load will be rejected. Cracks in units, honeycombed or patched areas in excess of 2,000 square millimeters, excessive water absorption and failure to meet strength requirements shall be the causes for rejection. Pre-cast reinforced concrete manhole risers and tops shall conform to the requirements of AASHTO M 199. The plants will be inspected periodically for compliance with specified manufacturing methods, and material samples will be obtained for laboratory testing for compliance with material quality requirements. This may be the basis for acceptance of manufacturing lots as the quality. All materials shall be subjected to inspection for acceptance as to condition at the latest practicable time the Engineer has the opportunity to check for compliance prior to or during incorporation of materials into the work.`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL – REINFORCED BOX CULVERT ",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of furnishing, placing and finishing concrete and reinforcing bars in all structures of the concrete barricade in conformity to the lines, grades, and dimensions shown on the Plans. Compressive strength of concrete shall be 4000 psi and reinforcing steel bars shall not be less than Grade 60.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `PORTLAND CEMENT       
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the applicable requirements AASHTO M 85, Hydraulic Cement. Only Type I Portland Cement shall be used unless otherwise provided for in the Special Provisions. Different brands or the same brands from different mills shall not be mixed nor shall they be used alternately unless the mix is approved by the Engineer. However, the use of Portland Pozzolana Cement Type IP meeting the requirements of AASHTO M 240/ASTM C 695, Specifications for Blended Hydraulic Cement shall be allowed, provided that trial mixes shall be done and that the mixes meet the concrete strength requirements, the AASHTO/ASTM provisions pertinent to the use of Portland Pozzolana Type IP shall be adopted. Cement which for any reason, has become partially set or which contains lumps of caked cement shall be rejected. Samples of cement shall be obtained in accordance with AASHTO T 127.            
                `,
                break: 1,
              }),
              new TextRun({
                text: `FINE AGGREGATES
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall consist of natural sand, stone screenings or other inert materials with similar characteristics, or combinations thereof, having hard, strong and durable particles. Fine aggregate from different sources of supply shall not be mixed or stored in the same pile nor used alternately in the same class of concrete without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `It shall not contain more than three (3) mass percent of material passing the 0.075 mm (No. 200 sieve) by washing nor more than one (1) mass percent each of clay lumps or shale. The use of beach sand will not be allowed without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `If the fine aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 10 mass percent. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be free from injurious amounts of organic impurities. If subjected to the colorimetric test for organic impurities and a color darker than the standard is produced, it shall be rejected. However, when tested for the effect of organic impurities of strength of mortar by AASHTO T 71, the fine aggregate may be used if the relative strength at 7 and 28 days is not less than 95 mass percent. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be well-graded from coarse to fine and shall 
                conform to Table 311.1`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.1 – Grading Requirements for Fine Aggregate`,
              }),
            ],
          }),
          // TABLE 311.1
          h_tables.Table311_1,
          new Paragraph({
            children: [
              new TextRun({
                text: `COARSE AGGREGATES`,
              }),
              new TextRun({
                text: `It shall consist of crushed stone, gravel, blast furnace slag, or other approved inert materials of similar characteristics, or combinations thereof, having hard, strong, durable pieces and free from any adherent coatings. `,
                break: 1,
              }),
              new TextRun({
                text: `It shall contain not more than one (1) mass percent of material passing the 
                0.075 mm (No. 200) sieve, not more than 0.25 mass percent of clay lumps, nor more than 3.5 mass percent of soft fragments. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `If the coarse aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 12 mass percent. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `It shall have a mass percent of wear not exceeding 40 when tested by AASHTO T 96. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `If the slag is used, its density shall not be less than 1120 kg/m3 (70 lb./cu. ft.). The gradation of the coarse aggregate shall conform to Table 311.2. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `Only one grading specification shall be used from any one source.
                 `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.2 – Grading Requirements for Coarse Aggregate`,
              }),
            ],
          }),
          // TABLE 311.2
          h_tables.Table311_2_4,
          new Paragraph({
            children: [
              new TextRun({
                text: `WATER
                `,
                break: 2,
              }),
              new TextRun({
                text: `Water used in mixing, curing or other designated application shall be reasonably clean and free of oil, salt, acid, alkali, grass or other substances injurious to the finished product. Water will be tested in accordance with and shall meet the requirements of Item 714, Water. Water which is drinkable may be used without test. Where the source of water is shallow, the intake shall be so enclosed as to exclude silt, mud, grass or other foreign materials.  
                `,
                break: 1,
              }),
              new TextRun({
                text: `REINFORCING STEEL
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the requirements of AASHTO M 225, Reinforcing Steel. Dowels and tie bars shall conform to the requirements of AASHTO M 31 or M 42, except that rail steel shall not be used for tie bars that are to be bent and straightened during construction. Tie bars shall be deformed bars. Dowels shall be plain round bars. Before delivery to the site of work, one-half of the length of each dowel shall be painted with one coat of approved lead or tar paint. The sleeves for dowel bars shall be metal of approved design to cover 50 mm (2 inches), plus or minus 5 mm (1/4 inch) of the dowel, with a closed end, and with a suitable stop to hold the end of the sleeve at least 25 mm (1 inch) from the end of the dowel. Sleeves shall be of such design that they do not collapse during construction. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ADMIXTURES
                `,
              }),
              new TextRun({
                text: `Air-entraining admixture shall conform to the requirements of AASHTO M 154. Chemical admixtures, if specified or permitted, shall conform to the requirements of AASHTO M 194. Fly Ash, if specified or permitted as a mineral admixture and as 20% partial replacement of Portland Cement in concrete mix shall conform to the requirements of ASTM C 618. Admixture should be added only to the concrete mix to produce some desired modifications to the properties of concrete where necessary, but not as partial replacement of cement. If specified, monofilament polypropylene synthetic fibrin fibers, which are used as admixture to prevent the formation of temperature/shrinkage cracks and increase impact resistance of concrete slabs shall be applied in the dosage rate recommended by its manufacturer.
                `,
                break: 1,
              }),
              new TextRun({
                text: `STORAGE OF CEMENT AND AGGREGATE
                `,
                break: 2,
              }),
              new TextRun({
                text: `All cement shall be stored, immediately upon delivery at the Site, in weatherproof building which will protect the cement from dampness. The floor shall be raised from the ground. The buildings shall be placed in locations approved by the Engineer. Provisions for storage shall be ample, and the shipments of cement as received shall be separately stored in such a manner as to allow the earliest deliveries to be used first and to provide easy access for identification and inspection of each shipment. Storage buildings shall have capacity for storage of a sufficient quantity of cement to allow sampling at least twelve (12) days before the cement is to be used. Bulk cement, if used, shall be transferred to elevated air tight and weatherproof bins. Stored cement shall meet the test requirements at any time after storage when retest is ordered by the Engineer-in-charge. At the time of use, all cement shall be free-flowing and free of lumps. The handling and storing of concrete aggregates shall be such as to prevent segregation or the inclusion of foreign materials. The Engineer may require that aggregates be stored on separate platforms at satisfactory locations. In order to secure greater uniformity of concrete mix, the Engineer may require that the coarse aggregate be separated into two or more sizes. Different sizes of aggregate shall be stored in separate bins or in separate stockpiles sufficiently removed from each other to prevent the material at the edges of the piles from becoming intermixed.
                `,
                break: 1,
              }),
              new TextRun({
                text: `FORM LUMBER
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall be specified on the plans. It shall be free from loose knots, splits, worn holes, decay, warp, ring separation, or any defects which will impair its strength or render it unfit for its intended use.
                `,
                break: 1,
              }),
            ],
          }),
          //START
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL – CONSTRUCTION OF CONCRETE CANAL",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of furnishing, placing and finishing concrete and reinforcing bars in all structures of the concrete barricade in conformity to the lines, grades, and dimensions shown on the Plans. Compressive strength of concrete shall be 4000 psi and reinforcing steel bars shall not be less than Grade 60.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `PORTLAND CEMENT       
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the applicable requirements AASHTO M 85, Hydraulic Cement. Only Type I Portland Cement shall be used unless otherwise provided for in the Special Provisions. Different brands or the same brands from different mills shall not be mixed nor shall they be used alternately unless the mix is approved by the Engineer. However, the use of Portland Pozzolana Cement Type IP meeting the requirements of AASHTO M 240/ASTM C 695, Specifications for Blended Hydraulic Cement shall be allowed, provided that trial mixes shall be done and that the mixes meet the concrete strength requirements, the AASHTO/ASTM provisions pertinent to the use of Portland Pozzolana Type IP shall be adopted. Cement which for any reason, has become partially set or which contains lumps of caked cement shall be rejected. Samples of cement shall be obtained in accordance with AASHTO T 127.            
                `,
                break: 1,
              }),
              new TextRun({
                text: `FINE AGGREGATES
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall consist of natural sand, stone screenings or other inert materials with similar characteristics, or combinations thereof, having hard, strong and durable particles. Fine aggregate from different sources of supply shall not be mixed or stored in the same pile nor used alternately in the same class of concrete without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `It shall not contain more than three (3) mass percent of material passing the 0.075 mm (No. 200 sieve) by washing nor more than one (1) mass percent each of clay lumps or shale. The use of beach sand will not be allowed without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `If the fine aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 10 mass percent. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be free from injurious amounts of organic impurities. If subjected to the colorimetric test for organic impurities and a color darker than the standard is produced, it shall be rejected. However, when tested for the effect of organic impurities of strength of mortar by AASHTO T 71, the fine aggregate may be used if the relative strength at 7 and 28 days is not less than 95 mass percent. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be well-graded from coarse to fine and shall 
                conform to Table 311.1`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.1 – Grading Requirements for Fine Aggregate`,
              }),
            ],
          }),
          // TABLE 311.1
          h_tables.Table311_1,
          new Paragraph({
            children: [
              new TextRun({
                text: `COARSE AGGREGATES`,
                break: 2,
              }),
              new TextRun({
                text: `It shall consist of crushed stone, gravel, blast furnace slag, or other approved inert materials of similar characteristics, or combinations thereof, having hard, strong, durable pieces and free from any adherent coatings. `,
                break: 1,
              }),
              new TextRun({
                text: `It shall contain not more than one (1) mass percent of material passing the 
                0.075 mm (No. 200) sieve, not more than 0.25 mass percent of clay lumps, nor more than 3.5 mass percent of soft fragments. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `If the coarse aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 12 mass percent. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `It shall have a mass percent of wear not exceeding 40 when tested by AASHTO T 96. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `If the slag is used, its density shall not be less than 1120 kg/m3 (70 lb./cu. ft.). The gradation of the coarse aggregate shall conform to Table 311.2. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `Only one grading specification shall be used from any one source.
                 `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.2 – Grading Requirements for Coarse Aggregate`,
              }),
            ],
          }),
          // TABLE 311.2
          h_tables.Table311_2_5,
          new Paragraph({
            children: [
              new TextRun({
                text: `WATER
                `,
                break: 2,
              }),
              new TextRun({
                text: `Water used in mixing, curing or other designated application shall be reasonably clean and free of oil, salt, acid, alkali, grass or other substances injurious to the finished product. Water will be tested in accordance with and shall meet the requirements of Item 714, Water. Water which is drinkable may be used without test. Where the source of water is shallow, the intake shall be so enclosed as to exclude silt, mud, grass or other foreign materials.  
                `,
                break: 1,
              }),
              new TextRun({
                text: `REINFORCING STEEL
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the requirements of AASHTO M 225, Reinforcing Steel. Dowels and tie bars shall conform to the requirements of AASHTO M 31 or M 42, except that rail steel shall not be used for tie bars that are to be bent and straightened during construction. Tie bars shall be deformed bars. Dowels shall be plain round bars. Before delivery to the site of work, one-half of the length of each dowel shall be painted with one coat of approved lead or tar paint. The sleeves for dowel bars shall be metal of approved design to cover 50 mm (2 inches), plus or minus 5 mm (1/4 inch) of the dowel, with a closed end, and with a suitable stop to hold the end of the sleeve at least 25 mm (1 inch) from the end of the dowel. Sleeves shall be of such design that they do not collapse during construction. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ADMIXTURES
                `,
              }),
              new TextRun({
                text: `Air-entraining admixture shall conform to the requirements of AASHTO M 154. Chemical admixtures, if specified or permitted, shall conform to the requirements of AASHTO M 194. Fly Ash, if specified or permitted as a mineral admixture and as 20% partial replacement of Portland Cement in concrete mix shall conform to the requirements of ASTM C 618. Admixture should be added only to the concrete mix to produce some desired modifications to the properties of concrete where necessary, but not as partial replacement of cement. If specified, monofilament polypropylene synthetic fibrin fibers, which are used as admixture to prevent the formation of temperature/shrinkage cracks and increase impact resistance of concrete slabs shall be applied in the dosage rate recommended by its manufacturer.
                `,
                break: 1,
              }),
              new TextRun({
                text: `STORAGE OF CEMENT AND AGGREGATE
                `,
                break: 2,
              }),
              new TextRun({
                text: `All cement shall be stored, immediately upon delivery at the Site, in weatherproof building which will protect the cement from dampness. The floor shall be raised from the ground. The buildings shall be placed in locations approved by the Engineer. Provisions for storage shall be ample, and the shipments of cement as received shall be separately stored in such a manner as to allow the earliest deliveries to be used first and to provide easy access for identification and inspection of each shipment. Storage buildings shall have capacity for storage of a sufficient quantity of cement to allow sampling at least twelve (12) days before the cement is to be used. Bulk cement, if used, shall be transferred to elevated air tight and weatherproof bins. Stored cement shall meet the test requirements at any time after storage when retest is ordered by the Engineer-in-charge. At the time of use, all cement shall be free-flowing and free of lumps. The handling and storing of concrete aggregates shall be such as to prevent segregation or the inclusion of foreign materials. The Engineer may require that aggregates be stored on separate platforms at satisfactory locations. In order to secure greater uniformity of concrete mix, the Engineer may require that the coarse aggregate be separated into two or more sizes. Different sizes of aggregate shall be stored in separate bins or in separate stockpiles sufficiently removed from each other to prevent the material at the edges of the piles from becoming intermixed.
                `,
                break: 1,
              }),
              new TextRun({
                text: `FORM LUMBER
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall be specified on the plans. It shall be free from loose knots, splits, worn holes, decay, warp, ring separation, or any defects which will impair its strength or render it unfit for its intended use.
                `,
                break: 1,
              }),
            ],
          }),
          //NEW
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL – LINTEL BEAM ",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of furnishing, placing and finishing concrete and reinforcing bars in all structures of the concrete barricade in conformity to the lines, grades, and dimensions shown on the Plans. Compressive strength of concrete shall be 4000 psi and reinforcing steel bars shall not be less than Grade 60.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `PORTLAND CEMENT       
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the applicable requirements AASHTO M 85, Hydraulic Cement. Only Type I Portland Cement shall be used unless otherwise provided for in the Special Provisions. Different brands or the same brands from different mills shall not be mixed nor shall they be used alternately unless the mix is approved by the Engineer. However, the use of Portland Pozzolana Cement Type IP meeting the requirements of AASHTO M 240/ASTM C 695, Specifications for Blended Hydraulic Cement shall be allowed, provided that trial mixes shall be done and that the mixes meet the concrete strength requirements, the AASHTO/ASTM provisions pertinent to the use of Portland Pozzolana Type IP shall be adopted. Cement which for any reason, has become partially set or which contains lumps of caked cement shall be rejected. Samples of cement shall be obtained in accordance with AASHTO T 127.         
                `,
                break: 1,
              }),
              new TextRun({
                text: `FINE AGGREGATES
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall consist of natural sand, stone screenings or other inert materials with similar characteristics, or combinations thereof, having hard, strong and durable particles. Fine aggregate from different sources of supply shall not be mixed or stored in the same pile nor used alternately in the same class of concrete without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `It shall not contain more than three (3) mass percent of material passing the 0.075 mm (No. 200 sieve) by washing nor more than one (1) mass percent each of clay lumps or shale. The use of beach sand will not be allowed without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `If the fine aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 10 mass percent. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be free from injurious amounts of organic impurities. If subjected to the colorimetric test for organic impurities and a color darker than the standard is produced, it shall be rejected. However, when tested for the effect of organic impurities of strength of mortar by AASHTO T 71, the fine aggregate may be used if the relative strength at 7 and 28 days is not less than 95 mass percent. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be well-graded from coarse to fine and shall 
                conform to Table 311.1`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.1 – Grading Requirements for Fine Aggregate`,
              }),
            ],
          }),
          // TABLE 311.1
          h_tables.Table311_1,
          new Paragraph({
            children: [
              new TextRun({
                text: `COARSE AGGREGATES`,
                break: 2,
              }),
              new TextRun({
                text: `It shall consist of crushed stone, gravel, blast furnace slag, or other approved inert materials of similar characteristics, or combinations thereof, having hard, strong, durable pieces and free from any adherent coatings. `,
                break: 1,
              }),
              new TextRun({
                text: `It shall contain not more than one (1) mass percent of material passing the 
                0.075 mm (No. 200) sieve, not more than 0.25 mass percent of clay lumps, nor more than 3.5 mass percent of soft fragments. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `If the coarse aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 12 mass percent. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `It shall have a mass percent of wear not exceeding 40 when tested by AASHTO T 96. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `If the slag is used, its density shall not be less than 1120 kg/m3 (70 lb./cu. ft.). The gradation of the coarse aggregate shall conform to Table 311.2. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `Only one grading specification shall be used from any one source.
                 `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.2 – Grading Requirements for Coarse Aggregate`,
              }),
            ],
          }),
          // TABLE 311.2
          h_tables.Table311_2_6,
          new Paragraph({
            children: [
              new TextRun({
                text: `WATER
                `,
                break: 2,
              }),
              new TextRun({
                text: `Water used in mixing, curing or other designated application shall be reasonably clean and free of oil, salt, acid, alkali, grass or other substances injurious to the finished product. Water will be tested in accordance with and shall meet the requirements of Item 714, Water. Water which is drinkable may be used without test. Where the source of water is shallow, the intake shall be so enclosed as to exclude silt, mud, grass or other foreign materials.  
                `,
                break: 1,
              }),
              new TextRun({
                text: `REINFORCING STEEL
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the requirements of AASHTO M 225, Reinforcing Steel. Dowels and tie bars shall conform to the requirements of AASHTO M 31 or M 42, except that rail steel shall not be used for tie bars that are to be bent and straightened during construction. Tie bars shall be deformed bars. Dowels shall be plain round bars. Before delivery to the site of work, one-half of the length of each dowel shall be painted with one coat of approved lead or tar paint. The sleeves for dowel bars shall be metal of approved design to cover 50 mm (2 inches), plus or minus 5 mm (1/4 inch) of the dowel, with a closed end, and with a suitable stop to hold the end of the sleeve at least 25 mm (1 inch) from the end of the dowel. Sleeves shall be of such design that they do not collapse during construction. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ADMIXTURES
                `,
              }),
              new TextRun({
                text: `Air-entraining admixture shall conform to the requirements of AASHTO M 154. Chemical admixtures, if specified or permitted, shall conform to the requirements of AASHTO M 194. Fly Ash, if specified or permitted as a mineral admixture and as 20% partial replacement of Portland Cement in concrete mix shall conform to the requirements of ASTM C 618. Admixture should be added only to the concrete mix to produce some desired modifications to the properties of concrete where necessary, but not as partial replacement of cement. If specified, monofilament polypropylene synthetic fibrin fibers, which are used as admixture to prevent the formation of temperature/shrinkage cracks and increase impact resistance of concrete slabs shall be applied in the dosage rate recommended by its manufacturer.
                `,
                break: 1,
              }),
              new TextRun({
                text: `STORAGE OF CEMENT AND AGGREGATE
                `,
                break: 2,
              }),
              new TextRun({
                text: `All cement shall be stored, immediately upon delivery at the Site, in weatherproof building which will protect the cement from dampness. The floor shall be raised from the ground. The buildings shall be placed in locations approved by the Engineer. Provisions for storage shall be ample, and the shipments of cement as received shall be separately stored in such a manner as to allow the earliest deliveries to be used first and to provide easy access for identification and inspection of each shipment. Storage buildings shall have capacity for storage of a sufficient quantity of cement to allow sampling at least twelve (12) days before the cement is to be used. Bulk cement, if used, shall be transferred to elevated air tight and weatherproof bins. Stored cement shall meet the test requirements at any time after storage when retest is ordered by the Engineer-in-charge. At the time of use, all cement shall be free-flowing and free of lumps. The handling and storing of concrete aggregates shall be such as to prevent segregation or the inclusion of foreign materials. The Engineer may require that aggregates be stored on separate platforms at satisfactory locations. In order to secure greater uniformity of concrete mix, the Engineer may require that the coarse aggregate be separated into two or more sizes. Different sizes of aggregate shall be stored in separate bins or in separate stockpiles sufficiently removed from each other to prevent the material at the edges of the piles from becoming intermixed.
                `,
                break: 1,
              }),
              new TextRun({
                text: `FORM LUMBER
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall be specified on the plans. It shall be free from loose knots, splits, worn holes, decay, warp, ring separation, or any defects which will impair its strength or render it unfit for its intended use.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ITEM SPL – SANDBAGGING AND DEWATERING`,
                bold: true,
              }),
              new TextRun({
                text: `DESCRIPTION`,
                break: 1,
              }),
              new TextRun({
                text: `This item shall include necessary diverting of live streams, bailing, pumping, drainage, sheeting, bracing and the necessary construction of cofferdams and furnishing materials therefore and the subsequent removal of cofferdams and the placing of all necessary backfill.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ITEM SPL – REMOVAL OF ACCRETION`,
                bold: true,
              }),
              new TextRun({
                text: `DESCRIPTION`,
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of the removal of silted materials and debris and satisfactorily disposal of all unsuitable materials which are not designated or permitted to remain, except for the obstruction to be removed and disposed off under other items in the contract.`,
                break: 2,
              }),
            ],
          }),
          //new 2
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL – HEIGHTENING OF RIPRAP",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of the furnishing and placing of riprap with or without grout as the case may be, with or without filter backing, furnished and constructed in accordance with this Specification and to the lines and grades and dimensions shown on the Plans. `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `STONES`,
                break: 2,
              }),
              new TextRun({
                text: `Stones for riprap shall consist of rock as nearly as rectangular in section as is practical, except that riprap of Class A may consist of round natural stones. The stones shall be sound, tough, durable, dense, resistant to the action of air and water, and suitable in all respects for the purpose intended. `,
                break: 1,
              }),
              new TextRun({
                text: `Stones for riprap shall be one of the following classes as shown on the Plans or determined by the Engineer. `,
                break: 1,
              }),
            ],
          }),
          // TABLE STONES
          h_tables.Stones,
          new Paragraph({
            children: [
              new TextRun({
                text: `Sound pieces of broken concrete obtained from the removal of bridges, culverts and other structures may be substituted for stone with the approval of the Engineer-in-charge. `,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FILTER MATERIALS`,
              }),
              new TextRun({
                text: `When required, the riprap shall be placed on a filter layer to prevent fine embankment materials to be washed out through the voids of the face stones. The grading of the filter material shall be as specified on the Plans, or in the Special Provisions. If not so specified, it will be required that D15 of the filter is at least 4 times the size D85 for the embankment material, where D15 percent and 85 percent, respectively, passing (by mass) in a grain size analysis. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `FINE AGGREGATE`,
              }),
              new TextRun({
                text: `It shall consist of natural sand, stone screenings or other inert materials with similar characteristics, or combinations thereof, having hard, strong and durable particles. Fine aggregate from different sources of supply shall not be mixed or stored in the same pile nor used alternately in the same class of concrete without the approval of the Engineer. It shall not contain more than three (3) mass percent of material passing the 0.075 mm (No. 200 sieve) by washing nor more than one (1) mass percent each of clay lumps or shale. The use of beach sand will not be allowed without the approval of the Engineer. 
                If the fine aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 10 mass percent. The fine aggregate shall be free from injurious amounts of organic impurities. If subjected to the colorimetric test for organic impurities and a color darker than the standard is produced, it shall be rejected. However, when tested for the effect of organic impurities of strength of mortar by AASHTO T 71, the fine aggregate may be used if the relative strength at 7 and 28 days is not less than 95 mass percent. 
                
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `MORTAR`,
              }),
              new TextRun({
                text: `Mortar for grouted riprap shall consist of sand, cement and water conforming to the requirements given under Item 405, Structural Concrete, mixed in the proportion of one-part cement to three parts sand by volume, and sufficient water to obtain the required consistency. The horizontal and vertical contact surface between stones shall be embedded by cement mortar having a minimum thickness of 20 mm. Sufficient mortar shall be used to completely fill all voids leaving the face of the stones exposed. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ITEM SPL – DEMOLITION OF EXISTING STRUCTURES`,
                bold: true,
              }),
              new TextRun({
                text: `DESCRIPTION`,
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of the removal, wholly or in part, and satisfactorily disposal of all affected structures which are not designated or permitted to remain except for the obstructions to be removed and disposed off under other items in the contract.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ITEM SPL – REMOVAL OF EXISTING TREES`,
                bold: true,
              }),
              new TextRun({
                text: `DESCRIPTION`,
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of the removal, wholly or in part, and satisfactorily disposal of all affected trees which are not designated or permitted to remain except for the obstructions to be removed and disposed off under other items in the contract.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ITEM SPL – REMOVAL OF DAMAGE RIPRAP`,
                bold: true,
              }),
              new TextRun({
                text: `DESCRIPTION`,
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of the removal. Wholly or in part, and satisfactorily disposal of all existing riprap which are not designated or permitted to remain, except for the obstruction to be removed and disposed off under other items in the contract.`,
                break: 2,
              }),
            ],
          }),
          // START II
          new Paragraph({
            children: [
              new TextRun({
                text: "ITEM SPL – REINFORCED CONCRETE RETAINING WALL ",
                bold: true,
              }),
              new TextRun({
                text: "DESCRIPTION",
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of furnishing, placing and finishing concrete and reinforcing bars in all structures of the concrete barricade in conformity to the lines, grades, and dimensions shown on the Plans. Compressive strength of concrete shall be 4000 psi and reinforcing steel bars shall not be less than Grade 60.
                `,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `PORTLAND CEMENT       
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the applicable requirements AASHTO M 85, Hydraulic Cement. Only Type I Portland Cement shall be used unless otherwise provided for in the Special Provisions. Different brands or the same brands from different mills shall not be mixed nor shall they be used alternately unless the mix is approved by the Engineer. However, the use of Portland Pozzolana Cement Type IP meeting the requirements of AASHTO M 240/ASTM C 695, Specifications for Blended Hydraulic Cement shall be allowed, provided that trial mixes shall be done and that the mixes meet the concrete strength requirements, the AASHTO/ASTM provisions pertinent to the use of Portland Pozzolana Type IP shall be adopted. Cement which for any reason, has become partially set or which contains lumps of caked cement shall be rejected. Samples of cement shall be obtained in accordance with AASHTO T 127.   
                `,
                break: 1,
              }),
              new TextRun({
                text: `FINE AGGREGATES
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall consist of natural sand, stone screenings or other inert materials with similar characteristics, or combinations thereof, having hard, strong and durable particles. Fine aggregate from different sources of supply shall not be mixed or stored in the same pile nor used alternately in the same class of concrete without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `It shall not contain more than three (3) mass percent of material passing the 0.075 mm (No. 200 sieve) by washing nor more than one (1) mass percent each of clay lumps or shale. The use of beach sand will not be allowed without the approval of the Engineer. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `If the fine aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 10 mass percent. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be free from injurious amounts of organic impurities. If subjected to the colorimetric test for organic impurities and a color darker than the standard is produced, it shall be rejected. However, when tested for the effect of organic impurities of strength of mortar by AASHTO T 71, the fine aggregate may be used if the relative strength at 7 and 28 days is not less than 95 mass percent. 
                `,
                break: 1,
              }),
              new TextRun({
                text: `The fine aggregate shall be well-graded from coarse to fine and shall 
                conform to Table 311.1`,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.1 – Grading Requirements for Fine Aggregate`,
              }),
            ],
          }),
          // TABLE 311.1
          h_tables.Table311_1,
          new Paragraph({
            children: [
              new TextRun({
                text: `COARSE AGGREGATES`,
                break: 2,
              }),
              new TextRun({
                text: `It shall consist of crushed stone, gravel, blast furnace slag, or other approved inert materials of similar characteristics, or combinations thereof, having hard, strong, durable pieces and free from any adherent coatings. `,
                break: 1,
              }),
              new TextRun({
                text: `It shall contain not more than one (1) mass percent of material passing the 0.075 mm (No. 200) sieve, not more than 0.25 mass percent of clay lumps, nor more than 3.5 mass percent of soft fragments. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `If the coarse aggregate is subjected to five (5) cycles of the sodium sulfate soundness test, the weighted loss shall not exceed 12 mass percent. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `It shall have a mass percent of wear not exceeding 40 when tested by AASHTO T 96. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `If the slag is used, its density shall not be less than 1120 kg/m3 (70 lb./cu. ft.). The gradation of the coarse aggregate shall conform to Table 311.2. 
                 `,
                break: 1,
              }),
              new TextRun({
                text: `Only one grading specification shall be used from any one source.
                 `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `Table 311.2 – Grading Requirements for Coarse Aggregate`,
              }),
            ],
          }),
          // TABLE 311.2
          h_tables.Table311_2_7,
          new Paragraph({
            children: [
              new TextRun({
                text: `WATER
                `,
                break: 2,
              }),
              new TextRun({
                text: `Water used in mixing, curing or other designated application shall be reasonably clean and free of oil, salt, acid, alkali, grass or other substances injurious to the finished product. Water will be tested in accordance with and shall meet the requirements of Item 714, Water. Water which is drinkable may be used without test. Where the source of water is shallow, the intake shall be so enclosed as to exclude silt, mud, grass or other foreign materials.  
                `,
                break: 1,
              }),
              new TextRun({
                text: `REINFORCING STEEL
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall conform to the requirements of AASHTO M 225, Reinforcing Steel. Dowels and tie bars shall conform to the requirements of AASHTO M 31 or M 42, except that rail steel shall not be used for tie bars that are to be bent and straightened during construction. Tie bars shall be deformed bars. Dowels shall be plain round bars. Before delivery to the site of work, one-half of the length of each dowel shall be painted with one coat of approved lead or tar paint. The sleeves for dowel bars shall be metal of approved design to cover 50 mm (2 inches), plus or minus 5 mm (1/4 inch) of the dowel, with a closed end, and with a suitable stop to hold the end of the sleeve at least 25 mm (1 inch) from the end of the dowel. Sleeves shall be of such design that they do not collapse during construction. 
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ADMIXTURES
                `,
              }),
              new TextRun({
                text: `Air-entraining admixture shall conform to the requirements of AASHTO M 154. Chemical admixtures, if specified or permitted, shall conform to the requirements of AASHTO M 194. Fly Ash, if specified or permitted as a mineral admixture and as 20% partial replacement of Portland Cement in concrete mix shall conform to the requirements of ASTM C 618. Admixture should be added only to the concrete mix to produce some desired modifications to the properties of concrete where necessary, but not as partial replacement of cement. If specified, monofilament polypropylene synthetic fibrin fibers, which are used as admixture to prevent the formation of temperature/shrinkage cracks and increase impact resistance of concrete slabs shall be applied in the dosage rate recommended by its manufacturer.
                `,
                break: 1,
              }),
              new TextRun({
                text: `STORAGE OF CEMENT AND AGGREGATE
                `,
                break: 2,
              }),
              new TextRun({
                text: `All cement shall be stored, immediately upon delivery at the Site, in weatherproof building which will protect the cement from dampness. The floor shall be raised from the ground. The buildings shall be placed in locations approved by the Engineer. Provisions for storage shall be ample, and the shipments of cement as received shall be separately stored in such a manner as to allow the earliest deliveries to be used first and to provide easy access for identification and inspection of each shipment. Storage buildings shall have capacity for storage of a sufficient quantity of cement to allow sampling at least twelve (12) days before the cement is to be used. Bulk cement, if used, shall be transferred to elevated air tight and weatherproof bins. Stored cement shall meet the test requirements at any time after storage when retest is ordered by the Engineer-in-charge. At the time of use, all cement shall be free-flowing and free of lumps. The handling and storing of concrete aggregates shall be such as to prevent segregation or the inclusion of foreign materials. The Engineer may require that aggregates be stored on separate platforms at satisfactory locations. In order to secure greater uniformity of concrete mix, the Engineer may require that the coarse aggregate be separated into two or more sizes. Different sizes of aggregate shall be stored in separate bins or in separate stockpiles sufficiently removed from each other to prevent the material at the edges of the piles from becoming intermixed.
                
                `,
                break: 1,
              }),
              new TextRun({
                text: `FORM LUMBER
                `,
                break: 2,
              }),
              new TextRun({
                text: `It shall be specified on the plans. It shall be free from loose knots, splits, worn holes, decay, warp, ring separation, or any defects which will impair its strength or render it unfit for its intended use.
                `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `ITEM SPL – SHORING`,
                bold: true,
              }),
              new TextRun({
                text: `DESCRIPTION`,
                break: 1,
              }),
              new TextRun({
                text: `This item shall consist of installation of shoring and barricade to prevent soil erosion on the location and in conformity with the lines, grades, dimensions and design shown on the Plans or as required by the Engineer-In-Charge.`,
                break: 2,
              }),
              new TextRun({
                text: `MATERIAL REQUIREMENTS`,
                break: 2,
              }),
              new TextRun({
                text: `Based on the standard design approved by and material requirement of the implementing agency.`,
                break: 1,
              }),
              new TextRun({
                text: `NOTES:`,
                break: 4,
                bold: true,
              }),
              new TextRun({
                text: `All other item of works not covered by this listed TECHNICAL SPECIFICATIONS shall be ISSUED with supplemental specifications by the Implementing Agency based on the Program of Work and Approved Plan(s) for the proposed project.`,
                break: 1,
              }),
              new TextRun({
                text: `PREPARED BY:`,
                break: 6,
              }),
              new TextRun({
                text: `Planning and Design Division
                `,
                break: 4,
              }),
              new TextRun({
                text: `CHECKED BY:`,
                break: 4,
              }),
              new TextRun({
                text: `Planning and Design Division`,
                break: 4,
              }),
            ],
          }),
        ], //END
      },
    ],
  });

  projectData &&
    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "TechSpec-" + projectData?.project_title + ".docx");
    });
};
