import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {makeStyles, createTheme} from '@material-ui/core/styles';
import {  Modal, Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
//import './DatosEspecilidad.css';

const url= "https://localhost:7012/api/Semestre/";
const urlFacu= "https://localhost:7012/api/Facultad/";
const urlEsp= "https://localhost:7012/api/Especialidad/";

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
  let navigate = useNavigate();

  const [semestreSeleccionada, setSemestreSeleccionada]=useState({
    idSemestre: 0,
    nombre: '',
    anho: 0,
    numSemestre: 0,
    enCurso: '',
    idEspecialidad: 0,
    estado: true
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
    console.log(auxi);
    setAnhos(auxi);

  }

  const peticionDelete=async()=>{
    await axios.post(url+ "DeleteSemestre?idSemestre="+ semestreSeleccionada.idSemestre,{
      _method: 'DELETE'
    }).then(response=>{
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
    <div class="container">   

      <p class=" text-start  fs-2 my-1 fw-bold">Gestión General</p>
      <p class="text-start    fs-4 mb-2 fw-bold">Gestión de Semestre Académico</p>

      <div class="row">
          <div class="col-lg-6" >
              <div class="text-start fs-5  mb-1 fw-normal ">Especialidad</div>
              <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioEsp}>
                <option selected value = "0">Todos</option>
                    {especialidades.map(elemento=>
                      <option key={elemento.idEspecialidad} value={elemento.idEspecialidad}>{elemento.nombre}</option>  
                    )} 
               </select>
          </div>

          <div class="col-lg-3" >
            <div class=" fs-5 fw-normal  mb-1 ">Año</div>
            <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioAnho}>
              <option selected value = "0">Todos</option>
                  {anhos.map(elemento=>
                    <option key={elemento} value={elemento}>{elemento}</option>  
                  )} 
            </select>
          </div>

          <div class="col-lg-3" >
              <div class=" fs-5 fw-normal  mb-1 ">Semestre</div>
              <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelect}>
                <option key="0" selected value = "0">Todos</option>
                <option key="1" value="1">1</option>
                <option key="2" value="2">2</option>
              </select>
          </div>
      </div>

      <div class="row">
        
          <div class = "col-lg-3 ">
          <div class="col text-start fs-5  mb-1 fw-normal">Facultad</div>
            <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioFacu}>
                <option selected value = "0">Todos</option>
                {facus.map(elemento=>(
                <option key={elemento.idFacultad} value={elemento.idFacultad}>{elemento.nombre}</option>  
              ))}
            </select>
          </div>

          <div class = "col-lg-6 " align = 'right' >
            <div class="col text-start fs-5  mb-1 fw-normal text-white"> " "</div>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
            </div> 
          </div> 


      </div>

      <p class="text-start  fs-4 my-3 fw-bold" >Listado de Semestres</p>

      <div class = "row ">
        <div class=" col-9 Table-style">
          <table className='table fs-5  '>
            <thead class>
              <tr class>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Año</th>
                  <th>Semestre</th>
                  <th>Especialidad</th>
                  <th>En curso</th>
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
                    {esp.map(element => {      
                      if (element.idEspecialidad === semestre.idEspecialidad) {
                        return <td>{element.nombre}</td>;
                      }
                    })}
                    <td>{semestre.enCurso}</td>
                    <td>
                      <button className="btn" onClick={()=>{navigate("datosSemestre")}}> <FaIcons.FaEdit/></button>
                      <button  className=" btn" onClick={()=>seleccionarSemestre(semestre, 'Eliminar')}> <BootIcons.BsTrash/></button>
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
          <button className='btn btn-primary fs-4 fw-bold mb-3 ' onClick={()=>{navigate("datosSemestre")}}>Insertar</button>
      </div>             
    </div>              
  )
}

export default ListaSemestre;

