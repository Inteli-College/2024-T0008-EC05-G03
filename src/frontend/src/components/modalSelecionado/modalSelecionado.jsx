import React, { useState } from "react";
import axios from 'axios';
import './modalSelecionado.css';

// Função geral JSX para o componente Modal
const Modal = ({ onClose, layoutId, compartmentNumber, isRefill }) => {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [showValidationMessage, setShowValidationMessage] = useState(false);
  
    const handleSubmit = () => {

      if (!itemName || quantity === '') {
        setShowValidationMessage(true);
        return;
    }

    // Envia os dados para o backend
      const endpoint = isRefill ? "/add_refill_compartment/" : "/add_compartment/";
      const data = {
        nome_item: itemName,
        quantidade_item: Number(quantity),
        numero_compartimento: compartmentNumber.numero_compartimento
      };

      setShowValidationMessage(false);

      axios.post(`${import.meta.env.VITE_BACKEND}${endpoint}${layoutId}`, data, { headers: { "Content-Type": "application/json" } }).then((response) => {
        console.log('Sucesso', response);
        window.location.reload();
      }) .catch(err => {
        console.log('Erro', err)
      });
      
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
            {showValidationMessage && (
                <div className="validation-message" style={{marginLeft: "22%", color: "red"}}>
                  Adicione valores válidos
                </div>
              )}
          </div>
          <div className="modal-footer">
            <button onClick={handleSubmit} className="confirm-button">Confirmar</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;