import React, {useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Comite.css'

function GestionarCurso()  {
    let navigate = useNavigate();

    return(
        <div className="CONTAINERCOMITE">
            <h1 className="HEADER-TEXT1">Mis Cursos</h1>
            <div className='d-grid gap-2 d-md-flex justify-content-md-end LISTAR-ESPECIALIDADES-BOTON '>
                <button className='btn btn-primary fs-4 fw-bold mb-3 ' onClick={()=>{navigate("DatosCurso/")}}> Agregar Curso</button>
            </div>
        </div>
    )
}
export default GestionarCurso;