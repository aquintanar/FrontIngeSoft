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

const urlSem = "https://localhost:7012/api/Semestre/";
const urlFac = "https://localhost:7012/api/Facultad/";
const urlEsp = "https://localhost:7012/api/Especialidad/";
const urlCur = "https://localhost:7012/api/Curso/";

function MisCursos() {
  let navigate = useNavigate();
  const [currentPage, SetCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [selFac, setSelFac] = useState(0);
  const [selSem, setSelSem] = useState(0);
  const [selEsp, setSelEsp] = useState(0);
  const [selFac1, setSelFac1] = useState(0);
  const [search, setSearch] = useState("");
  const [sem, setSem] = useState([]);
  const [facus, setFacus] = useState([]);
  const [esp, setEsp] = useState([]);
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenConfirmModal, openConfirmModal, closeConfirmModal] = useModal();

  let filtrado = [];
  let especialidades = !selFac
    ? esp
    : esp.filter((dato) => dato.facultad.idFacultad === selFac);
  const buscador = (e) => {
    setSearch(e.target.value);
  };

  if(!search && !selSem ){//sin filtro
    filtrado=data;
    console.log(data)
  }
  else{
    if(search  && selSem){//ambos filtros
      filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
      filtrado=filtrado.filter((dato)=>dato.idSemestre===selSem) ;
    }
    else {
      if(selSem)//filtro por facultad
        filtrado=data.filter((dato)=>dato.idSemestre===selSem) ;
      if(search)//filtro por nombre
        filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
    }
  }

  

  const cambioSelectSemm = (e) => {
    const valor = parseInt(e.target.value);
    setSelSem(valor);
  };

  const nextPage = () => {
    if (filtrado.length >= currentPage)
      //VER CODIGO
      SetCurrentPage(currentPage + 5);
  };
  const previousPage = () => {
    if (currentPage > 0) SetCurrentPage(currentPage - 5);
  };

  const seleccionarCurso = (curso) => {
    setCursoSeleccionado(curso);
    openDeleteModal();
  };

  filtrado = filtrado.slice(currentPage, currentPage + 5);

  const [cursoSeleccionado, setCursoSeleccionado] = useState({
    idCurso: 0,
    nombre: "",
    cant_alumnos: 0,
    cant_temas_prop: 0,
    activo: 0,
    idSemestre: 0,
    idDocente: 0,
    idFacultad: 0,
    idEspecialidad: 0,
    asesorPropone: false,
    alumnoPropone: false,
    temaAsignado: false,
  });
  var arregloIDs = [];
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


  const petitionCurso1 = async () => {
    let idUs = window.localStorage.getItem("IDUSUARIO");
    await axios
      .get(
        "https://localhost:7012/api/ComiteXEspecialidad/ListarComitexEspecialidad_x_idComite?idComite=" +
          idUs
      )
      .then((response) => {
        petitionCurso2(response.data[0].fidEspecialidad);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const petitionCurso2 = async (e) => {
    let response = await axios
      .get(
        "https://localhost:7012/api/Curso/ListarCursosXIdEspecialidad?idEspecialidad=" +
          e
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(() => {});
  };

  const peticionDelete = async () => {
    await axios
      .delete(urlCur + "DeleteCurso?idCurso=" + cursoSeleccionado.idCurso)
      .then((response) => {
        petitionCurso1();
        closeDeleteModal();
        openConfirmModal();
      });
  };

  const cambioSelectSem = (e) => {
    setCursoSeleccionado((prevState) => ({
      ...prevState,
      idSemestre: e.target.value,
    }));
    console.log(cursoSeleccionado);
  };
  const cambioSelectFac = (e) => {
    setCursoSeleccionado((prevState) => ({
      ...prevState,
      idFacultad: e.target.value,
    }));
    console.log(cursoSeleccionado);
  };
  const cambioSelectEsp = (e) => {
    setCursoSeleccionado((prevState) => ({
      ...prevState,
      idEspecialidad: e.target.value,
    }));
    console.log(cursoSeleccionado);
  };

  useEffect(() => {
    petitionSem();
    petitionCurso1();
  }, []);
  function seleccionarFila() {
    const rows = document.querySelectorAll("tr");
    for (var i = 1; i < rows.length; i++) {
      //Tomar cada celda
      var cell1 = rows[i].cells[0];
      var cell2 = rows[i].cells[1];
      var cell3 = rows[i].cells[2];
      arregloIDs.push(cell1.textContent);
      console.log(arregloIDs);
      rows[i].onclick = function () {
        //console.log(this.rowIndex);
        console.log(arregloIDs[this.rowIndex - 1]);
        localStorage.setItem("idCurso", arregloIDs[this.rowIndex - 1]);
        navigate("/comite");
      };

      rows[i].onclick = function () {
        console.log(arregloIDs[this.rowIndex - 1]);
        localStorage.setItem("idCurso", arregloIDs[this.rowIndex - 1]);
        navigate("/comite");
      };
    }
  }
  seleccionarFila();

  return (
    <div className="CONTAINERCOMITE">
      <h1>Mis Cursos</h1>
      <div class="row">
        <div class="col-9 ">
          <p>Ingrese el nombre del curso</p>
          
            <input
              size="10"
              type="search"
              value={search}
              class="form-control icon-search"
              name="search"
              placeholder="Nombre del curso"
              aria-label="serach"
              onChange={buscador}
            />
          
        </div>
        <div class="col-3">
          <p>Seleccione Semestre</p>
          <select
            select
            class="form-select"
            aria-label="Default select example"
            onChange={cambioSelectSemm}
          >
            <option selected value="0">
              Todos
            </option>
            {sem.map((elemento) => (
              <option key={elemento.idSemestre} value={elemento.idSemestre}>
                {elemento.anho + "-" + elemento.numSemestre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={previousPage} className="PAGINACION-BTN">
        <BsIcons.BsCaretLeftFill />
      </button>
      <button onClick={nextPage} className="PAGINACION-BTN">
        <BsIcons.BsCaretRightFill />
      </button>
      <div class="row LISTAR-TABLA" id="LISTAR-TABLA">
        <div class=" col-12 ">
          <table className="table fs-6 TABLALISTARCURSOS">
            <thead class>
              <tr class>
                <th style={{ width: 60 }}>ID</th>
                <th style={{ width: 100 }}>Nombre</th>
                <th style={{width:200}}>Semestre</th>
              </tr>
            </thead>
            <tbody>
              {filtrado.map((curso) => (
                <tr key={curso.idCurso} style={{cursor: "pointer"}} >
                  <td>{curso.idCurso}</td>
                  <td>{curso.nombre}</td>
                  <td>{curso.nombreSemestre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default MisCursos;
