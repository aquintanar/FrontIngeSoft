import React from 'react'
import './proponerTemaAsesor.css';
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
import {ModalConfirmación, ModalPregunta,ModalComentario} from '../../components/Modals';

function EntregableSeleccionado(){
  let navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [dataV, setDataV] = useState([]);
  useEffect(() => {
    getData();
    getDataV();
  }, []);
  

  
  const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
  const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
  const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
  const [isOpenComentarioModal, openComentarioModal ,closeComentarioModal ] = useModal();
  const [titulo,setTitulo] = useState("");
  const [idDetalleRubrica,setIdDetalleRubrica] = useState("");
  const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
  const [comentario,setComentario] = useState("");
  const [entSeleccionado, setEntSeleccionado]=useState({
    idDetalleNotaRubrica: 0,
    fidDetalleRubrica: 0,
    fidVersion: parseInt(`${location.state.idVersion}`),
    descuento: 0,
    puntaje: 0,
    comentario: '',
    estado:1,
    fidCalificador:35,
});

const [versionSeleccionada, setVersionSeleccionada]=useState([{
  idVersion: 0,
  fidEntregable: 0,
  linkDoc: " ",
  fechaSubida: " ",
  fidEstadoEntregable:0,
  documentosAlumno:" ",
  documentosRetroalimentacion:" ",
  estado:0,
  fidAlumno:0,
  comentarios:' ',
  fechaModificacion: " ",
  notaVersion: 0,
}]);

const  getDataV = async() => {
    const response= await axios(`http://34.195.33.246/api/Version/ListVersionXId?idVersion=${location.state.idVersion}`);
    setDataV(response.data);
    console.log(response.data);
    setVersionSeleccionada({
      idVersion: 0,
      fidEntregable: parseInt(response.data[0].fidEntregable),
      linkDoc: response.data[0].linkDoc,
      fechaSubida: new Date(response.data[0].fechaSubida).toISOString(),
      fidEstadoEntregable:parseInt(response.data[0].fidEstadoEntregable),
      documentosAlumno:response.data[0].documentosAlumno,
      documentosRetroalimentacion:response.data[0].documentosRetroalimentacion,
      estado:1,
      fidAlumno:parseInt(response.data[0].fidAlumno),
      comentarios:' ',
      fechaModificacion:new Date(response.data[0].fechaModificacion).toISOString(),
      notaVersion: parseInt(response.data[0].notaVersion),
    });
  };



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
    setIdDetalleRubrica(parseInt(nombre));
    console.log(nombre);
    console.log(entSeleccionado);
    
  }
  const handleChangeComentario= (e)=>{
    const {name, value}=e.target;

    setVersionSeleccionada(prevState=>({
    ...prevState,
    [name]: value
  }))
  console.log(versionSeleccionada);
  }
  const peticionPost=async()=>{
    await axios.post("http://34.195.33.246/api/DetalleNotaRubrica/PostDetalleNotaRubrica",entSeleccionado,{
        _method: 'POST'
      })
    .then(response=>{
      closePostModal();
      openGuardadoModal();
    }).catch(error =>{
      console.log(error.message);
    })
  }
  
  const peticionEdit=async()=>{
    await axios.post("http://34.195.33.246/api/Version/PostVersion",versionSeleccionada,{
      _method: 'POST'
    })
    .then(response=>{
      closeEditModal();
      openGuardadoModal();
    }).catch(error =>{
      console.log(error.message);
    })
  }

  const cerrarPost=()=>{
    closeGuardadoModal();
  }
  const cerrarComentario=()=>{
    closeComentarioModal();
  }
  async function getData() {
    (async () => {
      const result = await axios(`http://34.195.33.246/api/DetalleRubrica/ListDetalleRubricaXIdEntregable?idEntregable=${location.state.idEntregable}`);
      //const result = await axios(`http://44.210.195.91/api/DetalleRubrica/ListDetalleRubricaXIdEntregable?idEntregable=${location.state.idEntregable}`);
      setData(result.data);
      console.log(data)
    })();
  };
  

  const abrirPost=()=>{
    openComentarioModal();
   // navigate("../gestion");     
  }
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
          <BsIcons.BsFileEarmarkPdf/> <input type="submit" value={location.state.tituloDocPDF} /> 
        </form>
        
        <h3 className='HEADER-TEXT3'>Rúbrica de Evaluación</h3>
        <div className = "row LISTAR-TABLA">
        <div className=" col-12  ">
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
                    <button class="btn BTN-ACCIONES" onClick={()=>abrirPost(setTitulo(rubrica.rubro))}> <FaIcons.FaCommentAlt /></button>
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
      <p class="HEADER-TEXT6"  type='button' onClick={() =>navigate("subirArchivos",{state:{idVersion:location.state.idVersion,idAlumno:location.state.idAlumno,
          tituloDoc:location.state.tituloDoc,linkDoc:location.state.linkDoc,idEntregable:location.state.idEntregable,estado:location.state.estado,fechaE:location.state.fechaSubida,fechaL:location.state.fechaLim, nombreEntregable:location.state.nombreEntregable,comentarios:location.state.comentarios}})} >
           Agregar Documentos de Retroalimentación</p>
      <div className = "DATOS">
                <div className = "col-12">
                    <div className="text-start fs-5 fw-normal "><p>Comentarios Generales</p></div>
                    <div className="input-group input-group-lg mb-3">
                        <textarea className="form-control" name="comentarios" placeholder="Comentarios" aria-label="comentarios"  
                          onChange={(e) => handleChangeComentario(e)}/>
                    </div>
                </div>
            </div>
            <br></br>
      <div className="row">                            
              <div className="LISTAR-BOTON">
               
                  <button className="btn btn-success fs-4 fw-bold mb-3 me-3 "  type="button">Aprobar</button>
                  <button  onClick={()=>openEditModal()} class="btn btn-primary fs-4 fw-bold mb-3 me-3" type="button">Enviar comentarios</button>
              </div>
        </div>
        </div>
        <ModalPregunta
    isOpen={isOpenPostModal} 
    closeModal={closePostModal}
    procedimiento = "guardar"
    objeto="el puntaje y comentario para este rubro"
    elemento={entSeleccionado && entSeleccionado.nombre}
  >
    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
      <Button class="btn  btn-success btn-lg" onClick={()=>peticionPost()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button class="btn btn-danger btn-lg"  onClick={closePostModal}>Cancelar</Button>
    </div>
  </ModalPregunta>
  <ModalPregunta
              isOpen={isOpenEditModal} 
              closeModal={closeEditModal}
              procedimiento = "Guardar"
              objeto="el comentario general"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionEdit()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeEditModal}>Cancelar</Button>
              </div>
            </ModalPregunta>
  <ModalConfirmación
              isOpen={isOpenGuardadoModal} 
              closeModal={closeGuardadoModal}
              procedimiento= "guardado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={()=>closeGuardadoModal()}>Entendido</Button>
              </div>
            </ModalConfirmación>
  <ModalComentario
              isOpen={isOpenComentarioModal} 
              closeModal={closeComentarioModal}
              procedimiento= {titulo}
            >
                <div align = "left">
                <p class= "text-white mt-5">Comentarios del Asesor:</p></div>
             <div class = "DATOS">
                <div class = "col-12">
                    <div class="input-group input-group-lg mb-3">
                        <textarea class="form-control" name="comentario" placeholder={comentario} aria-label="comentarios"   cols="10" rows="15
                        "   onChange={(e) => handleChange(idDetalleRubrica, e)}/>
                    </div>
                </div>
            </div>
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <div class="align-text-bottom">
                <Button class="btn btn-danger btn-lg position-relative" onClick={()=>cerrarComentario()}>Volver</Button>
                </div>
                </div>
            </ModalComentario>
        </div>
    );


}

export default  EntregableSeleccionado;