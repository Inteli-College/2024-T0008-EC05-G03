import React, { useState } from "react";
import './modalSelecionado.css';

const Modal = ({ onClose }) => {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
  
    const handleSubmit = () => {
      
      console.log(itemName, quantity);
      onClose(); 
    };

    const handleOutsideClick = (event) => {
        
        if (event.target.classList.contains('modal')) {
          onClose();
        }
      };
  
    return (
      <div className="modal" onClick={handleOutsideClick}>
        <div className="modal-content">
          <div className="modal-body">
            <label htmlFor="itemName">O que está sendo adicionado?</label>
            <input
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              type="text"
              placeholder="Digite o nome do item"
            />
            <label htmlFor="quantity" id="qtd">Qual a quantidade?</label>
            <input
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              type="number"
              placeholder="Digite a quantidade"
            />
          </div>
          <div className="modal-footer">
            <button onClick={handleSubmit} className="confirm-button">Confirmar</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;