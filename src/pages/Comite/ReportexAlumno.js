import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {makeStyles, createTheme} from '@material-ui/core/styles';
import {  Modal, Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
//import './DatosFacultad.css';
import * as BsIcons from 'react-icons/bs';
import '../../stylesheets/Administrador.css'
import "../../stylesheets/General.css";
import useModal from '../../hooks/useModals';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';

const url= "http://34.195.33.246/api/Alumno/";

/*
const url= "http://44.210.195.91/api/Facultad/";
//-------
*/ 
//------


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


const ReportexAlumno = () => {
  const styles= useStyles();
  const [data, setData]=useState([]);
  const [search, setSearch] = useState("");
  const [modalEliminar, setModalEliminar]=useState(false);
  const [currentPage,SetCurrentPage] = useState(0);
  let navigate = useNavigate();
  const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
  const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();
  //objeto Alumno--
  const [alumnoSeleccionado, setAlumnoSeleccionado]=useState({
    idAlumno: 0,
    nombre: '',
    email: '',
  })
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
      filtrado=data.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
    }
  }

  //----------------
  filtrado=filtrado.slice(currentPage,currentPage+6);
  const nextPage = () =>{
    if(filtrado.length>=currentPage) //VER CODIGO
      SetCurrentPage(currentPage+6);
  }
  const previousPage =() =>{
    if(currentPage>0)
      SetCurrentPage(currentPage-6);
  }
  //----------------
  //Listar Alumnos tabla--
 
  const peticionGet=async()=>{
    const response = await axios.get('http://34.195.33.246/api/Alumno/GetAlumnos',
        {
            _method:'GET'
        })
        .then(response=>{
            console.log("AQUI ESTOY")
            console.log(response.data);
            setData(response.data);
            
        }).catch(error=>{
            console.log(error.message);
        });
    }
    //Eliminar una facultad--
    const peticionDelete=async()=>{
        await axios.delete(url+ "DeleteFacultad",{
            data: facultadSeleccionada,
        }).then(response=>{
        setData(data.filter(facultad=>facultad.idFacultad!==facultadSeleccionada.idFacultad));
        closeDeleteModal();
        openConfirmModal();
        })
    }

  //Control mensaje de eliminar--
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  //Selecciona facultad a eliminar--
  const seleccionarFacultad=(facultad)=>{
    setFacultadSeleccionada(facultad);
    openDeleteModal();
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
    



    return(
        <div className="CONTAINERADMIN">   

        <h1>Reporte de Alumnos</h1>
        <h2>Búsqueda de alumnos</h2>
  
        <div class="row ">
            <div class="col-lg-7 " >
                <p>Ingresar el nombre del alumno</p>
                <div class="input-group mb-2 ">
                    <input type="search" value={search} class="form-control icon-search" name="search" placeholder="Nombre" aria-label="serach" onChange={buscador}/>
                </div>
            </div>
  
  
        </div>
  
  
        <p class="HEADER-TEXT2" >Lista de alumnos</p>
        <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
        <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
        <div class = "row   LISTAR-TABLA">
          <div class=" col-10  ">
            <table className='table fs-6 '>
              <thead >
                <tr class>
                    <th style={{width: 200}}>Nombre</th>
                    <th style={{width:200}}>E-mail</th>
                    <th style={{width:100}}>Acciones</th>
                </tr>
              </thead>
              <tbody >
                {filtrado.map(alumno => (
                  <tr key={alumno.nombres}>
                  <td>{alumno.nombres}</td>
                  <td>{alumno.correo}</td>
                                   
                  <td>
                  <button className="btn BTN-ACCIONES" onClick={/*()=>{navigate("datosFacultad/"+facultad.idFacultad)}*/console.log('hola')}> <FaIcons.FaEdit /></button>
                  <button  className=" btn BTN-ACCIONES" onClick={/*()=>seleccionarFacultad(facultad)*/console.log('hola')}> <BootIcons.BsTrash /></button>
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
          elemento={facultadSeleccionada && facultadSeleccionada.nombre}
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
        <div className='d-grid gap-2 d-md-flex justify-content-md-end INSERTAR-BOTONES '>
            <button className="btn btn-primary fs-4 fw-bold mb-3 REGISTRAR" onClick={()=>{navigate("datosFacultad/0")}}><span>Registrar</span></button>
        </div>             
      </div> 
    );
}

export default ReportexAlumno;