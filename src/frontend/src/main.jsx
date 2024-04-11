import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Montar from './pages/Montar/Montar.jsx';
import Selecionado from './pages/Selecionado/Selecionado.jsx';
import ControleBR from './pages/ControleBR/ControleBR.jsx';
import Selecionar from './pages/Selecionar/Selecionar.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavBar from './components/navbar/navbar.jsx';
import RotaProtegida from './components/rotaProtegida/rotaProtegida.jsx';
import ControleRegistro from './pages/ControleRegistro/controleRegistro.jsx';

import Login from './pages/Login/Login.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';
import ModalAdicionar from './components/modalAdicionar/modalAdicionar.jsx';

// Criação do roteador com as rotas definidas
const router = createBrowserRouter([
  {
    path: '/',
    element: <RotaProtegida><ControleBR /></RotaProtegida>
  },
  // {
  //   path: '/add_layout',
  //   element: <RotaProtegida><ModalAdicionar /></RotaProtegida>
  // },
  {
    path: '/selecionado',
    element: <RotaProtegida><Selecionado /></RotaProtegida>
  },
  {
    path: '/selecionar',
    element: <RotaProtegida><Selecionar /></RotaProtegida>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/cadastro',
    element: <Cadastro />
  },
  {
    path: '/controle_registro',
    element: <RotaProtegida><ControleRegistro /></RotaProtegida>
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
