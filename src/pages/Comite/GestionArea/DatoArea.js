import React from 'react'
import {useState , useEffect} from "react";
import useModal from '../../../hooks/useModals';
import { Button } from '@material-ui/core';
import {  useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import '../../../stylesheets/Alumno.css'
import '../../../stylesheets/Comite.css'
import {ModalConfirmación, ModalPregunta} from '../../../components/Modals';

const url = "https://localhost:7012/api/"
// const url = "http://34.195.33.246/api/"

const urlArea= url + "Area/";
const urlFacultad= url + "Facultad/";
const urlEspecialidad= url + "Especialidad/";

function DatoArea()  {

    let navigate = useNavigate();
    let {id} = useParams();
    const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
    const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
    const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
    const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
    const [subTitulo,setSubtitulo] = useState("Registrar área");
    const infoEspecialidad = JSON.parse(localStorage.getItem('infoEspecialidad'))

    const [facultad, setFacultad] = useState({
        idFacultad: 0,
        nombreF: ''
    })

    const [especialidad, setEspecialidad] = useState({
        idEspecialidad: 0,
        nombreE: ''
    })

    const [areaSeleccionada, setAreaSeleccionada]=useState({
        idArea: 0,
        idEspecialidad: infoEspecialidad.numEsp,
        nombre: '',
    })

    
    const handleChange=e=>{                     //Control cambio en inputs--
        const {name, value}=e.target;
        setAreaSeleccionada(prevState=>({
            ...prevState,
            [name]: value
        }))
        console.log(areaSeleccionada);
    }
 
    const peticionSelecter =()=>{               //Selección entre modificar o insertar
        if(id==='0')    openPostModal();
        else            openEditModal();  
    }

    const peticionPost=async()=>{               //Insertar área
        await axios.post(urlArea+"PostArea",areaSeleccionada)
        .then(response=>{
            closePostModal();
            openGuardadoModal();
        }).catch(error =>{
            console.log(error.message);
        })
    }

    const cerrarPost=()=>{                      //Cierra modal de registro
        closeGuardadoModal();
        navigate("../areas");
    }

    const peticionPut=async()=>{                //Modificar área--
        await axios.put(urlArea+"ModifyArea", areaSeleccionada)
        .then(response=>{
            closeEditModal();
            openEditadoModal();
        }).catch(error =>{
            console.log(error.message);
        })
    }

    const cerrarPut=()=>{                       //Cierra modal de modificación
        closeEditadoModal();
        navigate("../areas");
    }
                                              
    const peticionGetFacultad=async()=>{        // FACULTAD  del usuario      
        await axios.get(urlFacultad+ "GetFacultadesById?id_facultad="+infoEspecialidad.numFac)       
        .then(response=>{
            if(response.data.length !== 0){
                setFacultad({
                    idFacultad: response.data[0].idFacultad,
                    nombreF: response.data[0].nombre,
                })
            }
        }).catch(error =>{
            console.log(error.message);
        })
    }
                                              
    const peticionGetEspecialidad=async()=>{    // ESPECIALIDAD del usuario   
        await axios.get(urlEspecialidad+ "GetEspecialidadXId?idEspecialidad="+infoEspecialidad.numEsp)       
        .then(response=>{
            if(response.data.length !== 0){
                setEspecialidad({
                    idEspecialidad: response.data[0].idEspecialidad,
                    nombreE: response.data[0].nombre,
                })
            }
        }).catch(error =>{
            console.log(error.message);
        })
    }

    const cargarArea=async()=>{                 //Carga el área si es para modificar
        console.log("id", parseInt(id))
        if(parseInt(id) > 0){
            setSubtitulo("Modificar área") 
            
            await axios.get(urlArea + "GetAreaXidArea?idArea="+parseInt(id))       
            .then(response=>{
                console.log(response.data[0])
                setAreaSeleccionada({
                    idArea: response.data[0].idArea,
                    nombre: response.data[0].nombre,
                    idEspecialidad: response.data[0].idEspecialidad,
                })
                setFacultad({
                    idFacultad: response.data[0].idFacultad,
                    nombreF: response.data[0].facultad,
                })
                setEspecialidad({
                    idEspecialidad: response.data[0].idEspecialidad,
                    nombreE: response.data[0].especialidad,
                })
            }).catch(error =>{
                console.log(error.message);
            })
        }
        else{
            peticionGetFacultad();
            peticionGetEspecialidad();
        }
    }

    useEffect(()=>{
        console.log("idddddddddddddddddddddddddddddd", parseInt(id))
        cargarArea();
    },[])

    return (
        <div class=" CONTAINERADMIN">
            <p class="HEADER-TEXT1">{subTitulo}</p>

            <div class="row">
                    <div class="col-4 FILTRO-LISTAR" >
                        <p>Facultad</p>
                        <select select class="form-select Cursor"  selected value = {facultad.idFacultad} disabled="true" >
                            <option key={facultad.idFacultad} value={facultad.idFacultad}>{facultad.nombreF}</option>  
                        </select>
                    </div>
                    <div class="col-4 FILTRO-LISTAR" >
                        <p>Especialidad</p>
                        <select select class="form-select Cursor"  selected value = {especialidad.idEspecialidad} disabled="true" >
                            <option key={especialidad.idEspecialidad} value={especialidad.idEspecialidad}>{especialidad.nombreE}</option>  
                        </select>
                    </div>
            </div>

            <div class = "DATOS">
                    <div class = "col-8">
                        <div class="text-start fs-5 fw-normal "><p>Nombre del área</p></div>
                        <div class="input-group mb-3 ">
                            <input  type="text" class="form-control" name="nombre" placeholder="Nombre del área" 
                            onChange={handleChange} value={areaSeleccionada && areaSeleccionada.nombre} />
                        </div>
                    </div>
            </div>

            <div class="row INSERTAR-BOTONES">                            
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>peticionSelecter()}><span>Guardar</span></button>
                        <button class="btn btn-primary fs-4 fw-bold CANCELAR" type="button" onClick={()=>{navigate("../areas")}}><span>Cancelar</span></button>
                    </div>
            </div>

            <ModalPregunta      isOpen={isOpenPostModal}        closeModal={closePostModal}         procedimiento = "guardar"   
                                objeto = "el área"              elemento = {areaSeleccionada && areaSeleccionada.nombre}        >
                    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                            <Button class="btn  btn-success btn-lg" onClick = { ()=> peticionPost() } >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button class="btn btn-danger btn-lg"   onClick = {closePostModal}>Cancelar</Button>
                    </div>
            </ModalPregunta>

            <ModalConfirmación  isOpen={isOpenGuardadoModal}    closeModal={closeGuardadoModal}     procedimiento = "guardado"  >
                    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                            <Button class="btn btn-success btn-lg" onClick = { ()=> cerrarPost() }>Entendido</Button>
                    </div>
            </ModalConfirmación>

            <ModalPregunta      isOpen={isOpenEditModal}        closeModal={closeEditModal}         procedimiento = "modificar"     
                                objeto = "el área"              elemento = {areaSeleccionada && areaSeleccionada.nombre}        >
                    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                            <Button class="btn  btn-success btn-lg" onClick = { ()=> peticionPut() } >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button class="btn btn-danger btn-lg"  onClick = {closeEditModal}>Cancelar</Button>
                    </div>
            </ModalPregunta>

            <ModalConfirmación  isOpen={isOpenEditadoModal}     closeModal={closeEditadoModal}      procedimiento = "modificado">
                    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                            <Button class="btn btn-success btn-lg" onClick = { ()=> cerrarPut() }>Entendido</Button>
                    </div>
            </ModalConfirmación>

        </div>
    )
}

export default DatoArea