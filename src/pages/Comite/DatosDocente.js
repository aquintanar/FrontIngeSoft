import React, {useEffect, useState} from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import '../../stylesheets/Comite.css'
import '../../stylesheets/General.css'
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as BsIcons from 'react-icons/bs';
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';

//http://34.195.33.246/api/
//http://34.195.33.246/
const urlAs= "http://34.195.33.246/api/Docente/";
const urlEsp= "http://34.195.33.246/api/Especialidad/";
let idCur = 0;
let idAs = 0;
let idEs = 0;

function DatosDocente() {
  let navigate = useNavigate();
  let {id} = useParams();
  const [especialidadAs, setespecialidadAs] =useState({
      idEspecialidad: 0,
      nombre: '',
      descripcion: '',
      idFacultad: 0,
      estado: false
  })
  const [asesorSeleccionado, setAsesorSeleccionado]=useState({
      idDocente: 0,
      nombres: '',
      apePat: '',
      apeMat: '',
      correo: '',
      codigoPucp: '',
      contrasena:'',
      imagen: '',
      contrasena: '',
      idEspecialidad: 0,
      nombre: '',
      descripcion: '',
      idFacultad: 0
  })

  const cargarAsesor=async()=>{
      if(id!=='0'){
        const response = await axios.get(urlAs+"GetDocenteXId?idDocente="+parseInt(id));
        setAsesorSeleccionado({
            idAlumno: response.data[0].idAlumno,
            nombres: response.data[0].nombres,
            apePat: response.data[0].apePat,
            apeMat: response.data[0].apeMat,
            correo: response.data[0].correo,
            codigoPucp: response.data[0].codigoPucp,
            contrasena: response.data[0].contrasena,
            imagen: response.data[0].imagen,
            idEspecialidad: response.data[0].idEspecialidad,
            nombre: response.data[0].nombre,
            descripcion: response.data[0].descripcion,
            idFacultad: response.data[0].idFacultad
        });
        idAs = parseInt(id);
        idCur = localStorage.getItem("idCurso")
        idEs = response.data[0].idEspecialidad
        cargarEspecialidad()
      }
  }

  const cargarEspecialidad=async()=>{
      console.log(idEs);
      await axios.get(urlEsp+"GetEspecialidadXId?idEspecialidad="+idEs)
      .then(response=>{
          setespecialidadAs(response.data);
          console.log(response.data);
      }).catch(error =>{
      console.log(error.message);
      })
  }
  useEffect(()=>{
      cargarAsesor();
  },[])


  return(
      <div class="CONTAINERCOMITE">
          <h1>{asesorSeleccionado.nombres + " " + asesorSeleccionado.apePat + " " +asesorSeleccionado.apeMat}</h1>
          <div className='row'>
              <div className='col-8 PERFIL'>
                  <div class='BLOCK PERFIL-HEADER fw-bold'>{asesorSeleccionado.correo} </div>
                  <div class='BLOCK' >
                        <div class = 'PERFIL-TITLE fw-bold'> Áreas de interés y especialización:
                            <div class = " PERFIL-SUBTITLE fw-normal text-black ms-3"> {asesorSeleccionado.nombre}</div>
                        </div>
                    </div>
              </div>
          </div>
          <div className='row INSERTAR-BOTONES'>
              <div className='col-8'>
                  <p> Evaluaciones: </p>
              </div>
          </div>

          <div class="row INSERTAR-BOTONES">                            
              <div class=" d-grid gap-2 d-md-flex justify-content-md-end">
              <button class="btn btn-primary fs-4 fw-bold CANCELAR" type="button" onClick={()=>{navigate("../docente")}}><span>Cancelar</span></button>
              </div>
          </div>
      </div>
  )
}

export default DatosDocente