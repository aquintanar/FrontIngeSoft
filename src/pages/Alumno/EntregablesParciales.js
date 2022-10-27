import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {  Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Administrador.css'
import useModal from '../../hooks/useModals';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import * as BsIcons from 'react-icons/bs';

const url= "https://localhost:7012/api/Especialidad/";
const urlFacu= "https://localhost:7012/api/Facultad/";
const urlEntregablesParciales = "https://localhost:7012/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable" ; 
/*
const url= "http://44.210.195.91/api/Especialidad/";
const urlFacu= "http://44.210.195.91/api/Facultad/";
*/
function EntregablesParciales()  {
    const [data, setData]=useState([]);
    const [entregables , SetEntregables] = useState([]);
    const [search, setSearch] = useState("");
    const [modalEliminar, setModalEliminar]=useState(false);
    const [currentPage,SetCurrentPage] = useState(0);
    let navigate = useNavigate();
    const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
    const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();
    //objeto Facultad--
    const [facultadSeleccionada, setFacultadSeleccionada]=useState({
      idFacultad: '',
      nombre: '',
      descripcion: '',
      foto: null,
      estado: ''
    })
  //Listar especialidades tabla--
  const peticionEntregables = async() => {
    const idAlumno = 1 
    const idTipoEntregable = 2 
    const urlEntregable  = 'https://localhost:7012/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+idTipoEntregable
    const response = await fetch(urlEntregable)
    const data = await response.json()
    console.log(data)
    SetEntregables(data)
    setData(data)
    // const urlEntregableXid = 'https://localhost:7012/api/Entregable/BuscarEntregableXId?idEntregable='+data.fidEntregable
    // const response2 = await fetch (urlEntregableXid)
    // const data2 = await response2.json()
    // console.log(data2)
}
const getEntregableID = async () => {
  const urlEntregableXid = 'https://localhost:7012/api/Entregable/BuscarEntregableXId?idEntregable=4'
  const response = await fetch(urlEntregableXid)
  const data = await response.json()
  console.log(data)
}

    let filtrado =[];

  if(!search){//sin filtro
    filtrado=data;
  }
  else{
    if(search){//ambos filtros
      filtrado=data.filter((dato)=>dato.descripcion.toLowerCase().includes(search.toLocaleLowerCase())) ;
    }
    if(search)//filtro por nombre
      filtrado=data.filter((dato)=>dato.descripcion.toLowerCase().includes(search.toLocaleLowerCase())) ;
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
  useEffect(()=>{
    peticionEntregables();
    getEntregableID();
 },[])
  return (      
    <div class=" CONTAINERADMIN">   
    <span>
      <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
    </span>
      <p class="HEADER-TEXT1">Entregables Parciales</p>

      
        
      <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
      <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
      <div class = "row   LISTAR-TABLA">
        <div class=" col-12  ">
          <table className='table fs-6 '>
            <thead >
              <tr class>
                  <th style={{width: 100}}>Entregable</th>
                  <th style={{width:170}}>Fecha límite</th>
                  <th style={{width:170}}>Fecha de entrega asesor</th>
                  <th style={{width:170}}>Estado</th>
                  <th style={{width:50}}>Historial</th>
              </tr>
            </thead>
            <tbody >
              {filtrado.map(entregables => (
                <tr key={entregables.TipoEntregable}>
                    <td type = 'Button' onClick={() =>navigate("entregableParcialSeleccionado",{state:{idAlumno:entregables.idAlumno,nombres:entregables.nombres,apellidoPat:entregables.apePat,
               apellidoMaterno:entregables.apeMat,tituloDoc:entregables.documentosAlumno,linkDoc:entregables.linkDoc,idEntregable:entregables.fidEntregable,estado:entregables.estadoEntregable,fechaE:entregables.fechaSubida}})}>{entregables.TipoEntregable}</td>
                    <td>{entregables.fechaLim}</td>
                    <td>{entregables.fechaAsesor}</td>
                    <td>    
                                    {(() => {
                                        switch(entregables.estadoEntregable){
                                            case "Calificado por el docente" : return <td class = "text-success">{entregables.estadoEntregable}</td> ;
                                            case "Rechazado" : return <td class = "text-danger">{entregables.estadoEntregable}</td> ;
                                            default: return <td class = "text-warning">{entregables.estadoEntregable}</td> ;
                                        }
                                    }) ()}
                    </td>
                    <td>Ver Historial</td>                    
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>              
  )
}

export default EntregablesParciales;

