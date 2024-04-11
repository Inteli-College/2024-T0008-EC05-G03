import React, { useState } from "react";
import axios from 'axios';
import './Login.css';
import logo_completa from '../../assets/logo_completa.svg';

// Função geral JSX para a página de Login
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [error, setError] = useState(''); 

    // Função para lidar com o clique no botão de login
    const handleLoginClick = () => {
        setShowLoginForm(true);
    }

    // Função para lidar com o envio do formulário de login
    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        setError(''); 

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/login_user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                username: username,
                password: password
            }, { withCredentials: true }); 
            console.log(response.data.message);
             window.location.href = '/';
        } catch (error) {
            if (error.response) {
                
                setError(error.response.data.error);
            } else {
                setError('Error logging in.');
                console.log('Error logging in', error);
            }
        }
    }

    return (
        <>
            <div className="loginPageContent">
                <div className='loginMainContent'>
                    <img src={logo_completa} alt="Logo" className="logo" />

                    {showLoginForm ? (
                        <form className="loginForm" onSubmit={handleLoginFormSubmit}>
                            <input 
                                type="text"
                                placeholder="Usuário"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <input 
                                type="password"
                                placeholder="Senha"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <button type="submit" className='confirmLoginButton'>Login</button>
                            {error && <div className="error">{error}</div>}
                            <a href="/cadastro">Não tem uma conta? Clique aqui!</a>
                        </form>
                    ) : (
                        <div className="buttonContainer">
                            <button className="loginButton" onClick={handleLoginClick}>Login</button>
                            <form action="/Cadastro"><button className="signupButton">Criar conta</button></form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Login;
