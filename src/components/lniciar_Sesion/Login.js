import React from "react";
import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../stylesheets/Iniciar_Sesion.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
const LOGIN_URL = "https://localhost:7012/api/login/GetLogin";
const LOGIN_URL2 = "https://localhost:7012/api/Rol";
const LOGIN_URL_GOOGLE =
  "https://localhost:7012/api/Usuario/BuscarUsuarioXCorreo";
const COORDINADOR =
  "https://localhost:7012/api/ComiteXEspecialidad/ListarComitexEspecialidad_x_idComite";
function Login() {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState({
    correo: "",
    contrasena: "",
  });
  let especialidades = [];
  let facultades = [];
  const navigate = useNavigate();
  const location = useLocation();

  let IdUsuarios = [];
  let TipoUsuario = [];

  const userRef = useRef();
  const errRef = useRef();

  const [user1, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { value, setValue } = useContext(UserContext);
  useEffect(() => {
    setErrMsg("");
  }, [user1, pwd]);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  /*Si es de comite, analizaremos si es coordinador */
  const validarCoordinador = async (e) => {
    try {
      const response3 = await axios
        .get(
          COORDINADOR,
          { params: { idComite: e } },
          {
            _method: "GET",
          }
        )
        .then((response3) => {
          console.log(response3.data);
          if (Object.keys(response3.data).length === 0) {
            //No es coordinador
            window.localStorage.setItem("ESCOORDINADOR","NO");
            //navigate("/cursos");
          } else {
            for (let i in response3.data) {
              especialidades.push(response3.data[i].fidEspecialidad);
              facultades.push(response3.data[i].idFacultad);
            }
            localStorage.setItem(
              "infoEspecialidades",
              JSON.stringify(especialidades)
            );
            localStorage.setItem("infoFacultad", JSON.stringify(facultades));
            window.localStorage.setItem("ESCOORDINADOR","SI");
            //navigate("/comiteCoordinador");
          }
        })
        .catch((error) => {});
    } catch (err) {}
  };
  /*validarCoordinador antiguo */
  const validarCoordinadorAntiguo = async (e) => {
    try {
      const response3 = await axios
        .get(
          COORDINADOR,
          { params: { idComite: e } },
          {
            _method: "GET",
          }
        )
        .then((response3) => {
          console.log(response3.data);
          if (Object.keys(response3.data).length === 0) {
            //No es coordinador
            window.localStorage.setItem("ESCOORDINADOR","NO");
            navigate("/cursos");
          } else {
            for (let i in response3.data) {
              especialidades.push(response3.data[i].fidEspecialidad);
              facultades.push(response3.data[i].idFacultad);
            }
            localStorage.setItem(
              "infoEspecialidades",
              JSON.stringify(especialidades)
            );
            localStorage.setItem("infoFacultad", JSON.stringify(facultades));
            window.localStorage.setItem("ESCOORDINADOR","SI");
            navigate("/comiteCoordinador");
          }
        })
        .catch((error) => {});
    } catch (err) {}
  };

  /*BUSCAMOS SU ROL */
  const searchId = async (e) => {
    try {
      console.log(e);
      setValue(e);

      const response2 = await axios
        .get(
          LOGIN_URL2,
          { params: { idUsuario: e } },
          {
            _method: "GET",
          }
        )
        .then((response2) => {
          console.log(response2.data[0].nombre);
          if (response2.data[0].nombre === "ADMINISTRADOR") {
            localStorage.setItem("TIPOUSUARIO", "ADMINISTRADOR");
            localStorage.setItem("IDUSUARIO", value);
            navigate("/administrador");
          } else if (response2.data[0].nombre === "ALUMNO") {
            localStorage.setItem("TIPOUSUARIO", "ALUMNO");
            localStorage.setItem("IDUSUARIO", value);
            navigate("/cursos");
          } else if (response2.data[0].nombre === "DOCENTE") {
            localStorage.setItem("TIPOUSUARIO", "DOCENTE");
            localStorage.setItem("IDUSUARIO", value);
            navigate("/cursos");
          } else if (response2.data[0].nombre === "ASESOR") {
            localStorage.setItem("TIPOUSUARIO", "ASESOR");
            localStorage.setItem("IDUSUARIO", value);
            navigate("/cursos");
          } else if (response2.data[0].nombre === "COMITE DE TESIS") {
            localStorage.setItem("TIPOUSUARIO", "COMITE");
            localStorage.setItem("IDUSUARIO", value);
            console.log(value);
            validarCoordinadorAntiguo(e);
          }
        })
        .catch((error) => {});
    } catch (err) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      cuentaSeleccionada.correo = user1;
      cuentaSeleccionada.contrasena = pwd;
      const response = await axios
        .get(
          LOGIN_URL,
          { params: { correo: user1, contrasena: pwd } },
          {
            _method: "GET",
          }
        )
        .then((response) => {
          console.log(response.data.usuarios);
          if (response.data.cant === 1) {
            const idUs = response.data.usuarios[0].idUsuario;
            setValue(idUs);
            searchId(idUs);
          } else {
            valor1(response.data.usuarios);
          }
        })
        .catch((error) => {
          if (!error?.response) {
            setErrMsg("No Server Response");
          } else if (error.response?.status === 400) {
            setErrMsg("Ingrese correctamente el usuario o contraseña");
          } else if (error.response?.status === 401) {
            setErrMsg("Ingrese correctamente el usuario o contraseña");
          } else {
            setErrMsg("Ingrese correctamente el usuario o contraseña");
          }
          errRef.current.focus();
        });

      /*lOS ROLES SON UN ARREGLO DE NUMEROS */
    } catch (err) {}
  };
  /*VEMOS DE QUE ROL ES CADA CUENTA */
  const valor1 = async (e) => {
    try {
      const response2 = await axios
        .get(
          LOGIN_URL2,
          { params: { idUsuario: e[0].idUsuario } },
          {
            _method: "GET",
          }
        )
        .then((response2) => {
          if (response2.data[0].nombre === "DOCENTE") {
            TipoUsuario.push("DOCENTE");
            IdUsuarios.push(e[0].idUsuario);
          } else if (response2.data[0].nombre === "ASESOR") {
            TipoUsuario.push("ASESOR");
            IdUsuarios.push(e[0].idUsuario);
          } else if (response2.data[0].nombre === "COMITE DE TESIS") {
            TipoUsuario.push("COMITE DE TESIS");
            IdUsuarios.push(e[0].idUsuario);
            validarCoordinador(e[0].idUsuario);
          }
         
          valor2(e);
        })
        .catch((error) => {});
    } catch (err) {}
  };
  const valor2 = async (e) => {
    try {
      const response2 = await axios
        .get(
          LOGIN_URL2,
          { params: { idUsuario: e[1].idUsuario } },
          {
            _method: "GET",
          }
        )
        .then((response2) => {
          if (response2.data[0].nombre === "DOCENTE") {
            TipoUsuario.push("DOCENTE");
            IdUsuarios.push(e[1].idUsuario);
          } else if (response2.data[0].nombre === "ASESOR") {
            TipoUsuario.push("ASESOR");
            IdUsuarios.push(e[1].idUsuario);
          } else if (response2.data[0].nombre === "COMITE DE TESIS") {
            TipoUsuario.push("COMITE DE TESIS");
            IdUsuarios.push(e[1].idUsuario);
            validarCoordinador(e[1].idUsuario);
          }
         
          valor3(e);
        })
        .catch((error) => {});
    } catch (err) {}
  };
  const valor3 = async (e) => {
    try {
      const response2 = await axios
        .get(
          LOGIN_URL2,
          { params: { idUsuario: e[2].idUsuario } },
          {
            _method: "GET",
          }
        )
        .then((response2) => {
          if (response2.data[0].nombre === "DOCENTE") {
            TipoUsuario.push("DOCENTE");
            IdUsuarios.push(e[2].idUsuario);
          } else if (response2.data[0].nombre === "ASESOR") {
            TipoUsuario.push("ASESOR");
            IdUsuarios.push(e[2].idUsuario);
          } else if (response2.data[0].nombre === "COMITE DE TESIS") {
            TipoUsuario.push("COMITE DE TESIS");
            IdUsuarios.push(e[2].idUsuario);
            validarCoordinador(e[2].idUsuario);
          }
        
          window.localStorage.setItem(
            "TIPOSUSUARIOS",
            JSON.stringify(TipoUsuario)
          );
          window.localStorage.setItem("IDUSUARIOS", JSON.stringify(IdUsuarios));
          navigate("/Opciones");
        })
        .catch((error) => {});
    } catch (err) {}
  };

  const Autenticacion = async () => {
    if (isAuthenticated) {
      try {
        const response = await axios
          .get(
            LOGIN_URL_GOOGLE,
            { params: { correo: user.email } },
            {
              _method: "GET",
            }
          )
          .then((response) => {
            console.log("HOLA");
            console.log(response);
            const idUs = response.data[0].idUsuario;
            console.log("Hola2");
            console.log(idUs);
            setValue(idUs);
            searchId(idUs);
          })
          .catch((error) => {});
      } catch (err) {}
      //navigate('/administrador')
      //handleAutenticacion(user.email);
      console.log(user.email);
    }
  };
  window.onload = Autenticacion();

  return (
    <div className="CONTAINER-GENERAL-LOGIN">
      <section className="CONTAINER-LOGIN">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} onLoad="Autenticacion">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user1}
            required
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button>Iniciar Sesión</button>

          <p className="text-center">o</p>

          <div onClick={() => loginWithRedirect()} className="google-btn">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              />
            </div>
            <p className="btn-text">Iniciar Sesión</p>
          </div>
        </form>
        <p className="TEXTO-ABAJO">
          ¿Necesita una cuenta?
          <br />
          <span className="line">
            {/*Put router */}
            <a href="/Register"> Crea una cuenta</a>
          </span>
        </p>
      </section>
    </div>
  );
}

export default Login;
