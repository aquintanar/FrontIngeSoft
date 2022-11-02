import React, { useState, useEffect } from 'react';
import SidebarAsesor from '../../components/Asesor/SidebarAsesor';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import ReportexAlumno from './ReportexAlumno';
import ReportexTodos from './ReportexTodos';
import "./buttonGroup.css";

function ReporteAlumnos() {
    const[active, setActive] = useState("reportexalumno");
    const[formato, setFormato] = useState("botonActivo1");
    const [show, setShow] = useState(false);
    const[temaTesis, setTemaTesis] = useState({
        idTema: 0,
        idAsesor: 2,
        idAlumno: 1,
        idEstadoTemaTesis: 3,
        idArea: 1,
        idProponente: 2,
        estadoTema: '',
        tituloTesis:'',
        descripcion:'',
        palabraClave1:'',
        palabraClave2:'',
        feedback:'',
    })

    return (
        <div >             
            <nav className='NAVBUTTON'>
                <button onClick={() => {setActive("reportexalumno");setFormato("botonActivo1")}} className={"botonActivo1" === formato ? "customButton active" : "customButton"}>Reporte por alumno</button>
                <button onClick={() => {setActive("reportextodos");setFormato("botonActivo2"); setShow(true)}} className={"botonActivo2" === formato ? "customButton active" : "customButton"}>Reporte de todos los alumnos</button>  
            </nav>  
            <div>
                    {active === "reportexalumno" && <ReportexAlumno/>}
                    {active === "reportextodos" && <ReportexTodos />}
            </div>  
        </div>
    )
  }
  
export default ReporteAlumnos;