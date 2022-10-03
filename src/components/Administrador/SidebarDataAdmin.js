import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';


export const SidebarData = [
   
    {
        title: 'Gestion',
        path: '',
        icon: <BsIcons.BsPencil />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: 'Facultades',
                path: '',
                icon: <FaIcons.FaUniversity />
            },
            {
                title: 'Especialidades',
                path: '',
                icon: <FaIcons.FaUserGraduate />
            },
            {
                title: 'Semestre',
                path: '',
                icon: <MdIcons.MdOutlineEditCalendar />
            },
            
        ]
    },
    
];

