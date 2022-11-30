import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {  Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Alumno.css'
import useModal from '../../hooks/useModals';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import * as BsIcons from 'react-icons/bs';



function Informacion()  {

let navigate = useNavigate();
const getInformacion = async() => {


  const urlTema  = 'http://34.195.33.246/api/TemaTesis/GetTemaTesisXIdCursoXIdAlumno?idCurso='+localStorage.getItem('idCurso')+'&idAlumno='+localStorage.getItem('IDUSUARIO');
  const responseTema = await fetch(urlTema);
  const dataTema= await responseTema.json();
  console.log(dataTema);
  setTema(dataTema);


  const urlAsesor  = 'http://34.195.33.246/api/Asesor/ListAsesoresXAlumnoXCurso?idAlumno='+localStorage.getItem('IDUSUARIO')+'&idCurso='+localStorage.getItem('idCurso');
  const responseAsesor = await fetch(urlAsesor);
  const dataAsesor = await responseAsesor.json();
  console.log(dataAsesor);
  setAsesor(dataAsesor);
  const urlAlumno  = 'http://34.195.33.246/api/Alumno/GetAlumnoXId?idAlumno='+localStorage.getItem('IDUSUARIO');
  const responseAlumno  = await fetch(urlAlumno);
  const dataAlumno   = await responseAlumno  .json();
  console.log(dataAlumno);
  setAlumno(dataAlumno);
  const urlCurso  = 'http://34.195.33.246/api/Curso/BuscarCursoXId?idCurso='+localStorage.getItem('idCurso');
  const responseCurso  = await fetch(urlCurso);
  const dataCurso  = await responseCurso .json();
  console.log(dataCurso);
  setCurso(dataCurso);

  const urlDocente  = 'http://34.195.33.246/api/Docente/ListDocentesXIdCurso?idCurso='+localStorage.getItem('idCurso');
  const responseDocente  = await fetch(urlDocente);
  const dataDocente  = await responseDocente .json();
  console.log(dataDocente);
  setDocente(dataDocente);


}
 const [asesor, setAsesor]=useState([]);
 const [docente, setDocente]=useState([]);
 const [alumno, setAlumno]=useState([]);
 const [curso, setCurso]=useState([]);
 const [tema, setTema]=useState([]);
useEffect(()=>{
  getInformacion();
},[])
  return (      
    <div class=" CONTAINERALUMNO">   

        <p class="HEADER-TEXT1">Información General</p>

        <p class="HEADER-TEXT2-INF">Datos del Alumno</p>
        {alumno.map(alumno => (    
       <td>    
         <p class="HEADER-TEXT11">{alumno.nombres}  {alumno.apePat} {alumno.apeMat}</p>
         <p class="HEADER-TEXT11">{alumno.correo} </p>  
       <p class="HEADER-TEXT12"> <a href={alumno.linkCalendario}> Calendario del Alumno</a> </p>
      
       </td>
 ))}   

        <p class="HEADER-TEXT2-INF">Tema de Tesis</p>
        {tema.length>0?tema.map(tema => (    
       <td>      
       <p class="HEADER-TEXT11">{tema.tituloTesis}  </p></td>
       
       
 )):<p class="HEADER-TEXT11">Sin tema de tesis asignado  </p>
}          

        <p class="HEADER-TEXT2-INF">Asesor</p>

        {asesor.length>0?asesor.map(asesor => (    
       <td>      
       <p class="HEADER-TEXT11">{asesor.nombres}, {asesor.apePat} {asesor.apeMat}  </p>
       <p class="HEADER-TEXT11">{asesor.correo}  </p>
       </td>
       
       
 )):<p class="HEADER-TEXT11">Sin asesor asignado  </p>
}    



 

        <p class="HEADER-TEXT2-INF">Docente</p>
        {docente.length>0?asesor.map(docente => (    
       <td>      
       <p class="HEADER-TEXT11">{docente.nombres}, {docente.apePat} {docente.apeMat}  </p>
       <p class="HEADER-TEXT11">{docente.correo}  </p>
       </td>
       
       
 )):<p class="HEADER-TEXT11">Sin docente asignado  </p>
}    


        



    </div>              
  )
}

export default Informacion;