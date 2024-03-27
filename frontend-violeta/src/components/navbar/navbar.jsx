import { useRef} from "react"; 
import {FaBars, FaTimes} from "react-icons/fa";
import "./navbar.css";
import React from 'react';
import logoSimples from '../../assets/logo_simplificada.svg';

function NavBar(){
    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <header>
            <nav ref={navRef}>
                <a href="#">Home</a>
                <a href="#">Desligar robô</a>
                <a href="#">Registro de atividades</a>
                <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                    <FaTimes/>
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavBar}>
                <FaBars/>
            </button>
            <img className="logoSimples" src={logoSimples} alt="Logo do grupo Violeta"/>
        </header>
    );
}

export default NavBar;