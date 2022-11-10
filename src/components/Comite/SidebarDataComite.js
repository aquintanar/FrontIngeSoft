import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as ImIcons from 'react-icons/im';
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
        icon: <BsIcons.BsPencil />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

        subNav: [
            {
                title: 'Gestión de Asesores',
                path: 'asesor',
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
                title: 'Entregas y Presentaciones',
                path: 'preparacion/entregables',
                icon: <ImIcons.ImFileText2 />
            },
            {
                title: 'Temas de  tesis',
                path: 'temaTesis',
                icon: <AiIcons.AiOutlineFileSearch />
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
                path: 'ReporteAlumnos',
                icon: <BsIcons.BsFileEarmarkPerson />
            },
            {
                title: 'Reporte de tesis sustentadas',
                path: 'tesis',
                icon: <FaIcons.FaUserGraduate />
            },
            {
                title: 'Reporte del ciclo',
                path: 'reporteciclo',
                icon: <MdIcons.MdOutlineEditCalendar />
            }
           
        ]
    },
    {
        title: 'Encuestas',
        path: '',
        icon: <BsIcons.BsFillFilePostFill />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

        subNav: [
            {
                title: 'Elaborar encuesta',
                path: 'encuesta/anadirEncuesta',
                icon: <BsIcons.BsFileEarmarkPlusFill />
            },
            {
                title: 'Reporte de encuesta',
                path: '',
                icon: <BsIcons.BsFileBarGraph />
            },
           
        ]
    },
];

