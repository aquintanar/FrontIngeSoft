import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {  Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Alumno.css'
import useModal from '../../hooks/useModals';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import * as BsIcons from 'react-icons/bs';



function Informacion()  {

let navigate = useNavigate();
  return (      
    <div class=" CONTAINERALUMNO">   

        <p class="HEADER-TEXT1">Información General</p>


        <p class="HEADER-TEXT2-INF">Curso actual</p>


        <p class="HEADER-TEXT2-INF">Tema de Tesis</p>
        

        <p class="HEADER-TEXT2-INF">Asesor</p>

        
        <p class="HEADER-TEXT2-INF">Docente</p>

        
        <p class="HEADER-TEXT2-INF">Cronograma del Curso</p>


        <p class="HEADER-TEXT2-INF">Calendario del Curso</p>
     
    </div>              
  )
}

export default Informacion;
