import React from 'react';
import './filtro.css'

// Função geral JSX para o componente FilterInput
const FilterInput = ({ setFilterKeyword }) => {
  const handleFilterChange = (e) => {
    setFilterKeyword(e.target.value);
  };

  return (
    <input type="text" placeholder="🔎 Filtrar por palavra-chave" onChange={handleFilterChange} className="filter-input"/>
  );
};

export default FilterInput;