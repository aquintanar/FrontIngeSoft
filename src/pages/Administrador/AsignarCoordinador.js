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
import * as RiIcons  from "react-icons/ri";
import ModalBuscarUsuario from "./ModalBuscarUsuario";
import DatePicker from "react-date-picker";
import "../../stylesheets/Calendar.css";
import "../../stylesheets/DatePicker.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
var coordRegist;
var datos;

const URLPOST =
  "https://localhost:7012/api/ComiteXEspecialidad/PostComiteXEspecialidad";
const URLGET= "https://localhost:7012/api/ComiteTesis/GetComiteTesisXIdEspecialidad"


const URLDELETE="https://localhost:7012/api/ComiteXEspecialidad/DeleteComiteXEspecialidad";;

const URLESPECIALIDAD = "https://localhost:7012/api/Especialidad/GetEspecialidadXId";
const AsignarCoordinador = () => {
  const [selectCoord, setSelectCoord] = useState([]);
  const [selecEsp,setSelecEsp]= useState([]);
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
  const [ides,setIdes]= useState({
    fidComiteTesis:91,
    fidEspecialidad:6
  })
  const postDocente = async (doc1) => {
    let idComit = parseInt(doc1.idComiteTesis);
    let idEspecia = parseInt(id);
    ides.fidComiteTesis=idComit;
    ides.fidEspecialidad = idEspecia;
    console.log(ides.fidEspecialidad);
    console.log(ides.fidComiteTesis);
    console.log("se presiono");
    try {
      const resp = await axios.post(URLPOST,ides);
      console.log(resp.data);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  
  const ListDocentes = async () => {
    console.log(id);
    await axios.get(URLGET,{params:{idEspecialidad:id}})
    .then(response=>{
      console.log(response.data)
      setCoord(response.data);
    }).catch(error =>{
      console.log(error.message);
    })
  };
  const ListEspecialidad = async () => {
    console.log(id);
    console.log("HOLAAAAAAAAAA");
    await axios.get(URLESPECIALIDAD,{params:{idEspecialidad:id}})
    .then(response=>{
      console.log(response.data)
      setSelecEsp(response.data);
    }).catch(error =>{
      console.log(error.message);
    })
  };
  useEffect(()=>{
    ListDocentes();
    ListEspecialidad();
 },[])
  const agregarDatos = (doc1) => {
    postDocente(doc1);
  };
  const quitaCoord = async (elemento) => {
    var index = coordinadores.indexOf(elemento);
    let idComit = parseInt(coordinadores[index].idComiteTesis);
    let idEspecia = parseInt(id);
    ides.fidComiteTesis=idComit;
    ides.fidEspecialidad = idEspecia
    console.log(ides);
    try {
      const resp = await axios.delete(URLDELETE,{
        data:{
          fidComiteTesis:idComit,
          fidEspecialidad:idEspecia
        }
      });
      window.location.reload()
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
  const asignarCoordinadores = async (e) => {};
  return (
    <div class=" CONTAINERADMIN">
      <div className="col">
        <p class="HEADER-TEXT1">Asignación de Coordinadores</p>
        <p class="HEADER-TEXT2">{selecEsp[0].nombre }</p>
        <div class="fs-5 fw-normal  mb-1 ">Nombre docente</div>
        <div class="row DATOS3">
          <div className="col-11 mb-2">
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
          <div class="INSERTAR-BOTONES col-1">
            <button
              type="button"
              onClick={() => {
                setShow(true);
              }}
              class=" btn btn-primary fs-4 fw-bold BUSCAR"
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
        <div class="row INSERTAR-BOTONES">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              class="btn btn-primary fs-4 fw-bold   AÑADIR"
              type="button"
              onClick={() => postDocente(docentes)}
            >
              <span>Añadir</span>
            </button>
          </div>
        </div>
      </div>
      <p class="HEADER-TEXT2 mt-3">Coordinadores</p>
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
                  <td >{elemento.idComiteTesis}</td>
                  <td>{elemento.nombres+" "+elemento.apeMat}</td>
                  <td>
                  </td>
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
          <button
            class="btn btn-primary fs-4 fw-bold GUARDAR"
            type="button"
            onClick={asignarCoordinadores()}
          >
            <span>Guardar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AsignarCoordinador;
