import React, {useEffect, useState} from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import '../../stylesheets/Comite.css'
import '../../stylesheets/General.css'
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';
/*
const urlAs= "http://34.195.33.246/api/Alumno/";
const urlEsp= "http://34.195.33.246/api/Especialidad/";
*/
const urlAs= "https://localhost:7012/api/Alumno/";
const urlEsp= "https://localhost:7012/api/Especialidad/";
const urlAse = "https://localhost:7012/api/Asesor/";
const urlJur = "https://localhost:7012/api/Jurado/";
let idCur = 0;
let idAs = 0;
let idEs = 0;

function DatosAlumno() {
  let navigate = useNavigate();
  let {id} = useParams();
  let idCursoGlobal = localStorage.getItem("idCurso");
  const [especialidadAs, setespecialidadAs] =useState({
      idEspecialidad: 0,
      nombre: '',
      descripcion: '',
      idFacultad: 0,
      estado: false
  })
  const [asesorSeleccionado, setAsesorSeleccionado]=useState({
      idAlumno: 0,
      linkCalendario: '',
      tieneTema: 0,
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
  const [asesor,setAsesor] = useState([]);
  const [jurados,setJurados] = useState([]);

  const cargarAlumno=async()=>{
      if(id!=='0'){
        const response = await axios.get(urlAs+"GetAlumnoXId?idAlumno="+parseInt(id));
        setAsesorSeleccionado({
            idAlumno: response.data[0].idAlumno,
            linkCalendario: response.data[0].linkCalendario,
            tieneTema: response.data[0].tieneTema,
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
          setespecialidadAs(response.data[0]);
          console.log(response.data);
      }).catch(error =>{
      console.log(error.message);
      })
  }
  const cargarAsesor=async()=>{
      console.log(idEs);
      await axios.get(urlAse+"ListAsesoresXAlumnoXCurso?idAlumno="+parseInt(id)+"&idCurso="+idCursoGlobal)
      .then(response=>{
          setAsesor(response.data);
      }).catch(error =>{
      console.log(error.message);
      })
  }
  const cargarJurados=async()=>{
      console.log(idEs);
      await axios.get(urlJur+"ListarJuradosXAlumno?idAlumno="+parseInt(id))
      .then(response=>{
        setJurados(response.data);
      }).catch(error =>{
      console.log(error.message);
      })
  }
  useEffect(()=>{
      cargarAlumno();
      cargarAsesor();
      cargarJurados();
  },[])


  return(
      <div class="CONTAINERCOMITE">
          <h1>{asesorSeleccionado.nombres + " " + asesorSeleccionado.apePat+ " " + asesorSeleccionado.apeMat}</h1>
          <div className='row'>
            <div className='col-6 PERFIL'>
                    <div class='BLOCK PERFIL-HEADER fw-bold'>{asesorSeleccionado.correo} </div>
                    <div class='BLOCK' >
                        <div class = 'PERFIL-TITLE fw-bold'> 	ALUMNO MATRIC:
                            <div class = " PERFIL-SUBTITLE fw-normal text-black ms-3"> {asesorSeleccionado.codigoPucp}</div>
                        </div>
                        <div class = 'PERFIL-TITLE fw-bold'> Áreas de interés y especialización:
                            <div class = " PERFIL-SUBTITLE fw-normal text-black ms-3"> {especialidadAs.nombre}</div>
                        </div>
                    </div>
              </div>
          </div>
          <div className='row mt-5'>
              <div className='col-12 PERFIL'>
                    <div class='BLOCK PERFIL-HEADER fw-bold'> Asesor y jurados asignados </div>
                    <div class='BLOCK' >
                        <div class = ' PERFIL-TITLE fw-bold'> Asesor:
                            {asesor.length ===0
                            ?<div class = " PERFIL-SUBTITLE fw-normal text-black ms-3"> No tiene asesor asignado</div>
                            :<div class = " PERFIL-SUBTITLE fw-normal text-black ms-3"> - {asesor[0].nombres + " " + asesor[0].apePat + " " + asesor[0].apeMat}</div>
                            }
                        </div>
                        <div class = ' PERFIL-TITLE fw-bold'> Jurados:
                            {jurados.length ===0
                            ?<div class = " PERFIL-SUBTITLE fw-normal text-black ms-3"> No tiene jurados asignados</div>
                            :<div>
                                {jurados.map(element => (
                                <div class = " PERFIL-SUBTITLE fw-normal text-black ms-3"> - {element.nombres + " "+ element.apePat+ " "+ element.apeMat}</div>
                            ))}
                            </div>
                            }
                        </div>
                    </div>
              </div>
          </div>
          
          <div class="row INSERTAR-BOTONES">                            
              <div class=" d-grid gap-2 d-md-flex justify-content-md-end">
              <button class="btn btn-primary fs-4 fw-bold CANCELAR" type="button" onClick={()=>{navigate("../alumno")}}><span>Cancelar</span></button>
              </div>
          </div>
      </div>
  )
}

export default DatosAlumno