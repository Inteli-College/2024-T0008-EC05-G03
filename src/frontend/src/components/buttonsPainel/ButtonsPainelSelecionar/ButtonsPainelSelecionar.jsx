import React, { useState, useRef } from "react";
import axios from 'axios';
import Voltar from "../../voltar/voltar.jsx";
import './ButtonsPainelSelecionar.css';
import logoCompleta from '../../../assets/logo_completa.svg';
import ModalAdicionar from "../../modalAdicionar/modalAdicionar.jsx";

const ButtonsPainelSelecionar = ({ onExportClick, onEditClick }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        handleUpload(event.target.files[0]);
    }

    const handleUpload = async (file) => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND}/upload_compartment`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.status === 201) {
                    alert('File uploaded successfully!');
                    window.location.reload();
                } else {
                    alert('Error uploading file');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Error uploading file');
            }
        } else {
            alert('Please select a file');
        }
    }

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const click = () => {
        setIsModalOpen(true);
    }

    return (
    <div className='painelDeControleSelecionar'>
        <img src={logoCompleta} className='logoCompleta'/>
        <div className='buttonsPainelSelecionar'>
        {isModalOpen && (
            <ModalAdicionar
            onClose={() => setIsModalOpen(false)}
            />
        )}
        <button className='botaoPadrao' onClick={click}>Adicionar Layout</button>
        <form action='/download_compartment/<int:id_layout>'>
            <button type='button' className='botaoPadrao' onClick={(event) => {
                event.preventDefault();
                onExportClick(prevState => !prevState);
            }}></button>
        </form>
        <button className='botaoPadrao' onClick={handleClick}>Importar Layout</button>
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
        />
        {/* <form action='/editarlayout'>
            <button type='button' className='botaoPadrao' onClick={(event) => {
                event.preventDefault();
                onEditClick(prevState => !prevState);
            }}></button>
        </form> */}
        <Voltar />
    </div>
    </div>
    );
}

export default ButtonsPainelSelecionar;
