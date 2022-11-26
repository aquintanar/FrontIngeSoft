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
/*
const urlAs= "http://34.195.33.246/api/Asesor/";
const urlEsp= "http://34.195.33.246/api/Especialidad/";
const urlAsXCurso="http://34.195.33.246/api/AsesorXCurso/";
*/
const urlAs= "https://localhost:7012/api/Asesor/";
const urlEsp= "https://localhost:7012/api/Especialidad/";
const urlAsXCurso="https://localhost:7012/api/AsesorXCurso/";

function ListarAsesoresNoEstan()  {
  let navigate = useNavigate();
  let idCursoGlobal = localStorage.getItem("idCurso");
  let idAsesorRef = 0;
  const [currentPage,SetCurrentPage] = useState(0);
  const [data, setData]=useState([]);
  const [selEsp, setSelEsp] = useState(0);
  const [tieneAlumn, setTieneAlum] = useState(0);
  const [observado, setObservado] = useState(0);
  const [search, setSearch] = useState("");
  const [as, setAs] = useState([]);
  const [esp, setEsp] = useState([]);
  const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
  const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();
  const [isOpenRegistro, openRegistroModal ,closeRegistroModal ] = useModal();
  const [isOpenRegistroConf, openRegistroConfModal ,closeRegistroConfModal ] = useModal();

  const [asesorXcurso, setAsesorXCurso] =useState({
    idCurso: 0,
    idAsesor: 0,
    cantAlumnos: 0
})

  let filtrado =[];
  const buscador = e=>{
      setSearch(e.target.value);
  }
  if(!search && !selEsp && !tieneAlumn && !observado){//sin filtro
    filtrado=as;
  }
  else{
    if(search && selEsp && tieneAlumn && observado){//ambos filtros
      filtrado=as.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
      filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ;
      filtrado=filtrado.filter((dato)=>dato.estaObservado===(observado===1?1:0)) ;
      if(tieneAlumn===1)
        filtrado=filtrado.filter((dato)=>dato.cantAsesorados>0) ;
      if(tieneAlumn===2)
        filtrado=filtrado.filter((dato)=>dato.cantAsesorados===0) ;
    }
    else{
      if(search && selEsp && tieneAlumn){
        filtrado=as.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
        filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ;
        if(tieneAlumn===1)
          filtrado=filtrado.filter((dato)=>dato.cantAsesorados>0) ;
        if(tieneAlumn===2)
          filtrado=filtrado.filter((dato)=>dato.cantAsesorados===0) ;
      }
      else if(selEsp && tieneAlumn && observado){
        filtrado=as.filter((dato)=>dato.idEspecialidad===selEsp) ;
        filtrado=filtrado.filter((dato)=>dato.estaObservado===(observado===1?1:0)) ;
        if(tieneAlumn===1)
          filtrado=filtrado.filter((dato)=>dato.cantAsesorados>0) ;
        if(tieneAlumn===2)
          filtrado=filtrado.filter((dato)=>dato.cantAsesorados===0) ;
      }
      else if(tieneAlumn && observado && search){
        filtrado=as.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
        filtrado=filtrado.filter((dato)=>dato.estaObservado===(observado===1?1:0)) ;
        if(tieneAlumn===1)
          filtrado=filtrado.filter((dato)=>dato.cantAsesorados>0) ;
        if(tieneAlumn===2)
          filtrado=filtrado.filter((dato)=>dato.cantAsesorados===0) ;
      }
      else if(observado && search && selEsp){
        filtrado=as.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
        filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ;
        filtrado=filtrado.filter((dato)=>dato.estaObservado===(observado===1?1:0)) ;
      }
      else{
        if(search && selEsp){
          filtrado=as.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
          filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ;
        }
        else if(search  && tieneAlumn ){
          filtrado=as.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
          if(tieneAlumn===1)
            filtrado=filtrado.filter((dato)=>dato.cantAsesorados>0) ;
          if(tieneAlumn===2)
            filtrado=filtrado.filter((dato)=>dato.cantAsesorados===0) ;

        }
        else if(search  && observado){
          filtrado=as.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
          filtrado=filtrado.filter((dato)=>dato.estaObservado===(observado===1?1:0)) ;
        }
        else if(selEsp && tieneAlumn ){
          filtrado=as.filter((dato)=>dato.idEspecialidad===selEsp) ;
          if(tieneAlumn===1)
            filtrado=filtrado.filter((dato)=>dato.cantAsesorados>0) ;
          if(tieneAlumn===2)
            filtrado=filtrado.filter((dato)=>dato.cantAsesorados===0) ;
          
        }
        else if(selEsp  && observado){
          filtrado=as.filter((dato)=>dato.idEspecialidad===selEsp) ;
          filtrado=filtrado.filter((dato)=>dato.estaObservado===(observado===1?1:0)) ;
        }
        else if(tieneAlumn && observado){
          filtrado=as.filter((dato)=>dato.estaObservado===(observado===1?1:0)) ;
          if(tieneAlumn===1)
            filtrado=filtrado.filter((dato)=>dato.cantAsesorados>0) ;
          if(tieneAlumn===2)
            filtrado=filtrado.filter((dato)=>dato.cantAsesorados===0) ;
          
        }
        else{
          if(selEsp)
            filtrado=as.filter((dato)=>dato.idEspecialidad===selEsp) ;
          if(search)//filtro por nombre
            filtrado=as.filter((dato)=>dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())) ;
          if(tieneAlumn){
            if(tieneAlumn===1)
             filtrado=as.filter((dato)=>dato.cantAsesorados>0) ;
            if(tieneAlumn===2)
              filtrado=as.filter((dato)=>dato.cantAsesorados===0) ;
          }
          if(observado)
          filtrado=as.filter((dato)=>dato.estaObservado===(observado===1?1:0)) ;
        }
      }
    }
  }

  const cambioSelectEspp =e=>{
      const valor = parseInt(e.target.value)
      setSelEsp(valor);
      console.log(valor)
    }
  const cambioTieneAlum =e=>{
      const valor = parseInt(e.target.value)
      setTieneAlum(valor)
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
      idAsesorRef = asesor.idAsesor;
      console.log(asesorSeleccionado.idUsuario);
      setAsesorXCurso({
        idCurso: idCursoGlobal,
        idAsesor: idAsesorRef,
        cantAlumnos: 0
        });
        openRegistroModal();
        
    }

    const peticionPost=async()=>{
        console.log(idCursoGlobal);
        console.log(asesorSeleccionado.idUsuario);        
        console.log(asesorXcurso);
        await axios.post(urlAsXCurso+"PostAsesorXCurso/",asesorXcurso)
        .then(response=>{
          console.log(asesorXcurso);
          console.log(response.data);
          closeRegistroModal();
          openRegistroConfModal();
        }).catch(error =>{
          console.log(error.message);
          console.log(asesorXcurso);
        })
        petitionAs();
      }
  

  filtrado = filtrado.slice(currentPage,currentPage+5);

  const [asesorSeleccionado, setAsesorSeleccionado]=useState({
      idUsuario: 0,
      nombres: '',
      apeMat: '',
      correo: '',
      codigoPUCP: '',
      imagen: '',
      maxAsesorados: 0,
      estaObservado: 0,
      estado: 1
  })

  const petitionAs=async()=>{
      await axios.get(urlAs+"ListAsesoresXIdCursoQueNoEstan?idCurso="+ idCursoGlobal)
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
      await axios.delete(urlAs+ "DeleteAsesor?idAsesor="+ asesorSeleccionado.idUsuario).then(response=>{
          petitionAs();
        closeDeleteModal();
        openConfirmModal();
      })
    }
    const cerrarPost=()=>{
        closeRegistroConfModal();
      }

  
  useEffect(()=>{
      petitionAs();
      petitionEsp();
  },[])

  return(
      <div className="CONTAINERCOMITE">
          <p className="HEADER-TEXT1">Agregar asesores</p>
          <p class="HEADER-TEXT2">Búsqueda de asesores </p>
          <div class="row">
            <div class="col-12 FILTRO-LISTAR-BUSCAR" >
                <p>Ingrese el nombre del asesor</p>
                <div class="input-group">
                    <input size="10" type="text" value={search} class="form-control" name="search" placeholder="Nombre del asesor" aria-label="serach" onChange={buscador}/>
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
              <div class="col-4 FILTRO-LISTAR" >
                <p> ¿Tiene asesorado?</p>
                <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioTieneAlum} >
                      <option key={0} value = {0}>Todos</option>
                      <option key={1} value = {1}>Sí</option>
                      <option key={2} value={2}>No</option>
                </select>
              </div>
              <div class="col-4 FILTRO-LISTAR" >
                <p> ¿Está observado?</p>
                <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioEstaObservado} >
                      <option key={0} value = {0}>Todos</option>
                      <option key={1} value = {1}>Sí</option>
                      <option key={2} value={2}>No</option>
                </select>
              </div>
          </div>

        <p class="HEADER-TEXT2 mt-5" >Lista de asesores no asignados</p>
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
                  <tr key={asesor.idUsuario}>
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
      isOpen={isOpenDeleteModal} 
      closeModal={closeDeleteModal}
      procedimiento = "eliminar"
      objeto="la especialidad"
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
              <Button class="btn btn-success btn-lg" onClick={()=>{navigate("../asesor")}}>Entendido</Button>
            </div>
          </ModalConfirmación>

            <div class="row INSERTAR-BOTONES">                            
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button class="btn btn-primary fs-4 fw-bold CANCELAR" type="button" onClick={()=>{navigate("../asesor")}}><span>Cancelar</span></button>
              </div>
          </div>
          
      </div>
  )
}
export default ListarAsesoresNoEstan;