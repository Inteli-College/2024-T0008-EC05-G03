import './Montar.css'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ModalProvider, useModal } from '../../components/modalAdicionar/modalContext.jsx';
import ModalAdicionar from '../../components/modalAdicionar/modalAdicionar.jsx';
import ButtonsPainelMontar from '../../components/buttonsPainel/ButtonsPainelMontar/ButtonsPainelMontar.jsx'
import axios from 'axios';

function BotaoAdd() {
  const { openModal } = useModal(); // Use a função openModal do contexto
  return (
    <button className='botaoAdd' onClick={openModal}>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  )
}

function Montar() {
  const [compartmentData, setCompartmentData] = useState([]);

  useEffect(() => {
    fetchCompartmentData();
  }, []);

  const fetchCompartmentData = () => {
    axios.get('/get_all_compartments_medication')
      .then(response => {
        if (Array.isArray(response.data)) {
          setCompartmentData(response.data);
        } else {
          setCompartmentData([response.data]);
        }
      })
      .catch(error => {
        console.error('Error fetching compartment data: ', error);
      });
  };

  // Criar um array de tamanho 16 para renderizar os botões de adição
  const renderAddButtons = () => {
    const addButtons = [];
    for (let i = 0; i < 4; i++) {
      addButtons.push(<BotaoAdd key={i} />);
    }
    return addButtons;
  };

  return (
    <ModalProvider> {/* Envolver a árvore de componentes com o ModalProvider */}
      <div className='pageContent'>
        <div className='infoContainer'>
          <div className='carrinho'>
            <div className='carrinhoTitle1'></div>
            <div className='backgroundCarrinho'>
              <div className='itensColuna'>
                {renderAddButtons()}
              </div>
              <div className='itensColuna1'>
                {renderAddButtons()}
              </div>
            </div>
          </div>
          <div className='carrinho'>
            <div className='carrinhoTitle2'></div>
            <div className='backgroundCarrinho'>
              <div className='itensColuna'>
                {renderAddButtons()}
              </div>
              <div className='itensColuna1'>
                {renderAddButtons()}
              </div>
            </div>
          </div>
          <div className='linhaVertical'></div>
          <ButtonsPainelMontar />
        </div>
        <ModalAdicionar /> {/* Renderize o modal */}
      </div>
    </ModalProvider>
  );
}

export default Montar;
