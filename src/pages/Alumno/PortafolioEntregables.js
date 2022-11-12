import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {  Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Administrador.css'
import useModal from '../../hooks/useModals';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import * as BsIcons from 'react-icons/bs';
import { useContext } from 'react';
import { UserContext } from '../../UserContext'
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
const url= "http://34.195.33.246/api/Especialidad/";
const urlFacu= "http://34.195.33.246/api/Facultad/";
/*
const url= "http://44.210.195.91/api/Especialidad/";
const urlFacu= "http://44.210.195.91/api/Facultad/";
*/
function PortafolioEntregables()  {

  let navigate = useNavigate();
  const location = useLocation();
  const {value,setValue} = useContext(UserContext);
    return (      
      <div class=" CONTAINERADMIN">   
  
        <p class="HEADER-TEXT1">Portafolio de Entregables </p>
        <br></br>
        <h3 class = "NOMB-ASESOR">Asesor Peter, Fortaleza Monserrat</h3>
        <br></br>
  
        <a class="BTN-CUADRADO" onClick={()=>{navigate("EntregablesParciales",{state:{idAlumno:localStorage.getItem('IDUSUARIO'),nombres:"Peter",apellidoPat:"Gonzales",apellidoMaterno: "Monserrat", idCurso: localStorage.getItem('idCurso'),idTipoEntregable: 1,nombreEntregable: "Avances Semanales"}})}}>Avances Semanales</a>
  
        <a class="BTN-CUADRADO"  onClick={()=>{navigate("EntregablesParciales",{state:{idAlumno:localStorage.getItem('IDUSUARIO'),nombres:"Peter",apellidoPat:"Gonzales",apellidoMaterno: "Monserrat", idCurso: localStorage.getItem('idCurso'),idTipoEntregable: 3,nombreEntregable: "Entregables"}})}}>Entregables</a>
  
        <a class="BTN-CUADRADO" onClick={()=>{navigate("EntregablesParciales",{state:{idAlumno:localStorage.getItem('IDUSUARIO'),nombres:"Peter",apellidoPat:"Gonzales",apellidoMaterno: "Monserrat", idCurso: localStorage.getItem('idCurso'), idTipoEntregable: 2,nombreEntregable: "Entregables Parciales"}})}}>Entregables Parciales</a>
  
        <a class="BTN-CUADRADO"  onClick={()=>{navigate("EntregablesParciales",{state:{idAlumno:localStorage.getItem('IDUSUARIO'),nombres:"Peter",apellidoPat:"Gonzales",apellidoMaterno: "Monserrat", idCurso: localStorage.getItem('idCurso'),idTipoEntregable: 4,nombreEntregable: "Exposiciones"}})}}>Exposiciones</a>
      
      </div>              
    )
  }
  
  export default PortafolioEntregables;