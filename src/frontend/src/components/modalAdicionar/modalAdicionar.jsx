import React, { useState } from 'react';
import './modalAdicionar.css';
import { useModal } from './modalContext.jsx';

const ModalAdicionar = ({ idLayout }) => {
  const { modalOpen, closeModal } = useModal(); // Use o estado e a função closeModal do contexto
  const [nomeItem, setNomeItem] = useState('');
  const [quantidadeItem, setQuantidadeItem] = useState('');
  const [numeroCompartimento, setNumeroCompartimento] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      nome_item: nomeItem,
      quantidade_item: quantidadeItem,
      numero_compartimento: numeroCompartimento
    };

    try {
      const response = await fetch(`/add_compartment/${idLayout}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (response.ok) {
        alert(responseData.message); // Ou outra lógica de tratamento de sucesso
        closeModal(); // Fechar o modal após sucesso
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      console.error('Houve um erro ao adicionar o compartimento:', error);
    }
  };

  return (
    <>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>×</span>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={nomeItem}
                onChange={(e) => setNomeItem(e.target.value)}
                placeholder="Nome do Item"
                required
              />
              <input
                type="number"
                value={quantidadeItem}
                onChange={(e) => setQuantidadeItem(e.target.value)}
                placeholder="Quantidade do Item"
                required
              />
              <input
                type="number"
                value={numeroCompartimento}
                onChange={(e) => setNumeroCompartimento(e.target.value)}
                placeholder="Número do Compartimento"
                required
              />
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalAdicionar;
