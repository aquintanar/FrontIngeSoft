import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import SidebarAdmin from './components/Administrador/SidebarAdmin';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import ListaEspecialidad  from './pages/Administrador/ListaEspecialidad';
import DatosEspecialidad from './pages/Administrador/DatosEspecialidad';
import ListaSemestre from './pages/Administrador/ListaSemestre';
import DatosSemestre from './pages/Administrador/DatosSemestre';
import Gestion from './pages/Administrador/Gestion';
import ListaFacultad  from './pages/Administrador/ListaFacultad';
import DatosFacultad from './pages/Administrador/DatosFacultad';

function Administrador() {
    return (
        <div>    
              <SidebarAdmin/>
              <Routes>
                  <Route path='gestion' exact element ={<Gestion/>} />
                  <Route path='gestion/gesFacultad' exact element= {<ListaFacultad/>}/>
                  <Route path='gestion/gesFacultad/datosFacultad/:id' exact  element= {<DatosFacultad/>}/>
                  <Route path='gestion/gesEspecialidad' exact element= {<ListaEspecialidad/>}/>
                  <Route path='gestion/gesEspecialidad/datosEspecialidad/:id' exact  element= {<DatosEspecialidad/>}/>
                  <Route path='gestion/gesSemestre' exact element= {<ListaSemestre/>}/>
                  <Route path='gestion/gesSemestre/datosSemestre/:id'  exact element= {<DatosSemestre/>}/>
              </Routes>
        </div>
    )
  }
  
  export default Administrador;