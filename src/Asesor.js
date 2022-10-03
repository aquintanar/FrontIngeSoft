import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import SidebarAsesor from './components/Asesor/SidebarAsesor';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';

function Asesor() {
    return (
        <div>    
              <SidebarAsesor/>
              <BarraVolver/>
        </div>
    )
  }
  
  export default Asesor;