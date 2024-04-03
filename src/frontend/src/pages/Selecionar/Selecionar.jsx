// import '../Selecionado/Selecionado.css'
import logoCompleta from '../../assets/logo_completa.svg'
import React from 'react';
import Voltar from '../../components/voltar/voltar.jsx';
// import ButtonsPainel from '../../components/buttonsPainel';
import ButtonsPainelSelecionado from '../../components/buttonsPainel/ButtonsPainelSelecionado/ButtonsPainelSelecionado';
import ButtonsPainelSelecionar from '../../components/buttonsPainel/ButtonsPainelSelecionar/ButtonsPainelSelecionar';

function Selecionar() { 
    return (
        <div className='pageContent'>
            <div className='layoutsContainer'>
                <form action="/get_layouts"><button className='layoutInfo botaoPersonalizado'></button>
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