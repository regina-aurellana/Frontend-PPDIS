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
} from "docx";

import { saveAs } from "file-saver";
import { qc_header_b64 } from "../../../img/qc_header_base64.js";

export const TechSpecFile = ({ projectData }) => {
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
              indent: { left: 1300, hanging: 250 },
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
              indent: { left: 1500, hanging: 250 },
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
  ];

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            size: "20",
            font: "Arial",
            alignment: AlignmentType.JUSTIFIED,
          },
          paragraph: {
            alignment: AlignmentType.JUSTIFIED,
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
                    children: ["Page", PageNumber.CURRENT],
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
            numbering: {
              reference: "rule-numbering",
              level: 0,
            },
            children: [
              new TextRun({
                text: "GENERAL REQUIREMENTS",
                allCaps: true,
                bold: true,
              }),
            ],
            spacing: {
              after: 200,
            },
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Comply with the current and existing laws, ordinances and applicable codes, rules and regulations, and standards. Any works performed contrary to the existing laws, rules and regulations, ordinances and standards without notice shall bear all cost arising therefrom.
                    `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Drawings, specifications, codes and standards are minimum requirements. Where requirements differ, the more stringent apply.
                    `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Should there be any change(s) in drawings or specifications, it is required to comply with the governing regulations, notify the implementing agency.
                    `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Photographs shall be taken as, when and where directed at intervals of not more than one month. The photographs shall be sufficient in number and location, to record the exact progress of the works. The photographs shall be retained and will become the property of the Government.
                    `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Site verification / inspection shall be conducted to validate the scope of works. No extra compensation and extension of time shall be given due to negligence or inadvertence.
                    `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `The quality of materials shall be of the best grade of their respective kinds for the purpose. The work shall also be performed in the best and most capable manner in strict accordance with requirements of the plans and details. All materials not conforming to the requirements of these specifications shall be considered as defective.
                    `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `All equipment and installations shall meet or exceed minimum requirements of the standards and codes.
                    `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Mobilization and Demobilization (if applicable)
                    `,
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
                text: `Mobilization shall include all activities and related costs for transportation of personnel, equipment, and operating supplies to the site; establishment of offices, buildings, and other necessary general facilities for the operations at the site.`,
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
                text: `Demobilization shall include all activities and costs for transportation of personnel, equipment, and supplies not anymore required within the construction site including the disassembly, removal and site clean-up of offices and other facilities assembled on the site specifically for this contract.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Execute work in strict accordance with the best practices of the trades in a thorough, substantial, workmanlike manner by competent workmen. Provide a competent, experienced, full-time supervisor who is authorized to make decisions on behalf of the Contractor.
                    `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Temporary Facilities and Utilities
                    `,
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
                text: `All facilities shall be near the job site, where necessary and shall conform to the best standard for the required types.`,
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
                text: `Temporary facilities shall be provided and maintained including sanitary facilities and first aid stations.`,
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
                text: `Temporary utilities shall be sufficiently provided until the completion of the project such as water, power and communication.`,
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
                text: `Temporary enclosure shall be provided around the construction site with adequate guard lights, railings and proper signage.`,
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
                text: `Temporary roadways shall be constructed and maintained to sustain loads to be carried on them during the entire construction period.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Upon completion of the work, the temporary facilities shall be demolished, hauled-out and disposed properly.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            text: `Adequate construction safety and health protection shall be provided at all times during the execution of work to both workers and property.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `A fully-trained Medical Aide shall be employed permanently on the site who shall be engaged solely to medical duties`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `The medical room shall be provided with waterproofing; it could be a building or room designated and used exclusively for the purpose and have a floor area of at least 15 square meters and a glazed window area of at least 2 square meters.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `The location of the medical room and any other arrangements shall be made known to all employees by posting on prominent locations and suitable notices in the site`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Additional safety precautions shall be provided in the event of a pandemic. Protocols set forth by the government shall be strictly followed. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Construction safety shall consist of construction canopy and safety net`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            text: `Necessary protections to the adjacent property shall be provided to avoid untoward incidents / accidents`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            text: `Final cleaning of the work shall be employed prior to the final inspection for the certification of final acceptance. Final cleaning shall be applied on each surface or unit of work and shall be of condition expected for a building cleaning and maintenance program.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 0,
            },
            children: [
              new TextRun({
                text: "SITE WORKS",
                bold: true,
              }),
            ],
            spacing: {
              after: 200,
            },
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            text: `All grades, lines, levels and dimensions shall be verified as indicated on the plans and details. Any discrepancies or inconsistencies shall be reported before commencing work`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            text: `This Item shall consist of the removal wholly or in part, and satisfactory disposal of all buildings, fences, structures, old pavements, abandoned pipe lines, and any other obstructions which are not designated or permitted to remain, except for the obstructions to be removed and disposed of under other items in the Contract. `,

            children: [
              new TextRun({
                text: `Removal and/or demolition of existing structures shall be done in accordance to safety procedures.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `All excavations shall be made to grade as indicated in the plans. Whenever water is encountered in the excavation process, it shall be removed by pumping, care being taken that the surrounding soil particles are not disturbed or removed.`,
              }),
              new TextRun({
                text: `The Contractor shall notify the Engineer sufficiently in advance of the beginning of any excavation so that cross-sectional elevations and measurements may be taken on the undisturbed ground. The natural ground adjacent to the structure shall not be disturbed without permission of the Engineer.`,
                break: 2,
              }),
              new TextRun({
                text: `Trenches or foundation pits for structures or structure footings shall be excavated to the lines and grades or elevations shown on the Plans or as staked by the Engineer. They shall be of sufficient size to permit the placing of structures or structure footings of the full width and length shown. The elevations of the bottoms of footings, as shown on the Plans, shall be considered as approximate only and the Engineer may order, in writing, such changes in dimensions or elevations of footings as may be deemed necessary, to secure a satisfactory foundation. `,
                break: 2,
              }),
              new TextRun({
                text: `Boulders, logs, and other objectionable materials encountered in excavation shall be removed. `,
                break: 2,
              }),
              new TextRun({
                text: `After each excavation is completed, the Contractor shall notify the Engineer to that effect and no footing, bedding material or pipe culvert shall be placed until the Engineer has approved the depth of excavation and the character of the foundation material`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            text: `All excavated materials, so far as suitable, shall be utilized as backfill. The surplus materials shall be disposed of in such manner as not to obstruct the stream or otherwise impair the efficiency or appearance of the structure. No excavated materials shall be deposited at any time so as to endanger the partly finished structure`,

            children: [
              new TextRun({
                text: `All backfills shall be placed in layers not exceeding to 150mm in thickness and each layer shall be thoroughly compacted by wetting, tamping and rolling.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            text: `Soil Poisoning. There are two methods usually adopted in soil poisoning which are as follows:`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Cordoning. This method is usually adopted when there is no 
            visible evidence of termite infestation.   Trenches in concentric circles, 
            squares or rectangles are dug 150mm to 220mm wide and at least one 
            meter apart and applied with Liquid Termicide Concentrate working solution at the rate of 8 liters per linear meter.
            `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Drenching. When soil show termite infestation, this method shall be applied. The building area shall be thoroughly drenched with Liquid Termicide Concentrate working solution at the rate of 24 liters per square meter. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 0,
            },
            children: [
              new TextRun({
                text: "CIVIL / STRUCTURAL WORKS",
                bold: true,
              }),
            ],
            spacing: {
              after: 200,
            },
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: "CONCRETE WORKS",
                bold: true,
              }),
            ],
            spacing: {
              after: 200,
            },
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Delivery, Storage, and Handling: All materials shall be so delivered, stored, and handled as to prevent the inclusion of foreign materials and the damage of materials by water or breakage. Package materials shall be delivered and stored in original packages until ready to be used. Packages or materials showing evidence of water or other damage shall be rejected. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Unless otherwise specified herein, concrete works shall conform to the requirements of the ACI Building Code. Full cooperation shall be given on trades to install embedded items. Provisions shall be made for setting items not placed in the forms. Before concrete is placed, embedded items shall have been inspected and tested for concrete aggregates and other materials shall have been done. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Materials`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Cement for concrete shall conform to the requirements of specifications for Portland Cement (ASTM C – 150). `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Water used in mixing concrete shall be clean and free from other injurious amounts of oils, acids, alkaline, organic materials or other substances that may be deleterious to concrete or steel. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Fine aggregates shall be beach or river sand conforming to ASTM C33, “Specification for Concrete Aggregates”. Sand particle shall be course, sharp, clean free from salt, dust, loam, dirt and all foreign matters.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Coarse aggregates shall be either natural gravel or crushed rock conforming to the “Specifications for Concrete Aggregates (ASTM C33). The minimum size of aggregates shall be larger than one fifth (1/5) of the narrowest dimensions between sides of the forms within which the concrete is to be cast nor larger than three fourths (3/4) of the minimum clear spacing between reinforcing bars or between reinforcing bars and forms.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Proportioning and Mixing `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Proportioning and mixing of concrete shall conform to the requirements for Item 405 of the standard specification with the following proportions: `,
              }),
              new TextRun({
                text: `Cement: Sand: Gravel `,
                break: 2,
              }),
              new TextRun({
                text: `Class “A” - 1: 2: 3  `,
                break: 1,
              }),
              new TextRun({
                text: `Class “B” - 1: 2: 4  `,
                break: 1,
              }),
              new TextRun({
                text: `Class “C” - 1: 2 ½  `,
                break: 1,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Concrete mixture to be used for concrete shall conform with the structural requirements.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Mixing – concrete shall be machine mixed. Mixing shall begin within 30 minutes after the cement has been added to the aggregates. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Forms`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `General – Forms shall be used whatever necessary to confine the concrete and shape it to the required lines, or to insure the concrete of contamination with materials caving from adjacent, excavated surfaces. Forms shall have sufficient strength to withstand the pressure resulting from placement and vibration of the concrete, and shall be maintained rigidly in correct position. Forms shall be sufficiently tight to prevent loss or mortar from the concrete. Forms shall be ¼” (6mm) thick ordinary plywood and form lumber.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Cleaning of Forms – before placing the concrete, the contact surfaces of the formed hall be cleaned of encrustations of mortar, the grout or other foreign material. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Removal of Forms – forms shall be removed in a manner which will prevent damage to the concrete. Forms shall not be removed without approval. Any repairs of surface imperfections shall be formed at once and airing shall be started as soon as the surface is sufficiently hard to permit it without further damage. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Placing Reinforcement:`,
              }),
              new TextRun({
                text: `Steel reinforcement shall be provided as indicated, together with all necessary tie wires, chairs, spacers, supports and other devices necessary to install and secure the reinforcement properly. All reinforcement, when placed, shall be free from loose, flaky rust and scale, oil, grease, clay and other coating and foreign substances that would reduce or destroy its bond with concrete. Reinforcement shall be placed accurately and secured in place by use of metal or concrete supports, spacers and ties. Such supports shall be used in such manner that they will not be exposed or contribute in any way, to the discoloration or deterioration of the concrete`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Conveying and Placing Concrete: `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Conveying – concrete shall be conveyed from mixer to forms as rapidly as applicable, by methods which will prevent segregation, or loss of ingredients. There will be no vertical drop greater than 1.5 meters except where suitable equipment is provided to prevent segregation and where specifically authorized.  `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Placing – concrete shall be worked readily into the corners and angles of the forms and around all reinforcement and imbedded items without permitting the material to segregate, concrete shall be deposited as close as possible to its final position in the forms so that flow within the mass does not exceed two (2) meters and consequently segregation is reduced to a minimum near forms or embedded items, or elsewhere as directed, the discharge shall be so controlled that the concrete may be effectively compacted into horizontal layers not exceeding 30 centimeters in depth within the maximum lateral movement specified.   `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Consolidation of Concrete – concrete shall be consolidated with the aid of mechanical vibrating equipment and supplemented by the hand spading and tamping. Vibrators shall not be inserted into lower cursed that have commenced initial set; and reinforcement embedded in concepts beginning to set or already set shall not be disturbed by vibrators. Consolidation around major embedded parts shall by hand spading and tamping and vibrators shall not be used. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Placing Concrete through reinforcement – In placing concrete through reinforcement, care shall be taken that no segregation of the coarse aggregate occurs. On the bottom of beams and slabs, where the congestion of steel near the forms makes placing difficult, a layer of mortar of the same cement-sand ratios as used in concrete shall be first deposited to cover the surfaces.  `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Curing `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `General – All concrete shall be moist cured for a period not less than seven (7) consecutive days by an approved method or combination applicable to local conditions.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Moist Curing – The surface of the concrete shall be kept continuously wet by covering with burlap plastic or other approved materials thoroughly saturated with water and keeping the covering spraying or intermittent hosing. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Finishing`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Concrete surfaces shall not be plastered unless otherwise indicated. Exposed concrete surfaces shall be formed with plywood, and after removal of forms, the surfaces shall be smooth, true to line and shall present or finished appearance except for minor defects which can be easily repaired with patching with cement mortar, or can be grounded to a smooth surface to remove all joint marks of the form works. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Concrete Slabs on Fill. The concrete slabs on fill shall be laid on a prepared foundation consisting of sub grade and granular fill with thickness equal to the thickness of the overlaying slab except when indicated.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: "MASONRY WORKS",
                bold: true,
              }),
            ],
            spacing: {
              after: 200,
            },
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },

            text: `Masonry Units (Concrete Hollow Blocks): `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `100mm thick for all interior walls and 150mm thick for all exterior walls unless otherwise indicated. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Use 400 psi for non-load bearing blocks and 700 psi for load bearing blocks where required.  `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            text: `Where full height walls are constructed with concrete hollow blocks, these shall extend up to the bottom of beam or slab unless otherwise indicated on plans. Provide stiffener columns and lintel beams as specified in the structural drawings or as specified or as deemed required to assure a stabilized wall due to height and other considerations. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Sand: `,
            children: [
              new TextRun({
                text: `S-1, washed, clean and greenish in color.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Mortar: `,
            children: [
              new TextRun({
                text: `One part Portland cement and two parts sand and water but not more than three parts sand and water. `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Reinforcement:`,
            children: [
              new TextRun({
                text: `The concrete hollow blocks shall be reinforced with 10mm diameter deformed bar, spaced not more than 0.8m on centers, both ways.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Plaster bond:`,
            children: [
              new TextRun({
                text: `The mixture of cement plaster for concrete hollow block wall finishes indicated in the drawings shall be one part Portland cement and three parts sand.`,
                break: 2,
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
                text: `Floor Topping Preparation for Tilework. One part Portland cement and two parts sand and water but not more than three parts sand and water. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `ROOFING WORKS`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Corrugated galvanized iron (G.I.) sheets, including plain aluminum sheets for roofing accessories shall be cold-rolled meeting ASTM A-153 and with spelter coating of zinc of not less than0.381 kg/sq.m. (1.25 ounce/sq.ft.) conforming to ASTM A-525 or pns 67:1985. Unless otherwise specified or shown on Plans, roofing sheets shall be gauge 26 (0.48mm thick) and provided in long span sizes to minimize end laps. Sheets shall weigh not less than 3.74 kg/sq.m. and shall be marked or stamped showing the gauge, size amount of zinc coating, brand and name of manufacturer. Test specimens shall stand being bent through 180 degrees flat on itself without fracture of the base metal and without flaking of the zinc coating.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Ridge/hip rolls, valleys, flashing and counter flashings, gutters and downspouts, whenever required, shall be fabricated from plain G.I. sheets. Ridge/hip rolls, flashings and counter flashings shall be gauge 26. Valleys, gutters and downspouts shall be gauge 24 unless otherwise specified on Plans. Wire basket strainers shall be galvanized, gauge 24, Roof ventilators, whenever required shall be fabricated from gauge 26 plain G.I. sheets and constructed to the dimensions and details shown on Plans.
            `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `The roofing shall be secured to the purlins with min. 2 ½” max. 3” long Tek screws. Provide all-purpose sealant under the fasteners. Ridge rolls, hip rolls and valleys to be used shall be those compatible with the Ga. 24 pre-painted G.I. rib-type roofing sheets. They shall lap the roofing sheets at least 250mm. The ridge rolls, hip rolls and valleys shall be riveted to the roofing sheets.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Polycarbonate roofing and sunbreakers shall be covered with 6mm thick Rib-type polycarbonate sheets as shown on the plans. The roofing shall be secured to the purlins with min. 2 ½” max. 3” long Tek screws. Provide all-purpose sealant under the fasteners. Ridge rolls, hip rolls and valleys to be used shall be those compatible with the 6mm thick solid polycarbonate sheets. They shall lap the roofing sheets at least 250mm. The ridge rolls, hip rolls and valleys shall be riveted to the roofing sheets. `,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `All roofing sheets adjacent to concrete hollow block and other masonry walls such as property line firewalls, shall be provided with Gauge 26 pre-painted plain G.I. Flashing to extend to the top and over to the other side of the wall. All fasteners shall be placed at the top of the corrugations of the roofing sheets to prevent water from standing around the fasteners.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            text: `Provide 6mm thick thermal insulation with single-side aluminum foil prior to fastening of roofing sheets to serve as thermal protection.`,
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `METAL FABRICATION`,
                bold: true,
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
                text: `Materials`,
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
                text: `Steel and Iron. If not specified otherwise, use standard mill-finished structural steel shapes or bar iron in compliance with AISC Specifications for Design, Fabrication and Erection of Structural Steel for buildings.`,
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
                text: `Bolts, Nuts, Studs and Rivets. ASTM A 307 and A 325`,
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
                text: `Screws. Fed. Spec FF-S-85, Fed. Spec FF-S-92, and Fed. Spec. FF-S-111.`,
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
                text: `Metal Purlins. High grade galvanized steel with minimum tensile strength of 275 MPa, 1.4mm in thickness or approved equal.`,
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
                text: `Fabrication:`,
              }),
              new TextRun({
                text: `By mechanics skilled in the trade and in accordance with the manufacturer’s directions. Metalwork shall be fabricated to allow for expansion and contraction of materials. Provide welding and bracing of adequate strength and durability, with tight, flush joints, dressed smooth and clean. Complete with bolts and nuts.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Metal Surfaces`,
              }),
              new TextRun({
                text: `Surfaces shall be clean and free from all scale, flake, rust and rust pitting; well-formed and finished to shape and size, with sharp lines, angle and smooth surface. Shearing and punching shall leave clean true lines and surfaces. Weld or rivet permanent connections. Weld and flush rivets shall be used and finished flush smooth on surfaces that will be exposed after installation. Do not use screws or bolts where they can be avoided; when used, heads shall be countersunk, screwed up tight and threads nicked to prevent loosening.`,
                break: 2,
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
                text: `Construction`,
              }),
              new TextRun({
                text: `Thickness of metals and details of assembly and supports shall give ample strength and stiffness for the minimum loads specified or indicated. Joints exposed to weather shall be formed to exclude water.`,
                break: 2,
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
                text: `Welding:`,
              }),
              new TextRun({
                text: `Use welding electrode E70xx and perform welding, welding inspection and corrective welding in accordance with AWS D1.1. Weld in a manner to prevent permanent distortion of the connected parts. Weld continuously along the entire area of contact (except where tack welding is permitted. Do not tack weld exposed to connections). Grind smooth visible weld in finished installation.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `MOISTURE PROTECTION`,
                bold: true,
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
                text: `WATERPROOFING`,
                bold: true,
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
                text: `Cementitious waterproofing powder mix shall be cement-based, aggregate-type, heavy duty, waterproof coating for reinforced concrete surface and masonry exposed to water. Additive binders shall be of special formulation of acrylic polymers and modifiers in liquid form used as additive with cement-based powder mix that improves adhesion and mechanical properties. Water shall be clean, clear and potable.`,
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
                text: `Concrete surface to be applied with waterproofing shall be structurally sound, clean and free of dirt, loose mortar particles, paint films, oil, protective coats, efflorescence, laitance, etc. All defects shall be properly corrected and carefully formed to provide a smooth surface that is free of marks and properly cured prior to application works. `,
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
                text: `Furnish all labor, materials, equipment, plant and other facilities required to complete all waterproofing work as shown on the drawings and herein specified. All applications shall be strictly performed by an approved waterproofing Contractor.`,
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
                text: `Test waterproofed area by seventy-two (72) hours and check for any seepages. `,
              }),
              new TextRun({
                text: `Thickness should be as per Manufacturer’s Specifications and Installation depending on the areas to be applied with. `,
                break: 2,
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
                text: `VAPOR BARRIER`,
                bold: true,
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
                text: `Vapor barrier shall be placement of 8mil Polyethylene sheet prior to pouring of concrete for foundation members, slabs-on-fill and slabs-on-grade.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 0,
            },
            children: [
              new TextRun({
                text: `ARCHITECTURAL WORKS`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `FLOOR FINISHES`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Ceramic Tiles.`,
                bold: true,
              }),
              new TextRun({
                text: `Unglazed ceramic tiles shall be hard, dense tiles of homogeneous composition. Its color and characteristics area determined by the materials used in the body, the method of manufacture and the thermal treatment.`,
                break: 1,
              }),
              new TextRun({
                text: `Tile work shall not be started until roughing-ins for sanitary/plumbing, electrical and other trades have been completed and tested. The work of all other trades shall be protected from damage. `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Cement Floor Finish. `,
                bold: true,
              }),
              new TextRun({
                text: `Mortar topping shall be one part Portland cement and three parts fine aggregate by loose volume.`,
                break: 1,
              }),
              new TextRun({
                text: `Finish topping shall be pure Portland cement properly graded, mixed with water to approved consistency and plasticity. Where required to be colored cement floor finish, red or green oxide powder shall be premixed with Portland cement complying with finish topping requirements and the desired color intensity. Cement floor finish floor hardener shall be premixed as required and applied in accordance with the manufacturer’s instruction manual.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `WALL FINISHES AND PARTITIONING`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Ceramic Tiles. `,
                bold: true,
              }),
              new TextRun({
                text: `Glazed tiles and trims shall have an impervious face of ceramic materials fused onto the body of the tiles and trims. The glazed surface may be clear white or colored depending on the color scheme approved by the Engineer. Standard glazes may be bright (glossy), semi-matte (less glossy), matte (dull) or crystalline (mottled and textured; good resistance to abrasion).`,
                break: 1,
              }),
              new TextRun({
                text: `Tile work shall not be started until roughing-ins for sanitary/plumbing, electrical and other trades have been completed and tested. The work of all other trades shall be protected from damage.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Cement Plaster Finish. `,
                bold: true,
              }),
              new TextRun({
                text: `Mortar mixture for brown coat shall be freshly prepared and uniformly mixed in the proportion by volume of one part Portland cement, three (3) parts sand and one fourth (1/4) part hydrated lime.`,
                break: 1,
              }),
              new TextRun({
                text: `Finish coat shall be pure Portland cement properly graded conforming to the requirements and mixed with water to approved consistency and plasticity.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `CEILING FINISHES`,
                bold: true,
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
                text: `Slab Soffit.`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `CARPENTRY WORKS`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            indent: { left: 1300 },
            children: [
              new TextRun({
                text: `Lumber of different species for the various parts of the structure shall be well-seasoned, sawn straight, sundried or kiln-dried and free from defects such as loose unsound knots, pitch pockets, sapwood, cracks and other imperfections impairing its strength, durability and appearance. `,
              }),
              new TextRun({
                text: `Rough lumber for framing and siding boards shall be air-dried or sundried such that its moisture content shall not exceed 22 percent. Dressed lumber for exterior and interior finishing, for doors and windows, millwork, cabinet work and flooring boards shall be kiln-dried and shall not have a moisture content in excess of 14 percent at the time of installation in the structure.`,
                break: 2,
              }),
              new TextRun({
                text: `Plyboard shall be good grade and made of laminated wood strips of uniform width and thickness bounded together with water resistant resin glue. The laminated core shall be finished both faces with select grade Tanguile or red Lauan veneers not less than 2 mm thick similarly bonded to the core. The plyboard of not less than 19 mm thick shall be free from defects such as split in veneer, buckling or warping.`,
                break: 2,
              }),
              new TextRun({
                text: `Plywood shall conform to the requirements of the Philippine Trade Standards 631-02. Thickness of a single layer laminae shall not be less than 2 mm. The laminae shall be superimposed in layers with grains crossing at right angles in successive layers to produce stiffness. The face veneers shall be rotary cut from select grade timber. The laminae and face veneers shall be bonded with water resistant resin glue, hot pressed and pressure treated. Ordinary Tanguile or red Lauan plywood with good quality face veneers, 6 mm thick shall be used for double walling and ceiling not exposed to moisture; waterproof or marine plywood shall be used for ceiling exposed to moisture such as at toilets and eaves, and ceiling to be finished with acrytex.`,
                break: 2,
              }),
              new TextRun({
                text: `Glue shall be from water resistant resins which, upon hardening, shall not dissolve nor lose its bond or holding power even when soaked with water for extended period.`,
                break: 2,
              }),
              new TextRun({
                text: `Nails, screw, bolts, and straps shall be provided and used where suitable for fixing carpentry and joinery works. All fasteners shall be brand new and adequate size to ensure rigidity of connections.`,
                break: 2,
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
                text: `Nails of adequate size shall be steel wire, diamond-pointed, ribbed shank and blight finish.`,
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
                text: `Screws of adequate size shall be aluminum or brass plated steel with slotted head.`,
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
                text: `Lag screws of adequate size, for anchoring heavy timber framing in concrete or masonry, shall be galvanized steel.`,
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
                text: `Bolts and nuts shall be of steel having a yield point of not less than 245 Mpa. Bolts shall have square heads and provided with standard flat steel washers and hexagonal nuts. Threads shall conform to American coarse thread series. Threaded portion shall be long enough so that the nut can be tightened against the bolted members without any need for blocking. The bolt’s threaded end shall be finished smooth for ease of engaging and turning the nut. `,
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
                text: `Wrought iron straps or angles, when required in conjunction with bolts or lag screws to provide proper anchorage, shall be of the shape and size shown on the Plans.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `PAINTING WORKS`,
                bold: true,
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
                text: `Paint Materials. All types of paint material and other related products shall be subject to test as to material composition by the Bureau of Research and Standard, DPWH or the National Institute of Science and Technology. `,
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
                text: `Tinting Colors. Tinting colors shall be first grade quality pigment ground in alkyd resin that disperses and mixes easily with paint to produce the color desired. Use the same brand of paint and tinting color to effect good paint body`,
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
                text: `Skim coat. Skim coat shall be fine powder type material like kalsomine that can be mixed into putty consistency, with oil-based primers and paints to fill minor surface dents and imperfections. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Paint Schedule.`,
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
                text: `Exterior Masonry Wall (plain cement plastered finish to be painted)`,
              }),
              new TextRun({
                text: `i.	1 coat skim coating, 1 coat primer, 2 coats elastomeric paint finish`,
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
                text: `Interior Masonry Wall (plain cement plastered finish to be painted)`,
              }),
              new TextRun({
                text: `i.	1 coat skim coating, 1 coat primer, 2 coats latex paint finish`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Interior Dry Wall `,
              }),
              new TextRun({
                text: `i.	1 coat primer, 2 coats latex paint finish`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Ceiling Boards`,
              }),
              new TextRun({
                text: `i.	1 coat primer, 2 coats latex paint finish`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Slab Soffit`,
              }),
              new TextRun({
                text: `i.	1 coat primer, 2 coats latex paint finish`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Metal / Steel Surfaces`,
              }),
              new TextRun({
                text: `i.	1 coat primer, 2 coats epoxy enamel finish`,
                break: 2,
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
                text: `Surface Preparation. All surfaces shall be in proper condition to receive the finish. Woodworks shall be hand-sanded smooth and dusted clean. All knot-holes pitch pockets or sappy portions shall be sealed with natural wood filler. Nail holes, cracks or defects shall be carefully puttied after the first coat, matching the color of paint.`,
              }),
              new TextRun({
                text: `Interior woodworks shall be sandpapered between coats. Cracks, holes of imperfections in plaster shall be filled with patching compound and smoothed off to match adjoining surfaces.`,
                break: 2,
              }),
              new TextRun({
                text: `Concrete and masonry surfaces shall be coated with concrete neutralizer and allowed to dry before any painting primer coat is applied. When surface is dried apply first coating. Hairline cracks and unevenness shall be patched and sealed with approved putty or patching compound. After all defects are corrected apply the finish coats as specified on the Plans (color scheme approved).`,
                break: 2,
              }),
              new TextRun({
                text: `Metal shall be clean, dry and free from mill scale and rust. Remove all grease and oil from surfaces. Wash, unprimed galvanized metal with etching solution and allow it to dry. Where required to prime coat surface with Red Lead Primer same shall be approved by the Engineer.`,
                break: 2,
              }),
              new TextRun({
                text: `In addition, the Contractor shall undertake the following: `,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Voids, cracks, nick etc. will be repaired with proper patching material and finished flushed with surrounding surfaces.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Marred or damaged shop coats on metal shall be spot primed with appropriate metal primer.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Panting and varnishing works shall not be commenced when it is too hot or cold.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Allow appropriate ventilation during application and drying period`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `All hardware will be fitted and removed or protected prior to painting and varnishing works.`,
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
                text: `Application. Paints when applied by brush shall become non-fluid, thick enough to lay down as adequate film of wet paint.  Brush marks shall have flawed out after application of paint.`,
              }),
              new TextRun({
                text: `Paints made for application by roller must be similar to brushing paint. It must be non-sticky when thinned to spraying viscosity so that it will break up easily into droplets.`,
                break: 2,
              }),
              new TextRun({
                text: `Paint is atomized by high pressure pumping rather than broken up by the large volume of air mixed with it. This procedure changes the required properties of the paint.`,
                break: 2,
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
                text: `Application shall be as per paint Manufacturer’s specification and recommendation.`,
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
                text: `Provide all drop cloth and other covering requisite for protection of floors, walls, aluminum, glass, finishes and other works.`,
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
                text: `All applications and methods used shall strictly follow the Manufacturer's Instructions and Specifications. `,
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
                text: `All surfaces including masonry wall shall be thoroughly cleaned, puttied, sandpapered, rubbed and polished; masonry wall shall be treated with Neutralizer.  `,
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
                text: `All exposed finish hardware, lighting fixtures and accessories, glass and the like shall be adequately protected so that these are not stained with paint and other painting materials prior to painting works.`,
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
                text: `All other surfaces endangered by stains and paint marks should be taped and covered with craft paper.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 0,
            },
            children: [
              new TextRun({
                text: `SANITARY / PLUMBING WORKS`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Comply with the current applicable codes, ordinances, and regulations of the authority or authorities having jurisdiction, the rules, regulations and requirements of the utility companies (as applicable).`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            AlignmentType: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Supply, installation and testing of the following:  `,
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
                text: `Potable water supply system complete in all respects including but not limited to submittals, shop drawings, piping, water meters, valves, bibbs, insulation, all accessories required for complete and operational of the system.   `,
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
                text: `Water service connections including but not limited to water meters, float valves.  Any and all other works involve in providing the complete operation of the water supply system. `,
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
                text: `Soil waste and vent system complete in all respect including but not limited to connection to existing sewer, submittals, shop drawings, pipes, fittings, valves, cleanout, drains, etc. Complete and operational.`,
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
                text: `Storm drainage system complete in all respect including but not limited to connection to existing storm drainage, submittals, shop drawings, pipes, fittings, valves, cleanout, drains, etc.  Complete and operational. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Workmanship and installation methods shall conform to the best modern practice. Employ skilled tradesmen to perform work under the direct supervision of fully qualified personnel.  `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `All equipment and installations shall meet or exceed minimum requirements of the Standards and Codes as specified in plans and program of work. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Install equipment in strict accordance with manufacturers written recommendations.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Physical sizes of all plant and equipment are to be suitable for the space allocated for the accommodation of such plant and equipment, taking into account the requirement of access for maintenance purposes.  `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `In selecting makes and types of equipment, the Contractor shall ascertain that facilities for proper maintenance, repair and replacement are provided.  `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Where the Contractor proposes to use an item of equipment other than that specified or detailed in the drawing, which requires any redesign of the system, drawings showing the layout of the equipment and such redesign as required therefore shall be prepared by the Contractor at his own expenses. Where such approved deviation necessitates a different quantity and arrangement of materials and equipment’s from that originally specified or indicated in the drawings, the Contractor shall furnish and install any such additional materials and equipment’s required by the system at no additional cost.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Equipment catalogue and manufacturer's specifications must be submitted for examination and details shall be submitted for approval before any equipment is to be ordered.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `This shall include all information necessary to ascertain the equipment comply with this specification and drawings.  Data and sales catalogue of a general nature will not be accepted.  `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `All materials, equipment, components and accessories shall be delivered to the Site in a new condition, properly packed and protected against damage or contamination or distortion, breakage or structural weakening due to handling, adverse weather or other circumstances and, as far as practicable, they shall be kept in the packing cases or under approved protective coverings until required for use.  `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Any items suffering from damage during manufacture, or in transit, or on site whilst in storage or during erection shall be rejected and replaced without extra cost.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `All sanitary fittings and pipework shall be cleaned after installation and keep them in a new condition.   `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `All installed pipelines shall be flushed through with water, rodded when necessary to ensure clearance of debris.   `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Cleaning and flushing shall be carried out in sections as the installation becomes completed.   `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `The Contractor shall carry out hydraulic test on the complete plumbing systems and the drainage system to show that it is functioning satisfactorily within the requirements of this Specification and local regulations.   `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `The Contractor shall provide suitable test pumps and arrange for a supply of water required in connection with testing of pipework. The test pump shall be fitted with pressure gauges which shall be of suitable range for the pressure being applied.   `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Hydraulic tests shall be carried out as the pipework is installed and shall be completed before chases in walls and ducts are closed. Also test shall be carried out prior to false ceilings and other finishes are installed.    `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Testing apparatus shall be provided by the Contractor. Where any section of pipework or equipment is unable to withstand the maximum pipework test pressure, it shall be isolated during the pipework test then that section of pipework or equipment shall be re-tested at the appropriate test pressure.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `The Sanitary Contractor must carry out any additional tests required by the end-user and/or approving agency.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Drainage pipe shall be tested by filling the pipe with 3m. of water higher than the test section and wait for 15 min, then check for leakage at every joints`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Testing of drainage systems shall be carried out in sections by dividing the system horizontally. Each section shall comprise pipework and fitting for three floors/storeys required for testing. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Drainage pressure pipe shall be hydraulic tested at minimum pressure 50 psi.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Hangers and supports for plumbing piping and equipment shall withstand the effects of gravity loads and stresses within limits and under conditions indicated according to ASCE/SEI 7.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Install hangers and supports to allow controlled thermal and seismic movement of piping systems, to permit freedom of movement between pipe anchors, and to facilitate action of expansion joints, expansion loops, expansion bends, and similar units.  `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Install lateral bracing with pipe hangers and supports to prevent swaying.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Install building attachments within concrete slabs or attach to structural steel.  Install additional attachments at concentrated loads, including valves, flanges, and strainers, NPS 2-1/2 (DN 65) and larger and at changes in direction of piping.  Install concrete inserts before concrete is placed; fasten inserts to forms and install reinforcing bars through openings at top of inserts.  `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Install hangers and supports so that piping live and dead loads and stresses from movement will not be transmitted to connected equipment.  `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Install hangers and supports to provide indicated pipe slopes and to not exceed maximum pipe deflections allowed by ASME B31.9 for building services piping. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 0,
            },
            children: [
              new TextRun({
                text: `ELECTRICAL WORKS`,
                bold: true,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `CONDUITS, BOXES AND FITTINGS`,
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
                text: `This item shall consist of the furnishing and installation of the complete conduit work, consisting of electrical conduits; conduit boxes such as junction boxes, pull boxes, utility boxes, octagonal and square boxes; conduit fittings, such as couplings, locknuts and bushings and other electrical materials needed to complete the conduit roughing-in work of this project.`,
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
                text: `All materials shall be brand new and shall be of the approved type meeting all the requirements of the Philippine Electrical Code and bearing the Philippine Standard Agency (PSA) mark.`,
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
                text: `All works throughout shall be executed in the best practice in a workmanlike manner by qualified and experienced electricians under the immediate supervision of a duly licensed Electrical Engineer. `,
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
                text: `The work to be done under this division of specifications consists of the fabrication, furnishing, delivery and installation, complete in all details of the electrical work, at the subject premises and all work materials incidental to the proper completion of the installation, except those portions of the work which are expressly stated to be done by other fields. All works shall be done in accordance with the rules and regulations and with the specifications.`,
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
                text: `All lighting fixtures and lamps are as specified and listed on lighting fixture schedule.`,
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
                text: `All grounding system installation shall be executed in accordance with the approved plans. Grounding system shall include building perimeter ground wires, ground rods, clamps, connectors, ground wells and ground wire taps as shown in the approved design.`,
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
                text: `All auxiliary systems such as telephone and intercom system, time clock system, fire alarm system and public address/nurse's call/paging system installations shall be done in accordance with the approved design.`,
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
                text: `Upon completion of the electrical construction work, the contractor • shall provide all test equipment and personnel and to submit written copies of al! `,
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
                text: `The contractor shall guarantee the electrical installation are done and in accordance with the approved plans and specifications. The contractor shall guarantee that the electrical systems are free from all grounds and from all defective workmanship and materials and will remain so for a period of one year from date and acceptance of works. Any defect shall be remedied by the Contractor at his own expense.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `WIRES AND WIRING DEVICES`,
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
                text: `This Item shall consist of the furnishing and installation of all wires and wiring devices consisting of electric wires and cables, wall switches, convenience receptacles, heavy duty receptacles and other devices shown on the approved Plans but not mentioned in these specifications.`,
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
                text: `Wires and cables shall be of the approved type meeting all the requirements of the Philippine Electrical Code and bearing the Philippine Standard Agency (PSA) mark. Unless specified or indicated otherwise, all power and lighting conductors shall be insulated for 600 volts. All wires shall be copper, soft drawn and annealed, smooth and of cylindrical form and shall be centrally located inside the insulation.`,
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
                text: `Conductors or wires shall not be drawn in conduits until after the cement piaster is dry and the conduits are thoroughly cleaned and free from dirt and moisture. In drawing wires into conduits, sufficient slack shall be allowed to permit easy connections for fixtures, switches, receptacles and other wiring devices without the use of additional splices.`,
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
                text: `All conductors of convenience outlets and lighting branch circuit homeruns shall be wired with a minimum of 3.5 mm in size. Circuit homeruns to panelboards shall not be smaller than 3.5 mm but all homeruns to panelboard more than 30 meters shall not be smaller than 5.5 mm. No conductor shall be less than 2 mm in size.
                `,
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
                text: `All wires of 14mm and larger in size shall be connected to panels and apparatus by means of approved type lugs or connectors of the solderless type, sufficiently large enough to enclose all strands of the conductors and securely fastened. They shall not loosen under vibration or normal strain.`,
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
                text: `All joints, taps and splices on wires larger than 14 mm shall be made of suitable solderless connectors of the approved type and size. They shall be taped with rubber and PVC tapes providing insulation not less than that of the conductors.`,
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
                text: `No splices or joints shall be permitted in either feeder or branch conductors except within outlet boxes or accessible junction boxes or pull boxes.  All joints in branch circuit wiring shall be made mechanically and electrically secured by approved splicing devices and taped with rubber arid PVC tapes in a manner which will make their insulation as that of the conductor.`,
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
                text: `All wall switches and receptacles shall be fitted with standard Bakelite face plate covers. Device plates for flush mounting shall be installed with all four edges in continuous contact with finished wall surfaces without the use of coiled wire or similar devices. Plaster filling shall not be permitted. Plates installed in wet locations shall be gasketed.`,
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
                text: `When more than one switch or device is indicated in a single location, gang plate shall be used. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `POWER LOAD CENTER, SWITCHGEAR AND PANELBOARDS`,
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
                text: `This Item shall consist of the furnishing and installation of the power load center unit substation or low voltage switchgear arid distribution panelboards at the location shown or the approved Plans complete with transformer, circuit breakers, cabinets and all accessories, completely wired and ready for service.`,
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
                text: `All materials shall be brand new and shall be of the approved type meeting all the requirements of the Philippine Electrical Code and bearing the Philippine Standard Agency (PSA) mark.`,
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
                text: `Power Load Center Unit Substation. The Contractor shall furnish and install an indoor-type Power Load Center Unit Substation at the location shown on the approved Plans if required. It shall be totally metal-enclosed, dead front and shall consist of the following coordinated component parts:`,
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
                text: `High Voltage Primary Section. High voltage primary incoming line section consisting of the following parts and related accessories:`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            children: [
              new TextRun({
                text: `One (1) Air-filled Interrupter Switch, 2-position (open-close) installed in a suitable air filled metal enclosure and shall have sufficient interrupting capacity to carry the electrical load. It shall be provided with key interlock with the cubicle for the power fuses to prevent access to the fuses unless the switch is open.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            children: [
              new TextRun({
                text: `Three (3)-power fuses mounted in separate compartments within the switch housing and accessible by a hinged door.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            children: [
              new TextRun({
                text: `One 1) set of high voltage potheads or 3-conductor cables or three single conductor cables.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            children: [
              new TextRun({
                text: `Lightning arresters shall be installed at the high voltage cubicle if required.`,
              }),
              new TextRun({
                text: `Items (i) and (ii) above could be substituted with a power circuit breaker with the correct rating and capacity.`,
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
                text: `Transformer Section. The transformer section shall consist of a power transformer with ratings and capacities as shown on the plans.   it shall be oil liquid-filled non-flammable type and designed in accordance with the latest applicable standards.`,
              }),
              new TextRun({
                text: `The transformer shall be provided with four (4) approximately 2 1/2 % rated KVA taps on the primary winding in most cases one (1) above and three (3) below rated primary voltage and shall be changed by means of externally gang-operated manual tap changer only when the transformer is de-energized. Tap changing under load is acceptable if transformer has been so designed.`,
                break: 2,
              }),
              new TextRun({
                text: `The following accessories shall be provided with the transformer, namely: drain valve, sampling device, filling   connection, oil liquid level gauge, ground pad, top filter press connection, lifting lugs, diagrammatic nameplate, relief valve, thermometer and other necessary related accessories.
                `,
                break: 2,
              }),
              new TextRun({
                text: `The high-voltage and low-voltage bushings and transition flange shall be properly coordinated for field connection to the incoming line section and low voltage switchboard section, respectively.`,
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
                text: `Low Voltage Switchboard Section. The low-voltage switchboard shall be standard modular-unitized units, metal-built, dead front, safety type construction and shall consist of the following:`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            children: [
              new TextRun({
                text: `Switchboard Housing. The housing shall be heavy gauge steel sheet, dead front type, gray enamel finish complete with frame supports, steel bracings, steel sheet panelboards, removable rear plates, copper busbars, and all other necessary accessories to insure sufficient mechanical strength and safety. It shall be provided with grounding bolts and clamps.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            children: [
              new TextRun({
                text: `Secondary Metering Section. The secondary metering section shall consist of one (1) ammeter, AC, indicating type; one (1) voltmeter, AC, indicating type, one (1) ammeter transfer switch for 3-phase; one (1) voltmeter transfer switch for 3-phase; and current transformers of suitable rating and capacity.`,
              }),
              new TextRun({
                text: `The above-mentioned instruments shall be installed in one compartment above the main breaker and shall be complete with all necessary accessories completely wired, ready for use.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            children: [
              new TextRun({
                text: `Main Circuit Breaker. The main circuit breaker shall be draw-out type, manually or electrically operated as required with ratings and capacity as shown on the approved Plans.`,
              }),
              new TextRun({
                text: `The main breaker shall include insulated control switch if electrically operated, manual trip button, magnetic tripping devices, adjustable time overcurrent protection and instantaneous short circuit trip and all necessary accessories to insure safe and efficient operation.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            children: [
              new TextRun({
                text: `Feeder Circuit Breakers. There shall be as many feeder breakers as are shown on the single line diagram or schematic riser diagram and schedule of loads and computations on the plans. The circuit breakers shall be drawout or molded case as required. The circuit breakers shall each have sufficient interrupting capacity and shall be manually operated complete with trip devices and all necessary accessories to insure safe and efficient operation. The number, ratings, capacities of the feeder branch circuit breakers shall be as shown on the approved Plans.`,
              }),
              new TextRun({
                text: `Circuit breakers shall each he of the indicating type, providing 'ON' - "OFF and "TRIP" positions of the operating handles and shall each be provided with nameplate for branch circuit designation. The circuit breaker shall be so designed that an overload or short on one pole automatically causes all poles to open.`,
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
                text: `Low Voltage Switchgear (For projects requiring low-voltage switchgear only). The Contractor shall furnish and install a low-voltage switchgear at the location shown on the plans. It shall be natal-clad, dead front, free standing, safety type construction and shall have copper busbars of sufficient size, braced to resist allowable root mean square (RMS) symmetrical short circuit stresses, and all necessary accessories. The low-voltage switchgear shall consist of the switchgear housing, secondary metering, main breaker and feeder branch circuit.`,
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
                text: `Grounding System. All non-current carrying metallic parts like conduits, cabinets and equipment frames shall be properly grounded in accordance with the Philippine Electrical Code, latest edition.`,
              }),
              new TextRun({
                text: `The size of the ground rods and ground wires shall be as shown on the approved Plans.  The ground resistance shall not be more than 5 ohms.`,
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
                text: `Panelboards and Cabinets. Panelboards shall conform to the schedule of panelboards as shown on the approved Plans with respect to supply characteristics, rating of main lugs or main circuit breaker, number and ratings and capacities of branch circuit breakers.`,
              }),
              new TextRun({
                text: `Panelboards shall consist of a factory completed: dead front assembly mounted in an enclosing flush type cabinet consisting of code gauge galvanized sheet steel box with trim and door. Each door shall be provided with catch lock and two (2) keys. Panelboards shall be provided with directories and shall be printed to indicate load served by each circuit.`,
                break: 2,
              }),
              new TextRun({
                text: `Panelboard cabinets and trims shall be suitable for the type of mounting shown on the approved Plans. The inside and outside of panelboard cabinets and trims shall be factory painted with one rust-proofing primer coat and two finish shop coats of pearl gray enamel paint.`,
                break: 2,
              }),
              new TextRun({
                text: `Main and branch circuit breakers for panelboards shall have the rating, capacity and number of poles as shown on the approved Plans. Breakers shall be thermal magnetic type.  Multiple breaker shall he of the common trip type having a single operating handle.    For 50-ampere breaker or less, it may consist of single-pole breaker permanently assembled at the factory into a multi-pole unit.`,
                break: 2,
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
                text: `The Contractor shall install the Power Load Center Unit Substation or Low-Voltage Switchgear and Panelboards at the locations shown on the approved Plans.`,
              }),
              new TextRun({
                text: `Standard panels and cabinets shall be used and assembled on the job.  All panels shall be of dead front construction furnished with trims for flush or surface mounting as required.`,
                break: 2,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Comply with the current applicable codes, ordinances, and regulations of the authority or authorities having jurisdiction, the rules, regulations and requirements of the utility companies (as applicable).`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Drawings, specifications, codes and standards are minimum requirements. Where requirements differ, the more stringent apply.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `All equipment and installations shall meet or exceed minimum requirements of the Standards and Codes.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `Execute work in strict accordance with the best practices of the trades in a thorough, substantial, workmanlike manner by competent workmen.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `When the tests and inspections have been completed, a label shall be attached to all devices tested.  The label shall provide the name of the testing company, the date the tests were completed, and the initials of the person who performed the tests.  `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 1,
            },
            children: [
              new TextRun({
                text: `PANELBOARDS`,
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
                text: `Fabricate and test panelboards according to IEEE 344 to withstand seismic forces defined in Division 16 Sections 16073 and 16074 "Hangers and Supports for Electrical Systems and Vibration and Seismic controls for Electrical Systems" respectively.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Enclosures:  Flush, Surface, Flush- and surface-mounted cabinets. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Rated for environmental conditions at installed location.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Indoor Dry and Clean Locations:  NEMA, Type 1. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Outdoor Locations:  NEMA, Type 3R.  `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Kitchen and Wash-Down Areas:  NEMA, Type 4X, stainless steel.  `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Indoor Locations Subject to Dust, Falling Dirt, and Dripping Noncorrosive Liquids:  NEMA, Type 12. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Outdoor Locations Subject to Dust, Falling Dirt, and Dripping Noncorrosive Liquids:  NEMA, Type 5R.  `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Front:  Secured to box with concealed trim clamps.  For surface-mounted fronts, match box dimensions; for flush-mounted fronts, overlap box. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Hinged Front Cover:  Entire front trim hinged to box and with standard door within hinged trim cover. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Skirt for Surface-Mounted Panelboards:  Same gauge and finish as panelboard front with flanges for attachment to panelboard, wall, and ceiling or floor. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Gutter Extension and Barrier:  Same gage and finish as panelboard enclosure; integral with enclosure body.  Arrange to isolate individual panel sections. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Finishes: `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Panels and Trim:  Steel and galvanized steel, factory finished immediately after cleaning and pretreating with manufacturer's standard two-coat, baked-on finish consisting of prime coat and thermosetting topcoat. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Back Boxes:  Galvanized steel Same finish as panels and trim. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 4,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Fungus Proofing:  Permanent fungicidal treatment for overcurrent protective devices and other components. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Directory Card:  Inside panelboard door, mounted in transparent card holder metal frame with transparent protective cover.  `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Incoming Mains Location:  Top or Bottom. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Phase, Neutral, and Ground Buses: `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Material:  Hard-drawn copper, 98 percent conductivity. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Equipment Ground Bus:  Adequate for feeder and branch-circuit equipment grounding conductors; bonded to box.`,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 3,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `Neutral Bus: 100 percent of phase bus 4. Extra-Capacity Neutral Bus:  Neutral bus rated 200 percent of phase bus and UL listed as suitable for nonlinear loads. `,
              }),
            ],
          }),
          new Paragraph({
            numbering: {
              reference: "rule-numbering",
              level: 2,
            },
            spacing: {
              after: 500,
            },
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `parts of the structure and equipment damaged by the Contractor in the prosecution of the work shall be replaced as shown on the Plans.`,
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `ENGR.____________________________          ENGR.____________________________ `,
                bold: true,
              }),
              new TextRun({
                text: `E.E.,Planning and Design Division                       C.E.,Planning and Design Division`,
                break: 1,
              }),
            ],
          }),
        ],
      },
    ],
  });

  // Used to export the file into a .docx file
  projectData &&
    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "TechSpec-" + projectData?.project_title + ".docx");
    });
};
