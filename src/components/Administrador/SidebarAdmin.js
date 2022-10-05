import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarDataAdmin';
import SubMenu from './SubMenuAdmin';
import { IconContext } from 'react-icons/lib';
import '../../Pagina.css';


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
  width: 250px;
  height: 100vh;
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
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <header className="header">

          <div className="">
              <div className="barra">
                  <img className="imagen__barra" src={require('../../imagenes/menu.png')} onClick={showSidebar}  alt="menu"></img>
                 

                  <div className="tituloSistema">
                      <img className="imagen__pagina" src={require('../../imagenes/kto.png')} alt="logo"></img>
                      <h2 className="header__texto no-margin">PUCP-<span className="texto-bold">TESIS</span></h2>
                      </div>
              </div>
          </div>


        </header>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
