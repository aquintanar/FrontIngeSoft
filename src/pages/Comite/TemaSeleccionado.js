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
import {ModalConfirmación, ModalPregunta,ModalComentario} from '../../components/Modals';
import {  Button} from '@material-ui/core';
import useModal from '../../hooks/useModals';

const TemaSeleccionado = () => {
  const url="https://localhost:7012/api/TemaTesis/GetTemaTesis";
  //const url="http://44.210.195.91/api/TemaTesis/GetTemaTesis";
  let navigate = useNavigate();
  let {id} = useParams();
  let color;
  const location = useLocation();
  
  const [espec,setEspec]= useState([]);
  const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
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
    color="text-success"
  }
  const getAreas = async()=>{
    let infoesp  = JSON.parse(window.localStorage.getItem("infoEspecialidad"));
    let idEsp = infoesp.numEsp;
    const response = await axios.get("https://localhost:7012/api/Area/GetAreaXEspecialidad?idEspecialidad="+idEsp,{
      _method:'GET'
    }).then((response)=>{
      setEspec(response.data);
    }).catch(()=>{

    })
  }
  useEffect(() => {
    getAreas();
  }, []);
  const  getDataT = async() => {
    const response= await axios(`https://localhost:7012/api/TemaTesis/GetTemaTesisXId?idTemaTesis=${location.state.id}`);
    setDataT(response.data);
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
      fidCurso:1,
    });
    console.log(temaSeleccionado);
  };
  const  getDataTFeedback = async() => {
    const response= await axios(`https://localhost:7012/api/TemaTesis/GetTemaTesisXId?idTemaTesis=${location.state.id}`);
    setDataT(response.data);
    console.log(response.data);
    setTemaSeleccionadoFeedback({
      idTemaTesis: parseInt(response.data[0].idTemaTesis),
      idEstadoTemaTesis: parseInt(response.data[0].idEstadoTemaTesis),
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
      fidCurso:1,
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
      
      await axios.put("https://localhost:7012/api/TemaTesis/ModifyTemaTesis",temaSeleccionado)
      .then(response=>{
        closeEditModal();
        openGuardadoModal();
      }).catch(error =>{
        console.log(error.message);
      })
    }
    const observar=async()=>{
      
      await axios.put("https://localhost:7012/api/TemaTesis/ModifyTemaTesis",temaSeleccionadoFeedback)
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
     
    
      
    return (
      <div className="CONTAINERCOMITE">
      <img onClick={() =>navigate(-1)} type = 'button' src = {require('../../imagenes/backicon.png')}></img>
      <div className="row">
          <p className="HEADER-TEXT2">Ver Tema</p>
      </div> 
          <div className="row">
              <div className="col-100%" >
                  <div className="text-start fs-7 fw-normal  mb-1">Título</div>
                  <div className="input-group mb-3 ">
                      <input type="text" disabled={location.state.estado=="Por Revisar"?false:true}  className="form-control" name="titulo" placeholder="Titulo" 
                         value={ location.state.titulo } />
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="col-6" >
                  <div className="text-start fs-7 fw-normal  mb-1">Asesor</div>
                  <div className="input-group mb-3 ">
                      <input type="text" disabled="true"  className="form-control" name="titulo" placeholder="Asesor" 
                         value={location.state.nombresAsesor + ' ' + location.state.apellidoPatAsesor} />
                  </div>
              </div>
              <div className="col-6" >
              <div className="text-start fs-7 fw-normal  mb-1">Área</div>
                  <div className="input-group mb-3 ">
                      <input type="text" disabled={location.state.estado=="Por Revisar"?false:true}  className="form-control" name="titulo" placeholder="Área" 
                         value={location.state.areaNombre} />
                         <select>
                         {espec.map(elemento=>
                          <option key={elemento.idArea} value={elemento.idArea}>{elemento.nombre}</option>  
                      )}
                         </select>
                  </div>
              </div>
              
            </div>         

          <div class = "row">
              <div class = "col-6">
                  <div class="text-start fs-7 fw-normal ">Alumno</div>
                  <div class=" row DATOS3 input-group input-group-lg mb-3">
                      <input type="text"   disabled="true" onChange={(e) =>handleChangeAlum(e)} class="form-control" name="alumno" placeholder="Alumno" aria-label="alumno" aria-describedby="inputGroup-sizing-lg" 
                         value={idAlum + " " + al.nombres + " " + al.apeMat }/>
                 
                  {(() => {
                        switch(location.state.estado){
                          case "Publicado" : return  <div class="INSERTAR-BOTONES">
                          <button type="button" onClick={() => {setShow(true)}} class=" btn btn-primary fs-4 fw-bold BUSCAR" >
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
          <div className = "row ">
          <div className = "col-lg-12">
                  <div class="text-start fs-7 fw-normal ">Descripción</div>
                  <div class="input-group input-group-lg mb-3">
                      <input type="text" disabled={location.state.estado=="Por Revisar"?false:true}  class="form-control" name="descripcion" placeholder="Descripcion" aria-label="descripcion" aria-describedby="inputGroup-sizing-lg" 
                         value={location.state.descripcion}/>
                  </div>
              </div>       
          </div>             
        
          <div className = "row">
              <p display="inline">Estado de Aprobación: <span className={color}>{location.state.estado }</span></p>
            
            </div>    
          <div className="row">                            
              <div className="LISTAR-BOTON">
              {(() => {
                        switch(location.state.estado){
                          case "Publicado" : return  <button onClick={()=>openAsignadoModal()} class="btn btn-primary fs-4 fw-bold mb-3 me-3 "  type="button">Asignar Alumno</button>;
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
  </div>    
    )
}
export default TemaSeleccionado;