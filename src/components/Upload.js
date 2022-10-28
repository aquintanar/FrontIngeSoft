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

const Upload = ({ label, files,linkDoc,tituloDoc, nombreArchivo,idAlumno,idEntregable,setFiles, ...otherProps }) => {
  var urlInicial = "https://react-s3-software.s3.amazonaws.com/";
  var titulo = "";
  var link= "";
const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
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
},
comentarios: '',
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
  navigate(-1);
}
const cerrarPut=()=>{
  closeEditadoModal();
  navigate(-1);
}
const peticionSelecter =()=>{
  
  if(tituloDoc!=null){
    versionSeleccionada.linkDoc =link;
    versionSeleccionada.documentosAlumno = titulo;
    
    setVersionSeleccionada(versionSeleccionada);
    openEditModal();

 //   console.log(versionSeleccionada);
  }
  else{
    openPostModal();  
  }

}

const cargarVersion=async()=>{
 // if(location.state.comentarios!=null){
    const response = await axios.get(`https://localhost:7012/api/Version/ListVersionesXIdAlumnoYIdEntregable?idAlumno=${idAlumno}&idEntregable=${idEntregable}`);
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
  //  setSubtitulo("Modificar Entrega");
    
 // console.log(versionSeleccionada)
  //}
}
useEffect(() => {
 
    cargarVersion();

  }, []);


const peticionPost=async()=>{
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


//src={URL.createObjectURL(fileObj)}
// <span>{convertBytesToKB(linkDoc.size)} kb</span>  
//<span>{convertBytesToKB(fileObj.size)} kb</span> 
  return (
    <>
      <FileUploadContainer>
      <div align = "center">
        <img width="140px" float= "left" top="1000px"  src={require('../imagenes/subida.png')} alt="archivo"></img>
        </div>    
        <p class="HEADER-TEXT3">Seleccione o suelte un archivo</p>
        <p class="HEADER-TEXT4">Los archivos JPG, PNG O PDF, no pueden superar las 100 MB de tamaño</p>
         <p class="HEADER-TEXT9">{idAlumno}</p>
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

        <PreviewContainer key={tituloDoc}>
                <div>
                  {
                    <ImagePreview
                      src="https://react-s3-software.s3.amazonaws.com/1156975.png"
                      alt={`file preview ${tituloDoc}`}
                      
                    />
                  }
                  <FileMetaData >
                    <span>{nombreArchivo}</span>
                    
                    <aside>
                     
                      <button class="btn BTN-ACCIONES-BASURA" onClick={() =>removeFile(tituloDoc)}><BootIcons.BsTrash /> </button>
                    </aside>     
                  </FileMetaData>
                </div>
        
       </PreviewContainer>
          {
          
          files.map((file, index) => {
            const fileObj = file.file;
            let isImageFile = fileObj.type.split("/")[0] === "image";
            let fileName = fileObj.name;
            documentos=documentos + fileName + " "
            link=urlInicial+fileName;
            titulo=fileObj.name;
            urlInicial=urlInicial+fileName;
      //      console.log(urlInicial);
            versionSeleccionada.linkDoc = urlInicial;
     //       console.log(versionSeleccionada.linkDoc);
            versionSeleccionada.documentosAlumno = fileName;
      //      console.log(versionSeleccionada.documentosAlumno);
     //       console.log(versionSeleccionada);
            
            return (
              
              <PreviewContainer key={fileName}>
                <div>
                  {
                    <ImagePreview
                      src="https://react-s3-software.s3.amazonaws.com/1156975.png"
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
          
          }
          
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