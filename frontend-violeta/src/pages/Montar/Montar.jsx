import './Montar.css'
import React from 'react'
import logoCompleta from '../../assets/logo_completa.svg'

function Montar() {
  return (
      <div className='pageContent'>
            <div className='infoContainer'>
              <div className='carrinhoUm'>
                <h2 className='carrinhoTitle'>Gaveta de <br /> Reabastecimento</h2>
                <div className='backgroundCarrinho'></div>
              </div>
            </div>
            <div className='linhaVertical'></div>
            <div className='painelDeControle'>
                <img src={logoCompleta} />
                <div className='buttonsPainel'>
                    <form action='/novolayout'><button className='botaoPadrao'>Novo Layout</button></form>
                    <form action='/exportarlayout'><button className='botaoPadrao'>Exportar Layout</button></form>
                    <form action='/importarlayout'><button className='botaoPadrao'>Importar Layout</button></form>
                    <form action='/editarlayout'><button className='botaoPadrao'>Editar</button></form>
                </div>
            </div>
        </div>
  )
}

export default Montar