import React from 'react'
import {useState , useEffect} from "react";
import useModal from '../../../hooks/useModals';
import {  Button} from '@material-ui/core';
import {  useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import * as BsIcons from 'react-icons/bs';
import '../../../stylesheets/Asesor.css'
import "../../../stylesheets/General.css";
import * as BootIcons  from "react-icons/bs";
import * as RiIcons  from "react-icons/ri";
import {ModalConfirmación, ModalPregunta} from '../../../components/Modals';
import ModalBuscarEvaluacion from './ModalBuscarEvaluacion';

const url = "http://34.195.33.246/"
// const url = "http://34.195.33.246/"

const urlNota = url + "api/Nota/";
const urlTipoEnt = url + "api/TipoEntregable/"
const urlEnt= url + "api/Entregable/";

function DatoSistEvaluacionV2()  {
    let navigate = useNavigate();
    let {id} = useParams();
    const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
    const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
    const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
    const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
    const [subTitulo,setSubtitulo] = useState("Registrar nota");

    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage,SetCurrentPage] = useState(0);
    const [edit, SetEdit] = useState(0);
    const [show, setShow] = useState(false);
    const [evaluacionesLista, setEvaluacionesLista] = useState([]);
    const [listaEvaluaciones, setListaEvaluaciones] = useState([]);
    const [listaEvaluacionesRegistradas, setListaEvaluacionesRegistradas] = useState([]);
    const [listEvaluacionesModal, setListEvaluacionesModal] = useState([]);
    const [listaEliminar, setListaEliminar] = useState([]);
    let filtrado=[];

    const [notaSeleccionada, setNotaSeleccionada] = useState({
      idNota: 0,
      codigo: '',
      nombre: '',
      peso: 1,
      fidTipoEntregable: 1,
      estado: 1,
      entregables: selectedRows,
    })

    const [evaluacion, setEvaluacion] = useState({
      idEntregable: 0,
      nombre: '',
      descripcion: '',
      fechaEntregaAsesor: new Date(),
      fechaLimite: new Date(),

      fechaPresentacionAlumno: new Date(),
      fidCurso: 0,
      tipoEntregable: '',
      fidNota: 0,
      fidTipoEntregable: 0,
      responsableSubir: '',
      responsableEvaluar: '',
    })

    //-----------------------------------------------------------------------------------------------------------------
    const handleChange=e=>{               // Control cambio en inputs de titulo--
      const {name, value}=e.target;
      setNotaSeleccionada(prevState=>({
          ...prevState,
          [name]: value
      }))
      console.log(notaSeleccionada);
    }

    filtrado = evaluacionesLista;
    filtrado = filtrado.slice(currentPage,currentPage+5);

    const peticionSelecter =()=>{         // Selección entre modificar o insertar
      if(id==='0'){
        //no permite registro de nota sin que se registre al menos una evaluacion
        if(evaluacionesLista.length == 0) return;
        openPostModal();
      }  
      else{
        listarEliminarRegistrar();
        openEditModal();
      }            
    }

    const cerrarPost=()=>{                // Cierra modal de registro
      closeGuardadoModal();   navigate("../sistEvaluacion");
    }

    const cerrarPut=()=>{                 // Cierra modal de modificación
      closeEditadoModal();    navigate("../sistEvaluacion");
    }

    const nextPage = () =>{               // Para paginar siguiente
      if(listaEvaluaciones.length>=currentPage) //VER CODIGO
        SetCurrentPage(currentPage+5);
    }
    
    const cargarNota=async()=>{           // Carga la nota si es para modificar
      if(id!=='0'){
        setSubtitulo("Modificar nota");
        const response = await axios.get(urlNota+"GetNotaXId?idNota="+parseInt(id));
        setNotaSeleccionada({
            idNota: response.data[0].idNota,
            codigo: response.data[0].codigo,
            nombre: response.data[0].nombre,
            estado: response.data[0].estado,
            fidTipoEntregable: response.data[0].fidTipoEntregable,
            peso: response.data[0].peso,
        });
      }
    }

    const previousPage =() =>{            // Para paginar anterior
        if(currentPage>0)
          SetCurrentPage(currentPage-5);
    }

    const quitaEvaluacion=(elemento)=>{   // Elimina elemento de la lista de 
      var indexmodal = listEvaluacionesModal.indexOf(elemento);
      if(indexmodal == -1){
          listEvaluacionesModal.push(elemento)
          listEvaluacionesModal.sort((a,b) => (a.idEntregable > b.idEntregable) ? 1 : ((b.idEntregable > a.idEntregable) ? -1 : 0) )
          if(elemento.fidNota > 0){
            evaluacionesLista.splice(evaluacionesLista.indexOf(elemento), 1)
          }
      }
      let hash = {};
      setListEvaluacionesModal(listEvaluacionesModal.filter(o => hash[o.idEntregable] ? false : hash[o.idEntregable] = true));
      var index = listaEvaluaciones.indexOf(elemento);
        listaEvaluaciones.splice(index,1);
        SetEdit(!edit);
    }

    const agregarDatos=(ev)=>{            // Agrega dato a la lista de evaluaciones
      console.log("agregar datos inicio",listEvaluacionesModal, ev)
      if(ev.idEntregable == 0) return;
      let variable  = false;
      let index = listEvaluacionesModal.indexOf(ev)
      console.log("index", index)
      //busca si ya está ingresado
      evaluacionesLista.forEach((element) =>{
        if(element.idEntregable === ev.idEntregable){
            variable = element.idEntregable === ev.idEntregable;
            console.log(variable);
        }
      })
      if(!variable){
        evaluacionesLista.push(ev);
        for(let i=0; i<listEvaluacionesModal.length; i++){
          if(listEvaluacionesModal[i].idEntregable == ev.idEntregable){
            console.log(listEvaluacionesModal, ev, i);
            listEvaluacionesModal.splice(i, 1)
          }
        }
      }       
      console.log("agregar datos fin",listEvaluacionesModal)
      setEvaluacion({
        idEntregable: 0,
        nombre: '',
        descripcion: '',
        fechaEntregaAsesor: new Date(),
        fechaLimite: new Date(),

        fechaPresentacionAlumno: new Date(),
        fidCurso: 0,
        tipoEntregable: '',
        fidNota: 0,
        fidTipoEntregable: 0,
        responsableSubir: '',
        responsableEvaluar: '',
      })
    }
    
    const peticionGetEntregablesModal = async() => {
      await axios.get(urlEnt + "ListEntregablesXIdCurso?idCurso=" +localStorage.getItem('idCurso'))       
      .then(response=>{
          console.log("SOY YO");
          console.log(response.data);
          const datos = response.data.filter(dato=> dato.fidNota === "null");
          //const datos = response.data;
          console.log(datos);
          setListEvaluacionesModal(datos);
      }).catch(error =>{
          console.log(error.message);
      })
    }
    
    //===============================================POST=======================================================================  
    const peticionPost=async()=>{         // Insertar nota
      carga();
      await axios.post(urlNota+"PostNota",notaSeleccionada)
        .then(response=>{
            closePostModal();
            openGuardadoModal();
        }).catch(error =>{
            console.log(error.message);
        })
    }

    const carga = async () => {
        evaluacionesLista.forEach(element => {
            notaSeleccionada.entregables.push({idEntregable : element.idEntregable})
        })
        setNotaSeleccionada(prevState=>({
            ...prevState,
            entregables: prevState.entregables,
        }))
    }

    //=================================================PUT======================================================================

    const peticionPut=async()=>{          // Modificar nota--
      for(let i=0; i<evaluacionesLista.length; i++){    //registras evaluaciones
        if(evaluacionesLista[i].fidNota === "null"){
          await axios.put(urlEnt + "InsertarNotaToEntregable?idNota=" + notaSeleccionada.idNota + "&idEntregable=" + evaluacionesLista[i].idEntregable)
          .then(response=>{
            
          }).catch(error =>{
              console.log(error.message);
          })
        }
      }
      for(let i=0; i<listEvaluacionesModal.length; i++){    //eliminas evaluaciones
        if(listEvaluacionesModal[i].fidNota > 0){
          await axios.put(urlEnt + "InsertarNotaToEntregable?idNota=0&idEntregable=" + listEvaluacionesModal[i].idEntregable)
          .then(response=>{
            
          }).catch(error =>{
              console.log(error.message);
          })
        }
      }
      await axios.put(urlNota+"ModifyNota", notaSeleccionada)
        .then(response=>{
            closeEditModal();
            openEditadoModal();
        }).catch(error =>{
            console.log(error.message);
        })
    }

    const peticionGetEvaluacionReg =async()=>{          // Modificar nota-- setListaEvaluacionesRegistradas
      if(id ==='0') return;
      await axios.get(urlEnt+"ListEntregablesXIdNota?idNota=" + parseInt(id))
        .then(response=>{
            console.log("evaluacion registrada", response.data)
            console.log("parseInt(id)", parseInt(id))
            setListaEvaluacionesRegistradas(response.data);
            setEvaluacionesLista(response.data);
        }).catch(error =>{
            console.log(error.message);
        })
    }

    const listarEliminarRegistrar =async()=>{          // Modificar nota-- setListaEvaluacionesRegistradas
      
    }
    //-----------------------------------------------------------------------------------------------------------------

    useEffect(()=>{
      cargarNota();           //Si es para modificar o registrar
      peticionGetEvaluacionReg();
      peticionGetEntregablesModal();   //Es para el modal
    },[])

    return(
        <div class=" CONTAINERALUMNO">   
            <h1>{subTitulo}</h1>

            <div class="row">
                <div class="col-4" >
                    <p>Código</p>
                    <input type="text"  class="form-control" name="codigo" placeholder="Código" aria-label="codigo"  
                            onChange={handleChange} value={notaSeleccionada.codigo}/>
                    <p>Peso</p>
                    <input type="number" min="1" class="form-control" name="peso" placeholder="Peso" aria-label="peso"  
                          onChange={handleChange} value={notaSeleccionada && notaSeleccionada.peso}/>
                </div>
                
                <div class="col-8 " >
                    <p>Nombre</p>
                        <textarea class="form-control" style={{height:"112px" }} name="nombre" placeholder="Nombre" aria-label="nombre"  
                            onChange={handleChange} value={notaSeleccionada && notaSeleccionada.nombre}/>
                </div>
            </div>

            <div class="row">
                    <p>Nombre de la evaluación seleccionada</p>
                    <div class = "row">
                        <div className = "col-11">
                            <input type='text'  className="form-control" id="nombreEvaluacion" name="nombreEvaluacion"  disabled
                             value={evaluacion && evaluacion.nombre}/>
                        </div> 
                        <div class="col-1">
                            <button title="Buscar evaluaciones del curso" type="button" onClick={() => {setShow(true)}} class=" btn BOTON-ICON" >
                                <RiIcons.RiSearch2Line />
                            </button>
                        </div>
                    </div>
                    <div>
                        {<ModalBuscarEvaluacion   show={show} setShow={setShow} listEvaluacionesModal={listEvaluacionesModal}
                                                  evaluacion={evaluacion} setEvaluacion={setEvaluacion}
                                                  listaEvaluaciones = {listaEvaluaciones}  
                        />}
                    </div>  
                    <div class="row ">                            
                        <div class="INSERTAR-BOTONES" >
                            <button title="Añadir evaluación" class="btn AÑADIR" type="button" onClick={()=>agregarDatos(evaluacion)}  ><span>Añadir</span></button>
                        </div>
                    </div>   
                </div>

            <h2 >Evaluaciones</h2>
            <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
            <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
            <div class = "row LISTAR-TABLA-EV">
              <div class=" col-12  ">
                <table className='table fs-6 '>
                  <thead class >
                    <tr class>
                        <th style = {{width:50}} >ID</th>
                        <th style = {{width:250}} >Nombre</th>
                        <th style = {{width:200}} >Tipo Entregable</th>
                        <th style = {{width:100}} >Fecha Límite</th>
                        <th style = {{width:50}} >Acciones</th>
                    </tr>
                  </thead>
                  <tbody >
                    {filtrado.map(elemento => (
                      <tr key={elemento.idEntregable}>   
                          <td style ={{width: 50}}>{elemento.idEntregable}</td> 
                          <td style ={{width: 200}}>{elemento.nombre}</td>      
                          <td style ={{width: 200}}>{elemento.tipoEntregable}</td>
                          <td style ={{width: 100, alignSelf: "start"}}>{elemento.fechaLimite==="null" ? "No tiene" : elemento.fechaLimite.substr(0,10)}</td> 
                          <td style ={{width: 50}}>
                            <button title="Eliminar evaluación" class=" btn BTN-ACCIONES" onClick={()=>quitaEvaluacion(elemento)}> <BootIcons.BsTrash /></button>
                          </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>


            <div class="row ">                            
                <div class="INSERTAR-BOTONES ">
                    <button title="Guardar evaluación" class="btn  GUARDAR" type="button" onClick={()=>peticionSelecter()} ><span>Guardar</span></button>
                    <button title="Cancelar " class="btn CANCELAR" type="button" onClick={()=>{navigate("../sistEvaluacion")}}><span>Cancelar</span></button>
                </div>
            </div>

            <ModalPregunta      isOpen={isOpenPostModal}        closeModal={closePostModal}         procedimiento = "guardar"   
                                objeto = "la nota"              elemento = {notaSeleccionada && notaSeleccionada.codigo}        >
                    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                            <Button class="btn  btn-success btn-lg" onClick = { ()=> peticionPost() } >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button class="btn btn-danger btn-lg"   onClick = {closePostModal}>Cancelar</Button>
                    </div>
            </ModalPregunta>

            <ModalConfirmación  isOpen={isOpenGuardadoModal}    closeModal={closeGuardadoModal}     procedimiento = "guardado"  >
                    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                            <Button class="btn btn-success btn-lg" onClick = { ()=> cerrarPost() }>Entendido</Button>
                    </div>
            </ModalConfirmación>

            <ModalPregunta      isOpen={isOpenEditModal}        closeModal={closeEditModal}         procedimiento = "modificar"     
                                objeto = "la nota"              elemento = {notaSeleccionada && notaSeleccionada.codigo}        >
                    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                            <Button class="btn  btn-success btn-lg" onClick = { ()=> peticionPut() } >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Button class="btn btn-danger btn-lg"  onClick = {closeEditModal}>Cancelar</Button>
                    </div>
            </ModalPregunta>

            <ModalConfirmación  isOpen={isOpenEditadoModal}     closeModal={closeEditadoModal}      procedimiento = "modificado">
                    <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                            <Button class="btn btn-success btn-lg" onClick = { ()=> cerrarPut() }>Entendido</Button>
                    </div>
            </ModalConfirmación>

        </div> 
    )
}

export default DatoSistEvaluacionV2;