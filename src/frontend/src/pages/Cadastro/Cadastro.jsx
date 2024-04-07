import React, { useState } from "react";
import './Cadastro.css';

function Cadastro(){
    const [showForm, setShowForm] = useState(true);

    const handleConfirmClick = () => {
        setShowForm(false);
    };

    return (
        <>
            <div className="registerPageContent">
                    {showForm ? (
                        <div className='registerMainContent'>
                            <div className="registerInstructions">
                                Preencha os campos abaixo para realizar o seu cadastro:
                            </div>
                            <form className="registerForm">
                                <input type="text" placeholder="Insira o nome de usuário"></input>
                                <input type="password" placeholder="Senha"></input>
                                <input type="password" placeholder="Confirme sua senha"></input>
                                <button className="confirmButton" onClick={handleConfirmClick}>Confirmar</button>
                                <form action="/login"><button className="cancelButton">Cancelar</button></form>
                            </form>
                        </div>
                    ) : (
                        <div className='registerMainContent'>
                            <div className="postRegisterInstructions">Cadastro realizado com sucesso!</div>
                            <form action="/"><button className="confirmButton">Página inicial</button></form>
                        </div>
                    )}
            </div>
        </>
    )
}

export default Cadastro;
