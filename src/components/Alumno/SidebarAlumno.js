import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { SidebarData } from './SidebarDataAlumno';
import { SidebarDataTesis2 } from './SidebarDataAlumnoTesis2';
import SubMenu from './SubMenuAlumno';
import { IconContext } from 'react-icons/lib';
import '../../Pagina.css';
import '../../stylesheets/SideBar.css'
import logo from '../../imagenes/logo.png';
import {useAuth0 }from '@auth0/auth0-react'
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import axios from 'axios';
const Nav = styled.div`
  background: #042354;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img{
    height: 50px;
    width: 260px;
  }
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #003C7A;
  width: 20%;
  height: 93.6vh;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 20;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
var numTesis = 0;
const Sidebar = () => {
  const url = "https://localhost:7012/";
  const {logout, isAuthenticated}=useAuth0();
  const [sidebar, setSidebar] = useState(true);
  const {value,setValue} = useContext(UserContext);
  const [nombre , setNombre] = useState([]);
  const showSidebar = () => setSidebar(sidebar);
  const [cursos , SetCursos] = useState([]);
  const peticionGet=async()=>{
    console.log("hola");
    const response =await axios.get(url+"api/Alumno/GetAlumnos")
    .then(response=>{
      for(let i in response.data){
        if(value!=0 && value!=undefined && value!=null && value!='' && value!='Hello from context'){
          if(response.data[i].idUsuario===value){
            setNombre(response.data[i].nombres +" "+ response.data[i].apeMat);
            break;
          }  
        }
        else{
          var valorGuardado = localStorage.getItem("IDUSUARIO");
          if(response.data[i].idUsuario==valorGuardado){
            setNombre(response.data[i].nombres +" "+ response.data[i].apeMat);
            break;
          }  
        }
        
      }
    }).catch(error =>{
      console.log(error.message);
    })
  }

  const getTipoEntregables = async() => {



    const urlCurso = 'https://localhost:7012/api/Curso/BuscarCursoXId?idCurso='+localStorage.getItem('idCurso');
    const responseCurso = await fetch(urlCurso);
    const dataCurso = await responseCurso.json();
    console.log(dataCurso);
    numTesis = dataCurso[0].numTesis;
    SetCursos(dataCurso);
  }

  function guardarLocalStorage(){
    if(value!="Hello from context"){
      localStorage.setItem("IDUSUARIO",value);
    }
  }
  function obtenerLocalStorage(){
    let variable = localStorage.getItem("IDUSUARIO");
    setValue(variable);
  }

  guardarLocalStorage();
  obtenerLocalStorage();
  peticionGet() 
  useEffect(()=>{
    getTipoEntregables();
 },[])
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
          <Nav>
            <h1 className='nombreUsuario'>{nombre}</h1>
            <NavIcon to='#'>
              {showSidebar}
            </NavIcon> 
            <div>
              <button title="Cerrar sesión" style={{ backgroundColor:"#042354", border:"none" }} class="BTN-LOGOUT" onClick={()=>logout()}>
                 <FaIcons.FaDoorOpen />
              </button>
              <img src={logo}  class="mx-4 logo"></img>
            </div>  
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>


{cursos.map(curso => (
       <p>
       {curso.numTesis==1?SidebarData.map((item, index) => {
        return <SubMenu item={item} key={index} />;
      }):SidebarDataTesis2.map((item, index) => {
        return <SubMenu item={item} key={index} />;
      })}
   
   </p>  
 ))}
             <button className='BOTON-EXIT' onClick={()=>logout()}><FaIcons.FaDoorOpen /> Cerrar sesión</button>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
