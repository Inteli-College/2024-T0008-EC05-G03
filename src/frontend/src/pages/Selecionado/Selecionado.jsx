import './Selecionado.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import robotArm from '../../assets/robot-arm.svg'
import ButtonsPainelSelecionado from '../../components/buttonsPainel/ButtonsPainelSelecionado/ButtonsPainelSelecionado';
import Modal from '../../components/modalSelecionado/modalSelecionado';

function Item({ nomeItem, quantidadeItem, onClick }) {
    const isPlaceholder = !nomeItem || nomeItem === "+";

    return (
        <div className='item' onClick={onClick}>
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

const Selecionado = () => {
    const [compartments, setCompartments] = useState([]);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const layoutId = queryParams.get('layout');

        if (layoutId) {
            axios.get(`${import.meta.env.VITE_BACKEND}/get_compartments/${layoutId}`, { headers: { "Content-Type": "application/json" } })
            .then(response => {
                const compartmentsWithPlaceholders = Array.from({ length: 8 }, (_, index) => ({
                    id: 'placeholder-' + (index + 1),
                    nome_item: "+",
                    quantidade_item: "",
                    numero_compartimento: index + 1
                }));
    
                response.data.forEach(item => {
                    compartmentsWithPlaceholders[item.numero_compartimento - 1] = item;
                });
    
                setCompartments(compartmentsWithPlaceholders);
            })
            .catch(error => {
                console.error('Error fetching compartments:', error);
                const placeholders = Array.from({ length: 8 }, (_, index) => ({
                    nome_item: "+",
                    quantidade_item: "",
                    numero_compartimento: index + 1,
                }));
                setCompartments(placeholders);
            });
        }
    }, [window.location.search]);

    const columnOneCompartments = compartments.filter(c => c.numero_compartimento % 2 !== 0);
    const columnTwoCompartments = compartments.filter(c => c.numero_compartimento % 2 === 0);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleItemClick = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
  

    return (
        <>
            <div className='pageContent'>
                <div className='infoContainer'>
                <div className='carrinho'>
                    <div className='carrinhoTitle1'></div>
                    <div className='backgroundCarrinho'>
                        <div className='itensColuna'>
                            <Item />
                            <Item />
                            <Item />
                            <Item />
                        </div>
                        <div className='itensColuna'>
                            <Item />
                            <Item />
                            <Item />
                            <Item />
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
                                onClick={handleItemClick}
                            />
                            ))}
                        </div>
                        <div className='itensColuna'>
                            {columnTwoCompartments.map(compartment => (
                            <Item
                                key={compartment.numero_compartimento}
                                nomeItem={compartment.nome_item}
                                quantidadeItem={compartment.quantidade_item ? compartment.quantidade_item + ' Unidades' : ''}
                                onClick={handleItemClick}
                            />
                            ))}
                        </div>
                    </div>
                    </div>
                    <div className='linhaVertical'></div>
                    <ButtonsPainelSelecionado />
                </div>
            </div>
            {isModalOpen && <Modal onClose={handleCloseModal} />}
        </>
    );
};

export default Selecionado;
