import '../Selecionado/Selecionado.css'
import logoCompleta from '../../assets/logo_completa.svg'
import React from 'react';

function Selecionar() {
    return (
        <div className='pageContent'>
            <div className='layoutsContainer'>
                <button className='layoutInfo'>
                    Layout X <br />
                    Data de criação: 20/03/2024 <br />
                    Itens: xxxxxx, xxxxxxx, xxxxxx
                </button>
                <button className='layoutInfo'>
                    Layout X <br />
                    Data de criação: 20/03/2024 <br />
                    Itens: xxxxxx, xxxxxxx, xxxxxx
                </button>
                <button className='layoutInfo'>
                    Layout X <br />
                    Data de criação: 20/03/2024 <br />
                    Itens: xxxxxx, xxxxxxx, xxxxxx
                </button>
                <button className='layoutInfo'>
                    Layout X <br />
                    Data de criação: 20/03/2024 <br />
                    Itens: xxxxxx, xxxxxxx, xxxxxx
                </button>
            </div>
            <div className='linhaVertical'></div>
            <div className='painelDeControle'>
                <img src={logoCompleta} className='logoCompleta'/>
                <div className='buttonsPainel'>
                    <form action='/novolayout'><button className='botaoPadrao'>Novo Layout</button></form>
                    <form action='/exportarlayout'><button className='botaoPadrao'>Exportar Layout</button></form>
                    <form action='/importarlayout'><button className='botaoPadrao'>Importar Layout</button></form>
                    <form action='/editarlayout'><button className='botaoPadrao'>Editar</button></form>
                </div>
            </div>
        </div>
    )
}

export default Selecionar;