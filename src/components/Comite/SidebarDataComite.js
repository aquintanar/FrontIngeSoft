import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as IonIcons4 from "react-icons/io";

export const SidebarData = [
    {
        title: 'Información',
        path: '',
        icon: <BsIcons.BsPeople />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

    },
    {
        title: 'Preparación',
        path: '',
        icon: <BsIcons.BsPencil />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

        subNav: [
            {
                title: 'Gestión de Asesores',
                path: '',
                icon: <FaIcons.FaUniversity />
            },
            {
                title: 'Gestión de Docentes',
                path: '',
                icon: <FaIcons.FaUserGraduate />
            },
            {
                title: 'Gestión de Alumnos',
                path: '',
                icon: <MdIcons.MdOutlineEditCalendar />
            },
            {
                title: 'Entregables y Presentables',
                path: '',
                icon: <FaIcons.FaUserGraduate />
            },
            {
                title: 'Temas de  tesis',
                path: 'temaTesis',
                icon: <FaIcons.FaUserGraduate />
            }
        ]
    },
    {
        title: 'Calificación',
        path: '',
        icon: <BsIcons.BsNewspaper />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

    },
    {
        title: 'Análisis',
        path: '',
        icon: <BsIcons.BsJournalBookmark />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

        subNav: [
            {
                title: 'Reporte de Alumnos',
                path: '',
                icon: <BsIcons.BsFileEarmarkPerson />
            },
            {
                title: 'Reporte de tesis sustentadas',
                path: '',
                icon: <FaIcons.FaUserGraduate />
            },
            {
                title: 'Reporte del ciclo',
                path: '',
                icon: <MdIcons.MdOutlineEditCalendar />
            }
           
        ]
    },
];

