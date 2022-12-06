import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import "../../stylesheets/Administrador.css";
import { Button } from "@material-ui/core";
import useModal from "../../hooks/useModals";
import { ModalConfirmación, ModalPregunta } from "../../components/Modals";
import DataTable from "./DataTable";
import * as Ionicons5 from "react-icons/io5";
import * as BsIcons from "react-icons/bs";
import * as BootIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import ModalBuscarUsuario from "./ModalBuscarUsuario";
import DatePicker from "react-date-picker";
import "../../stylesheets/Calendar.css";
import "../../stylesheets/DatePicker.css";
import "../../stylesheets/General.css";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
var coordRegist;
var datos;

const URLPOST =
  "http://34.195.33.246/api/ComiteXEspecialidad/PostComiteXEspecialidad";
const URLGET =
  "http://34.195.33.246/api/ComiteTesis/GetComiteTesisXIdEspecialidad";

const URLDELETE =
  "http://34.195.33.246/api/ComiteXEspecialidad/DeleteComiteXEspecialidad";

const URLESPECIALIDAD =
  "http://34.195.33.246/api/Especialidad/GetEspecialidadXId";
const AsignarCoordinador = () => {
  const [selectCoord, setSelectCoord] = useState([]);
  const [selecEsp, setSelecEsp] = useState([]);
  let navigate = useNavigate();
  const [edit, SetEdit] = useState(0);
  const [coordinadores, setCoord] = useState([]); /// los seleccionados
  const [show, setShow] = useState(false);
  const [currentPage, SetCurrentPage] = useState(0);
  const [coordReg, setCoordReg] = useState([]); /// los ya registrados
  let { id } = useParams();
  const [docentes, setDocentes] = useState({
    idComiteTesis: 0,
    nombres: "",
    apeMat: "",
    correo: "",
    codigoPUCP: 0,

    esCoordinador: "",
    imagen: "",
    esDocente: 0,
    apePat: "",
  });
  const [ides, setIdes] = useState({
    fidComiteTesis: 91,
    fidEspecialidad: 6,
  });
  const notify=()=>{
    toast.error("El usuario ya es coordinador de otra especialidad");
  }
  const verificarDisponibilidad = async(doc1)=>{
    let idComit = doc1.idComiteTesis;
    try{
      const response = await axios.get("http://34.195.33.246/api/ComiteXEspecialidad/ListarComitexEspecialidad_x_idComite?idComite="+idComit)
      .then((response)=>{
        if(Object.keys(response.data).length==0){
          console.log("ESTOY LIBRE")
          RelacionarEspecialidad(doc1);
        }
        else{
          notify();
          console.log("NO ESTOY LIBRE XD")
        }
      }).catch((error)=>{

      })
    }
    catch(error){
    }
  }

  const RelacionarEspecialidad = async (doc1) => {
    let idComit = parseInt(doc1.idComiteTesis);
    let idEspecia = parseInt(id);
    ides.fidComiteTesis = idComit;
    ides.fidEspecialidad = idEspecia;
    console.log(ides.fidEspecialidad);
    console.log(ides.fidComiteTesis);
    console.log("se presiono");
    try {
      const resp = await axios
        .post(URLPOST, ides)
        .then(() => {
          console.log("SE DEBE REINICIAR");
          navigate(-1);
          console.log(doc1);
          console.log(resp.data);
        })
        .catch(() => {});
    } catch (error) {
      console.log(error);
    }
  };
  

  const ListDocentes = async () => {
    console.log(id);
    await axios
      .get(URLGET, { params: { idEspecialidad: id } })
      .then((response) => {
        console.log(response.data);
        setCoord(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const ListEspecialidad = async () => {
    console.log(id);
    console.log("HOLAAAAAAAAAA");
    await axios
      .get(URLESPECIALIDAD, { params: { idEspecialidad: id } })
      .then((response) => {
        console.log(response.data);
        setSelecEsp(response.data[0].nombre);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    ListDocentes();
    ListEspecialidad();
  }, []);
  const agregarDatos = (doc1) => {
    RelacionarEspecialidad(doc1);
  };
  const quitaCoord = async (elemento) => {
    var index = coordinadores.indexOf(elemento);
    let idComit = parseInt(coordinadores[index].idComiteTesis);
    let idEspecia = parseInt(id);
    ides.fidComiteTesis = idComit;
    ides.fidEspecialidad = idEspecia;
    console.log(ides);
    try {
      const resp = await axios.delete(URLDELETE, {
        data: {
          fidComiteTesis: idComit,
          fidEspecialidad: idEspecia,
        },
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = () => {
    if (coordinadores.length >= currentPage)
      //VER CODIGO
      SetCurrentPage(currentPage + 5);
  };
  const previousPage = () => {
    if (currentPage > 0) SetCurrentPage(currentPage - 5);
  };
  const handleChangeCoord = (e) => {
    setSelectCoord({
      ...selectCoord,
      [e.target.name]: e.target.value,
    });
  };
  function atras() {
    navigate("../gestion/gesEspecialidad/");
  }

  const asignarCoordinadores = async (e) => {};
  return (
    <div class=" CONTAINERADMIN">
      <div className="col">
        <h1>Asignación de Coordinadores</h1>
        <h3>{selecEsp}</h3>
        <p>Nombre docente</p>
        <div class="row">
          <div className="col-11">
            <input
              type="text"
              onChange={handleChangeCoord}
              className="form-control"
              id="nombreCoordinador"
              name="nombreCoordinador"
              disabled
              value={docentes && docentes.nombres + " " + docentes.apeMat}
            />
          </div>
          <div class="col-1">
            <button
              type="button"
              onClick={() => {
                setShow(true);
              }}
              class=" btn BOTON-ICON"
            >
              <RiIcons.RiSearch2Line />
            </button>
          </div>
        </div>
        <div>
          {
            <ModalBuscarUsuario
              show={show}
              setShow={setShow}
              docentes={docentes}
              setDocentes={setDocentes}
              coordinadores={coordinadores}
              setCoord={setCoord}
            />
          }
        </div>
        <div class="row ">
          <div class="INSERTAR-BOTONES">
            <button
              class="btn AÑADIR"
              type="button"
              onClick={() => verificarDisponibilidad(docentes)}
            >
              <span>Añadir</span>
            </button>
          </div>
        </div>
      </div>
      <h2>Coordinadores</h2>
      <button onClick={previousPage} className="PAGINACION-BTN">
        <BsIcons.BsCaretLeftFill />
      </button>
      <button onClick={nextPage} className="PAGINACION-BTN">
        <BsIcons.BsCaretRightFill />
      </button>
      <div class="row LISTAR-TABLA-EV">
        <div class=" col-12  ">
          <table className="table fs-6 ">
            <thead class>
              <tr class>
                <th style={{ width: 100 }}>ID</th>
                <th style={{ width: 200 }}>Nombre</th>
                <th style={{ width: 50 }}></th>
                <th style={{ width: 200 }}>Correo</th>
                <th style={{ width: 50 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {coordinadores.map((elemento) => (
                <tr key={elemento.idComiteTesis}>
                  <td>{elemento.idComiteTesis}</td>
                  <td>{elemento.nombres + " " + elemento.apeMat}</td>
                  <td></td>
                  <td>{elemento.correo}</td>

                  <td>
                    <button
                      class=" btn BTN-ACCIONES"
                      onClick={() => quitaCoord(elemento)}
                    >
                      {" "}
                      <BootIcons.BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div class="INSERTAR-BOTONES">
            <button
              class="btn CANCELAR"
              type="button"
              onClick={() => atras()}
            >
              <span>Cancelar</span>
            </button>
          </div> 
          <ToastContainer/>
        </div>
      </div>
    </div>
  );
};

export default AsignarCoordinador;
