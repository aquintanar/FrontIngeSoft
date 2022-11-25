
import React, {useEffect, useState,Component} from 'react';
import { useNavigate,useParams,useLocation } from 'react-router-dom';
//import { Upload } from '@aws-sdk/lib-storage';
import '../../stylesheets/Alumno.css'
import useModal from '../../hooks/useModals';

import axios from 'axios';
import Upload_Asesor from "../../components/Upload_Asesor";
import { Buffer } from "buffer";
import AWS from "aws-sdk";
import {  Button} from '@material-ui/core';
import {ModalConfirmación, ModalPregunta} from '../../components/Modals';
Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;

const url= "https://localhost:7012/api/Version/";

function NotaAlumno()  {
 /*  
   accept=".jpg,.png,.jpeg,.svg"
}*/
const aux = 0;
let navigate = useNavigate();
const location = useLocation();
const [files, setFiles] = useState([]);
const [subTitulo,setSubtitulo] = useState("Agregar Entrega");
var documents="22";


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

const cargarVersion=async()=>{
  if(location.state.idVersion!=null){
    const response = await axios.get(`https://localhost:7012/api/Version/ListVersionXId?idVersion=${location.state.idVersion}`);
    setVersionSeleccionada({
      idVersion: response.data[0].idVersion,
      linkDoc: response.data[0].linkDoc,
      entregable:{fidEntregable: response.data[0].fidEntregable},
      documentosAlumno: response.data[0].documentosAlumno,
      documentosRetroalimentación: response.data[0].documentosRetroalimentación,
      alumno:{fidAlumno: response.data[0].fidAlumno},
    } 
    

  );
  //  setSubtitulo("Modificar Entrega");
     console.log(versionSeleccionada)
     aux=1;
  }

}
useEffect(() => {
 
    cargarVersion();

  }, []);
 	




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


  const handleUpload = (event) => {
    event.preventDefault();

    console.log("Uploading files");
    for (const file in files) {
      uploadImageToS3(files[file].file);
      documents = documents + "^" + files[file].file.name ;
      console.log(documents);
    }
    setFiles([]);
  };

  const vacio = (event) => {
    event.preventDefault();

  };
  /*
          <div class="row INSERTAR-BOTONES">                            
        <div align = "center">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end"></div>   
        <button class="btn btn-primary fs-4 fw-bold  GUARDAR" type="button" onClick={()=>peticionSelecter()}><span>Guardar</span></button>
        <button class="btn btn-primary fs-4 fw-bold  CANCELAR " type="button" onClick={()=>{navigate(-1)}}><span>Cancelar</span></button>
        </div>
        </div>
        */
 return (   
    <div class="CONTAINERALUMNO">   

   <p class="HEADER-TEXT1-DOCUMENTO">{location.state.nombreEntregable} - {location.state.tituloDoc}</p>
   <p class="HEADER-TEXT1-DOCUMENTO">Archivos enviados</p>
   <div class="row ">

      
        <Upload_Asesor
         accept=".pdf,.docx"
          files={files}
          linkDoc={location.state.linkDoc}
          tituloDoc={location.state.tituloDoc}
          nombreArchivo={versionSeleccionada.documentosAlumno}
          idAlumno={location.state.idAlumno}
          idEntregable={location.state.idEntregable}      
          idVersion = {location.state.idVersion}    
          estadoEntregable = {location.state.estado}  
          tieneDocumento = {location.state.tieneDocumento}
          setFiles={setFiles}
          
          multiple
        />

 

      </div>



   </div>
    ) 
}
    

export default NotaAlumno;