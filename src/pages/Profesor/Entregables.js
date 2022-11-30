import React from 'react'
import {useState , useEffect} from "react";
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';

function Entregables(){
  let navigate = useNavigate();
  const location = useLocation();
  const [currentPage,SetCurrentPage] = useState(0);
  const [search1, setSearch1] = useState("");
  const [data, setData] = useState([]);
  const [entregable,setEntregable]=useState([]);
  const [entregableSA,setEntregableSA]=useState([]);
  const [dataE, setDataE] = useState([]);
  useEffect(() => {
    getData();
    getDataE();
  }, []);
  

  const getData=async()=> {
    (async () => {
      const result = await fetch(`http://34.195.33.246/api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso=${location.state.idCurso}&idTipoEntregable=2&idAlumno=${location.state.idAlumno}`);
      //const result = await axios(`http://44.210.195.91/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno=${location.state.idAlumno}&idTipoEntregable=2`);
      const dataEnt= await result.json();
      setData(dataEnt);
      console.log(data)
      var i=0;
      var j=0;var n=0;
      for(i=0;i<dataEnt.length;i++){
        if(dataEnt[i].estadoMasReciente==4 || dataEnt[i].estadoMasReciente==5  && dataEnt[i].responsableEvaluar=="Docente"){
            entregable[j]=dataEnt[i];
            j++;
        }
        if(dataEnt[i].responsableEvaluar=="Docente" && dataEnt[i].responsableSubir=="null"){
          entregableSA[n]=dataEnt[i];
          n++;
      }
      }
      setEntregable(entregable);
      setEntregableSA(entregableSA);
      console.log(entregable);
    })();
  };
  async function getDataE() {
    (async () => {
      const result = await axios(`http://34.195.33.246/api/Entregable/BuscarEntregableXId?idEntregable=4`);
      //const result = await axios(`http://44.210.195.91/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno=${location.state.idAlumno}&idTipoEntregable=2`);
      setDataE(result.data);
      console.log(data)
    })();
  };
 
  const buscador1 = e=>{
    setSearch1(e.target.value);
  }
  
  let filtrado =[];

  if(!search1){//sin filtro
    filtrado=entregable.concat(entregableSA);
  }
  else{
 
    filtrado=entregable.concat(entregableSA).filter((dato)=>dato.nombre.toLowerCase().includes(search1.toLocaleLowerCase()));
  
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
          <h1 >Entregables</h1>
          <h2 >Alumno - { location.state.apellidoPat }  {location.state.apellidoMat}, {location.state.nombres}</h2>
          <div class="col col-7" >
            <p>Ingresar nombre del entregable</p>
            <input size="10" type="search" value={search1} class="form-control icon-search" name="search1" placeholder="Nombre del entregable" aria-label="serach" onChange={buscador1}/>
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
                  <button class="btn btn-lg navbar-toggle" onClick={() =>navigate("entregableSeleccionado",{state:{idVersion:dato.idVersionAntigua,idAlumno: location.state.idAlumno,tituloDoc:dato.nombre,notaVersion: dato.notaVersionMasReciente,
    idEntregable: dato.idEntregable,estado:dato.estadoMasReciente,fechaE:dato.fechaSubida,fechaL:dato.fechaLimite, nombreEntregable:dato.tipoEntregable,comentarios:dato.comentarios,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoPat,fechaPresentacionAlumno:dato.fechaPresentacionAlumno}})}>{dato.nombre}</button>
                </td>
                <td>
                  <button class="btn btn-lg navbar-toggle" onClick={() =>navigate("entregableSeleccionado",{state:{idVersion:dato.idVersionAntigua,idAlumno: location.state.idAlumno,tituloDoc:dato.nombre,notaVersion: dato.notaVersionMasReciente,
    idEntregable: dato.idEntregable,estado:dato.estadoMasReciente,fechaE:dato.fechaSubida,fechaL:dato.fechaLimite, nombreEntregable:dato.tipoEntregable,comentarios:dato.comentarios,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoPat,fechaPresentacionAlumno:dato.fechaPresentacionAlumno}})}>{dato.fechaLimite}</button>                    
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
                  <button class="btn btn-lg navbar-toggle" onClick={() =>navigate("entregableSeleccionado",{state:{idVersion:dato.idVersionAntigua,idAlumno: location.state.idAlumno,tituloDoc:dato.nombre,notaVersion: dato.notaVersionMasReciente,
    idEntregable: dato.idEntregable,estado:dato.estadoMasReciente,fechaE:dato.fechaSubida,fechaL:dato.fechaLimite, nombreEntregable:dato.tipoEntregable,comentarios:dato.comentarios,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoPat,fechaPresentacionAlumno:dato.fechaPresentacionAlumno}})}>
                  {dato.notaVersionMasReciente==="null" ?  "No tiene" : dato.notaVersionMasReciente}
                  </button>
                </td> 
                <td>
                    <button class="btn BTN-ACCIONES" title='Visualizar historial de entregable'  onClick={() =>navigate("historialVersiones",{state:{idVersion:dato.idVersionAntigua,idAlumno: location.state.idAlumno,tituloDoc:dato.nombre,notaVersion: dato.notaVersionMasReciente,
      idEntregable: dato.idEntregable,estado:dato.estadoMasReciente,fechaE:dato.fechaSubida,fechaL:dato.fechaLimite, nombreEntregable:dato.tipoEntregable,comentarios:dato.comentarios,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoPat,fechaPresentacionAlumno:dato.fechaPresentacionAlumno}})} > <FaIcons.FaBars/></button>
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
export default  Entregables;