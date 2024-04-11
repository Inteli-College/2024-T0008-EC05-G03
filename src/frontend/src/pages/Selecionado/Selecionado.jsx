import './Selecionado.css'
import React from 'react'
import robotArm from '../../assets/robot-arm.svg'
import ButtonsPainelSelecionado from '../../components/buttonsPainel/ButtonsPainelSelecionado/ButtonsPainelSelecionado';

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
                <ButtonsPainelSelecionado />
            </div>
        </div>
    </>
    )
}
export default Selecionado;