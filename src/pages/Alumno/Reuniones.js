import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {  Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Administrador.css'
import '../../stylesheets/Alumno.css'
import useModal from '../../hooks/useModals';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import * as BsIcons from 'react-icons/bs';


function Reuniones()  {

    let navigate = useNavigate();
    const [search, setSearch] = useState("");

    //Controla buscador
    const buscador = e=>{
        setSearch(e.target.value);
    }


  return (      
    <div class=" CONTAINERALUMNO">   

        <p class="HEADER-TEXT1">Reuniones</p>
        <p class="HEADER-TEXT2">Búsqueda de reuniones</p>

        <div class="col-lg-7 FILTRO-LISTAR-BUSCAR" >
              <div class="text-start fs-6  mb-1 fw-normal "><p>Ingresar nombre de la reunión</p></div>
              <div class="input-group mb-2 ">
                <input size="10" type="text" value={search} class="form-control" name="search" placeholder="Nombre de la reunión" aria-label="serach" onChange={buscador}/>
              </div>
          </div>


        <p class="HEADER-TEXT2">Lista de reuniones</p>
     
    </div>              
  )
}

export default Reuniones;