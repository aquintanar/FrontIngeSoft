import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import SidebarAlumno from './components/Alumno/SidebarAlumno';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import PortafolioEntregables from './pages/Alumno/PortafolioEntregables';
import EntregablesParciales from './pages/Alumno/EntregablesParciales';
import NotaAlumno  from './pages/Alumno/NotaAlumno';
function Alumno() {
    return (
        <div>    
              <SidebarAlumno/>
              <BarraVolver/>
              <Routes>
              <Route path='gestion/gesNota' exact element= {<NotaAlumno/>}/>

              <Route path='gestion/gesPortafolio' exact element= {<PortafolioEntregables/>}/>
              <Route path='gestion/gesPortafolio/EntregablesParciales' exact element= {<EntregablesParciales/>}/>
              </Routes>
        </div>
    )
  }
  
  export default Alumno;