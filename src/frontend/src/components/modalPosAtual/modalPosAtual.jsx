// ModalPosAtual.jsx
import React, { useState } from 'react';
import './modalPosAtual.css'; // Make sure to create a corresponding CSS file for styling

const ModalPosAtual = ({ show, handleClose, position }) => {
  if (!show) {
    return null;
  }

  // Function to close the modal if the overlay behind the modal content is clicked
  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      handleClose();
    }
  };

  return (
    <div id="modal-overlay" className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Posição atual do braço:</h2>
        <div className="modal-body">
          <div className="coordinate">X - {position.x}</div>
          <div className="coordinate">Y - {position.y}</div>
          <div className="coordinate">Z - {position.z}</div>
          <div className="coordinate">R - {position.r}</div>
        </div>
        <button className="confirm-button" onClick={handleClose}>Confirmar</button>
      </div>
    </div>
  );
};

export default ModalPosAtual;
