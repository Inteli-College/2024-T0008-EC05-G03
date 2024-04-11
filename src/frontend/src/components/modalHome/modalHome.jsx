import React from 'react';
import './modalHome.css'; 

const HomeModal = ({ show, handleClose }) => {
    if (!show) {
        return null;
      }

      const handleOverlayClick = (e) => {
        if (e.target.id === "modal-overlay") {
          handleClose();
        }
      };

  return (
    <div className="home-modal-overlay" onClick={handleOverlayClick}>
      <div className="home-modal-content" onClick={e => e.stopPropagation()}>
        <div className="home-modal-body">
          <p>Retornando a posição Home</p>
          <button className="home-modal-confirm-button" onClick={handleClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default HomeModal;
