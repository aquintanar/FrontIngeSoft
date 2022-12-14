import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../stylesheets/Comite.css";
import "../../stylesheets/General.css";
import { Button } from "@material-ui/core";
import { ModalConfirmación, ModalPregunta } from "../../components/Modals";
import useModal from "../../hooks/useModals";
import axios from "axios";

const urlEsp = "http://34.195.33.246/api/Especialidad/";
const urlSem = "http://34.195.33.246/api/Semestre/";
const urlFac = "http://34.195.33.246/api/Facultad/";
const urlPost = "http://34.195.33.246/api/Curso/";

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
  const infoEspecialidad = JSON.parse(localStorage.getItem('ESPECIALIDADGESTIONADA'))
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
        let filtroespecialidades=[];
        for(let k in response.data){
          if(response.data[k].idEspecialidad==infoEspecialidad.idEspec)filtroespecialidades.push(response.data[k]);
        }
        setEsp(filtroespecialidades);
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
      .get(urlFac + "GetFacultadesSimple/")
      .then((response) => {
        let filtrofacultades=[];
        for(let k in response.data){
          if(response.data[k].idFacultad==infoEspecialidad.idFac)filtrofacultades.push(response.data[k]);
        }

        setFac(filtrofacultades);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const peticionPost = async () => {
    let idCoordinador = window.localStorage.getItem("IDUSUARIO");
    console.log(idCoordinador);
    console.log(cursoNuevo);
    
    for(let i=0;i<cursoNuevo.nombre.length;i++){
      if(cursoNuevo.nombre.charAt(i)=="1"){
        cursoNuevo.numTesis=1;
      }
      if(cursoNuevo.nombre.charAt(i)=="2"){
        cursoNuevo.numTesis=2;
      }
    }

    cursoNuevo.idComiteTesis= idCoordinador;
    await axios
      .post("http://34.195.33.246/api/Curso/PostCursoConComite",cursoNuevo, {
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
    console.log(cursoNuevo);
    cursoNuevo.idSemestre=parseInt(cursoNuevo.idSemestre);
    if(cursoNuevo.asesorPropone==1) cursoNuevo.asesorPropone=true 
    else cursoNuevo.asesorPropone=false;
    if(cursoNuevo.alumnoPropone==1) cursoNuevo.alumnoPropone=true
    else cursoNuevo.alumnoPropone=false;
    if(cursoNuevo.temaAsignado==1) cursoNuevo.temaAsignado=true;
    else cursoNuevo.temaAsignado=false;

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
        cant_temas_prop: response.data[0].cant_temas_propuestos,
        activo: 1,
        idSemestre: parseInt(response.data[0].idSemestre),
        idDocente: 0, //response.data[0].idDocente,
        idFacultad: response.data[0].idFacultad,
        idEspecialidad: response.data[0].idEspecialidad,
        asesorPropone: response.data[0].asesorPropone,
        alumnoPropone: response.data[0].alumnoPropone,
        temaAsignado: response.data[0].temaAsignado,
        numTesis:response.data[0].numTesis

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
    petitionEsp();
    petitionSem();
    cargarCurso();
  }, []);

  const [cursoNuevo, setcursoNuevo] = useState({
    idCurso: 0,
    nombre: "",
    cant_alumnos: 0,
    cant_temas_prop: 0,
    activo: 0,
    idSemestre: 49,
    idDocente: 0,
    idFacultad: infoEspecialidad.idFac,
    idEspecialidad: infoEspecialidad.idEspec,
    asesorPropone: false,
    alumnoPropone: false,
    temaAsignado: false,
    aceptandoTemas: true,
    asesorPropone: false,
    alumnoPropone: false,
    temaAsignado: false,
    numTesis:1,
    idComiteTesis:0
  });

  const cambioSelectEsp = (e) => {
    setcursoNuevo((prevState) => ({
      ...prevState,
      idEspecialidad: e.target.value,
    }));
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
    navigate("../GestionarCurso");
  };
  const cerrarPut = () => {
    closeEditadoModal();
    navigate("../GestionarCurso");
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
        <h1>Gestión de Curso</h1>
        <h2>Registro de Curso - {subTitulo} </h2>
        <h5 >*Recuerde crear cursos solo de la especialidad que es coordinador</h5>
      </div>
      <div class="row ">
        <div class="col-12">
          <p>Nombre del curso</p>
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
      <div class="row">
        <div class="col-4">
          <p>Seleccione Facultad</p>
          {
            <select
              select disabled
              class="form-select "
              aria-label="Default select example"
              onChange={cambioSelectFac}
              selected
              value={cursoNuevo && cursoNuevo.idFacultad}
            >
              
              {fac.map((elemento) => (
                <option key={elemento.idFacultad} value={elemento.idFacultad}>
                  {elemento.nombre}
                </option>
              ))}
            </select>
          }
        </div>
        <div class="col-4">
          <p>Seleccione Especialidad</p>
          <select
            select disabled
            class="form-select "
            aria-label="Default select example"
            onChange={cambioSelectEsp}
            selected
            value={cursoNuevo && cursoNuevo.idEspecialidad}
          >
            
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
          <p>Seleccione Semestre</p>
          <select
            select
            class="form-select"
            aria-label="Default select example"
            onChange={cambioSelectSem}
            selected
            value={cursoNuevo && cursoNuevo.idSemestre}
          >
            
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

      <div class="row ">
        <div class="INSERTAR-BOTONES">
          <button
            class="btn GUARDAR" title="Guardar curso"
            type="button"
            onClick={() => peticionSelecter()}
          >
            <span>Guardar</span>
          </button>
          <button
            class="btn CANCELAR" title="Cancelar"
            type="button"
            onClick={() => {
              navigate("../GestionarCurso");
            }}
          >
            <span>Cancelar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DatosCurso;
