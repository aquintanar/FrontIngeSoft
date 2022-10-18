import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import NavBar from "./NavBar";
import Home  from "./Home";
import Comite  from "./Comite";
import Administrador from './Administrador';
import Alumno from './Alumno';
import Profesor from './Profesor';
import Asesor from './Asesor';
import Login from './components/lniciar_Sesion/Login'
import Register from './components/lniciar_Sesion/Register';
function App() {
  return (
    <Router>
            <NavBar/>
            <Routes>
                <Route path='/' exact element= {<Login/>} />
                <Route path='/Register' exact element= {<Register/>} />
                <Route path='/comite/*' exact element= {<Comite/>} />
                <Route path='/administrador/*' exact element= {<Administrador/>} />
                <Route path='/alumno/*' exact element= {<Alumno/>} />
                <Route path='/profesor/*' exact element= {<Profesor/>} />
                <Route path='/asesor/*' exact element= {<Asesor/>} />
            </Routes>
           
    </Router>
  )
}

export default App;
