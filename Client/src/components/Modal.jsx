// Modal.js

import React from "react";

const Modal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>This is your modal content.</p>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>
  );
};

export default Modal;
