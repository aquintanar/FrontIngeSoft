import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {makeStyles, createTheme} from '@material-ui/core/styles';
import {  Modal, Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
//import './DatosEspecilidad.css';

const url= "https://localhost:7012/api/Especialidad/";
const urlFacu= "https://localhost:7012/api/Facultad/";

const themeX = createTheme({
  palette: {
    type: "dark",
    grey: {
      800: "#000000", // overrides failed
      900: "#121212" // overrides success
    },
    background: {
      paper: "#1294F2"
    }
  }
});

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: themeX.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 6, 5),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));


function ListaEspecialidad()  {
  const styles= useStyles();
  const [data, setData]=useState([]);
  const [facus, setFacus] = useState([]);
  const [search, setSearch] = useState("");
  const [fil, setFil] = useState(0);
  const [modalEliminar, setModalEliminar]=useState(false);
  let navigate = useNavigate();

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
      abrirCerrarModalEliminar();
    })
  }

  //Control mensaje de eliminar--
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  //Selecciona especialidad a eliminar--
  const seleccionarEspecialidad=(especialidad)=>{
    setEspecialidadSeleccionada(especialidad);
    abrirCerrarModalEliminar();
  }

  useEffect(()=>{
     peticionGet();
     petitionFacu();
  },[])

  //Mensaje de confirmación para eliminar --
  const bodyEliminar=(
    <div className={styles.modal} >
      <div align = "center">
        <p class= "text-white">¿Estás seguro que deseas eliminar la especialidad <b>{especialidadSeleccionada && especialidadSeleccionada.nombre}</b> ? </p>
      </div>
      <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
        <Button class="btn  btn-success"  onClick={()=>peticionDelete()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button class="btn btn-danger" onClick={()=>abrirCerrarModalEliminar()}>Cancelar</Button>
      </div>
    </div>
  )
    
  return (      
    <div class="container">   

      <p class=" text-start  fs-2 my-1 fw-bold">Gestión General</p>
      <p class="text-start    fs-4 mb-2 fw-bold">Búsqueda de Especialidad</p>

      <div class="row">
          <div class="col-lg-7" >
              <div class="text-start fs-6  mb-1 fw-normal ">Ingresar nombre de la especialidad</div>
              <div class="input-group mb-2 ">
                  <input type="text" value={search} class="form-control" name="search" placeholder="Especialidad" aria-label="serach" onChange={buscador}/>
              </div>
          </div>

          <div class="col-lg-5" >
              <div class=" fs-6 fw-normal  mb-1 ">Facultad</div>
              <select select class="form-select Cursor" aria-label="Default select example"  onChange= {cambioSelect} >  
                   <option selected value = "0">Todos</option>
                  {facus.map(elemento=>(
                    <option key={elemento.idFacultad} value={elemento.idFacultad}>{elemento.descripcion}</option>  
                  ))}
              </select>
          </div>
      </div>


      <p class="text-start  fs-4 mt-3 fw-bold" >Lista de Especialidades</p>

      <div class = "row   ">
        <div class=" col-8  ">
          <table className='table fs-6 '>
            <thead class >
              <tr class>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Facultad</th>
                  <th>Acciones</th>
              </tr>
            </thead>
            <tbody >
              {filtrado.map(especialidad => (
                <tr key={especialidad.idEspecialidad}>
                    <td>{especialidad.idEspecialidad}</td>
                    <td>{especialidad.nombre}</td>                    
                    <td>{especialidad.descripcion}</td>
                    <td>{especialidad.facultad.nombre}</td>
                    <td>
                    <button className="btn" onClick={()=>{navigate("datosEspecialidad/"+especialidad.idEspecialidad)}}> <FaIcons.FaEdit /></button>
                    <button  className=" btn" onClick={()=>seleccionarEspecialidad(especialidad)}> <BootIcons.BsTrash /></button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
      </Modal>
      
      <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
          <button className='btn btn-primary fs-4 fw-bold mb-3 ' onClick={()=>{navigate("datosEspecialidad/0")}}>Insertar</button>
      </div>             
    </div>              
  )
}

export default ListaEspecialidad;

