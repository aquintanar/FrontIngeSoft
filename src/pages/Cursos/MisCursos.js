import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../stylesheets/Comite.css";
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

  if (!search && !selFac) {
    //sin filtro
    filtrado = data;
  } else {
    if (search && selFac && selSem && selEsp) {
      //ambos filtros
      filtrado = data.filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
      filtrado = data.filter((dato) => dato.idFacultad === selFac);
      filtrado = data.filter((dato) => dato.idSemestre === selSem);
      filtrado = data.filter((dato) => dato.idEspecialidad === selEsp);
    }
    if (selFac)
      //filtro por facultad
      filtrado = data.filter((dato) => dato.idFacultad === selFac);
    if (selSem)
      //filtro por facultad
      filtrado = data.filter((dato) => dato.idSemestre === selSem);
    if (selEsp)
      //filtro por facultad
      filtrado = data.filter((dato) => dato.idEspecialidad === selEsp);
    if (search)
      //filtro por nombre
      filtrado = data.filter((dato) =>
        dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())
      );
  }

  const cambioSelectFacus = (e) => {
    const valor = parseInt(e.target.value);
    setSelFac(valor);
  };

  const cambioSelectSemm = (e) => {
    const valor = parseInt(e.target.value);
    setSelSem(valor);
  };
  const cambioSelectEspp = (e) => {
    const valor = parseInt(e.target.value);
    setSelEsp(valor);
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

  const petitionFacu = async () => {
    let infoespecialidad = JSON.parse(window.localStorage.getItem("infoEspecialidad"));
    await axios
      .get(urlFac + "GetFacultadesSimple/")
      .then((response) => {
        let filtro = []
        for(let k in response.data){
          if(response.data[k].idFacultad == infoespecialidad.numFac)filtro.push(response.data[k]);
        }
        console.log(filtro);
        setFacus(filtro);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const petitionEsp = async () => {
    let infoespecialidad = JSON.parse(window.localStorage.getItem("infoEspecialidad"));
    await axios
      .get(urlEsp + "GetEspecialidades/")
      .then((response) => {
        let filtro = []
        for(let k in response.data){
          if(response.data[k].idEspecialidad == infoespecialidad.numEsp)filtro.push(response.data[k]);
        }
        console.log(filtro);
        setEsp(filtro);
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
    petitionFacu();
    petitionEsp();
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
      <h1 className="HEADER-TEXT1">Mis Cursos</h1>
      <div class="row">
        <div class="col-9 FILTRO-LISTAR-BUSCAR">
          <p>Ingrese el nombre del curso</p>
          <div class="input-group  ">
            <input
              size="10"
              type="text"
              value={search}
              class="form-control"
              name="search"
              placeholder="Nombre del curso"
              aria-label="serach"
              onChange={buscador}
            />
          </div>
        </div>
        <div class="col-3 FILTRO-LISTAR">
          <p>Seleccione Semestre</p>
          <select
            select
            class="form-select Cursor"
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
      <div class="row">
        <div class="col-6 FILTRO-LISTAR">
          <p>Seleccione facultad</p>
          <select
            select
            class="form-select Cursor"
            aria-label="Default select example"
            onChange={cambioSelectFacus}
          >
            <option selected value="0">
              Todos
            </option>
            {facus.map((elemento) => (
              <option key={elemento.idFacultad} value={elemento.idFacultad}>
                {elemento.nombre}
              </option>
            ))}
          </select>
        </div>
        <div class="col-6 FILTRO-LISTAR">
          <p>Seleccione especialidad</p>
          <select
            select
            class="form-select Cursor"
            aria-label="Default select example"
            onChange={cambioSelectEspp}
          >
            <option selected value="0">
              Todos
            </option>
            {especialidades.map((elemento) => (
              <option
                key={elemento.idEspecialidad}
                value={elemento.idEspecialidad}
              >
                {elemento.nombre}
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
                <tr key={curso.idCurso}>
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
