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
import Exposiciones from "./pages/Profesor/Exposiciones";
import ExposicionSeleccionada from "./pages/Profesor/ExposicionSeleccionada";
import HistorialVersiones from "./pages/Asesor/HistorialVersiones";
import Calendario from './pages/Profesor/Calendario';
import SubirArchivos from './pages/Profesor/SubirArchivos';
function Profesor() {
    return (
    <div>    
            <SidebarProfesor/>    
            <BarraVolver/>
                <Routes>
                  <Route path='alumnos' exact element= {<Alumnos/>}/>
                  <Route path='alumnos/alumnoSeleccionado' exact element= {<AlumnoSeleccionado/>}/>
                  <Route path='calendario' exact element= {<Calendario/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables' exact element= {<Entregables/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales' exact element= {<EntregablesParciales/>}/>
                  <Route path='alumnos/alumnoSeleccionado/exposiciones' exact element= {<Exposiciones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/exposiciones/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/avancesSemanales/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/exposiciones/exposicionSeleccionada' exact element= {<ExposicionSeleccionada/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables/entregableSeleccionado' exact element= {<EntregableSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/entregableParcialSeleccionado' exact element= {<EntregableParcialSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/entregableParcialSeleccionado/SubirArchivos' exact element= {<SubirArchivos/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/entregableSeleccionado/SubirArchivos' exact element= {<SubirArchivos/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/avanceSemanalSeleccionado/SubirArchivos' exact element= {<SubirArchivos/>}/>
              </Routes>   
    </div>
    )
  }
  export default Profesor;