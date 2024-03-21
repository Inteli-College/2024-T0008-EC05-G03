import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from 'react-router-dom';
import ControleBR from '../pages/ControleBR/ControleBR.jsx';
import Selecionar from "../pages/Selecionar/Selecionar.jsx";

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component = {ControleBR} path = "/" />
            <Route component = {Selecionar} path = "/selecionar" />
        </BrowserRouter>
    )
    };

ReactDOM.render(<ControleBR />, document.getElementById('root'));

export default Routes;