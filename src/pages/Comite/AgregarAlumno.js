import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../stylesheets/Comite.css";
import "../../stylesheets/General.css";
import axios from "axios";
import * as BsIcons from "react-icons/bs";
import useModal from "../../hooks/useModals";
import { Button } from "@material-ui/core";
import { ModalPregunta, ModalConfirmación } from "../../components/Modals";

const urlAs = "http://34.195.33.246/api/Alumno/";
const urlEsp = "http://34.195.33.246/api/Especialidad/";
const urlAsXCurso = "http://34.195.33.246/api/AlumnoXCurso/";
//http://34.195.33.246/api/Alumno/

function ListarAlumnosNoEstan() {
  let navigate = useNavigate();
  let idCursoGlobal = localStorage.getItem("idCurso");
  let idAsesorRef = 0;
  const [currentPage, SetCurrentPage] = useState(0);
  const [observado, setObservado] = useState(0);
  const [search, setSearch] = useState("");
  const [as, setAs] = useState([]);
  const [isOpenRegistro, openRegistroModal, closeRegistroModal] = useModal();
  const [isOpenRegistroConf, openRegistroConfModal, closeRegistroConfModal] =
    useModal();

  let filtrado = [];
  const buscador = (e) => {
    setSearch(e.target.value);
  };
  if(!search && !observado){//sin filtro
    filtrado=as;
  }
  else{
      if(search && observado){
        filtrado = as.filter((dato) =>{
          let a = dato.nombres + " " + dato.apePat + " " + dato.apeMat + " " + dato.correo
          console.log(a)
          return a.toLowerCase().includes(search.toLocaleLowerCase());
        } );
        filtrado=filtrado.filter((dato)=>dato.tieneTema===(observado===1?1:0)) ;
      }
      else{
        if(search)//filtro por nombre
          filtrado = as.filter((dato) =>{
            let a = dato.nombres + " " + dato.apePat + " " + dato.apeMat + " " + dato.correo
            console.log(a)
            return a.toLowerCase().includes(search.toLocaleLowerCase());
          } );
        if(observado)
          filtrado=as.filter((dato)=>dato.tieneTema===(observado===1?1:0)) ;
      }
  }

  const cambioEstaObservado =e=>{
      const valor = parseInt(e.target.value)
      setObservado(valor)
  }

  const nextPage = () => {
    if (filtrado.length >= 5)
      //VER CODIGO
      SetCurrentPage(currentPage + 5);
  };
  const previousPage = () => {
    if (currentPage > 0) SetCurrentPage(currentPage - 5);
  };

  const seleccionarAsesor = (asesor) => {
    console.log("SOY EL ALUMNO SELECCIONADO");
    console.log(asesor);
    setAsesorSeleccionado(asesor);
    idAsesorRef = asesorSeleccionado.idAlumno;
    //console.log("SOY EL ASESOR SELECCIONADO");
    //console.log(asesorSeleccionado);
    //console.log("ESTE ES MI ID" + idAsesorRef);
    openRegistroModal(idAsesorRef);
  };

  const peticionPost = async () => {
    console.log(idCursoGlobal);

    console.log(asesorSeleccionado.idUsuario);
    await axios
      .post(
        urlAsXCurso +
          "PostAlumnoXCurso?idAlumno=" +
          asesorSeleccionado.idAlumno +"&"+
          "idCurso=" +
          idCursoGlobal
      )
      .then((response) => {
        console.log(response.data);
        closeRegistroModal();
        openRegistroConfModal();
      })
      .catch((error) => {
        console.log(error.message);
      });
    petitionAs();
  };

  filtrado = filtrado.slice(currentPage, currentPage + 5);

  const [asesorSeleccionado, setAsesorSeleccionado] = useState({
    idAlumno: 0,
    linkCalendario: "",
    tieneTema: 0,
    nombres: "",
    apePat: "",
    apeMat: "",
    correo: "",
    codigoPucp: "",
    contrasena: "",
    imagen: "",
    contrasena: "",
    idEspecialidad: 0,
    nombre: "",
    descripcion: "",
    idFacultad: 0,
  });

  const petitionAs = async () => {
    await axios
      .get(urlAs + "ListAlumnosXIdCursoQueNoEstan?idCurso=" + idCursoGlobal)
      .then((response) => {
        setAs(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const cerrarPost = () => {
    closeRegistroConfModal();
  };

  useEffect(() => {
    petitionAs();
  }, []);

  return (
    <div className="CONTAINERCOMITE">
      <h1>Agregar alumnos</h1>
      <h2>Búsqueda de alumnos</h2>
      <div class="row">
        <div class="col-8">
          <p>Ingrese el nombre o correo del alumno</p>
            <input
              size="10"
              type="search"
              value={search}
              class="form-control icon-search"
              name="search"
              placeholder="Nombre o correo del alumno"
              aria-label="serach"
              onChange={buscador}
            />
        </div>
        <div class="col-4">
          <p> ¿Tiene tema?</p>
          <select
            select
            class="form-select "
            aria-label="Default select example"
            onChange={cambioEstaObservado}
          >
            <option key={0} value={0}>
              Todos
            </option>
            <option key={1} value={1}>
              Si
            </option>
            <option key={2} value={2}>
              No
            </option>
          </select>
        </div>
      </div>
      <h2>Lista de alumnos no asignados</h2>
      <button onClick={previousPage} className="PAGINACION-BTN">
        <BsIcons.BsCaretLeftFill />
      </button>
      <button onClick={nextPage} className="PAGINACION-BTN">
        <BsIcons.BsCaretRightFill />
      </button>
      <div class="row LISTAR-TABLE">
        <div class=" col-12 ">
          <table className="table fs-6 ">
            <thead class>
              <tr class>
                <th style={{ width: 275 }}>Nombre</th>
                <th style={{ width: 150 }}>Correo</th>
                <th style={{ width: 100}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrado.map((asesor) => (
                <tr key={asesor.idUsuario}>
                  <td>{asesor.nombres + " " + asesor.apePat+ " " + asesor.apeMat}</td>
                  <td>{asesor.correo}</td>
                  <td>
                    <div class="LISTAR-TABLE-BOTON">
                      <button
                        class=" btn btn-primary fw-bold"
                        onClick={() => seleccionarAsesor(asesor)}
                      >
                        {" "}
                        <span>Seleccionar</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalPregunta
        isOpen={isOpenRegistro}
        closeModal={closeRegistroModal}
        procedimiento=""
        objeto="registrar a"
        elemento={asesorSeleccionado && asesorSeleccionado.nombres}
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
          <Button class="btn btn-danger btn-lg" onClick={closeRegistroModal}>
            Cancelar
          </Button>
        </div>
      </ModalPregunta>
      <ModalConfirmación
        isOpen={isOpenRegistroConf}
        closeModal={closeRegistroConfModal}
        procedimiento="registrado"
      >
        <div
          align="center"
          class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
        >
          <Button
            class="btn btn-success btn-lg"
            onClick={() => {
              navigate("../alumno");
            }}
          >
            Entendido
          </Button>
        </div>
      </ModalConfirmación>

      <div class="row ">
        <div class="INSERTAR-BOTONES">
          <button
            class="btn AGREGAR-CURSO"  title="Crear cuenta al alumno"
            type="button"
            onClick={() => {
              navigate("../crearCuenta");
            }}
          >
            <span>Crear Cuenta</span>
          </button>
          <button
            class="btn CANCELAR" title="Cancelar"
            type="button"
            onClick={() => {
              navigate("../alumno");
            }}
          >
            <span>Cancelar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default ListarAlumnosNoEstan;