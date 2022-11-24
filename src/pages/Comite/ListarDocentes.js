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
const urlAs= "https://localhost:7012/api/Docente/";
const urlEsp= "https://localhost:7012/api/Especialidad/";
const urlAsXCurso="https://localhost:7012/api/DocenteXCurso/";

function ListarDocentes()  {
  let idCursoGlobal = localStorage.getItem("idCurso");    
  let idAsesorRef = 0;
  let navigate = useNavigate();
  const [currentPage,SetCurrentPage] = useState(0);
  const [selEsp, setSelEsp] = useState(0);
  const [observado, setObservado] = useState(0);
  const [search, setSearch] = useState("");
  const [as, setAs] = useState([]);
  const [esp, setEsp] = useState([]);
  const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
  const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();

  let filtrado =[];
  const buscador = e=>{
      setSearch(e.target.value);
  }
  if(!search && !selEsp){//sin filtro
    filtrado=as;
  }
  else{
    if(search && selEsp){//ambos filtros
      filtrado=as.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
      filtrado=as.filter((dato)=>dato.fidEspecialidad===selEsp) ;
    }
    filtrado=as.filter((dato)=>dato.fidEspecialidad===selEsp) ;
    if(search)//filtro por nombre
      filtrado=as.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
  }

  const cambioSelectEspp =e=>{
      const valor = parseInt(e.target.value)
      setSelEsp(valor)
    }
  const cambioEstaObservado =e=>{
      const valor = parseInt(e.target.value)
      setObservado(valor)
  }

  const nextPage = () =>{
        if(filtrado.length>=currentPage) //VER CODIGO
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
      idDocente: 0,
      nombres: '',
      apePat: '',
      apeMat: '',
      correo: '',
      codigoPUCP: '',
      imagen: '',
      contrasena: '',
      idEspecialidad: '',
      nombre: '',
      descripcion: '',
      idFacultad: ''
  })

  const petitionAs=async()=>{
      await axios.get(urlAs+"ListDocentesXIdCurso?idCurso="+idCursoGlobal)
      .then(response=>{
      setAs(response.data);
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

  
    const peticionDelete=async()=>{
      console.log(asesorSeleccionado);
      console.log(idCursoGlobal);
      await axios.delete(urlAsXCurso+ "DeleteDocenteXCurso?idDocente="+ asesorSeleccionado.idDocente + "&idCurso=" + idCursoGlobal).then(response=>{
        petitionAs();
        closeDeleteModal();
        openConfirmModal();
      })      
    }

  
  useEffect(()=>{
      petitionAs();
      petitionEsp();
  },[])

  return(
      <div className="CONTAINERCOMITE">
          <h1 className="HEADER-TEXT1">Docentes en el curso</h1>
          <div class="row">
            <div class="col-12 FILTRO-LISTAR-BUSCAR" >
                <p>Ingrese el nombre del docente</p>
                <div class="input-group">
                    <input size="10" type="text" value={search} class="form-control" name="search" placeholder="Nombre del curso" aria-label="serach" onChange={buscador}/>
                </div>
            </div>
            <div class="col-4 FILTRO-LISTAR" >
                <p>Seleccione especialidad</p>
                <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelectEspp}>
                    <option selected value = "0">Todos</option>
                    {esp.map(elemento=>(
                      <option key={elemento.idEspecialidad} value={elemento.idEspecialidad}>{elemento.nombre}</option>  
                    ))} 
                </select>
              </div>
          </div>

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
                  <tr key={asesor.idDocente}>
                      <td >{asesor.nombres + " " + asesor.apeMat}</td>
                      <td >{asesor.correo}</td>
                      <td>
                      <button class="btn BTN-ACCIONES" onClick={()=>{navigate("DatosDocente/"+asesor.idDocente)}}> <FaIcons.FaEdit /></button>
                      <button class=" btn BTN-ACCIONES" onClick={()=>seleccionarAsesor(asesor)}> <BootIcons.BsTrash /></button>
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

          <div className='d-grid gap-2 d-md-flex justify-content-md-end LISTAR-ESPECIALIDADES-BOTON '>
              <button className='btn btn-primary fs-4 fw-bold mb-3 ' onClick={()=>{navigate("AgregarDocente")}}> Agregar docente</button>
          </div>
          
      </div>
  )
}
export default ListarDocentes;