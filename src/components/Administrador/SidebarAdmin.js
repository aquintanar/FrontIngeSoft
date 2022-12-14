import React, { useState } from 'react';
import styled from 'styled-components';
import { Link ,useNavigate} from 'react-router-dom';
import { SidebarData } from './SidebarDataAdmin';
import SubMenu from './SubMenuAdmin';
import { IconContext } from 'react-icons/lib';
import '../../Pagina.css';
import logo from '../../imagenes/logo.png';
import {useAuth0 }from '@auth0/auth0-react'
import { useContext } from 'react';
import { UserContext } from '../../UserContext';
import * as FaIcons from 'react-icons/fa';

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

const Sidebar = () => {
  const {logout, isAuthenticated}=useAuth0();
  const [sidebar, setSidebar] = useState(true);
  const {value,setValue}= useContext(UserContext);
  const navigate = useNavigate();
  const showSidebar = () => setSidebar(sidebar);
  const cerrarSesion =async (e) =>{
    e.preventDefault();
    navigate('/')
  }
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
            <h1 className='nombreUsuario'>{localStorage.getItem("NOMBREPERFIL")}</h1>
            <div>
              <button title="Cerrar sesión" style={{ backgroundColor:"#042354", border:"none" }} class="BTN-LOGOUT" onClick={()=>navigate("/")}>
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
              <button className='BOTON-EXIT' onClick={()=>navigate("/")}><FaIcons.FaDoorOpen /> Cerrar sesión</button>
        </SidebarWrap>
            
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
