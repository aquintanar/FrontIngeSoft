import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { SidebarData } from './SidebarDataProfesor';
import SubMenu from './SubMenuProfesor';
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
  position: fixed;
  top: 20;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const {logout, isAuthenticated}=useAuth0();
  const [sidebar, setSidebar] = useState(true);
  const {value,setValue} = useContext(UserContext);
  const [nombre , setNombre] = useState([]);
  const showSidebar = () => setSidebar(sidebar);
  const peticionGet=async()=>{
    console.log("hola");
    const response =await axios.get("http://34.195.33.246/api/Docente/GetDocente")
    .then(response=>{
      console.log("HOLA SE LLEGO A HACER EL REQUEST");
      console.log("El valor de value es" + value);
      console.log(response);
      console.log(response.data[0].idUsuario);
      for(let i in response.data){
        console.log(response.data[i].idUsuario);
        if(value!=0 && value!=undefined && value!=null && value!='' && value!='Hello from context'){
          if(response.data[i].idUsuario===value){
            console.log("PASE POR VALUE");
            setNombre(response.data[i].nombres +" "+ response.data[i].apeMat);
            console.log(nombre);
            break;
          }  
        }
        else{
          var valorGuardado = localStorage.getItem("IDUSUARIO");
          console.log("El valor de ID es " + response.data[i].idUsuario);
          console.log("El valor guardado es " + localStorage.getItem("IDUSUARIO"));
          if(response.data[i].idUsuario==valorGuardado){
            console.log("PASE POR EL LOCAL STORAGE");
            setNombre(response.data[i].nombres +" "+ response.data[i].apeMat);
            console.log(nombre);
            break;
          }  
        }
        
      }
      console.log("El nombre actual es : " + nombre)
    }).catch(error =>{
      console.log(error.message);
    })
  }
  function guardarLocalStorage(){
    if(value!="Hello from context"){
      localStorage.setItem("IDUSUARIO",value);
    }
  }
  function obtenerLocalStorage(){
    let variable = localStorage.getItem("IDUSUARIO");
    setValue(variable);
    console.log("SOY VALUE ACTUALMENTE"+value);
  }

  guardarLocalStorage();
  obtenerLocalStorage();
  peticionGet()
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
        <h1 className='nombreUsuario'>{nombre}</h1>
            <NavIcon to='#'>
              {showSidebar}
            </NavIcon> 
            <div>
              <img src={logo}  class="mx-4 logo"></img>
            </div>  
        </Nav>
        <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
                {SidebarData.map((item, index) => {
                  return <SubMenu item={item} key={index} />;
                })}
            </SidebarWrap>
            <button className='BOTON-EXIT' onClick={()=>logout()}><FaIcons.FaDoorOpen /> Cerrar sesión</button>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
