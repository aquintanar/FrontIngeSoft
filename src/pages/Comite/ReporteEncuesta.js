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
import jsPDF from "jspdf";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import logo from "../../imagenes/logopucp.jpg";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
const url = "http://34.195.33.246/api/Alumno/";

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

const ReporteEncuesta = () => {
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalEliminar, setModalEliminar] = useState(false);
  const [currentPage, SetCurrentPage] = useState(0);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
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

  var registro = function () {
    this.Nombre = "";
    this.Pregunta = "";
    this.Alumno = "";
    this.Asesor = " "; 
    this.Puntaje = "";
  };
  const exportToExcel = async () => {
    var dataRegistro = [];
    for (let i in data) {
      var reg = new registro();
        reg.Nombre=data[i].nombreEncuesta;
        reg.Pregunta = data[i].pregunta;
        reg.Alumno = data[i].nombresAlumno + " " + data[i].apePatAlumno;
        reg.Asesor  = data[i].nombresAsesor + " " + data[i].apePatAsesor;
        reg.Puntaje = data[i].respuesta;
      dataRegistro.push(reg);
    }
    console.log(dataRegistro);
    const ws = XLSX.utils.json_to_sheet(dataRegistro);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const dat = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(dat, "ReporteTemas" + fileExtension);
  };
  function capitalizeString(string) {
    let tam = string.length;
    for (let i = 0; i < tam; i++) {
      if (i == 0) string.charAt(0).toUpperCase();
      else string.charAt(i).toLowerCase();
    }
    return string;
  }

  const data2 = [
    { name: "Facebook", value: 200 },
    { name: "Instagram", value: 300 },
    { name: "Twitter", value: 400 },
    { name: "Telegram", value: 100 },
  ];

  //Controla buscador--
  const buscador = (e) => {
    setSearch(e.target.value);
  };

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
  //----------------
  //Listar Alumnos tabla--

  /*LISTAR LOS TEMAS DE TESIS */
  const peticionGet = async () => {
    let idCurso = window.localStorage.getItem("idCurso");
    const response = await axios
      .get(
        "http://34.195.33.246/api/Encuesta/BuscarEncuestaXIdCurso?idCurso=" +
          idCurso /* cambiar esto por idCurso, se esta poniendo para la prueba*/,
        {
          _method: "GET",
        }
      )
      .then((response) => {
        console.log("AQUI ESTOY GAAAA");
        console.log(response.data);
        petitionGet2(response.data[0].idEncuesta);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const petitionGet2 = async (e) => {
    let response = await await axios
      .get(
        "http://34.195.33.246/api/DetallePreguntaEncuesta/BuscarDetallePreguntaEncuestaXIdEncuesta?idEncuesta=" +
          e
      )
      .then((response) => {
        console.log("LAS RESPUSETAS");
        console.log(response.data);
        setData(response.data);
      })
      .catch(() => {});
  };
  const GeneratePDF = () => {
    console.log("SE CLICKEO");
    var doc = new jsPDF("landscape", "px", "a4", "false");
    doc.text(190, 70, "PONTIFICIA UNIVERSIDAD CATÓLICA DEL PERÚ");
    doc.addImage(logo, "PNG", 250, 105, 150, 150);
    doc.text(240, 350, "REPORTE DE TEMAS DE TESIS");
    doc.addPage();
    var j = 60;
    var k = 0;
    for (let i in data) {
      doc.text(
        60,
        j,
        "_______________________________________________________________________________"
      );
      doc.text(
        60,
        j + 20,
        "ASESOR          : " +
          data[i].nombresAsesor +
          " " +
          data[i].apePatAsesor
      );
      doc.text(
        60,
        j + 40,
        "ALUMNO          : " +
          data[i].nombresAlumno +
          " " +
          data[i].apePatAlumno
      );
      doc.text(60, j + 60, "TITULO             : " + data[i].tituloTesis);
      doc.text(60, j + 80, "DESCRIPCION : " + data[i].descripcion);
      doc.text(60, j + 100, "ESTADO           : " + data[i].estadoTema);
      k++;
      if (k == 3) {
        doc.addPage();
        j = -60;
        k = 0;
      }
      j += 120;
    }
    doc.save("ReporteDeTesis.pdf");
  };
  //Eliminar una facultad--
  const peticionDelete = async () => {
    await axios
      .delete(url + "DeleteFacultad", {
        data: facultadSeleccionada,
      })
      .then((response) => {
        setData(
          data.filter(
            (facultad) =>
              facultad.idFacultad !== facultadSeleccionada.idFacultad
          )
        );
        closeDeleteModal();
        openConfirmModal();
      });
  };

  //Control mensaje de eliminar--
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  useEffect(() => {
    peticionGet();
  }, []);

  //Mensaje de confirmación para eliminar --
  const bodyEliminar = (
    <div className={styles.modal}>
      <div align="center">
        <p class="text-white">
          ¿Estás seguro que deseas eliminar la facultad{" "}
          <b>{facultadSeleccionada && facultadSeleccionada.nombre}</b> ?{" "}
        </p>
      </div>
      <div
        align="center"
        class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
      >
        <Button class="btn  btn-success" onClick={() => peticionDelete()}>
          Confirmar
        </Button>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          class="btn btn-danger"
          onClick={() => abrirCerrarModalEliminar()}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );

  return (
    <div className="CONTAINERADMIN">
      <h1>Reporte de Encuesta</h1>
      <h2>Previsualización</h2>

      <div className="FONDO-TESIS">
        <div className="HEADER-TEXTO"></div>
        <h2>Encuestas del Ciclo : </h2>
        <button onClick={previousPage} className="PAGINACION-BTN">
          <BsIcons.BsCaretLeftFill />
        </button>
        <button onClick={nextPage} className="PAGINACION-BTN">
          <BsIcons.BsCaretRightFill />
        </button>
        <div class="row   LISTAR-TABLA">
          <div class=" col-10  ">
            <table className="table fs-6 " id="excel-table">
              <thead>
                <tr class>
                  <th style={{ width: 200 }}>Nombre</th>
                  <th style={{ width: 150 }}>Pregunta</th>
                  <th style={{ width: 200 }}>Alumno</th>
                  <th style={{ width: 200 }}> Asesor</th>
                  <th style={{ width: 200 }}>Puntaje </th>
                </tr>
              </thead>
              <tbody>
                {filtrado.map((respuesta) => (
                  <tr key={respuesta.idDetallePreguntaEncuesta}>
                    <td>{respuesta.nombreEncuesta}</td>
                    <td>{respuesta.pregunta}</td>
                    <td>{respuesta.nombresAlumno +" "+ respuesta.apePatAlumno}</td>
                    <td>{respuesta.nombresAsesor +" "+ respuesta.apePatAsesor}</td>
                    <td>{respuesta.respuesta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="INSERTAR-BOTONES">
            <button
              className="btn  REGISTRAR"
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

export default ReporteEncuesta;
