import React from 'react'
import {useState , useEffect} from "react";
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons  from "react-icons/ri";
import * as BsIcons from 'react-icons/bs';

function EntregablesParciales(){
  let navigate = useNavigate();
  const location = useLocation();
  const [currentPage,SetCurrentPage] = useState(0);
  const [search1, setSearch1] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const [dataE, setDataE] = useState([]);
  const [ent,setEnt]=useState([]);
  useEffect(() => {
    getDataE();
  }, []);
 /*
      var i=0;
      for(i=0;i<data.length;i++){
        if(data[i].estadoMasReciente==4 || data[i].estadoMasReciente==5){
            ent[i]=data[i];
        }
      }
      setEnt(ent);
      console.log(ent);
      */
  async function getData() {
        (async () => {
          const result = await axios(`https://localhost:7012/api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso=${location.state.idCurso}&idTipoEntregable=3&idAlumno=${location.state.idAlumno}`);
          //const result = await axios(`http://44.210.195.91/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno=${location.state.idAlumno}&idTipoEntregable=2`);
          setData(result.data);
          console.log(data);
          
          var i=0;
          for(i=0;i<data.length;i++){
            if(data[i].estadoMasReciente==4 || data[i].estadoMasReciente==5){
                ent[i]=data[i];
            }
          }
          setEnt(ent);
          console.log(ent);
      
        })();
  };
  async function getDataE() {
    (async () => {
      const result = await axios(`https://localhost:7012/api/Entregable/BuscarEntregableXId?idEntregable=4`);
      //const result = await axios(`http://44.210.195.91/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno=${location.state.idAlumno}&idTipoEntregable=2`);
      setDataE(result.data);
      //console.log(data);
    })();
  };
 
  const buscador1 = e=>{
    setSearch1(e.target.value);
  }
  let filtrado =[];

  if(!search1){//sin filtro
    filtrado=data;
}
else{

  if(search1)
  /*
  {(() => {
    switch(data.filter((dato)=>dato.estadoMasReciente)){
      case 1 : return  filtrado="Por Entregar";
      case 2: return filtrado="Enviado para retroalimentación";
      case 3 : return  filtrado="Con retroalimentación";
      case 4 : return  filtrado="Entregado a docente";
      case 5 : return  filtrado="Calificado por el docente";
        
        default: return  filtrado="Por Entregar";
    }
}) ()}
*/

  filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search1.toLocaleLowerCase())) ;
  //filtrado=data.filter((dato)=>dato.estadoMasReciente.includes(parseInt(search1))) ;
}
  filtrado = filtrado.slice(currentPage,currentPage+5);
  const nextPage = () =>{
    if(filtrado.length>=5) //VER CODIGO
      SetCurrentPage(currentPage+5);
  }
  const previousPage =() =>{
    if(currentPage>0)
      SetCurrentPage(currentPage-5);
  }
 
  return(
      <div className='CONTAINERASESOR'>
          <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
      <h1 className='HEADER-TEXT1'>Entregables Parciales</h1>
      <h2 className='HEADER-TEXT2'>Alumno - { location.state.apellidoPat }  {location.state.apellidoMat}, {location.state.nombres}</h2>
      <div class="col col-7 FILTRO-LISTAR-BUSCAR" >
            <p>Filtrar por nombre</p>
            <div class="input-group mb-2 ">
                <input size="10" type="text" value={search1} class="form-control" name="search1" placeholder="Nombre de Entregable" aria-label="serach" onChange={buscador1}/>
            </div>
          
        </div>
      <div>
      <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
      <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>

      <div class = "row LISTAR-TABLA">
      <div class=" col-12">
        <table className='table fs-6 '>
          <thead class >
            <tr class>
                <th style={{width: 50}}>Entregable</th>
                <th style ={{width: 275}}>Fecha Limite</th>
                
                <th style = {{width:100}}>Estado</th>
                <th style = {{width:100}}>Calificación</th>
                <th style = {{width:100}}>Historial</th>
            </tr>
          </thead>
          <tbody >
            {filtrado.map(dato => (
              <tr key={dato.idEntregable}>
      
                <td>
                  <button class="btn btn-lg navbar-toggle" onClick={() =>navigate("entregableParcialSeleccionado",{state:{idVersion:dato.idVersionAntigua,idAlumno: location.state.idAlumno,tituloDoc:dato.nombre,notaVersion: dato.notaVersionMasReciente,
    idEntregable: dato.idEntregable,estado:dato.estadoMasReciente,fechaE:dato.fechaSubida,fechaL:dato.fechaLimite, nombreEntregable:dato.tipoEntregable,comentarios:dato.comentarios,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoPat}})}>{dato.nombre}</button>
                </td>
                <td>
                  <button class="btn btn-lg navbar-toggle" onClick={() =>navigate("entregableParcialSeleccionado",{state:{idVersion:dato.idVersionAntigua,idAlumno: location.state.idAlumno,tituloDoc:dato.nombre,notaVersion: dato.notaVersionMasReciente,
    idEntregable: dato.idEntregable,estado:dato.estadoMasReciente,fechaE:dato.fechaSubida,fechaL:dato.fechaLimite, nombreEntregable:dato.tipoEntregable,comentarios:dato.comentarios,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoPat}})}>{dato.fechaLimite}</button>                    
                </td>  
                
                <td>
                {(() => {
                                      switch(dato.estadoMasReciente){
                                        case 1 : return <td class = "text-black">Por Entregar</td> ;
                                        case 2: return <td class = "text-primary">Enviado para retroalimentación</td> ;
                                        case 3 : return <td class = "text-success">Con retroalimentación</td> ;
                                        case 4 : return <td class = "text-primary">Entregado a docente</td> ;
                                        case 5 : return <td class = "text-success">Calificado por el docente</td> ;
                                          
                                          default: return <td class = "text-black">Por Entregar</td> ;
                                      }
                  }) ()}
                </td>
                <td> 
                  <button class="btn btn-lg navbar-toggle" onClick={() =>navigate("entregableParcialSeleccionado",{state:{idVersion:dato.idVersionAntigua,idAlumno: location.state.idAlumno,tituloDoc:dato.nombre,notaVersion: dato.notaVersionMasReciente,
    idEntregable: dato.idEntregable,estado:dato.estadoMasReciente,fechaE:dato.fechaSubida,fechaL:dato.fechaLimite, nombreEntregable:dato.tipoEntregable,comentarios:dato.comentarios,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoPat}})}>{dato.notaVersionMasReciente}</button>
                </td> 
                  <td>
                  <button class="btn BTN-ACCIONES"  onClick={() =>navigate("historialVersiones",{state:{idVersion:dato.idVersionAntigua,idAlumno: location.state.idAlumno,tituloDoc:dato.nombre,notaVersion: dato.notaVersionMasReciente,
    idEntregable: dato.idEntregable,estado:dato.estadoMasReciente,fechaE:dato.fechaSubida,fechaL:dato.fechaLimite, nombreEntregable:dato.tipoEntregable,comentarios:dato.comentarios,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoPat}})} > <FaIcons.FaBars/></button>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
     </div>
      </div>
  );
}
export default  EntregablesParciales;