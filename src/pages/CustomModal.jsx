import React from "react";
import Modal from "react-modal";
import { CSSTransition } from "react-transition-group";
Modal.setAppElement("#root");
const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {children}
      </Modal>
    </CSSTransition>
  );
};

export default CustomModal;
