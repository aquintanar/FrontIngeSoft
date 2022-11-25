import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as AiIcons from 'react-icons/ai';
import {  Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Administrador.css'
import useModal from '../../hooks/useModals';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import * as BsIcons from 'react-icons/bs';

const url= "https://localhost:7012/api/Especialidad/";
const urlFacu= "https://localhost:7012/api/Facultad/";
/*
const url= "http://44.210.195.91/api/Especialidad/";
const urlFacu= "http://44.210.195.91/api/Facultad/";
*/
function ListaEspecialidad()  {
  const [data, setData]=useState([]);
  const [facus, setFacus] = useState([]);
  const [search, setSearch] = useState("");
  const [fil, setFil] = useState(0);

  //------
  const [currentPage,SetCurrentPage] = useState(0);
  //-----------
  let navigate = useNavigate();
  const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
  const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();

  //objeto Especialidad--
  const [especialidadSeleccionada, setEspecialidadSeleccionada]=useState({
    idEspecialidad: '',
    nombre: '',
    descripcion: '',
    idFacultad: '',
    estado: ''
  })

  //Controla buscador--
  const buscador = e=>{
    setSearch(e.target.value);
  }

  //Filtro de tabla--
  let filtrado =[];

  if(!search && !fil){//sin filtro
    filtrado=data;
  }
  else{
    if(search && fil){//ambos filtros
      filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
      filtrado=data.filter((dato)=>dato.facultad.idFacultad===fil) ;
    }
    if(fil)//filtro por facultad
    filtrado=data.filter((dato)=>dato.facultad.idFacultad===fil) ;
    if(search)//filtro por nombre
      filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
  }
  //---------
  filtrado = filtrado.slice(currentPage,currentPage+5);

  const nextPage = () =>{
    if(filtrado.length>=5) //VER CODIGO
      SetCurrentPage(currentPage+5);
  }
  const previousPage =() =>{
    if(currentPage>0)
      SetCurrentPage(currentPage-5);
  }

  //------
  //Controla cambio en combo box--
  const cambioSelect =e=>{
    const valor = parseInt(e.target.value)
    setFil(valor)
  }

  //Listar facultades combo box--
  const petitionFacu=async()=>{
    await axios.get(urlFacu+"GetFacultades")
    .then(response=>{
      setFacus(response.data);
    }).catch(error =>{
      console.log(error.message);
    })
  }

  //Listar especialidades tabla--
  const peticionGet=async()=>{
    await axios.get(url+"GetEspecialidades/")
    .then(response=>{
      setData(response.data);
    }).catch(error =>{
      console.log(error.message);
    })
  }

  //Eliminar una especialidad--
  const peticionDelete=async()=>{
    await axios.delete(url+ "DeleteEspecialidad?idEspecialidad="+ especialidadSeleccionada.idEspecialidad).then(response=>{
      setData(data.filter(especialidad=>especialidad.idEspecialidad!==especialidadSeleccionada.idEspecialidad));
      closeDeleteModal();
      openConfirmModal();
    })
  }


  //Selecciona especialidad a eliminar--
  const seleccionarEspecialidad=(especialidad)=>{
    setEspecialidadSeleccionada(especialidad);
    openDeleteModal();
  }

  useEffect(()=>{
     peticionGet();
     petitionFacu();
  },[])
  
  
 

  return (      
    <div class=" CONTAINERADMIN">   

      <p class="HEADER-TEXT1">Gestión de Especialidades</p>
      <p class="HEADER-TEXT2">Búsqueda de especialidades</p>

      <div class="row">
          <div class="col col-7 FILTRO-LISTAR-BUSCAR" >
              <p>Ingresar nombre de la especialidad</p>
              <div class="input-group mb-2 ">
                  <input size="10" type="text" value={search} class="form-control" name="search" placeholder="Especialidad" aria-label="serach" onChange={buscador}/>
              </div>
          </div>

          <div class="col col-5 FILTRO-LISTAR" >
              <p>Facultad</p>
              <select select class="form-select" aria-label="Default select example"  onChange= {cambioSelect} >  
                   <option selected value = "0">Todos</option>
                  {facus.map(elemento=>(
                    <option key={elemento.idFacultad} value={elemento.idFacultad}>{elemento.nombre}</option>  
                  ))}
              </select>
          </div>
      </div>


      <p class="HEADER-TEXT2" >Lista de especialidades</p>
      <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
      <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
      <div class = "row LISTAR-TABLA">
        <div class=" col-12  ">
          <table className='table fs-6 '>
            <thead class >
              <tr class>
                  <th style={{width: 50}}>ID</th>
                  <th style ={{width: 240}}>Nombre</th>
                  <th style = {{width:60}}>Clave</th>
                  <th style = {{width:180}}>Facultad</th>
                  <th style = {{width:80}}>Acciones</th>
              </tr>
            </thead>
            <tbody >
              {filtrado.map(especialidad => (
                <tr key={especialidad.idEspecialidad}>
                    <td >{especialidad.idEspecialidad}</td>
                    <td >{especialidad.nombre}</td>                    
                    <td>{especialidad.descripcion}</td>
                    <td>{especialidad.facultad.nombre}</td>
                    <td>
                    <button title="Asignar coordinadores" class=" btn BTN-ACCIONES" onClick={()=>{navigate("asignarCoordinador/"+especialidad.idEspecialidad)}}> <AiIcons.AiOutlineUserAdd /></button>
                    <button title="Editar especialidad" class="btn BTN-ACCIONES" onClick={()=>{navigate("datosEspecialidad/"+especialidad.idEspecialidad)}}> <FaIcons.FaEdit /></button>
                    <button title="Eliminar especialidad" class=" btn BTN-ACCIONES" onClick={()=>seleccionarEspecialidad(especialidad)}> <BootIcons.BsTrash /></button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalPregunta
        isOpen={isOpenDeleteModal} 
        closeModal={closeDeleteModal}
        procedimiento = "eliminar"
        objeto="la especialidad"
        elemento={especialidadSeleccionada && especialidadSeleccionada.nombre}
      >
        <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
          <Button class="btn  btn-success btn-lg" onClick={()=>peticionDelete()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
      
      <div className='LISTAR-BOTON'>
          <button title= "Registrar especialidad" className='btn btn-primary fs-4 fw-bold mb-3 ' onClick={()=>{navigate("datosEspecialidad/0")}}><span>Registrar</span></button>
      </div>             
    </div>              
  )
}

export default ListaEspecialidad;

