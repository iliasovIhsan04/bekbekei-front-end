import React from "react";
import "./Modal.css";

const Modal = ({ setModal, children }) => {
  return (
    <div className="modal_bek_filter">
      <div onClick={() => setModal(false)} className="modal_bek_not"></div>
      <div className="modal_bek_container">{children}</div>
    </div>
  );
};

export default Modal;
