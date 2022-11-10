import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import SidebarAlumno from './components/Alumno/SidebarAlumno';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import PortafolioEntregables from './pages/Alumno/PortafolioEntregables';
import EntregablesParciales from './pages/Alumno/EntregablesParciales';
import AvancesSemanales from './pages/Asesor/AvancesSemanales';
import EntregableParcialSeleccionado from './pages/Alumno/EntregableParcialSeleccionado';
import Informacion  from './pages/Alumno/Informacion';
import Reuniones  from './pages/Alumno/Reuniones';
import SubirArchivos  from './pages/Alumno/SubirArchivos';
import EvaluaAsesor  from './pages/Alumno/EvaluaAsesor';
import NotaAlumno  from './pages/Alumno/NotaAlumno';
import Calendario from './pages/Alumno/Calendario';
import Encuesta from './pages/Alumno/Encuesta';
function Alumno() {
    return (
        <div>    
            <SidebarAlumno/>
              <BarraVolver/>
              <Routes>
              
              <Route path='gestion/gesPortafolio' exact element= {<PortafolioEntregables/>}/>
              <Route path='gestion/gesPortafolio/AvancesSemanales' exact element= {<AvancesSemanales/>}/>
              <Route path='gestion/gesPortafolio/EntregablesParciales' exact element= {<EntregablesParciales/>}/>
              <Route path='gestion/gesPortafolio/EntregablesEvaluaciones' exact element= {<EntregablesParciales/>}/>
              <Route path='gestion/gesPortafolio/EntregablesParciales/entregableParcialSeleccionado' exact element= {<EntregableParcialSeleccionado/>}/>
              <Route path='gestion/gesPortafolio/EntregablesParciales/entregableParcialSeleccionado/SubirArchivos' exact element= {<SubirArchivos/>}/>
              <Route path='gestion/Reuniones' exact element= {<Reuniones/>}/>
              <Route path='gestion/gesNota' exact element= {<NotaAlumno/>}/>
              <Route path='gestion/Informacion' exact element= {<Informacion/>}/>
              <Route path='gestion/EvaluaAsesor' exact element= {<EvaluaAsesor/>}/>
              <Route path='calendario' exact element= {<Calendario/>}/>
              <Route path='encuesta' exact element = {<Encuesta/>}/>
              </Routes>
        </div>
    )
  }
  
  export default Alumno;