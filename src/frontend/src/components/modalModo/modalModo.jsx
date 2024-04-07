import React from 'react';
import './modalModo.css'; // Make sure to create a Modal.css file in the same directory

const ModalModo = ({ onClose, onModeSelect, json }) => {

    const handleModeSelect = (mode) => {
        onModeSelect(mode, json)
        onClose()
    }
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="modal-text">O robô está sendo utilizado</p>
        <div className="modal-buttons">
          <button className="modal-button" onClick={() => handleModeSelect(1)}>Modo 1</button>
          <button className="modal-button" onClick={() => handleModeSelect(2)}>Modo 2</button>
          <button className="modal-button" onClick={() => handleModeSelect(3)}>Modo 3</button>
        </div>
        <button className="modal-confirm" onClick={onClose}>Confirmar</button>
      </div>
    </div>
  );
};

export default ModalModo;
