import React, {useEffect, useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';


import useModal from '../../hooks/useModals';
//import './DatosFacultad.css';
import axios from 'axios';
import {ModalConfirmación, ModalPregunta} from '../../components/Modals';
import {  Button} from '@material-ui/core';
import '../../stylesheets/Administrador.css'
/*
const url= "https://localhost:7012/api/Facultad/";
const urlEspe= "https://localhost:7012/api/Especialidad/";
*/
const url= "http://44.210.195.91/api/Facultad/";
const urlEspe= "http://44.210.195.91/api/Especialidad/";

function DatosFacultad() {
  let navigate = useNavigate();
  let {id} = useParams();
  const [subTitulo,setSubtitulo] = useState("Nueva Facultad");
  const [imagen, setImagen] = useState(null);
  const [espes, setEspes] = useState([]);
  const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
  const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
  const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
  const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();

  const [facultadSeleccionada, setFacultadSeleccionada]=useState({
    idFacultad: 0,
    nombre: '',
    descripcion: '',
    foto: null
})


const handleChange=  (e)=>{
  const {name, value}=e.target;
 // convertirBase64(e.target.files);
  setFacultadSeleccionada(prevState=>({
    ...prevState,
    [name]: value,
    ///foto: imagen
  }))
  console.log(facultadSeleccionada);
}
 // facultadSeleccionada.foto = arrayAuxiliar[1];
 const convertirBase64=(archivos)=>{
  Array.from(archivos).forEach(archivo=>{
    var reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload=function(){
      var arrayAuxiliar=[];
      var base64 = reader.result;
      arrayAuxiliar=base64.split(',');
      facultadSeleccionada.foto = arrayAuxiliar[1];
     setImagen(arrayAuxiliar[1]);
      console.log(arrayAuxiliar[1]);
    //  console.log(facultadSeleccionada);
    }
    
  })
  //setFacultadSeleccionada(prevState=>({
    //  ...prevState,
   //foto: imagen}))
    console.log(facultadSeleccionada);
  
  
  }

// <img src={`data:image/jpeg;base64,${facultadSeleccionada.foto}`}

  //Control cambio en inputs--


  //Insertar nueva facultad--
  const peticionPost=async()=>{
    await axios.post(url+"PostFacultad",facultadSeleccionada,{
        _method: 'POST'
      })
    .then(response=>{
      closePostModal();
      openGuardadoModal();
    }).catch(error =>{
      console.log(error.message);
    })
   // arrayAuxiliar=[];
  }

  //Modificar facultad--
  const peticionPut=async()=>{
    await axios.put(url+"PutFacultad",facultadSeleccionada)
    .then(response=>{
      closeEditModal();
      openEditadoModal();
    }).catch(error =>{
      console.log(error.message);
    })
   // arrayAuxiliar=[];
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

  //Carga facultad a modificar
  const cargarFacultad=async()=>{
    if(id!=='0'){
      const response = await axios.get(url+"GetFacultadesById?id_facultad="+parseInt(id));
      setFacultadSeleccionada({
        idFacultad: response.data[0].idFacultad,
        nombre: response.data[0].nombre,
        descripcion: response.data[0].descripcion,
        foto: response.data[0].foto
      }
      );
      setSubtitulo("Modificar Facultad");
    }
  }

  const cargarEspecialidades=async()=>{
    if(id!=='0'){
      await axios.get(urlEspe+"ListEspecialidadesXFacultad?idFacultad="+parseInt(id))
      .then(response=>{
        setEspes(response.data);
      }).catch(error =>{
        console.log(error.message);
      })
    }
  }


  const cerrarPut=()=>{
    closeEditadoModal();
    navigate("../gestion/gesFacultad");
  }

  const cerrarPost=()=>{
    closeGuardadoModal();
    navigate("../gestion/gesFacultad");
  }


  useEffect(()=>{
    cargarFacultad();
    cargarEspecialidades();

    },[],[])


  return (
    <div class="CONTAINERADMIN">
        <div class="row">
            <p class="HEADER-TEXT1">Gestión General</p>
            <p class="HEADER-TEXT2">Registro de Facultad - {subTitulo}</p>
        </div> 

            <div class="row ">
                <div class="col-7 DATOS-FACULTAD" >
                      <div class="text-start fs-5 fw-normal  mb-1"><p>Nombre de la facultad</p></div>
                      <div class="input-group mb-3 ">
                          <input type="text"  class="form-control" name="nombre" placeholder="Facultad" 
                            onChange={handleChange} value={facultadSeleccionada && facultadSeleccionada.nombre } />
                      </div>

                      <div class=" text-start fs-5 fw-normal ">
                          <p>Descripción</p>
                          <div class="input-group input-group-lg mb-3">
                              <textarea class="form-control" name="descripcion" placeholder="Descripcion" aria-label="descripcion" aria-describedby="inputGroup-sizing-lg" 
                                onChange={handleChange} value={facultadSeleccionada && facultadSeleccionada.descripcion}  />
                          </div>
                      </div>

                      <div class=" col-6  LISTAR-TABLA">
                          <p></p>
                          <table className='table-responsive fs-6'>
                              <thead class ="bg-primary text-white">
                                <tr class>
                                    <th width="200">Nombre</th>
                                </tr>
                              </thead >
                              <tbody class="text-decoration-overline">
                                <u>
                                {espes.map(especialidad => (
                                    <tr key={especialidad.idEspecialidad}>
                                        <td width="200">{especialidad.nombre}</td>
                                    </tr>
                                  ))}
                                  </u>
                              </tbody>
                          </table>
                      </div>

                </div>

                <div class="col-5 DATOS-IMAGE">
                  <div class="text-start fs-5 fw-normal "><p></p></div>
                   
                   <img src={`data:image/jpeg;base64,${facultadSeleccionada.foto}`} alt="..." height="350px"/> 
                   <div class="input-group input-group-lg mb-3">
                       <input type="file"  name="foto" id="foto"  multiple className="form-control rounded-0 border border-secondary" 
                            onChange={(e)=>convertirBase64(e.target.files)}  />    
                
                   </div>  
                </div>

            </div>


      <ModalPregunta
              isOpen={isOpenEditModal} 
              closeModal={closeEditModal}
              procedimiento = "modificar"
              objeto="la facultad"
              elemento={facultadSeleccionada && facultadSeleccionada.nombre}
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
              objeto="la facultad"
              elemento={facultadSeleccionada && facultadSeleccionada.nombre}
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
                    <button class="btn btn-primary fs-4 fw-bold  CANCELAR " type="button" onClick={()=>{navigate("../gestion/gesFacultad")}}><span>Cancelar</span></button>
                    <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>peticionSelecter()}><span>Guardar</span></button>
                </div>
            </div>
    </div>
  )
}

/*
               <input type="text"  class="form-control" name="foto" placeholder="Foto" aria-label="foto" aria-describedby="inputGroup-sizing-lg" 
                          onChange={handleChange} value={facultadSeleccionada && facultadSeleccionada.foto}/>    
onChange={(e)=>convertirBase64(e.target.files)}  
*/
export default DatosFacultad
