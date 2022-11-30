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
  FilePreviewContainer,
  ImagePreviewGuardado
} from "./Upload.styles";
import '../stylesheets/Alumno.css'
import '../Pagina.css'
import '../stylesheets/BarraVolver.css'
import {ModalConfirmación, ModalPregunta,ModalArchivo,ModalArchivoTamanho} from './Modals';
import useModal from '../hooks/useModals';
import {  Button} from '@material-ui/core';
import * as BootIcons  from "react-icons/bs";
import axios from 'axios';
import { Buffer } from "buffer";
import AWS from "aws-sdk";
Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;
const KILO_BYTES_PER_BYTE = 1000;
var documents="22";
const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const Upload = ({ label, files,linkDoc,tituloDoc, nombreArchivo,idAlumno,idEntregable,idVersion,estadoEntregable,tieneDocumento,setFiles, ...otherProps }) => {
  var archivo="";
  var tamanho=0;
  var urlInicial = "https://reactionando-s3-software.s3.amazonaws.com/";
  var titulo = "";
  var link= "";
  var idVersionPrueba=0;
  const url = "https://localhost:7012/";
const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();
const [isOpenGuardadoModalArchivo, openGuardadoModalArchivo ,closeGuardadoModalArchivo ] = useModal();
const [isOpenGuardadoModalArchivoTamanho, openGuardadoModalArchivoTamanho ,closeGuardadoModalArchivoTamanho ] = useModal();
const [documentosVersion , setDocumentosVersion] = useState([]);
const [documentosVersionAlumno , setDocumentosVersionAlumno ] = useState([]);
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
 esRetroalimentacionDocente:' ',
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
 esRetroalimentacionDocente:' ',
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






  const S3_BUCKET = "reactionando-s3-software";
  const REGION = "us-east-1";

  AWS.config.update({
    accessKeyId: "AKIA3322RXFUFYNYYL6P",
    secretAccessKey: "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",
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const uploadImageToS3 = (file) => {
    console.log(file);
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    console.log("params", params);

    myBucket.putObject(params).send((err) => {
      if (err) console.log(err);
    });
  };

  const handleUpload = () => {
     console.log("Uploading files");
    for (const file in files) {
      uploadImageToS3(files[file].file);
      documents = documents + "^" + files[file].file.name ;
      console.log(documents);
    }
    setFiles([]);
  };










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
  const cerrarPostArchivo=()=>{
    closeGuardadoModalArchivo();
   // navigate("../gestion");
  }
  const abrirPostArchivo=()=>{
    openGuardadoModalArchivo();
   // navigate("../gestion");     
  }

  const cerrarPostArchivoTamanho=()=>{
    closeGuardadoModalArchivoTamanho();
   // navigate("../gestion");
  }
  const abrirPostArchivoTamanho=()=>{
    openGuardadoModalArchivoTamanho();
   // navigate("../gestion");     
  }


const cerrarPost=()=>{
  handleUpload();
  closeGuardadoModal();
  navigate("/alumno/gestion/gesPortafolio");
}
const cerrarPut=()=>{
  handleUpload();
  closeEditadoModal();
  navigate("/alumno/gestion/gesPortafolio");
}
const peticionSelecter =async()=>{

if(archivo==""){
  console.log("Hola1");
  abrirPostArchivo();
}

else{

if(tamanho>1000){
  abrirPostArchivoTamanho();
}
else{
  console.log("Hola");
if(idVersion>0){
  setDocumentoVersionNuevo({
    esRetroalimentacion : 0,
});
}
else{
  setDocumentoVersionNuevo({
    esRetroalimentacion : 0,
    idVersion : 40,
});
}
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
      idVersion: idVersion,
      fidEntregable: idEntregable,
      fidEstadoEntregable:3,
      fidAlumno: idAlumno
  });
  openEditModal();
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
}
}
console.log(archivo);
}

const cargarVersion=async()=>{

  if(idVersion!=null){
    (async () => {
    const urlDocumentos  = url+`api/DocumentoVersion/BuscarDocumentoVersionXIdVersion?idVersion=${idVersion}`
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
      
      setDocumentosVersionAlumno(documentosVersionAlumno);
    const response = await axios.get(url+`api/Version/ListVersionXId?idVersion=${idVersion}`);
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
       console.log(versionSeleccionada)
    }

}
useEffect(() => {
 
    cargarVersion();

  }, []);


const peticionPost=async()=>{
  console.log(versionSeleccionada);
  await axios.post(url+"api/Version/PostVersion",versionSeleccionada,{
      _method: 'POST'
    })
  .then(response=>{
    idVersionPrueba = response.data.idVersion;
    console.log(response.data.idVersion);
    
    if(idVersion>0){
}
else {
  setDocumentoVersionNuevo({
    idVersion : idVersionPrueba, //LLAMAR CON RESPONSE AL IDVERSION Y LUEGO LLAMAR A LA FUNCION PARA CREAR DOCUMENTO
});
console.log(response.data.idVersion)
documentoVersionNuevo.idVersion = idVersionPrueba;
}
  guarda();
    closePostModal();
    openGuardadoModal();
  }).catch(error =>{
    console.log(error.message);
  })
 /* 
  if(idVersion==null){
    setDocumentoVersionNuevo({
      idVersion : versionSeleccionada.idVersion,
  });

  }*/
  

}

const guarda=async()=>{
  await axios.post(url+"api/DocumentoVersion/InsertarDocumentoVersion",documentoVersionNuevo,{
      _method: 'POST'
    })
  .then(response=>{
  }).catch(error =>{
    console.log(error.message);
  })

}


const peticionPut=async()=>{
  await axios.put(url+"api/Version/ModifyVersion",versionSeleccionada,{
    _method: 'PUT'
  })
  .then(response=>{
    closeEditModal();
    openEditadoModal();
    console.log(versionSeleccionada)
  }).catch(error =>{
    console.log(error.message);
  })
  if(idVersion==null){
    setDocumentoVersionNuevo({
      idVersion : 38,
  });

  }
  console.log(documentoVersionNuevo);
  await axios.post(url+"api/DocumentoVersion/InsertarDocumentoVersion",documentoVersionNuevo,{
      _method: 'POST'
    })
  .then(response=>{
  }).catch(error =>{
    console.log(error.message);
  })

}
const peticionDelete=async()=>{
  await axios.delete(url+"api/DocumentoVersion/EliminarDocumentoVersion?idDocumentoVersion="+ documentoVersion.idDocumentoVersion).then(response=>{
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
        
        
        {documentosVersion.length>0?" ": <div align = "center">
        <img width="140px" float= "left" top="1000px"  src={require('../imagenes/subida.png')} alt="archivo"></img>
         
        <center>
        <p class="HEADER-TEXT2" >Seleccione o suelte un archivo</p></center>
        <p class="HEADER-TEXT4">Los archivos guardados, no pueden superar 1 MB de tamaño</p>
         <p class="HEADER-TEXT9">{idAlumno}</p></div>
}    

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


              {((idVersion >= 0) ? documentosVersionAlumno.map((documentos) => {
                   return (
              
                  <PreviewContainer key={documentos.idDocumentoVersion}>
                         <div>
                          {<ImagePreviewGuardado class="amarillo" src="https://reactionando-s3-software.s3.amazonaws.com/document.png" alt={`file preview ${tituloDoc}`}/>}
                     <FileMetaData>

                     <p class="HEADER-TEXT14-DOCUMENTO">{documentos.nombreDocumento}</p>
               
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
            archivo = fileName;
            tamanho = convertBytesToKB(fileObj.size);
            documentoVersionNuevo.idDocumentoVersion = 0;
            if(idVersion>0){
              documentoVersionNuevo.idVersion = idVersion;
            }
       //     else documentoVersionNuevo.idVersion = 41;  //ACA DEBERIA IR LAS VERSIONES CREADAS
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
                    <p class="HEADER-TEXT14-DOCUMENTO">{fileObj.name}</p>
 
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
              objeto="tu entrega "
              elemento={tituloDoc}
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
              objeto="tu entrega  "
              elemento={tituloDoc}
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
              <Button class="btn btn-success btn-lg"  onClick={()=>cerrarPost()}><span>Entendido</span></Button>
                </div>
              </div>
            </ModalConfirmación>
            <ModalConfirmación
              isOpen={isOpenEditadoModal} 
              closeModal={closeEditadoModal}
              procedimiento= "modificado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <Button class="btn btn-success btn-lg"    onClick={()=>cerrarPut()}><span>Entendido</span></Button>
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
          <Button class="btn btn-success btn-lg"  onClick={closeConfirmModal}>Entendido</Button>
        </div>
      </ModalConfirmación>


      <ModalArchivo
              isOpen={isOpenGuardadoModalArchivo} 
              closeModal={closeGuardadoModalArchivo}
              procedimiento= "Debe ingresar almenos un archivo"
            >

              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <div class="align-text-bottom">
              <Button class="btn btn-success btn-lg"  onClick={()=>cerrarPostArchivo()}><span>Entendido</span></Button>
                </div>
              </div>
            </ModalArchivo>

            <ModalArchivoTamanho
              isOpen={isOpenGuardadoModalArchivoTamanho} 
              closeModal={closeGuardadoModalArchivoTamanho}
              procedimiento= "Solo debe ingresar archivos con menos de 1MB"
            >

              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <div class="align-text-bottom">
              <Button class="btn btn-success btn-lg"  onClick={()=>cerrarPostArchivoTamanho()}><span>Entendido</span></Button>
                </div>
              </div>
            </ModalArchivoTamanho>

      <div class="row INSERTAR-BOTONES">                            
        <div align = "center">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end"></div>   
        <button class="btn btn-primary fs-4 fw-bold  GUARDAR" type="button" onClick={()=>peticionSelecter()}><span>Guardar</span></button>
        <button class="btn btn-primary fs-4 fw-bold  CANCELAR " type="button" onClick={()=>{navigate(-1)}}><span>Cancelar</span></button>
        </div>
        </div>
    </>
    
  );

};

export default Upload;