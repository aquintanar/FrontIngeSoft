import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import axios from "axios";
import "./stylesheets/Iniciar_Sesion.css";
import Select from "react-select";
import useModal from "./hooks/useModals";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { EmailJSResponseStatus } from "emailjs-com";
import emailjs from "emailjs-com";

const REGISTERALUMNO_URL = "http://34.195.33.246/api/Alumno/PostAlumno";
const REGISTERADMIN_URL =
  "http://34.195.33.246/api/Administrador/PostAdministrador";
const REGISTERASESOR_URL = "http://34.195.33.246/api/Asesor/PostAsesor";
const REGISTERDOCENTE_URL = "http://34.195.33.246/api/Docente/PostDocente";
const REGISTERCOMITE_URL =
  "http://34.195.33.246/api/ComiteTesis/PostComiteTesis";

const ConfirmarRegistro = () => {

  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  
  
  const registroReal=async ()=>{
    let UsuarioSeleccionado = JSON.parse(localStorage.getItem("INFOREGISTRO"));
    let value = localStorage.getItem("TIPOUSUARIO");
    if (value === "Administrador") {
      await axios
        .post(REGISTERADMIN_URL, UsuarioSeleccionado, {
          _method: "POST",
        })
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (value === "Asesor") {
      await axios
        .post(REGISTERASESOR_URL, UsuarioSeleccionado, {
          _method: "POST",
        })
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (value === "Docente") {
      await axios
        .post(REGISTERDOCENTE_URL, UsuarioSeleccionado, {
          _method: "POST",
        })
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (value === "Alumno") {
      await axios
        .post(REGISTERALUMNO_URL, UsuarioSeleccionado, {
          _method: "POST",
        })
        .then((response) => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else if (value === "Comite") {
      console.log("Se ha ingresado en comite");
      await axios
        .post(REGISTERCOMITE_URL, UsuarioSeleccionado, {
          _method: "POST",
        })
        .then((response) => {
          console.log("Se llego a registrar");
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }


  const verificar = async (e) =>{
    let informacion = JSON.parse(localStorage.getItem("INFOREGISTRO"));
    let response = await axios.get("http://34.195.33.246/api/Directorio/GetDirectorioXCorreo",
    { params: { correo: informacion.correo } },
    {
      _method: "GET",
    })
    .then((response) => {
      if(Object.keys(response.data).length ===0){
        alert("Ocurrio un error en el registro");
      }
      else{
        var j=0;
        for(let i in response.data){
          if(response.data[i].codigo==codigo){
              registroReal();
              j=1
          }
        }
        if(j==0)
          alert("El codigo ingresado es erroneo");
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
  }
  return (
    <div className="CONTAINER-GENERAL-LOGIN">
    <section className="CONTAINER-LOGIN">
      <h1>Confirmación </h1>
      <p>Le hemos enviado un código a su correo</p>
      <form >
        <label htmlFor="username">Ingrese el código de confirmación</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setCodigo(e.target.value)}
          required
        />
      </form>
      <button onClick={verificar} >Terminar Registro</button>
    </section>
  </div>
  );
};

export default ConfirmarRegistro;
