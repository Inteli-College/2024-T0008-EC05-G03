import './Login.css';
import React, { useState } from "react";
import logo_completa from '../../assets/logo_completa.svg'

function Login() {

    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleLoginClick = () => {
        setShowLoginForm(true);
    }

    const handleLoginFormSubmit = (event) => {
        event.preventDefault(); //Faz o botão de confirmar login não redirecionar o usuário para a tela anterior
    }

    return (
        <>
            <div className="loginPageContent">
                <div className='loginMainContent'>
                    <img src={logo_completa} alt="Logo" className="logo"></img>

                    { showLoginForm ? ( 

                        //Botão de login apertado    
                        <form className="loginForm" onSubmit={handleLoginFormSubmit}>
                            <input type="text" placeholder="Usuário"></input>
                            <input type="password" placeholder="Senha"></input>
                            <button type="submit" className='confirmLoginButton'>Login</button>
                            <a href="http://localhost:5173/cadastro">Não tem uma conta? Clique aqui!</a>
                        </form>
                        
                    ) : (

                        //Botão de login não apertado
                        <div className="buttonContainer">
                            <button className="loginButton" onClick={handleLoginClick}>Login</button>
                            <button className="signupButton">Criar conta</button>
                        </div>
                        
                    )}

                </div>
            </div>
        </>
    )
}

export default Login;
