import "bootstrap/dist/css/bootstrap.min.css";
import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import SidebarJurado from './components/Jurado/SidebarJurado';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import Entregables from './pages/Profesor/Entregables';

function Jurado() {
    return (
    <div>    
            <SidebarJurado/>    
            <BarraVolver/>
                <Routes>
                  
                  <Route path='entregables' exact element= {<Entregables/>}/>

              </Routes>   
    </div>
    )
  }
  export default Jurado;