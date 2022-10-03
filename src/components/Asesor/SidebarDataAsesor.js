import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';


export const SidebarData = [
    {
        title: 'Alumnos',
        path: '',
        icon: <BsIcons.BsPeople />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

    },
    {
        title: 'Calendario',
        path: '',
        icon: <BsIcons.BsPencil />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

    },
    {
        title: 'Tesis',
        path: '',
        icon: <BsIcons.BsNewspaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

    },
    {
        title: 'Reunion',
        path: '',
        icon: <BsIcons.BsJournalBookmark />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
];

