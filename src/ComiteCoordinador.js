import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import DatosCurso from "./pages/ComiteCoordinador/DatosCurso";
import SidebarComiteCoordinador from "./components/ComiteCoordinador.js/SidebarComiteCoordinador";
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import GestionarCurso from "./pages/ComiteCoordinador/gestionarCurso";

function ComiteCoordinador() {

    return (
        <div>
              <SidebarComiteCoordinador/>
              <Routes>
                <Route path='GestionarCurso' exact element= {<GestionarCurso/>}/>
                <Route path='GestionarCurso/DatosCurso' exact element= {<DatosCurso/>}/>        
              </Routes>
        </div>
    )
  }
  
  export default ComiteCoordinador;

  /* onClick={()=>{navigate("DatosCurso/")}} */
  /* <Route path='GestionarCurso/DatosCurso' exact element= {<DatosCurso/>}/>*/