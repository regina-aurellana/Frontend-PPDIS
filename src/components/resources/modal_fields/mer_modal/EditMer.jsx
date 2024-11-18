import React from "react";
import { Col, Input, Row } from "antd";

const EditMer = ({ equipmentRecord, editMer, setEditMer }) => {
  return (
    <div>
      <b>
        {equipmentRecord.item_code} - {equipmentRecord.name}
      </b>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* <p className="field-label">Quantity</p> */}
        <Input
          placeholder="Update Quantity..."
          value={editMer.quantity || undefined}
          onChange={(event) =>
            setEditMer({
              ...editMer,
              id: equipmentRecord.id,
              quantity: event.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default EditMer;
