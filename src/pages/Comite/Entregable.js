import React, { useState, useEffect } from 'react';
import DatosRubrica from './DatosRubrica';
import DatosEntregable from './DatosEntregable';
import axios from 'axios';
import '../../stylesheets/Administrador.css'
import { useParams } from 'react-router-dom';

const url1= "https://localhost:7012/api/Entregable/";
const url2= "https://localhost:7012/api/DetalleRubrica/";

//const url1= "http://44.210.195.91/api/Entregable/";
//const url2= "http://44.210.195.91/api/DetalleRubrica/";

function Entregable() {
    const[active, setActive] = useState("datosEntregable");
    const[formato, setFormato] = useState("botonActivo1");
    let {id} = useParams();
    const[entregable, setEntregable] = useState({
        idEntregable: 0,
        nombre: '',
        descripcion:'',
        fechaEntregaAsesor: new Date(),
        fechaLimite: new Date(),
        fechaPresentacionAlumno: new Date(),
        responsableSubir: 1,
        responsableEvaluar: 4,
        fidTipoEntregable: 1,
        fidCurso: 1,
        fidNota: 0,
    })

    const[rubricas, setRubricas] = useState([]);
    const[rubs, setRubs] = useState([]);
     //Carga especialidad a modificar
    const cargaEntregable=async()=>{
        if(id!=='0'){
            await axios.get(url1+"BuscarEntregableXId?idEntregable="+parseInt(id)).
            then(response=>{
                let aux = response.data[0];
                console.log(aux);
                if(aux.fechaEntregaAsesor==="null"){
                    aux.fechaEntregaAsesor = null;
                    aux.responsableSubir =0;
                }
                console.log(aux);
                setEntregable({
                    idEntregable: aux.idEntregable,
                    nombre: aux.nombre,
                    descripcion: aux.descripcion,
                    fidCurso: aux.fidCurso,
                    fechaEntregaAsesor: new Date(aux.fechaEntregaAsesor),
                    fechaLimite: new Date(aux.fechaLimite),
                    fechaPresentacionAlumno: new Date(aux.fechaPresentacionAlumno),
                    responsableSubir:  aux.responsableSubir,
                    responsableEvaluar:  aux.responsableEvaluar,
                    fidTipoEntregable: aux.fidTipoEntregable,
                    fidCurso : 1,
                    fidNota: 1
                });
            });
        }
    }

    const cargaRubricas=async()=>{
        if(id!=='0'){
            const response = await axios.get(url2+"ListDetalleRubricaXIdEntregable?idEntregable="+parseInt(id));
            setRubricas(response.data);
            setRubs(response.data);
        }
    }

    const verifica=async()=>{
        if(id!=='0'){
            setActive("datosRubrica");
        }
    }

    useEffect(()=>{
        cargaEntregable();
        cargaRubricas();
        verifica();
    },[])


    return (
        <div>
             <nav className="CONTAINERENTREGABLE">
                    <div class="row">
                        <div class="col BOTONES_SUPERIORES">
                            <button onClick={() => {setActive("datosEntregable");setFormato("botonActivo1")}} className={"botonActivo1" === formato ? "customButton active" : "customButton"}>Datos Evaluación</button>
                        </div>
                        <div class="col BOTONES_SUPERIORES">
                            <button onClick={() => {setActive("datosRubrica");setFormato("botonActivo2")}} className={"botonActivo2" === formato ? "customButton active" : "customButton"}>Datos Rúbrica</button>
                        </div>
                    </div>
            </nav>          
            <div >
               
                <div>
                    {active === "datosEntregable" && <DatosEntregable entregable={entregable} setEntregable={setEntregable} active={active} setActive={setActive}/>}
                    {active === "datosRubrica" && <DatosRubrica entregable={entregable} setEntregable={setEntregable} rubricas={rubricas} setRubricas={setRubricas} id={id} rubs={rubs}/>}
                </div>
                
            </div>
        </div>
    )
  }
  
export default Entregable;