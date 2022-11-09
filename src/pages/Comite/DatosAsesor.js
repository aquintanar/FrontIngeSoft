import React, {useEffect, useState} from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import '../../stylesheets/Comite.css'
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as BsIcons from 'react-icons/bs';
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';

const urlAs= "https://localhost:7012/api/Asesor/";
const urlEsp= "https://localhost:7012/api/Especialidad/";
const urlAsXCurso="https://localhost:7012/api/AsesorXCurso/";
let idCur = 0;
let idAs = 0;
let idEs = 0;

function DatosAsesor() {
    let navigate = useNavigate();
    let {id} = useParams();    
    const [max, setMax] = useState(0);
    const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
    const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
    const [isOpenRegistro, openRegistroModal ,closeRegistroModal ] = useModal();
    const [isOpenRegistroConf, openRegistroConfModal ,closeRegistroConfModal ] = useModal();
    const [asesorXcurso, setAsesorXCurso] =useState({
        idCurso: 0,
        idAsesor: 0,
        activo: 0,
        cantAlumnos: 0
    })
    const [especialidadAs, setespecialidadAs] =useState({
        idEspecialidad: 0,
        nombre: 0,
        descripcion: 0,
        idFacultad: 0,
        estado: false
    })
    const [asesorSeleccionado, setAsesorSeleccionado]=useState({
        idUsuario: 0,
        fidEspecialidad: 0,
        nombres: '',
        apePat: '',
        apeMat: '',
        correo: '',
        codigoPUCP: '',
        contrasena:'',
        imagen: '',
        maxAsesorados: 0,
        estaObservado: 0,
        cantAsesorados: 0
    })

    const cargarAsesor=async()=>{
        if(id!=='0'){
          const response = await axios.get(urlAs+"GetAsesorXId?idAsesor="+parseInt(id));
          setAsesorSeleccionado({
            idUsuario: parseInt(id),
            fidEspecialidad: 1,
            nombres: response.data[0].nombres,
            apePat: response.data[0].apePat,
            correo: response.data[0].correo,
            codigoPUCP: 0,
            imagen: response.data[0].imagen,
            contrasena: response.data[0].contrasena,
            maxAsesorados: response.data[0].maxAsesorados,
            estaObservado: response.data[0].estaObservado,
            cantAsesorados: response.data[0].cantAsesorados
            
          });
          idAs = parseInt(id);
          idCur = localStorage.getItem("idCurso")
          idEs = response.data[0].idEspecialidad
          setMax(
            response.data[0].maxAsesorados
          )
          getTemaAsesorXCurso()
          cargarEspecialidad()
        }
    }

    const cargarEspecialidad=async()=>{
        await axios.get(urlEsp+"GetEspecialidadXId?idEspecialidad="+idEs)
        .then(response=>{
            setespecialidadAs(response.data[0]);
        }).catch(error =>{
        console.log(error.message);
        })
    }

    const getTemaAsesorXCurso=async()=>{
        await axios.get(urlAsXCurso+"BuscarAsesorXCurso?idAsesor="+idAs+ "&idCurso="+idCur)
      .then(response=>{
        setAsesorXCurso(response.data[0])
        console.log(response.data);
      }).catch(error =>{
        console.log(error.message);
      })
    }

    const peticionPost=async()=>{
        await axios.get(urlAsXCurso+"PostAsesorXCurso?idAsesor="+idAs+ "&idCurso="+idCur,{
            _method: 'POST'
          })
      .then(response=>{
        console.log(response.data);
        closeRegistroModal();
        openRegistroConfModal();
      }).catch(error =>{
        console.log(error.message);
      })
    }

    const cambioMax =e=>{
        setMax(e.target.value)
    }

    const peticionPut=async()=>{
        await axios.put(urlAs+"/ModifyAsesor",asesorSeleccionado)
        .then(response=>{
          closeEditModal();
          openEditadoModal();
        }).catch(error =>{
          console.log(error.message);
        })
      }
      const cerrarPut=()=>{
        closeEditadoModal();
      }
      const cerrarPost=()=>{
        closeRegistroConfModal();
      }
    useEffect(()=>{
        cargarAsesor();
    },[])

    

    return(
        <div class="CONTAINERADMIN">
            <p className="HEADER-TEXT1">{asesorSeleccionado.nombres + " " + asesorSeleccionado.apePat}</p>
            <div className='row'>
                <div className='col-4'>
                    <p> {asesorSeleccionado.imagen} </p>
                </div>
                <div className='col-8'>
                    <p> {asesorSeleccionado.correo} </p>
                    <p> Áreas de interes y especialización </p>
                    <p> {especialidadAs.nombre} </p>
                </div>
            </div>
            <div className='row INSERTAR-BOTONES'>
                <div className='col-4'>
                    <p> Cantidad maxima asesorados:</p> <input onChange={cambioMax} type="number" id="maxAsesorados" name="maxAsesorados"
                    min="0" max="10" value={max}/>
                    <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>openEditModal()}><span>Guardar</span></button>
                </div>
                <div className='col-8'>
                    <p> Evaluaciones: </p>
                </div>
            </div>

            <div class="row INSERTAR-BOTONES">                            
                <div class="col-6 d-grid gap-2 d-md-flex justify-content-md-begin">
                <button class="btn btn-primary fs-4 fw-bold CANCELAR" type="button" onClick={()=>{navigate("../asesor")}}><span>Cancelar</span></button>
                </div>
                <div class="col-6 d-grid gap-2 d-md-flex justify-content-md-end">                    
                    <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button"><span>Observar</span></button>
                    <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>openRegistroModal()}><span>Registrar</span></button>
                </div>
            </div>

            <ModalPregunta
              isOpen={isOpenEditModal} 
              closeModal={closeEditModal}
              procedimiento = "Quiere guardar"
              objeto="cantidad maxima de asesorados de"
              elemento={asesorSeleccionado && asesorSeleccionado.nombres}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionPut()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeEditModal}>Cancelar</Button>
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

            <ModalPregunta
              isOpen={isOpenRegistro} 
              closeModal={closeRegistroModal}
              procedimiento = "Registrar"
              objeto="asesor en el curso"
              elemento={asesorSeleccionado && asesorSeleccionado.nombres}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionPost()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeRegistroModal}>Cancelar</Button>
              </div>
            </ModalPregunta>
            <ModalConfirmación
              isOpen={isOpenRegistroConf} 
              closeModal={closeRegistroConfModal}
              procedimiento= "registrado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={()=>cerrarPost()}>Entendido</Button>
              </div>
            </ModalConfirmación>
        </div>
    )
}

export default DatosAsesor