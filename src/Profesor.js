import "bootstrap/dist/css/bootstrap.min.css";
import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import SidebarProfesor from './components/Profesor/SidebarProfesor';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import AlumnosAsesorados from './pages/Asesor/AlumnosAsesorados';
function Profesor() {
    return (
    <div>    
            <SidebarProfesor/>    
            <BarraVolver/>
                <Routes>
                  <Route path='alumnos' exact element= {<AlumnosAsesorados/>}/>
              </Routes>   
    </div>
    )
  }
  export default Profesor;