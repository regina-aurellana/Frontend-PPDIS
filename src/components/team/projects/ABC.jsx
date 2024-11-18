import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Button, Divider, Space, Spin, Tabs } from "antd";
import { FolderViewOutlined, PlusOutlined } from "@ant-design/icons";
import TableComponents from "../../resources/TableComponents";
import { api } from "../../../utilities/axios-gateway";
import csrfCookie from "../../../utilities/csrf-cookie";
import createSwal from "../../resources/swal/CreateSwalAlert";
import FileHeader from "../../resources/FileHeader";
import ModalComponents from "../../resources/ModalComponents";
import AbcPreviewModal from "../../resources/modal_fields/abc_modal/AbcPreviewModal";
import Swal from "sweetalert2";
import { SaveSwalAlert } from "../../resources/swal/SaveSwalAlert";

const ABC = ({ latestDUPA, dupaGroupId, powQuantity, setHasABCData }) => {
  const [isloading, setLoading] = useState(true);
  const [abcData, setAbcData] = useState(null);
  const [abcError, setAbcError] = useState(null);
  const [abcContent, setAbcContent] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const { id } = useParams();
  const footer = useRef(true);
  const Toast = createSwal();
  const [modalWidth, setModalWidth] = useState();
  const [isShowModal, isSetShowModal] = useState(false);

  // TAB SWITCHING
  const [activeKey, setActiveKey] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [items, setItems] = useState(null);

  //GET ABC FROM B3 PROJECT ID
  useEffect(() => {
    fetchAbc();
  }, []);

  //GET ABC CONTENT FROM ABC DATA
  useEffect(() => {
    if (abcData != null) {
      fetchAbcContent();
    }
  }, [abcData, latestDUPA, dupaGroupId, powQuantity]);

  //FILTER ABC CONTENT DATA FOR TABLR
  useEffect(() => {
    if (abcContent) {
      contentData();
    }
  }, [abcContent, tableData]);

  // CHECKING THE ABC DATA FOR THE SUBMISSION FOR APPROVAL
  useEffect(() => {
    if (abcData && abcContent) {
      setHasABCData(true);
    } else {
      setHasABCData(false);
    }
  }, [abcData, abcContent]);

  //CLICK TO GENERATE ABC IF NONE EXISTED
  const handleClick = async (e) => {
    Swal.fire(SaveSwalAlert).then(async (result) => {
      if (result.isConfirmed) {
        e.preventDefault();
        setLoading(true);
        try {
          await csrfCookie();
          const response = await api.post("/abc", { b3_project_id: id });
          Toast.fire({
            icon: "success",
            title: response.data.status,
            text: response.data.message,
          });
          fetchAbc();
          console.log(response);
        } catch (err) {
          setAbcError("Something went wrong when posting the data");
        }
      }
    });
  };

  //FETCH ABC FROM API { USE B3 PROJECT ID}
  const fetchAbc = async () => {
    setLoading(true);
    await api("abc/" + id).then((response) => {
      if (Object.keys(response.data).length === 0) {
        // console.log(["abc length 0", abcData, abcContent]);
        setLoading(false);
      } else {
        setAbcData(response.data);
        setLoading(false);
      }
    });
  };

  //FETCH ABC CONTENT FROM API { USE ABC ID}
  const fetchAbcContent = async () => {
    await api("abc-content/" + id)
      .then((response) => {
        setAbcContent(response.data);
        setActiveKey(response.data[0].abc_content_id);
        setTableData(response.data[0]);
        setItems(
          response.data.map((item, index) => {
            return {
              label: abcData?.b3_project.dupa_per_project_group[index].name
                ? abcData?.b3_project.dupa_per_project_group[index].name
                : abcData?.b3_project.project_nature.name == "Horizontal"
                ? "Street " + parseInt(index + 1)
                : "Building " + parseInt(index + 1),
              key: item.abc_content_id,
              children: "",
            };
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  };

  //ORGANIZE ABC CONTENT
  const contentData = () => {
    const filteredSource = [];
    const sourceData = tableData?.b3_project.pow_table.map((content, index) => {
      const headData = {
        item_code: "Part " + parseInt(index + 1),
        description: content.sow_category_name,
        estimated_cost: "",
        percentage: "",
        markup_value: "",
        vat: "",
        indirect_cost: "",
        total_cost: "",
      };
      filteredSource.push(headData);

      const subData = content.contents.map((subContent, index) => {
        const subcon = {
          item_code: subContent.sow_sub_item_code,
          description: subContent.sow_sub_caterory_name,
          estimated_cost: subContent.total_per_letter,
          percentage: subContent.percentage * 100 + "%",
          markup_value: subContent.markup_value_per_letter,
          vat: subContent.vat_per_letter,
          indirect_cost: subContent.indirect_cost_per_letter,
          total_cost: subContent.cost_per_letter,
        };

        filteredSource.push(subcon);
        return subcon;
      });

      const partTotalData = {
        item_code: "",
        description: (
          <div style={{ textAlign: "center" }}>
            TOTAL OF Part {parseInt(index + 1)}
          </div>
        ),
        estimated_cost: content.total_per_part,
        percentage: content.percentage * 100 + "%",
        markup_value: content.total_markup_value_per_part_number,
        vat: content.total_vat_per_part_number,
        indirect_cost: content.total_indirect_cost_per_part_number,
        total_cost: content.total_cost_per_part_number,
      };
      filteredSource.push(partTotalData);

      return headData;
    });

    filteredSource.push({
      item_code: "",
      description: (
        <div style={{ textAlign: "center" }}>TOTAL OF (ROAD AND DRAINAGE)</div>
      ),
      estimated_cost: tableData.road_and_drainage_total,
      percentage: tableData.percentage * 100 + "%",
      markup_value: tableData.road_and_drainage_markup_value,
      vat: tableData.road_and_drainage_vat,
      indirect_cost: tableData.road_and_drainage_indirect_cost,
      total_cost: tableData.road_and_drainage_cost,
    });

    filteredSource.push({
      item_code: "",
      description: <div style={{ textAlign: "center" }}>TOTAL</div>,
      estimated_cost: tableData.grand_total,
      percentage: "",
      markup_value: tableData.overall_markup_value,
      vat: tableData.overall_vat,
      indirect_cost: tableData.overall_indirect_cost,
      total_cost: tableData.overall_cost,
    });
    setFilteredData(filteredSource);
  };

  //SET UP TABLE COLUMS
  const table_columns = [
    {
      title: "Item Code",
      dataIndex: "item_code",
      key: "item_code",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "30%",
    },
    {
      title: "Estimated Cost",
      dataIndex: "estimated_cost",
      key: "estimated_cost",
      align: "center",
    },
    {
      title: "Total Mark-up",
      dataIndex: "",
      key: "",
      align: "center",
      children: [
        {
          title: "%",
          dataIndex: "percentage",
          key: "percentage",
          align: "center",
        },
        {
          title: "Value",
          dataIndex: "markup_value",
          key: "markup_value",
          align: "center",
        },
      ],
    },
    {
      title: "VAT",
      dataIndex: "vat",
      key: "vat",
      align: "center",
    },
    {
      title: "Total Indirect Cost",
      dataIndex: "indirect_cost",
      key: "indirect_cost",
      align: "center",
    },
    {
      title: "Total Cost",
      dataIndex: "total_cost",
      key: "total_cost",
      align: "center",
    },
  ];

  if (isloading) {
    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        <Spin size="medium">
          <div className="content" />
        </Spin>
      </Space>
    );
  }
  if (abcData == null && abcContent == null) {
    return (
      <>
        <div>
          <FileHeader />
          <div className="abc-title-container">
            <p>PROJECT TITLE</p>
          </div>
          <div className="abc-title-container">
            <p>PROJECT location</p>
          </div>
          <div className="abc-title-container">
            <p>APPROVED BUDGET for the CONTRACT</p>
          </div>
          <Space>
            <h1>Want to create ABC ?</h1>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleClick}
              style={{
                backgroundColor: "#539165",
              }}
            >
              Create
            </Button>
          </Space>
        </div>
      </>
    );
  }

  const onChange = (key) => {
    console.log(key);
  };

  const handleTab = (_key) => {
    setTableData(abcContent?.find((item) => item.abc_content_id === _key));
    setActiveKey(_key);
  };

  const preview = () => {
    setLoading(false);
    isSetShowModal(true);
    setModalWidth(1300);
    footer.current = false;
  };

  const handleCancel = () => {
    isSetShowModal(false);
  };

  return (
    <>
      <div>
        <div className="responsive-table">
          <FileHeader />
          <Divider />
          <div className="abc-title-container">
            {abcContent != null ? (
              <p>{abcData.b3_project.project_title},</p>
            ) : (
              <p>PROJECT TITLE</p>
            )}
          </div>
          <div className="abc-title-container">
            {abcContent != null ? (
              <p>{abcData.b3_project.location}</p>
            ) : (
              <p>PROJECT location</p>
            )}
          </div>
          <div className="abc-title-container">
            <p>
              <b>APPROVED BUDGET for the CONTRACT</b>
            </p>
          </div>

          <Tabs
            onChange={onChange}
            type="card"
            activeKey={activeKey}
            items={items}
            onTabClick={handleTab}
          />
          {abcContent && (
            <TableComponents
              loading={setLoading}
              className="project-table"
              columns={table_columns}
              dataSource={filteredData}
              pagination={false}
            />
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Space>
            <Button
              onClick={preview}
              type="primary"
              icon={<FolderViewOutlined />}
              style={{
                marginBottom: 10,
                marginTop: 20,
                backgroundColor: "#176B87",
              }}
            >
              Preview
            </Button>
          </Space>
        </div>

        <ModalComponents
          className="custom-modals"
          modalContent={
            <AbcPreviewModal
              abcData={abcData}
              abcContent={abcContent}
              isSetShowModal={isSetShowModal}
              tableData={tableData}
            />
          }
          isShownModal={isShowModal}
          handleCancel={handleCancel}
          okText={"Submit"}
          modalWidth={modalWidth}
          footer={footer.current}
        />
      </div>
    </>
  );
};

export default ABC;
