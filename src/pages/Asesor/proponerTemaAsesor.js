import React from "react";
import "./proponerTemaAsesor.css";
import { useState, useEffect } from "react";
import ModalBuscarAsesor from "./ModalBuscarAsesor";
import { ModalConfirmación, ModalPregunta } from "../../components/Modals";
import useModal from "../../hooks/useModals";
import { Button } from "@material-ui/core";
import * as RiIcons  from "react-icons/ri";
import axios from "axios";
import {  useNavigate, useParams } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
//http://34.195.33.246/api/
//https://localhost:7012/api/
const urlCoAsesor= "https://localhost:7012/api/TemaTesisXAsesor/";
const urlTemaTesis= "https://localhost:7012/api/TemaTesis/";
const urlAs = "https://localhost:7012/api/Asesor/";

const ProponerTemaAsesor = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const handleShow = () => setShow(true);
  let idAsesorRef = window.localStorage.getItem("IDUSUARIO");
  let idTemaGlo = 0;
  let idCoasesor = 0;
  const [isOpenPostModal, openPostModal, closePostModal] = useModal();
  const [areasel,setAreasel]=useState([]);
  const [areaSeleccionada,setAreaSeleccionada]=useState([]);
  const [especialidadCurso,setEspecialidadCurso]=useState([]);
  const [isOpenEditadoModal, openEditadoModal, closeEditadoModal] = useModal();
  const [isOpenRechazoModal, openRechazoModal, closeRechazoModal] = useModal();
  const [isOpenEditModal, openEditModal, closeEditModal] = useModal();
  const [isOpenGuardadoModal, openGuardadoModal, closeGuardadoModal] = useModal();
  const [subTitulo, setSubtitulo] = useState("Nuevo tema");
  const[temaTesis, setTemaTesis] = useState({
    idTemaTesis: 0,
    idEstadoTemaTesis: 3,
    idAlumno: 0,
    estadoTema: 'Por Revisar',
    idProponente: parseInt(localStorage.getItem("IDUSUARIO")),
    idAsesor: parseInt(localStorage.getItem("IDUSUARIO")),
    tituloTesis:'',
    descripcion:'',
    palabraClave1:'',
    palabraClave2:'',
    motivoRechazo:'',
    idArea: 1,
    observacionesYEntregables: '',
    fidCurso: parseInt(localStorage.getItem("idCurso")),
    feedback: ''
  })

  const [asesorTesis, setAsesor] = useState({
    idUsuario: parseInt(localStorage.getItem("IDUSUARIO")),
    nombres: '',
    apeMat: '',
    apePat: ''
})

const [coasesorTesis, setCoAsesor] = useState({
    idUsuario: 0,
    nombres: 'Sin definir',
    apeMat: '',
    apePat: ''
})

const [alumno, setAlumno] = useState({
  idAlumno: 0,
  nombres: 'Sin definir',
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
      .post(urlCoAsesor + "PostTemaTesisXAsesor", asesorTesisXTema)
      .then((response) => {
        openGuardadoModal();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const subirTemaTesis = async () => {
    console.log("DEBAJO ESTA TEMA DE TESIS");
    console.log(temaTesis);
    await axios
      .post(urlTemaTesis + "PostTemaTesisSinAlumno", temaTesis).catch((error) => {
        console.log(error.message);
      }).then((response) => {
        console.log(response.data);
        openGuardadoModal();
        temaTesis.idTemaTesis = response.data.idTemaTesis;
        idTemaGlo = response.data.idTemaTesis;
        idCoasesor = coasesorTesis.idUsuario;
        console.log(response);
        console.log(idTemaGlo);
        console.log(idCoasesor);
        //idAsesorRef = asesorTesis.idUsuario;
        if (coasesorTesis.idUsuario !== 0) {
          setAsesorXTema({
            idTemaTesisXAsesor: 0,
            idAsesor: coasesorTesis.idUsuario,
            idTemaTesis: response.data.idTemaTesis,
            esPrincipal: 0
          });
          subirCoasesor();
        }else{
          openGuardadoModal();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const peticionPut = async () => {
    console.log(temaTesis);
    if(temaTesis.idAlumno !== undefined ){
      console.log('Modificando alumno');
      const response = await axios.put(
        urlTemaTesis + "ModifyTemaTesis", temaTesis
      ).then((response) => {
        closeEditModal();
        openEditadoModal();
      })
      .catch((error) => {
        console.log(error.message);
      });
    }else{
      console.log('Modificando');
      const response = await axios.put(
        urlTemaTesis + "ModifyTemaTesisSinAlumno", temaTesis
      ).then((response) => {
        closeEditModal();
        openEditadoModal();
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
  };
  const cerrarPut = () => {
    closeEditadoModal();
    navigate("../temaTesis");
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

const cargarTema = async () => {
  if (id !== "0") {
    const response = await axios.get(
      urlTemaTesis + "GetTemaTesisXId?idTemaTesis=" + parseInt(id)
    );
    setTemaTesis({
      idTemaTesis: response.data[0].idTemaTesis,
      idEstadoTemaTesis: response.data[0].idEstadoTemaTesis,
      estadoTema: response.data[0].estadoTema,
      idProponente: response.data[0].idProponente, //ver
      idAsesor: response.data[0].idAsesor,
      tituloTesis: response.data[0].tituloTesis,
      descripcion: response.data[0].descripcion, //tema de tesis
      motivoRechazo: response.data[0].feedback,
      palabraClave1: response.data[0].PalabraClave1,
      palabraClave2: response.data[0].PalabraClave2,
      observacionesYEntregables: response.data[0].observacionesYEntregables,
      idArea: response.data[0].idArea,
      fidCurso: parseInt(localStorage.getItem("idCurso")),
      feedback: response.data[0].feedback
    });
    setSubtitulo("Modificar tema");
    idAsesorRef = response.data[0].idAsesor;
    if(response.data[0].idAsesor !== 'null') cargarAsesor();
  }
};

  const cambioSelect =e=>{
    setTemaTesis((prevState) => ({
      ...prevState,
      idArea: parseInt(e.target.value),
    }));
    console.log(temaTesis);
    /*
    setAreasel(prevState=>({
      ...prevState,
      area:{idArea: e.target.value}}))
    console.log(areasel);
    */
  }
  const cambioCoasesor =e=>{
    setAsesorXTema((prevState) => ({
      ...prevState,
      idAsesor: parseInt(e.target.value),
    }));
    console.log(asesorTesisXTema);
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
    console.log(e);
    await axios
      .get("https://localhost:7012/api/Area/GetAreaXEspecialidad?idEspecialidad=" + e)
      .then((response) => {
        setAreaSeleccionada(response.data);
        if(response.data[0] !== undefined){          
          setTemaTesis((prevState) => ({
          ...prevState,
          idArea: parseInt(response.data[0].idArea),
          }));
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };  
  useEffect(()=>{
    if (id === "0") cargarAsesor();
    ListarAreas1();
    cargarTema();
    },[])

    const peticionSelecter = () => {
      if (id === "0") {
        openPostModal();
      } else {
        openEditModal();
      }
    };
  return (
    <div className="CONTAINER-ASESOR">
      <form>
      <h1 className='HEADER-TEXT1'>Proponer tema de tesis - {subTitulo}</h1>
            <div className="form-group DATOS row">
                <p for="tituloTesis" className="col-md-2 col-form-label mt-2"> Título de tesis: </p>
                <div className = "col-md-10" >
                    <input onChange={handleChange} type='text' className="form-control" id="tituloTesis" name="tituloTesis"
                    style={{display: 'flex'}} value={temaTesis && temaTesis.tituloTesis} placeholder="Inserte el título de tesis"/>
                </div>
            </div>

            <div className="form-group  DATOS row mt-3">                
                <div className = "col-md-6">
                    <p for="descripcionTema" className="col-md-6 col-form-label"> Tema de tesis:</p>
                    <textarea onChange={handleChange} class="form-control" id="descripcion" name="descripcion" rows={4} value={temaTesis && temaTesis.descripcion} placeholder="Inserte el tema de tesis"></textarea>
                </div>
                <div className = "col-md-6">
                    <p for="descripcionTema" className="col-md-6 col-form-label"> Observaciones y entregables:</p>
                    <textarea onChange={handleChange} class="form-control" id="observacionesYEntregables" name="observacionesYEntregables" rows={4}
                    value={temaTesis && temaTesis.observacionesYEntregables} placeholder="Inserte las observaciones y/o entregables"></textarea>
                </div>              
            </div>

            <div className="form-group DATOS row mt-3">                                
                <div className = "col-md-6">
                    <div className = "form-group row">
                        <div className = "col-md-3"><p for="Estado"> Estado:  </p></div>
                        <div className = "col-md-6"><p for="Estado"> {temaTesis.estadoTema} </p></div> 
                    </div>                 
                    <div className = "form-group row">
                        <div className = "col-md-3"><p for="Asesor"> Asesor:  </p></div>
                        <div className = "col-md-6"><p for="Asesor">{asesorTesis.nombres + " "+ asesorTesis.apePat}</p></div> 
                    </div>
                    <div className = "form-group row">
                        <div className = "col-md-3"><p for="Alumno"> Alumno:  </p></div>
                        <div className = "col-md-9"> <input onChange={handleChange} type='text' id="nombreCoAsesor" name="nombreCoAsesor"  disabled
                        style={{display: 'flex'}} value={alumno && (alumno.nombres + " " + alumno.apePat)}/></div> 
                    </div>
                    <div className = "form-group row">
                        <div className = "col-md-3"><p for="coasesor"> Co-asesor:  </p></div>
                        <div className = "col-md-7"> <input onChange={cambioCoasesor} type='text' id="idAsesor" name="idAsesor"  disabled
                        style={{display: 'flex'}} value={coasesorTesis && (coasesorTesis.nombres + " " + coasesorTesis.apeMat)}/></div>
                        <div className = "col-md-1"><button type="button" onClick={() => {setShow(true)}} className="btn btn-primary fs-4 fw-bold BUSCAR" >
                        <RiIcons.RiSearch2Line />
                        </button></div>
                        <div>
                            {<ModalBuscarAsesor show={show} setShow={setShow} asesorTesis={coasesorTesis} setAsesor={setCoAsesor}/>}
                        </div>
                    </div>
                    <div className = "form-group row">
                      <div class="col-md-3"><p>Áreas</p></div>
                      <div className = "col-md-9">
                      <select select class="form-select Cursor"  onChange= {cambioSelect}  selected value = {areaSeleccionada.idArea} >
                      {areaSeleccionada.map(elemento=>
                          <option key={elemento.idArea} value={elemento.idArea}>{elemento.nombre}</option>  
                      )}
                      </select>
                      </div>
                    </div>
                </div>
                <div className = "col-md-6 ">
                    <div className = "form-group row DATOS">
                        <div className = "col-md-8"> <p for="Estado" className="col-md-6 col-form-label "> Palabras clave: </p> </div>
                    </div>
                    <div className = "form-group row">
                        <div className = "col-md-9"> <input onChange={handleChange} className="form-control" type='text' style={{display: 'flex'}}
                        placeholder="Agregue una palabra clave (opcional)"/> </div>
                        <div className = "col-md-3"><button type="button" className="btn botonForm">Agregar</button></div>
                    </div>
                    <div className = "form-group row LISTAR-TABLA mt-3" >
                        <div className = "col-md-12 LISTAR-TABLA">
                        <table className="table fs-6 ">
                        <thead class >
                        <tr class>
                          <th style ={{width: 275}}>Palabra</th>
                          <th style ={{width: 20}}></th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        </table>
                        </div>
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
          <ModalConfirmación
        isOpen={isOpenGuardadoModal}
        closeModal={closeGuardadoModal}
        procedimiento="guardado"
      >
        <div
          align="center"
          class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
        >
          <Button class="btn btn-success btn-lg" onClick={() => navigate("../temaTesis")}>
            Entendido
          </Button>
        </div>
      </ModalConfirmación>         

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
                onClick={() => navigate("../temaTesis")}
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
        <ModalPregunta
        isOpen={isOpenEditModal}
        closeModal={closeEditModal}
        procedimiento="modificar"
        objeto="el curso"
        elemento={temaTesis && temaTesis.tituloTesis}
        >
        <div
          align="center"
          class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
        >
          <Button class="btn  btn-success btn-lg" onClick={() => peticionPut()}>
            Confirmar
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button class="btn btn-danger btn-lg" onClick={closeEditModal}>
            Cancelar
          </Button>
        </div>
        </ModalPregunta>

        <ModalConfirmación
        isOpen={isOpenEditadoModal}
        closeModal={closeEditadoModal}
        procedimiento="modificado"
      >
        <div
          align="center"
          class="d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom"
        >
          <Button class="btn btn-success btn-lg" onClick={() => cerrarPut()}>
            Entendido
          </Button>
        </div>
      </ModalConfirmación>

          <div className = "form-group INSERTAR-BOTONES row mt-3">
            <div class=" d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              type="button"
              className="btn btn-primary fs-4 botonForm GUARDAR"
              onClick={() => peticionSelecter()}
            >
              Guardar
            </button>
            <button class="btn btn-primary fs-4 fw-bold CANCELAR" type="button" onClick={()=>{navigate("../temaTesis");}}>
              Cancelar
            </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProponerTemaAsesor;
