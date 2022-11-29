import "bootstrap/dist/css/bootstrap.min.css";
import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import SidebarJurado from './components/Jurado/SidebarJurado';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import  Entregables from './pages/Jurado/Entregables';
import Alumnos from './pages/Jurado/Alumnos'
import EntregableSeleccionado from './pages/Jurado/EntregableSeleccionado'
function Jurado() {
    return (
    <div>    
            <SidebarJurado/>    
            <BarraVolver/>
                <Routes>             
                  <Route path='alumnos' exact element= {<Alumnos/>}/>
                  <Route path='alumnos/entregables' exact element= {<Entregables/>}/>
                  <Route path='alumnos/entregables/entregableSeleccionado' exact element= {<EntregableSeleccionado/>}/>
                </Routes>   
    </div>
    )
  }
  export default Jurado;