import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import SidebarAlumno from './components/Alumno/SidebarAlumno';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import PortafolioEntregables from './pages/Alumno/PortafolioEntregables';
import EntregablesParciales from './pages/Alumno/EntregablesParciales';
import NotaAlumno  from './pages/Alumno/NotaAlumno';
import AvancesSemanales from './pages/Asesor/AvancesSemanales';
import EntregableParcialSeleccionado from './pages/Alumno/EntregableParcialSeleccionado';
function Alumno() {
    return (
        <div>    
            <SidebarAlumno/>
              <BarraVolver/>
              <Routes>
              <Route path='gestion/gesNota' exact element= {<NotaAlumno/>}/>

              <Route path='gestion/gesPortafolio' exact element= {<PortafolioEntregables/>}/>
              <Route path='gestion/gesPortafolio/AvancesSemanales' exact element= {<AvancesSemanales/>}/>
              <Route path='gestion/gesPortafolio/EntregablesParciales' exact element= {<EntregablesParciales/>}/>
              <Route path='gestion/gesPortafolio/EntregablesEvaluaciones' exact element= {<EntregablesParciales/>}/>
              <Route path='gestion/gesPortafolio/EntregablesParciales/entregableParcialSeleccionado' exact element= {<EntregableParcialSeleccionado/>}/>
              </Routes>
        </div>
    )
  }
  
  export default Alumno;