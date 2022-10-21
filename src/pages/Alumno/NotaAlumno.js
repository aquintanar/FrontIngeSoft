
import React, {useEffect, useState,Component} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
//import { Upload } from '@aws-sdk/lib-storage';
import '../../stylesheets/Alumno.css'


import Upload from "../../components/Upload";
import { Buffer } from "buffer";
import AWS from "aws-sdk";

Buffer.from("anything", "base64");
window.Buffer = window.Buffer || require("buffer").Buffer;



function NotaAlumno()  {
 /*  
   accept=".jpg,.png,.jpeg,.svg"
}*/
let navigate = useNavigate();
const [files, setFiles] = useState([]);

  const S3_BUCKET = "react-s3-software";
  const REGION = "us-east-1";

  AWS.config.update({
    accessKeyId: "AKIASUAJKDQB3FZ25YNH",
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
    }
    setFiles([]);
  };
 return (   
    <div class="CONTAINERALUMNO">   

   <p class="HEADER-TEXT1">Entregable - Bibliografia (E1.1)</p>
   <p class="HEADER-TEXT2">Archivos enviados</p>
   <div class="row ">

          <form onSubmit={handleUpload}>
        <Upload
         accept=".pdf,.docx"
          files={files}
          setFiles={setFiles}
          multiple
        />
    
        <div class="row INSERTAR-BOTONES">                            
        <div align = "center">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end"></div>   
        <button class="btn btn-primary fs-4 fw-bold  GUARDAR" type="submmit" ><span>Guardar</span></button>
        <button class="btn btn-primary fs-4 fw-bold  CANCELAR " type="button" onClick={()=>{navigate("../gestion")}}><span>Cancelar</span></button>
        </div>
        </div>
      </form>

      </div>

   </div>
    )
}

export default NotaAlumno;