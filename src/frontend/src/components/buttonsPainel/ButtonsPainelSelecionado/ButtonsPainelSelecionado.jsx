import React, { useState, useEffect } from "react";
import axios from "axios";
import Voltar from "../../voltar/voltar.jsx";
import ConfirmModal from "../../modalDeleteLayout/modalDeleteLayout.jsx";
import ModalModo from "../../modalModo/modalModo.jsx";
import './ButtonsPainelSelecionado.css';
import robotArm from '../../../assets/robot-arm.svg';
const ButtonsPainelSelecionado = ({ toggleDeleteMode, deleteMode }) => {
    const [layouts, setLayouts] = useState([]);
    const [isModeSelectorOpen, setIsModeSelectorOpen] = useState(false);
    const [generatedJson, setGeneratedJson] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [layoutId, setLayoutId] = useState('');
    const [selectedLayoutName, setSelectedLayoutName] = useState('');
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND}/get_layouts`, { headers: { "Content-Type": "application/json" } })
            .then(response => {
                setLayouts(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar layouts:', error);
            });
    }, []);
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get('layout');
        if (id) {
            setLayoutId(id);
        }
    }, []);
    useEffect(() => {
        const selectedLayout = layouts.find(layout => layout.id === layoutId);
        if (selectedLayout) {
            setSelectedLayoutName(selectedLayout.nome_layout);
        }
    }, [layoutId, layouts]);
    const handleChange = (event) => {
        const selectedLayoutId = event.target.value;
        setLayoutId(selectedLayoutId);
        window.history.pushState({}, '', `?layout=${selectedLayoutId}`);
        window.location.reload();
    };
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
                setIsModalOpen(false);
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };
    const handleGeneratedJson = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const layoutId = queryParams.get('layout');
        if (layoutId) {
            try {
                const [compartmentsResponse, refillCompartmentsResponse] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_BACKEND}/get_compartments/${layoutId}`),
                    axios.get(`${import.meta.env.VITE_BACKEND}/get_refill_compartment/${layoutId}`)
                ]);
                const compartmentsJson = compartmentsResponse.data.reduce((acc, item) => {
                    acc[item.numero_compartimento] = { nome: item.nome_item, qtd: item.quantidade_item };
                    return acc;
                }, {});
                const refillCompartmentsJson = refillCompartmentsResponse.data.reduce((acc, item) => {
                    acc[item.numero_compartimento] = { nome: item.nome_item, qtd: item.quantidade_item };
                    return acc;
                }, {});
                const finalJson = {
                    layout: layoutId,
                    reabastecimento: refillCompartmentsJson,
                    gaveta: compartmentsJson
                };
                setGeneratedJson(finalJson);
                setIsModeSelectorOpen(true);
            } catch (error) {
                console.error("Error JSON generation", error);
            }
        }
    };
    const handleModeSelect = async (mode, json) => {
        if (!json) {
            console.error('JSON data is not set before sending the POST request.');
            return;
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND}/refill/${mode}`, json, {
                headers: { "Content-Type": "application/json" }
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error posting data with mode', mode, error);
        }
    };
    return (
        <>
            <div className='painelDeControleSelecionado'>
                <div className='armBackgroundSelecionado'>
                    <img src={robotArm} alt="Robot Arm" />
                    <select name="layoutPicker" id="layoutSelecionado" className='selecionar' onChange={handleChange} value={layoutId}>
                        <option disabled value="">Selecionar Layout</option>
                        {layouts.map(layout => (
                            <option key={layout.id} value={layout.id}>{layout.nome_layout}</option>
                        ))}
                    </select>
                    <div className='selectedLayoutName'>{selectedLayoutName}</div> {/* Exibindo o nome do layout selecionado */}
                    <div className='buttonsPainelSelecionado'>
                        <button className='botaoPadrao' onClick={handleGeneratedJson}>Iniciar Montagem</button>
                        <button className='botaoPadrao' onClick={toggleDeleteMode}>{deleteMode ? "Desabilitar deletar" : "Habilitar deletar"}</button>
                        <form onSubmit={handleOpenModal}>
                            <button className='botaoDelete' type="submit"></button>
                        </form>
                        <Voltar />
                    </div>
                </div>
            </div>
            {isModeSelectorOpen && (
                <ModalModo
                    onClose={() => setIsModeSelectorOpen(false)}
                    onModeSelect={handleModeSelect}
                    json={generatedJson}
                />
            )}
            <ConfirmModal
                isOpen={isModalOpen}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </>
    );
};
export default ButtonsPainelSelecionado;