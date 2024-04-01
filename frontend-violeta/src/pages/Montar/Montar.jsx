import './Montar.css'
import React from 'react'
import robotArm from '../../assets/robot-arm.svg'
import Voltar from '../../components/voltar.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ButtonsPainelMontar from '../../components/ButtonsPainel/ButtonsPainelMontar.jsx'


function BotaoAdd() {
  return (
    <button className='botaoAdd'>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  )
}

function Montar() {
  return (
      <div className='pageContent'>
            <div className='infoContainer'>
              <div className='carrinho'>
                <div className='carrinhoTitle1'></div>
                <div className='backgroundCarrinho'>
                  <div className='itensColuna'>
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  </div>
                  <div className='itensColuna1'>
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  </div>
                </div>
              </div>
              <div className='carrinho'>
                <div className='carrinhoTitle2'></div>
                <div className='backgroundCarrinho'>
                  <div className='itensColuna'>
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  </div>
                  <div className='itensColuna1'>
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  <BotaoAdd />
                  </div>
                </div>
            </div>
            <div className='linhaVertical'></div>
            <ButtonsPainelMontar />
        </div>
    </div>
  )
}

export default Montar