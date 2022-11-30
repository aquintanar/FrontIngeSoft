import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../stylesheets/Comite.css";
import "../../stylesheets/General.css";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import * as BootIcons from "react-icons/bs";
import * as BsIcons from "react-icons/bs";
import useModal from "../../hooks/useModals";
import { Button } from "@material-ui/core";
import { ModalPregunta, ModalConfirmación } from "../../components/Modals";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//https://localhost:7012/api/
//http://34.195.33.246/
/*
const urlAs= "https://localhost:7012/api/Docente/";
const urlEsp= "https://localhost:7012/api/Especialidad/";
const urlAsXCurso="https://localhost:7012/api/DocenteXCurso/";
*/
const urlAs = "https://localhost:7012/api/Docente/";
const urlEsp = "https://localhost:7012/api/Especialidad/";
const urlAsXCurso = "https://localhost:7012/api/DocenteXCurso/";

function ListarDocentes() {
  let idCursoGlobal = localStorage.getItem("idCurso");
  let idAsesorRef = 0;
  let navigate = useNavigate();
  const [currentPage, SetCurrentPage] = useState(0);
  const [search, setSearch] = useState("");
  const [as, setAs] = useState([]);
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenConfirmModal, openConfirmModal, closeConfirmModal] = useModal();

  let filtrado = [];
  const buscador = (e) => {
    setSearch(e.target.value);
  };

  if (!search) {
    //sin filtro
    filtrado = as;
  } else {
    filtrado = as.filter((dato) =>{
      let a = dato.nombres + " " + dato.apePat + " " + dato.apeMat + " " + dato.correo
      console.log(a)
      return a.toLowerCase().includes(search.toLocaleLowerCase());
    } );
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
    setAsesorSeleccionado(asesor);
    openDeleteModal();
  };

  filtrado = filtrado.slice(currentPage, currentPage + 5);

  const [asesorSeleccionado, setAsesorSeleccionado] = useState({
    idDocente: 0,
    nombres: "",
    apePat: "",
    apeMat: "",
    correo: "",
    codigoPUCP: "",
    imagen: "",
    contrasena: "",
    idEspecialidad: "",
    nombre: "",
    descripcion: "",
    idFacultad: "",
  });

  const petitionAs = async () => {
    await axios
      .get(urlAs + "ListDocentesXIdCurso?idCurso=" + idCursoGlobal)
      .then((response) => {
        setAs(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const peticionDelete = async () => {
    console.log(asesorSeleccionado);
    console.log(idCursoGlobal);
    await axios
      .delete(
        urlAsXCurso +
          "DeleteDocenteXCurso?idDocente=" +
          asesorSeleccionado.idDocente +
          "&idCurso=" +
          idCursoGlobal
      )
      .then((response) => {
        petitionAs();
        closeDeleteModal();
        openConfirmModal();
      });
  };

  useEffect(() => {
    petitionAs();
  }, []);
  const notify = () => {
    toast.warn("Solo el coordinador puede acceder a esta funcionalidad");
  };
  const revisarCoordinador = () => {
    let escoordinador = window.localStorage.getItem("ESCOORDINADOR");
    if (escoordinador == "SI") {
      navigate("AgregarDocente");
    } else {
      
      notify();
    }
  };
  return (
    <div className="CONTAINERCOMITE">
      <h1>Gestión de Docentes</h1>
      <h2>Búsqueda de docentes </h2>
      <div class="row">
        <div class="col-8">
          <p>Ingrese el nombre o correo del docente</p>
            <input
              size="10"
              type="search"
              value={search}
              class="form-control icon-search"
              name="search"
              placeholder="Nombre o correo del docente"
              aria-label="serach"
              onChange={buscador}
            />
        </div>
      </div>

      <h2>Lista de docentes en el curso</h2>
      <button onClick={previousPage} className="PAGINACION-BTN">
        <BsIcons.BsCaretLeftFill />
      </button>
      <button onClick={nextPage} className="PAGINACION-BTN">
        <BsIcons.BsCaretRightFill />
      </button>
      <div class="row LISTAR-TABLA">
        <div class=" col-12 ">
          <table className="table fs-6 ">
            <thead class>
              <tr class>
                <th style={{ width: 275 }}>Nombre</th>
                <th style={{ width: 150 }}>Correo</th>
                <th style={{ width: 100 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrado.map((asesor) => (
                <tr key={asesor.idDocente}>
                  <td>
                    {asesor.nombres + " " + asesor.apePat + " " + asesor.apeMat}
                  </td>
                  <td>{asesor.correo}</td>
                  <td>
                    <button
                      class="btn BTN-ACCIONES" title="Ver perfil"
                      onClick={() => {
                        navigate("DatosDocente/" + asesor.idDocente);
                      }}
                    >
                      {" "}
                      <BsIcons.BsEye />
                    </button>
                    <button
                      class=" btn BTN-ACCIONES" title="Retirar docente del curso"
                      onClick={() => seleccionarAsesor(asesor)}
                    >
                      {" "}
                      <BootIcons.BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ModalPregunta
        isOpen={isOpenDeleteModal}
        closeModal={closeDeleteModal}
        procedimiento="retirar del curso"
        objeto="a"
        elemento={asesorSeleccionado && asesorSeleccionado.nombres}
      >
        <div
          align="center"
          class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
        >
          <Button
            class="btn  btn-success btn-lg"
            onClick={() => peticionDelete()}
          >
            Confirmar
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button class="btn btn-danger btn-lg" onClick={closeDeleteModal}>
            Cancelar
          </Button>
        </div>
      </ModalPregunta>

      <ModalConfirmación
        isOpen={isOpenConfirmModal}
        closeModal={closeConfirmModal}
        procedimiento="eliminado"
      >
        <div
          align="center"
          class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
        >
          <Button class="btn btn-success btn-lg" onClick={closeConfirmModal}>
            Entendido
          </Button>
        </div>
      </ModalConfirmación>

      <div className="INSERTAR-BOTONES">
        <button
          className="btn AGREGAR-CURSO" title="Agregar docente al curso"
          onClick={() => {
            revisarCoordinador();
          }}
        >
          {" "}
          <span>Agregar docente</span>
        </button>
        <ToastContainer/>
      </div>
    </div>
  );
}
export default ListarDocentes;
