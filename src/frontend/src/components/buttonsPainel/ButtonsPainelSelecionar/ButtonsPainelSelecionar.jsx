import React from "react";
import Voltar from "../../voltar/voltar.jsx";
import './ButtonsPainelSelecionar.css';
import logoCompleta from '../../../assets/logo_completa.svg';

const ButtonsPainelSelecionar = ({ onExportClick, onEditClick }) => {
    return (
    <div className='painelDeControleSelecionar'>
        <img src={logoCompleta} className='logoCompleta'/>
        <div className='buttonsPainelSelecionar'>
        <form action='/add_layout'><button className='botaoPadrao'></button></form>
        <form action='/download_compartment/<int:id_layout>'>
            <button type='button' className='botaoPadrao' onClick={(event) => {
                event.preventDefault();
                onExportClick(prevState => !prevState);
            }}></button>
        </form>
        <form action='/importarlayout'><button className='botaoPadrao'></button></form>
        <form action='/editarlayout'>
            <button type='button' className='botaoPadrao' onClick={(event) => {
                event.preventDefault();
                onEditClick(prevState => !prevState);
            }}></button>
        </form>
        <Voltar />
    </div>
    </div>
    );
}

export default ButtonsPainelSelecionar;