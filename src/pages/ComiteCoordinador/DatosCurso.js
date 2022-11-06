import React, {useEffect, useState, useMemo} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import '../../stylesheets/Comite.css'
import {  Button} from '@material-ui/core';
import { ModalConfirmación,ModalPregunta } from '../../components/Modals';
import useModal from '../../hooks/useModals';
import axios from 'axios';

const urlEsp= "https://localhost:7012/api/Especialidad/";
const urlSem= "https://localhost:7012/api/Semestre/";
const urlFac= "https://localhost:7012/api/Facultad/";
const urlPost= "https://localhost:7012/api/Curso/"

var currentTime= new Date();
var year = currentTime.getFullYear();

function DatosCurso() {
  let navigate = useNavigate();
    const idFAC=0;
    const [esp, setEsp] = useState([]);
    const [sem, setSem] = useState([]);
    const [fac, setFac] = useState([]);
    const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
    const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
    const petitionEsp=async()=>{
        await axios.get(urlEsp+"GetEspecialidades/")
        .then(response=>{
        const filtradoEsp = response.data.filter((Especialidad)=>{
            for(let i in infoSemestre.esp){
              return Especialidad.nombre == infoSemestre.esp[i];
            }
        });
        setEsp(filtradoEsp);
        }).catch(error =>{
        console.log(error.message);
        })
    }
    let infoSemestre = JSON.parse(localStorage.getItem("infoEspecialidad"));
    const petitionSem=async()=>{
        await axios.get(urlSem+"GetSemestres/")
        .then(response=>{
        const filtradoSem = response.data.filter((Semestre)=>{
            for(let i in infoSemestre.sem){
              return Semestre.idSemestre == infoSemestre.sem[i];
            }
        });
        console.log(response);
        setSem(filtradoSem);
        }).catch(error =>{
        console.log(error.message);
        })
    }

    const petitionFac=async()=>{
        await axios.get(urlFac+"GetFacultades/")
        .then(response=>{
          const filtradoFac = response.data.filter((facultad)=>{
              for(let i in infoSemestre.fac){
                return facultad.nombre == infoSemestre.fac[i];
              }
          });
          setFac(filtradoFac);
        }).catch(error =>{
        console.log(error.message);
        })
    }

    const peticionPost=async()=>{
      await axios.post(urlPost+"PostCurso",cursoNuevo,{
          _method: 'POST'
      })
        .then(response=>{
        closePostModal();
        openGuardadoModal();
      }).catch(error =>{
      console.log(error.message);
      })
    }

    useEffect(()=>{
        petitionSem();
        petitionEsp();
        petitionFac();
    },[])

    const [cursoNuevo, setcursoNuevo]=useState({
        idCurso: 0,
        nombre: '',
        cant_alumnos: 0,
        cant_temas_propuestos: 0,
        activo: 1,
        idSemestre: '',
        idDocente: 1,
        idFacultad: 1,
        idEspecialidad: ''
    });

    const cambioSelectEsp =e=>{
        setcursoNuevo(prevState=>({
        ...prevState,
          idEspecialidad: e.target.value
        }))
        console.log(cursoNuevo);
        
      }

      const cambioSelectSem =e=>{
        setcursoNuevo(prevState=>({
        ...prevState,
        idSemestre: e.target.value
        }))
        petitionEsp(e.idFacultad);
        console.log(cursoNuevo);
        
      }

      const cambioSelectFac =e=>{
        setcursoNuevo(prevState=>({
        ...prevState,
        idFacultad: e.target.value
        }))
        console.log(cursoNuevo);
        
      }
      
      const cambioTitulo =e=>{
        setcursoNuevo(prevState=>({
        ...prevState,
        nombre: e.target.value
        }))
        console.log(cursoNuevo);
      }

      const cerrarPost=()=>{
        closeGuardadoModal();
      }

    return(
        <div class="CONTAINERADMIN">
            <div class="row">
                <p class="HEADER-TEXT1">Gestión de Curso</p>
                <p class="HEADER-TEXT2">Registro de Curso </p>
            </div>
            <div class="row DATOS">
                <div class="col-12" >
                <div class="  fs-5 fw-normal  mb-1 ">Nombre del curso</div>
                <input onChange={cambioTitulo} type='text' className="form-control" id="nombre" name="nombre"
                    style={{display: 'flex'}}/>
                </div>
            </div>
            <div class="row DATOS">
                <div class="col-4" >
                  <div class="  fs-5 fw-normal  mb-1 ">Seleccione Facultad</div>
                  {<select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelectFac} selected value = {cursoNuevo.idFacultad}>
                      <option selected value = "0">Todos</option>
                      {fac.map(elemento=>(
                        <option key={elemento.idFacultad} value={elemento.idFacultad}>{elemento.nombre}</option>  
                      ))} 
                      </select>}
                </div>
                <div class="col-4" >
                  <div class="  fs-5 fw-normal  mb-1 ">Seleccione Especialidad</div>
                  <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelectEsp} selected value = {cursoNuevo.idEspecialidad}>
                      <option selected value = "0">Todos</option>
                      {esp.map(elemento=>(
                        <option key={elemento.idEspecialidad} value={elemento.idEspecialidad}>{elemento.nombre}</option>  
                      ))} 
                  </select>
                </div>
                <div class="col-4" >
                  <div class="  fs-5 fw-normal  mb-1 ">Seleccione Semestre</div>
                  <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelectSem} selected value = {cursoNuevo.idSemestre}>
                      <option selected value = "0">Todos</option>
                      {sem.map(elemento=>(
                        <option key={elemento.idSemestre} value={elemento.idSemestre}>{elemento.nombre}</option>  
                      ))} 
                  </select>
                </div>
                
            </div>
            <ModalPregunta
              isOpen={isOpenPostModal} 
              closeModal={closePostModal}
              procedimiento = "guardar"
              objeto="curso de tesis "
              elemento={cursoNuevo && cursoNuevo.nombre}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionPost()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closePostModal}>Cancelar</Button>
              </div>
            </ModalPregunta>
            
            <ModalConfirmación
              isOpen={isOpenGuardadoModal} 
              closeModal={closeGuardadoModal}
              procedimiento= "guardado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={()=>cerrarPost()}>Entendido</Button>
              </div>
            </ModalConfirmación>
            
            <div class="row INSERTAR-BOTONES">                            
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary fs-4 fw-bold   CANCELAR" type="button" onClick={()=>{navigate("../GestionarCurso")}}><span>Cancelar</span></button>
                    <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>openPostModal()}><span>Guardar</span></button>
                </div>
            </div>
        </div>
    )
}

export default DatosCurso