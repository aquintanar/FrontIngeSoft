import React from "react";
import "./proponerTemaAsesor.css";
import { useState, useEffect } from "react";
import ModalBuscarAsesor from "./ModalBuscarAsesor";
import { ModalConfirmación, ModalPregunta } from "../../components/Modals";
import useModal from "../../hooks/useModals";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const urlCoAsesor = "http://34.195.33.246/api/TemaTesisXAsesor/";
const urlTemaTesis = "http://34.195.33.246/api/TemaTesis/";

const ProponerTemaAsesor = ({ temaTesis, setTemaTesis }) => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const handleShow = () => setShow(true);
  let idAsesorRef = 0;
  let idTemaGlo = 0;
  const [isOpenPostModal, openPostModal, closePostModal] = useModal();
  const [isOpenEditadoModal, openEditadoModal, closeEditadoModal] = useModal();
  const [isOpenRechazoModal, openRechazoModal, closeRechazoModal] = useModal();
  const [asesorTesis, setAsesor] = useState({
    idUsuario: 0,
    nombres: "",
    apeMat: "",
  });

  const [asesorTesisXTema, setAsesorXTema] = useState({
    idTemaTesisXAsesor: 0,
    idAsesor: 0,
    idTemaTesis: 0,
    esPrincipal: 0,
  });
  const notify = ()=>toast.error("El periodo de recepcion de propuestas ha culminado");
  const subirCoasesor = async () => {
    console.log(asesorTesisXTema);
    await axios
      .post(urlCoAsesor + "PostTemaTesisXAsesor/", asesorTesisXTema)
      .then((response) => {
        openEditadoModal();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const subirTemaTesis = async () => {
    await axios
      .post(urlTemaTesis + "PostTemaTesisSimple", temaTesis)
      .then((response) => {
        temaTesis.idTemaTesis = response.data.idTemaTesis;
        idTemaGlo = response.data.idTemaTesis;
        idAsesorRef = asesorTesis.idUsuario;
        if (asesorTesis.idUsuario !== 0) {
          setAsesorXTema({
            idTemaTesisXAsesor: 0,
            idAsesor: idAsesorRef,
            idTemaTesis: idTemaGlo,
            esPrincipal: 0,
          });
          subirCoasesor();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const verPeriodoRecepcion = async () => {
    let idcur = window.localStorage.getItem("idCurso");
    await axios
      .get("https://localhost:7012/api/Curso/BuscarCursoXId?idCurso=" + idcur)
      .then((response) => {
        console.log(response.data);
        if (response.data[0].aceptandoTemas == 0) {
            notify();
        } else {
          openPostModal();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleChange = (e) => {
    setTemaTesis({
      ...temaTesis,
      [e.target.name]: e.target.value,
    });
  };
  function cerrarRechazo(){
    closeRechazoModal();
  }

  return (
    <div className="CONTAINER-ASESOR">
      <form>
        <h1 className="HEADER-TEXT1">Proponer tema de tesis</h1>
        <div className="form-group DATOS row">
          <p for="tituloTesis" className="col-md-2 col-form-label mt-2">
            {" "}
            Título de tesis:{" "}
          </p>
          <div className="col-md-10">
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="tituloTesis"
              name="tituloTesis"
              style={{ display: "flex" }}
            />
          </div>
        </div>
        <div className="form-group DATOS row mt-3">
          <p for="asesor" className="col-md-2 col-form-label">
            {" "}
            Nombre asesor:
          </p>
          <div className="col-md-10">
            <p> Daniel Augusto Peirano </p>
          </div>
        </div>
        <div className="form-group DATOS row mt-3">
          <p for="coasesor" className="col-md-2 col-form-label">
            {" "}
            Nombre co-asesor:
          </p>
          <div className="col-md-9">
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="nombreCoAsesor"
              name="nombreCoAsesor"
              disabled
              style={{ display: "flex" }}
              value={
                asesorTesis && asesorTesis.nombres + " " + asesorTesis.apeMat
              }
            />
          </div>
          <div className="col-md-1">
            <button
              type="button"
              onClick={() => {
                setShow(true);
              }}
              className="btn botonForm"
            >
              Coasesor
            </button>
            <div>
              {
                <ModalBuscarAsesor
                  show={show}
                  setShow={setShow}
                  asesorTesis={asesorTesis}
                  setAsesor={setAsesor}
                />
              }
            </div>
          </div>
        </div>

        <div className="form-group  DATOS row mt-3">
          <p for="descripcionTema" className="col-md-6 col-form-label">
            {" "}
            Descripción del tema:
          </p>
          <div className="col-md-12">
            <textarea
              onChange={handleChange}
              class="form-control"
              id="descripcion"
              name="descripcion"
              rows={6}
            ></textarea>
          </div>
        </div>

        <div className="form-group DATOS row mt-3">
          <p for="palabraClave1" className="col-md-2 col-form-label ">
            {" "}
            Palabra clave 1:
          </p>
          <div className="col-md-4">
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="palabraClave1"
              name="palabraClave1"
              style={{ display: "flex" }}
            />
          </div>
          <ToastContainer/>
          <label for="palabraClave2" className="col-md-2 col-form-label">
            {" "}
            Palabra clave 2:
          </label>
          <div className="col-md-4">
            <input
              onChange={handleChange}
              type="text"
              className="form-control"
              id="palabraClave2"
              name="palabraClave2"
              style={{ display: "flex" }}
            />
          </div>
        </div>

        <div className="form-group DATOS row mt-3">
          <p for="Estado" className="col-md-2 col-form-label ">
            {" "}
            Estado aprobación:
          </p>
          <div className="col-md-10">
            <p className="fonnnts"> PENDIENTE </p>
          </div>
          <p for="Estado" className="col-md-2 col-form-label">
            {" "}
            Retroalimentación:
          </p>
          <div className="col-md-12">
            <textarea
              className="form-control"
              id="motivoRechazo"
              name="motivoRechazo"
              rows={3}
              disabled
            ></textarea>
          </div>
        </div>
        <div className="form-group row mt-3">
          <ModalPregunta
            isOpen={isOpenPostModal}
            closeModal={closePostModal}
            procedimiento="proponer"
            objeto="tema de tesis"
            elemento={temaTesis && temaTesis.tituloTesis}
          >
            <div
              align="center"
              class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
            >
              <button
                class="btn  btn-success btn-lg"
                type="button"
                onClick={() => subirTemaTesis()}
              >
                Confirmar
              </button>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button class="btn btn-danger btn-lg" onClick={closePostModal}>
                Cancelar
              </button>
            </div>
          </ModalPregunta>
          <div className="col-md-10 BOTONES-FORM">
            <button
              type="button"
              className="btn botonForm"
              onClick={() => verPeriodoRecepcion()}
            >
              Enviar
            </button>
          </div>
          <div className="col-md-2 BOTONES-FORM">
            <button type="button" className="btn botonForm">
              Cancelar
            </button>
          </div>

          <ModalConfirmación
            isOpen={isOpenEditadoModal}
            closeModal={closeEditadoModal}
            procedimiento="propuesto"
          >
            <div
              align="center"
              class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
            >
              <button
                class="btn btn-success btn-lg"
                onClick={() => closeEditadoModal()}
              >
                Entendido
              </button>
            </div>
          </ModalConfirmación>
          <ModalConfirmación
            isOpen={isOpenRechazoModal}
            closeModal={closeRechazoModal}
            procedimiento="rechazado"
          >
            <div
              align="center"
              class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
            >
              <button
                class="btn btn-success btn-lg"
                onClick={() => cerrarRechazo()}
              >
                Entendido
              </button>
            </div>
          </ModalConfirmación>
        </div>
      </form>
    </div>
  );
};

export default ProponerTemaAsesor;
