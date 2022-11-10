import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "./Pagina.css";
import DatosCurso from "./pages/ComiteCoordinador/DatosCurso";
import SideBarCurso from "./components/Cursos/SideBarCurso";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GestionarCurso from "./pages/ComiteCoordinador/gestionarCurso";
import MisCursos from "./pages/Cursos/MisCursos";
import MisCursosNoComite from './pages/Cursos/MisCursosNoComite'
function Cursos() {
  return (
    <div>
      <SideBarCurso/>
      <MisCursosNoComite/>
    </div>
  );
}

export default Cursos;

/* onClick={()=>{navigate("DatosCurso/")}} */
/* <Route path='GestionarCurso/DatosCurso' exact element= {<DatosCurso/>}/>*/
