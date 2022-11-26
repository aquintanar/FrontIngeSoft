import React from "react";
import "./proponerTemaAsesor.css";
import { useState, useEffect } from "react";
import ModalBuscarAsesor from "./ModalBuscarAsesor";
import { ModalConfirmación, ModalPregunta } from "../../components/Modals";
import useModal from "../../hooks/useModals";
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
//http://34.195.33.246/api/
//https://localhost:7012/api/
const urlCoAsesor= "https://localhost:7012/api/TemaTesisXAsesor/";
const urlTemaTesis= "https://localhost:7012/api/TemaTesis/";
const urlAs = "https://localhost:7012/api/Asesor/";

const ProponerTemaAsesor = ({ temaTesis, setTemaTesis }) => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const handleShow = () => setShow(true);
  let idAsesorRef = window.localStorage.getItem("IDUSUARIO");
  let idTemaGlo = 0;
  const [isOpenPostModal, openPostModal, closePostModal] = useModal();
  const [areasel,setAreasel]=useState([]);
  const [areaSeleccionada,setAreaSeleccionada]=useState([]);
  const [especialidadCurso,setEspecialidadCurso]=useState([]);
  const [isOpenEditadoModal, openEditadoModal, closeEditadoModal] = useModal();
  const [isOpenRechazoModal, openRechazoModal, closeRechazoModal] = useModal();
  const [asesorTesis, setAsesor] = useState({
    idUsuario: 0,
    nombres: '',
    apeMat: '',
    apePat: ''
})

const [coasesorTesis, setCoAsesor] = useState({
    idUsuario: 0,
    nombres: '',
    apeMat: '',
    apePat: ''
})

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
    temaTesis.area.idArea = areasel.area.idArea;
    console.log("DEBAJO ESTA TEMA DE TESIS");
    console.log(temaTesis);
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
  const cargarAsesor = async () => {
    const response = await axios.get(
      urlAs + "GetAsesorXId?idAsesor=" + parseInt(idAsesorRef)
    );
    setAsesor({
      idUsuario: parseInt(idAsesorRef),
      nombres: response.data[0].nombres,
      apeMat: response.data[0].apeMat,
      apePat: response.data[0].apePat,
    });
};

  useEffect(() => {
  cargarAsesor();
  }, []);

  const cambioSelect =e=>{
    setAreasel(prevState=>({
      ...prevState,
      area:{idArea: e.target.value}}))
    console.log(areasel);
  }
  const ListarAreas1 = async () => {
    let idcur = window.localStorage.getItem("idCurso");
    await axios
      .get("https://localhost:7012/api/Curso/BuscarCursoXId?idCurso=" + idcur)
      .then((response) => {
        console.log(response.data);
        console.log("SE HA SETEADO LA ESPECIALIDAD");
        setEspecialidadCurso(response.data[0].idEspecialidad);
        ListarAreas2(response.data[0].idEspecialidad);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const ListarAreas2 = async (e) => {
    await axios
      .get("https://localhost:7012/api/Area/GetAreaXEspecialidad?idEspecialidad=" + e)
      .then((response) => {
        setAreaSeleccionada(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };  
  useEffect(()=>{
    ListarAreas1();
    },[])
  return (
    <div className="CONTAINER-ASESOR">
      <form>
      <h1 className='HEADER-TEXT1'>Proponer tema de tesis</h1>
            <div className="form-group DATOS row">
                <p for="tituloTesis" className="col-md-2 col-form-label mt-2"> Título de tesis: </p>
                <div className = "col-md-10" >
                    <input onChange={handleChange} type='text' className="form-control" id="tituloTesis" name="tituloTesis"
                    style={{display: 'flex'}}/>
                </div>
            </div>

            <div className="form-group  DATOS row mt-3">                
                <div className = "col-md-6">
                    <p for="descripcionTema" className="col-md-6 col-form-label"> Tema de tesis:</p>
                    <textarea onChange={handleChange} class="form-control" id="descripcion" name="descripcion" rows={4}></textarea>
                </div>
                <div className = "col-md-6">
                    <p for="descripcionTema" className="col-md-6 col-form-label"> Observaciones y entregables:</p>
                    <textarea onChange={handleChange} class="form-control" id="descripcion" name="descripcion" rows={4}></textarea>
                </div>              
            </div>

            <div className="form-group DATOS row mt-3">                                
                <div className = "col-md-6">
                    <div className = "form-group row">
                        <div className = "col-md-3"><p for="coasesor"> Estado:  </p></div>
                        <div className = "col-md-6"><p for="asesor"> PENDIENTE </p></div> 
                    </div>                 
                    <div className = "form-group row">
                        <div className = "col-md-3"><p for="coasesor"> Asesor:  </p></div>
                        <div className = "col-md-6"><p for="asesor">{asesorTesis.nombres + " "+ asesorTesis.apePat}</p></div> 
                    </div>
                    <div className = "form-group row">
                        <div className = "col-md-3"><p for="coasesor"> Alumno:  </p></div>
                        <div className = "col-md-9"> <input onChange={handleChange} type='text' id="nombreCoAsesor" name="nombreCoAsesor"  disabled
                        style={{display: 'flex'}}/></div> 
                    </div>
                    <div className = "form-group row">
                        <div className = "col-md-3"><p for="coasesor"> Co-asesor:  </p></div>
                        <div className = "col-md-6"> <input onChange={handleChange} type='text' id="nombreCoAsesor" name="nombreCoAsesor"  disabled
                        style={{display: 'flex'}} value={coasesorTesis && (coasesorTesis.nombres + " " + coasesorTesis.apeMat)}/></div>
                        <div className = "col-md-2"><button type="button" onClick={() => {setShow(true)}} className="btn botonForm" >
                            ...
                        </button></div>
                        <div>
                            {<ModalBuscarAsesor show={show} setShow={setShow} asesorTesis={asesorTesis} setAsesor={setAsesor}/>}
                        </div>
                        <div class="col-6  DATOS" >
                    <div class="  fs-5 fw-normal  mb-1 "><p>Áreas</p></div>
                    <select select class="form-select Cursor"  onChange= {cambioSelect}  selected value = {areaSeleccionada.idArea} >
                      {areaSeleccionada.map(elemento=>
                          <option key={elemento.idArea} value={elemento.idArea}>{elemento.nombre}</option>  
                      )}
                    </select>
                </div>
                    </div>
                </div>
                <div className = "col-md-6">
                    <div className = "form-group row">
                        <div className = "col-md-8"> <p for="Estado" className="col-md-6 col-form-label "> Palabras clave: </p> </div>
                        <div className = "col-md-4"><button type="button" className="btn botonForm">Agregar</button></div>
                    </div>
                    <div className = "form-group row">
                        <table className="table fs-6 ">
                        <tbody>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className = "form-group DATOS row mt-3">
                <p for="Estado" className="col-md-2 col-form-label"> Retroalimentación:</p>
                <textarea className="form-control" id="motivoRechazo" name="motivoRechazo" rows={2} disabled></textarea>
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
