import React, {useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Comite.css'
import '../../stylesheets/General.css'
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as BsIcons from 'react-icons/bs';
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import { AppStream } from 'aws-sdk';

const urlAs= "https://localhost:7012/api/Alumno/";
const urlEsp= "https://localhost:7012/api/Especialidad/";
const urlAsXCurso="https://localhost:7012/api/AlumnoXCurso/";

function ListarAlumnos()  {
  let idCursoGlobal = localStorage.getItem("idCurso");    
  let idAsesorRef = 0;
  let navigate = useNavigate();
  const [currentPage,SetCurrentPage] = useState(0);
  const [observado, setObservado] = useState(0);
  const [search, setSearch] = useState("");
  const [as, setAs] = useState([]);
  const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
  const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();

  let filtrado =[];
  const buscador = e=>{
      setSearch(e.target.value);
  }
  if(!search && !observado){//sin filtro
    filtrado=as;
  }
  else{
      if(search && observado){
        filtrado = as.filter((dato) =>{
          let a = dato.nombres + " " + dato.apePat + " " + dato.apeMat + " " + dato.correo
          console.log(a)
          return a.toLowerCase().includes(search.toLocaleLowerCase());
        } );
        filtrado=filtrado.filter((dato)=>dato.tieneTema===(observado===1?1:0)) ;
      }
      else{
        if(search)//filtro por nombre
          filtrado = as.filter((dato) =>{
            let a = dato.nombres + " " + dato.apePat + " " + dato.apeMat + " " + dato.correo
            console.log(a)
            return a.toLowerCase().includes(search.toLocaleLowerCase());
          } );
        if(observado)
          filtrado=as.filter((dato)=>dato.tieneTema===(observado===1?1:0)) ;
      }
  }


  const cambioEstaObservado =e=>{
      const valor = parseInt(e.target.value)
      setObservado(valor)
  }

  const nextPage = () =>{
        if(filtrado.length>=5) //VER CODIGO
        SetCurrentPage(currentPage+5);
    }
  const previousPage =() =>{
        if(currentPage>0)
        SetCurrentPage(currentPage-5);
    }

  const seleccionarAsesor=(asesor)=>{
      setAsesorSeleccionado(asesor);
        openDeleteModal();
    }
    
  

  filtrado = filtrado.slice(currentPage,currentPage+5);

  const [asesorSeleccionado, setAsesorSeleccionado]=useState({
      idAlumno: 0,
      linkCalendario: '',
      tieneTema: 0,
      nombres: '',
      apePat: '',
      apeMat: '',
      correo: '',
      codigoPucp: '',
      contrasena:'',
      imagen: '',
      contrasena: '',
      idEspecialidad: 0,
      nombre: '',
      descripcion: '',
      idFacultad: 0
  })

  const petitionAs=async()=>{
      await axios.get(urlAs+"ListAlumnosXIdCurso?idCurso="+idCursoGlobal)
      .then(response=>{
      setAs(response.data);
      }).catch(error =>{
      console.log(error.message);
      })
  }
  
  
    const peticionDelete=async()=>{
      console.log(asesorSeleccionado);
      console.log(idCursoGlobal);
      await axios.delete(urlAsXCurso+ "DeleteAlumnoXCurso?idAlumno="+ asesorSeleccionado.idAlumno + "&idCurso=" + idCursoGlobal).then(response=>{
        petitionAs();
        closeDeleteModal();
        openConfirmModal();
      })      
    }

  
  useEffect(()=>{
      petitionAs();
  },[])

  return(
      <div className="CONTAINERCOMITE">
          <h1>Gestión de Alumnos</h1>
          <h2>Búsqueda de alumnos </h2>
          <div class="row">
            <div class="col-8 " >
                <p>Ingrese el nombre o correo del alumno</p>
                <input size="10" type="search" value={search} class="form-control icon-search" name="search" placeholder="Nombre o correo del alumno" aria-label="serach" onChange={buscador}/>
            </div>
            <div class="col-4" >
                <p> ¿Tiene tema?</p>
                <select select class="form-select " aria-label="Default select example" onChange= {cambioEstaObservado} >
                      <option key={0} value = {0}>Todos</option>
                      <option key={1} value = {1}>Si</option>
                      <option key={2} value={2}>No</option>
                </select>
              </div>
          </div>

        <h2>Lista de alumnos en el curso</h2>
        <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
        <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
        <div class = "row LISTAR-TABLA">
          <div class=" col-12 ">
            <table className='table fs-6 '>
              <thead class >
                <tr class>
                    <th style ={{width: 275}}>Nombre</th>
                    <th style ={{width: 150}}>Correo</th>
                    <th style = {{width:100}}>Acciones</th>
                </tr>
              </thead>
              <tbody >
                {filtrado.map(asesor => (
                  <tr key={asesor.idAsesor}>
                      <td >{asesor.nombres + " " + asesor.apePat + " " + asesor.apeMat}</td>
                      <td >{asesor.correo}</td>
                      <td>
                      <button class="btn BTN-ACCIONES" title='Ver perfil' onClick={()=>{navigate("DatosAlumno/"+asesor.idAlumno)}}> <BsIcons.BsEye  /></button>
                      <button class=" btn BTN-ACCIONES" title='Retirar alumno del curso' onClick={()=>seleccionarAsesor(asesor)}> <BootIcons.BsTrash /></button>
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
      procedimiento = "retirar del curso"
      objeto="a"
      elemento={asesorSeleccionado && asesorSeleccionado.nombres}
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

          <div className='INSERTAR-BOTONES'>
              <button className='btn AGREGAR-CURSO' title='Agregar alumno al curso' onClick={()=>{navigate("AgregarAlumno")}}> 
                  <span>Agregar alumno</span>
              </button>
          </div>
          
      </div>
  )
}
export default ListarAlumnos;