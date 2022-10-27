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



function EvaluaAsesor()  {

let navigate = useNavigate();
  return (      
    <div class=" CONTAINERALUMNO">   

        <p class="HEADER-TEXT1">Evalúa a tu Asesor</p>


     
    </div>              
  )
}

export default EvaluaAsesor;
