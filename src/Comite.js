import "bootstrap/dist/css/bootstrap.min.css";
import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import SidebarComite from './components/Comite/SidebarComite';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import  TemaSeleccionado from './pages/Comite/TemaSeleccionado';
import ListaTemaTesis from "./pages/Comite/ListaTemaTesis";
function Comite() {

    return (
        <div>    

              <SidebarComite/>
              <BarraVolver />

              <Routes>
                  <Route path='temaTesis' exact element= {<ListaTemaTesis/>}/>
                  <Route path='temaTesis/temaSeleccionado/:id' exact element= {<TemaSeleccionado/>}/>
              </Routes>

        </div>
    )
  }
  
  export default Comite;