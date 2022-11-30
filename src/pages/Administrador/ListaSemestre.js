import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../stylesheets/General.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {makeStyles, createTheme} from '@material-ui/core/styles';
import {  Modal, Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
import * as BsIcons from 'react-icons/bs';
import { ModalConfirmación} from '../../components/Modals';
import useModal from '../../hooks/useModals';
//import './DatosEspecilidad.css';

const url= "https://localhost:7012/api/Semestre/";
const urlFacu= "https://localhost:7012/api/Facultad/";
const urlEsp= "https://localhost:7012/api/Especialidad/";

/*

const url= "http://44.210.195.91/api/Semestre/";
const urlFacu= "http://44.210.195.91/api/Facultad/";
const urlEsp= "http://44.210.195.91/api/Especialidad/";
*/
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

function ListaSemestre()  {
  const styles= useStyles();
  const [data, setData]=useState([]);
  const [facus, setFacus] = useState([]);
  const [esp, setEsp] = useState([]);
  const [anhos,setAnhos] = useState([]);
  const [modalEliminar, setModalEliminar]=useState(false);
  const [fil, setFil] = useState(0);
  const [fol, setFol] = useState(0);
  const [es, setEs] = useState(0);
  const [fac, setFac] = useState(0);
  const [currentPage,SetCurrentPage]=useState(0);
  let navigate = useNavigate();
  const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();

  const [semestreSeleccionada, setSemestreSeleccionada]=useState({
    idSemestre: 0,
    nombre: '',
    anho: 0,
    numSemestre: 0,
    enCurso: '',
    idEspecialidad: 0,
    estado: true,
    fechaInicio: '',
    fechaFin: ''
  })

  //Filtro de tabla--
  let filtrado =[];
  let especialidades = !fac? esp:esp.filter((dato)=>dato.facultad.idFacultad===fac);

  if(!fil && !fol && !es){//sin filtro
    filtrado=data;
  }
  else{
    if(fil && fol && es){//ambos filtros
      filtrado=data.filter((dato)=>dato.numSemestre===fil) ;
      filtrado=filtrado.filter((dato)=>dato.anho===fol) ;
      filtrado=filtrado.filter((dato)=>dato.idEspecialidad===es) ;
    }
    else{
      if(fil && fol){
        filtrado=data.filter((dato)=>dato.numSemestre===fil) ;
        filtrado=filtrado.filter((dato)=>dato.anho===fol) ;
      }
      else if(fil && es){
        filtrado=data.filter((dato)=>dato.numSemestre===fil) ;
        filtrado=filtrado.filter((dato)=>dato.idEspecialidad===es) ;}
      else if(es && fol){
        filtrado=data.filter((dato)=>dato.idEspecialidad===es);
        filtrado=filtrado.filter((dato)=>dato.anho===fol);}
      else{
        if(fil)//filtro por facultad
          filtrado=data.filter((dato)=>dato.numSemestre===fil) ;
        if(fol)//filtro por facultad
          filtrado=data.filter((dato)=>dato.anho===fol) ;
         if(es)
          filtrado=data.filter((dato)=>dato.idEspecialidad===es) ;
      
      }
      
    }
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
    setFil(parseInt(e.target.value));
  }

  //Controla cambio en combo box--
  const cambioAnho =e=>{
    setFol( parseInt(e.target.value));
  }

  //Controla cambio en combo box--
  const cambioEsp =e=>{
    setEs( parseInt(e.target.value));
  }
  //Controla cambio en combo box--
  const cambioFacu =e=>{
    setFac( parseInt(e.target.value));
  }
  
  const petitionFacu=async()=>{
    await axios.get(urlFacu+"GetFacultades/")
    .then(response=>{
      setFacus(response.data);
    }).catch(error =>{
      console.log(error.message);
    })
  }

  const petitionEsp=async()=>{
    await axios.get(urlEsp+"GetEspecialidades/")
    .then(response=>{
      setEsp(response.data);
    }).catch(error =>{
      console.log(error.message);
    })
  }

  const peticionGet=async()=>{
    await axios.get(url+"GetSemestres/")
    .then(response=>{
      setData(response.data);
      cargaAnhos(response.data);
    }).catch(error =>{
      console.log(error.message);
    })
  }

  const peticionPost=async()=>{
    await axios.post(url+"PostSemestre/", semestreSeleccionada,{
      _method: 'POST'
    })
    .then(response=>{
      setData(data.concat(response.data))
    }).catch(error =>{
      console.log(error.message);
    })
  }
  
  const cargaAnhos=(a)=>{
    const auxi=[];
    a.forEach(element => {
      if(!auxi.includes(element.anho)){
        auxi.push(element.anho);
      }
    });
    
    setAnhos(auxi);

  }

  const peticionDelete=async()=>{
    await axios.delete(url+ "DeleteSemestre?idSemestre="+ semestreSeleccionada.idSemestre).then(response=>{
      setData(data.filter(semestre=>semestre.idSemestre!==semestreSeleccionada.idSemestre));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarSemestre=(semestre, caso)=>{
    setSemestreSeleccionada(semestre);
    abrirCerrarModalEliminar();
  }

  useEffect(()=>{
     peticionGet();
     petitionFacu();
     petitionEsp();
  },[])


  const bodyEliminar=(
    <div className={styles.modal} >
      <div align = "center">
        <p class= "text-white">¿Estás seguro que deseas eliminar la especialidad <b>{semestreSeleccionada && semestreSeleccionada.nombre}</b> ? </p>
      </div>
      <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
        <Button class="btn  btn-success"  onClick={()=>peticionDelete()} >Confirmar</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button class="btn btn-danger" onClick={()=>abrirCerrarModalEliminar()}>Cancelar</Button>
      </div>
    </div>
  )
    
  return (      
    <div class="CONTAINERADMIN">   

      <h1>Gestión de Semestres Académicos</h1>
      <h2>Búsqueda de semestres académicos</h2>

      <div class="row ">
          

          <div class="col-3" >
            <p>Año</p>
            <select select class="form-select" aria-label="Default select example" onChange= {cambioAnho}>
              <option selected value = "0">Todos</option>
                  {anhos.map(elemento=>
                    <option key={elemento} value={elemento}>{elemento}</option>  
                  )} 
            </select>
          </div>

          <div class="col-3" >
              <p>Semestre</p>
              <select select class="form-select" aria-label="Default select example" onChange= {cambioSelect}>
                <option key="0" selected value = "0">Todos</option>
                <option key="1" value="1">1</option>
                <option key="2" value="2">2</option>
              </select>
          </div>
      </div>

      <div class="row ">
        
         

          <div class = "col-lg-6 " align = 'right' >
            <div class="col text-start fs-5  mb-1 fw-normal text-white"> " "</div>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
            </div> 
          </div> 


      </div>

      <h2>Lista de semestres académicos</h2>
      <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
      <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
         
      <div class = "row LISTAR-TABLA">
        <div class=" col-12 Table-style">
          <table className='table fs-5  '>
            <thead class>
              <tr class>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Año</th>
                  <th>Semestre</th>
                  <th>En curso</th>
                  <th>Fecha Inicio</th>
                  <th>Fecha Fin</th>
                  <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrado.map(semestre => (
                <tr key={semestre.idSemestre}>
                    <td>{semestre.idSemestre}</td>
                    <td>{semestre.nombre}</td>                    
                    <td>{semestre.anho}</td>
                    <td>{semestre.numSemestre}</td>
                    
                    <td>{semestre.enCurso ? "Si" : "No"}</td>
                    <td>{semestre.fechaInicio.slice(0,10)}</td>
                    <td>{semestre.fechaFin.slice(0,10)}</td>
                    <td>
                      <button title='Modificar semestre académico' class="btn BTN-ACCIONES" onClick={()=>{navigate("datosSemestre/" + semestre.idSemestre)}}> <FaIcons.FaEdit/></button>
                      <button title='Eliminar semestre académico' class=" btn BTN-ACCIONES" onClick={()=>seleccionarSemestre(semestre, 'Eliminar')}> <BootIcons.BsTrash/></button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className='INSERTAR-BOTONES '>
          <button title='Registrar semestre académico' className='btn REGISTRAR' onClick={()=>{navigate("datosSemestre/0")}}><span>Registrar</span></button>
      </div>
      
      <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
      </Modal>
      
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

export default ListaSemestre;

