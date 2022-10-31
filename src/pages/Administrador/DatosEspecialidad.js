import React, {useEffect, useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import '../../stylesheets/Administrador.css'
import {  Button} from '@material-ui/core';
import useModal from '../../hooks/useModals';
import {ModalConfirmación, ModalPregunta} from '../../components/Modals';


const url= "https://localhost:7012/api/Especialidad/";
const urlFacu= "https://localhost:7012/api/Facultad/";
/*
const url= "http://44.210.195.91/api/Especialidad/";
const urlFacu= "http://44.210.195.91/api/Facultad/";
*/
function DatosEspecialidad() {
  let navigate = useNavigate();
  let {id} = useParams();
  const [facus, setFacus] = useState([]);
  const [subTitulo,setSubtitulo] = useState("Registrar Especialidad");
  const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
  const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
  const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
  const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();

  //OBjeto especialidad--
  const [especialidadSeleccionada, setEspecialidadSeleccionada]=useState({
      idEspecialidad: 0,
      nombre: '',
      descripcion: '',
      facultad: {
        idFacultad:1 
      }
  })

  //Control cambio en inputs--
  const handleChange=e=>{
    const {name, value}=e.target;
    setEspecialidadSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(especialidadSeleccionada);
  }

  //Control cambio en combo box--
  const cambioSelect =e=>{
      setEspecialidadSeleccionada(prevState=>({
        ...prevState,
        facultad:{idFacultad: e.target.value}}))
      console.log(especialidadSeleccionada);
    }

  //Lista facultades combo box--
  const petitionFacu=async()=>{
      await axios.get(urlFacu+"GetFacultades/")
      .then(response=>{
        setFacus(response.data);
      }).catch(error =>{
        console.log(error.message);
      })
  }

  //Insertar nueva especialidad--
  const peticionPost=async()=>{
    await axios.post(url+"PostEspecialidad",especialidadSeleccionada,{
        _method: 'POST'
      })
    .then(response=>{
      closePostModal();
      openGuardadoModal();
    }).catch(error =>{
      console.log(error.message);
    })
  }

  const cerrarPost=()=>{
    closeGuardadoModal();
    navigate("../gestion/gesEspecialidad");
  }


  //Modificar especialidad--
  const peticionPut=async()=>{
    await axios.put(url+"ModifyEspecialidad",especialidadSeleccionada)
    .then(response=>{
      closeEditModal();
      openEditadoModal();
    }).catch(error =>{
      console.log(error.message);
    })
  }

  const cerrarPut=()=>{
    closeEditadoModal();
    navigate("../gestion/gesEspecialidad");
  }

  //Selección entre modificar o insertar
  const peticionSelecter =()=>{
    if(id==='0'){
      openPostModal();
    }
    else{
      openEditModal();  
    }
  }

  //Carga especialidad a modificar
  const cargarEspecialidad=async()=>{
    if(id!=='0'){
      const response = await axios.get(url+"GetEspecialidadXId?idEspecialidad="+parseInt(id));
      setEspecialidadSeleccionada({
        idEspecialidad: response.data[0].idEspecialidad,
        nombre: response.data[0].nombre,
        descripcion: response.data[0].descripcion,
        facultad:{idFacultad: response.data[0].idFacultad}}
      );
      setSubtitulo("Modificar Especialidad");
    }
  }

  useEffect(()=>{
    petitionFacu();
    cargarEspecialidad();
    },[])


  return (
    <div class=" CONTAINERADMIN">
        <div class="row">
            <p class="HEADER-TEXT1">Gestión de Especialidades</p>
            <p class="HEADER-TEXT2">{subTitulo}</p>
        </div> 
            <div class="row">
                <div class="col-6 DATOS" >
                    <p>Clave de la especialidad</p>
                    <div class="input-group input-group-lg mb-3">
                        <input  type="text" class="form-control" name="descripcion" placeholder="Clave especialidad" aria-label="descripcion"  
                          onChange={handleChange} value={especialidadSeleccionada && especialidadSeleccionada.descripcion}/>
                    </div>
                </div>

                <div class="col-6  DATOS" >
                    <div class="  fs-5 fw-normal  mb-1 "><p>Facultad</p></div>
                    <select select class="form-select Cursor"  onChange= {cambioSelect}  selected value = {especialidadSeleccionada.facultad.idFacultad} >
                      {facus.map(elemento=>
                          <option key={elemento.idFacultad} value={elemento.idFacultad}>{elemento.descripcion}</option>  
                      )}
                    </select>
                </div>
            </div>

            <div class = "DATOS">
                <div class = "col-12">
                    <div class="text-start fs-5 fw-normal "><p>Nombre de la especialidad</p></div>
                    <div class="input-group mb-3 ">
                        <textarea   class="form-control" name="nombre" placeholder="Nombre especialidad" 
                          onChange={handleChange} value={especialidadSeleccionada && especialidadSeleccionada.nombre} />
                    </div>
                </div>
            </div>
                        
            <ModalPregunta
              isOpen={isOpenEditModal} 
              closeModal={closeEditModal}
              procedimiento = "modificar"
              objeto="la especialidad"
              elemento={especialidadSeleccionada && especialidadSeleccionada.nombre}
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
              objeto="la especialidad"
              elemento={especialidadSeleccionada && especialidadSeleccionada.nombre}
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

            <div class="row INSERTAR-BOTONES">                            
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>peticionSelecter()}><span>Guardar</span></button>
                    <button class="btn btn-primary fs-4 fw-bold   CANCELAR" type="button" onClick={()=>{navigate("../gestion/gesEspecialidad")}}><span>Cancelar</span></button>
                    </div>
            </div>
    </div>
  )
}

export default DatosEspecialidad