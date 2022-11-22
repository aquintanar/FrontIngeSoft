import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../stylesheets/Comite.css";
import { Button } from "@material-ui/core";
import { ModalConfirmación, ModalPregunta } from "../../components/Modals";
import useModal from "../../hooks/useModals";
import axios from "axios";

const urlEsp = "https://localhost:7012/api/Especialidad/";
const urlSem = "https://localhost:7012/api/Semestre/";
const urlFac = "https://localhost:7012/api/Facultad/";
const urlPost = "https://localhost:7012/api/Curso/";

var currentTime = new Date();
var year = currentTime.getFullYear();

function DatosCurso() {
  let navigate = useNavigate();
  let { id } = useParams();
  const idFAC = 0;
  const [esp, setEsp] = useState([]);
  const [sem, setSem] = useState([]);
  const [fac, setFac] = useState([]);
  const [isOpenGuardadoModal, openGuardadoModal, closeGuardadoModal] =
    useModal();
  const [isOpenPostModal, openPostModal, closePostModal] = useModal();
  const [isOpenEditModal, openEditModal, closeEditModal] = useModal();
  const [isOpenEditadoModal, openEditadoModal, closeEditadoModal] = useModal();
  const [subTitulo, setSubtitulo] = useState("Nuevo curso");

  // checkBox
  const [checkAsesor, setCheckedAs] = React.useState(false);
  const [checkAlumno, setCheckedAl] = React.useState(false);
  const [checkTemaAsignado, setCheckedTemaAs] = React.useState(false);

  const petitionEsp = async () => {
    let idesEspecialidades = JSON.parse(
      window.localStorage.getItem("infoEspecialidades")
    );
    await axios
      .get(urlEsp + "GetEspecialidades/")
      .then((response) => {
        const filtradoEsp = response.data.filter((Especialidad) => {
          for (let k in idesEspecialidades) {
            if (Especialidad.idEspecialidad === idesEspecialidades[k])
              return Especialidad;
          }
        });
        setEsp(filtradoEsp);
        petitionFac();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const petitionSem = async () => {
    await axios
      .get(urlSem + "GetSemestres/")
      .then((response) => {
        setSem(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const petitionFac = async () => {
    let idesFacultades = JSON.parse(
      window.localStorage.getItem("infoFacultad")
    );
    await axios
      .get(urlFac + "GetFacultades/")
      .then((response) => {
        const filtradoFac = response.data.filter((Facultad) => {
          for (let k in idesFacultades) {
            if (Facultad.idFacultad=== idesFacultades[k])
              return Facultad;
          }
        });
        setFac(filtradoFac);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const peticionPost = async () => {
    await axios
      .post(urlPost + "PostCurso", cursoNuevo, {
        _method: "POST",
      })
      .then((response) => {
        console.log("Se logro guardar");
        closePostModal();
        openGuardadoModal();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const peticionPut = async () => {
    await axios
      .put(urlPost + "PutCursoSinDocente", cursoNuevo)
      .then((response) => {
        closeEditModal();
        openEditadoModal();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const cargarCurso = async () => {
    if (id !== "0") {
      const response = await axios.get(
        urlPost + "BuscarCursoXId?idCurso=" + parseInt(id)
      );
      setcursoNuevo({
        idCurso: parseInt(id),
        nombre: response.data[0].nombre,
        cant_alumnos: response.data[0].cant_alumnos,
        cant_temas_propuestos: response.data[0].cant_temas_propuestos,
        activo: 1,
        idSemestre: response.data[0].idSemestre,
        idDocente: 0, //response.data[0].idDocente,
        idFacultad: response.data[0].idFacultad,
        idEspecialidad: response.data[0].idEspecialidad,
        asesorPropone: response.data[0].asesorPropone,
        alumnoPropone: response.data[0].alumnoPropone,
        temaAsignado: response.data[0].temaAsignado,
      });
      setSubtitulo("Modificar Curso");
      setCheckedAs(response.data[0].asesorPropone);
      setCheckedAl(response.data[0].alumnoPropone);
      setCheckedTemaAs(response.data[0].temaAsignado);
    }
  };

  const peticionSelecter = () => {
    if (id === "0") {
      openPostModal();
    } else {
      openEditModal();
    }
  };

  useEffect(() => {
    petitionSem();
    petitionEsp();
    cargarCurso();
  }, []);

  const [cursoNuevo, setcursoNuevo] = useState({
    idCurso: 0,
    nombre: "",
    cant_alumnos: 0,
    cant_temas_propuestos: 0,
    activo: 1,
    idSemestre: "",
    idDocente: 1,
    idFacultad: 1,
    idEspecialidad: "",
  });

  const cambioSelectEsp = (e) => {
    setcursoNuevo((prevState) => ({
      ...prevState,
      idEspecialidad: e.target.value,
    }));
    console.log(cursoNuevo);
  };

  const cambioSelectSem = (e) => {
    setcursoNuevo((prevState) => ({
      ...prevState,
      idSemestre: e.target.value,
    }));
    petitionEsp(e.idFacultad);
    console.log(cursoNuevo);
  };

  const cambioSelectFac = (e) => {
    setcursoNuevo((prevState) => ({
      ...prevState,
      idFacultad: e.target.value,
    }));
    console.log(cursoNuevo);
  };

  const cambioTitulo = (e) => {
    setcursoNuevo((prevState) => ({
      ...prevState,
      nombre: e.target.value,
    }));
    console.log(cursoNuevo);
  };

  const cerrarPost = () => {
    closeGuardadoModal();
  };
  const cerrarPut = () => {
    closeEditadoModal();
  };

  //checkboxes
  const cambioCheckAs = (e) => {
    setCheckedAs(!checkAsesor);
    setcursoNuevo((prevState) => ({
      ...prevState,
      asesorPropone: !checkAsesor,
    }));
    console.log(cursoNuevo);
  };

  const cambioCheckAl = (e) => {
    setCheckedAl(!checkAlumno);
    setcursoNuevo((prevState) => ({
      ...prevState,
      alumnoPropone: !checkAlumno,
    }));
    console.log(cursoNuevo);
  };

  const cambioCheckTeAs = (e) => {
    setCheckedTemaAs(!checkTemaAsignado);
    setcursoNuevo((prevState) => ({
      ...prevState,
      temaAsignado: !checkTemaAsignado,
    }));
    console.log(cursoNuevo);
  };

  return (
    <div class="CONTAINERADMIN">
      <div class="row">
        <p class="HEADER-TEXT1">Gestión de Curso</p>
        <p class="HEADER-TEXT2">Registro de Curso - {subTitulo} </p>
      </div>
      <div class="row DATOS">
        <div class="col-12">
          <div class="  fs-5 fw-normal  mb-1 ">Nombre del curso</div>
          <input
            onChange={cambioTitulo}
            type="text"
            className="form-control"
            id="nombre"
            name="nombre"
            style={{ display: "flex" }}
            value={cursoNuevo && cursoNuevo.nombre}
          />
        </div>
      </div>
      <div class="row DATOS">
        <div class="col-4">
          <div class="  fs-5 fw-normal  mb-1 ">Seleccione Facultad</div>
          {
            <select
              select
              class="form-select Cursor"
              aria-label="Default select example"
              onChange={cambioSelectFac}
              selected
              value={cursoNuevo && cursoNuevo.idFacultad}
            >
              <option selected value="0">
                Todos
              </option>
              {fac.map((elemento) => (
                <option key={elemento.idFacultad} value={elemento.idFacultad}>
                  {elemento.nombre}
                </option>
              ))}
            </select>
          }
        </div>
        <div class="col-4">
          <div class="  fs-5 fw-normal  mb-1 ">Seleccione Especialidad</div>
          <select
            select
            class="form-select Cursor"
            aria-label="Default select example"
            onChange={cambioSelectEsp}
            selected
            value={cursoNuevo && cursoNuevo.idEspecialidad}
          >
            <option selected value="0">
              Todos
            </option>
            {esp.map((elemento) => (
              <option
                key={elemento.idEspecialidad}
                value={elemento.idEspecialidad}
              >
                {elemento.nombre}
              </option>
            ))}
          </select>
        </div>
        <div class="col-4">
          <div class="  fs-5 fw-normal  mb-1 ">Seleccione Semestre</div>
          <select
            select
            class="form-select Cursor"
            aria-label="Default select example"
            onChange={cambioSelectSem}
            selected
            value={cursoNuevo && cursoNuevo.idSemestre}
          >
            <option selected value="0">
              Todos
            </option>
            {sem.map((elemento) => (
              <option key={elemento.idSemestre} value={elemento.idSemestre}>
                {elemento.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <label>
            <input
              type="checkbox"
              checked={checkAsesor}
              onChange={cambioCheckAs}
            />{" "}
            El asesor puede proponer el tema de tesis
          </label>
        </div>
        <div class="col-12">
          <label>
            <input
              type="checkbox"
              checked={checkAlumno}
              onChange={cambioCheckAl}
            />{" "}
            El alumno puede proponer el tema de tesis
          </label>
        </div>
        <div class="col-12">
          <label>
            <input
              type="checkbox"
              checked={checkTemaAsignado}
              onChange={cambioCheckTeAs}
            />{" "}
            El alumno ya tiene un tema de tesis asignado
          </label>
        </div>
      </div>
      <ModalPregunta
        isOpen={isOpenPostModal}
        closeModal={closePostModal}
        procedimiento="guardar"
        objeto="curso de tesis "
        elemento={cursoNuevo && cursoNuevo.nombre}
      >
        <div
          align="center"
          class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
        >
          <Button
            class="btn  btn-success btn-lg"
            onClick={() => peticionPost()}
          >
            Confirmar
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button class="btn btn-danger btn-lg" onClick={closePostModal}>
            Cancelar
          </Button>
        </div>
      </ModalPregunta>

      <ModalPregunta
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        procedimiento="modificar"
        objeto="el curso"
        elemento={cursoNuevo && cursoNuevo.nombre}
      >
        <div
          align="center"
          class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
        >
          <Button class="btn  btn-success btn-lg" onClick={() => peticionPut()}>
            Confirmar
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button class="btn btn-danger btn-lg" onClick={closeEditModal}>
            Cancelar
          </Button>
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
          <Button class="btn btn-success btn-lg" onClick={() => cerrarPost()}>
            Entendido
          </Button>
        </div>
      </ModalConfirmación>

      <ModalConfirmación
        isOpen={isOpenEditadoModal}
        closeModal={closeEditadoModal}
        procedimiento="modificado"
      >
        <div
          align="center"
          class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
        >
          <Button class="btn btn-success btn-lg" onClick={() => cerrarPut()}>
            Entendido
          </Button>
        </div>
      </ModalConfirmación>

      <div class="row INSERTAR-BOTONES">
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            class="btn btn-primary fs-4 fw-bold   CANCELAR"
            type="button"
            onClick={() => {
              navigate("../GestionarCurso");
            }}
          >
            <span>Cancelar</span>
          </button>
          <button
            class="btn btn-primary fs-4 fw-bold GUARDAR"
            type="button"
            onClick={() => peticionSelecter()}
          >
            <span>Guardar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DatosCurso;
