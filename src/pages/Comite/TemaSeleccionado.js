import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import '../../Pagina.css'
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import  '../../stylesheets/Comite.css';
import { useTable } from 'react-table';

const TemaSeleccionado = () => {
  const url="https://localhost:7012/api/TemaTesis/GetTemaTesis";
  //const url="http://44.210.195.91/api/TemaTesis/GetTemaTesis";
  let navigate = useNavigate();
  let {id} = useParams();
  let color;
  const location = useLocation();
    

  if(location.state.estado==="Aprobado"){
    color="text-success"
  }
    //Modificar 
  const modificarTema=async()=>{
      await axios.put("https://localhost:7012/api/TemaTesis/AprobarTemaTesis?idTemaTesis="+location.state.id)
      //await axios.put("http://44.210.195.91/api/TemaTesis/AprobarTemaTesis?idTemaTesis="+location.state.id)
      .then(response=>{
        console.log("Aprobado");
        navigate("../temaTesis");
      }).catch(error =>{
        console.log(error.message);
      })
    }
  
    return (
      <div className="CONTAINERCOMITE">
      <div className="row">
          <p className="HEADER-TEXT2">Ver Tema</p>
      </div> 
          <div className="row">
              <div className="col-100%" >
                  <div className="text-start fs-7 fw-normal  mb-1">Título</div>
                  <div className="input-group mb-3 ">
                      <input type="text" disabled="true"  className="form-control" name="titulo" placeholder="Titulo" 
                         value={ location.state.titulo } />
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-6" >
                  <div className="text-start fs-7 fw-normal  mb-1">Asesor</div>
                  <div className="input-group mb-3 ">
                      <input type="text" disabled="true"  className="form-control" name="titulo" placeholder="Asesor" 
                         value={location.state.nombresAsesor + ' ' + location.state.apellidoPatAsesor} />
                  </div>
              </div>
              <div className="col-6" >
              <div className="text-start fs-7 fw-normal  mb-1">Área</div>
                  <div className="input-group mb-3 ">
                      <input type="text" disabled="true"  className="form-control" name="titulo" placeholder="Área" 
                         value={location.state.areaNombre} />
                  </div>
              </div>
            </div>         

          <div class = "row">
              <div class = "col-6">
                  <div class="text-start fs-7 fw-normal ">Alumno</div>
                  <div class="input-group input-group-lg mb-3">
                      <input type="text"  disabled="true" class="form-control" name="descripcion" placeholder="Alumno" aria-label="descripcion" aria-describedby="inputGroup-sizing-lg" 
                         value={location.state.nombresAlumno + ' ' + location.state.apellidoPatAlumno}/>
                  </div>
              </div>
          </div>
          <div className = "row ">
          <div className = "col-lg-12">
                  <div class="text-start fs-7 fw-normal ">Descripción</div>
                  <div class="input-group input-group-lg mb-3">
                      <input type="text" disabled="true"  class="form-control" name="descripcion" placeholder="Descripcion" aria-label="descripcion" aria-describedby="inputGroup-sizing-lg" 
                         value={location.state.descripcion}/>
                  </div>
              </div>       
          </div>             
        
          <div className = "row">
              <p display="inline">Estado de Aprobación: <span className={color}>{location.state.estado }</span></p>
            
            </div>    
          <div className="row">                            
              <div className="LISTAR-BOTON">
                  <button class="btn btn-primary fs-4 fw-bold mb-3 me-3 "  type="button" onClick={()=>modificarTema()}>Aprobar</button>
                  <button class="btn btn-primary fs-4 fw-bold mb-3 me-3" type="button">Descargar</button>
                  <button class="btn btn-primary fs-4 fw-bold mb-3 me-3" type="button">Observar</button>
              </div>
          </div>
  </div>
    )
}
export default TemaSeleccionado;