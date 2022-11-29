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
import DatosAlumno from "./pages/Profesor/DatosAlumno";
import AsignarJurado from "./pages/Profesor/AsignarJurado";
import  ListaEntregables from './pages/Comite/ListaEntregables';
import DatosEntregable from "./pages/Comite/DatosEntregable";
import Entregable from "./pages/Comite/Entregable";
import DatosRubrica from "./pages/Comite/DatosRubrica";
import EntregablesFinales from "./pages/Profesor/EntregablesFinales";
import EntregableFinalSeleccionado from './pages/Profesor/EntregableFinalSeleccionado';
import Informacion from './pages/Profesor/Informacion'
function Profesor() {
    return (
    <div>    
            <SidebarProfesor/>    
            <BarraVolver/>
                <Routes>
                  <Route path='Informacion' exact element= {<Informacion/>}/>
                  <Route path='alumnos' exact element= {<Alumnos/>}/>
                  <Route path='alumnos/alumnoSeleccionado' exact element= {<AlumnoSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/perfil/:id' exact element= {<DatosAlumno/>}/>
                  <Route path='alumnos/alumnoSeleccionado/asignarJurado/:id' exact element= {<AsignarJurado/>}/>
                  <Route path='calendario' exact element= {<Calendario/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables' exact element= {<Entregables/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales' exact element= {<EntregablesParciales/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesFinales' exact element= {<EntregablesFinales/>}/>
                  <Route path='alumnos/alumnoSeleccionado/exposiciones' exact element= {<Exposiciones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/exposiciones/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/avancesSemanales/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesFinales/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/exposiciones/exposicionSeleccionada' exact element= {<ExposicionSeleccionada/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesFinales/entregableFinalSeleccionado' exact element= {<EntregableFinalSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables/entregableSeleccionado' exact element= {<EntregableSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/entregableParcialSeleccionado' exact element= {<EntregableParcialSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/entregableParcialSeleccionado/subirArchivos' exact element= {<SubirArchivos/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables/entregableSeleccionado/subirArchivos' exact element= {<SubirArchivos/>}/>
                  <Route path='alumnos/alumnoSeleccionado/avancesSemanales/avanceSemanalSeleccionado/subirArchivos' exact element= {<SubirArchivos/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesFinales/entregableFinalSeleccionado/subirArchivos' exact element= {<SubirArchivos/>}/>
                  <Route path='entregables' exact element= {<ListaEntregables/>}/>
                  <Route path='entregables/menu/:id' exact element= {<Entregable/>}/>
                  <Route path='entregables/menu/:id/datosEntregable' exact element= {<DatosEntregable/>}/>
                  <Route path='entregables/menu/:id/datosRubrica' exact element= {<DatosRubrica/>}/>
              </Routes>   
    </div>
    )
  }
  export default Profesor;