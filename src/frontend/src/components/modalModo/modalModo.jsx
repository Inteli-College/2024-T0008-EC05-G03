import React from 'react';
import './modalModo.css'; // Make sure to create a Modal.css file in the same directory

// Função geral JSX para o componente ModalModo
const ModalModo = ({ onClose, onModeSelect, json }) => {

  // Função para selecionar o modo de verificação
    const handleModeSelect = (mode) => {
        onModeSelect(mode, json)
        onClose()
    }

    

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="modal-text">Qual modo de verificação a ser utilizado?</p>
        <div className="modal-buttons">
          <button className="modal-button" onClick={() => handleModeSelect(0)}>Modo 0 </button>
          <button className="modal-button" onClick={() => handleModeSelect(1)}>Modo 1 </button>
          <button className="modal-button" onClick={() => handleModeSelect(2)}>Modo 2 </button>
          <button className="modal-button" onClick={() => handleModeSelect(3)}>Modo 3 </button>
        </div>
        <p style={{fontSize:10}}>0: Nenhuma verificação, 1: Verificação em espiral,</p>
        <p style={{fontSize:10}}>2: Verificação em cobrinha, 3: Ambas verificações</p><br></br>
        
        <button className="modal-confirm" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ModalModo;
