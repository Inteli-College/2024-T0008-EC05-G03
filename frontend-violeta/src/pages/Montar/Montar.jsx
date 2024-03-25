import './Montar.css'
import React from 'react'
import robotArm from '../../assets/robot-arm.svg'
import iconAdd from '../../assets/icon_add.svg'
import Voltar from '../../components/voltar.jsx'

function BotaoAdd() {
  return (
    <button className='botaoAdd'>
      <img src={iconAdd} />
    </button>
  )
}

function Montar() {
  return (
      <div className='pageContent'>
            <div className='infoContainer'>
              <div className='carrinho'>
                <h2 className='carrinhoTitle'>GAVETA DE <br /> REABASTECIMENTO</h2>
                <div className='backgroundCarrinho'>
                  <div className='itensColuna'>
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  </div>
                  <div className='itensColuna'>
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  </div>
                </div>
              </div>
              <div className='carrinho'>
                <h2 className='carrinhoTitle'>GAVETA DO CARRINHO <br /> EMERGENCIAL</h2>
                <div className='backgroundCarrinho'>
                  <div className='itensColuna'>
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  </div>
                  <div className='itensColuna'>
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  </div>
                </div>
            </div>
            <div className='linhaVertical'></div>
            <div className='painelDeControle'>
                <div className='armBackground'>
                  <img src={robotArm} />
                </div>
                <form className='formName'>
                  <label>
                    Insira o nome do Layout: <br />
                    <input type='text' className='insertName'/>
                  </label><br/>
                  <input type="submit" value="Salvar" className='saveName'/>
                </form>
                <div className='buttonsPainel'>
                    <form action='/iniciarmontagem'><button className='botaoPadrao'>Iniciar montagem</button></form>
                    <form action='/editarlayout'><button className='botaoPadrao'>Editar</button></form>
                    <form action='/descartarlayout'><button className='botaoDelete'>Descartar Layout</button></form>
                    <Voltar />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Montar