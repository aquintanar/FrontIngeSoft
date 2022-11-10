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
    const [curso,setCurso]=useState(0);
    const [entregables , SetEntregables] = useState([]);
    const [search, setSearch] = useState("");
    const [modalEliminar, setModalEliminar]=useState(false);
    const [currentPage,SetCurrentPage] = useState(0);
    const [estado,setEstado]=useState("");
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
    const [versionSeleccionada, setVersionSeleccionada]=useState({
      idVersion: 0,
      linkDoc: '',
      entregable: {
      fidEntregable:1 
    },
      estadoEntregable: {
      fidEstadoEntregable:1 
    },
    documentosAlumno: '',
    documentosRetroalimentación: '',
    alumno: {
      fidAlumno:1 
    }
    })
  //Listar especialidades tabla--

  const getidCurso= async()=>{
    (async () => {
      const result = await axios('https://localhost:7012/api/Alumno/ListAlumnosXIdCurso?idCurso=1');
      //SetEntregablesParciales(result.data);
      let i = 0  ; 
      for ( i = 0 ; i < result.data.length ; i++){ 
            if(result.data[i].idAlumno == 1) setCurso(1);   
      }   

      const result2 = await axios('https://localhost:7012/api/Alumno/ListAlumnosXIdCurso?idCurso=3');
      //SetEntregablesParciales(result.data);
      let j = 0  ; 
      for ( j = 0 ; j < result2.data.length ; j++){ 
            if(result2.data[j].idAlumno == 1) setCurso(3);   
      }   
    })();
  }
  const peticionEntregables = async() => {
    (async () => {
      const result = await axios('https://localhost:7012/api/Alumno/ListAlumnosXIdCurso?idCurso=1');
      //SetEntregablesParciales(result.data);
      let i = 0  ; 
      for ( i = 0 ; i < result.data.length ; i++){ 
            if(result.data[i].idAlumno == 1) setCurso(1);   
      }   

      const result2 = await axios('https://localhost:7012/api/Alumno/ListAlumnosXIdCurso?idCurso=3');
      //SetEntregablesParciales(result.data);
      let j = 0  ; 
      for ( j = 0 ; j < result2.data.length ; j++){ 
            if(result2.data[j].idAlumno == 1) setCurso(3);   
      }   
    })();
    const idAlumno = 1 
    const idTipoEntregable = 2 
    const urlEntregable  = 'https://localhost:7012/api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso='+1+'&idTipoEntregable='+2+'&idAlumno='+1;
    const urlEntregable2  = 'https://localhost:7012/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+idTipoEntregable;
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
 const crearVersion =async(idVersion,idEntregable,nombre,linkDoc,notaVersion,estadoMasReciente,fechaSubida,fechaLimite,tipoEntregable,comentarios)=>{

    setVersionSeleccionada({
      fidEntregable: idEntregable,
      fidEstadoEntregable:1,
      fidAlumno: 1
  });

    navigate("entregableParcialSeleccionado",{state:{idVersion:idVersion,idAlumno:1,tituloDoc:nombre,linkDoc:linkDoc,notaVersion: notaVersion,
      idEntregable: idEntregable,estado:estadoMasReciente,fechaE:fechaSubida,fechaL:fechaLimite, nombreEntregable:tipoEntregable,comentarios:comentarios,versionCreada: versionSeleccionada}})
 }


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
                  <th style={{width:170}}>Fecha de entrega al asesor</th>
                  <th style={{width:170}}>Estado</th>
                  <th style={{width:50}}>Historial</th>
              </tr>
            </thead>
            <tbody >
              {filtrado.map(entregables => (
                <tr key={entregables.idEntregable}>
                    <td type = 'Button' onClick={() =>crearVersion(entregables.idVersion,entregables.idEntregable,entregables.nombre,entregables.linkDoc,entregables.notaVersion,entregables.estadoMasReciente,entregables.fechaSubida,entregables.fechaLimite,entregables.tipoEntregable,entregables.comentarios)}>{entregables.nombre}</td>
                    <td>{entregables.fechaLimite}</td>
                    <td>{entregables.fechaEntregaAsesor} </td>
                    <td>  
                           {(() => {
                                        switch(entregables.estadoMasReciente){
                                          case 1 : return <td class = "text-black">Por Entregar</td> ;
                                          case 2 : return <td class = "text-primary">Enviado para retroalimentacion</td> ;
                                          case 3 : return <td class = "text-success">Con retroalimentacion</td> ;
                                          case 4 : return <td class = "text-primary">Entregado a docente</td> ;
                                            case 5 : return <td class = "text-success">Calificado por el docente</td> ;
                                            
                                            default: return <td class = "text-black">Por Entregar</td> ;
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

