import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import SidebarAdmin from './components/Administrador/SidebarAdmin';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';

function Administrador() {
    return (
        <div>    
              <SidebarAdmin/>
        </div>
    )
  }
  
  export default Administrador;