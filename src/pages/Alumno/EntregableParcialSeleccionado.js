import React from 'react'
import {useState , useEffect} from "react";
import {ModalConfirmación, ModalComentario,ModalArchivoTamanho} from '../../components/Modals';
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';
import * as BsIcons from 'react-icons/bs';
import '../../stylesheets/Alumno.css'
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as RiIcons  from "react-icons/ri";
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
//http://34.195.33.246/api/DetalleNotaRubrica/GetDetalleNotaRubricaXIdVersion?idVersion=1
function EntregableSeleccionado(){
    var aux=0;
    let navigate = useNavigate();
    const url = "https://localhost:7012/";
    const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();

const [isOpenGuardadoModalArchivo, openGuardadoModalArchivo ,closeGuardadoModalArchivo ] = useModal();
    const location = useLocation();
    const [subTitulo,setSubtitulo] = useState("Agregar ");
    const [calificado,setCalificado] = useState("No Calificado");
    const [data, setData] = useState([]);
    const [comentario,setComentario] = useState("");
    const [titulo,setTitulo] = useState("");
    const [notaFinal,setnotaFinal] = useState(0);
    const [version, setVersion] = useState([]);
    const [detalleNota, setDetalleNota] = useState([]);
    const [documentosVersion , setDocumentosVersion] = useState([]);
    const [documentosVersionAlumno , setDocumentosVersionAlumno ] = useState([]);
    const [documentosVersionAsesor , setDocumentosVersionAsesor ] = useState([]);
    const [documentosVersionDocente , setDocumentosVersionDocente ] = useState([]);
    const [nota, setNota] = useState({
      idDetalleNotaRubrica: 0,
      DetalleRubrica: {
        fidDetalleRubrica: 1
      },
      Version: {
        fidVersion: 1
      },
      descuento: '',
      puntaje: '',
      comentario: '',
      Calificador: {
        fidCalificador: 1
      },

  });
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

  const cerrarPostArchivo=()=>{
    closeGuardadoModalArchivo();
   // navigate("../gestion");
  }
  const abrirPostArchivo=()=>{
    openGuardadoModalArchivo();
   // navigate("../gestion");     
  }
  const cargarVersion=async()=>{
    setVersionSeleccionada({
      fidEntregable: location.state.idEntregable,
      fidEstadoEntregable:1,
      fidAlumno: 1
  });

    console.log(versionSeleccionada);
    if(location.state.idVersion!=null){
      (async () => {
      const urlDocumentos  = url+`api/DocumentoVersion/BuscarDocumentoVersionXIdVersion?idVersion=${location.state.idVersion}`
      const responseDocumentos  = await fetch(urlDocumentos)
      const dataDocumentos = await responseDocumentos.json()
      setDocumentosVersion(dataDocumentos)
      console.log(documentosVersion);
      console.log(dataDocumentos[0]);
var i=0;
      for(i=0;i<dataDocumentos.length;i++){
        if(dataDocumentos[i].esTarea==1){
        documentosVersionAlumno[i] = dataDocumentos[i];
           }
      }
      for(i=0;i<dataDocumentos.length;i++){
        if(location.state.estado==5){
        if(dataDocumentos[i].esRetroalimentacionDocente==1){
          documentosVersionAsesor[i] = dataDocumentos[i];
           }
          }
        else{
          if(dataDocumentos[i].esRetroalimentacion==1){
            documentosVersionAsesor[i] = dataDocumentos[i];
             }


        }
      }
      setDocumentosVersionAlumno(documentosVersionAlumno);
      setDocumentosVersionAsesor(documentosVersionAsesor);
    })();
    
  }
      
      else {
        await axios.post(url+"api/Version/PostVersion",versionSeleccionada,{
          _method: 'POST'
        })
      .then(response=>{
        console.log(location.state.versionSeleccionada);
      }).catch(error =>{
        console.log(versionSeleccionada);
      })
      }
  }

  const getVersion = async() => {
    (async () => {
        const result = await axios(url+'api/Version/ListVersionXId?idVersion='+location.state.idVersion);
        setVersion(result.data[0]);
      })();
    }
  const [entregable,setEntregable] = useState({
    idEntregable: 0,
    responsableEvalua: ''
});
    useEffect(() => {
      seleccionarTipoCalificado();
      getDetalleNotaRubrica();
      seleccionarTipodeEntrega();
      getEntregable();
      getVersion();
      cargarVersion();
    }, []);

    const abrirPost=()=>{
      openGuardadoModal();
     // navigate("../gestion");     
    }
    const cerrarPost=()=>{
      closeGuardadoModal();
     // navigate("../gestion");
    }
    async function getData() {
      (async () => {
        const result = await axios(url+`api/DetalleRubrica/ListDetalleRubricaXIdEntregable?idEntregable=${location.state.idEntregable}`);
        setDetalleNota(result.data);
        let i = 0  ; 
        for ( i = 0 ; i < result.data.length ; i++){
          (result.data[i].puntaje=0) ; 
          (result.data[i].descuento=0) ; 
         // suma = suma + result.data[i].puntajeMaximo;
      
       }
        console.log(data)
      })();

      setnotaFinal(0);
    };

    async function getDetallesNotaRubrica() {
      (async () => {
        const result = await axios(url+`api/DetalleNotaRubrica/GetDetalleNotaRubricaXIdVersion?idVersion=${location.state.idVersion}`);
        setDetalleNota(result.data);
        let i = 0  ; 
        let index = 0 ; 
        let suma = 0 ; 
        for ( i = 0 ; i < result.data.length ; i++){
              index = index + ((result.data[i].puntaje-result.data[i].puntaje*result.data[i].descuento)) ; 
             // suma = suma + result.data[i].puntajeMaximo;
          
      }
      setnotaFinal(index);
        console.log(detalleNota)
      })();
    };
    const getEntregable=async()=>{
        const response = await axios.get(url+`api/Entregable/BuscarEntregableXId?idEntregable=${location.state.idEntregable}`);
        setEntregable({
          idEntregable: response.data[0].idEntregable,
          responsableEvalua: response.data[0].responsableEvalua,
        },
        console.log(entregable)
        );
        
    }
    const getDetalleNotaRubrica=async()=>{
        const response = await axios.get(url+`api/DetalleNotaRubrica/GetDetalleNotaRubricaXIdVersion?idVersion=${location.state.idVersion}`);
        setNota({
          idDetalleNotaRubrica: response.data[0].idDetalleNotaRubrica,
          DetalleRubrica:{fidDetalleRubrica: response.data[0].fidDetalleRubrica},
          Version:{fidVersion: response.data[0].fidVersion},
          descuento: response.data[0].descuento,
          puntaje: response.data[0].puntaje,
          comentario: response.data[0].comentario,
          Calificador:{fidCalificador: response.data[0].fidCalificador},
        },
        console.log(nota)
        );

        if(nota.puntaje>-1){
          aux=1;
        }

    }


    const crearDocumento =async()=>{
      let idRubri = 0;
      (async () => {

if(location.state.estado==4){
  abrirPostArchivo();
} 
else if(location.state.estado==5){
  abrirPostArchivo();
}     
else if(location.state.estado==6){
  abrirPostArchivo();
}  
else if(location.state.estado==7){
  abrirPostArchivo();
}  
  else{navigate("subirArchivos",{state:{idVersion:location.state.idVersion,idAlumno:location.state.idAlumno,
        tituloDoc:location.state.tituloDoc,linkDoc:location.state.linkDoc,idEntregable:location.state.idEntregable,estado:location.state.estado,fechaE:location.state.fechaSubida,fechaL:location.state.fechaLim, nombreEntregable:location.state.nombreEntregable,comentarios:location.state.comentarios,tieneDocumento:documentosVersion}}) }     })();
     }
    


    const seleccionarTipodeEntrega =()=>{
      if(location.state.linkDoc !=null){
        setSubtitulo("Modificar ")
      }
    }
    const seleccionarTipoCalificado =async()=>{
      const result = await axios(url+`api/DetalleNotaRubrica/GetDetalleNotaRubricaXIdVersion?idVersion=${location.state.idVersion}`);
      if(result.data.length>0){
        getDetallesNotaRubrica();
        aux=1;
      }
      else {
        getData();       
        aux=0;
      }
    }
    const dataTablaIntermedia = React.useMemo(

    
      () => [


        {
          col1: `${location.state.estado==7?"Sustentado":(location.state.estado==6?"Entregado a jurado":(location.state.estado==5?"Calificado por el docente":(location.state.estado==4?"Entregado a docente":(location.state.estado==3?"Con retroalimentacion":(location.state.estado==2?"Enviado para retroalimentacion":"Por Entregar")))))}`,
   //       col1: `${location.state.estado==5?"Calificado":"Sin Calificar"}`,
       //   col2: `${calificado}`,
          col3: `${location.state.fechaL}`,
          col4: `${location.state.idVersion>0?location.state.fechaE:"Sin Modificación"}`,
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
     //   {
     //     Header: 'Estado de Califiación',
     //     accessor: 'col2',
     //   },
        {
          Header: 'Fecha límite',
          accessor: 'col3',
        },
        {
          Header: 'Fecha de modificación',
          accessor: 'col4',
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
        <div className='CONTAINERALUMNO'>
            <span>
              <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
            </span>
        <h1 className='HEADER-TEXT2-DOCUMENTO'>{location.state.nombreEntregable} - { location.state.tituloDoc } </h1>

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


          
     


 <PreviewList>
{((location.state.idVersion >= 0) ? documentosVersionAlumno.map((documentos) => {
                   return (
              
                    <a href={documentos.linkDoc}>
                    <button><BsIcons.BsFileEarmarkPdf/> {documentos.nombreDocumento} </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                  </a>    
              
            );
                }): " ")} </PreviewList>

            {documentosVersion.length>0?<p class="HEADER-TEXT6"  type='button' onClick={() =>crearDocumento()} >Modificar {location.state.nombreEntregable}</p>:<p class="HEADER-TEXT6"  type='button' onClick={() =>crearDocumento()} >Agregar {location.state.nombreEntregable}</p>
}    

        
            <p class="HEADER-TEXT5">{location.state.idRubrica>0?"Rúbrica de Evaluación":" "} </p>
        <div class = "row LISTAR-TABLA">
        <div class=" col-10  ">
         { location.state.idRubrica>0?
          <table className='table fs-6 '>
            <thead class >
              <tr class>
                  <th style={{width: 50}}>Rubro</th>
                  <th style ={{width: 450}}>Nivel Deseado</th>
                  <th style = {{width:100}}>Puntaje Máximo</th>
                  <th style = {{width:100}}>Puntaje</th>
                  <th style = {{width:50}}>Comentarios</th>
              </tr>
            </thead>
            <tbody >
              
         
         
              {detalleNota.map(rubricaNota => (
                <tr key={rubricaNota.idDetalleNotaRubrica}>
                   <td  >{rubricaNota.rubro } </td>
                    <td >{rubricaNota.nivelDeseado}</td>                    
                    <td >{rubricaNota.puntajeMaximo} </td>
                    
                    <td> {((aux = 1) ? (rubricaNota.puntaje-rubricaNota.puntaje*rubricaNota.descuento) : "" )}</td>
                    <td>
                    <button class="btn BTN-COMENTAR" onClick={()=>abrirPost(setComentario(rubricaNota.comentario), setTitulo(rubricaNota.rubro))}> <FaIcons.FaCommentAlt /></button>
                 
                    </td>
                </tr>
              ))}
           
            </tbody>
          </table>
          :""}
        </div>
        <p class="HEADER-TEXT8">{location.state.idRubrica>0? "Calificación": ""} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {location.state.idRubrica>0? notaFinal: ""}
     </p>
       
      </div>
      <div class = "DATOS">
                <div class = "col-12">
                    <div class="text-start fs-5 fw-normal "><p>Comentarios del {location.state.estado==7?"Jurado":(location.state.estado==6?"Docente":(location.state.estado==5?"Docente":"Asesor"))} </p></div>
                    <div class="input-group input-group-lg mb-3">
                        <textarea class="form-control" name="Comentarios" placeholder={version.comentarios} aria-label="comentarios"  disabled="true" cols="10" rows="5
                        " 
                             />
                    </div>
                </div>
            </div>

            <div class = "DATOS">
                <div class = "col-12">
                    <div><p>Retroalimentación Adjunta:{location.state.idEntregable} </p></div>
                    <PreviewList>
{((location.state.idVersion >= 0) ? 


documentosVersionAsesor.map((documentos) => {
                   return (
              
                    <a href={documentos.linkDoc}>
               <button><BsIcons.BsFileEarmarkPdf/>   {documentos.nombreDocumento} </button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                  </a>    
              
            );
                }): " ")} </PreviewList>
                </div>
            </div>



            <ModalComentario
              isOpen={isOpenGuardadoModal} 
              closeModal={closeGuardadoModal}
              procedimiento= {titulo}
            >
                <div align = "left">
                <p class= "text-white mt-5">Comentarios del {location.state.estado==7?"Jurado":(location.state.estado==6?"Docente":(location.state.estado==5?"Docente":"Asesor"))}:</p></div>
             <div class = "DATOS">
                <div class = "col-12">
                    <div class="input-group input-group-lg mb-3">
                        <textarea class="form-control" name="Comentarios" placeholder={comentario} aria-label="comentarios"  disabled="true" cols="8" rows="14" />
                    </div>
                </div>
            </div>
            <div class='d-flex align-items-center flex-column mb-3'>
              <div class="mt-auto p-2">
                <Button class="btn btn-danger btn-lg position-relative" onClick={()=>cerrarPost()}>Volver</Button>
                </div>
                </div>
            </ModalComentario>

            <ModalArchivoTamanho
              isOpen={isOpenGuardadoModalArchivo} 
              closeModal={closeGuardadoModalArchivo}
              procedimiento= "No puede modificar los archivos enviados en esta etapa" 
            >

              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <div class="align-text-bottom">
              <Button class="btn btn-success btn-lg"  onClick={()=>cerrarPostArchivo()}><span>Entendido</span></Button>
                </div>
              </div>
            </ModalArchivoTamanho>
        </div>
        </div>
    );
}
export default  EntregableSeleccionado;