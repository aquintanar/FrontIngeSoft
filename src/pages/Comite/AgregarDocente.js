import React, {useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Comite.css'
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as BsIcons from 'react-icons/bs';
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';

//https://localhost:7012/api/
//http://34.195.33.246/
/*
const urlAs= "https://localhost:7012/api/Docente/";
const urlEsp= "https://localhost:7012/api/Especialidad/";
const urlAsXCurso="https://localhost:7012/api/DocenteXCurso/";
*/
//https://localhost:7012/api/Alumno/
const urlAs= "https://localhost:7012/api/Docente/";
const urlEsp= "https://localhost:7012/api/Especialidad/";
const urlAsXCurso="https://localhost:7012/api/DocenteXCurso/";

function ListarDocentesNoEstan()  {
  let navigate = useNavigate();
  let idCursoGlobal = localStorage.getItem("idCurso");
  let idAsesorRef = 0;
  const [idas, setIdAs] = useState(0);
  const [currentPage,SetCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [as, setAs] = useState([]);
  const [isOpenRegistro, openRegistroModal ,closeRegistroModal ] = useModal();
  const [isOpenRegistroConf, openRegistroConfModal ,closeRegistroConfModal ] = useModal();

  let filtrado =[];
  const buscador = e=>{
      setSearch(e.target.value);
  }
  if(!search){//sin filtro
    filtrado=as;
  }
  else{
      filtrado=as.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
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
      idAsesorRef = asesor.idDocente;
      setIdAs(asesor.idDocente);
        openRegistroModal();
        
    }

    const peticionPost=async()=>{
        console.log(idCursoGlobal);
        console.log(asesorSeleccionado.idUsuario);
        await axios.post(urlAsXCurso+"PostDocenteXCurso?idDocente="+idas+"&idCurso="+idCursoGlobal)
        .then(response=>{
          console.log(response.data);
          closeRegistroModal();
          openRegistroConfModal();
        }).catch(error =>{
          console.log(error.message);
        })
        petitionAs();
      }
  

  filtrado = filtrado.slice(currentPage,currentPage+5);

  const [asesorSeleccionado, setAsesorSeleccionado]=useState({
    idDocente: 0,
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
      await axios.get(urlAs+"ListDocentesXIdCursoQueNoEstan?idCurso="+ idCursoGlobal)
      .then(response=>{
      setAs(response.data);
      }).catch(error =>{
      console.log(error.message);
      })
  }
  

    const cerrarPost=()=>{
        closeRegistroConfModal();
      }

  
  useEffect(()=>{
      petitionAs();
  },[])

  return(
      <div className="CONTAINERCOMITE">
          <p className="HEADER-TEXT1">Agregar docentes</p>
          <p class="HEADER-TEXT2">Búsqueda de docentes </p>
          <div class="row">
            <div class="col-12 FILTRO-LISTAR-BUSCAR" >
                <p>Ingrese el nombre del docente</p>
                <div class="input-group">
                    <input size="12" type="text" value={search} class="form-control" name="search" placeholder="Nombre del docente" aria-label="serach" onChange={buscador}/>
                </div>
            </div>
          </div>

        <p class="HEADER-TEXT2 mt-5" >Lista de docentes no asignados</p>
        <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
        <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
        <div class = "row LISTAR-TABLE">
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
                  <tr key={asesor.idDocente}>
                      <td >{asesor.nombres + " " + asesor.apePat+ " " + asesor.apeMat}</td>
                      <td >{asesor.correo}</td>
                      <td>
                      <div class="LISTAR-TABLE-BOTON"> 
                      <button class=" btn btn-primary fw-bold" onClick={()=>seleccionarAsesor(asesor)}> <span>Seleccionar</span></button>
                      </div>                      
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

    <ModalPregunta
            isOpen={isOpenRegistro} 
            closeModal={closeRegistroModal}
            procedimiento = ""
            objeto="registrar a"
            elemento={asesorSeleccionado && asesorSeleccionado.nombres}
          >
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <Button class="btn  btn-success btn-lg" onClick={()=>peticionPost()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button class="btn btn-danger btn-lg"  onClick={closeRegistroModal}>Cancelar</Button>
            </div>
          </ModalPregunta>
          <ModalConfirmación
            isOpen={isOpenRegistroConf} 
            closeModal={closeRegistroConfModal}
            procedimiento= "registrado"
          >
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <Button class="btn btn-success btn-lg" onClick={()=>{navigate("../docente")}}>Entendido</Button>
            </div>
          </ModalConfirmación>

            <div class="row INSERTAR-BOTONES">                            
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button class="btn btn-primary fs-4 fw-bold CANCELAR" type="button" onClick={()=>{navigate("../docente")}}><span>Cancelar</span></button>
              </div>
          </div>
          
      </div>
  )
}
export default ListarDocentesNoEstan;