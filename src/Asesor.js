import { BarraVolver } from './components/BarraVolver';
import React, { useState } from 'react';
import './Pagina.css'
import SidebarAsesor from './components/Asesor/SidebarAsesor';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import "./pages/Asesor/buttonGroup.css";
import TemaTesis from './pages/Asesor/TemaTesis';
import AlumnosAsesorados from './pages/Asesor/AlumnosAsesorados';
import AlumnoSeleccionado from './pages/Asesor/AlumnoSeleccionado';
import Entregables from './pages/Asesor/Entregables';
import EntregableSeleccionado from './pages/Asesor/EntregableSeleccionado';
import AvancesSemanales from './pages/Asesor/AvancesSemanales';
import AvanceSemanalSeleccionado from './pages/Asesor/AvanceSemanalSeleccionado';
import EntregableParcialSeleccionado from './pages/Asesor/EntregableParcialSeleccionado';
import EntregablesParciales from './pages/Asesor/EntregablesParciales';
import HistorialVersiones from './pages/Asesor/HistorialVersiones';
import Calendario from './pages/Asesor/Calendario';
import SubirArchivos from './pages/Asesor/SubirArchivos';
import ListaReunion from './pages/Asesor/ListaReunion';
import DatoReunion from './pages/Asesor/DatoReunion';
import ListaRecordatorio from './pages/Asesor/ListaRecordatorio';
import SolicitudesTema from './pages/Asesor/SolicitudesTema';
import ListarTemasTesis from './pages/Asesor/SearchComponent';
import ProponerTemaAsesor from './pages/Asesor/proponerTemaAsesor';

function Asesor() {
    return (
        <div>   
            <SidebarAsesor/>            
                <BarraVolver/>
                <Routes>
                  <Route path='temaTesis' exact element= {<ListarTemasTesis/>}/>
                  <Route path='temaTesis/agregarTema/:id' exact element= {<ProponerTemaAsesor/>}/>
                  <Route path='alumnos' exact element= {<AlumnosAsesorados/>}/>
                  <Route path='calendario' exact element= {<Calendario/>}/>
                  <Route path='alumnos/alumnoSeleccionado' exact element= {<AlumnoSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables' exact element= {<Entregables/>}/>
                  <Route path='alumnos/alumnoSeleccionado/avancesSemanales' exact element= {<AvancesSemanales/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales' exact element= {<EntregablesParciales/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/avancesSemanales/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables/entregableSeleccionado' exact element= {<EntregableSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/avancesSemanales/avanceSemanalSeleccionado' exact element= {<AvanceSemanalSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/entregableParcialSeleccionado' exact element= {<EntregableParcialSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/entregableParcialSeleccionado/subirArchivos' exact element= {<SubirArchivos/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables/entregableSeleccionado/subirArchivos' exact element= {<SubirArchivos/>}/>
                  <Route path='alumnos/alumnoSeleccionado/avancesSemanales/avanceSemanalSeleccionado/subirArchivos' exact element= {<SubirArchivos/>}/>
                  <Route path='reunion' exact element= {<ListaReunion/>}/>
                  <Route path='reunion/datoReunion/:id' exact element= {<DatoReunion/>}/>
                  <Route path='recordatorio' exact element={<ListaRecordatorio/>}/>
                  <Route path='recordatorio' exact element={<ListaRecordatorio/>}/>
                  <Route path='temaTesis/agregarTema/:id/solicitudes' exact element={<SolicitudesTema/>}/>
              </Routes>
        </div>
    )
  }
  
export default Asesor;