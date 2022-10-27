import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  -webkit-text-fill-color: white;
  color: #ffffff;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 16.5px;

  &:hover {
    background: #2179D4;    
    border-left: 4px solid #ffffff;
    color:#ffffff;
    cursor: pointer;
    font-size: 17px;
    font-weight: bold;
    svg{
      width: 1.75em;
      height: 1.75em;
    }
  }
  svg{
    width: 1.5em;
    height: 1.5em;
    cursor: pointer;
    fill: white;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #D9D9D9;
  height: 60px;
  padding-left: 3rem;
  padding-rigth: 1.5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000;
  font-size: 15.5px;
    
  &:hover {
    background: #9E9E9E;
    cursor: pointer;
    font-size: 16.25px;
    font-weight: bold;
    color: #042354;
    svg{
      fill: #042354;
    }
  }

  svg{
    width: 1.75em;
    height: 1.75em;
    cursor: pointer;
    fill: black;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
