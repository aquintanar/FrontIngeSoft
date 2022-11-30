import React from 'react'
import {useState , useEffect} from "react";
import useModal from '../../hooks/useModals';
import {  Button, Collapse} from '@material-ui/core';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';
import * as BsIcons from 'react-icons/bs';
import * as Heroicons from "react-icons/hi";
import '../../stylesheets/Asesor.css'
import  '../../stylesheets/General.css';
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as RiIcons  from "react-icons/ri";
import {ModalConfirmación, ModalPregunta,ModalComentario} from '../../components/Modals';
import {
  FileUploadContainer,
  FormField,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  FilePreviewContainer
} from "../../components/Upload.styles";

function EntregableSeleccionado(){
  var [suma,setSuma]=useState(0);
  var idDetalleRubricaSelec=0;
  var [iRubro,setiRubro]=useState(0);
  var cantRubros=0;
  let navigate = useNavigate();
  const location = useLocation();
  const [buttonText, setButtonText] = useState(" ");
  const changeText = (text) => setButtonText(text);
  const [data, setData] = useState([]);
  const [dataV, setDataV] = useState([]);
  const [documentosVersion , setDocumentosVersion] = useState([]);    
  const [documentosVersionAlumno , setDocumentosVersionAlumno ] = useState([]);
  const [documentosVersionAsesor , setDocumentosVersionAsesor ] = useState([]);
  const [documentosVersionDocente , setDocumentosVersionDocente ] = useState([]);
  useEffect(() => {
    getData();
    getDataV();
    cargarDocumentos();
  }, []);
  

  
  const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
  const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
  const [isOpenEditDetNotaModal, openEditDetNotaModal ,closeEditDetNotaModal ] = useModal();
  const [isOpenAprobarModal, openAprobarModal ,closeAprobarModal ] = useModal();
  const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
  const [isOpenComentarioModal, openComentarioModal ,closeComentarioModal ] = useModal();
  const [titulo,setTitulo] = useState("");
  const [idDetalleRubrica,setIdDetalleRubrica] = useState("");
  const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
  const [comentario,setComentario] = useState("");
  
  const [detNotaSeleccionado, setdetNotaSeleccionado]=useState({
    idDetalleNotaRubrica: 0,
    fidDetalleRubrica: 0,
    fidVersion: parseInt(`${location.state.idVersion}`),
    descuento: 0,
    puntaje: 0,
    comentario: '',
    estado:1,
    fidCalificador:parseInt(localStorage.getItem('IDUSUARIO')),
});
const [detNotaSeleccionadoModificar, setdetNotaSeleccionadoModificar]=useState({
  idDetalleNotaRubrica: 0,
  fidDetalleRubrica: 0,
  fidVersion: parseInt(`${location.state.idVersion}`),
  descuento: 0,
  puntaje: 0,
  comentario: '',
  estado:1,
  fidCalificador:parseInt(localStorage.getItem('IDUSUARIO')),
});
const [versionSeleccionadaA, setVersionSeleccionadaA]=useState([{
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
const [versionSeleccionadaC, setVersionSeleccionadaC]=useState([{
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
const [versionSeleccionadaMod, setVersionSeleccionadaMod]=useState([{
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
const [versionSeleccionadaModA, setVersionSeleccionadaModA]=useState([{
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
//
const cargarDocumentos=async()=>{
 
  if(location.state.idVersion!=null){
    (async () => {
    const urlDocumentos  = `https://localhost:7012/api/DocumentoVersion/BuscarDocumentoVersionXIdVersion?idVersion=${location.state.idVersion}`
    const responseDocumentos  = await fetch(urlDocumentos)
    const dataDocumentos = await responseDocumentos.json()
    setDocumentosVersion(dataDocumentos)
    console.log(documentosVersion);
    var i=0;
      for(i=0;i<dataDocumentos.length;i++){
        if(dataDocumentos[i].esTarea==1){
        documentosVersionAlumno[i] = dataDocumentos[i];
           }
      }
      for(i=0;i<dataDocumentos.length;i++){
       
        if(dataDocumentos[i].esRetroalimentacionDocente==1){
          documentosVersionDocente[i] = dataDocumentos[i];
          }
          
        
      }
      setDocumentosVersionAlumno(documentosVersionAlumno);
      setDocumentosVersionAsesor(documentosVersionAsesor);
  })();
    //  setSubtitulo("Modificar Entrega");
    }
    

}
//
const  getDataV = async() => {
    const response= await axios(`https://localhost:7012/api/Version/ListVersionXId?idVersion=${location.state.idVersion}`);
    setDataV(response.data);
    console.log(response.data);
    setVersionSeleccionadaC({
      idVersion: 0,
      fidEntregable: parseInt(response.data[0].fidEntregable),
      linkDoc: response.data[0].linkDoc,
      fechaSubida: new Date(response.data[0].fechaSubida).toISOString(),
      fidEstadoEntregable:3,
      documentosAlumno:response.data[0].documentosAlumno,
      documentosRetroalimentacion:response.data[0].documentosRetroalimentacion,
      estado:1,
      fidAlumno:parseInt(response.data[0].fidAlumno),
      comentarios:' ',
      fechaModificacion:new Date(response.data[0].fechaModificacion).toISOString(),
      notaVersion: parseInt(response.data[0].notaVersion),
    });
    setVersionSeleccionadaA({
      idVersion: 0,
      fidEntregable: parseInt(response.data[0].fidEntregable),
      linkDoc: response.data[0].linkDoc,
      fechaSubida: new Date(response.data[0].fechaSubida).toISOString(),
      fidEstadoEntregable:5,
      documentosAlumno:response.data[0].documentosAlumno,
      documentosRetroalimentacion:response.data[0].documentosRetroalimentacion,
      estado:1,
      fidAlumno:parseInt(response.data[0].fidAlumno),
      comentarios:' ',
      fechaModificacion:new Date(response.data[0].fechaModificacion).toISOString(),
      notaVersion: parseInt(response.data[0].notaVersion),
    });
    setVersionSeleccionadaMod({
      idVersion: parseInt(response.data[0].idVersion),
      fidEntregable: parseInt(response.data[0].fidEntregable),
      linkDoc: response.data[0].linkDoc,
      fechaSubida: new Date(response.data[0].fechaSubida).toISOString(),
      fidEstadoEntregable:3,
      documentosAlumno:response.data[0].documentosAlumno,
      documentosRetroalimentacion:response.data[0].documentosRetroalimentacion,
      estado:1,
      fidAlumno:parseInt(response.data[0].fidAlumno),
      comentarios:' ',
      fechaModificacion:new Date(response.data[0].fechaModificacion).toISOString(),
      notaVersion: parseInt(response.data[0].notaVersion),
    });
    setVersionSeleccionadaModA({
      idVersion: parseInt(response.data[0].idVersion),
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
      setdetNotaSeleccionado(prevState=>({
        ...prevState,
        [name]: parseFloat(value),
        [`fidDetalleRubrica`]: parseInt(nombre),
      }));
      setdetNotaSeleccionadoModificar(prevState=>({
        ...prevState,
        [name]: parseFloat(value),
        [`fidDetalleRubrica`]: parseInt(nombre),
      }))
      
    }
    else{
      setdetNotaSeleccionado(prevState=>({
        ...prevState,
        [name]: value,
        [`fidDetalleRubrica`]: parseInt(nombre),
      }));
      setdetNotaSeleccionadoModificar(prevState=>({
        ...prevState,
        [name]: value,
        [`fidDetalleRubrica`]: parseInt(nombre),
      }))
      
    }
    setIdDetalleRubrica(parseInt(nombre));
    console.log(nombre);
    console.log(detNotaSeleccionado);
    console.log(detNotaSeleccionadoModificar);
    
  }
  const handleChangeComentario= (e)=>{
    const {name, value}=e.target;

    setVersionSeleccionadaA(prevState=>({
    ...prevState,
    [name]: value
  }))
  setVersionSeleccionadaC(prevState=>({
    ...prevState,
    [name]: value
  }))
  setVersionSeleccionadaMod(prevState=>({
    ...prevState,
    [name]: value
  }))
  setVersionSeleccionadaModA(prevState=>({
    ...prevState,
    [name]: value
  }))
  console.log(versionSeleccionadaA);
  console.log(versionSeleccionadaC);
  console.log(versionSeleccionadaMod);
  }
  const insertarDetNota=()=>{
   
      setSuma(suma+(detNotaSeleccionado.puntaje));
      peticionPost();
    
  }
  const modificarDetNota=()=>{
   
    setSuma(suma+(detNotaSeleccionadoModificar.puntaje)-detNotaSeleccionado.puntaje);
    peticionEditDetalleNota();
  
}
  const peticionPost=async()=>{
    await axios.post("https://localhost:7012/api/DetalleNotaRubrica/PostDetalleNotaRubrica",detNotaSeleccionado,{
        _method: 'POST'
      })
    .then(response=>{
      console.log(response);
      idDetalleRubricaSelec=response.data.idDetalleNotaRubrica;
      console.log(idDetalleRubricaSelec);
      setdetNotaSeleccionadoModificar(prevState=>({
        ...prevState,
        [`idDetalleNotaRubrica`]:response.data.idDetalleNotaRubrica ,
      }));
      console.log(detNotaSeleccionadoModificar);
      closePostModal();
      openGuardadoModal();
    }).catch(error =>{
      console.log(error.message);
    })
   

  }
  const peticionEditDetalleNota=async()=>{
    await axios.put("https://localhost:7012/api/DetalleNotaRubrica/ModifyDetalleNotaRubrica",detNotaSeleccionadoModificar)
    .then(response=>{
      closeEditDetNotaModal();
      openGuardadoModal();
    }).catch(error =>{
      console.log(error.message);
    })
  }
  const peticionC=async()=>{
    await axios.post("https://localhost:7012/api/Version/PostVersion",versionSeleccionadaC,{
      _method: 'POST'
    })
    .then(response=>{  
    }).catch(error =>{
      console.log(error.message);
    })
    await axios.put("https://localhost:7012/api/Version/modifyVersionDiscreto",versionSeleccionadaMod)
    .then(response=>{
      closeEditModal();
      openGuardadoModal();
    }).catch(error =>{
      console.log(error.message);
    })
  }
  const peticionA=async()=>{
    await axios.post("https://localhost:7012/api/Version/PostVersion",versionSeleccionadaA,{
      _method: 'POST'
    })
    .then(response=>{
    }).catch(error =>{
      console.log(error.message);
    })
    await axios.put("https://localhost:7012/api/Version/modifyVersionDiscreto",versionSeleccionadaModA)
    .then(response=>{
      closeEditModal();
      openGuardadoModal();
    }).catch(error =>{
      console.log(error.message);
    })
    await axios(`https://localhost:7012/api/Entregable/CalcularPuntajeEntregableXAlumno?idEntregable=${location.state.idEntregable}&idAlumno=${location.state.idAlumno}`)
    .catch(error =>{
      console.log(error.message);
    })
  }
  const peticionComentario=()=>{
    console.log("comentarios");
    console.log(versionSeleccionadaC);
    peticionC();
    navigate(-1);
  }
  const peticionAprobar=async()=>{
    console.log("aprobar");
    console.log(versionSeleccionadaA);
    peticionA();
    navigate(-1);
  }
  const cerrarPost=()=>{
    closeGuardadoModal();
  }
  const cerrarComentario=()=>{
    closeComentarioModal();
  }
  async function getData() {
    (async () => {
      const result = await axios(`https://localhost:7012/api/DetalleRubrica/ListDetalleRubricaXIdEntregable?idEntregable=${location.state.idEntregable}`);
      //const result = await axios(`http://44.210.195.91/api/DetalleRubrica/ListDetalleRubricaXIdEntregable?idEntregable=${location.state.idEntregable}`);
      setData(result.data);
      console.log(data);
      cantRubros=result.data.length;
      console.log("LONG RUBROS:" + cantRubros);
    })();
  };
  

  const abrirPost=()=>{
    openComentarioModal();
   // navigate("../gestion");     
  }
  const dataTablaIntermedia = React.useMemo(
    () => [
      {
        col1: `${location.state.estado==5?"Calificado por el docente":(location.state.estado==4?"Entregado a docente":(location.state.estado==3?"Con retroalimentacion":(location.state.estado==2?"Enviado para retroalimentacion":"Por Entregar")))}`,
        col2: `${location.state.fechaL}`,
        col3: `${location.state.idVersion>0?location.state.fechaE:"Sin Modificación"}`,
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
        Header: 'Fecha Límite',
        accessor: 'col2',
      },
      {
        Header: 'Fecha de Modificación',
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
      <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
     <h1 >Entregable - { location.state.tituloDoc }</h1>
     <h2 >Alumno - { location.state.apellidoPat }  {location.state.apellidoMat}, {location.state.nombres}</h2>
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
    <h4>Documentos enviados por el alumno: </h4>
    <PreviewList>
{((location.state.idVersion >= 0) ? documentosVersionAlumno.map((documentos) => {
                return (
           
                 <a href={documentos.linkDoc}>
                 <button><BsIcons.BsFileEarmarkPdf/> {documentos.nombreDocumento} </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
               </a>    
           
         );
             }): " ")} </PreviewList>
 
     <br></br>
     <h5 style={{display:"none"}}> *Ingrese los puntajes, comentarios y guarde por cada rubro. Luego agrege un archivo, un comentario general y seleccione Guardar.</h5>
     <div class = "row">
          <div class="col-11">
            <h4 >Rúbrica de evaluación</h4>
          </div>
          <div style={{alignContent:"center", marginTop:"7px" }} class="col-1 BTN-INFORMATION" title="Ingrese el puntaje, comentario y guarde por cada rubro. Luego agrege un archivo, un comentario general y seleccione Guardar.">
             <Heroicons.HiInformationCircle/> 
          </div>
     </div>
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
                 
                 <button type="button" className='btn btn-light' onClick={()=>{openPostModal()}}>Insertar</button>
                 
                 <button type="button" className='btn btn-light' onClick={()=>{openEditDetNotaModal()}}>Modificar</button>
                  </td>
                 
                 
                 
             </tr>
           ))}
         </tbody>
       </table>
     </div>
   </div>
   <p class="HEADER-TEXT6"  type='button' onClick={() =>navigate("subirArchivos",{state:{idVersion:location.state.idVersion,idAlumno:location.state.idAlumno,
       tituloDoc:location.state.tituloDoc,linkDoc:location.state.linkDoc,idEntregable:location.state.idEntregable,estado:location.state.estado,fechaE:location.state.fechaSubida,fechaL:location.state.fechaLim, nombreEntregable:location.state.nombreEntregable,comentarios:location.state.comentarios,tieneDocumento:documentosVersion}})} >
        Agregar Documentos de Retroalimentación</p>
   <h4 style={{marginTop:"8px"}}>Nota asignada: {suma}</h4>
   <h4>Documentos enviados:</h4>
        <PreviewList>
{((location.state.idVersion >= 0) ? 
    

documentosVersionDocente.map((documentos) => {
                return (
           
                 <a href={documentos.linkDoc}>
            <button><BsIcons.BsFileEarmarkPdf/>   {documentos.nombreDocumento} </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
               </a>    
           
         );
             }): " ")} </PreviewList>
   <div className = "">
             <div className = "col-12" style={{marginTop:"8px"}}>
                 <p>Comentarios Generales</p>
                 <div className="input-group-lg ">
                     <textarea className="form-control form-control2" name="comentarios" placeholder="Comentarios" aria-label="comentarios"  
                       onChange={(e) => handleChangeComentario(e)}/>
                 </div>
             </div>
         </div>
      <div className="row">                            
              <div className="INSERTAR-BOTONES ">      
              <button onClick={()=>openAprobarModal()} className="btn GUARDAR"  type="button"><span>Guardar</span></button>
              </div>
        </div>
        </div>
        <ModalPregunta
    isOpen={isOpenPostModal} 
    closeModal={closePostModal}
    procedimiento = "guardar"
    objeto="el puntaje y comentario para este rubro"
    elemento={detNotaSeleccionado && detNotaSeleccionado.nombre}
  >
    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
      <Button class="btn  btn-success btn-lg" onClick={()=>insertarDetNota()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button class="btn btn-danger btn-lg"  onClick={closePostModal}>Cancelar</Button>
    </div>
  </ModalPregunta>
  <ModalPregunta
    isOpen={isOpenEditDetNotaModal} 
    closeModal={closeEditDetNotaModal}
    procedimiento = "modificar"
    objeto="el puntaje y comentario para este rubro"
    elemento={detNotaSeleccionado && detNotaSeleccionado.nombre}
  >
    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
      <Button class="btn  btn-success btn-lg" onClick={()=>modificarDetNota()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button class="btn btn-danger btn-lg"  onClick={closeEditDetNotaModal}>Cancelar</Button>
    </div>
  </ModalPregunta>
  <ModalPregunta
              isOpen={isOpenEditModal} 
              closeModal={closeEditModal}
              procedimiento = "enviar"
              objeto="comentarios generales al alumno"
              elemento={versionSeleccionadaC.comentario}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionComentario()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeEditModal}>Cancelar</Button>
              </div>
            </ModalPregunta>
<ModalPregunta
              isOpen={isOpenAprobarModal} 
              closeModal={closeAprobarModal}
              procedimiento = "guardar y enviar"
              objeto="esta version del alumno"
              
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionAprobar()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeAprobarModal}>Cancelar</Button>
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
  <ModalConfirmación
              isOpen={isOpenEditadoModal} 
              closeModal={closeEditadoModal}
              procedimiento= "modifcado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={()=>closeEditadoModal()}>Entendido</Button>
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