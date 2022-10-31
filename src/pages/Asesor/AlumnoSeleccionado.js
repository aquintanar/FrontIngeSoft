import React from 'react'
import './proponerTemaAsesor.css';
import {useState , useEffect} from "react";
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import * as RiIcons  from "react-icons/ri";
function AlumnoSeleccionado(){
    let navigate = useNavigate();
    const location = useLocation();
    return(
        <div className='CONTAINERASESOR'>
            <span>
                <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
            </span>
            <h1 className='HEADER-TEXT1'>Portafolio de Entregables</h1>
            <h2 className='HEADER-TEXT2'>Alumno - { location.state.apellidoPat }  {location.state.apellidoMat}, {location.state.nombres}</h2>
            
            <a class="BTN-CUADRADO" onClick={() =>navigate("avancesSemanales",{state:{idAlumno:location.state.idAlumno,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoMat}})}>Avances Semanales</a>

            <a class="BTN-CUADRADO" onClick={() =>navigate("entregables",{state:{idAlumno:location.state.idAlumno,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoMat}})}>Entregables</a>

            <a class="BTN-CUADRADO" onClick={() =>navigate("entregablesParciales",{state:{idAlumno:location.state.idAlumno,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoMat}})}>Entregables Parciales</a>

        </div>
    );
}
export default  AlumnoSeleccionado;