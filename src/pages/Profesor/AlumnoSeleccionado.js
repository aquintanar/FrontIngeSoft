import React from 'react'
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import  "../Asesor/proponerTemaAsesor.css";
import * as ImIcons from 'react-icons/im';
function AlumnoSeleccionado(){
    let navigate = useNavigate();
    const location = useLocation();
    const link = "perfil/"+location.state.idAlumno;

    return(
        <div className='CONTAINERASESOR'>
        <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
        <h1 >Portafolio de Entregables</h1>
        <h1 >Dale click al alumno para asignarle un jurado:</h1>
        <h2 >Alumno - <Link to={link} className='HEADER-TEXT5'>{ location.state.apellidoPat } {location.state.apellidoMat}, {location.state.nombres}</Link></h2>
       <br></br>
       
        <h2 > <button onClick={() =>navigate("notas",{state:{idAlumno:location.state.idAlumno}})} className='HEADER-TEXT3'><ImIcons.ImFileText2 /> Ver Notas de Alumno</button></h2>
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
                <a  class="BTN-CUADRADO" type='button' onClick={() =>navigate("entregablesFinales",{state:{idAlumno:location.state.idAlumno,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoMat,idCurso: localStorage.getItem('idCurso')}})}>Entregables Finales</a>
                </div>
            </nav>
       </div>
    
        </div>
    );
}
export default  AlumnoSeleccionado;