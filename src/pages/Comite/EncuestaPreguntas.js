import React, { useState, useEffect } from 'react';
import DatosRubrica from './DatosRubrica';
import DatosEntregable from './DatosEntregable';
import axios from 'axios';
import '../../stylesheets/Administrador.css'
import { useParams } from 'react-router-dom';
import DatosEncuesta from './DatosEncuesta';

const url1= "http://34.195.33.246/api/Entregable/";
const url2= "http://34.195.33.246/api/DetalleRubrica/";
const urlEncuesta = "http://34.195.33.246/api/Encuesta/"
const urlDetalleEncuesta = "http://34.195.33.246/api/DetallePreguntaEncuesta/"
const urlCurso = "http://34.195.33.246/api/Curso/"
//const url1= "http://44.210.195.91/api/Entregable/";
//const url2= "http://44.210.195.91/api/DetalleRubrica/";

function EncuestaPreguntas() {
    const[active, setActive] = useState("datosEntregable");
    const[formato, setFormato] = useState("botonActivo1");
    const[curso,setCurso] = useState({
        idCurso : 0 ,
        nombre : '',
    });
    let {id} = useParams();
    const[entregable, setEntregable] = useState({
        idEncuesta: 0,
        nombre: '',
        fidCurso: 1,
        nombreCurso:'',
    })

    const[rubricas, setRubricas] = useState([]);
    const[rubs, setRubs] = useState([]);
     //Carga especialidad a modificar
    const cargaEntregable=async()=>{
        if(id!=='0'){
            await axios.get(urlEncuesta+"BuscarEncuestaXId?idEncuesta="+parseInt(id)).
            then(response=>{
                let aux = response.data[0];
                //console.log(rpta.data)
                //console.log(aux);
                setEntregable({
                    idEncuesta: aux.idEncuesta,
                    nombre: aux.nombre,
                    fidCurso: aux.fidCurso,
                });
            });
        }
    }
    const cargaCurso = async()=>{
        console.log("AQUI ESTA EL ENTREGABLE")
        console.log(entregable)
        //console.log(curso)
        await axios.get(urlCurso+"BuscarCursoXId?idCurso="+parseInt(entregable.fidCurso)).
        then(response=>{
                let aux2 = response.data[0];
                setCurso({
                    idCurso: aux2.idCurso,
                    nombre: aux2.nombre,
                });
        });
        console.log(curso)
    }

    const cargaRubricas=async()=>{
        if(id!=='0'){
            const response = await axios.get("http://34.195.33.246/api/DetallePreguntaEncuesta/BuscarDetallePreguntaEncuestaXId?idDetallePreguntaEncuesta="+parseInt(id));
            setRubricas(response.data);
            setRubs(response.data);
        }
    }

    const verifica=async()=>{
        if(id!=='0'){
            setActive("datosEncuesta");
        }
    }

    useEffect(()=>{
        cargaEntregable();
        cargaCurso();
        cargaRubricas();
        verifica();
    },[])


    return (
        <div>        
            <div >
                <div>
                    {active === "datosEncuesta" && <DatosEncuesta entregable={entregable} setEntregable={setEntregable} rubricas={rubricas} setRubricas={setRubricas} id={id} rubs={rubs}
                                                                    curso = {curso} setCurso = {setCurso}/>}
                </div>
                
            </div>
        </div>
    )
  }
  
export default EncuestaPreguntas;