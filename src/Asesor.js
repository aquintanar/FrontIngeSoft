import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import SidebarAsesor from './components/Asesor/SidebarAsesor';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import "./pages/Asesor/buttonGroup.css";
import ModalComponent from './pages/Asesor/ModalBuscarTema';
import ProponerTemaAsesor from './pages/Asesor/proponerTemaAsesor';
import BuscarTemaAsesor from './pages/Asesor/buscarTemaAsesor';

function Asesor() {
    const[active, setActive] = useState("proponerTema");
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
        <div>    
            <SidebarAsesor/>            
            <div className="container">
                <BarraVolver/>
                <nav>
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
        </div>
    )
  }
  
  export default Asesor;