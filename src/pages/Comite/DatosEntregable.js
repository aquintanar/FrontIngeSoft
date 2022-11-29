import {useState,useEffect } from "react";
import React from 'react'
import '../../stylesheets/Administrador.css'
import '../../stylesheets/Calendar.css'
import '../../stylesheets/DateTimePicker.css';
import '../../stylesheets/Clock.css';
import DateTimePicker from 'react-datetime-picker';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const DatosEntregable = ({entregable, setEntregable, active, setActive,cero}) => {
    let navigate = useNavigate();
    const [fechaEntrega, onChangeFechaEntrega] = useState(entregable.fechaPresentacionAlumno);
    const [fechaParcial, onChangeFechaParcial] = useState(entregable.fechaEntregaAsesor);
    const [fechaFinal, onChangeFechaFinal] = useState(entregable.fechaLimite);
    const [numTesis, setNumTesis] = useState([]);
    //cambios comboBox
    useEffect(() => {
        infoCurso();
      }, []);
    const handleChange = e =>{
        setEntregable({
            ...entregable,
            [e.target.name]: e.target.value
        })
    }

    const handleChange2 = e =>{
        const aux = parseInt(e.target.value);
        setEntregable({
            ...entregable,
            [e.target.name]: aux
        })
        if(aux===0){
            onChangeFechaParcial(0);
        }
    }

    const cargaDatos=()=>{
        entregable.fechaEntregaAsesor = fechaParcial;
        entregable.fechaLimite = fechaFinal;
        entregable.fechaPresentacionAlumno = fechaEntrega;
        setActive("datosRubrica");
        console.log(entregable);
    }
    const infoCurso = async () => {
        const response = await axios
          .get(
            "https://localhost:7012/api/Curso/BuscarCursoXId",
            { params: { idCurso: localStorage.getItem("idCurso") } },
            {
              _method: "GET",
            }
          )
          .then((response) => {
            setNumTesis(response.data[0].numTesis);
            
          })
          .catch((error) => {
            console.log(error.message);
          });
      };
    return(
             
        <div class ="CONTAINERADMIN ">
            <h1>Datos Entrega o Presentación</h1>

            <div class="row " >
                <p>Nombre de la entrega o presentación:</p>
                <div className = "col-md-12 mb-3">
                    <input onChange={handleChange} type='text' className="form-control" id="nombre" name="nombre" placeholder="Nombre de la entrega o presentación" 
                    value={entregable && entregable.nombre} />
                </div>
            </div>

            <div class="row ">
                <div class="col-6 " >
                    <p>Tipo de evaluación:</p>
                    {(() => {
                                      switch(numTesis){
                                        case 1 : return <select select class="form-select  mb-3"  aria-label="Default select example" onChange={handleChange2} 
                                        id="fidTipoEntregable" name="fidTipoEntregable" selected value ={entregable.fidTipoEntregable}>  
                                            <option key={1} value={1}>Entregable parcial</option>
                                            <option key={2} value={2}>Entregable</option>
                                            <option key={3} value={3}>Exposición</option>
                                            <option key={4} value={4}>Entregable Final</option>
                                        </select>;
                                        case 2: return <select select class="form-select  mb-3"  aria-label="Default select example" onChange={handleChange2} 
                                        id="fidTipoEntregable" name="fidTipoEntregable" selected value ={entregable.fidTipoEntregable}>  
                                            <option key={5} value={5}>Exposiciones</option>
                                            <option key={6} value={6}>Exposición Parcial</option>
                                            <option key={7} value={7}>Exposición Final</option>
                                            <option key={8} value={8}>Documento Parcial</option>
                                            <option key={9} value={9}>Documento Final</option>
                                        </select>;
                                       
                                      }
                  }) ()}
                    
                    
                    <p>Encargado de aprobar:</p>
                    <select select class="form-select  mb-3 " aria-label="Default select example" onChange={handleChange2} 
                    id="responsableSubir" name="responsableSubir" selected value ={entregable.responsableSubir}>  
                        <option key={0}  value = {0}>Ninguno</option>
                        <option key={1}  value = {1}>Asesor</option>
                    </select>

                    
                    <p>Revisor Final:</p>
                    <select select class="form-select  mb-3" aria-label="Default select example" onChange={handleChange2} 
                    id="responsableEvaluar" name="responsableEvaluar" selected value ={entregable.responsableEvaluar}>  
                        <option key={2}  value = {2}>Profesor</option>
                        <option key={1} value={1}>Asesor</option>
                        <option key={3} value={3}>Jurado</option>
                    </select>
                </div>

                <div class="col-6  " >
                    <p>Fecha de entrega: <m> (Alumno) </m> </p>
                    <div class="mb-3 FILTRO-FECHA">
                        <DateTimePicker  onChange={onChangeFechaEntrega} value={fechaEntrega} />
                    </div>

                    <p>Fecha de límite aprobación:</p>
                    <div class="mb-2 FILTRO-FECHA">
                        <DateTimePicker onChange={onChangeFechaParcial} value={fechaParcial} />
                    </div>
                
                    <p>Fecha de revisión final:</p>
                    <div class="mb-2 FILTRO-FECHA">
                        <DateTimePicker onChange={onChangeFechaFinal} value={fechaFinal} />
                    </div>

                </div>
                
            </div>
            <div class="row ">
                <p>Descripción:</p>
                <div className = "col-md-12 mb-5">
                    <textarea onChange={handleChange} class="form-control form-control2" id="descripcion" name="descripcion" placeholder="Descripción" rows={4} value={entregable && entregable.descripcion} ></textarea>
                </div>
            </div>
            <div class="row ">                            
                <div class="INSERTAR-BOTONES">
                <button class="btn SIGUIENTE" title="Siguiente página" type="button" onClick={()=>{cargaDatos()}}><span>Siguiente</span></button>
                    <button class="btn CANCELAR" title="Cancelar" type="button" onClick={()=>{navigate("../preparacion/entregables")}}><span>Cancelar</span></button>
                </div>
            </div>

            
        </div>
    );    
}
export default DatosEntregable;