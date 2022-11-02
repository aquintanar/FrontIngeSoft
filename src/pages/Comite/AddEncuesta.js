import {useState , useEffect} from "react";
import React from 'react'
import '../../stylesheets/Administrador.css'
import '../../stylesheets/Calendar.css'
import '../../stylesheets/DatePicker.css';
import DatePicker from "react-date-picker";
import { useNavigate } from 'react-router-dom';



const AddEncuesta = () => {

    return(
             
        <div class ="CONTAINERADMIN ">
            <p class="HEADER-TEXT1 mb-4">Datos Evaluación</p>

            <div class="row DATOS" >
                <p>Nombre de la evaluación:</p>
                <div className = " input-group col-md-12 mb-3">
                    <input  type='text' className="form-control" id="nombre" name="nombre" placeholder="Nombre de la evaluación" />
                </div>
            </div>
            <div class="row INSERTAR-BOTONES">                            
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary fs-4 fw-bold   CANCELAR" type="button" ><span>Cancelar</span></button>
                    <button class="btn btn-primary fs-4 fw-bold SIGUIENTE" type="button"><span>Siguiente</span></button>
                </div>
            </div>

            
        </div>
    );    
}
export default AddEncuesta;