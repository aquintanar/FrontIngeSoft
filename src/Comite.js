import "bootstrap/dist/css/bootstrap.min.css";
import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import SidebarComite from './components/Comite/SidebarComite';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import  TemaSeleccionado from './pages/Comite/TemaSeleccionado';
import ListaTemaTesis from "./pages/Comite/ListaTemaTesis";
import DatosRubrica from "./pages/Comite/DatosRubrica";
import Entregable from "./pages/Comite/Entregable";
import  ListaEntregables from './pages/Comite/ListaEntregables';
import DatosEntregable from "./pages/Comite/DatosEntregable";
function Comite() {

    return (
        <div>    

              <SidebarComite/>
              <BarraVolver />

              <Routes>
                  <Route path='temaTesis' exact element= {<ListaTemaTesis/>}/>
                  <Route path='temaTesis/temaSeleccionado/:id' exact element= {<TemaSeleccionado/>}/>
                  <Route path='preparacion/entregables' exact element= {<ListaEntregables/>}/>
                  <Route path='preparacion/entregables/menu/:id' exact element= {<Entregable/>}/>
                  <Route path='preparacion/entregables/menu/:id/datosEntregable' exact element= {<DatosEntregable/>}/>
                  <Route path='preparacion/entregables/menu/:id/datosRubrica' exact element= {<DatosRubrica/>}/>
              </Routes>

        </div>
    )
  }
  
  export default Comite;