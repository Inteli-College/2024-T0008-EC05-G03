import React from "react";
import Voltar from "../../voltar/voltar.jsx";
import './ButtonsPainelMontar.css';
import robotArm from '../../../assets/robot-arm.svg';

// Função geral JSX para o componente ButtonsPainelMontar
const ButtonsPainelMontar = () => {
    return (
        <>
        <div className='painelDeControleMontar'>
        <div className='armBackground'>
          <img src={robotArm} />
        </div>
        <form className='formName' action="/add_layout">
          <label>
            Insira o nome do Layout: <br />
            <input type='text' className='insertName'/>
          </label><br/>
          <input type="submit" value="Salvar" className='saveName'/>
        </form>
        <div className='buttonsPainelMontar'>
            <form action='/iniciarmontagem'><button className='botaoPadrao'></button></form>
            <form action='/descartarlayout'><button className='botaoDelete'></button></form>
        <Voltar />
    </div>
        </div>
    </>
    );
}

export default ButtonsPainelMontar;