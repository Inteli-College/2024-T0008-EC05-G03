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
        console.log("Layouts obtidos com sucesso:", layoutsData); 
      })
      .catch((error) => {
        console.error("Erro ao obter dados do layout:", error);
      });
  }

  function goHome() {
    axios.get(`${import.meta.env.VITE_BACKEND}/home`, { headers: { "Content-Type": "application/json" } } )
      .then((response) => {
        console.log('Sucesso posição Home:', response.data);
      })
      .catch((error) => {
        console.error("Erro ao ir para Home:", error);
      
      });
  }

  function actualPos(){
    axios.get(`${import.meta.env.VITE_BACKEND}/robo_position`, { headers: { "Content-Type": "application/json" } } )
      .then((response) => {
        console.log('Sucesso posição atual:', response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter posição atual:", error);
      
      });
  }

  function turnActuator(){
    axios.get(`${import.meta.env.VITE_BACKEND}/actuator`, { headers: { "Content-Type": "application/json" } } )
      .then((response) => {
        console.log('Sucesso ao ligar ferramenta:', response.data);
      })
      .catch((error) => {
        console.error("Erro ao ligar ferramenta:", error);
      
      });
  }

  function goHome() {
    axios.get(`${import.meta.env.VITE_BACKEND}/home`, { headers: { "Content-Type": "application/json" } } )
      .then((response) => {
        console.log('Sucesso posição Home:', response.data);
      })
      .catch((error) => {
        console.error("Erro ao ir para Home:", error);
      
      });
  }

  function actualPos(){
    axios.get(`${import.meta.env.VITE_BACKEND}/robo_position`, { headers: { "Content-Type": "application/json" } } )
      .then((response) => {
        console.log('Sucesso posição atual:', response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter posição atual:", error);
      
      });
  }

  function turnActuator(){
    axios.get(`${import.meta.env.VITE_BACKEND}/actuator`, { headers: { "Content-Type": "application/json" } } )
      .then((response) => {
        console.log('Sucesso ao ligar ferramenta:', response.data);
      })
      .catch((error) => {
        console.error("Erro ao ligar ferramenta:", error);
      
      });
  }

  return (
    <>
      <div className='mainCBR'>
        <div className='titulo'></div>
        <div className='linhaHorizontal'></div>
        <div className='botoesCBR'>
          <button className='botaoPadrao'onClick={goHome}>Home</button>
          <form><button className='botaoPadrao' onClick={actualPos}></button></form>
          <button className='botaoPadrao' onClick={turnActuator}>Ligar Ferramenta</button>
          <form action="/selecionar"><button className='botaoPadrao' onClick={getLayouts}></button></form>
        </div>
      </div>
    </>
  );
}

export default ControleBR;
