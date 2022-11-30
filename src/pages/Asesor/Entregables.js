import React from 'react'
import './proponerTemaAsesor.css';
import {useState , useEffect} from "react";
import ModalBuscarAsesor from './ModalBuscarAsesor';
import {ModalConfirmación, ModalPregunta} from '../../components/Modals';
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons  from "react-icons/ri";
import * as BsIcons from 'react-icons/bs';

function Entregables(){
  let navigate = useNavigate();
  const location = useLocation();
  const [currentPage,SetCurrentPage] = useState(0);
  const [estadoEnt, setEstadoEnt] = useState([]);
  const [search1, setSearch1] = useState("");
  let [data, setData] = useState([]);
  const [entregable,setEntregable]=useState([]);
  const [fil, setFil] = useState(0);
  useEffect(() => {
    getData();
    getDataE();
    petitionEstadoEntregable();
  }, []);
  const [dataE, setDataE] = useState([]);


  async function getData() {
    (async () => {
      const result = await axios(`https://localhost:7012/api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso=${location.state.idCurso}&idTipoEntregable=2&idAlumno=${location.state.idAlumno}`);
      //const result = await axios(`http://44.210.195.91/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno=${location.state.idAlumno}&idTipoEntregable=2`);
      setData(result.data);
      console.log(data);
      var i=0;
        var j=0;
        for(i=0;i<result.data.length;i++){
        if(result.data[i].responsableSubir=="Asesor"){
            entregable[j]=result.data[i];
            j++;
          }
        } 
    })();
  };
  async function getDataE() {
    (async () => {
      const result = await axios(`https://localhost:7012/api/Entregable/BuscarEntregableXId?idEntregable=4`);
      //const result = await axios(`http://44.210.195.91/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno=${location.state.idAlumno}&idTipoEntregable=2`);
      setDataE(result.data);
      console.log(data)
    })();
  };
 //Controla cambio en combo box--
const cambioSelect =e=>{
  const valor = parseInt(e.target.value)
  setFil(valor)
}

//Listar facultades combo box--
const petitionEstadoEntregable=async()=>{
  await axios.get("https://localhost:7012/api/EstadoEntregable/ListEstadoEntregable")
  .then(response=>{
    setEstadoEnt(response.data);
  }).catch(error =>{
    console.log(error.message);
  })
}
  const buscador1 = e=>{
    setSearch1(e.target.value);
  }
  let filtrado =[];

  if(!search1 && !fil){//sin filtro
    filtrado=entregable;
  }
  else{

    if(search1 && fil){
      filtrado=entregable.filter((dato)=>dato.estadoMasReciente===fil);
      filtrado=entregable.filter((dato)=>dato.nombre.toLowerCase().includes(search1.toLocaleLowerCase()));
    }
    if(fil)//filtro por facultad
      filtrado=entregable.filter((dato)=>dato.estadoMasReciente===fil);
    if(search1)
      filtrado=entregable.filter((dato)=>dato.nombre.toLowerCase().includes(search1.toLocaleLowerCase()));
  
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
      <h1 className='HEADER-TEXT1'>Entregables</h1>
      <h2 className='HEADER-TEXT2'>Alumno - { location.state.apellidoPat }  {location.state.apellidoMat}, {location.state.nombres}</h2>
      <div class="row">
      <div class="col col-7 FILTRO-LISTAR-BUSCAR" >
            <p>Filtrar por  Nombre de Entregable</p>
            <div class="input-group mb-2 ">
                <input size="10" type="text" value={search1} class="form-control" name="search1" placeholder="Nombre" aria-label="serach" onChange={buscador1}/>
            </div>
          
        </div>
      <div>
      <div class="col col-5 FILTRO-LISTAR" >
            <p>Filtrar por Estado</p>
            <select select class="form-select" aria-label="Default select example"  onChange= {cambioSelect} >  
                 <option selected value = "0">Todos</option>
                {estadoEnt.map(elemento=>(
                  <option key={elemento.idEstadoEntregable} value={elemento.idEstadoEntregable}>{elemento.nombre}</option>  
                ))}
            </select>
        </div>
      </div>
      <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
      <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>

      <div class = "row LISTAR-TABLA">
      <div class=" col-12">
        <table className='table fs-6 '>
          <thead class >
            <tr class>
                <th style={{width: 50}}>Entregable</th>
                <th style ={{width: 275}}>Fecha de Entrega Asesor</th>
                <th style = {{width:100}}>Fecha de Entrega</th>
                <th style = {{width:100}}>Estado</th>
                <th style = {{width:100}}>Historial</th>
            </tr>
          </thead>
          <tbody >
            {filtrado.map(dato => (
              <tr key={dato.idEntregable}>
      
                <td>
                  <button class="btn btn-lg navbar-toggle" onClick={() =>navigate("entregableSeleccionado",{state:{idVersion:dato.idVersionAntigua,idAlumno: location.state.idAlumno,tituloDoc:dato.nombre,notaVersion: dato.notaVersionMasReciente,
    idEntregable: dato.idEntregable,estado:dato.estadoMasReciente,fechaE:dato.fechaSubida,fechaL:dato.fechaLimite, nombreEntregable:dato.tipoEntregable,comentarios:dato.comentarios,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoPat,fechaPresentacionAlumno:dato.fechaEntregaAsesor}})}>{dato.nombre}</button>
                </td>
                <td>
                  <button class="btn btn-lg navbar-toggle" onClick={() =>navigate("entregableSeleccionado",{state:{idVersion:dato.idVersionAntigua,idAlumno: location.state.idAlumno,tituloDoc:dato.nombre,notaVersion: dato.notaVersionMasReciente,
    idEntregable: dato.idEntregable,estado:dato.estadoMasReciente,fechaE:dato.fechaSubida,fechaL:dato.fechaLimite, nombreEntregable:dato.tipoEntregable,comentarios:dato.comentarios,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoPat,fechaPresentacionAlumno:dato.fechaEntregaAsesor}})}>{dato.fechaEntregaAsesor}</button>                    
                </td>  
                <td> 
                  <button class="btn btn-lg navbar-toggle" onClick={() =>navigate("entregableSeleccionado",{state:{idVersion:dato.idVersionAntigua,idAlumno: location.state.idAlumno,tituloDoc:dato.nombre,notaVersion: dato.notaVersionMasReciente,
    idEntregable: dato.idEntregable,estado:dato.estadoMasReciente,fechaE:dato.fechaSubida,fechaL:dato.fechaLimite, nombreEntregable:dato.tipoEntregable,comentarios:dato.comentarios,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoPat,fechaPresentacionAlumno:dato.fechaEntregaAsesor}})}>{dato.fechaSubida}</button>
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
                  <button class="btn BTN-ACCIONES"  onClick={() =>navigate("historialVersiones",{state:{idVersion:dato.idVersionAntigua,idAlumno: location.state.idAlumno,tituloDoc:dato.nombre,notaVersion: dato.notaVersionMasReciente,
    idEntregable: dato.idEntregable,estado:dato.estadoMasReciente,fechaE:dato.fechaSubida,fechaL:dato.fechaLimite, nombreEntregable:dato.tipoEntregable,comentarios:dato.comentarios,nombres:location.state.nombres,apellidoPat:location.state.apellidoPat,apellidoMaterno:location.state.apellidoPat,fechaPresentacionAlumno:dato.fechaEntregaAsesor}})} > <FaIcons.FaBars/></button>
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