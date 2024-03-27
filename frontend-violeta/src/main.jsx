import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Montar from './pages/Montar/Montar.jsx';
import Selecionado from './pages/Selecionado/Selecionado.jsx';
import ControleBR from './pages/ControleBR/ControleBR.jsx';
import Selecionar from './pages/Selecionar/Selecionar.jsx';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Modal from './components/modal/modal.jsx';
import NavBar from './components/navbar/navbar.jsx';

// Criação do roteador com as rotas definidas
const router = createBrowserRouter([
  {
    path: '/',
    element: <ControleBR />
  },
  {
    path: '/montar',
    element: <Montar />
  },
  {
    path: '/selecionado',
    element: <Selecionado />
  },
  {
    path: '/selecionar',
    element: <Selecionar />
  }
]);

// Renderização do aplicativo com o provedor de roteador
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </React.StrictMode>
);
