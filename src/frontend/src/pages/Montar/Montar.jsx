import './Montar.css'
import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ModalProvider, useModal } from '../../components/modalAdicionar/modalContext.jsx';
import ButtonsPainelMontar from '../../components/buttonsPainel/ButtonsPainelMontar/ButtonsPainelMontar.jsx'
import ButtonsPainelSelecionado from '../../components/buttonsPainel/ButtonsPainelSelecionado/ButtonsPainelSelecionado';
import Modal from '../../components/modalSelecionado/modalSelecionado';
import ModifyModal from '../../components/modalSelecionado/modalUpdate';
import axios from 'axios';

// Função item JSX para a página de Montar
function Item({ nomeItem, quantidadeItem, onClick, deleteMode, onDelete, isRefill }) {
  const isPlaceholder = !nomeItem || nomeItem === "+";

  return (
      <div className='item' onClick={onClick} style={{ position: 'relative' }}>

          {deleteMode && (
              <button onClick={(e) => {
                  e.stopPropagation(); 
                  onDelete();

              }} style={{ position: 'absolute', top: 0, right: 0, background: 'transparent', border: 'none', marginRight: "5%", marginTop: "4%" }} className='delete-icon'>
                  <MdDelete size="1.5em" />
              </button>
          )}

          <div className={isPlaceholder ? 'placeholderVisible' : 'placeholderInvisible'}>
              +
          </div>
          {!isPlaceholder && (
              <>
                  <div className='nomeItem'>{nomeItem}</div>
                  <div className='quantidadeItem'>{quantidadeItem}</div>
              </>
          )}
      </div>
  );
}

// Função Montar JSX para a página de Montar
function Montar() {
    const [compartments, setCompartments] = useState([]);
    const [refillCompartments, setRefillCompartments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [selectedCompartment, setSelectedCompartment] = useState(null);
    const [isRefill, setIsRefill] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);


    const toggleDeleteMode = () => setDeleteMode(!deleteMode);
    
    const queryParams = new URLSearchParams(window.location.search);
    const layoutId = queryParams.get('layout');

    // Função para obter os compartimentos
    useEffect(() => {
        if (layoutId) {
            // Função para obter os compartimentos
            const fetchCompartments = axios.get(`${import.meta.env.VITE_BACKEND}/get_compartments/${layoutId}`, { headers: { "Content-Type": "application/json" } })
                .then(response => ({ success: true, data: response.data }))
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        return { success: false, data: [] };
                    }
                    throw error;
                });
    
                // Função para obter os compartimentos de recarga
            const fetchRefillCompartments = axios.get(`${import.meta.env.VITE_BACKEND}/get_refill_compartment/${layoutId}`, { headers: { "Content-Type": "application/json" } })
                .then(response => ({ success: true, data: response.data }))
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        return { success: false, data: [] };
                    }
                    throw error;
                });
    
            Promise.all([fetchCompartments, fetchRefillCompartments])
                .then(values => {
                    const [compartmentsResult, refillCompartmentsResult] = values;
    
                    // Função para integrar os compartimentos com os espaços vazios
                    const integrateWithPlaceholders = (data) => {
                        return Array.from({ length: 8 }, (_, index) => {
                            const numero_compartimento = index + 1;
                            const existingItem = data.find(item => item.numero_compartimento === numero_compartimento);
                            return existingItem || {
                                id: 'placeholder-' + numero_compartimento,
                                nome_item: "+",
                                quantidade_item: "",
                                numero_compartimento: numero_compartimento
                            };
                        });
                    };
    
                    setCompartments(integrateWithPlaceholders(compartmentsResult.data));
                    setRefillCompartments(integrateWithPlaceholders(refillCompartmentsResult.data));
                })
                .catch(error => {
                    console.error('Error processing data:', error);
                });
        }
    }, [layoutId]);
    
    const columnOneCompartments = compartments.filter(c => c.numero_compartimento % 2 !== 0);
    const columnTwoCompartments = compartments.filter(c => c.numero_compartimento % 2 === 0);

    const columnOneRefillCompartments = refillCompartments.filter(c => c.numero_compartimento % 2 !== 0);
    const columnTwoRefillCompartments = refillCompartments.filter(c => c.numero_compartimento % 2 === 0);


    // Função para lidar com o clique no item
    const handleItemClick = (compartment, isRefillContext) => {
        if (compartment.nome_item === "+") {
            setSelectedCompartment(compartment);
            setIsRefill(isRefillContext); 
            setIsModalOpen(true);
        } else {
            console.log(compartment)
            setSelectedCompartment(compartment)
            setIsRefill(isRefillContext);
            setIsModifyModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    // Função para deletar um item
    const handleDeleteItem = (compartmentId, isRefill) => {
        const endpoint = isRefill ? `/delete_refill_compartment/${compartmentId}` : `/delete_compartment/${compartmentId}`;

            axios.delete(`${import.meta.env.VITE_BACKEND}${endpoint}`, {
                headers: { "Content-Type": "application/json" }
            })
                .then(() => {
                    if (isRefill) {
                        setRefillCompartments(prev => prev.filter(item => item.id !== compartmentId));
                    } else {
                        setCompartments(prev => prev.filter(item => item.id !== compartmentId));
                    }
                window.location.reload()
                })
                .catch(error => {
                    console.error('Error deleting compartment:', error);
                });
            };

    return (
        <>
            <div className='pageContent'>
                <div className='infoContainer'>
                <div className='carrinho'>
                    <div className='carrinhoTitle1'></div>
                    <div className='backgroundCarrinho'>
                        <div className='itensColuna'>
                        {columnOneRefillCompartments.map(compartment => (
                            <Item
                            key={compartment.numero_compartimento}
                            nomeItem={compartment.nome_item}
                            quantidadeItem={compartment.quantidade_item ? compartment.quantidade_item + ' Unidades' : ''}
                            onClick={() => handleItemClick(compartment, true)}
                            onDelete={() => handleDeleteItem(compartment.id, true)} // Pass true for refill items
                            deleteMode={deleteMode}
                            isRefill={true}
                        />
                            ))}
                        </div>
                        <div className='itensColuna'>
                        {columnTwoRefillCompartments.map(compartment => (
                            <Item
                            key={compartment.numero_compartimento}
                            nomeItem={compartment.nome_item}
                            quantidadeItem={compartment.quantidade_item ? compartment.quantidade_item + ' Unidades' : ''}
                            onClick={() => handleItemClick(compartment, true)}
                            onDelete={() => handleDeleteItem(compartment.id, true)} // Pass true for refill items
                            deleteMode={deleteMode}
                            isRefill={true}
                        />
                            ))}
                        </div>
                    </div>
                </div>
                    <div className='carrinho'>
                        <div className='carrinhoTitle2'></div>
                        <div className='backgroundCarrinho'>
                        <div className='itensColuna'>
                            {columnOneCompartments.map(compartment => (
                            <Item
                            key={compartment.numero_compartimento}
                            nomeItem={compartment.nome_item}
                            quantidadeItem={compartment.quantidade_item ? compartment.quantidade_item + ' Unidades' : ''}
                            onClick={() => handleItemClick(compartment, false)}
                            onDelete={() => handleDeleteItem(compartment.id, false)} // Pass false for regular items
                            deleteMode={deleteMode}
                            isRefill={false}
                        />
                            ))}
                        </div>
                        <div className='itensColuna'>
                            {columnTwoCompartments.map(compartment => (
                              <Item
                              key={compartment.numero_compartimento}
                              nomeItem={compartment.nome_item}
                              quantidadeItem={compartment.quantidade_item ? compartment.quantidade_item + ' Unidades' : ''}
                              onClick={() => handleItemClick(compartment, false)}
                              onDelete={() => handleDeleteItem(compartment.id, false)} // Pass false for regular items
                              deleteMode={deleteMode}
                              isRefill={false}
                          />
                            ))}
                        </div>
                    </div>
                    </div>
                    <div className='linhaVertical'></div>
                    <ButtonsPainelMontar/>
                </div>
            </div>
        {isModalOpen && (
            <Modal
            onClose={() => setIsModalOpen(false)}
            layoutId={layoutId}
            compartmentNumber={selectedCompartment}
            isRefill={isRefill}
            />
        )}
        {isModifyModalOpen && (
        <ModifyModal
            onClose={() => setIsModifyModalOpen(false)}
            compartmentDetails={selectedCompartment}
            layoutId={layoutId}
            isRefill={isRefill}
        />
         )}
        </>
    );
};

export default Montar;
