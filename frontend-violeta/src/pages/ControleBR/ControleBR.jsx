import './ControleBR.css'
import React from 'react'

function ControleBR() {
  return (
    <>
      <div className='mainCBR'>
        <h1>Controle do Braço Robótico</h1>
        <div className='linhaHorizontal'></div>
        <div className='botoesCBR'>
          <form action='/home'><button className='botaoPadrao'>Home</button></form>
          <form action='/posicaoatual'><button className='botaoPadrao'>Posição Atual</button></form>
          <form action='/ligarferramenta'><button className='botaoPadrao'>Ligar Ferramenta</button></form>
          <form action='/selecionar'><button className='botaoPadrao'>Selecionar Layout</button></form>
        </div>
      </div>
    </>
  )
}

export default ControleBR
