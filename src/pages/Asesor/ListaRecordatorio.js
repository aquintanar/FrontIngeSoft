import React from "react";
import "./proponerTemaAsesor.css";
import { useState, useEffect, useContext } from "react";
import useModal from "../../hooks/useModals";
import { Button, Collapse } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTable } from "react-table";
import * as BsIcons from "react-icons/bs";
import "../../stylesheets/Asesor.css";
import * as FaIcons from "react-icons/fa";
import * as BootIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import { ModalConfirmación, ModalPregunta } from "../../components/Modals";
import DateRangePicker from "@wojtekmaj/react-daterange-picker/dist/entry.nostyle";
import DatoReunion from "./DatoReunion";

import { UserContext } from "../../UserContext";
import { AsesorContext } from "./AsesorContext";
import { AiTwotoneDollarCircle } from "react-icons/ai";

const ListaRecordatorio = () => {
  const [currentPage, SetCurrentPage] = useState(0);
  const [isOpenDeleteModal, openDeleteModal, closeDeleteModal] = useModal();
  const [alumnosAsesorados,setAlumnosAsesorados]=useState([]);
  const [isOpenConfirmModal, openConfirmModal, closeConfirmModal] = useModal();
  let navigate = useNavigate();
  const [fil, setFil] = useState(0);
  const peticionGet = async () => {
    await axios
      .get(
        "https://localhost:7012/api/Alumno/ListAlumnosXIdAsesor?idAsesor=2",
        {
          _method: "GET",
        }
      )
      .then((response) => {
        setAlumnosAsesorados(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(()=>{
    peticionGet();
 },[])
  const cambioSelect = (e) => {
    const valor = parseInt(e.target.value);
    setFil(valor);
  };
  let filtrado = [];
  filtrado = filtrado.slice(currentPage, currentPage + 5);
  const nextPage = () => {
    if (filtrado.length >= 5)
      //VER CODIGO
      SetCurrentPage(currentPage + 5);
  };
  const previousPage = () => {
    if (currentPage > 0) SetCurrentPage(currentPage - 5);
  };
  return (
    <div>
      <div class=" CONTAINERASESOR">
        <p class="HEADER-TEXT1">Recordatorios</p>
        <p>*Se listan las notas pendientes de corregir</p>
      </div>
      <div class=" CONTAINERASESOR2">
        <p class="HEADER-TEXT2">Búsqueda de recordatorios</p>
        <div class="row">
          <div class="col-4 DATOS">
            <div class=" fs-5 fw-normal  mb-1 ">
              <p>Estado</p>
            </div>
            <select
              select
              class="form-select Cursor"
              aria-label="Default select example"
              onChange={cambioSelect}
            >
              <option key="0" selected value="0">
                Todos
              </option>
              <option key="1" value="1">
                Asitió
              </option>
              <option key="2" value="2">
                Tardanza
              </option>
              <option key="3" value="3">
                No asistió
              </option>
              <option key="4" value="4">
                Pendiente
              </option>
            </select>
          </div>
        </div>

        <p class="HEADER-TEXT2">Lista de recordatorios</p>
        <button onClick={previousPage} className="PAGINACION-BTN">
          <BsIcons.BsCaretLeftFill />
        </button>
        <button onClick={nextPage} className="PAGINACION-BTN">
          <BsIcons.BsCaretRightFill />
        </button>

        <div class="row LISTAR-TABLA">
          <div class=" col-11 ">
            <table className="table fs-6 ">
              <thead class>
                <tr class>
                  <th style={{ width: 200 }}>Nombre del Alumno</th>
                  <th style={{ width: 155 }}>Nombre del Entregable</th>
                  <th style={{ width: 245 }}>Fecha limite de revision</th>
                  <th style={{ width: 100 }}>Estado</th>
                </tr>
              </thead>
              <tbody>
                {filtrado.map((reunion) => (
                  <tr>
                    <td>
                      <a class="LINK" href={reunion.enlace} target="_blank">
                        {reunion.nombre}
                      </a>
                    </td>
                    <td>
                      {reunion.nombresAlumno} {reunion.apePatAlumno}
                    </td>
                    <td>{reunion.fechaHoraInicio}</td>

                    <td>
                      {(() => {
                        switch (reunion.estadoReunion) {
                          case 1:
                            return <td class="text-success">Asistió</td>;
                          case 2:
                            return <td class="text-warning">Tardanza</td>;
                          case 3:
                            return <td class="text-danger">No asistió</td>;
                          default:
                            return <td>Pendiente</td>;
                        }
                      })()}
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
          objeto="la reunión"
          //elemento={reunionSeleccionada && reunionSeleccionada.nombre}
        >
          <div
            align="center"
            class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
          ></div>
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
      </div>
    </div>
  );
};

export default ListaRecordatorio;
