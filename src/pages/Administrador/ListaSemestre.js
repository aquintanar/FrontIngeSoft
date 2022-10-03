import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {makeStyles, createTheme} from '@material-ui/core/styles';
import {  Modal, Button, TextField} from '@material-ui/core';
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
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  let navigate = useNavigate();

  const [semestreSeleccionada, setSemestreSeleccionada]=useState({
    idSemestre: 0,
    nombre: '',
    anho: 0,
    numSemestre: 0,
    enCurso: '',
    idEspecialidad: 0,
    estado: 1
  })

  const handleChange=e=>{
    const {name, value}=e.target;
    setSemestreSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(semestreSeleccionada);
  }

  const petitionFacu=async()=>{
    await axios.get(urlFacu+"GetFacultades/")
    .then(response=>{
      console.log(response);
      setFacus(response.data);
    }).catch(error =>{
      console.log(error.message);
    })
  }

  const petitionEsp=async()=>{
    await axios.get(urlEsp+"GetEspecialidades/")
    .then(response=>{
      console.log(response);
      setEsp(response.data);
    }).catch(error =>{
      console.log(error.message);
    })
  }

  const peticionGet=async()=>{
    await axios.get(url+"GetSemestres/")
    .then(response=>{
      setData(response.data);
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
      abrirCerrarModalInsertar()
    }).catch(error =>{
      console.log(error.message);
    })
  }

  const peticionPut=async()=>{
    await axios.post(url+"ModifySemestre", semestreSeleccionada,{
      _method: 'PUT'})
      .then(response=>{
        var dataNueva=data;
        dataNueva.forEach(sem=>{
          if(semestreSeleccionada.idSemestre === sem.idSemestre){
            sem.nombre=semestreSeleccionada.nombre;
            sem.anho=semestreSeleccionada.anho;
            sem.numSemestre=semestreSeleccionada.numSemestre;
            sem.enCurso=semestreSeleccionada.enCurso;
            sem.idEspecialidad=semestreSeleccionada.idEspecialidad;
          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
  }


  const peticionDelete=async()=>{
    await axios.delete(url+ "DeleteSemestre?idSemestre="+ this.state.form.idSemestre,{
      _method: 'DELETE'
    }).then(response=>{
      setData(data.filter(semestre=>semestre.idSemestre!==semestreSeleccionada.idSemestre));
      abrirCerrarModalEliminar();
    })
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarSemestre=(semestre, caso)=>{
    setSemestreSeleccionada(semestre);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  useEffect(()=>{
     peticionGet();
     petitionFacu();
     petitionEsp();
  },[])


  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Gestión General</h3>
      <h3>Gestión de Semestre Académicoccc</h3> 
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
      <br />
      <TextField name="descripcion" className={styles.inputMaterial} label="Descripción" onChange={handleChange}/>
      <br />
      <TextField name="idFacultad" className={styles.inputMaterial} label="Facultad" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Especialidad</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={semestreSeleccionada && semestreSeleccionada.nombre}/>
      <br />
      <TextField name="descripcion" className={styles.inputMaterial} label="Descripción" onChange={handleChange} value={semestreSeleccionada && semestreSeleccionada.descripcion}/>
      <br />
      <TextField name="idFacultad" className={styles.inputMaterial} label="Facultad" onChange={handleChange} value={semestreSeleccionada && semestreSeleccionada.idFacultad}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

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
              <div class="text-start fs-5  mb-1 fw-normal ">Ingresar nombre de la especialidad</div>
              <div class="input-group mb-3 ">
                  <input type="text" class="form-control" placeholder="Especialidad" aria-label="Especialidad" aria-describedby="button-addon2"/>
                  <button class="btn btn-outline-secondary" type="button" id="button-addon2"   >Buscar</button>
              </div>
          </div>

          <div class="col-lg-3" >
              <div class=" fs-5 fw-normal  mb-1 ">Año</div>
              <select select class="form-select Cursor" aria-label="Default select example">
                  {data.map(semestre=>(
                    <option key={semestre.idSemestre} value={semestre.idSemestre}>{semestre.anho}</option>  
                  ))}
              </select>
          </div>

          <div class="col-lg-3" >
              <div class=" fs-5 fw-normal  mb-1 ">Semestre</div>
              <select select class="form-select Cursor" aria-label="Default select example">
                  {data.map(semestre=>(
                    <option key={semestre.idSemestre} value={semestre.idSemestre}>{semestre.numSemestre}</option>  
                  ))}
              </select>
          </div>
      </div>

      <div class="row">
        <div class = "col-lg-3">
          <div class="col text-start fs-5  mb-1 fw-normal">Ordenar por</div>
            <select class="col form-select " aria-label="Default select example">
              <option selected value = "1">Todos</option>
              <option value="2">Nombre</option>
              <option value="3">Registrados recientemente</option>
            </select>
          </div>
        
          <div class = "col-lg-3 ">
          <div class="col text-start fs-5  mb-1 fw-normal">Facultad</div>
            <select select class="form-select Cursor" aria-label="Default select example">
                {facus.map(elemento=>(
                <option key={elemento.idFacultad} value={elemento.idFacultad}>{elemento.nombre}</option>  
              ))}
            </select>
          </div>

          <div class = "col-lg-6 " align = 'right' >
            <div class="col text-start fs-5  mb-1 fw-normal text-white"> " "</div>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
              <button className='btn btn-primary fs-4 fw-bold mb-3 tableAzul ' onClick={()=>{navigate("/gestion/datosEspecialidad")}}>Buscar</button>
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
                  <th>Semestre</th>
                  <th>En curso</th>
                  <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map(semestre => (
                <tr key={semestre.idSemestre}>
                    <td>{semestre.idSemestre}</td>
                    <td>{semestre.nombre}</td>                    
                    <td>{semestre.anho}</td>
                    <td>{semestre.numSemestre}</td>
                    <td>{semestre.enCurso}</td>
                    {esp.map(element => {      
                      if (element.idEspecialidad === semestre.idEspecialidad) {
                        return <td>{element.nombre}</td>;
                      }
                    })}

                    <td>
                    <button className="btn" onClick={()=>{navigate("/gestion/datosEspecialidad")}}> <FaIcons.FaEdit/></button>
                    <button  className=" btn" onClick={()=>seleccionarSemestre(semestre, 'Eliminar')}> <BootIcons.BsTrash/></button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
      open={modalInsertar}
      onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
      </Modal>

      <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}>
          {bodyEditar}
      </Modal>

      <Modal
      open={modalEliminar}
      onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
      </Modal>
      
      <div className='d-grid gap-2 d-md-flex justify-content-md-end '>
          <button className='btn btn-primary fs-4 fw-bold mb-3 ' onClick={()=>{navigate("/gestion/datoSemestre/")}}>Insertar</button>
      </div>             
    </div>              
  )
}

export default ListaSemestre;

