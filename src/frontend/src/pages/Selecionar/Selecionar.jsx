// import '../Selecionado/Selecionado.css'
import logoCompleta from '../../assets/logo_completa.svg'
import React from 'react';
import Voltar from '../../components/voltar';
import ButtonsPainel from '../../components/ButtonsPainel/ButtonsPainelSelecionar/ButtonsPainelSelecionar';
import ButtonsPainelSelecionado from '../../components/ButtonsPainel/ButtonsPainelSelecionado/ButtonsPainelSelecionado';
import ButtonsPainelSelecionar from '../../components/ButtonsPainel/ButtonsPainelSelecionar/ButtonsPainelSelecionar';

function Selecionar() {
    return (
        <div className='pageContent'>
            <div className='layoutsContainer'>
                <form action="/selecionado"><button className='layoutInfo botaoPersonalizado'></button>
                <button className='layoutInfo botaoPersonalizado'></button>
                <button className='layoutInfo botaoPersonalizado'></button>
                <button className='layoutInfo botaoPersonalizado'></button>
                <button className='layoutInfo botaoPersonalizado'></button>
                </form>
            </div>
            <div className='linhaVertical'></div>
            <ButtonsPainelSelecionar />
        </div>
    )
}

export default Selecionar;