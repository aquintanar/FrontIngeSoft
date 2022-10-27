import "bootstrap/dist/css/bootstrap.min.css";
import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import SidebarProfesor from './components/Profesor/SidebarProfesor';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import Alumnos from './pages/Profesor/Alumnos';
import AlumnoSeleccionado from './pages/Profesor/AlumnoSeleccionado';
import Entregables from './pages/Profesor/Entregables';
import EntregableSeleccionado from './pages/Profesor/EntregableSeleccionado';
import EntregableParcialSeleccionado from './pages/Profesor/EntregableParcialSeleccionado';
import EntregablesParciales from './pages/Profesor/EntregablesParciales';
function Profesor() {
    return (
    <div>    
            <SidebarProfesor/>    
            <BarraVolver/>
                <Routes>
                  <Route path='alumnos' exact element= {<Alumnos/>}/>
                  <Route path='alumnos/alumnoSeleccionado' exact element= {<AlumnoSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables' exact element= {<Entregables/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales' exact element= {<EntregablesParciales/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables/entregableSeleccionado' exact element= {<EntregableSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/entregableParcialSeleccionado' exact element= {<EntregableParcialSeleccionado/>}/>
              </Routes>   
    </div>
    )
  }
  export default Profesor;