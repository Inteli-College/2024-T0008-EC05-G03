import './Selecionado.css'
import React from 'react'
import robotArm from '../../assets/robot-arm.svg'
import Voltar from '../../components/voltar.jsx'

function Item() {
    return (
        <div className='item'>
            <div className='nomeItem'></div>
            <div className='quantidadeItem'></div>
        </div>
    )
}

function Selecionado() {
    return (
    <>
        <div className='pageContent'>
                <div className='infoContainer'>
                <div className='carrinho'>
                    <div className='carrinhoTitle1'></div>
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
                    <div className='carrinhoTitle2'></div>
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
                    <select name="layoutPicker" id="layout" className='selecionar'>
                        <option disabled selected>Selecionar Layout</option>
                        <option value="layout1">Layout 1</option>
                        <option value="layout2">Layout 2</option>
                        <option value="layout3">Layout 3</option>
                        <option value="layout4">Layout 4</option>
                    </select>
                    <div className='buttonsPainel'>
                        <form action='/iniciarmontagem'><button className='botaoPadrao'></button></form>
                        <form action='/editarlayout'><button className='botaoPadrao'></button></form>
                        <form action='/descartarlayout'><button className='botaoDelete'></button></form>
                        <Voltar />
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default Selecionado;