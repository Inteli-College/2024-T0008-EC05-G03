import { useRef} from "react"; 
import {FaBars, FaTimes} from "react-icons/fa";
import "navbar.css";

function NavBar(){
    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <header>
            <h3>Logo</h3>
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
        </header>
    );
}

export default NavBar;