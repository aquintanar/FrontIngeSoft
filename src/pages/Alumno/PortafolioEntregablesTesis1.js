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
function PortafolioEntregablesTesis1()  {

  let navigate = useNavigate();
  const location = useLocation();
  const [cursos , SetCursos] = useState([]);
  const [tipoEntregables, setTipoEntregables]=useState([]);
  const [cursoAprobado , setcursoAprobado ] = useState([]);
const getTipoEntregables = async() => {



    const urlCurso  = 'https://localhost:7012/api/Curso/ListarCursosXIdAlumnoYNumTesis?idAlumno='+localStorage.getItem('IDUSUARIO')+'&numTesis=1';
    const responseCurso = await fetch(urlCurso);
    const dataCurso = await responseCurso.json();
    console.log(dataCurso);
    console.log(dataCurso[0].nombres);
    SetCursos(dataCurso);
  
    var i=0;
    for(i=0;i<dataCurso.length;i++){
      if(dataCurso[i].EstadoCurso=="Aprobado"){
        cursoAprobado[i] = dataCurso[i];
         }
    }
    setcursoAprobado(cursoAprobado);


    const urlAsesor  = 'https://localhost:7012/api/Asesor/ListAsesoresXAlumnoXCurso?idAlumno='+localStorage.getItem('IDUSUARIO')+'&idCurso='+cursoAprobado[0].idCurso;
    const response = await fetch(urlAsesor);
    const data = await response.json();
    console.log(data);
    console.log(data[0].nombres);
    setAsesor(data);

  SetCursos(dataCurso);
  const urlTipo  = 'https://localhost:7012/api/TipoEntregable/ListTipoEntregableXNumTesis?numTesis='+cursoAprobado[0].numTesis;
  const responseTipo = await fetch(urlTipo);
  const dataTipo = await responseTipo.json();
  console.log(dataTipo);
  setTipoEntregables(dataTipo);


}

   const [asesor, setAsesor]=useState([]);
  useEffect(()=>{
    getTipoEntregables();
 },[])
    return (      
      <div class=" CONTAINERADMIN">
            <span>
      <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
    </span>
        <p class="HEADER-TEXT1">Portafolio de Entregables </p>
       <br></br>   
           {asesor.map(asesor => (
       
       <td>      
       <h3 class = "NOMB-ASESOR">Asesor {asesor.nombres}, {asesor.apePat} {asesor.apeMat}  </h3>
       <br></br></td>

              ))}

  
{tipoEntregables.map(tipoEntregable => (
       
    
       <a class="BTN-CUADRADO" onClick={()=>{navigate("EntregablesParcialesTesis1",{state:{idAlumno:localStorage.getItem('IDUSUARIO'),nombres:"Peter",apellidoPat:"Gonzales",apellidoMaterno: "Monserrat", idCurso: cursoAprobado[0].idCurso,idTipoEntregable: tipoEntregable.idTipoEntregable,nombreEntregable: tipoEntregable.nombre}})}}>{tipoEntregable.nombre}</a>
   
      
 ))}

     
      
      </div>              
    )
  }
  
  export default PortafolioEntregablesTesis1;