import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {  Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Administrador.css'
import useModal from '../../hooks/useModals';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import * as BsIcons from 'react-icons/bs';

const url= "https://localhost:7012/api/Especialidad/";
const urlFacu= "https://localhost:7012/api/Facultad/";
/*
const url= "http://44.210.195.91/api/Especialidad/";
const urlFacu= "http://44.210.195.91/api/Facultad/";
*/
function PortafolioEntregables()  {

let navigate = useNavigate();
  return (      
    <div class=" CONTAINERADMIN">   

      <p class="HEADER-TEXT1">Portafolio de Entregables </p>
      <br></br>
      <h3 class = "NOMB-ASESOR">Asesor Peter, Fortaleza Monserrat</h3>
      <br></br>

      <a class="BTN-CUADRADO" href="#">Avances Semanales</a>

      <a class="BTN-CUADRADO" href="#">Entregables</a>

      <a class="BTN-CUADRADO" onClick={()=>{navigate("EntregablesParciales")}}>Entregables Parciales</a>

      <a class="BTN-CUADRADO" href="#">Evaluaciones</a>
    
    </div>              
  )
}

export default PortafolioEntregables;
