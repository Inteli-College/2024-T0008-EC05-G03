import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Montar from './pages/Montar/Montar.jsx';
import Selecionado from './pages/Selecionado/Selecionado.jsx';
import ControleBR from './pages/ControleBR/ControleBR.jsx';
import Selecionar from './pages/Selecionar/Selecionar.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavBar from './components/navbar/navbar.jsx';

import Login from './pages/Login/Login.jsx';
import Cadastro from './pages/Cadastro/Cadastro.jsx';

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
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/cadastro',
    element: <Cadastro />
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
