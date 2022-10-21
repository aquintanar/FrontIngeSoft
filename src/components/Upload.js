import { Button } from "bootstrap";
import React, { useState, useRef, useEffect } from "react";
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

const KILO_BYTES_PER_BYTE = 1000;

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const Upload = ({ label, files, setFiles, ...otherProps }) => {
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
//src={URL.createObjectURL(fileObj)}
  return (
    <>
      <FileUploadContainer>
     

        <p class="HEADER-TEXT3">Seleccione o suelte un archivo</p>
        <p class="HEADER-TEXT4">Los archivos JPG, PNG O PDF, no pueden superar las 100 MB de tamaño</p>
   
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
        <button class="btn btn-primary fs-4 fw-bold  GUARDAR" type="button"  onClick={handleUploadBtnClick} >          
        <i className="fas fa-file-upload" />
        <span> Seleccione {otherProps.multiple ? "un archivo" : "los archivos"}</span></button>
        </div>
        </div>     

        <PreviewList>
          {files.map((file, index) => {
            const fileObj = file.file;
            let isImageFile = fileObj.type.split("/")[0] === "image";
            let fileName = fileObj.name;
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
                      <span>{convertBytesToKB(fileObj.size)} kb</span>
        
                      <button class="fs-10 outline-none fw-bold fa fa-trash-o"
                       
                       onClick={() => removeFile(fileName)}
                      />


                    </aside>
                  </FileMetaData>
                </div>
                
              </PreviewContainer>
            );
          })}
        </PreviewList>
      </FileUploadContainer>

    </>
  );
};

export default Upload;