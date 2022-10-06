import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import SidebarComite from './components/Comite/SidebarComite';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import { TemaSeleccionado } from './components/Comite/TemaSeleccionado';

function Comite() {
    return (
        <div>    

              <SidebarComite/>
              <BarraVolver/>
              <Routes>
                  <Route path='temaseleccionado' exact element= {<TemaSeleccionado/>}/>
              </Routes>
              
        </div>
    )
  }
  
  export default Comite;