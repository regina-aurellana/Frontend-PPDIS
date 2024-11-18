import { Col } from "antd";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import Cookies from "js-cookie";
import { local_address } from "../../utilities/axios-gateway";

const FilepondUploadComponents = ({ setFilesUpload }) => {
  const handleUpdateFiles = (fileItems) => {
    setFilesUpload(fileItems);
  };

  return (
    <Col span={24}>
      <FilePond
        allowMultiple={false}
        acceptedFileTypes={[
          "text/csv",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel.sheet.binary.macroenabled.12", // .xls format
        ]}
        maxFileSize="1MB"
        allowReorder={true}
        maxFiles={3}
        onupdatefiles={handleUpdateFiles}
        server={{
          process: {
            url: local_address + "/api/upload-material",
            method: "post",
            headers: {
              "X-Xsrf-Token": Cookies.get("XSRF-TOKEN"),
            },
            withCredentials: true,
          },
          revert: {
            url: local_address + "/api/revert-material",
            method: "delete",
            headers: {
              "X-Xsrf-Token": Cookies.get("XSRF-TOKEN"),
            },
            withCredentials: true,
          },
        }}
      />
    </Col>
  );
};

export default FilepondUploadComponents;
