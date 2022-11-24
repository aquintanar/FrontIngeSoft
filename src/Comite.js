import "bootstrap/dist/css/bootstrap.min.css";
import { BarraVolver } from './components/BarraVolver';
import React from 'react';
import './Pagina.css'
import SidebarComite from './components/Comite/SidebarComite';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import  TemaSeleccionado from './pages/Comite/TemaSeleccionado';
import ListaTemaTesis from "./pages/Comite/ListaTemaTesis";
import DatosRubrica from "./pages/Comite/DatosRubrica";
import Entregable from "./pages/Comite/Entregable";
import  ListaEntregables from './pages/Comite/ListaEntregables';
import DatosEntregable from "./pages/Comite/DatosEntregable";
import AddEncuesta from "./pages/Comite/AddEncuesta";
import ReporteAlumnos from "./pages/Comite/ReporteAlumnos";
import Tesis from "./pages/Comite/Tesis";
import ReporteCiclo from "./pages/Comite/ReporteCiclo";
import EncuestaPreguntas from "./pages/Comite/EncuestaPreguntas";
import DatosEncuesta from "./pages/Comite/DatosEncuesta";
import ListarAsesores from "./pages/Comite/ListarAsesores";
import DatosAsesor from "./pages/Comite/DatosAsesor";
import ListSistEvaluacion from './pages/Comite/ListSistEvaluacion';
import DatoSistEvaluación from './pages/Comite/DatoSistEvaluacion';
import ListarAsesoresNoEstan from "./pages/Comite/AgregarAsesor";
import ListarAlumnos from "./pages/Comite/ListarAlumnos";
import DatosAlumno from "./pages/Comite/DatosAlumno";
import ListarAlumnosNoEstan from "./pages/Comite/AgregarAlumno";
import CrearCuentaAlumno from'./pages/Comite/CrearCuenta';
import ListarDocentes from "./pages/Comite/ListarDocentes";
import DatosDocente from "./pages/Comite/DatosDocente";
import ListarDocentesNoEstan from "./pages/Comite/AgregarDocente";



function Comite() {

    return (
        <div>    

              <SidebarComite/>
              <BarraVolver />

              <Routes>
                  <Route path='temaTesis' exact element= {<ListaTemaTesis/>}/>
                  <Route path='temaTesis/temaSeleccionado/:id' exact element= {<TemaSeleccionado/>}/>
                  <Route path='asesor' exact element= {<ListarAsesores/>}/>
                  <Route path='asesor/DatosAsesor/:id' exact element= {<DatosAsesor/>}/>
                  <Route path='asesor/AgregarAsesor' exact element= {<ListarAsesoresNoEstan/>}/>
                  <Route path='alumno' exact element= {<ListarAlumnos/>}/>
                  <Route path='alumno/DatosAlumno/:id' exact element= {<DatosAlumno/>}/>
                  <Route path='alumno/AgregarAlumno' exact element= {<ListarAlumnosNoEstan/>}/>
                  <Route path='docente' exact element= {<ListarDocentes/>}/>
                  <Route path='docente/DatosDocente/:id' exact element= {<DatosDocente/>}/>
                  <Route path='docente/AgregarDocente' exact element= {<ListarDocentesNoEstan/>}/>
                  <Route path='crearCuenta' exact element= {<CrearCuentaAlumno/>}/>
                  <Route path='preparacion/entregables' exact element= {<ListaEntregables/>}/>
                  <Route path='preparacion/entregables/menu/:id' exact element= {<Entregable/>}/>
                  <Route path='preparacion/entregables/menu/:id/datosEntregable' exact element= {<DatosEntregable/>}/>
                  <Route path='preparacion/entregables/menu/:id/datosRubrica' exact element= {<DatosRubrica/>}/>
                  <Route path='encuesta/anadirEncuesta' exact element = {<AddEncuesta/>}/>
                  <Route path='encuesta/anadirEncuesta/lista/:id' exact element= {<EncuestaPreguntas/>}/>
                  <Route path='encuesta/anadirEncuesta/lista/:id/datosEncuesta' exact element= {<DatosEncuesta/>}/>
                  <Route path='reportealumnos' exact element={<ReporteAlumnos/>}/>
                  <Route path='tesis' exact element={<Tesis/>}/>
                  <Route path='reporteciclo' exact element={<ReporteCiclo/>} />
                  <Route path='sistEvaluacion' exact element={<ListSistEvaluacion/>} />
                  <Route path='sistEvaluacion/datoSistEvalución/:id' exact element= {<DatoSistEvaluación/>}/>
                  
              </Routes>

        </div>
    )
  }
  
  export default Comite;