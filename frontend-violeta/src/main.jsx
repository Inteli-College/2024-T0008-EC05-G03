import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Montar from './pages/Montar/Montar.jsx'
import Selecionado from './pages/Selecionado/Selecionado.jsx'
import ControleBR from './pages/ControleBR/ControleBR.jsx'
import Selecionar from './pages/Selecionar/Selecionar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Montar />
  </React.StrictMode>,
)
