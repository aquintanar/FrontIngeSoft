import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from 'react';
import '../../Pagina.css'
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import  '../../stylesheets/Comite.css';
import { useTable } from 'react-table';
import '../../stylesheets/Administrador.css'
import ModalBuscarUsuario from './ModalBuscarUsuario';
import ModalBuscarAsesor from "./ModalBuscarAsesor";
import {ModalConfirmación, ModalPregunta,ModalComentario} from '../../components/Modals';
import {  Button} from '@material-ui/core';
import useModal from '../../hooks/useModals';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sector } from "recharts";
const TemaSeleccionado = () => {
  const url="https://localhost:7012/api/TemaTesis/GetTemaTesis";
  //const url="http://44.210.195.91/api/TemaTesis/GetTemaTesis";
  let navigate = useNavigate();
  let {id} = useParams();
  let color;
  let esp;
  const location = useLocation();
  const globalidcur = window.localStorage.getItem("idCurso");
  const [espec,setEspec]= useState([]);
  const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
  const [isOpenEdit2Modal, openEdit2Modal ,closeEdit2Modal ] = useModal();
  const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
  const [isOpenComentarioModal, openComentarioModal ,closeComentarioModal ] = useModal();
  const [isOpenAsignadoModal, openAsignadoModal ,closeAsignadoModal ] = useModal();
  const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
  const [dataT, setDataT] = useState([]);
  const [idAlum,setIdAlum]=useState(0);
  useEffect(() => {
    getDataT();
    getDataTFeedback();
    getDataAlum();
  }, [idAlum]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [conf, setConf] = useState(false);
  const []= useState();
  const [selectAlum, setSelectAlum] =useState({
    idAlumno: 0,
    idUsuario:0,
    nombres: " ",
    apeMat: " ",
    correo: " ",
    codigoPUCP: 0,
    tieneTema:0,
  })
  const [al, setAl] = useState({
    idAlumno: 0,
    idUsuario:0,
    nombres: " ",
    apeMat: " ",
    correo: " ",
    codigoPUCP: 0,
    tieneTema:0,
  })

  
  const [ase, setAse] = useState({
    idAsesor: 0,
    nombres: " ",
    apePat: " ",
    apeMat: " ",
  })
  
  const [temaSeleccionado, setTemaSeleccionado]=useState({
    idTemaTesis: 0,
    idEstadoTemaTesis: 0,
    idAsesor: 0,
    idAlumno: 0,
    tituloTesis: " ",
    descripcion: " ", 
    idArea:0,
    idProponente: 0,
    motivoRechazo: " ",
    PalabraClave1: " ",
    PalabraClave2: " ",
    feedback: " ",
    fidCurso:0,
});
const [temaSeleccionadoFeedback, setTemaSeleccionadoFeedback]=useState({
  idTemaTesis: 0,
  idEstadoTemaTesis: 0,
  idAsesor: 0,
  idAlumno: 0,
  tituloTesis: " ",
  descripcion: " ", 
  idArea:0,
  idProponente: 0,
  motivoRechazo: " ",
  PalabraClave1: " ",
  PalabraClave2: " ",
  feedback: " ",
  fidCurso:0,
});
  if(location.state.estado==="Aprobado"){
    color="text-success font-weight-bold"
  }
  const getAreas = async()=>{
    const response = await axios.get("https://localhost:7012/api/Area/GetAreaXEspecialidad?idEspecialidad="+esp,{
      _method:'GET'
    }).then((response)=>{
      setEspec(response.data);
    }).catch(()=>{

    })
  }
  const getCurso = async()=>{
    const response = await axios.get("https://localhost:7012/api/Curso/BuscarCursoXId?idCurso="+globalidcur,{
      _method:'GET'
    }).then((response)=>{
      esp=response.data[0].idEspecialidad;
      getAreas();
    }).catch(()=>{

    })
  }
  useEffect(() => {
    getCurso();
  }, []);
  const  getDataT = async() => {
    const response= await axios(`https://localhost:7012/api/TemaTesis/GetTemaTesisXId?idTemaTesis=${location.state.id}`);
    setDataT(response.data);
    cargaMod(response.data[0]);
    console.log(response.data);
    setTemaSeleccionado({
      idTemaTesis: parseInt(response.data[0].idTemaTesis),
      idEstadoTemaTesis: parseInt(response.data[0].idEstadoTemaTesis),
      idAsesor: parseInt(response.data[0].idAsesor),
      idAlumno:idAlum,
      tituloTesis: response.data[0].tituloTesis,
      descripcion: response.data[0].descripcion,
      idArea:parseInt(response.data[0].idArea),
      idProponente: parseInt(response.data[0].idProponente),
      motivoRechazo: response.data[0].motivoRechazo,
      PalabraClave1: response.data[0].PalabraClave1,
      PalabraClave2: response.data[0].PalabraClave2,
      feedback: response.data[0].feedback,
      fidCurso:globalidcur,
    });
    console.log(temaSeleccionado);
  };
  const  getDataTFeedback = async() => {
    const response= await axios(`https://localhost:7012/api/TemaTesis/GetTemaTesisXId?idTemaTesis=${location.state.id}`);
    setDataT(response.data);
    console.log(response.data);
    setTemaSeleccionadoFeedback({
      idTemaTesis: parseInt(response.data[0].idTemaTesis),
      idEstadoTemaTesis: 2,
      idAsesor: parseInt(response.data[0].idAsesor),
      idAlumno: parseInt(response.data[0].idAlumno),
      tituloTesis: response.data[0].tituloTesis,
      descripcion: response.data[0].descripcion,
      idArea:parseInt(response.data[0].idArea),
      idProponente: parseInt(response.data[0].idProponente),
      motivoRechazo: response.data[0].motivoRechazo,
      PalabraClave1: response.data[0].PalabraClave1,
      PalabraClave2: response.data[0].PalabraClave2,
      feedback: response.data[0].feedback,
      fidCurso:parseInt(globalidcur),
    });
    console.log(temaSeleccionadoFeedback);
  };
  const  getDataAlum = () => {

    setSelectAlum({
      idAlumno: al.idAlumno,
      idUsuario:al.idAlumno,
      nombres: al.nombres,
      apeMat: al.apeMat,
      correo:al.correo,
      codigoPUCP: al.codigoPUCP,
      tieneTema:1,
    });
    console.log(selectAlum);
  };
  const handleChangeComentario= (e)=>{
    const {name, value}=e.target;

  setTemaSeleccionadoFeedback(prevState=>({
    ...prevState,
    [name]: value
  }))
  console.log(temaSeleccionadoFeedback);
  }

  const aprobarTema=async()=>{
      await axios.put("https://localhost:7012/api/TemaTesis/AprobarTemaTesis?idTemaTesis="+location.state.id)
      //await axios.put("http://44.210.195.91/api/TemaTesis/AprobarTemaTesis?idTemaTesis="+location.state.id)
      .then(response=>{
        console.log("Aprobado");
        navigate("../temaTesis");
        closeEditModal();
        openGuardadoModal();
      }).catch(error =>{
        console.log(error.message);
      })
    }
    const asignar = ()=>{
      getDataT();
      getDataAlum();
      asignarAlumno();
      modificarAlumnoAsignarTema();
    }
    const asignarAlumno=async()=>{  
      temaSeleccionado.idEstadoTemaTesis=6;
      await axios.put("https://localhost:7012/api/TemaTesis/ModifyTemaTesis",temaSeleccionado)
      .then(response=>{
        closeEditModal();
        openGuardadoModal();
      }).catch(error =>{
        console.log(error.message);
      })
    }
    const observar=async()=>{
      temaSeleccionadoFeedback.idAlumno=0;
      await axios.put("https://localhost:7012/api/TemaTesis/ModifyTemaTesisSinAlumno",temaSeleccionadoFeedback)
      .then(response=>{
        closeEditModal();
        openGuardadoModal();
      }).catch(error =>{
        console.log(error.message);
      })
    }
    const modificarAlumnoAsignarTema=async()=>{
      await axios.put(`https://localhost:7012/api/Alumno/AsignarTema?idAlumno=${idAlum}`)
      .then(response=>{
        closeEditModal();
        openGuardadoModal();
      }).catch(error =>{
        console.log(error.message);
      })
    }
    const handleChangeAlum = e =>{
      console.log(e.target.value);
      setIdAlum(idAlum)
    };
      const cerrarPut=()=>{
        closeEditadoModal();
        navigate("../temaTesis");
      }
      const abrirPost=()=>{
        openComentarioModal();
       // navigate("../gestion");     
      }
      const cerrarComentario=()=>{
        closeComentarioModal();
      }
     
      const notify = () => {
        toast.warn("Solo el coordinador puede acceder a esta funcionalidad");
      };
      const revisarCoordinador = () => {
        let escoordinador = window.localStorage.getItem("ESCOORDINADOR");
        if (escoordinador == "SI") {
          navigate("AgregarAsesor")
        } else {
          notify();
        }
      };

      const cambioSelect =e=>{
        setTemaCambiar(prevState=>({
          ...prevState,
          idArea: parseInt(e.target.value)
        }))
      }

      const cargaMod =(elemento)=>{
        setTemaCambiar({
          idTemaTesis: elemento.idTemaTesis,
          idArea: elemento.idArea,
          idProponente: elemento.idAsesor,
          nombreAsesor : elemento.nombresAsesor,
          ApePatAsesor : elemento.apePatAsesor,
          titulo : elemento.tituloTesis,
          descripcion: elemento.descripcion,
          observacionesYEntregables: elemento.observacionesYEntregables,
        })
        setAse({
          idAsesor: elemento.idAsesor,
          nombres: elemento.nombresAsesor,
          apePat: elemento.apePatAsesor,
        })
      }

      const [temaCambiar, setTemaCambiar] = useState({
        idTemaTesis: 1,
        idArea: 1,
        idProponente: 1,
        nombreAsesor : "",
        ApePatAsesor : "",
        titulo : "",
        descripcion: "",
        observacionesYEntregables: ""
      }) 
      const handleChange=e=>{
        const {name, value}=e.target;
        setTemaCambiar(prevState=>({
          ...prevState,
          [name]: value
        }))
      }

      const ModificarTema=async()=>{
        await axios.put("https://localhost:7012/api/TemaTesis/ModificarTemaTesisParaDocente?idTemaTesis="+temaCambiar.idTemaTesis+
          "&idArea="+temaCambiar.idArea+"&idProponente="+ase.idAsesor+"&titulo="+temaCambiar.titulo+"&descripcion="+temaCambiar.descripcion+
          "&observacionesYEntregables="+temaCambiar.observacionesYEntregables)
        .then(response=>{
          closeEdit2Modal();
          openGuardadoModal();
        }).catch(error =>{
          console.log(error.message);
        })
      }
      
    return (
      <div className="CONTAINERCOMITE">
      <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
      <div className="row">
          <p className="HEADER-TEXT1 mb-4">Tema Seleccionado</p>
      </div> 
          <div className="row">
              <div className="col-100% DATOS" >
                  <div className="text-start fs-7 fw-normal  mb-1">Título de tesis</div>
                  <div className="input-group mb-4 ">
                      <input type="text" disabled={location.state.estado=="Por Revisar"?false:true}  className="form-control" name="titulo" placeholder="Titulo" 
                         value={ temaCambiar && temaCambiar.titulo } onChange={handleChange}/>
                  </div>
              </div>
          </div>
          <div className="row DATOS">
              <div className="col-6" >
                  <div className="text-start fs-7 fw-normal  mb-1">Asesor</div>
                  <div className="input-group mb-4 ">
                      <input type="text" disabled={true}  className="form-control" name="titulo" placeholder="Asesor" 
                         value={ase.nombres + ' ' + ase.apePat} />
                          {(() => {
                          switch(location.state.estado){
                            case "Por Revisar" : return  <div class="INSERTAR-BOTONES">
                            <button type="button" onClick={() => {setShow1(true)}} class=" btn btn-primary fs-4 ms-3 mt-2 fw-bold BUSCAR" >
                                ...
                            </button>
                            </div>;
                            default: return <br></br> ;
                            }
                          }) ()}
                  </div>
              </div>
              <div className="col-6" >
              <div className="text-start fs-7 fw-normal  mb-1">Área</div>
                  <div className="input-group mb-4 ">
                    <select select class="form-select Cursor"  disabled={location.state.estado=="Por Revisar"?false:true}  
                        onChange= {cambioSelect} name="titulo" placeholder="Área" selected value = {temaCambiar && temaCambiar.idArea}  >
                      {espec.map(elemento=>
                          <option key={elemento.idArea} value={elemento.idArea}>{elemento.nombre}</option>  
                      )}
                    </select>
                      
                  </div>
              </div>
              
            </div>         

          <div class = "row DATOS">
              <div class = "col-6">
                  <div class="text-start fs-7 fw-normal ">Alumno</div>
                  <div class=" input-group input-group-lg mb-4">
                      <input type="text"   disabled="true" onChange={(e) =>handleChangeAlum(e)} class="form-control" name="alumno" placeholder="Alumno" aria-label="alumno" aria-describedby="inputGroup-sizing-lg" 
                         value={location.state.nombresAlumno + " " +location.state.apePatAlumno}/>
                 
                  {(() => {
                        switch(location.state.estado){
                          case "Publicado" : return  <div class="INSERTAR-BOTONES">
                          <button type="button" onClick={() => {setShow(true)}} class=" btn btn-primary fs-4 ms-3 mt-2 fw-bold BUSCAR" >
                              ...
                          </button>
                          </div>;
                          default: return <br></br> ;
                        }
                    }) ()}
                     </div>
              </div>
          </div>
          {<ModalBuscarUsuario  show={show} setShow={setShow} 
                                              al={al} setAl={setAl} idAlum={idAlum} setIdAlum={setIdAlum}
                        />}
          {<ModalBuscarAsesor  show1={show1} setShow1={setShow1} ase={ase} setAse={setAse} conf={conf} setConf={setConf}/>}
          <div className = "row DATOS">
          <div className = "col-lg-12">
                  <div class="text-start fs-7 fw-normal ">Tema de tesis</div>
                  <div class="input-group input-group-lg mb-3">
                      <input type="text" disabled={location.state.estado=="Por Revisar"?false:true}  class="form-control" name="descripcion" placeholder="Descripcion" aria-label="descripcion" aria-describedby="inputGroup-sizing-lg" 
                         value={temaCambiar && temaCambiar.descripcion} onChange={handleChange}/>
                  </div>
              </div>    

               <div className = "col-lg-12">
                  <div class="text-start fs-7 fw-normal ">Observaciones y entregables</div>
                  <div class="input-group input-group-lg mb-3">
                      <input type="text" disabled={location.state.estado=="Por Revisar"?false:true}  class="form-control" name="observacionesYEntregables" placeholder="Descripcion" aria-label="descripcion" aria-describedby="inputGroup-sizing-lg" 
                         value={ temaCambiar && temaCambiar.observacionesYEntregables} onChange={handleChange}/>
                  </div>
              </div>      
          </div>             
        
          <div className = "row DATOS">
              <p display="inline">Estado de Aprobación: <span style={{fontWeight: 'bold'}} className={color}>{location.state.estado }</span></p>
            
            </div>    
          <div className="row">                            
              <div className="LISTAR-BOTON">
              {(() => {
                        switch(location.state.estado){
                          case "Publicado" : return  <button onClick={()=>openAsignadoModal()} class="btn btn-primary fs-4 fw-bold mb-3 me-3 "  type="button">Asignar Alumno</button>;
                          case "Por Revisar" : 
                          return <div>
                          <button class="btn btn-primary fs-4 fw-bold mb-3 me-3 "  type="button" onClick={()=>openEditModal()}>Aprobar</button>
                          <button class="btn btn-primary fs-4 fw-bold mb-3 me-3" onClick={()=>abrirPost()} type="button">Observar</button>
                          <button class="btn btn-primary fs-4 fw-bold mb-3 me-3" onClick={()=>openEdit2Modal()} type="button">Modificar</button>
                          </div>;
                          default: return <div>
                          <button class="btn btn-primary fs-4 fw-bold mb-3 me-3 "  type="button" onClick={()=>openEditModal()}>Aprobar</button>
                          <button class="btn btn-primary fs-4 fw-bold mb-3 me-3" onClick={()=>abrirPost()} type="button">Observar</button>
                          </div>;
                        }
                }) ()}
                  
              </div>
          </div>
          <ModalPregunta
              isOpen={isOpenEditModal} 
              closeModal={closeEditModal}
              procedimiento = "aprobar"
              objeto="el tema"
              
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>aprobarTema()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeEditModal}>Cancelar</Button>
              </div>
            </ModalPregunta>
          <ModalPregunta
              isOpen={isOpenEdit2Modal} 
              closeModal={closeEdit2Modal}
              procedimiento = "modificar"
              objeto="el tema"
              elemento={temaCambiar.titulo}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>ModificarTema()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeEdit2Modal}>Cancelar</Button>
              </div>
            </ModalPregunta>
            <ModalPregunta
              isOpen={isOpenAsignadoModal} 
              closeModal={closeAsignadoModal}
              procedimiento = "asignar"
              objeto="el alumno"
              
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>asignar()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeAsignadoModal}>Cancelar</Button>
              </div>
            </ModalPregunta>
            <ModalConfirmación
              isOpen={isOpenGuardadoModal} 
              closeModal={closeGuardadoModal}
              procedimiento= "modificado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={()=>cerrarPut()}>Entendido</Button>
              </div>
            </ModalConfirmación>
            <ModalComentario
              isOpen={isOpenComentarioModal} 
              closeModal={closeComentarioModal}
              procedimiento= "Observar"
            >
                <div align = "left">
                <p class= "text-white mt-5">Observaciones para el tema</p></div>
             <div class = "DATOS">
                <div class = "col-12">
                    <div class="input-group input-group-lg mb-3">
                        <textarea className="form-control" name="feedback" placeholder="comentario" aria-label="comentarios"   cols="10" rows="15
                        "  onChange={(e) => handleChangeComentario(e)}/>
                    </div>
                </div>
            </div>
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <div class="align-text-bottom">
              <Button class="btn btn-primary btn-lg position-relative" onClick={()=>{observar();cerrarComentario()}}>Guardar</Button>
                <Button class="btn btn-danger btn-lg position-relative" onClick={()=>cerrarComentario()}>Volver</Button>
                </div>
                </div>
            </ModalComentario>
            <ToastContainer/>
  </div>    
    )
}
export default TemaSeleccionado;