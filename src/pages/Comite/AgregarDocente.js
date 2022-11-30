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

//http://34.195.33.246/api/
//http://34.195.33.246/
/*
const urlAs= "http://34.195.33.246/api/Docente/";
const urlEsp= "http://34.195.33.246/api/Especialidad/";
const urlAsXCurso="http://34.195.33.246/api/DocenteXCurso/";
*/
//http://34.195.33.246/api/Alumno/
const urlAs= "http://34.195.33.246/api/Docente/";
const urlEsp= "http://34.195.33.246/api/Especialidad/";
const urlAsXCurso="http://34.195.33.246/api/DocenteXCurso/";

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
    filtrado = as.filter((dato) =>{
      let a = dato.nombres + " " + dato.apePat + " " + dato.apeMat + " " + dato.correo
      console.log(a)
      return a.toLowerCase().includes(search.toLocaleLowerCase());
    } );
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
          peticionPost2();
          closeRegistroModal();
          openRegistroConfModal();
        }).catch(error =>{
          console.log(error.message);
        })
        petitionAs();
      }
      const peticionPost2=async()=>{
        console.log(idCursoGlobal);
        console.log(asesorSeleccionado.idUsuario);
        let idcom = idas+1;
        await axios.post("http://34.195.33.246/api/ComiteXCurso/PostComiteXCurso?idComiteTesis="+idcom+"&idCurso="+idCursoGlobal)
        .then(response=>{
          console.log(response.data);
        }).catch(error =>{
          console.log(error.message);
        })
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
          <h1>Agregar docentes</h1>
          <h2>Búsqueda de docentes </h2>
          <div class="row">
            <div class="col-8" >
                <p>Ingrese el nombre o correo del docente</p>
                <input size="12" type="search" value={search} class="form-control icon-search" name="search" placeholder="Nombre o correo del docente" aria-label="serach" onChange={buscador}/>
            </div>
          </div>

        <h2>Lista de docentes no asignados</h2>
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

            <div class="row">                            
              <div class="INSERTAR-BOTONES">
              <button class="btn CANCELAR" title='Cancelar' type="button" onClick={()=>{navigate("../docente")}}><span>Cancelar</span></button>
              </div>
          </div>
          
      </div>
  )
}
export default ListarDocentesNoEstan;