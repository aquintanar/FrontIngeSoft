import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa'
import * as GiIcons from 'react-icons/gi';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../stylesheets/Iniciar_Sesion.css";

import { useContext } from "react";
import { UserContext } from "../../UserContext";

const Opciones = () => {
  const { value, setValue } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmitProfesor = () => {
    let tiposusuarios = JSON.parse(
      window.localStorage.getItem("TIPOSUSUARIOS")
    );
    let idusuarios = JSON.parse(window.localStorage.getItem("IDUSUARIOS"));
    for (let j in tiposusuarios) {
      if (tiposusuarios[j] == "DOCENTE") {
        window.localStorage.setItem("IDUSUARIO", idusuarios[j]);
        window.localStorage.setItem("TIPOUSUARIO", "DOCENTE");
        setValue(idusuarios[j]);
        break;
      }
    }
    navigate("/cursos");
  };
  const handleSubmitAsesor = () => {
    let tiposusuarios = JSON.parse(
      window.localStorage.getItem("TIPOSUSUARIOS")
    );
    let idusuarios = JSON.parse(window.localStorage.getItem("IDUSUARIOS"));
    for (let j in tiposusuarios) {
      if (tiposusuarios[j] == "ASESOR") {
        window.localStorage.setItem("IDUSUARIO", idusuarios[j]);
        window.localStorage.setItem("TIPOUSUARIO", "ASESOR");
        setValue(idusuarios[j]);
        break;
      }
    }
    navigate("/cursos");
  };
  const handleSubmitJurado = () => {
    let tiposusuarios = JSON.parse(
      window.localStorage.getItem("TIPOSUSUARIOS")
    );
    let idusuarios = JSON.parse(window.localStorage.getItem("IDUSUARIOS"));
    for (let j in tiposusuarios) {
      if (tiposusuarios[j] == "JURADO") {
        window.localStorage.setItem("IDUSUARIO", idusuarios[j]);
        window.localStorage.setItem("TIPOUSUARIO", "JURADO");
        setValue(idusuarios[j]);
        break;
      }
    }
    navigate("/jurado");
  };
  const handleSubmitComite = () => {
    let tiposusuarios = JSON.parse(
      window.localStorage.getItem("TIPOSUSUARIOS")
    );
    let idusuarios = JSON.parse(window.localStorage.getItem("IDUSUARIOS"));
    for (let j in tiposusuarios) {
      if (tiposusuarios[j] == "COMITE DE TESIS") {
        window.localStorage.setItem("IDUSUARIO", idusuarios[j]);
        window.localStorage.setItem("TIPOUSUARIO", "COMITE");
        setValue(idusuarios[j]);
        break;
      }
    }
    let escoordinador = window.localStorage.getItem("ESCOORDINADOR");
    if(escoordinador=="SI"){
        navigate("/comiteCoordinador");
    }
    else{
        navigate("/cursos");
    }
  };
  return (
    <>
      <div className="CONTAINER-GENERAL-REGISTRO">
        <section className="CONTAINER-REGISTRO">
          <h3>¿A qué pantalla desea ingresar?</h3>

          <div className="GrupoInfo">
            <div className="seccion-izq seccion">
              <button
                className="BOTON-OPCIONES BOTON-PROFESOR"
                onClick={handleSubmitProfesor}
              >
                <span><b>PROFESOR</b></span>
                <GiIcons.GiTeacher/>
              </button>
              <button
                className="BOTON-OPCIONES BOTON-ASESOR"
                onClick={handleSubmitAsesor}
              >
                <span><b>ASESOR</b></span>
                <FaIcons.FaPeopleArrows/>
              </button>
              
              

            </div>
          
            <div className="seccion-der seccion">
              <button
                className="BOTON-OPCIONES BOTON-COMITE"
                onClick={handleSubmitComite}
              >
                <span><b>COMITE</b></span>
                <FaIcons.FaUsers/>
              </button>
              <button
                className="BOTON-OPCIONES"
                onClick={handleSubmitJurado}
              >
                <span><b>JURADO</b></span>
                <FaIcons.FaUsers/>
              </button>
            </div>
            
          </div>
        </section>
      </div>
    </>
  );
};

export default Opciones;
