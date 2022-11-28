import React from 'react'
import './proponerTemaAsesor.css';
import {useState , useEffect} from "react";
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
const urlCoAsesor= "http://34.195.33.246/api/TemaTesisXAsesor/";
const urlAsesor= "http://34.195.33.246/api/Asesor/";
let id = 0;

const BuscarTemaAsesor = ({temaTesis, setTemaTesis}) => {
    let navigate = useNavigate();
    const [asesorTesis, setAsesor] = useState({
        idAsesor: '',
        maxAsesorados: 0,
        estaObservado: 0,
        nombres: '',
        correo: '',
        apePat: '',
        codigoPucp: '',
        imagen : '',
        contrasena: ''
    })

    const [asesorTesisXTema, setAsesorXTema] = useState({
        idTemaTesisXAsesor: '',
        idAsesor: '',
        idTemaTesis: ''
    })

    const getTemaTesisXAsesor=async()=>{
        await axios.get(urlCoAsesor+"GetTemaTesisXAsesorXIdTemaTesis?idTemaTesis="+temaTesis.idTema)
      .then(response=>{
        id = response.data[0].idAsesor;
        console.log(id);
        getAsesor();
        console.log(response.data);
      }).catch(error =>{
        console.log(error.message);
      })
    }

    const getAsesor=async()=>{
        await axios.get(urlAsesor+"GetAsesorXId?idAsesor="+id)
      .then(response=>{
        setAsesor(response.data[0]);
        console.log(response.data);
      }).catch(error =>{
        console.log(error.message);
      })
    }

    useEffect(()=>{
        getTemaTesisXAsesor();
    },[])

    return(
        <div className='CONTAINER-ASESOR'>
        <form>
            <h1 className='HEADER-TEXT1'>Buscar tema de tesis</h1>
            <div className="form-group DATOS row mt-3">
                <p for="tituloTesis" className="col-md-2 col-form-label mt-2"> Titulo de tesis: </p>
                <div className = "col-md-10">
                    <input type='text' className="form-control" id="tituloTesis" name="tituloTesis"
                    style={{display: 'flex', height:'2vw'}} disabled value={temaTesis.tituloTesis}/>
                </div>
            </div>
            <div className="form-group DATOS row mt-3">
                <p for="asesor" className="col-md-2 col-form-label FUENTE-LABEL"> Nombre asesor:</p>
                <div className = "col-md-10">
                    <p > {asesorTesis.nombres + " " + asesorTesis.apePat } </p>
                </div>
            </div>
            <div className="form-group DATOS row mt-3">
                <p for="coasesor" className="col-md-2 col-form-label FUENTE-LABEL"> Nombre co-asesor:</p>
                <div className = "col-md-10">
                    <input type='text' className="form-control" id="nombreCoAsesor" name="nombreCoAsesor"  disabled
                    style={{display: 'flex', height:'2vw'}} value={ asesorTesis.nombres + " " + asesorTesis.apePat} />
                </div>
            </div>

            <div className="form-group DATOS row mt-3">
                <p for="descripcionTema" className="col-md-6 col-form-label FUENTE-LABEL" > Descripcion del tema:</p>
                <div className = "col-md-12">
                    <textarea class="form-control" id="desciripcionTema" name="descripcion" rows={4} disabled value={temaTesis.descripcion}></textarea>
                </div>                
            </div>

            <div className="form-group DATOS row mt-3">
                <p for="palabraClave1" className="col-md-2 col-form-label FUENTE-LABEL"> Palabra clave 1:</p>
                <div className = "col-md-4">
                    <input type='text' className="form-control" id="palabraClave1" name="palabraClave1"
                    style={{display: 'flex' }} disabled value={temaTesis.palabraClave1}/>
                </div>
                <p for="palabraClave2" className="col-md-2 col-form-label FUENTE-LABEL"> Palabra clave 2:</p>
                <div className = "col-md-4">
                    <input type='text' className="form-control" id="palabraClave2" name="palabraClave2"
                    style={{display: 'flex' }} disabled value={temaTesis.palabraClave2}/>
                </div>
            </div>

            <div className="form-group DATOS row mt-3">
                <p for="Estado" className="col-md-2 col-form-label FUENTE-LABEL"> Estado aprobacion:</p>
                <div className = "col-md-10">
                    <p className='FUENTE-LABEL'> {temaTesis.estadoTema} </p>
                </div>
                <div className = "col-md-12">
                    <textarea className="form-control" id="motivoRechazo" name="motivoRechazo" rows="4" disabled value={temaTesis.feedback}></textarea>
                </div>
            </div>
            <div className="col-md-12 mt-3 row BOTONES-FORM">
                <p for="Estado" className="col-md-2 col-form-label FUENTE-LABEL"> Alumno:</p>
                <div className = "col-md-10">
                    <p>  </p>
                </div>
            </div>
            <div className="col-md-12 mt-3 row BOTONES-FORM">
                    <button type="button" className="btn botonForm" onClick={()=>navigate("solicitudes/")}>
                        Solicitudes
                    </button>
            </div>
        </form>
        </div>
    );
}

export default BuscarTemaAsesor;