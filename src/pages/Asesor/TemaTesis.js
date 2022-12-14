import React, { useState, useEffect } from 'react';
import SidebarAsesor from '../../components/Asesor/SidebarAsesor';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import "./buttonGroup.css";
import ModalComponent from './ModalBuscarTema';
import ProponerTemaAsesor from './proponerTemaAsesor';
import BuscarTemaAsesor from './buscarTemaAsesor';

function TemaTesis() {
    const[active, setActive] = useState("proponerTema");
    const[formato, setFormato] = useState("botonActivo1");
    const [show, setShow] = useState(false);
    const[temaTesis, setTemaTesis] = useState({
        idTemaTesis: 0,
        idProponente: parseInt(localStorage.getItem("IDUSUARIO")),
        tituloTesis:'',
        descripcion:'',
        palabraClave1:'',
        palabraClave2:'',
        motivoRechazo:'',
        area:{
            idArea:0,
            idEspecialidad:0,
            nombre:'',
        },
        fidCurso: parseInt(localStorage.getItem("idCurso")),
    })

    return (
        <div >             
            <nav className='NAVBUTTON'>
                <button onClick={() => {setActive("proponerTema");setFormato("botonActivo1")}} className={"botonActivo1" === formato ? "customButton active" : "customButton"}>Proponer tema</button>
                <button onClick={() => {setActive("buscarTema");setFormato("botonActivo2"); setShow(true)}} className={"botonActivo2" === formato ? "customButton active" : "customButton"}>Buscar tema</button>    
                <button onClick={() => {setActive("solicitarCambios") ;setFormato("botonActivo3")}} className={"botonActivo3" === formato ? "customButton active" : "customButton"}>Solicitar cambios</button>
            </nav>    
                <div>
                    {active === "proponerTema" && <ProponerTemaAsesor temaTesis={temaTesis} setTemaTesis={setTemaTesis}/>}
                    {active === "buscarTema" && <ModalComponent show={show} setShow={setShow} temaTesis={temaTesis} setTemaTesis={setTemaTesis}/>}
                    {active === "buscarTema" && <BuscarTemaAsesor temaTesis={temaTesis} setTemaTesis={setTemaTesis}/>}
                    {active === "solicitarCambios"}
                </div>
        </div>
    )
  }
  
export default TemaTesis;