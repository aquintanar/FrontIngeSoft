import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import SidebarAsesor from './components/Asesor/SidebarAsesor';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import "./pages/Asesor/buttonGroup.css";
import TemaTesis from './pages/Asesor/TemaTesis';
import AlumnosAsesorados from './pages/Asesor/AlumnosAsesorados';
import AlumnoSeleccionado from './pages/Asesor/AlumnoSeleccionado';
import Entregables from './pages/Asesor/Entregables';
import EntregableSeleccionado from './pages/Asesor/EntregableSeleccionado';
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
                {/*<BarraVolver/>*/}
                <Routes>
                  <Route path='temaTesis' exact element= {<TemaTesis/>}/>
                  <Route path='alumnos' exact element= {<AlumnosAsesorados/>}/>
                  <Route path='alumnos/alumnoSeleccionado' exact element= {<AlumnoSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables' exact element= {<Entregables/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables/entregableSeleccionado' exact element= {<EntregableSeleccionado/>}/>
              </Routes>
        </div>
    )
  }
  
export default Asesor;