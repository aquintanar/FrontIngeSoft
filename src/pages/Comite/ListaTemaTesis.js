import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import "../../Pagina.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import BootstrapTable from "react-bootstrap-table-next";
import { useNavigate } from "react-router-dom";
import { Modal, Button, TextField } from "@material-ui/core";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import axios from "axios";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import "../../stylesheets/Comite.css";
import "../../stylesheets/General.css";
import * as BsIcons from "react-icons/bs";
import useModal from "../../hooks/useModals";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

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
function ListaTemaTesis() {
  let navigate = useNavigate();
  const styles = useStyles();
  const esCoord = window.localStorage.getItem("ESCOORDINADOR");
  const [data, setData] = useState([]);
  const [modalGuardar, setModalGuardar] = useState(false);
  const [isOpenModal, openModal, closeModal] = useModal();
  const [search, setSearch] = useState("");
  const [fil, setFil] = useState(0);
  const [currentPage, SetCurrentPage] = useState(0);
  const [toggleButton, setToggleButton] = useState(false);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  var registro = function () {
    this.Titulo = "";
    this.Tema = "";
    this.Estado = "";
    this.Alumno = "";
    this.Asesor = "";
    this.Observaciones = "";
  };
  const exportToExcel = async () => {
    var dataRegistro = [];
    console.log(data);
    for (let i in data) {
      if (data[i].estadoTema == "Por Revisar") {
        var reg = new registro();
        reg.Titulo = data[i].tituloTesis;
        reg.Asesor = data[i].apePatAsesor + " " + data[i].nombresAsesor;
        reg.Tema = data[i].descripcion;
        reg.Observaciones = data[i].observaciones;
        reg.Estado = data[i].estadoTema;
        dataRegistro.push(reg);
      }
    }
    console.log(dataRegistro);
    const ws = XLSX.utils.json_to_sheet(dataRegistro);
    const wb = {Sheets:{'data':ws},SheetNames:['data']};
    const excelBuffer = XLSX.write(wb,{bookType:'xlsx',type:'array'});
    const  dat = new Blob([excelBuffer],{type:fileType});
    FileSaver.saveAs(dat,"ReporteTemasPorRevisar"+fileExtension);
  };
  const abrirCerrarModalGuardar = () => {
    setModalGuardar(!modalGuardar);
  };
  const publicarTemas = () => {
    data.forEach(function (tema, index) {
      axios
        .put(
          "http://34.195.33.246/api/TemaTesis/PublicarTemaTesis?idTemaTesis=" +
            tema.idTemaTesis
        )
        //axios.put("http://44.210.195.91/api/TemaTesis/PublicarTemaTesis?idTemaTesis="+tema.idTemaTesis)
        .then((response) => {
          console.log("Publicado");
          abrirCerrarModalGuardar();
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };
  function publicacion() {
    publicarTemas();
    navigate(-1);
  }
  const bodyGuardar = (
    <div className={styles.modal}>
      <div align="center">
        <p class="text-white">
          ??Est??s seguro que desea publicar estos temas de tesis?
        </p>
      </div>
      <div
        align="center"
        class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
      >
        <Button class="btn  btn-success" onClick={() => publicacion()}>
          Confirmar
        </Button>
        <Button
          class="btn btn-danger"
          onClick={() => abrirCerrarModalGuardar()}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );

  useEffect(() => {
    //getData();
    getData1();
  }, []);

  async function getData() {
    const response = await fetch(
      "http://34.195.33.246/api/TemaTesis/GetTemaTesis"
    );
    //const response = await fetch("http://44.210.195.91/api/TemaTesis/GetTemaTesis");
    const data = await response.json();
    setData(data);
    console.log(data);
  }
  const getData1 = async () => {
    let idCur = window.localStorage.getItem("idCurso");
    let response = await axios
      .get(
        "http://34.195.33.246/api/TemaTesis/GetTemaTesisXIdCurso?idCurso=" +
          idCur,
        {
          _method: "GET",
        }
      )
      .then((response) => {
        console.log("qqqqqqqqqqqq");
        console.log(response.data);
        setData(response.data);
      })
      .catch(() => {});
  };

  const selectRow = {
    mode: "checkbox",
  };

  let filtrado = [];

  filtrado = data;
  filtrado = filtrado.slice(currentPage, currentPage + 5);

  const nextPage = () => {
    //VER CODIGO
    SetCurrentPage(currentPage + 5);
  };
  const previousPage = () => {
    if (currentPage > 0) SetCurrentPage(currentPage - 5);
  };
  const funcFormatter = (data, row) => {
    return (
      <button
        className="btn OTRO"
        onClick={() => {
          navigate("temaSeleccionado/" + row.idTemaTesis, {
            state: {
              id: row.idTemaTesis,
              titulo: row.tituloTesis,
              estado: row.estadoTema,
              descripcion: row.descripcion,
              asesor: row.idAsesor,
              nombresAsesor: row.nombresAsesor,
              apellidoPatAsesor: row.apePatAsesor,
              area: row.idArea,
              areaNombre: row.nombreArea,
              alumno: row.idAlumno,
              nombresAlumno: row.nombresAlumno,
              apellidoPatAlumno: row.apePatAlumno,
              motivoRechazo: row.motivoRechazo,
              palabraClave1: row.PalabraClave1,
              palabraClave2: row.PalabraClave2,
              fedd: row.feedback,
            },
          });
        }}
      >
        {" "}
        {data}{" "}
      </button>
    );
  };
  const MySearch = (props) => {
    let input;
    const handleClick = () => {
      props.onSearch(input.value);
    };
    return (
      <div>
        <div className="row">
          <div class="col col-6 ">
            <p>B??squeda por cualquier criterio</p>
            <input
              className="form-control"
              ref={(n) => (input = n)}
              type="text"
              placeholder="B??squeda"
              onChange={handleClick}
            />
          </div>
        </div>
      </div>
    );
  };

  const { SearchBar } = Search;
  const columns = [
    {
      dataField: "idTemaTesis",
      text: "Id",
      sort: true,
      //filter: textFilter(),
      formatter: funcFormatter,
      headerStyle: {
        backgroundColor: "#042354",
        color: "white",
      },
      width:"2px",
    },

    {
      dataField: "tituloTesis",
      text: "T??tulo",
      sort: true,
      //filter: textFilter(),
      formatter: funcFormatter,
      headerStyle: {
        backgroundColor: "#042354",
        color: "white",
      },
    },
    {
      dataField: "descripcion",
      text: "Descripci??n",
      sort: true,
      //filter: textFilter(),
      formatter: funcFormatter,
      headerStyle: {
        backgroundColor: "#042354",
        color: "white",
      },
    },
    {
      dataField: "estadoTema",
      text: "Estado",
      sort: true,
      //filter: textFilter(),
      formatter: funcFormatter,
      headerStyle: {
        backgroundColor: "#042354",
        color: "white",
      },
    },

    {
      dataField: "nombreArea",
      text: "??rea",
      sort: true,
      //filter: textFilter(),
      formatter: funcFormatter,
      headerStyle: {
        backgroundColor: "#042354",
        color: "white",
      },
    },/*
    {
      dataField: "PalabraClave1",
      text: "PalabraClave1",
      sort: true,
      //filter: textFilter(),
      formatter: funcFormatter,
      headerStyle: {
        backgroundColor: "#042354",
        color: "white",
      },
    },
    {
      dataField: "PalabraClave2",
      text: "PalabraClave2",
      sort: true,
      //filter: textFilter(),
      formatter: funcFormatter,
      headerStyle: {
        backgroundColor: "#042354",
        color: "white",
      },
    },*/
  ];
  const handeToogleClick = async () => {
    setToggleButton(!toggleButton);
    let idCur = window.localStorage.getItem("idCurso");
    await axios
      .put(
        "http://34.195.33.246/api/Curso/modificarAceptandoTemas?idCurso=" +
          idCur +
          "&asignandoTemas=" +
          !toggleButton
      )
      .then(() => {
        console.log("Cambio");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="CONTAINERCOMITE">
      <div>
        <h2 className="HEADER-TEXT1">Temas de Tesis</h2>
        <h2>B??squeda de tesis </h2>
        
        <div className="LISTAR-TABLA">
          <ToolkitProvider
            keyField="idTemaTesis"
            data={filtrado}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <div class="row">
                  <div class ="col-8">
                    <MySearch {...props.searchProps} />
                  </div>
                  <div class ="col-3 mt-3">
                  <h5>Periodo de recepci??n:</h5>
                  </div>

                  <div class ="col-1 mt-4">
                      {toggleButton ? (
                      <div onClick={handeToogleClick} className="toggle2 ">
                        <div className="toggle_left"></div>
                      </div>
                      ) : (
                        <div onClick={handeToogleClick} className="toggle ">
                          <div className="toggle_right"></div>
                        </div>
                      )}
                  <p>{toggleButton ? <b>Abierto</b> : <b>Cerrado</b>}</p>
                </div>

                </div>
                
                <h2> Lista de Propuestas </h2>
                <button onClick={previousPage} className="PAGINACION-BTN">
                  <BsIcons.BsCaretLeftFill />
                </button>
                <button onClick={nextPage} className="PAGINACION-BTN">
                  <BsIcons.BsCaretRightFill />
                </button>
                <BootstrapTable
                  className="black white-text CAMBIO"
                  keyField="idTemaTesis"
                  data={data}
                  columns={columns}
                  filter={filterFactory()}
                  bordered={false}
                  hover
                  {...props.baseProps}
                />
              </div>
            )}
          </ToolkitProvider>

          <div className="INSERTAR-BOTONES">
            
            <button
              className="btn btn-primary DESCARGAR fs-4 fw-bold mb-3 "
              onClick={() => exportToExcel()}
            >
              <span>Excel</span>
            </button>
            
            
            {esCoord === "NO" ? null : 
                        <button
                        onClick={() => abrirCerrarModalGuardar()}
                        className="btn btn-primary GUARDAR fs-4 fw-bold mb-3"
                      >
                        Publicar
                      </button>
                    }

          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpenModal}
        closeModal={closeModal}
        open={modalGuardar}
        onClose={abrirCerrarModalGuardar}
      >
        {bodyGuardar}
      </Modal>
    </div>
  );
}

export default ListaTemaTesis;