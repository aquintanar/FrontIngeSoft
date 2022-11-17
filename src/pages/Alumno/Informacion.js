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


  const urlTema  = 'https://localhost:7012/api/TemaTesis/GetTemaTesisXIdCursoXIdAlumno?idCurso='+localStorage.getItem('idCurso')+'&idAlumno='+localStorage.getItem('IDUSUARIO');
  const responseTema = await fetch(urlTema);
  const dataTema= await responseTema.json();
  console.log(dataTema);
  setTema(dataTema);


  const urlAsesor  = 'https://localhost:7012/api/Asesor/ListAsesoresXAlumnoXCurso?idAlumno='+localStorage.getItem('IDUSUARIO')+'&idCurso='+localStorage.getItem('idCurso');
  const responseAsesor = await fetch(urlAsesor);
  const dataAsesor = await responseAsesor.json();
  console.log(dataAsesor);
  setAsesor(dataAsesor);
  const urlAlumno  = 'https://localhost:7012/api/Alumno/GetAlumnoXId?idAlumno='+localStorage.getItem('IDUSUARIO');
  const responseAlumno  = await fetch(urlAlumno);
  const dataAlumno   = await responseAlumno  .json();
  console.log(dataAlumno);
  setAlumno(dataAlumno);
  const urlDocente  = 'https://localhost:7012/api/Curso/BuscarCursoXId?idCurso='+localStorage.getItem('idCurso');
  const responseDocente  = await fetch(urlDocente);
  const dataDocente  = await responseDocente .json();
  console.log(dataDocente);
  setDocente(dataDocente);


}
 const [asesor, setAsesor]=useState([]);
 const [docente, setDocente]=useState([]);
 const [alumno, setAlumno]=useState([]);
 const [tema, setTema]=useState([]);
useEffect(()=>{
  getInformacion();
},[])
  return (      
    <div class=" CONTAINERALUMNO">   

        <p class="HEADER-TEXT1">Información General</p>


        <p class="HEADER-TEXT2-INF">Curso actual</p>
        {docente.map(docente => (    
       <td>      
       <p class="HEADER-TEXT11"> {docente.anhoSemestre}-{docente.numSemestre}  {docente.nombre}  </p>
</td>
       
       
 ))}

        <p class="HEADER-TEXT2-INF">Tema de Tesis</p>
        {tema.map(tema => (    
       <td>      
       <p class="HEADER-TEXT11">{tema.tituloTesis}  </p></td>
       
       
 ))}          

        <p class="HEADER-TEXT2-INF">Asesor</p>

        {asesor.map(asesor => (    
       <td>      
       <p class="HEADER-TEXT11">{asesor.nombres}, {asesor.apePat} {asesor.apeMat}  </p>
       <p class="HEADER-TEXT11">{asesor.correo}  </p></td>
       
       
 ))}
        <p class="HEADER-TEXT2-INF">Docente</p>
        {docente.map(docente => (    
       <td>      
       <p class="HEADER-TEXT11"> {docente.nombresDocente}  {docente.apePatDocente} {docente.apeMatDocente}</p>
       <p class="HEADER-TEXT11">{docente.correoDocente}  </p>
</td>
       
       
 ))}
        

        <p class="HEADER-TEXT2-INF">Calendario del Alumno</p>
        {alumno.map(alumno => (    
       <td>      
       <p class="HEADER-TEXT11">{alumno.linkCalendario}  </p></td>
       
       
 ))}   
    </div>              
  )
}

export default Informacion;