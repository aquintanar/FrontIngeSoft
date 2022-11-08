import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as IonIcons4 from "react-icons/io";

export const SidebarData = [
    {
        title: 'Información',
        path: '',
        icon: <BsIcons.BsPencil />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

    },
    {
        title: 'Alumnos',
        path: 'alumnos',
        icon: <BsIcons.BsPeople />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

    },

    {
        title: 'Calendario ',
        path: 'calendario',
        icon: <BsIcons.BsCalendar3Week />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,
    },
];

