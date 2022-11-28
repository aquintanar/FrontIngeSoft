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
import * as BsIcons from "react-icons/bs";
import useModal from "../../hooks/useModals";

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
  const [data, setData] = useState([]);
  const [modalGuardar, setModalGuardar] = useState(false);
  const [isOpenModal, openModal, closeModal] = useModal();
  const [search, setSearch] = useState("");
  const [fil, setFil] = useState(0);
  const [currentPage, SetCurrentPage] = useState(0);
  const [toggleButton, setToggleButton] = useState(false);
  const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
  const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();   
  const [temaSolicitar , SetTemaSolicitar] = useState({
      idSolicitudTemaXAlumno: 0 ,
      fidTemaTesis: 1 ,
	    fidAlumno: 1
  });

  const abrirCerrarModalGuardar = () => {
    setModalGuardar(!modalGuardar);
  };
  const publicarTemas = () => {
    data.forEach(function (tema, index) {
      axios
        .put(
          "https://localhost:7012/api/TemaTesis/PublicarTemaTesis?idTemaTesis=" +
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
    window.location.reload();
  }
  const bodyGuardar = (
    <div className={styles.modal}>
      <div align="center">
        <p class="text-white">
          ¿Estás seguro que desea publicar estos temas de tesis?
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
    getData();
  }, []);

  async function getData() {
    const response = await fetch(
      "https://localhost:7012/api/TemaTesis/GetTemaTesisCompleto"
    );
    //const response = await fetch("http://44.210.195.91/api/TemaTesis/GetTemaTesis");
    const data = await response.json();
    setData(data);
    console.log(data);
  }

  const selectRow = {
    mode: "checkbox",
  };

  let filtrado = [];

  filtrado = data;
  filtrado = filtrado.slice(currentPage, currentPage + 5);

  const nextPage = () => {
    if (filtrado.length >= currentPage)
      //VER CODIGO
      SetCurrentPage(currentPage + 5);
  };
  const previousPage = () => {
    if (currentPage > 0) SetCurrentPage(currentPage - 5);
  };
  const funcFormatter = (data, row) => {
    return (
      <button
        className="btn"
        onClick={() => {
          navigate("temaSeleccionado/" + row.idTemaTesis, {
            state: {
              id: row.idTemaTesis,
              titulo: row.tituloTesis,
              Asesor: row.nombres+" "+row.apePat+" "+row.apeMat,
              Área: row.Area,
              Observaciones: row.Observaciones,
            },
          });
        }}
      >
        {" "}
        {data}{" "}
      </button>
    );
  };
  const peticionSelecter=(row)=>{
    console.log('peticionSelecterFuncionaaaaaaaaaaaaaaaaa')
    openPostModal(row)
  }

  const peticionPost=async (row)=>{
    console.log('postSolicitarTema');
    console.log(row);
    console.log(localStorage.getItem("IDUSUARIO"));
    console.log(temaSolicitar);
    SetTemaSolicitar({
      fidTemaTesis:row.idTemaTesis,
      fidAlumno: localStorage.getItem("IDUSUARIO"),
    });
    console.log(temaSolicitar);

    let url  = "https://localhost:7012/api/TemaTesis/PostSolicitudTemaTesis?fidTemaTesis="+row.idTemaTesis+"&fidAlumno="+localStorage.getItem("IDUSUARIO")
    
    await axios.post(url,
      {
      _method: 'POST'
      })
    .then(response=>{
      //closePostModal();
      //openGuardadoModal();
      window.confirm("Se ha presentado su solicitud");
      window.location.reload(false);
      console.log("se cargo correctamente")
      console.log(url)
      console.log(row.idTemaTesis)
      console.log(localStorage.getItem("IDUSUARIO"))
    }).catch(error =>{
      console.log(error.message);
    })
  }


  const funcButtonSols = (data, row) => {
    return (
      <button
        className="btn btn-primary" 
        onClick={()=>peticionPost(row)}
      >
        Solicitar
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
            <p>Búsqueda por cualquier criterio</p>
            <input
              className="form-control"
              ref={(n) => (input = n)}
              type="text"
              placeholder="Búsqueda"
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
    },

    {
      dataField: "tituloTesis",
      text: "Título",
      sort: true,
      //filter: textFilter(),
      formatter: funcFormatter,
      headerStyle: {
        backgroundColor: "#042354",
        color: "white",
      },
    },
    {
      dataField: "nombres",
      text: "Asesor",
      sort: true,
      //filter: textFilter(),
      formatter: funcFormatter,
      headerStyle: {
        backgroundColor: "#042354",
        color: "white",
      },
    },
    {
      dataField: "Area",
      text: "Área",
      sort: true,
      //filter: textFilter(),
      formatter: funcFormatter,
      headerStyle: {
        backgroundColor: "#042354",
        color: "white",
      },
    },

    {
      dataField: "Observaciones",
      text: "Observaciones",
      sort: true,
      //filter: textFilter(),
      formatter: funcFormatter,
      headerStyle: {
        backgroundColor: "#042354",
        color: "white",
      },
    },
    {
      dataField: "",
      text: "Solicitar tema",
      sort: true,
      formatter: funcButtonSols,
      headerStyle: {
        backgroundColor: "#042354",
        color: "white",
      },
    },


  ];
  const handeToogleClick = () => {
    setToggleButton(!toggleButton);
  };
  return (
    <div className="CONTAINERCOMITE">
      <div>
        <h2 className="HEADER-TEXT1">Temas de Tesis</h2>
        <h2 className="HEADER-TEXT2"> Lista de Propuestas </h2>
        <p1 className = "PARRAFO-TEXT">Ponerse en contacto con el asesor para solicitar la asignación de un tema, caso contrario se dematriculará a los alumnos del curso si no cuentan con
          uno luego de la primera semana de clases.
        </p1>
        <div className="LISTAR-TABLA-ELEMENTOS">
          <ToolkitProvider
            keyField="idTemaTesis"
            data={filtrado}
            columns={columns}
            search
          >
            {(props) => (
              <div>
                <MySearch {...props.searchProps} />
                <hr />
                <button onClick={previousPage} className="PAGINACION-BTN">
                  <BsIcons.BsCaretLeftFill />
                </button>
                <button onClick={nextPage} className="PAGINACION-BTN">
                  <BsIcons.BsCaretRightFill />
                </button>
                <BootstrapTable
                  className="black white-text"
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
          <p> </p>
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