import React from 'react'
import {useState , useEffect} from "react";
import useModal from '../../hooks/useModals';
import {  Button, Collapse} from '@material-ui/core';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';
import * as BsIcons from 'react-icons/bs';
import '../../stylesheets/Asesor.css'
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as RiIcons  from "react-icons/ri";
import {ModalConfirmación, ModalPregunta} from '../../components/Modals';

function EntregableSeleccionado(){
  let navigate = useNavigate();
  const location = useLocation();
    const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
  const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
  const [entSeleccionado, setEntSeleccionado]=useState({
    idDetalleNotaRubrica: 0,
    fidDetalleRubrica: 0,
    fidVersion: parseInt(`${location.state.idVersion}`),
    descuento: 0,
    puntaje: 0,
    comentario: '',
    estado:1,
    fidCalificador:35,
})
  const handleChange= (nombre,e)=>{
    const {name, value}=e.target;
    if(/[0-9]/.test(value)){
      setEntSeleccionado(prevState=>({
        ...prevState,
        [name]: parseFloat(value),
        [`fidDetalleRubrica`]: parseInt(nombre),
      }))
    }
    else{
      setEntSeleccionado(prevState=>({
        ...prevState,
        [name]: value,
        [`fidDetalleRubrica`]: parseInt(nombre),
      }))
      
    }
    console.log(nombre);
    console.log(entSeleccionado);
    
  }
  const peticionPost=async()=>{
    await axios.post("https://localhost:7012/api/DetalleNotaRubrica/PostDetalleNotaRubrica",entSeleccionado,{
        _method: 'POST'
      })
    .then(response=>{
      closePostModal();
      openGuardadoModal();
    }).catch(error =>{
      console.log(error.message);
    })
  }

  const cerrarPost=()=>{
    closeGuardadoModal();
  }
  async function getData() {
    (async () => {
      const result = await axios(`https://localhost:7012/api/DetalleRubrica/ListDetalleRubricaXIdEntregable?idEntregable=${location.state.idEntregable}`);
      //const result = await axios(`http://44.210.195.91/api/DetalleRubrica/ListDetalleRubricaXIdEntregable?idEntregable=${location.state.idEntregable}`);
      setData(result.data);
      console.log(data)
    })();
  };
  const dataTablaIntermedia = React.useMemo(
    () => [
      {
        col1: `${location.state.estado}`,
        col2: `${location.state.estado}`,
        col3: `${location.state.fechaE}`,
      },
    ],
    []
)
  const columns = React.useMemo(
    () => [
      {
        Header: 'Estado de Entrega',
        accessor: 'col1',
      },
      {
        Header: 'Estado de Retroalimentación',
        accessor: 'col2',
      },
      {
        Header: 'Fecha de Entrega',
        accessor: 'col3',
      },
      
    ],
    []
)

const {
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
} = useTable({ columns, data:dataTablaIntermedia})
    return(
        <div className='CONTAINERASESOR'>
        <span>
        <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
        </span>
        <h1 className='HEADER-TEXT1'>Entregable - { location.state.tituloDoc }</h1>
        <h2 className='HEADER-TEXT2'>Alumno - { location.state.apellidoPat }  {location.state.apellidoMat}, {location.state.nombres}</h2>
        <div className='ContenidoPrincipal'>
        <table   {...getTableProps()} style={{minWidth: 650, borderCollapse: 'separate',
    borderSpacing: '0px 15px'}}>
         <thead>
         {headerGroups.map(headerGroup => (
             <tr {...headerGroup.getHeaderGroupProps()}>
               {headerGroup.headers.map(column => (
                   <th
                       {...column.getHeaderProps()}
                       style={{
                         color: '#031D45',
                       }}
                   >
                     {column.render('Header')}
                   </th>
               ))}
             </tr>
         ))}
         </thead>
         <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
               <tr {...row.getRowProps()} >
                 {row.cells.map(cell => {
                   return (
                       <td
                           {...cell.getCellProps()}
                           style={{
                             padding: '12px',
                             border: 'solid 1px gray',
                             borderSpacing: 15,
                           }}
                       >
                         {cell.render('Cell')}
                       </td>
                   )
                 })}
               </tr>
           )
         })}
         </tbody>
       </table>

       <form action={location.state.linkDoc}>
          <button type="button" className="btn btn-light btn-lg"><BsIcons.BsFileEarmarkPdf/>  {location.state.tituloDocPDF}</button>
        </form>
        <h3 className='HEADER-TEXT3'>Rúbrica de Evaluación</h3>
        <div class = "row LISTAR-TABLA">
        <div class=" col-12  ">
          <table className='table fs-6 '>
            <thead class >
              <tr class>
                  <th style={{width: 100}}>Rubro</th>
                  <th style ={{width: 450}}>Nivel Deseado</th>
                  <th style = {{width:100}}>Puntaje Máximo</th>
                  <th style = {{width:100}}>Puntaje</th>
                  <th style = {{width:100}}>Comentarios</th>
                  <th style = {{width:100}}>Acciones</th>
              </tr>
            </thead>
            <tbody >
              {data.map(rubrica => (
                <tr key={rubrica.idDetalleRubrica}>
                    <td >{rubrica.rubro}</td>
                    <td >{rubrica.nivelDeseado}</td>                    
                    <td>{rubrica.puntajeMaximo}</td>
                    <td> <input onChange={(e) => handleChange(`${rubrica.idDetalleRubrica}`, e)} type="text" class="form-control" name="puntaje" placeholder="Puntaje" aria-label="descripcion" aria-describedby="inputGroup-sizing-lg" 
                    /> </td>
                    <td>
                    <input onChange={(e) => handleChange(`${rubrica.idDetalleRubrica}`, e)} type="text" class="form-control" name="comentario" placeholder="Comentario" aria-label="descripcion" aria-describedby="inputGroup-sizing-lg" 
                    />
                    <button class="btn BTN-ACCIONES"> <FaIcons.FaCommentAlt /></button>
                    </td>
                    <td>
                    <button type="button" className='btn btn-light' onClick={()=>openPostModal()}>Guardar</button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div class = "DATOS">
      <div class = "col-12">
                    <div class="text-start fs-5 fw-normal "><p>Comentarios del asesor</p></div>
                    <div class="input-group input-group-lg mb-3">
                        <textarea disabled="true" class="form-control" name="Comentarios" placeholder="Comentarios" aria-label="comentarios"  
                          onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <br></br>
      <div className="row">                            
              <div className="LISTAR-BOTON">      
                  <button class="btn btn-primary fs-4 fw-bold mb-3 me-3 "  type="button">Guardar</button>
                  <button class="btn btn-danger fs-4 fw-bold mb-3 me-3" type="button">Cancelar</button>
              </div>
        </div>
        </div>
        <ModalPregunta
    isOpen={isOpenPostModal} 
    closeModal={closePostModal}
    procedimiento = "guardar"
    objeto="el detalle"
    elemento={entSeleccionado && entSeleccionado.nombre}
  >
    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
      <Button class="btn  btn-success btn-lg" onClick={()=>peticionPost()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button class="btn btn-danger btn-lg"  onClick={closePostModal}>Cancelar</Button>
    </div>
  </ModalPregunta>
  <ModalConfirmación
              isOpen={isOpenGuardadoModal} 
              closeModal={closeGuardadoModal}
              procedimiento= "guardado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={()=>cerrarPost()}>Entendido</Button>
              </div>
            </ModalConfirmación>
        </div>
    );

}

export default  EntregableSeleccionado;