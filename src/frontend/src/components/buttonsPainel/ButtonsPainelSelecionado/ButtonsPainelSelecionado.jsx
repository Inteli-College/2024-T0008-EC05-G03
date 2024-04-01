import React from "react";
import Voltar from "../../voltar";
import './ButtonsPainelSelecionado.css';
import robotArm from '../../../assets/robot-arm.svg';

const ButtonsPainelSelecionado = () => {
    return (
        <>
        <div className='painelDeControleSelecionado'>
            <div className='armBackgroundSelecionado'>
                <img src={robotArm} />
                    <select name="layoutPicker" id="layoutSelecionado" className='selecionar'>
                        <option disabled selected>Selecionar Layout</option>
                        <option value="layout1">Layout 1</option>
                        <option value="layout2">Layout 2</option>
                        <option value="layout3">Layout 3</option>
                        <option value="layout4">Layout 4</option>
                    </select>
                    <div className='buttonsPainelSelecionado'>
                <form action='/iniciarmontagem'><button className='botaoPadrao'></button></form>
                <form action="/editarlayout"><button className='botaoPadrao'></button></form>
                <form action='/descartarlayout'><button className='botaoDelete'></button></form>
                    <Voltar />
                </div>
            </div>
        </div>
    </>
    );
}

export default ButtonsPainelSelecionado;