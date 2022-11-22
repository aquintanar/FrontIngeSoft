import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Administrador.css'
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

  const getAsesor = async() => {
    const urlAsesor  = 'https://localhost:7012/api/Asesor/ListAsesoresXAlumnoXCurso?idAlumno='+localStorage.getItem('IDUSUARIO')+'&idCurso='+localStorage.getItem('idCurso');
    const response = await fetch(urlAsesor);
    const data = await response.json();
    console.log(data);
    console.log(data[0].nombres);
    setAsesor(data);
}
   const [asesor, setAsesor]=useState([]);
  useEffect(()=>{
    getAsesor();
 },[])
    return (      
      <div class=" CONTAINERADMIN">
        <p class="HEADER-TEXT1">Portafolio de Entregables </p>
       <br></br>   
           {asesor.map(asesor => (
       
       <td>      
       <h3 class = "NOMB-ASESOR">Asesor {asesor.nombres}, {asesor.apePat} {asesor.apeMat}  </h3>
       <br></br></td>

              ))}

  
        <a class="BTN-CUADRADO" onClick={()=>{navigate("EntregablesParciales",{state:{idAlumno:localStorage.getItem('IDUSUARIO'),nombres:"Peter",apellidoPat:"Gonzales",apellidoMaterno: "Monserrat", idCurso: localStorage.getItem('idCurso'),idTipoEntregable: 1,nombreEntregable: "Avances Semanales"}})}}>Avances Semanales</a>
  
        <a class="BTN-CUADRADO"  onClick={()=>{navigate("EntregablesParciales",{state:{idAlumno:localStorage.getItem('IDUSUARIO'),nombres:"Peter",apellidoPat:"Gonzales",apellidoMaterno: "Monserrat", idCurso: localStorage.getItem('idCurso'),idTipoEntregable: 3,nombreEntregable: "Entregables"}})}}>Entregables</a>
  
        <a class="BTN-CUADRADO" onClick={()=>{navigate("EntregablesParciales",{state:{idAlumno:localStorage.getItem('IDUSUARIO'),nombres:"Peter",apellidoPat:"Gonzales",apellidoMaterno: "Monserrat", idCurso: localStorage.getItem('idCurso'), idTipoEntregable: 2,nombreEntregable: "Entregables Parciales"}})}}>Entregables Parciales</a>
  
        <a class="BTN-CUADRADO"  onClick={()=>{navigate("EntregablesParciales",{state:{idAlumno:localStorage.getItem('IDUSUARIO'),nombres:"Peter",apellidoPat:"Gonzales",apellidoMaterno: "Monserrat", idCurso: localStorage.getItem('idCurso'),idTipoEntregable: 4,nombreEntregable: "Exposiciones"}})}}>Exposiciones</a>
      
      </div>              
    )
  }
  
  export default PortafolioEntregables;