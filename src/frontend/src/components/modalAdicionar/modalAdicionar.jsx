  import React, { useState } from "react";
  import axios from 'axios';
  import './modalAdicionar.css';

  // Função geral JSX para o componente ModalAdicionar
  const ModalAdicionar = ({ onClose}) => {
      const [layout, setLayout] = useState('');
      const [showValidationMessage, setShowValidationMessage] = useState(false);
    
      // Função para enviar o layout para o backend
      const handleSubmit = () => {

        if (!layout === '') {
          setShowValidationMessage(true);
          return;
        }

        const data = {
          nome_layout: layout,
        };
        console.log(layout)

        setShowValidationMessage(false);

        // Envia o layout para o backend
        axios.post(`${import.meta.env.VITE_BACKEND}/add_layout`, data, { headers: { "Content-Type": "application/json" } }).then((response) => {
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
              <label htmlFor="nome_layout">Qual o nome do layout?</label>
              <input
                id="nome_layout"
                value={layout}
                type="text"
                placeholder="Digite o nome do layout"
                onChange={(e) => setLayout(e.target.value)}
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
    
    export default ModalAdicionar;