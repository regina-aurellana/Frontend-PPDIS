import React from "react";
import { Row, Col, Image } from "antd";
import headerLogo1 from "../../img/ENGR_logo.png";
import headerLogo2 from "../../img/QC_logo.png";

const FileHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <div>
        <Image
          style={{
            marginTop: 14,
            width: "70%",
          }}
          src={headerLogo2}
          preview={false}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.2,
          textAlign: "center",
          // outline: "solid",
          // outlineWidth: "1px",
          minWidth: "450px",
        }}
      >
        <p className="font-corsiva" style={{ fontSize: 18 }}>
          Republic of the Philippines
        </p>
        <p className="font-corsiva" style={{ fontSize: 18 }}>
          Quezon City
        </p>
        <p
          className="font-arial"
          style={{ fontSize: "1.6rem", fontWeight: 600 }}
        >
          DEPARTMENT OF ENGINEERING
        </p>
        <p className="font-arial" style={{ fontSize: "12px", fontWeight: 600 }}>
          Civic Center Building B, Quezon City Hall Compound, Elliptical Road
        </p>
        <p className="font-arial" style={{ fontSize: "12px", fontWeight: 600 }}>
          Diliman, Central 1100 Quezon City
        </p>
        <p className="font-arial" style={{ fontSize: "12px", fontWeight: 600 }}>
          Trunkline: +63 2 8988 4242
        </p>
        <p className="font-arial" style={{ fontSize: "12px", fontWeight: 600 }}>
          E-mail address: engineering@quezoncity.gov.ph
        </p>
      </div>
      <div>
        <Image
          style={{
            float: "right",
            marginTop: 8,
            width: "70%",
            // outline: "solid",
            // outlineWidth: "1px",
          }}
          src={headerLogo1}
          preview={false}
        />
      </div>
    </div>
  );
};

export default FileHeader;
