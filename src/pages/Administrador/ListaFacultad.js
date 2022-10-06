import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {makeStyles, createTheme} from '@material-ui/core/styles';
import {  Modal, Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
//import './DatosFacultad.css';

const url= "https://localhost:7012/api/Facultad/";


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


function ListaFacultad()  {
  const styles= useStyles();
  const [data, setData]=useState([]);
  const [search, setSearch] = useState("");
  const [modalEliminar, setModalEliminar]=useState(false);
  let navigate = useNavigate();

  //objeto Facultad--
  const [facultadSeleccionada, setFacultadSeleccionada]=useState({
    idFacultad: '',
    nombre: '',
    descripcion: '',
    foto: null,
    estado: ''
  })

  //Controla buscador--
  const buscador = e=>{
    setSearch(e.target.value);
  }

  //Filtro de tabla--
  let filtrado =[];

  if(!search){//sin filtro
    filtrado=data;
  }
  else{
    if(search){//ambos filtros
      filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
    }
    if(search)//filtro por nombre
      filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
  }



  //Listar facultades tabla--
  const peticionGet=async()=>{
    await axios.get(url+"GetFacultades/")
    .then(response=>{
      setData(response.data);
    }).catch(error =>{
      console.log(error.message);
    })
  }

  //Eliminar una facultad--
  const peticionDelete=async()=>{
    await axios.delete(url+ "DeleteFacultad",{
        data: facultadSeleccionada,
      }).then(response=>{
      setData(data.filter(facultad=>facultad.idFacultad!==facultadSeleccionada.idFacultad));
      abrirCerrarModalEliminar();
    })
  }

  //Control mensaje de eliminar--
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  //Selecciona facultad a eliminar--
  const seleccionarFacultad=(facultad)=>{
    setFacultadSeleccionada(facultad);
    abrirCerrarModalEliminar();
  }

  useEffect(()=>{
     peticionGet();
  },[])

  //Mensaje de confirmación para eliminar --
  const bodyEliminar=(
    <div className={styles.modal} >
      <div align = "center">
        <p class= "text-white">¿Estás seguro que deseas eliminar la facultad <b>{facultadSeleccionada && facultadSeleccionada.nombre}</b> ? </p>
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
      <p class="text-start    fs-4 mb-2 fw-bold">Búsqueda de Facultad</p>

      <div class="row">
          <div class="col-lg-7" >
              <div class="text-start fs-6  mb-1 fw-normal ">Ingresar nombre de la facultad</div>
              <div class="input-group mb-2 ">
                  <input type="text" value={search} class="form-control" name="search" placeholder="Facultad" aria-label="serach" onChange={buscador}/>
              </div>
          </div>


      </div>


      <p class="text-start  fs-4 mt-3 fw-bold" >Lista de Facultades</p>

      <div class = "row   ">
        <div class=" col-8  ">
          <table className='table fs-6 '>
            <thead class ="bg-primary text-white">
              <tr class>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
              </tr>
            </thead>
            <tbody >
              {filtrado.map(facultad => (
                <tr key={facultad.idFacultad}>
                    <td>{facultad.idFacultad}</td>
                    <td>{facultad.nombre}</td>                    
                    <td>{facultad.descripcion}</td>
                    <td>
                    <button className="btn" onClick={()=>{navigate("datosFacultad/"+facultad.idFacultad)}}> <FaIcons.FaEdit /></button>
                    <button  className=" btn" onClick={()=>seleccionarFacultad(facultad)}> <BootIcons.BsTrash /></button>
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
          <button className='btn btn-primary fs-4 fw-bold mb-3 ' onClick={()=>{navigate("datosFacultad/0")}}>Insertar</button>
      </div>             
    </div>              
  )
}

export default ListaFacultad;