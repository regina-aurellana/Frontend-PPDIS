import React from "react";
import { Input } from "antd";

const UpdateDupaGroupName = ({
  perProjectId,
  perDupaId,
  setEditDupaGroup,
  editDupaGroup,
  selectedGroup,
}) => {
  return (
    <div>
      <b>Update Group {selectedGroup.name} </b>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Input
          placeholder="Update Name..."
          value={editDupaGroup.name || undefined}
          onChange={(event) =>
            setEditDupaGroup({
              ...editDupaGroup,
              name: event.target.value,
            })
          }
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default UpdateDupaGroupName;
