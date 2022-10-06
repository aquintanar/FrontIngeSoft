import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';


export const SidebarData = [
    {
        title: 'Informacion',
        path: '',
        icon: <BsIcons.BsPeople />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

    },
    {
        title: 'Preparacion',
        path: '',
        icon: <BsIcons.BsPencil />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Gestion de Asesores',
                path: '',
                icon: <FaIcons.FaUniversity />
            },
            {
                title: 'Gestion de Docentes',
                path: '',
                icon: <FaIcons.FaUserGraduate />
            },
            {
                title: 'Gestion de Alumnos',
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
        title: 'Calificacion',
        path: '',
        icon: <BsIcons.BsNewspaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

    },
    {
        title: 'Analisis',
        path: '',
        icon: <BsIcons.BsJournalBookmark />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

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

