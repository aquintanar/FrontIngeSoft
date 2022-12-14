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

function AvancesSemanales(){
    let navigate = useNavigate();
    const location = useLocation();
    const [currentPage,SetCurrentPage] = useState(0);
    const [search1, setSearch1] = useState("");
    let [data, setData] = useState([]);
    useEffect(() => {
      getData();
    }, []);
    const [dataE, setDataE] = useState([]);
    useEffect(() => {
      getDataE();
    }, []);

 
    async function getData() {
      (async () => {
        const result = await axios(`http://34.195.33.246/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno=${location.state.idAlumno}&idTipoEntregable=1`);
        //const result = await axios(`http://44.210.195.91/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno=${location.state.idAlumno}&idTipoEntregable=1`);
        setData(result.data);
        console.log(data)
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
      filtrado=data;
  }
  else{

    if(search1)
    filtrado=data.filter((dato)=>dato.estadoEntregable.toLowerCase().includes(search1.toLocaleLowerCase())) ;
  }
    filtrado = filtrado.slice(currentPage,currentPage+4);
    const nextPage = () =>{
      if(filtrado.length>=currentPage) //VER CODIGO
        SetCurrentPage(currentPage+4);
    }
    const previousPage =() =>{
      if(currentPage>0)
        SetCurrentPage(currentPage-4);
    }
   
    return(
        <div className='CONTAINERASESOR'>
          <span>
        <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
        </span>
        <h1 className='HEADER-TEXT1'>Avances Semanales</h1>

        
        <h2 className='HEADER-TEXT2'>Alumno - { location.state.apellidoPat }  {location.state.apellidoMat}, {location.state.nombres}</h2>
        <div class="col col-7 FILTRO-LISTAR-BUSCAR" >
              <p>Ingresar Estado de Entregable</p>
              <div class="input-group mb-2 ">
                  <input size="10" type="text" value={search1} class="form-control" name="search1" placeholder="Estado" aria-label="serach" onChange={buscador1}/>
              </div>
            
          </div>
        <div className='ContenidoPrincipal'>
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
                <tr key={dato.idVersion}>
        
                  <td>
                    <button class="btn btn-lg navbar-toggle" onClick={() =>navigate("avanceSemanalSeleccionado",{state:{idAlumno:dato.idAlumno,nombres:dato.nombres,apellidoPat:dato.apePat,
               apellidoMaterno:dato.apeMat,tituloDoc:dato.documentosAlumno,linkDoc:dato.linkDoc,idEntregable:dato.fidEntregable,estado:dato.estadoEntregable,fechaE:dato.fechaSubida}})}>{dato.documentosAlumno}</button>
                  </td>
                  <td>
                    <button class="btn btn-lg navbar-toggle" onClick={() =>navigate("avanceSemanalSeleccionado",{state:{idAlumno:dato.idAlumno,nombres:dato.nombres,apellidoPat:dato.apePat,
               apellidoMaterno:dato.apeMat,tituloDoc:dato.documentosAlumno,linkDoc:dato.linkDoc,idEntregable:dato.fidEntregable,estado:dato.estadoEntregable,fechaE:dato.fechaSubida}})}>{dato.fechaAsesor}</button>                    
                  </td>  
                  <td> 
                    <button class="btn btn-lg navbar-toggle" onClick={() =>navigate("avanceSemanalSeleccionado",{state:{idAlumno:dato.idAlumno,nombres:dato.nombres,apellidoPat:dato.apePat,
               apellidoMaterno:dato.apeMat,tituloDoc:dato.documentosAlumno,linkDoc:dato.linkDoc,idEntregable:dato.fidEntregable,estado:dato.estadoEntregable,fechaE:dato.fechaSubida}})}>{dato.fechaSubida}</button>
                  </td> 
                  <td>
                  {(() => {
                                        switch(dato.estadoEntregable){
                                          case "Por Entregar" : return <td class = "text-black">Por Entregar</td> ;
                                          case "Enviado para retroalimentacion": return <td class = "text-primary">Enviado para retroalimentacion</td> ;
                                          case "Con retroalimentacion" : return <td class = "text-success">Con retroalimentacion</td> ;
                                          case "Entregado a docente" : return <td class = "text-primary">Entregado a docente</td> ;
                                          case "Calificado por el docente" : return <td class = "text-success">Calificado por el docente</td> ;
                                            
                                            default: return <td class = "text-black">Por Entregar</td> ;
                                        }
                    }) ()}
                  </td>

                    <td>
                    <button class="btn BTN-ACCIONES"> <FaIcons.FaBars/></button>
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
export default  AvancesSemanales;