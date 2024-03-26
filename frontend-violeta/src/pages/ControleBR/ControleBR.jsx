import './ControleBR.css'
import React from 'react'

function ControleBR() {
  return (
    <>
      <div className='mainCBR'>
        <div className='titulo'></div>
        <div className='linhaHorizontal'></div>
        <div className='botoesCBR'>
        <form action='/home'><button className='botaoPadrao'></button></form>
          <form action='/posicaoatual'><button className='botaoPadrao'></button></form>
          <form action='/ligarferramenta'><button className='botaoPadrao'></button></form>
          <form action='/selecionar'><button className='botaoPadrao'></button></form>
        </div>
      </div>
    </>
  )
}

export default ControleBR
