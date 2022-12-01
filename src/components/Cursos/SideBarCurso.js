import React, { useState } from "react";
import styled from "styled-components";
import { Link,useNavigate } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as TbGridDots from 'react-icons/tb';
import * as FaIcons from "react-icons/fa";
import { SidebarData } from "./SideBarDataCurso";
import SubMenu from "./SubMenuCurso";
import { IconContext } from "react-icons/lib";
import logo from "../../imagenes/logo.png";
import "../../stylesheets/SideBar.css";
import {useAuth0 }from '@auth0/auth0-react'
import { useContext } from 'react';
import { UserContext } from '../../UserContext';

const Nav = styled.div`
  background: #042354;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
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
  background: #003c7a;
  width: 20%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 20;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SideBarCurso = () => {
  const [sidebar, setSidebar] = useState(true);
  const {logout, isAuthenticated}=useAuth0();
  const navigate = useNavigate();
  const showSidebar = () => setSidebar(sidebar);
  const cerrarSesion =async (e) =>{
    e.preventDefault();
    navigate('/')
  }
  const cambiarRol = () => {
    navigate("/Opciones");
  }

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
        <div >
            <h1 style={{display:"inline-block" }} className='nombreUsuario'>{localStorage.getItem("NOMBREPERFIL")}</h1>
            {localStorage.getItem("TIPOUSUARIO") === "ALUMNO" ?
            <button title="Cambiar rol" style={{ backgroundColor:"#042354", border:"none", marginLeft:"13px", marginBottom:"15px" }}  class="BTN-LOGOUT" onClick={()=>cambiarRol()}>
                 <TbGridDots.TbGridDots />
            </button>
            : <></>
            }
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
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default SideBarCurso;
