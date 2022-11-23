import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as IonIcons4 from "react-icons/io";
import  * as AiIcons from 'react-icons/ai';
export const SidebarData = [
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
    {
        title: 'Tesis',
        path: 'temaTesis',
        icon: <BsIcons.BsNewspaper />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,

    },
    {
        title: 'Reunión',
        path: 'reunion',
        icon: <BsIcons.BsJournalBookmark />,
        iconClosed: <IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,
    },
    {
        title:'Recordatorio',
        path:'recordatorio',
        icon: <AiIcons.AiOutlineInfoCircle/>,
        iconClosed:<IonIcons4.IoIosArrowDown />,
        iconOpened: <IonIcons4.IoIosArrowUp />,
    }
];

