import React, { useState } from "react";
import './Cadastro.css';
import axios from 'axios';

// Função geral JSX para a página de cadastro
function Cadastro(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showForm, setShowForm] = useState(true);

    // Função para lidar com o envio do formulário de cadastro
    const handleRegister = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Senhas não conferem');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/register_user', {
                username: username,
                password: password
            });

            setShowForm(false);
            setErrorMessage('');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);

            if (error.response) {
                setErrorMessage(error.response.data.error || 'An error occurred during registration.');
            } else {
                setErrorMessage('An error occurred during registration.');}
        }
    }
    
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
                        <form className="registerForm" onSubmit={handleRegister}>
                            <input type="text" placeholder="Insira o nome de usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input type="password" placeholder="Confirme sua senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <button type="submit" className="confirmButton">Confirmar</button>
                        </form>
                        {errorMessage && <div className="error">{errorMessage}</div>}
                        <a href="/login"><button className="cancelButton">Cancelar</button></a>
                    </div>
                ) : (
                    <div className='registerMainContent'>
                        <div className="postRegisterInstructions">Cadastro realizado com sucesso!</div>
                        <a href="/"><button className="confirmButton">Página inicial</button></a>
                    </div>
                )}
            </div>
        </>
    );
}
export default Cadastro;
