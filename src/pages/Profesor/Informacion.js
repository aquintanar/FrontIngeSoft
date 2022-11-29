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


  const urlTema  = 'https://localhost:7012/api/TemaTesis/GetTemaTesisXIdCurso?idCurso='+localStorage.getItem('idCurso');
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
    <div class = "CONTAINERASESOR">
      <div class=" col-12">
        <h1>Temas de Tesis de este Curso:</h1>
        <table className='table fs-6 '>
          <thead class >
            <tr class>
                <th style={{width: 100}}>Titulo tema tesis</th>
                
            </tr>
          </thead>
          <tbody >
            {tema.map(dato => (
              <tr key={dato.idTemaTesis}>
      
                <td>
                  <button class="btn btn-lg navbar-toggle">{dato.tituloTesis}</button>
                </td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
  )
}

export default Informacion;