import React from 'react';
import './modalDeleteLayout.css';

// Função geral JSX para o componente ConfirmModal
const ConfirmModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <div className="confirm-modal-content">
          <p className="confirm-modal-text">Tem certeza que deseja descartar esse layout?</p>
          <div className="confirm-modal-actions">
            <button className="confirm-modal-cancel" onClick={onCancel}>Cancelar</button>
            <button className="confirm-modal-confirm" onClick={onConfirm}>Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
