import {useState , useEffect} from "react";
import React from 'react'
import '../../stylesheets/Administrador.css'
import '../../stylesheets/Calendar.css'
import '../../stylesheets/DatePicker.css';
import DatePicker from "react-date-picker";
import { useNavigate } from 'react-router-dom';



const DatosEntregable = ({entregable, setEntregable, active, setActive}) => {
    let navigate = useNavigate();
    const [fechaEntrega, onChangeFechaEntrega] = useState(entregable.fechaPresentacionAlumno);
    const [fechaParcial, onChangeFechaParcial] = useState(entregable.fechaEntregaAsesor);
    const [fechaFinal, onChangeFechaFinal] = useState(entregable.fechaLimite);
    //cambios comboBox

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
    }

    return(
             
        <div class ="CONTAINERADMIN ">
            <p class="HEADER-TEXT1 mb-4">Datos Evaluación</p>

            <div class="row DATOS" >
                <p>Nombre de la evaluación:</p>
                <div className = " input-group col-md-12 mb-3">
                    <input onChange={handleChange} type='text' className="form-control" id="nombre" name="nombre" placeholder="Nombre de la evaluación" 
                    value={entregable && entregable.nombre} />
                </div>
            </div>

            <div class="row DATOS">
                <div class="col-6 " >
                    <p>Tipo de evaluación:</p>
                    <select select class="form-select  mb-3"  aria-label="Default select example" onChange={handleChange2} 
                    id="fidTipoEntregable" name="fidTipoEntregable" selected value ={entregable.fidTipoEntregable}>  
                        <option key={1} value = {1}>Avance semanal</option>
                        <option key={2} value={2}>Entregable parcial</option>
                        <option key={3} value={3}>Entregable</option>
                        <option key={4} value={4}>Exposición</option>
                    </select>
                    
                    <p>Revisor Parcial:</p>
                    <select select class="form-select  mb-3 " aria-label="Default select example" onChange={handleChange2} 
                    id="responsableSubir" name="responsableSubir" selected value ={entregable.responsableSubir}>  
                        <option key={0}  value = {0}>Ninguno</option>
                        <option key={1}  value = {1}>Asesor</option>
                        <option key={3} value={3}>Jurado</option>
                    </select>

                    
                    <p>Revisor Final:</p>
                    <select select class="form-select  mb-3" aria-label="Default select example" onChange={handleChange2} 
                    id="responsableEvaluar" name="responsableEvaluar" selected value ={entregable.responsableEvaluar}>  
                        <option key={4}  value = {4}>Profesor</option>
                        <option key={1} value={1}>Asesor</option>
                    </select>
                </div>

                <div class="col-6  " >
                    <p>Fecha de entrega: <m> (Alumno) </m> </p>
                    <div class="mb-3 FILTRO-FECHA">
                        <DatePicker onChange={onChangeFechaEntrega} value={fechaEntrega} />
                    </div>

                    <p>Fecha de revisión parcial:</p>
                    <div class="mb-2 FILTRO-FECHA">
                        <DatePicker onChange={onChangeFechaParcial} value={fechaParcial} />
                    </div>
                
                    <p>Fecha de revisión final:</p>
                    <div class="mb-2 FILTRO-FECHA">
                        <DatePicker onChange={onChangeFechaFinal} value={fechaFinal} />
                    </div>

                </div>
                
            </div>
            <div class="row DATOS">
                <p>Descripción:</p>
                <div className = "col-md-12 mb-5">
                    <textarea onChange={handleChange} class="form-control" id="descripcion" name="descripcion" placeholder="Descripción" rows={7} value={entregable && entregable.descripcion} ></textarea>
                </div>
            </div>
            <div class="row INSERTAR-BOTONES">                            
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary fs-4 fw-bold   CANCELAR" type="button" onClick={()=>{navigate("../preparacion/entregables")}}><span>Cancelar</span></button>
                    <button class="btn btn-primary fs-4 fw-bold SIGUIENTE" type="button" onClick={()=>{cargaDatos()}}><span>Siguiente</span></button>
                </div>
            </div>

            
        </div>
    );    
}
export default DatosEntregable;