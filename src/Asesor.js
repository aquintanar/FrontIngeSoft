import { BarraVolver } from './components/BarraVolver';
import React, { useState } from 'react';
import './Pagina.css'
import SidebarAsesor from './components/Asesor/SidebarAsesor';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import "./pages/Asesor/buttonGroup.css";
import TemaTesis from './pages/Asesor/TemaTesis';
import AlumnosAsesorados from './pages/Asesor/AlumnosAsesorados';
import AlumnoSeleccionado from './pages/Asesor/AlumnoSeleccionado';
import Entregables from './pages/Asesor/Entregables';
import EntregableSeleccionado from './pages/Asesor/EntregableSeleccionado';
import AvancesSemanales from './pages/Asesor/AvancesSemanales';
import AvanceSemanalSeleccionado from './pages/Asesor/AvanceSemanalSeleccionado';
import EntregableParcialSeleccionado from './pages/Asesor/EntregableParcialSeleccionado';
import EntregablesParciales from './pages/Asesor/EntregablesParciales';
import HistorialVersiones from './pages/Asesor/HistorialVersiones';
import Calendario from './pages/Asesor/Calendario';
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
                <BarraVolver/>
                <Routes>
                  <Route path='temaTesis' exact element= {<TemaTesis/>}/>
                  <Route path='alumnos' exact element= {<AlumnosAsesorados/>}/>
                  <Route path='calendario' exact element= {<Calendario/>}/>
                  <Route path='alumnos/alumnoSeleccionado' exact element= {<AlumnoSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables' exact element= {<Entregables/>}/>
                  <Route path='alumnos/alumnoSeleccionado/avancesSemanales' exact element= {<AvancesSemanales/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales' exact element= {<EntregablesParciales/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/avancesSemanales/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/historialVersiones' exact element= {<HistorialVersiones/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregables/entregableSeleccionado' exact element= {<EntregableSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/avancesSemanales/avanceSemanalSeleccionado' exact element= {<AvanceSemanalSeleccionado/>}/>
                  <Route path='alumnos/alumnoSeleccionado/entregablesParciales/entregableParcialSeleccionado' exact element= {<EntregableParcialSeleccionado/>}/>
              </Routes>
        </div>
    )
  }
  
export default Asesor;