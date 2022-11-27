import React, {useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Comite.css'
import "../../stylesheets/General.css";
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

function ListarAsesores()  {
  let idCursoGlobal = localStorage.getItem("idCurso");    
  let idAsesorRef = 0;
  let navigate = useNavigate();
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
      setSelEsp(valor)
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
        openDeleteModal();
    }
    
  

  filtrado = filtrado.slice(currentPage,currentPage+5);

  const [asesorSeleccionado, setAsesorSeleccionado]=useState({
      idAsesor: 0,
      maxAsesorados: 0,
      cantAsesorados: 0,
      estaObservado: 0,
      nombres: '',
      apePat: '',
      apeMat: '',
      correo: '',
      codigoPucp: '',
      imagen: ''
  })

  const petitionAs=async()=>{
      await axios.get(urlAs+"ListAsesoresXIdCurso?idCurso="+idCursoGlobal)
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
      await axios.delete(urlAsXCurso+ "DeleteAsesorXCurso?idAsesor="+ asesorSeleccionado.idAsesor + "&idCurso=" + idCursoGlobal).then(response=>{
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
          <h1> Gestión de Asesores</h1>
          <h2>Búsqueda de asesores </h2>

          <div class="row">

            <div class="col-7 " >
                <p>Ingrese el nombre del asesor</p>
                <div class="input-group">
                    <input size="10" type="search" value={search} class="form-control icon-search" name="search" placeholder="Nombre del asesor" aria-label="serach" onChange={buscador}/>
                </div>
            </div>

            <div class="col-5 " >
                <p>Seleccione especialidad</p>
                <select select class="form-select " aria-label="Default select example" onChange= {cambioSelectEspp}>
                    <option selected value = "0">Todos</option>
                    {esp.map(elemento=>(
                      <option key={elemento.idEspecialidad} value={elemento.idEspecialidad}>{elemento.nombre}</option>  
                    ))} 
                </select>
            </div>
          </div>   

          <div class="row">           
              <div class="col-4" >
                <p> ¿Tiene asesorado?</p>
                <select select class="form-select " aria-label="Default select example" onChange= {cambioTieneAlum} value ={tieneAlumn}>
                      <option key={0} value = {0}>Todos</option>
                      <option key={1} value = {1}>Si</option>
                      <option key={2} value={2}>No</option>
                </select>
              </div>

              <div class="col-4 " >
                <p> ¿Está observado?</p>
                <select select class="form-select " aria-label="Default select example" onChange= {cambioEstaObservado} value ={observado}>
                      <option key={0} value = {0}>Todos</option>
                      <option key={1} value = {1}>Si</option>
                      <option key={2} value={2}>No</option>
                </select>
              </div>
          </div>

        <h2>Lista de asesores en el curso</h2>
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
                      <td >{asesor.nombres + " " + asesor.apePat+ " " + asesor.apeMat}</td>
                      <td >{asesor.correo}</td>
                      <td>
                      <button class="btn BTN-ACCIONES" onClick={()=>{navigate("DatosAsesor/"+asesor.idAsesor)}}> <BsIcons.BsEye  /></button>
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
              <button className='btn btn-primary fs-4 fw-bold mb-3 ' onClick={()=>{navigate("AgregarAsesor")}}> Agregar asesor</button>
          </div>
          
      </div>
  )
}
export default ListarAsesores;