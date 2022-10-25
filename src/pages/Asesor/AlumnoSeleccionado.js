import React from 'react'
import './proponerTemaAsesor.css';
import {useState , useEffect} from "react";
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
function AlumnoSeleccionado(){
    let navigate = useNavigate();
    const location = useLocation();
    return(
        <div className='CONTAINERASESOR'>
        <h1 className='HEADER-TEXT1'>Portafolio de Entregables</h1>
        <h2 className='HEADER-TEXT2'>Alumno - { location.state.apellidoPat }  {location.state.apellidoMat}, {location.state.nombres}</h2>
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                <a class="navbar-brand HEADER-PORTAFOLIO1" type='button'>Avances Semanales</a>
                </div>
            </nav>
       </div>
       <br></br>
       <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                <a class="navbar-brand HEADER-PORTAFOLIO1" type='button' onClick={() =>navigate("entregables",{state:{idAlumno:location.state.idAlumno,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoMat}})}>Entregables</a>
                </div>
            </nav>
       </div>
       <br></br>
       <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                <a class="navbar-brand HEADER-PORTAFOLIO1 " type='button'>Entregables Parciales</a>
                </div>
            </nav>
       </div>
       <br></br>
        </div>
    );
}
export default  AlumnoSeleccionado;