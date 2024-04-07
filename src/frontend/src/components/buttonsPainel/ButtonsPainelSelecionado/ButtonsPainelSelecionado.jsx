import React, { useState, useEffect } from "react";
import axios from "axios";
import Voltar from "../../voltar/voltar.jsx";
import ConfirmModal from "../../modalDeleteLayout/modalDeleteLayout.jsx";
import './ButtonsPainelSelecionado.css';
import robotArm from '../../../assets/robot-arm.svg';

const ButtonsPainelSelecionado = () => {
    const [layouts, setLayouts] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND}/get_layouts`, { headers: { "Content-Type": "application/json" } } )            .then(response => {
                setLayouts(response.data); // Atualiza o estado com os layouts recebidos
            })
            .catch(error => {
                console.error('Erro ao buscar layouts:', error);
            });
    }, []);

    const handleChange = (event) => {
        const selectedLayout = event.target.value;
        // Atualizar a URL sem recarregar a página
        window.history.pushState({}, '', `?layout=${selectedLayout}`);

        window.location.reload();
    };

    // Modal confirmar delete layout
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [layoutId, setLayoutId] = useState('');

    useEffect(() => {
        
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('layout');
        if (id) {
          setLayoutId(id);
        }
      }, []);

    const handleOpenModal = (e) => {
      e.preventDefault(); 
      setIsModalOpen(true); 
    };
  
    const handleCancel = () => {
      setIsModalOpen(false); 
    };
  
    const handleConfirm = () => {
        

        axios.delete(`${import.meta.env.VITE_BACKEND}/delete_layout/${layoutId}`, { headers: { "Content-Type": "application/json" } })
          .then(response => {
            console.log(response.data);
            setIsModalOpen(false);
            window.location.reload();
            window.history.pushState({});
          })
          .catch(error => {
            console.error('There was an error!', error);
            
          });
      };
    
    return (
        <>
        <div className='painelDeControleSelecionado'>
            <div className='armBackgroundSelecionado'>
                <img src={robotArm} />
                    <select name="layoutPicker" id="layoutSelecionado" className='selecionar' onChange={handleChange} defaultValue="">
                        <option disabled value="">Selecionar Layout</option>
                        {layouts.map(layout => (
                            <option key={layout.id} value={layout.id}>{layout.nome_layout}</option>
                        ))}
                    </select>
                    <div className='buttonsPainelSelecionado'>
                <form action='/iniciarmontagem'><button className='botaoPadrao'></button></form>
                <form action="/editarlayout"><button className='botaoPadrao'></button></form>
                <form onSubmit={handleOpenModal}>
                    <button className='botaoDelete' type="submit"></button>
                </form>

                <ConfirmModal 
                    isOpen={isModalOpen}
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
                    <Voltar />
                </div>
            </div>
        </div>
    </>
    );
}

export default ButtonsPainelSelecionado;