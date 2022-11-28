import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from "react-icons/fa";
import * as BootIcons from "react-icons/bs";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import { Modal, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
//import './DatosFacultad.css';
import * as BsIcons from "react-icons/bs";
import "../../stylesheets/Administrador.css";
import "../../stylesheets/Comite.css";
import useModal from "../../hooks/useModals";
import { ModalPregunta, ModalConfirmación } from "../../components/Modals";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
const url = "http://34.195.33.246/api/Alumno/";
const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";
/*
const url= "http://44.210.195.91/api/Facultad/";
//-------
*/
//------

const themeX = createTheme({
  palette: {
    type: "dark",
    grey: {
      800: "#000000", // overrides failed
      900: "#121212", // overrides success
    },
    background: {
      paper: "#1294F2",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: themeX.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 6, 5),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
}));

const Tesis = () => {
  const styles = useStyles();
  const [alumnos, setAlumnos] = useState([]);
  const [entregables, setEntregables] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalEliminar, setModalEliminar] = useState(false);
  const [currentPage, SetCurrentPage] = useState(0);
  let navigate = useNavigate();

  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenConfirmModal, openConfirmModal, closeConfirmModal] = useModal();
  //objeto Alumno--
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState({
    idAlumno: 0,
    nombre: "",
    email: "",
  });
  const [facultadSeleccionada, setFacultadSeleccionada] = useState({
    idFacultad: "",
    nombre: "",
    descripcion: "",
    foto: null,
    estado: "",
  });
  const data2 = [
    { name: "Facebook", value: 200 },
    { name: "Instagram", value: 300 },
    { name: "Twitter", value: 400 },
    { name: "Telegram", value: 100 },
  ];

  //Filtro de tabla--
  let filtrado = [];

  if (!search) {
    //sin filtro
    filtrado = data;
  } else {
    if (search) {
      //ambos filtros
      filtrado = data.filter((dato) =>
        dato.nombres.toLowerCase().includes(search.toLocaleLowerCase())
      );
    }
  }

  //----------------
  filtrado = filtrado.slice(currentPage, currentPage + 6);
  const nextPage = () => {
    if (filtrado.length >= currentPage)
      //VER CODIGO
      SetCurrentPage(currentPage + 6);
  };
  const previousPage = () => {
    if (currentPage > 0) SetCurrentPage(currentPage - 6);
  };
  var registro = function () {
    this.Alumno = "";
    this.Entregable = "";
    this.Estado = "";
    this.Comentarios = "";
    this.Nota = "";
  };
  /*PRIMERO LISTAMOS LAS VERSIONES DEL ALUMNO */
  const peticionGet = async () => {
    var idCurso = window.localStorage.getItem("idCurso");
    const response = await axios /* NO OLVIDAR CAMBIAR EL ID DEL CURSO */
      .get(
        "https://localhost:7012/api/Curso/ReporteNotasAlumnosXCurso?idCurso=" +
          idCurso,
        {
          _method: "GET",
        }
      )
      .then((response) => {
        var dataRegistro = [];
        console.log(response.data);
        for (let i in response.data) {
          for (let j in response.data[i].versiones) {
            var reg = new registro();
            reg.Alumno =
            response.data[i].versiones[j].nombres +
              " " +
              response.data[i].versiones[j].apePat;
            reg.Entregable = response.data[i].versiones[j].nombre;
            reg.Comentarios = response.data[i].versiones[j].comentarios;
            reg.Estado = response.data[i].versiones[j].estadoEntregable;
            reg.Nota = response.data[i].versiones[j].notaVersion;
            dataRegistro.push(reg);
          }
        }
        setRawData(response.data);
        setData(dataRegistro);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const exportToExcel = () => {
    var dataRegistro = [];
    for (let i in rawData) {
      for (let j in rawData[i].versiones) {
        var reg = new registro();
        reg.Alumno =
          rawData[i].versiones[j].nombres +
          " " +
          rawData[i].versiones[j].apePat;
        reg.Entregable = rawData[i].versiones[j].nombre;
        reg.Comentarios = rawData[i].versiones[j].comentarios;
        reg.Estado = rawData[i].versiones[j].estadoEntregable;
        reg.Nota = rawData[i].versiones[j].notaVersion;
        dataRegistro.push(reg);
      }
    }
    console.log("resultado");
    
    const ws = XLSX.utils.json_to_sheet(dataRegistro);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dat = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dat, "ReporteNotasCiclo" + fileExtension);
  };

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <div className="CONTAINERADMIN">
      <p class="HEADER-TEXT1">Reporte del Ciclo</p>
      <p class="HEADER-TEXT2">Previsualización</p>

      <div className="FONDO-TESIS">
        <h1 class="HEADER-TEXTCICLO">Ciclo 2022-1</h1>
        <div className="HEADER-TEXTO">
          <h4 class="HEADER-TEXTALUMNOSI">Alumnos Inscritos : </h4>
          <h4 class="HEADER-TEXTALUMNOSS">Alumnos que Sustentaron Tesis : </h4>
        </div>
        <p class="HEADER-TEXT2">Temas por Alumno : </p>
        <button onClick={previousPage} className="PAGINACION-BTN">
          <BsIcons.BsCaretLeftFill />
        </button>
        <button onClick={nextPage} className="PAGINACION-BTN">
          <BsIcons.BsCaretRightFill />
        </button>
        <div class="row   LISTAR-TABLA">
          <div class=" col-10  ">
            <table className="table fs-6 ">
              <thead>
                <tr class>
                  <th style={{ width: 200 }}>Alumno</th>
                  <th style={{ width: 200 }}>Entregable</th>
                  <th style={{ width: 100 }}>Estado</th>
                  <th style={{width:200}}>Comentario</th>
                  <th style={{width:150}}>Nota</th>
                </tr>
              </thead>
              <tbody>
                {filtrado.map((alumno) => (
                  <tr key={alumno.Alumno}>
                    <td>{alumno.Alumno}</td>
                    <td>{alumno.Entregable}</td>
                    <td>{alumno.Estado}</td>
                    <td>{alumno.Comentarios}</td>
                    <td>{alumno.Nota}</td>

                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end LISTAR-BOTON ">
          <button
              className="btn btn-primary fs-4 fw-bold mb-3 "
              onClick={() => exportToExcel()}
            >
              <span>Excel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tesis;
