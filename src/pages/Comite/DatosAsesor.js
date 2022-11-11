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
  const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
  const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();
  const [asesorXcurso, setAsesorXCurso] =useState({
      idCurso: 0,
      idAsesor: 0,
      cantAlumnos: 0
  })
  const [especialidadAs, setespecialidadAs] =useState({
      idEspecialidad: 0,
      nombre: '',
      descripcion: '',
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
      codigoPucp: '',
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
          apeMat: response.data[0].apeMat,
          correo: response.data[0].correo,
          codigoPucp: response.data[0].codigoPucp,
          imagen: response.data[0].imagen,
          contrasena: response.data[0].contrasena,
          maxAsesorados: response.data[0].maxAsesorados,
          estaObservado: false,
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
      console.log(idEs);
      await axios.get(urlEsp+"GetEspecialidadXId?idEspecialidad="+idEs)
      .then(response=>{
          setespecialidadAs(response.data);
          console.log(response.data);
      }).catch(error =>{
      console.log(error.message);
      })
  }

  const getTemaAsesorXCurso=async()=>{
    console.log(idAs);
    console.log(idCur);
      await axios.get(urlAsXCurso+"BuscarAsesorXCurso?idAsesor="+idAs+ "&idCurso="+idCur)
    .then(response=>{
      setAsesorXCurso(response.data);
      console.log(response.data);
      console.log(asesorXcurso);
    }).catch(error =>{
      console.log(error.message);
    })
  }

  const peticionPost=async()=>{
    await axios.post(urlAsXCurso+"PostAsesorXCurso/",asesorXcurso)
    .then(response=>{
      console.log(response.data);
      closeRegistroModal();
      openRegistroConfModal();
    }).catch(error =>{
      console.log(error.message);
      console.log(asesorXcurso);
    })
  }

  const cambioMax =e=>{
      asesorSeleccionado.maxAsesorados = parseInt(e.target.value);
      setMax(e.target.value)
  }
  const peticionPut=async()=>{      
      await axios.put(urlAs+"ModifyAsesor",asesorSeleccionado)
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

    const peticionDelete=async()=>{
      await axios.delete(urlAsXCurso+ "DeleteAsesorXCurso?idAsesor="+ idAs+"&idCurso="+idCur)
      .then(response=>{
        closeDeleteModal();
        openConfirmModal();
        setAsesorXCurso({
          idCurso: 0,
          idAsesor: 0,
          cantAlumnos: 0
        });
      })
    }
  useEffect(()=>{
      cargarAsesor();
  },[])

  const cargaDatos=()=>{
    if(asesorXcurso.idAsesor===0){      
      setAsesorXCurso({
        idCurso: idCur,
        idAsesor: idAs,
        cantAlumnos: 0
      });
      console.log(asesorXcurso)    
      openRegistroModal()
    }
    else{
      openDeleteModal()
    }
  }

  return(
      <div class="CONTAINERCOMITE">
          <p className="HEADER-TEXT1">{asesorSeleccionado.nombres + " " + asesorSeleccionado.apePat}</p>
          <div className='row'>
              <div className='col-8 PERFIL'>
                  <div class='BLOCK PERFIL-HEADER fw-bold'>{asesorSeleccionado.correo} </div>
                  <div class = 'BLOCK PERFIL-TITLE fw-bold'> Áreas de interés y especialización: {especialidadAs.nombre} 
                      <div class = "fw-normal text-black">
                        {especialidadAs.nombre}
                      </div>
                    </div>
              </div>
          </div>
          <div className='row INSERTAR-BOTONES'>
              <div className='col-4'>
                  <p> Cantidad máxima de asesorados:</p> <input onChange={cambioMax} type="number" id="maxAsesorados" name="maxAsesorados"
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
                  <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>cargaDatos()}><span>Acción
                  </span></button>
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


          <ModalPregunta
            isOpen={isOpenDeleteModal} 
            closeModal={closeDeleteModal}
            procedimiento = "retirar"
            objeto="al asesor"
            elemento={asesorSeleccionado && asesorSeleccionado.nombres}
          >
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <Button class="btn  btn-success btn-lg" onClick={()=>peticionDelete()}  >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button class="btn btn-danger btn-lg"  onClick={closeDeleteModal}>Cancelar</Button>
            </div>
          </ModalPregunta>
    
          <ModalConfirmación
            isOpen={isOpenConfirmModal} 
            closeModal={closeConfirmModal}
            procedimiento= "eliminado"
          >
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <Button class="btn btn-success btn-lg" onClick={closeConfirmModal}>Entendido</Button>
            </div>
          </ModalConfirmación>
      </div>
  )
}

export default DatosAsesor