import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import { TemaSeleccionado } from './components/Comite/TemaSeleccionado';
function App() {
  return (
    <Router>
            <Sidebar />
            <Routes>
                <Route path='/temaseleccionado' exact element= {<TemaSeleccionado/>} />

            </Routes>
            <BarraVolver />
    </Router>
  )
}

export default App;
