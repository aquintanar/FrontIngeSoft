import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as IonIcons4 from "react-icons/io";

export const SidebarData = [
    {
        title: 'Información',
        path: 'gestion/Informacion',
        icon: <BsIcons.BsPeople />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

    },
    {
        title: 'Notas',
        path: 'gestion/gesNota',
        icon: <BsIcons.BsPencil />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,
    },
    {
        title: 'Portafolio',
        path: 'gestion/gesPortafolio',
        icon: <BsIcons.BsNewspaper />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

    },
    {
        title: 'Temas',
        path: 'listarTemas',
        icon: <BsIcons.BsJournalBookmark />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

    },
    {
        title: 'Evaluar Asesor',
        path: 'gestion/EvaluaAsesor',
        icon: <BsIcons.BsJournalBookmark />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,
    },
    {
        title: 'Reuniones',
        path: 'gestion/Reuniones',
        icon: <BsIcons.BsJournalBookmark />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

        
    },
    {
        title: 'Calendario',
        path: 'calendario',
        icon: <BsIcons.BsCalendar3Week />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,
    },
    {
        title: 'Encuesta',
        path: 'encuesta',
        icon: <BsIcons.BsCalendar3Week />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,
    },
];

