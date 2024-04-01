import React from "react";
import Voltar from "../../voltar";
import './ButtonsPainelSelecionar.css';
import logoCompleta from '../../../assets/logo_completa.svg';

const ButtonsPainelSelecionar = () => {
    return (
    <div className='painelDeControleSelecionar'>
        <img src={logoCompleta} className='logoCompleta'/>
        <div className='buttonsPainelSelecionar'>
        <form action='/montar'><button className='botaoPadrao'></button></form>
        <form action='/editarlayout'><button className='botaoPadrao'></button></form>
        <form action='/importarlayout'><button className='botaoPadrao'></button></form>
        <form action='/exportarlayout'><button className='botaoPadrao'></button></form>
        <Voltar />
    </div>
    </div>
    );
}

export default ButtonsPainelSelecionar;