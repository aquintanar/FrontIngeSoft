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
import i from "rechart/lib/chart";
const url = "https://localhost:7012/api/TemaTesis/GetTemaTesis";

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
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [modalEliminar, setModalEliminar] = useState(false);
  const [currentPage, SetCurrentPage] = useState(0);
  let navigate = useNavigate();

  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [isOpenConfirmModal, openConfirmModal, closeConfirmModal] = useModal();
  //objeto Alumno--
  const [tesisSeleccionada, setTesisSeleccionada] = useState({
    nombreAlumno: "",
    apePatAlumno: "",
    nombreAsesor: "",
    apePatAsesor: "",
    estadoTema: "",
    tituloTesis: "",
    descripcion: "",
    nombreArea: "",
  });
  const [facultadSeleccionada, setFacultadSeleccionada] = useState({
    idFacultad: "",
    nombre: "",
    descripcion: "",
    foto: null,
    estado: "",
  });
  var data2 = [
    { name: "Aprobados", value: 200 },
    { name: "Publicados", value: 300 },
    { name: "Sustentados", value: 400 },
    { name: "Propuestos", value: 100 },
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
  filtrado = filtrado.slice(currentPage, currentPage + 4);
  const nextPage = () => {
    if (filtrado.length >= currentPage)
      //VER CODIGO
      SetCurrentPage(currentPage + 4);
  };
  const previousPage = () => {
    if (currentPage > 0) SetCurrentPage(currentPage - 4);
  };
  //----------------
  //Listar Alumnos tabla--

  const peticionGet = async () => {
    const response = await axios
      .get(url, {
        _method: "GET",
      })
      .then((response) => {
        console.log("AQUI ESTOY GAAAA");
        console.log(response.data[0].estadoTema);
        setData(response.data);
        console.log("LLEGO AQUI");
        var i = 0;
        console.log("LLEGO AQUI2.0");
        var cantidadAprobado = 0;
        var cantidadPublicado = 0;
        var cantidadSustentado = 0;
        var cantidadPropuesto = 0;
       
        while (i < response.data.length) {
          if (response.data[i].estadoTema == "Aprobados") cantidadAprobado++;
          if (response.data[i].estadoTema == "Publicado") cantidadPublicado++;
          if (response.data[i].estadoTema == "Sustentado") cantidadSustentado++;
          if (response.data[i].estadoTema == "Propuesto") cantidadPropuesto++;

          i++;
        }
        console.log('HOLIWIS');
        data2[0].value = cantidadAprobado;
        data2[1].value = cantidadPublicado;
        data2[2].value = cantidadSustentado;
        data2[3].value = cantidadPropuesto;
        console.log(data2);
      })
      .catch((error) => {
        console.log(error.message);
      });
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

  //Selecciona facultad a eliminar--
  const seleccionarFacultad = (facultad) => {
    setFacultadSeleccionada(facultad);
    openDeleteModal();
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
      <p class="HEADER-TEXT1">Reporte de Tesis Sustentadas y Pendientes</p>
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
                  <th style={{ width: 600 }}>Titulo</th>
                  <th style={{ width: 600 }}>Descripcion</th>
                  <th style={{ width: 400 }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtrado.map((tema) => (
                  <tr key={tema.idTemaTesis}>
                    <td>{tema.tituloTesis}</td>
                    <td>{tema.descripcion}</td>
                    <td>{tema.estadoTema}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end LISTAR-BOTON ">
            <button
              className="btn btn-primary fs-4 fw-bold mb-3 "
              onClick={() => {
                navigate("datosFacultad/0");
              }}
            >
              <span>Descargar</span>
            </button>
          </div>
        </div>
        <PieChart width={400} height={400} className="GRAFICO-PIE">
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data2}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#042354"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default Tesis;
