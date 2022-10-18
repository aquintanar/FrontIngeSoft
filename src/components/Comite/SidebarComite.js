import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { SidebarData } from './SidebarDataComite';
import SubMenu from './SubMenuComite';
import { IconContext } from 'react-icons/lib';
import logo from '../../imagenes/logo.png';
import '../../stylesheets/SideBar.css'

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
height: 100vh;
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

const SidebarComite = () => {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
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
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default SidebarComite;
