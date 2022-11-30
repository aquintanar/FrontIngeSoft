import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faWindowRestore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import axios from "axios";
import { ModalConfirmación, ModalPregunta } from "../../components/Modals";
import "../../stylesheets/Iniciar_Sesion.css";
import "../../stylesheets/Iniciar_Sesion.css";
import Select from "react-select";
import useModal from "../../hooks/useModals";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { EmailJSResponseStatus } from "emailjs-com";
import emailjs from "emailjs-com";

const USER_REGEX = /^[a-zñ0-9]+@[a-z]+\.[a-z]/;
const PWD_REGEX = /^(?=.*[a-zñ])(?=.*[A-ZÑ])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NAME_REGEX = /^[a-zA-ZÑñà-úÀ-Ú]{1,50}$/;
const CODIGO_REGEX = /^[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/;

const CrearCuentaAlumno = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [value, setValues] = useState(null);
  const [value2, setValues2] = useState(null);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, SetPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [name, setName] = useState("");
  const [validNa, setValidNa] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [apellidoP, setApellidoP] = useState("");
  const [validApellidoP, setValidApellidoP] = useState(false);
  const [apellidoPFocus, setApellidoPFocus] = useState(false);

  const [apellidoM, setApellidoM] = useState("");
  const [validApellidoM, setValidApellidoM] = useState(false);
  const [apellidoMFocus, setApellidoMFocus] = useState(false);

  const [codigoPUCP, setCodigoPUCP] = useState("");
  const [validCodigoPUCP, setValidCodigoPUCP] = useState(false);
  const [CodigoPUCPFocus, setCodigoPUCPFocus] = useState(false);

  const [especialidad, setEspecialidad] = useState([]);
  const [validEspecialidad, setValidEspecialidad] = useState(false);
  const [EspecialidadFocus, setEspecialidadFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const [isOpenEditModal, openEditModal, closeEditModal] = useModal();
  const [isOpenPostModal, openPostModal, closePostModal] = useModal();
  const [isOpenEditadoModal, openEditadoModal, closeEditadoModal] = useModal();
  const [isOpenGuardadoModal, openGuardadoModal, closeGuardadoModal] =
    useModal();

  const [UsuarioSeleccionado, setUsuarioSeleccionado] = useState({
    idUsuario: 0,
    nombres: "",
    apePat: "",
    apeMat: "",
    correo: "",
    codigoPucp: "",
    contrasena: "",
    imagen: null,
    fidEspecialidad: 0,
  });
  const [credenciales, setCredenciales] = useState({
    idDirectorio: 0,
    correo: "",
    codigo: "",
  });
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_8uiyf6d", "template_tztg52n", e, "mS-WY7k1FE9ixytEf")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    setValidNa(result);
  }, [name]);
  useEffect(() => {
    const result = CODIGO_REGEX.test(codigoPUCP);
    setValidCodigoPUCP(result);
  });

  useEffect(() => {
    const result = NAME_REGEX.test(apellidoP);
    setValidApellidoP(result);
  }, [apellidoP]);

  useEffect(() => {
    const result = NAME_REGEX.test(apellidoM);
    console.log(result);
    console.log(apellidoM);
    setValidApellidoM(result);
  }, [apellidoM]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, name, apellidoP, apellidoM]);
  useEffect(() => {
    ListarEsp();
  }, []);

  const enviarCodigo = async () => {
    try {
      let response = await axios.post();
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    console.log("HOLA");
    console.log("Si llega a handle summit");
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = NAME_REGEX.test(name);
    const v4 = NAME_REGEX.test(apellidoP);
    const v5 = NAME_REGEX.test(apellidoM);
    const v6 = CODIGO_REGEX.test(codigoPUCP);
    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6) {
      setErrMsg("invalid Entry");
      return;
    }
    UsuarioSeleccionado.correo = user;
    UsuarioSeleccionado.nombres = name;
    UsuarioSeleccionado.apePat = apellidoP;
    UsuarioSeleccionado.apeMat = apellidoM;
    UsuarioSeleccionado.contrasena = pwd;
    UsuarioSeleccionado.codigoPucp = codigoPUCP;
    console.log("HOLA");
    try {
      let response = await axios
        .post(
          "https://localhost:7012/api/Alumno/PostAlumno",
          UsuarioSeleccionado,
          {
            _method: "POST",
          }
        )
        .then((response) => {
          closePostModal();
          openGuardadoModal();
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (err) {}
  };
  const handleSubmit1 = async (e) => {
    let idCu = window.localStorage.getItem("idCurso");
    try {
      let response = await axios
        .get(
          "https://localhost:7012/api/Curso/BuscarCursoXId?idCurso="+idCu,
          {
            _method: "GET",
          }
        )
        .then((response) => {
          UsuarioSeleccionado.fidEspecialidad = response.data[0].idEspecialidad;
          handleSubmit();
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (err) {}
  };
  const cerrarPost = () => {
    closeGuardadoModal();
    navigate("../alumno/AgregarAlumno");
  };
  const ListarEsp = async (e) => {
    try {
      let response = await axios
        .get("https://localhost:7012/api/Especialidad/GetEspecialidades", {
          _method: "POST",
        })
        .then((response) => {
          //console.log("SE LISTARON LAS ESPECIALIDADES");
          //console.log(response);
          setEspecialidad(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (err) {}
  };

  const options = [
    { value: "Administrador", label: "Administrador" },
    { value: "Docente", label: "Docente" },
    { value: "Alumno", label: "Alumno" },
    { value: "Asesor", label: "Asesor" },
    { value: "Comite", label: "Comite" },
  ];

  const onDropDownChange = (value) => {
    console.log(value);
    setValues(value);
  };
  const onDropDownChange2 = (value2) => {
    console.log(value2);
    setValues2(value2);
  };
  return (
    <div class="CONTAINERADMIN">
    <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
      <div class="row">
        <p class="HEADER-TEXT1">Crear Cuenta de Alumno</p>
        <p>
          *Se creara una cuenta en el sistema y se asignara al alumno al curso.
          <br />
          Solo utilizar en caso el alumno no se haya creado una cuenta.
        </p>
      </div>
      <div className="GrupoInfo">
        <div className="seccion-izq seccion">
          <form>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              required
              aria-invalid={validNa ? "false" : "true"}
              aria-describedby="namenote"
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
            <p id="namenote" className={"INFOTEXT"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Solo se permiten letras.
            </p>
            <label htmlFor="apellidoP">Apellido Paterno:</label>
            <input
              type="text"
              id="apellidoP"
              autoComplete="off"
              onChange={(e) => setApellidoP(e.target.value)}
              required
              aria-invalid={validApellidoP ? "false" : "true"}
              aria-describedby="apePnote"
              onFocus={() => setApellidoPFocus(true)}
              onBlur={() => setApellidoPFocus(false)}
            />
            <p id="apePnote" className={"INFOTEXT"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Solo se permiten letras.
            </p>
            <label htmlFor="apellidoM">Apellido Materno:</label>
            <input
              type="text"
              id="apellidoM"
              autoComplete="off"
              onChange={(e) => setApellidoM(e.target.value)}
              required
              aria-invalid={validApellidoM ? "false" : "true"}
              aria-describedby="apeMnote"
              onFocus={() => setApellidoMFocus(true)}
              onBlur={() => setApellidoMFocus(false)}
            />
            <p id="apeMnote" className={"INFOTEXT"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Solo se permiten letras.
            </p>
            <label htmlFor="username">Correo:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p id="uidnote" className={"INFOTEXT"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Debe ser un correo electrónico
            </p>
            
          </form>
        </div>
        <div className="seccion-der seccion">
          <form>
          <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => SetPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={"INFOTEXT"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 a 24 caracteres.
              <br />
              Debe incluir letras mayúsculas y minúsculas,
              <br />
              un número y un carácter especial.
              <br />
            </p>
            <label htmlFor="confirm_pwd">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={"INFOTEXT"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Debe coincidir con la contraseña.
            </p>
            <label htmlFor="codigoPucp">Codigo PUCP:</label>
            <input
              type="text"
              id="codigoPucp"
              ref={userRef}
              onChange={(e) => setCodigoPUCP(e.target.value)}
              required
              aria-invalid={validCodigoPUCP ? "false" : "true"}
              aria-describedby="codigonote"
              onFocus={() => setCodigoPUCPFocus(true)}
              onBlur={() => setCodigoPUCPFocus(false)}
            />
            <p id="codigonote" className={"INFOTEXT"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Solo se permiten numeros
              <br />
              Debe tener 8 digitos
            </p>
            
          </form>
        </div>
      </div>
      <ModalPregunta
        isOpen={isOpenPostModal}
        closeModal={closePostModal}
        procedimiento="guardar"
        objeto="una cuenta"
      >
        <div
          align="center"
          class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
        >
          <button
            class="btn  btn-success btn-lg"
            onClick={() => handleSubmit1()}
          >
            Confirmar
          </button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button class="btn btn-danger btn-lg" onClick={closePostModal}>
            Cancelar
          </button>
        </div>
      </ModalPregunta>
      <ModalConfirmación
        isOpen={isOpenGuardadoModal}
        closeModal={closeGuardadoModal}
        procedimiento="guardado"
      >
        <div
          align="center"
          class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
        >
          <button class="btn btn-success btn-lg" onClick={() => cerrarPost()}>
            Entendido
          </button>
        </div>
      </ModalConfirmación>
      <button
        onClick={openPostModal}
        disabled={
          !validName ||
          !validPwd ||
          !validMatch ||
          !validNa ||
          !validApellidoP ||
          !validApellidoM ||
          !validCodigoPUCP
            ? true
            : false
        }
        className="BOTONREGISTRAR"
      >
        <b>Registrar</b>
      </button>
    </div>
  );
};

export default CrearCuentaAlumno;
