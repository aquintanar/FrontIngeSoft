import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import SidebarAlumno from './components/Alumno/SidebarAlumno';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';

function Alumno() {
    return (
        <div>    
              <SidebarAlumno/>
              <BarraVolver/>
        </div>
    )
  }
  
  export default Alumno;