import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import '../../Pagina.css'
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';


const TemaSeleccionado = () => {
  const url="http://44.210.195.91/api/TemaTesis/GetTemaTesis";
  let navigate = useNavigate();
  let {id} = useParams();
  const [facus, setFacus] = useState([]);
  const [subTitulo,setSubtitulo] = useState("Nueva Especialidad");
  const location = useLocation();
    

  
    //Modificar 
    const modificarTema=async()=>{
      await axios.put("http://44.210.195.91/api/TemaTesis/AprobarTemaTesis?idTemaTesis="+location.state.id)
      .then(response=>{
        console.log("Aprobado");
        navigate("../temaTesis");
      }).catch(error =>{
        console.log(error.message);
      })
    }
  
    return (
      <div class="container">
      <div class="row">
          <p class="text-start fs-3 mb-4 fw-bold">Tema to Ver Tema</p>
      </div> 
          <div class="row">
              <div class="col-100%" >
                  <div class="text-start fs-5 fw-normal  mb-1">Titulo</div>
                  <div class="input-group mb-3 ">
                      <input type="text" disabled="true"  class="form-control" name="titulo" placeholder="Titulo" 
                         value={ location.state.titulo } />
                  </div>
              </div>
          </div>
          <div class="row">
              <div class="col-6" >
                  <div class="text-start fs-5 fw-normal  mb-1">Asesor</div>
                  <div class="input-group mb-3 ">
                      <input type="text" disabled="true"  class="form-control" name="titulo" placeholder="Asesor" 
                         value={location.state.nombresAsesor + ' ' + location.state.apellidoPatAsesor} />
                  </div>
              </div>
              <div class="col-6" >
              <div class="text-start fs-5 fw-normal  mb-1">Area</div>
                  <div class="input-group mb-3 ">
                      <input type="text" disabled="true"  class="form-control" name="titulo" placeholder="Area" 
                         value={location.state.areaNombre} />
                  </div>
              </div>
            </div>         

          <div class = "row">
              <div class = "col-6">
                  <div class="text-start fs-5 fw-normal ">Alumno</div>
                  <div class="input-group input-group-lg mb-3">
                      <input type="text"  disabled="true" class="form-control" name="descripcion" placeholder="Alumno" aria-label="descripcion" aria-describedby="inputGroup-sizing-lg" 
                         value={location.state.nombresAlumno + ' ' + location.state.apellidoPatAlumno}/>
                  </div>
              </div>
          </div>
          <div class = "row ">
          <div class = "col-lg-12">
                  <div class="text-start fs-5 fw-normal ">Descripcion</div>
                  <div class="input-group input-group-lg mb-3">
                      <input type="text" disabled="true"  class="form-control" name="descripcion" placeholder="Descripcion" aria-label="descripcion" aria-describedby="inputGroup-sizing-lg" 
                         value={location.state.descripcion}/>
                  </div>
              </div>       
          </div>             
          <div class = "row">
            <p>Estado de Aprobacion: {location.state.estado }</p>
            </div>    
          <div class="row">                            
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button class="btn btn-primary fs-4 fw-bold me-3 "  type="button" onClick={()=>modificarTema()}>Aprobar</button>
                  <button class="btn btn-primary fs-4 fw-bold " type="button">Descargar</button>
                  <button class="btn btn-primary fs-4 fw-bold " type="button">Corregir</button>
              </div>
          </div>
  </div>
    )
}
export default TemaSeleccionado;