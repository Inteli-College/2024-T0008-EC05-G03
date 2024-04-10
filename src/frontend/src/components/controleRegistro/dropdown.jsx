import React from 'react';
import './dropdown.css';

// Função geral JSX para o componente SortDropdown
const SortDropdown = ({ setSortOrder }) => {
    const handleSortChange = (e) => {
      setSortOrder(e.target.value);
    };
  
  return (
    <select onChange={handleSortChange} className='sort-dropdown'>
      <option value="">Ordenar por:</option>
      <option value="date_asc">Data de Modificação ↑</option>
      <option value="date_desc">Data de Modificação ↓</option>
      <option value="user">Usuário</option>
      <option value="layout">Layout</option>
    </select>
  );
};

export default SortDropdown;