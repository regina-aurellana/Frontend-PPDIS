import React from "react";
import { Col, Input, Row } from "antd";

const EditLome = ({ materialRecord, editLome, setEditLome }) => {
  return (
    <div>
      <b>
        {materialRecord.item_code} - {materialRecord.name}
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
          value={editLome.quantity || undefined}
          onChange={(event) =>
            setEditLome({
              ...editLome,
              id: materialRecord.id,
              quantity: event.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default EditLome;
