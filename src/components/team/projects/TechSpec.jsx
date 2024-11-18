import React from "react";
import { Button } from "antd";
import { TechSpecFile } from "./TechSpecFile";
import { TechSpecFileHorizontal } from "./TechSpecFileHorizontal";
import { DownloadOutlined } from "@ant-design/icons";

export const TechSpec = ({ sowcatData, projectData }) => {
  console.log("tihs prData ", projectData);
  const handleDownload = () => {
    if (projectData != null || undefined) {
      if (projectData?.project_nature == "Horizontal")
        TechSpecFileHorizontal((projectData = { projectData }));
      else if (projectData?.project_nature == "Vertical")
        TechSpecFile((projectData = { projectData }));
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}>
      <h3>Download Technical Specifications?</h3> &nbsp;
      <Button
        onClick={handleDownload}
        style={{
          backgroundColor: "#539165",
          color: "white",
          paddingLeft: 20,
          paddingRight: 25,
        }}
      >
        <DownloadOutlined /> Download
      </Button>
    </div>
  );
};
