import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';
import * as IonIcons4 from "react-icons/io";

export const SidebarData = [
    {
      title: 'Gestión General',
      icon: <BsIcons.BsGearWideConnected />,
      iconClosed: <IonIcons4.IoIosArrowDown />,
      iconOpened: <IonIcons4.IoIosArrowUp />,
  
      subNav: [
        {
          title: 'Gestión de Facultades',
          path: 'gestion/gesFacultad',
          icon: <FaIcons.FaUniversity />
        },
        {
          title: 'Gestión de Especialidades',
          path: 'gestion/gesEspecialidad',
          icon: <FaIcons.FaUserGraduate />
        },
        {
          title: 'Gestión de Semestre Académicos',
          path: 'gestion/gesSemestre',
          icon: <MdIcons.MdOutlineEditCalendar />
        }
      ]
    }
];
