import React, { useEffect, useState, useRef } from "react";
import FileHeader from "../../resources/FileHeader";
import { useParams } from "react-router-dom";
import { api } from "../../../utilities/axios-gateway";
import { Button, Space, Layout, Divider, Spin, Tabs } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { CertificationFile } from "./CertificationFile";

function Certification({ sowcatData, projectData }) {
  const [abcTotal, setAbcTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const today = new Date();
  const month = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();
  const day = today.getDate();

  const abcAPI = "abc/";

  // MAKE DAYS ORDINAL
  const getOrdinal = (n) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  const handlePrint = () => {
    CertificationFile(projectData, abcTotal, getOrdinal(day), year, month);
  };

  useEffect(() => {
    const fetchAbc = async () => {
      try {
        await api(abcAPI + id).then((response) => {
          setAbcTotal(response.data.abc_content[0]?.total_cost);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbc();
  }, []);

  return (
    <div className="">
      {/* <div className="responsive-table">
        <FileHeader />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <p
            className=""
            style={{
              fontSize: "35px",
              fontWeight: "bold",
              letterSpacing: "5px",
            }}
          >
            CERTIFICATION
          </p>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "16px",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p>
            This is to certify that this Department prepared the Detailed
            Engineering Documents for the project listed hereunder in accordance
            with the Engineering Standards.
          </p>
          <br />
          <br />
          <br />
          <div style={{ width: "70%" }}>
            <p>PROJECT TITLE:&nbsp;&nbsp;&nbsp;{projectData?.project_title}</p>
            <br />
            <p>BARANGAY:&nbsp;&nbsp;&nbsp;</p>
            <br />
            <p>DISTRICT:&nbsp;&nbsp;&nbsp;</p>
            <br />
            <p>
              APPROVED BUDGET FOR THE CONTRACT:&nbsp;&nbsp;&nbsp;
              <b>Php {abcTotal}</b>
            </p>
            <br />
            <p>
              Issued this {getOrdinal(day)} of {month}, {year} at{" "}
              {projectData?.location}
            </p>
          </div>
          <br />
          <br />
          <br />
          <div style={{ display: "flex", justifyContent: "end", width: "75%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p>________________________________________________</p>
              <p>ADMIN TITLE</p>
            </div>
            <br />
          </div>
        </div>
      </div> */}
      {/* <Divider /> */}
      <div
        style={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}
      >
        <h3>Download Certification for this project?</h3> &nbsp; &nbsp;
        <Button
          onClick={handlePrint}
          type="primary"
          style={{
            paddingLeft: 35,
            paddingRight: 35,
            backgroundColor: "#539165",
            color: "white",
          }}
        >
          <DownloadOutlined /> Download
        </Button>
      </div>
    </div>
  );
}

export default Certification;
