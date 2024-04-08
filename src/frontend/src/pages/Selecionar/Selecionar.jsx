import React, { useState, useEffect } from 'react';
import ButtonsPainelSelecionar from '../../components/buttonsPainel/ButtonsPainelSelecionar/ButtonsPainelSelecionar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';

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

    const handleButtonClick = (layoutId) => {

        window.location.href = `/selecionado?layout=${layoutId}`;
    }

    return (
        <div className='pageContent'>
            <div className='layoutsContainer'>
                    {layouts.map(layout => (
                        <button key={layout.id} className='layoutInfo botaoPersonalizado' onClick={() => handleButtonClick(layout.id)}>
                            {layout.nome_layout}
                            {showExportIcon && <FontAwesomeIcon icon={faFileExport} />}
                            {showEditIcon && <FontAwesomeIcon icon={faPen} />}
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
