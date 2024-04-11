import './ControleBR.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import ModalPosAtual from '../../components/modalPosAtual/modalPosAtual.jsx';
import HomeModal from '../../components/modalHome/modalHome.jsx';

// Função geral JSX para a página de ControleBR
function ControleBR() {
  const [layouts, setLayouts] = useState([]);
  const [showModalPos, setShowModalPos] = useState(false);
  const [showModalHome, setShowModalHome] = useState(false);
  const [position, setPosition] = useState({x: '', y: '', z: '', r: ''});

  const handleOpenModalPos = () => {
    axios.get(`${import.meta.env.VITE_BACKEND}/robo_position`, { headers: { "Content-Type": "application/json" } } )
      .then((response) => {
        setPosition({
          x: response.data.x,
          y: response.data.y,
          z: response.data.z,
          r: response.data.r,
        });
        setShowModalPos(true);
      })
    .catch((error) => {
      console.error("Erro ao obter posição atual", error);
    });
  };

  const handleCloseModalPos = () => {
    setShowModalPos(false);
  }

  const handleOpenModalHome = () => {
    axios.get(`${import.meta.env.VITE_BACKEND}/home`, { headers: { "Content-Type": "application/json" } } )
    .then((response) => {
      console.log(response.data);
      setShowModalHome(true);
    })
    .catch((error) => {
      console.error("Erro ao ir para Home:", error);
    
    });
  }

  const handleCloseModalHome = () => {
    setShowModalHome(false);
  }

  // Função para ligar o atuador do robo
  function turnActuator(){
    axios.get(`${import.meta.env.VITE_BACKEND}/actuator`, { headers: { "Content-Type": "application/json" } } )
      .then((response) => {
        console.log('Sucesso ao ligar ferramenta:', response.data);
      })
      .catch((error) => {
        console.error("Erro ao ligar ferramenta:", error);
      
      });
  }


  // Div principal da página de ControleBR
  return (
    <>
      <div className='mainCBR'>
        <ModalPosAtual show={showModalPos} handleClose={handleCloseModalPos} position={position}/>
        <HomeModal show={showModalHome} handleClose={handleCloseModalHome}/>
        <div className='titulo'></div>
        <div className='linhaHorizontal'></div>
        <div className='botoesCBR'>
          <button className='botaoPadrao1' onClick={handleOpenModalHome}>Home</button>
          <button className='botaoPadrao1' onClick={handleOpenModalPos}>Posição Atual</button>
          <button className='botaoPadrao1' onClick={turnActuator}>Ligar Ferramenta</button>
          <a href='/selecionar' className='botaoPadrao1'>Selecionar Layout</a>
        </div>
      </div>
    </>
  );
}

export default ControleBR;
