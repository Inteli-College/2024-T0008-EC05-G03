import './ControleBR.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";

function ControleBR() {
  const [layouts, setLayouts] = useState([]);

  useEffect(() => {
    getLayouts();
  }, []); // Executa uma vez quando o componente monta

  function getLayouts() {
    axios.get(`${import.meta.env.VITE_BACKEND}/get_layouts`, { headers: { "Content-Type": "application/json" } } )
      .then((response) => {
        const layoutsData = response.data;
        setLayouts(layoutsData);
        console.log("Layouts obtidos com sucesso:", layoutsData); // Corrigido para imprimir os layouts
      })
      .catch((error) => {
        console.error("Erro ao obter dados do layout:", error);
      });
  }

  return (
    <>
      <div className='mainCBR'>
        <div className='titulo'></div>
        <div className='linhaHorizontal'></div>
        <div className='botoesCBR'>
          <form action='/home'><button className='botaoPadrao'></button></form>
          <form action='/posicaoatual'><button className='botaoPadrao'></button></form>
          <form action='/ligarferramenta'><button className='botaoPadrao'></button></form>
          <form action="/get_compartments/<int:id_layout>"><button className='botaoPadrao' onClick={getLayouts}></button></form>
        </div>
      </div>
    </>
  );
}

export default ControleBR;
