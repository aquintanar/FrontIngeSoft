import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as IonIcons4 from "react-icons/io";

export const SidebarData = [
    {
      title: 'Gestión General',
      path: '',
      icon: <BsIcons.BsGearWideConnected />,
      iconClosed: <IonIcons4.IoIosArrowDown />,
      iconOpened: <IonIcons4.IoIosArrowUp />,
  
      subNav: [
        {
          title: 'Gestión Facultad',
          path: 'gestion/gesFacultad',
          icon: <FaIcons.FaUniversity />
        },
        {
          title: 'Gestión Especialidad',
          path: 'gestion/gesEspecialidad',
          icon: <FaIcons.FaUserGraduate />
        },
        {
          title: 'Gestión Semestre',
          path: 'gestion/gesSemestre',
          icon: <MdIcons.MdOutlineEditCalendar />
        }
      ]
    }
];
