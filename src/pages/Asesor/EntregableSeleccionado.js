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
import * as BsIcons from 'react-icons/bs';
import '../../stylesheets/Asesor.css'
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as RiIcons  from "react-icons/ri";

function EntregableSeleccionado(){
    let navigate = useNavigate();
    const location = useLocation();
      const [data, setData] = useState([]);
    useEffect(() => {
      getData();
    }, []);
    const handleChange=e=>{
     
    }
    async function getData() {
      (async () => {
        const result = await axios(`https://localhost:7012/api/DetalleRubrica/ListDetalleRubricaXIdEntregable?idEntregable=${location.state.idEntregable}`);
        //const result = await axios(`http://44.210.195.91/api/DetalleRubrica/ListDetalleRubricaXIdEntregable?idEntregable=${location.state.idEntregable}`);
        setData(result.data);
        console.log(data)
      })();
    };


    return(
        <div className='CONTAINERASESOR'>
        <a onClick={() =>navigate(-1)} className="btn btn-lg " role="button" aria-pressed="true"><RiIcons.RiArrowGoBackFill/> </a>
        <h1 className='HEADER-TEXT1'>Entregable - { location.state.tituloDoc }</h1>
        <h2 className='HEADER-TEXT2'>Alumno - { location.state.apellidoPat }  {location.state.apellidoMat}, {location.state.nombres}</h2>
        <form action={location.state.linkDoc}>
          <button type="button" className="btn btn-light btn-lg"><BsIcons.BsFileEarmarkPdf/>  {location.state.tituloDoc }</button>
        </form>
        <h3 className='HEADER-TEXT3'>Rúbrica de Evaluación</h3>
        <div class = "row LISTAR-TABLA">
        <div class=" col-10  ">
          <table className='table fs-6 '>
            <thead class >
              <tr class>
                  <th style={{width: 50}}>Rubro</th>
                  <th style ={{width: 450}}>Nivel Deseado</th>
                  <th style = {{width:50}}>Puntaje Máximo</th>
                  <th style = {{width:50}}>Comentarios</th>
              </tr>
            </thead>
            <tbody >
              {data.map(rubrica => (
                <tr key={rubrica.idDetalleRubrica}>
                    <td >{rubrica.rubro}</td>
                    <td >{rubrica.nivelDeseado}</td>                    
                    <td>{rubrica.puntajeMaximo}</td>
                    <td>
                    <button class="btn BTN-ACCIONES"> <FaIcons.FaCommentAlt /></button>
                  
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div class = "DATOS">
                <div class = "col-12">
                    <div class="text-start fs-5 fw-normal "><p>Comentarios</p></div>
                    <div class="input-group input-group-lg mb-3">
                        <textarea class="form-control" name="Comentarios" placeholder="Comentarios" aria-label="comentarios"  
                          onChange={handleChange}/>
                    </div>
                </div>
            </div>
      <div className="row">                            
              <div>
                  <button class="btn btn-success fs-4 fw-bold mb-3 me-3 "  type="button">Aprobar</button>
                  <button class="btn btn-primary fs-4 fw-bold mb-3 me-3" type="button">Enviar</button>
                  <button class="btn btn-primary fs-4 fw-bold mb-3 me-3" type="button">Descargar</button>
              </div>
        </div>
        </div>
    );
}
export default  EntregableSeleccionado;