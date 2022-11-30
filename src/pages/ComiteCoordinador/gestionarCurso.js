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

const urlSem = "http://34.195.33.246/api/Semestre/";
const urlFac = "http://34.195.33.246/api/Facultad/";
const urlEsp = "http://34.195.33.246/api/Especialidad/";
const urlCur = "http://34.195.33.246/api/Curso/";

function GestionarCurso() {
  let navigate = useNavigate();
  const [currentPage, SetCurrentPage] = useState(0);
  const [especialidadGestionada,SetEspecialidadGestionada]=useState("");
  const [idesp, SetIdEsp] = useState(0);
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
  const [infoCurso,setInfoCurso] = useState({
    idEspec:0,
    idFac:0
})
  let filtrado = [];
  let especialidades = !selFac
    ? esp
    : esp.filter((dato) => dato.facultad.idFacultad === selFac);
  const buscador = (e) => {
    setSearch(e.target.value);
  };

  if(!search && !selFac && !selSem && !selEsp){//sin filtro
    filtrado=data;
    console.log(data)
  }
  else{
    if(search && selFac && selSem && selEsp){//ambos filtros
      filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
      filtrado=filtrado.filter((dato)=>dato.idFacultad===selFac) ;
      filtrado=filtrado.filter((dato)=>dato.idSemestre===selSem) ;
      filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ;
    }
    else{
      if(search && selFac && selSem){
        filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
        filtrado=filtrado.filter((dato)=>dato.idFacultad===selFac) ;
        filtrado=filtrado.filter((dato)=>dato.idSemestre===selSem) 
      }
      else if(search && selFac && selEsp){
        filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
        filtrado=filtrado.filter((dato)=>dato.idFacultad===selFac) ;
        filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ; 
      }
      else if(search && selSem && selEsp){
        filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
        filtrado=filtrado.filter((dato)=>dato.idSemestre===selSem) 
        filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ; 
      }
      else if(selFac && selSem && selEsp){
        filtrado=data.filter((dato)=>dato.idFacultad===selFac) ;
        filtrado=filtrado.filter((dato)=>dato.idSemestre===selSem) ;
        filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ;
      }
      else{
        if(search && selFac){
          filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
          filtrado=filtrado.filter((dato)=>dato.idFacultad===selFac) ;
        }
        else if(search && selSem){
          filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
          filtrado=filtrado.filter((dato)=>dato.idSemestre===selSem) 
        }
        else if(search && selEsp){
          filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
          filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ;
        }
        else if(selFac && selSem){
          filtrado=data.filter((dato)=>dato.idFacultad===selFac) ;
          filtrado=filtrado.filter((dato)=>dato.idSemestre===selSem) 
        }
        else if(selFac && selEsp){
          filtrado=data.filter((dato)=>dato.idFacultad===selFac) ;
          filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ;
        }
        else if(selSem && selEsp){
          filtrado=data.filter((dato)=>dato.idSemestre===selSem)
          filtrado=filtrado.filter((dato)=>dato.idEspecialidad===selEsp) ; 
        }
        else {
          if(selFac)//filtro por facultad
            filtrado=data.filter((dato)=>dato.idFacultad===selFac) ;
          if(selSem)//filtro por facultad
            filtrado=data.filter((dato)=>dato.idSemestre===selSem) ;
          if(selEsp)//filtro por facultad
            filtrado=data.filter((dato)=>dato.idEspecialidad===selEsp) ;
          if(search)//filtro por nombre
            filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
        }
      }
    }
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
    aceptandoTemas: true,
  });

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
    let espe = JSON.parse(window.localStorage.getItem("infoEspecialidad"));
    await axios
      .get(urlFac + "GetFacultadesSimple/")
      .then((response) => {
        let filtro = []
        for(let k in response.data){
          if(response.data[k].idFacultad == espe.numFac)filtro.push(response.data[k]);
        }
        console.log(filtro);
        setFacus(filtro);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const petitionEsp = async () => {
    let espe = JSON.parse(window.localStorage.getItem("infoEspecialidad"));
    await axios
      .get(urlEsp + "GetEspecialidades/")
      .then((response) => {
        let filtro = []
        for(let k in response.data){
          if(response.data[k].idEspecialidad == espe.numEsp)filtro.push(response.data[k]);
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
        "http://34.195.33.246/api/ComiteXEspecialidad/ListarComitexEspecialidad_x_idComite?idComite=" +
          idUs
      )
      .then((response) => {
        console.log("ESTO RECIBO");
        console.log(response.data[0]);
        infoCurso.idEspec=response.data[0].fidEspecialidad;
        infoCurso.idFac=response.data[0].idFacultad;
        window.localStorage.setItem("ESPECIALIDADGESTIONADA",JSON.stringify(infoCurso));
        SetEspecialidadGestionada(response.data[0].especialidad);
        petitionCurso2(response.data[0].fidEspecialidad);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const petitionCurso2 = async (e) => {
    SetIdEsp(e);
    let response = await axios
      .get(
        "http://34.195.33.246/api/Curso/ListarCursosXIdEspecialidad?idEspecialidad=" +
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

  return (
    <div className="CONTAINERCOMITE">
      <h1 >{"Mis Cursos" }</h1>
      <h3>{"Gestión de "+especialidadGestionada}</h3>
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
            class="form-select "
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
        <div class="col-6 " style={{display: "none"}}>
          <p>Seleccione facultad</p>
          <select
            select
            class="form-select "
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
        <div class="col-6 " style={{display: "none"}} >
          <p>Seleccione especialidad</p>
          <select
            select
            class="form-select "
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
      <div class="row LISTAR-TABLA">
        <div class=" col-12 ">
          <table className="table fs-6 ">
            <thead class>
              <tr class>
                <th style={{ width: 130 }}>ID </th>
                <th style={{ width: 400 }}>Nombre</th>
                <th stlye={{ width: 400 }}>Semestre</th>
                <th style={{ width: 200 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrado.map((curso) => (
                <tr key={curso.idCurso}>
                  <td>{curso.idCurso}</td>
                  <td>{curso.nombre}</td>
                  <td> {curso.nombreSemestre}</td>
                  <td>
                    <button
                      class="btn BTN-ACCIONES" title="Modificar curso"
                      onClick={() => {
                        navigate("DatosCurso/" + curso.idCurso);
                      }}
                    >
                      {" "}
                      <FaIcons.FaEdit />
                    </button>
                    <button
                      class=" btn BTN-ACCIONES" title="Eliminar curso"
                      onClick={() => seleccionarCurso(curso)}
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
        procedimiento="eliminar"
        objeto="la especialidad"
        elemento={cursoSeleccionado && cursoSeleccionado.nombre}
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
          className="btn AGREGAR-CURSO" title="Agregar curso"
          onClick={() => {
            navigate("DatosCurso/0");
          }}
        >
          {" "}
          <span>Agregar Curso</span>
        </button>
      </div>
    </div>
  );
}
export default GestionarCurso;
