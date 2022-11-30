import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import { BrowserRouter as Router ,HashRouter,Routes, Route, Link } from 'react-router-dom';
import NavBar from "./NavBar";
import Home  from "./Home";
import Comite  from "./Comite";
import ComiteCoordinador from './ComiteCoordinador';
import Administrador from './Administrador';
import Alumno from './Alumno';
import Profesor from './Profesor';
import Asesor from './Asesor';
import Jurado from './Jurado';
import Login from './components/lniciar_Sesion/Login'
import Register from './components/lniciar_Sesion/Register';
import RequireAuth from './components/lniciar_Sesion/RequireAuth';
import ErrorPage from './ErrorPage'
import { UserContext } from './UserContext';
import Cursos from './Cursos';
import ConfirmarRegistro from './ConfirmarRegistro';
import Opciones from './components/lniciar_Sesion/Opciones';
function App() {
  const [value,setValue] = useState('Hello from context');
  return (
    <UserContext.Provider value={{value,setValue}}>
    <Router >
            <Routes>
                {/*Public Routes */ }
                <Route path='/' exact element= {<Login/>} />
                <Route path='/Register' exact element= {<Register/>} />
                <Route path='/Opciones' exact element={<Opciones/>}/>
                <Route path="*" element={<ErrorPage/>}/>
                
                {/*Private Routes */}  
                  <Route path='/comite/*' exact element= {<Comite/>} />
                  <Route path='/comiteCoordinador/*' exact element= {<ComiteCoordinador/>} />
                  <Route path='/cursos/*' exact element= {<Cursos/>} />
                  <Route path='/administrador/*' exact element= {<Administrador/>} />
                  <Route path='/alumno/*' exact element= {<Alumno/>} />
                  <Route path='/profesor/*' exact element= {<Profesor/>} />
                  <Route path='/asesor/*' exact element= {<Asesor/>} />
                  <Route path='/jurado/*' exact element= {<Jurado/>} />
                  <Route path='/confirmarRegistro/*' exact element={<ConfirmarRegistro/>}/>
            </Routes>
           
    </Router>
    </UserContext.Provider>
  )
}

export default App;
/*

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import './Pagina.css'
import { BrowserRouter as Router ,HashRouter,Routes, Route, Link } from 'react-router-dom';
import NavBar from "./NavBar";
import Home  from "./Home";
import Comite  from "./Comite";
import ComiteCoordinador from './ComiteCoordinador';
import Administrador from './Administrador';
import Alumno from './Alumno';
import Profesor from './Profesor';
import Asesor from './Asesor';
import Jurado from './Jurado';
import Login from './components/lniciar_Sesion/Login'
import Register from './components/lniciar_Sesion/Register';
import RequireAuth from './components/lniciar_Sesion/RequireAuth';
import ErrorPage from './ErrorPage'
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';
import Cursos from './Cursos';
import ConfirmarRegistro from './ConfirmarRegistro';
import Opciones from './components/lniciar_Sesion/Opciones';
function App() {
  const [value,setValue] = useState('Hello from context');
  const [algo,setAlgo] = useState(0);

  useEffect(() => {
    if(localStorage){
      if(parseInt(localStorage.getItem("LOGUEADO"))){
        if(localStorage.getItem("TIPOUSUARIO")==="ADMINISTRADOR"){
          setAlgo(2);
        }
        else if(localStorage.getItem("TIPOUSUARIO"==="ALUMNO"))
          setAlgo(3);
        else{
          setAlgo(1);
        }  
      }
      else{
        setAlgo(0);
      }
    }else{
      setAlgo(0);
    }
  }, [])
  

  return (
    <UserContext.Provider value={{value,setValue}}>
    <Router >
            <Routes>
                
                {(() => {
                  switch(algo){
                    case 1: return <Route path='/' exact element= {<Opciones/>} />
                    case 2: return <Route path='/' exact element= {<Administrador/>} />
                    case 3: return <Route path='/' exact element= {<Alumno/>} />
                    case 0: return <Route path='/' exact element= {<Login/>} />
                  }
                }) ()}

                <Route path='/Register' exact element= {<Register/>} />
                <Route path='/Opciones' exact element={<Opciones/>}/>
                <Route path="*" element={<ErrorPage/>}/>
                
                 
                  <Route path='/comite/*' exact element= {<Comite/>} />
                  <Route path='/comiteCoordinador/*' exact element= {<ComiteCoordinador/>} />
                  <Route path='/cursos/*' exact element= {<Cursos/>} />
                  <Route path='/administrador/*' exact element= {<Administrador/>} />
                  <Route path='/alumno/*' exact element= {<Alumno/>} />
                  <Route path='/profesor/*' exact element= {<Profesor/>} />
                  <Route path='/asesor/*' exact element= {<Asesor/>} />
                  <Route path='/jurado/*' exact element= {<Jurado/>} />
                  <Route path='/confirmarRegistro/*' exact element={<ConfirmarRegistro/>}/>
            </Routes>
           
    </Router>
    </UserContext.Provider>
  )
}

export default App;

*/