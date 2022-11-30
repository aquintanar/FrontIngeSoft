import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import * as TbGridDots from 'react-icons/tb';
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
  let navigate = useNavigate();
  const {logout, isAuthenticated}=useAuth0();
  const [sidebar, setSidebar] = useState(true);
  const {value,setValue} = useContext(UserContext);
  const [nombre , setNombre] = useState([]);
  const showSidebar = () => setSidebar(sidebar);
  const peticionGet=async()=>{
    let iddoc = window.localStorage.getItem("IDUSUARIO")
    const response =await axios.get("https://localhost:7012/api/Docente/GetDocenteXId?idDocente="+iddoc)
    .then(response=>{
      console.log();
      setNombre(response.data[0].nombres +" " + response.data[0].apePat)
      
    }).catch(error =>{
      console.log(error.message);
    })
  }
  const cambiarRol = () => {
    navigate("/Opciones");
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
        <div >
            <h1 style={{display:"inline-block" }} className='nombreUsuario'>{localStorage.getItem("NOMBREPERFIL")}</h1>
            <button title="Cambiar rol" style={{ backgroundColor:"#042354", border:"none", marginLeft:"13px", marginBottom:"15px" }}  class="BTN-LOGOUT" onClick={()=>cambiarRol()}>
                 <TbGridDots.TbGridDots />
              </button>
          </div>
          <div>
              <button title="Cerrar sesión" style={{ backgroundColor:"#042354", border:"none" }} class="BTN-LOGOUT" onClick={()=>logout()}>
                 <FaIcons.FaDoorOpen />
              </button>
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
