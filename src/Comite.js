import "bootstrap/dist/css/bootstrap.min.css";
import { BarraVolver } from './components/BarraVolver';
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import SidebarComite from './components/Comite/SidebarComite';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import  TemaSeleccionado from './pages/Comite/TemaSeleccionado';
import ListaTemaTesis from "./pages/Comite/ListaTemaTesis";
import DatosRubrica from "./pages/Comite/DatosRubrica";
import Entregable from "./pages/Comite/Entregable";
import  ListaEntregables from './pages/Comite/ListaEntregables';
import DatosEntregable from "./pages/Comite/DatosEntregable";
import ReporteAlumnos from "./pages/Comite/ReporteAlumnos";
import tesisSustentar from './pages/Comite/tesisSustentar';
import Tesis from "./pages/Comite/Tesis";
import ReporteCiclo from "./pages/Comite/ReporteCiclo";
function Comite() {

    return (
        <div>    

              <SidebarComite/>
              <BarraVolver />

              <Routes>
                  <Route path='temaTesis' exact element= {<ListaTemaTesis/>}/>
                  <Route path='temaTesis/temaSeleccionado/:id' exact element= {<TemaSeleccionado/>}/>
                  <Route path='preparacion/entregables' exact element= {<ListaEntregables/>}/>
                  <Route path='preparacion/entregables/menu/:id' exact element= {<Entregable/>}/>
                  <Route path='preparacion/entregables/menu/:id/datosEntregable' exact element= {<DatosEntregable/>}/>
                  <Route path='preparacion/entregables/menu/:id/datosRubrica' exact element= {<DatosRubrica/>}/>
                  <Route path='reportealumnos' exact element={<ReporteAlumnos/>}/>
                  <Route path='tesis' exact element={<Tesis/>}/>
                  <Route path='reporteciclo' exact element={<ReporteCiclo/>} />
              </Routes>

        </div>
    )
  }
  
  export default Comite;