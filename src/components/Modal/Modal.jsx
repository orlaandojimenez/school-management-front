import React from "react";
import "./styles.css";

const Modal = ({ isOpen, onClose, onSave, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Agregar Nueva Materia</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="save-button" onClick={onSave}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
