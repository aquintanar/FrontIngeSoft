import {
  faCheck,
  faTimes,
  faInfoCircle,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
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
            <div className="seccion-izq seccion-opciones">
              <button
                className="BOTON-OPCIONES BOTON-PROFESOR"
                onClick={handleSubmitProfesor}
              >
                <b>PROFESOR</b>
              </button>
              <button
                className="BOTON-OPCIONES BOTON-ASESOR"
                onClick={handleSubmitAsesor}
              >
                <b>ASESOR</b>
              </button>
            </div>
            <div className="seccion-der seccion">
              <button
                className="BOTON-OPCIONES BOTON-COMITE"
                onClick={handleSubmitComite}
              >
                <b>COMITE</b>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Opciones;
