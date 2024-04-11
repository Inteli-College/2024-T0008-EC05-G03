import React, { useState, useEffect } from 'react';
import ButtonsPainelSelecionar from '../../components/buttonsPainel/ButtonsPainelSelecionar/ButtonsPainelSelecionar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faFileExport } from '@fortawesome/free-solid-svg-icons'; 
import axios from 'axios';
import "./Selecionar.css"

// Função geral JSX para a página de Selecionar
function Selecionar() {
    const [layouts, setLayouts] = useState([]);
    const [showExportIcon, setShowExportIcon] = useState(false); 
    const [showEditIcon, setShowEditIcon] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND}/get_layouts`)
            .then(response => response.json())
            .then(data => setLayouts(data))
            .catch(error => console.error('Error fetching layouts:', error));
    }, []);

    // Função para lidar com o clique no botão de layout
    const handleButtonClick = async (layoutId) => {
        if (!showExportIcon && !showEditIcon) { 
            window.location.href = `/selecionado?layout=${layoutId}`;
        } else if (showExportIcon) {
            try {
                // Configurando a URL de download corretamente com o ID do layout
                const downloadUrl = `${import.meta.env.VITE_BACKEND}/download_compartment/${layoutId}`;
                
                // Realizando a solicitação GET para iniciar o download
                window.open(downloadUrl, '_blank');
            } catch (error) {
                console.error('Erro ao iniciar o download:', error);
            }
        }
    };

    
    return (
        <div className='pageContent'>
            <div className='layoutsContainer' style={{ overflowX: 'hidden',overflowY: 'hidden', maxHeight: 'calc(100vh - 200px)' }}>
                {layouts.map(layout => (
                    <button key={layout.id} className='layoutInfo botaoPersonalizado' onClick={() => handleButtonClick(layout.id)}
                        horario={layout.criado}>
                        {layout.nome_layout}
                        {showExportIcon && <FontAwesomeIcon icon={faFileExport} className='iconExport' />}
                        {showEditIcon && <FontAwesomeIcon icon={faPen} className='iconEdit'/>}
                    </button>
                ))}
            </div>
            <div className='linhaVertical'></div>
            <ButtonsPainelSelecionar
                onExportClick={() => setShowExportIcon(prevState => !prevState)}
                onEditClick={() => setShowEditIcon(prevState => !prevState)}
            />
        </div>
    );
}

export default Selecionar;
