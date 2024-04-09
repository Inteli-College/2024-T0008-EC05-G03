import React, { useRef } from "react"; 
import axios from "axios";
import {FaBars, FaTimes} from "react-icons/fa";
import "./navbar.css";
import logoSimples from '../../assets/logo_simplificada.svg';

function NavBar() {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/logout_user', {}, { withCredentials: true });
            
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header>
                <img className="logoSimples" src={logoSimples} alt="Logo do grupo Violeta"/>
                <div className="buttonsHeader">
                    <a href="/">Página Inicial</a>
                    <a href="#">Desligar robô</a>
                    <a href="#">Registro de atividades</a>
                </div>
                <button className="nav-btn" onClick={handleLogout}>Logout</button>
        </header>
    );
}

export default NavBar;
