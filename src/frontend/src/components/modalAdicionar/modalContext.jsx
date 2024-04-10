// ModalContext.js
import React, { createContext, useState, useContext } from 'react';

// Criação do contexto ModalContext
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ modalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
