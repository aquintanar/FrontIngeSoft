import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as IonIcons4 from "react-icons/io";

export const SidebarData = [
    {
        title: 'Alumnos',
        path: '',
        icon: <BsIcons.BsPeople />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

    },
    {
        title: 'Calendario',
        path: '',
        icon: <BsIcons.BsPencil />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

    },
    {
        title: 'Tesis',
        path: '',
        icon: <BsIcons.BsNewspaper />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

    },
    {
        title: 'Reunión',
        path: '',
        icon: <BsIcons.BsJournalBookmark />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,
    },
];

