import React from 'react'
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import  "../Asesor/proponerTemaAsesor.css";
function AlumnoSeleccionado(){
    let navigate = useNavigate();
    const location = useLocation();
    const link = "perfil/"+location.state.idAlumno;
    return(
        <div className='CONTAINERASESOR'>
        <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
        <h1 className='HEADER-TEXT1'>Portafolio de Entregables</h1>
        <h2 className='HEADER-TEXT2'>Alumno - <Link to={link} className='HEADER-TEXT5'>{ location.state.apellidoPat } {location.state.apellidoMat}, {location.state.nombres}</Link></h2>
       <br></br>
       <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                <a class="BTN-CUADRADO" type='button' onClick={() =>navigate("entregables",{state:{idAlumno:location.state.idAlumno,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoMat,idCurso: localStorage.getItem('idCurso')}})}>Entregables</a>
                </div>
            </nav>
       </div>
       <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                <a  class="BTN-CUADRADO" type='button' onClick={() =>navigate("entregablesParciales",{state:{idAlumno:location.state.idAlumno,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoMat,idCurso: localStorage.getItem('idCurso')}})}>Entregables Parciales</a>
                </div>
            </nav>
       </div>
       <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                <a  class="BTN-CUADRADO" type='button' onClick={() =>navigate("exposiciones",{state:{idAlumno:location.state.idAlumno,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoMat,idCurso: localStorage.getItem('idCurso')}})}>Exposiciones</a>
                </div>
            </nav>
       </div>
        </div>
    );
}
export default  AlumnoSeleccionado;