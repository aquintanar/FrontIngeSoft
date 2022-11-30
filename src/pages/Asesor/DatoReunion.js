import React from 'react'
import './proponerTemaAsesor.css';
import {useState , useEffect, useContext} from "react";
import useModal from '../../hooks/useModals';
import {  Button, Collapse} from '@material-ui/core';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import * as BsIcons from 'react-icons/bs';
import '../../stylesheets/Asesor.css'
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as RiIcons  from "react-icons/ri";
import {ModalConfirmación, ModalPregunta} from '../../components/Modals';
import '../../stylesheets/Calendar.css'
import '../../stylesheets/DateTimePicker.css';
import '../../stylesheets/Clock.css';
import DateTimePicker from 'react-datetime-picker';
/*
import '../../stylesheets/Calendar.css'
import '../../stylesheets/DatePicker.css';
import DatePicker from "react-date-picker";
*/
import { AsesorContext } from './AsesorContext';


const url= "https://localhost:7012/api/ReunionAlumnoAsesor/";

var x =4;
function DatoReunion()  {
    const asesor = useContext(AsesorContext);
    let navigate = useNavigate();
    const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
    const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
    const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
    const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
    const [reunion, setReunion] = useState(asesor.reunion);
    var [fecha, setFecha] = useState(reunion.fechaHoraInicio);
    var [startTime,setStartTime] = useState();
    var [startDate,setStartDate] = useState();
    var [endTime,setEndTime] = useState();
    const [alumnos, setAlumnos] = useState(asesor.alumnos);
    const [reunion1, setReunion1] = useState({
        idReunionAlumnoAsesor: 0,
        idAlumno: 0,
        idAsesor: localStorage.getItem('IDUSUARIO') ,
        idCurso: parseInt(localStorage.getItem('idCurso')),
        nombre: '',
        descripcion: '',
        fechaHoraInicio: new Date(),
        fechaHoraFin: new Date(),
        estadoReunion: 4,
        cantParticipantes: 2,
        enlace: ''
    })

    //Controla cambio en combo box del alumno--
    const cambioSelectAlumno =e=>{
        setReunion(prevState => ({
            ...prevState,
            idAlumno: e.target.value
        }))
        console.log(reunion);
    }

    //Controla cambio en combo box del Estado de la reunion--
    const cambioSelectEstado =e=>{
        setReunion(prevState => ({
            ...prevState,
            estadoReunion: e.target.value
        }))
        console.log(reunion);
    }

    //Control cambio en inputs de titulo--
    const handleChange=e=>{
        const {name, value}=e.target;
            setReunion(prevState=>({
            ...prevState,
            [name]: value
        }))
        console.log(reunion);
    }

    const cargarReunion = () =>{
        setReunion(prevState => ({
            ...prevState,
            idAsesor: localStorage.getItem('IDUSUARIO'),
        }))
        if(asesor.tipo == 0){
            console.log("modificar registrar", asesor.tipo, asesor.reunion)
            setStartDate(new Date(reunion.fechaHoraInicio));
            console.log(startDate)
            console.log(reunion)
            console.log("fin modificar")
            //const response = await axios.get(url+"GetFacultadesById?id_facultad="+parseInt(id));
        }
        else{
            console.log("registrar", asesor.reunion)
            setStartDate(new Date());
            console.log("fin registrar", asesor.reunion)
        }

    }

    //Selección entre modificar o insertar
    const peticionSelecter =()=>{
        //console.log(startDate)
        reunion.fechaHoraInicio = startDate;
        reunion.fechaHoraFin = startDate;
        console.log(startDate)
        if(asesor.tipo == 1){     //1: registrar
            console.log("registrar")
            openPostModal();
        }
        else{                       //0: modificar
            console.log("modificar")
            console.log(reunion);
            openEditModal();  
        }
    }

    //Registrar reunion--
    const peticionPost=async()=>{
        console.log(reunion);
        await axios.post(url+ "InsertarReunion", reunion )       //cambiae
        .then(response=>{
            closePostModal();
            openGuardadoModal();
            console.log("Fin");
        }).catch(error =>{
          console.log(error.message);
        })
    }

    const cerrarPost=()=>{
        closeGuardadoModal();
        navigate("../reunion");
    }

    //Modificar reunion
    const peticionPut=async()=>{
        await axios.put(url+ "ModificarReunion", reunion )       //cambiae
        .then(response=>{
            closeEditModal();
            openEditadoModal();
        }).catch(error =>{
          console.log(error.message);
        })
    }

    const cerrarPut=()=>{
        closeEditadoModal();
        navigate("../reunion");
    }

    useEffect(()=>{
        //peticionGet();
        cargarReunion();
        console.log("inicio");
        console.log(fecha);
        console.log(startTime);
        console.log(asesor);
        console.log("fin");
    },[])

    return(
        <div class=" CONTAINERALUMNO"> 


            <h1>{asesor.tipo ? "Registrar reunión" : "Modificar reunión"}</h1>

            <div class="row">
                <div class="col-6 " >
                    <p>Alumno</p>
                    
                            <select select class="form-select Cursor" aria-label="Default select example" selected value = {reunion && reunion.idAlumno} onChange= {cambioSelectAlumno} >  
                                <option selected value = "0">Ninguno</option>
                                {alumnos.map(elemento=>(
                                    <option key={elemento.idAlumno} value={elemento.idAlumno}>{elemento.nombres} {elemento.apePat} {elemento.apeMat}</option>  
                                ))}
                            </select>
                    
                </div>

                <div class="col-3 " >
                    <p>Cantidad de participantes</p>
                    
                        <input type="number" min="2" class="form-control" name="cantParticipantes" placeholder="Cantidad de participantes" aria-label="cantParticipantes"  
                            onChange={handleChange} value={reunion && reunion.cantParticipantes}/>
                    
                </div>

                {asesor.tipo ? null : 
                <div class="col-3 " >
                    <p>Estado</p>
                    
                            <select select class="form-select Cursor" aria-label="Default select example" selected value = {reunion && reunion.estadoReunion} onChange= {cambioSelectEstado} >  
                                <option  value = {1}>Asistió</option>
                                <option value = {2}>Tardanza</option>
                                <option  value = {3}>No asistió</option>
                                <option  value = {4}>Pendiente</option>
                            </select>
                    
                </div>}


            </div>
            
            <div class="row">
                <div class="col-6" >
                    <p>Título de la reunión</p>
                    <div class="input-group mb-2 ">
                        <textarea class="form-control form-control2" name="nombre" placeholder="Título" aria-label="nombre"  
                            onChange={handleChange} value={reunion && reunion.nombre}/>
                    </div>
                </div>

                <div class="col-6 " >
                    <p>Enlace de la reunión</p>
                    
                        <textarea class="form-control form-control2" name="enlace" placeholder="Enlace" aria-label="enlace"  
                                onChange={handleChange} value={reunion && reunion.enlace}/>
                    
                </div>
            </div>

            <div class="row">
                <div class="col-6 " >
                    <p>Descripción de la reunión</p>
                        <textarea class="form-control form-control2" name="descripcion" placeholder="Descripción" aria-label="descripcion"  
                            onChange={handleChange} value={reunion && reunion.descripcion}/>
                </div>
            
                <div class="col-4 DATOS" >
                    <p>Fecha de la reunión</p>
                    <DateTimePicker onChange={setStartDate} value={startDate} />
                </div>

            </div>

            <div class="">                            
                <div class="INSERTAR-BOTONES">
                    <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>peticionSelecter()}><span>Guardar</span></button>
                    <button class="btn btn-primary fs-4 fw-bold   CANCELAR" type="button" onClick={()=>{navigate("../reunion")}}><span>Cancelar</span></button>
                </div>
            </div>


            <ModalPregunta
              isOpen={isOpenEditModal} 
              closeModal={closeEditModal}
              procedimiento = "modificar"
              objeto="la reunión"
              elemento={reunion && reunion.nombre}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionPut()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeEditModal}>Cancelar</Button>
              </div>
            </ModalPregunta>
                        
            <ModalPregunta
              isOpen={isOpenPostModal} 
              closeModal={closePostModal}
              procedimiento = "guardar"
              objeto="la reunión"
              elemento={reunion && reunion.nombre}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionPost()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closePostModal}>Cancelar</Button>
              </div>
            </ModalPregunta>

            <ModalConfirmación
              isOpen={isOpenEditadoModal} 
              closeModal={closeEditadoModal}
              procedimiento= "modificado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={()=>cerrarPut()}>Entendido</Button>
              </div>
            </ModalConfirmación>

            <ModalConfirmación
              isOpen={isOpenGuardadoModal} 
              closeModal={closeGuardadoModal}
              procedimiento= "guardado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={()=>cerrarPost()}>Entendido</Button>
              </div>
            </ModalConfirmación>

        </div> 
    )
}

export default DatoReunion;