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
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
const url= "http://34.195.33.246/api/Especialidad/";
const urlFacu= "http://34.195.33.246/api/Facultad/";
const urlEntregablesParciales = "http://34.195.33.246/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable" ; 
/*
const url= "http://44.210.195.91/api/Especialidad/";
const urlFacu= "http://44.210.195.91/api/Facultad/";
*/
function EntregablesParcialesTesis1()  {
  const location = useLocation();
    const url = "https://localhost:7012/";
    const [data, setData]=useState([]);
    const [curso,setCurso]=useState(0);
    const [entregables , SetEntregables] = useState([]);
    const [search, setSearch] = useState("");
    const [modalEliminar, setModalEliminar]=useState(false);
    const [currentPage,SetCurrentPage] = useState(0);
    const [estado,setEstado]=useState("");
    let navigate = useNavigate();
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
    
  const [rubrica, setRubrica] = useState({
    idRubrica: 0,
  
  });
  //Listar especialidades tabla--

  const getidCurso= async()=>{
    (async () => {
      const result = await axios(url+'api/Alumno/ListAlumnosXIdCurso?idCurso=1');
      //SetEntregablesParciales(result.data);
      let i = 0  ; 
      for ( i = 0 ; i < result.data.length ; i++){ 
            if(result.data[i].idAlumno == 1) setCurso(1);   
      }   

      const result2 = await axios(url+'api/Alumno/ListAlumnosXIdCurso?idCurso=3');
      //SetEntregablesParciales(result.data);
      let j = 0  ; 
      for ( j = 0 ; j < result2.data.length ; j++){ 
            if(result2.data[j].idAlumno == 1) setCurso(3);   
      }   
    })();
  }
  const peticionEntregables = async() => {
    (async () => {
      const result = await axios(url+'api/Alumno/ListAlumnosXIdCurso?idCurso=1');
      //SetEntregablesParciales(result.data);
      let i = 0  ; 
      for ( i = 0 ; i < result.data.length ; i++){ 
            if(result.data[i].idAlumno == 1) setCurso(1);   
      }   

      const result2 = await axios(url+'api/Alumno/ListAlumnosXIdCurso?idCurso=3');
      //SetEntregablesParciales(result.data);
      let j = 0  ; 
      for ( j = 0 ; j < result2.data.length ; j++){ 
            if(result2.data[j].idAlumno == 1) setCurso(3);   
      }   
    })();
    const urlEntregable  = url+'api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso='+location.state.idCurso+'&idTipoEntregable='+location.state.idTipoEntregable+'&idAlumno='+location.state.idAlumno;
    const response = await fetch(urlEntregable)
    const data = await response.json()
    console.log(data)
    SetEntregables(data)
    setData(data)
}
const getEntregableID = async () => {
  const urlEntregableXid = url+ 'api/Entregable/BuscarEntregableXId?idEntregable=4'
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
  filtrado=filtrado.slice(currentPage,currentPage+5);
  const nextPage = () =>{
    if(filtrado.length>=5) //VER CODIGO
      SetCurrentPage(currentPage+5);
  }
  const previousPage =() =>{
    if(currentPage>0)
      SetCurrentPage(currentPage-5);
  }
  useEffect(()=>{
    peticionEntregables();
    getEntregableID();
 },[])
 const crearVersion =async(idVersion,idEntregable,nombre,linkDoc,notaVersion,estadoMasReciente,fechaSubida,fechaLimite,tipoEntregable,comentarios)=>{
  let idRubri = 0;
  (async () => {
    const result2 = await axios(url+`api/Rubrica/GetRubricaXIdEntregable?idEntregable=${idEntregable}`);
    setRubrica(result2.data);
    
   
    setVersionSeleccionada({
      fidEntregable: idEntregable,
      fidEstadoEntregable:1,
      fidAlumno: 1
  });

   if(result2.data[0]){
     idRubri=result2.data[0].idRubrica;
   }
    navigate("EntregableParcialSeleccionadoTesis1",{state:{idVersion:idVersion,idAlumno: location.state.idAlumno,tituloDoc:nombre,linkDoc:linkDoc,notaVersion: notaVersion,
      idEntregable: idEntregable,estado:estadoMasReciente,fechaE:fechaSubida,fechaL:fechaLimite, nombreEntregable:tipoEntregable,comentarios:comentarios,versionCreada: versionSeleccionada,idRubrica : idRubri}})  })();
 }


  return (      
    <div class=" CONTAINERADMIN">   
    <span>
      <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
    </span>
      <p class="HEADER-TEXT1">{location.state.nombreEntregable}</p>

      
        
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
                <tr style={{cursor:'pointer'}} onClick={() =>crearVersion(entregables.idVersionAntigua,entregables.idEntregable,entregables.nombre,entregables.linkDoc,entregables.notaVersionMasReciente,entregables.estadoMasReciente,entregables.fechaModificacionMasReciente,entregables.fechaLimite,entregables.tipoEntregable,entregables.comentarios)} key={entregables.idEntregable}>
                    <td>{entregables.nombre}</td>
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
                                          case 6 : return <td class = "text-success">Entregado a Jurado</td> ;
                                          case 7 : return <td class = "text-success">Calificado por el jurado</td> ;  
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

export default EntregablesParcialesTesis1;

