import React from 'react';
import 'button.css';

// Função geral JSX para o componente Button
const Button = ({ children, onClick }) => {
  return (
    <button className="custom-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
