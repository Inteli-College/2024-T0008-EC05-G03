// import '../Selecionado/Selecionado.css'
import logoCompleta from '../../assets/logo_completa.svg'
import React from 'react';
import Voltar from '../../components/voltar';

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
            <div className='painelDeControle'>
                <img src={logoCompleta} className='logoCompleta'/>
                <div className='buttonsPainel'>
                    <form action='/montar'><button className='botaoPadrao botaoNovoLayout'></button></form>
                    <form action='/exportarlayout'><button className='botaoPadrao botaoExportarLayout'></button></form>
                    <form action='/importarlayout'><button className='botaoPadrao botaoImportarLayout'></button></form>
                    <form action='/editarlayout'><button className='botaoPadrao botaoEditarLayout'></button></form>
                    <Voltar />
                </div>
            </div>
        </div>
    )
}

export default Selecionar;