import React from "react";
import { Modal } from "antd";

const ModalComponents = ({
  title,
  isShownModal,
  modalContent,
  handleCancel,
  handleOk,
  okText,
  cancelText,
  closable,
  modalWidth,
  footer = true,
}) => {
  let modal = (
    <Modal
      title={title}
      open={isShownModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={okText}
      cancelText={cancelText}
      closable={closable}
      width={modalWidth}
      maskClosable={false}
    >
      {modalContent}
    </Modal>
  );

  if (!footer) {
    modal = (
      <Modal
        footer={null}
        title={title}
        open={isShownModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={okText}
        cancelText={cancelText}
        closable={closable}
        width={modalWidth}
      >
        {modalContent}
      </Modal>
    );
  }

  return modal;
};

export default ModalComponents;
