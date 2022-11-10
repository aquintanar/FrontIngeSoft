import React, { useState, useRef, useEffect } from "react";
import { useNavigate,useParams,useLocation } from 'react-router-dom';
import {
  FileUploadContainer,
  FormField,
  ImagePreview,
  PreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  FilePreviewContainer
} from "./Upload.styles";
import '../stylesheets/Alumno.css'
import '../Pagina.css'
import '../stylesheets/BarraVolver.css'
import {ModalConfirmación, ModalPregunta} from './Modals';
import useModal from '../hooks/useModals';
import {  Button} from '@material-ui/core';
import * as BootIcons  from "react-icons/bs";
import axios from 'axios';
const KILO_BYTES_PER_BYTE = 1000;

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const Upload = ({ label, files,linkDoc,tituloDoc, nombreArchivo,idAlumno,idEntregable,idVersion,estadoEntregable,tieneDocumento,setFiles, ...otherProps }) => {
  var urlInicial = "https://reactionando-s3-software.s3.amazonaws.com/";
  var titulo = "";
  var link= "";
const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();
const [documentosVersion , setDocumentosVersion] = useState([]);
const [documentosVersionNuevo , setDocumentosVersionNuevo] = useState([]);
const [documentoVersionNuevo , setDocumentoVersionNuevo] =useState({
  idDocumentoVersion: 0,
  version: {
  idVersion:1 
},
 nombreDocumento: '',
 linkDoc: '',
 documentosRetroalimentacion:' ',
 esTarea: '',
 esRetroalimentacion:' ',
})
const [documentoVersion, setDocumentoVersion]=useState({
  idDocumentoVersion: 0,
  version: {
  idVersion:1 
},
 nombreDocumento: '',
 linkDoc: '',
 documentosRetroalimentacion:' ',
 esTarea: '',
 esRetroalimentacion:' ',
})
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
const handleChange=e=>{
  const {name, value}=e.target;
  setVersionSeleccionada(prevState=>({
    ...prevState,
    [name]: value
  }))
  console.log(versionSeleccionada);
}
  let navigate = useNavigate();
  var documentos="";

  const fileInputField = useRef();

  const handleUploadBtnClick = () => {
    fileInputField.current.click();
  };

  const handleNewFileUpload = (e) => {
    console.log(e.target);
    const { files: newFiles } = e.target;
    if (newFiles.length) {
      addNewFiles(newFiles);
    }
  };


  const addNewFiles = (newFiles) => {
    console.log("adding files");
    for (let file of newFiles) {
      setFiles((files) => [...files, { file }]);
    }
    console.log(files);
  };

  const removeFile = (fileName) => {
    setFiles((files) => files.filter((file) => file.file.name !== fileName));

  };


const cerrarPost=()=>{
  closeGuardadoModal();
  navigate("/alumno/gestion/gesPortafolio/EntregablesParciales");
}
const cerrarPut=()=>{
  closeEditadoModal();
  navigate("/alumno/gestion/gesPortafolio/EntregablesParciales");
}
const peticionSelecter =async()=>{
  if(estadoEntregable==1){
    setVersionSeleccionada({
      fidEntregable: idEntregable,
      fidEstadoEntregable:2,
      fidAlumno: idAlumno
  });
    openPostModal();
  }
  
  if(estadoEntregable==2){
    setVersionSeleccionada({
      idVersion: idVersion,
      fidEntregable: idEntregable,
      fidEstadoEntregable:2,
      fidAlumno: idAlumno
  });
     openEditModal();
  }
  else if(estadoEntregable==3){
    openPostModal();
    setVersionSeleccionada({
      fidEntregable: idEntregable,
      fidEstadoEntregable:4,
      fidAlumno: idAlumno
  });
       openPostModal();
  }
  else if(estadoEntregable==4){
    setVersionSeleccionada({
      idVersion: idVersion,
      fidEntregable: idEntregable,
      fidEstadoEntregable:4,
      fidAlumno: idAlumno
  });
  openEditModal();
  }
  else if(estadoEntregable==5){
    setVersionSeleccionada({
      idVersion: idVersion,
      fidEntregable: idEntregable,
      fidEstadoEntregable:5,
      fidAlumno: idAlumno
  });
      openEditModal();
  }
  else{
    setVersionSeleccionada({
      fidEntregable: idEntregable,
      fidEstadoEntregable:2,
      fidAlumno: idAlumno
  });
    openPostModal();
  }
  var i=0;

  console.log(documentoVersionNuevo);

  setDocumentoVersionNuevo({
    esRetroalimentacion : 0
});
    peticionPostDocumento();

  console.log(documentoVersionNuevo);
  console.log(versionSeleccionada);
}
const peticionPostDocumento=async()=>{
  const requestInit = {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify(documentoVersionNuevo)
}
console.log(documentoVersionNuevo);
  fetch('https://localhost:7012/api/DocumentoVersion/InsertarDocumentoVersion', requestInit)
  await axios.post("https://localhost:7012/api/DocumentoVersion/InsertarDocumentoVersion",documentoVersionNuevo,{
      _method: 'POST'
    })
  .then(response=>{
  }).catch(error =>{
    console.log(error.message);
  })

}


const cargarVersion=async()=>{

  if(idVersion!=null){
    (async () => {
    const urlDocumentos  = `https://localhost:7012/api/DocumentoVersion/BuscarDocumentoVersionXIdVersion?idVersion=${idVersion}`
    const responseDocumentos  = await fetch(urlDocumentos)
    const dataDocumentos = await responseDocumentos.json()
    setDocumentosVersion(dataDocumentos)
    console.log(documentosVersion);

    const response = await axios.get(`https://localhost:7012/api/Version/ListVersionXId?idVersion=${idVersion}`);
    setVersionSeleccionada({
      idVersion: response.data[0].idVersion,
      linkDoc: response.data[0].linkDoc,
      estadoEntregable:{fidEntregable: response.data[0].fidEntregable},
      entregable:{fidEstadoEntregable: 5},
      documentosAlumno: response.data[0].documentosAlumno,
      documentosRetroalimentación: response.data[0].documentosRetroalimentación,
      alumno:{fidAlumno: response.data[0].fidAlumno},
      comentarios: response.data[0].comentarios,
    } 
    );
  })();
    //  setSubtitulo("Modificar Entrega");
       console.log(versionSeleccionada)
    }

}
useEffect(() => {
 
    cargarVersion();

  }, []);


const peticionPost=async()=>{
  console.log(versionSeleccionada);
  await axios.post("https://localhost:7012/api/Version/PostVersion",versionSeleccionada,{
      _method: 'POST'
    })
  .then(response=>{
    closePostModal();
    openGuardadoModal();
  }).catch(error =>{
    console.log(error.message);
  })
}

const peticionPut=async()=>{
  await axios.put("https://localhost:7012/api/Version/ModifyVersion",versionSeleccionada,{
    _method: 'PUT'
  })
  .then(response=>{
    closeEditModal();
    openEditadoModal();
    console.log(versionSeleccionada)
  }).catch(error =>{
    console.log(error.message);
  })
}
const peticionDelete=async()=>{
  await axios.delete("https://localhost:7012/api/DocumentoVersion/EliminarDocumentoVersion?idDocumentoVersion="+ documentoVersion.idDocumentoVersion).then(response=>{
    cargarVersion();
    closeDeleteModal();
    openConfirmModal();
  })
}
const seleccionarDocumentoVersion=(documentos)=>{
  setDocumentoVersion(documentos);
  openDeleteModal();
}
//src={URL.createObjectURL(fileObj)}
// <span>{convertBytesToKB(linkDoc.size)} kb</span>  
//<span>{convertBytesToKB(fileObj.size)} kb</span> 
  return (
    <>
      <FileUploadContainer>
      {(( estadoEntregable>1) ? " ":
      <div align = "center">
        <img width="140px" float= "left" top="1000px"  src={require('../imagenes/subida.png')} alt="archivo"></img>
         
        <center>
        <p class="HEADER-TEXT2" >Seleccione o suelte un archivo</p></center>
        <p class="HEADER-TEXT4">Los archivos JPG, PNG O PDF, no pueden superar las 100 MB de tamaño</p>
         <p class="HEADER-TEXT9">{idAlumno}</p></div> )}
        <FormField
          type="file"
          ref={fileInputField}
          onChange={handleNewFileUpload}
          title=""
          value=""
          {...otherProps}
        /> 
           <div class="row INSERTAR-BOTONES">                            
        <div align = "center">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end"></div>   
        <button class="btn btn-primary fs-4 fw-bold  GUARDAR" type="button"  onClick={handleUploadBtnClick}>          
        <i className="fas fa-file-upload" />
        <span> Seleccione {otherProps.multiple ? "un archivo" : "los archivos"}</span></button>
        </div>
        </div>     

        <PreviewList>


              {((idVersion >= 0) ? documentosVersion.map((documentos) => {
                   return (
              
                  <PreviewContainer key={documentos.idDocumentoVersion}>
                         <div>
                          {<ImagePreview src="https://reactionando-s3-software.s3.amazonaws.com/document.png" alt={`file preview ${tituloDoc}`}/>}
                     <FileMetaData>
                    <span>{documentos.nombreDocumento}</span>                   
                    <aside>                    
                      <button class="btn BTN-ACCIONES-BASURA" onClick={()=>seleccionarDocumentoVersion(documentos)}><BootIcons.BsTrash /> </button>
                    </aside>     
                  </FileMetaData>
                </div>
        
              </PreviewContainer>
              
            );
                }): " ")} 
          {
          
          files.map((file, index) => {
            if(index==0){
            const fileObj = file.file;
            let isImageFile = fileObj.type.split("/")[0] === "image";
            let fileName = fileObj.name;
            documentos=documentos + fileName + " "
            link=urlInicial+fileName;
            titulo=fileObj.name;
            urlInicial=urlInicial+fileName;
            versionSeleccionada.linkDoc = urlInicial;
            versionSeleccionada.documentosAlumno = fileName;
          /*  setDocumentosVersionNuevo({
              idVersion: idVersion,
              documentosAlumno: fileName,
              linkDoc: "https://reactionando-s3-software.s3.amazonaws.com/"+fileName,
              esTarea: 1
          });*/
          //  documentosVersionNuevo.data[index].idVersion = idVersion;
         //   documentosVersionNuevo[index].documentosAlumno = fileName;
         //   documentosVersionNuevo[index].linkDoc = "https://reactionando-s3-software.s3.amazonaws.com/"+fileName;
         //   documentosVersionNuevo[index].esTarea = 1;
         //  setDocumentosVersionNuevo(documentosVersionNuevo);
     /*       setDocumentoVersionNuevo({
          idVersion: idVersion,
          documentosAlumno: fileName,
          linkDoc: "https://reactionando-s3-software.s3.amazonaws.com/"+fileName,
          esTarea: 1
      });*/
      documentoVersionNuevo.idVersion = idVersion;
      documentoVersionNuevo.nombreDocumento = fileName;
      documentoVersionNuevo.linkDoc = "https://reactionando-s3-software.s3.amazonaws.com/"+fileName;
      documentoVersionNuevo.esTarea = 1;

         return (
              
              <PreviewContainer key={fileName}>
                <div>
                  {
                    <ImagePreview
                      src="https://reactionando-s3-software.s3.amazonaws.com/document.png"
                      alt={`file preview ${index}`}
                      
                    />
                  }
                  <FileMetaData isImageFile={isImageFile}>
                    <span>{fileObj.name}</span>
 
                    <aside>
                       
                      <button class="btn BTN-ACCIONES-BASURA" onClick={() =>removeFile(fileName)}><BootIcons.BsTrash /> </button>
                    </aside>     
                  </FileMetaData>
                </div>
        
              </PreviewContainer>              
            );         
          }      } 
          )       
          }
        </PreviewList>

      </FileUploadContainer>


           <ModalPregunta
              isOpen={isOpenEditModal} 
              closeModal={closeEditModal}
              procedimiento = "modificar"
              objeto="los "
              elemento={"archivos"}
            >

              
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionPut()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeEditModal}>Cancelar</Button>
              </div>
            </ModalPregunta>

          <ModalPregunta
              isOpen={isOpenPostModal} 
              closeModal={closePostModal}
              procedimiento = "guardar"
              objeto="los "
              elemento={"archivos"}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" type="submmit" onClick={()=>peticionPost()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closePostModal}>Cancelar</Button>
              </div>
            </ModalPregunta>




            <ModalConfirmación
              isOpen={isOpenGuardadoModal} 
              closeModal={closeGuardadoModal}
              procedimiento= "guardado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <div class="align-text-bottom">
                <Button class="btn btn-success btn-lg" onClick={()=>cerrarPost()}>Entendido</Button>
                </div>
              </div>
            </ModalConfirmación>
            <ModalConfirmación
              isOpen={isOpenEditadoModal} 
              closeModal={closeEditadoModal}
              procedimiento= "modificado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={()=>cerrarPut()}>Entendido</Button>
              </div>
            </ModalConfirmación>



            <ModalPregunta
        isOpen={isOpenDeleteModal} 
        closeModal={closeDeleteModal}
        procedimiento = "eliminar"
        objeto="el documento"
        elemento={documentoVersion && documentoVersion.nombreDocumento}
      >
        <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
          <Button class="btn  btn-success btn-lg" onClick={()=>peticionDelete()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button class="btn btn-danger btn-lg"  onClick={closeDeleteModal}>Cancelar</Button>
        </div>
      </ModalPregunta>

      <ModalConfirmación
        isOpen={isOpenConfirmModal} 
        closeModal={closeConfirmModal}
        procedimiento= "eliminado"
      >
        <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
          <Button class="btn btn-success btn-lg" onClick={closeConfirmModal}>Entendido</Button>
        </div>
      </ModalConfirmación>


      <div class="row INSERTAR-BOTONES">                            
        <div align = "center">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end"></div>   
        <button class="btn btn-primary fs-4 fw-bold  GUARDAR" type="submmit" onClick={()=>peticionSelecter()}><span>Guardar</span></button>
        <button class="btn btn-primary fs-4 fw-bold  CANCELAR " type="button"onClick={()=>{navigate(-1)}}><span>Cancelar</span></button>
        </div>
        </div>
    </>
    
  );

};

export default Upload;