import './Selecionado.css'
import React from 'react'
import robotArm from '../../assets/robot-arm.svg'
import Voltar from '../../components/voltar.jsx'

function Item() {
    return (
        <div className='item'>
            <h3 className='itemTexto'>Nome do item</h3>
            <p className='itemTexto'>Quantidade do item</p>
        </div>
    )
}

function Selecionado() {
    return (
    <>
        <div className='pageContent'>
                <div className='infoContainer'>
                <div className='carrinho'>
                    <h2 className='carrinhoTitle'>GAVETA DE <br /> REABASTECIMENTO</h2>
                    <div className='backgroundCarrinho'>
                        <div className='itensColuna'>
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                        </div>
                        <div className='itensColuna'>
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                        </div>
                    </div>
                </div>
                <div className='carrinho'>
                    <h2 className='carrinhoTitle'>GAVETA DO CARRINHO <br /> EMERGENCIAL</h2>
                    <div className='backgroundCarrinho'>
                        <div className='itensColuna'>
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                        </div>
                        <div className='itensColuna'>
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                        </div>
                    </div>
                </div>
                <div className='linhaVertical'></div>
                <div className='painelDeControle'>
                    <div className='armBackground'>
                    <img src={robotArm} />
                    </div>
                    <select name="layoutPicker" id="layout">
                        <option disabled selected>Selecionar Layout</option>
                        <option value="layout1">Layout 1</option>
                        <option value="layout2">Layout 2</option>
                        <option value="layout3">Layout 3</option>
                        <option value="layout4">Layout 4</option>
                    </select>
                    <div className='buttonsPainel'>
                        <form action='/iniciarmontagem'><button className='botaoPadrao'>Iniciar montagem</button></form>
                        <form action='/editarlayout'><button className='botaoPadrao'>Editar</button></form>
                        <form action='/descartarlayout'><button className='botaoDelete'>Descartar Layout</button></form>
                        <Voltar />
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default Selecionado;