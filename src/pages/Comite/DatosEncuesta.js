import React, { useState , useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../stylesheets/Administrador.css';
import '../../stylesheets/General.css'
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as BsIcons from 'react-icons/bs';
import { useNavigate,useParams } from 'react-router-dom';
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import {ModalConfirmación, ModalPregunta , ModalInsertar} from '../../components/Modals';
import { Comparator } from 'react-bootstrap-table2-filter';

const url2= "https://localhost:7012/api/DetalleRubrica/";
const url1= "https://localhost:7012/api/Entregable/";
const urlPregunta= "https://localhost:7012/api/PreguntaEncuesta/";

//const url2= "http://44.210.195.91/api/DetalleRubrica/";
//const url1= "https://44.210.195.91/api/Entregable/";

function DatosEncuesta({entregable, setEntregable, rubricas, SetRubricas,id,rubs,curso,setCurso})  {

    let navigate = useNavigate();
    const [currentPage,SetCurrentPage] = useState(0);
    const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
    const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
    const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
    const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
    const [edit, SetEdit] = useState(0);
    const [encuestaSeleccionada , setEncuestaSeleccionada] = useState({
        idPreguntaEncuesta: 0,
        fidEncuesta: 0,
        pregunta: '',

    })
    const [preguntas, setPreguntas] = useState([]);
    let confirm = 0;
    let long = 0;
    let vari = 0;

    const [rubricaSeleccionada, setRubricaSeleccionada]=useState({
        rubro: '',
        nivelDeseado: '',
        puntajeMaximo: 0,
        fidRubrica: 0
    })  

    const handleChange=e=>{
        const {name, value}=e.target;
        setEncuestaSeleccionada(prevState=>({
          ...prevState,
          fidEncuesta: id,
          pregunta: value 
        }))
        console.log(encuestaSeleccionada);
    }


    const nextPage = () =>{
        if(rubricas.length>=currentPage) //VER CODIGO
        SetCurrentPage(currentPage+5);
    }
    const previousPage =() =>{
        if(currentPage>0)
        SetCurrentPage(currentPage-5);
    }

    const agregaDatos=()=>{
        rubricas.push(rubricaSeleccionada);
        setRubricaSeleccionada({
            rubro: '',
            nivelDeseado: '',
            puntajeMaximo: 0,
            fidRubrica: 0
        })
        console.log(rubricas);
    }

    const quitaRubro=(elemento)=>{
        var index = rubricas.indexOf(elemento);
        rubricas.splice(index,1);
        SetEdit(!edit);
    }

    const peticionPost=async(element)=>{
        await axios.post(url2+"PostDetalleRubrica",element,{
            _method: 'POST'
          })
        .then(response=>{
            confirm = confirm+1;
            console.log(long," no es ",confirm);
            if(long===confirm){
                closePostModal();
                openGuardadoModal();
            }
        }).catch(error =>{
            console.log(error.message);
        })
    }
    
    const verificaTipo =()=>{
        if(entregable.fidTipoEntregable ===1 && (entregable.fechaEntregaAsesor === null 
            || entregable.fechaEntregaAsesor===0)){
            entregable.fechaEntregaAsesor = new Date();
            entregable.responsableSubir = 1;
            peticionPostEntregable2();
        }
        else{
            peticionPostEntregable();
        }
    }

    const peticionPostEntregable=async()=>{
        await axios.post(url1+"PostEntregableConRubrica?linkDoc=jjjj",entregable,{
            _method: 'POST'
          })
        .then(response=>{
            entregable.idEntregable = response.data.idRubrica;
            console.log("entregable Listo")
            guarda();
        }).catch(error =>{
            console.log(error.message);
        })  
    }

    const peticionSelecter =()=>{
        openPostModal();
    }

    const peticionPutEntregable=async()=>{
        await axios.put(url1+"PutEntregable",entregable)
        .then(response=>{
            console.log(entregable);
            editaRubricas();
        }).catch(error =>{
            console.log(error.message);
        })  
    }

    const peticionDeleteRubs=async(element)=>{
        await axios.delete(url1+ "DeleteDetalleRubrica?idDetalleRubrica="+element).
        then(response=>{
            console.log("eliminando");
            console.log(element);
      })
    }

    const editaRubricas =()=>{
        console.log(rubs);
        console.log(rubricas);
        if(rubricas.length === rubs.length){
            for(var i=0;i<rubricas.length;i++)
            {
                if(rubs.includes(rubricas[0])){
                    vari = 1;
                }
                else{
                    vari =0;
                    break;
                }
            }
        }
        else {
            vari = 0;
        }
        if(vari===1){      
            closeEditModal();
            openEditadoModal();
        }
        else{
            console.log("editando con rubrica");
            console.log(rubs);
            rubs.forEach(async element => {
                await peticionDeleteRubs(element.idDetalleRubrica);
            });
            rubricas.forEach(async element => {
                element.fidRubrica = entregable.idEntregable;
                await peticionPost(element);
            });
        }
    }    

    const compara =()=>{
        if(rubricas.length === rubs.length){
            for(var i=0;i<rubricas.length;i++)
            {
                if(rubs.includes(rubricas[0])){
                    vari = 1;
                }
                else{
                    vari =0;
                    break;
                }
            }
        }
        else {
            vari = 0;
        }
    }    
  

    const peticionPostEntregable2=async()=>{
        await axios.post(url1+"PostEntregableConRubricaMarcel?linkDoc=jjjj",entregable,{
            _method: 'POST'
          })
        .then(response=>{
            entregable.idEntregable = response.data.idRubrica;
            console.log("entregable Listo")
            guarda();
        }).catch(error =>{
            console.log(error.message);
        })  
    }
    const peticionDeletePregunta=async(id)=>{
        await axios.delete(urlPregunta+"EliminarPreguntaEncuesta?idPreguntaEncuesta="+id)
        .then(response=>{
            console.log(response)
            console.log("SE HA ELIMINADO CORRECTAMENTE")
        }).catch(error =>{
        console.log(error.message);
        })
    }


    const guarda=()=>{
        long = rubricas.length;
        if(long===0){
            closePostModal();
            openGuardadoModal();
        }
        else{
            rubricas.forEach(async element => {
                element.fidRubrica = entregable.idEntregable;
                await peticionPost(element);
            });
        }
    }

    const terminar=()=>{
        closeGuardadoModal();
        navigate("../preparacion/entregables");
    }

    const cargaRub =(elemento)=>{
        setRubricaSeleccionada({
            rubro: elemento.rubro,
            nivelDeseado: elemento.nivelDeseado,
            puntajeMaximo: elemento.puntajeMaximo,
            fidRubrica: elemento.fidRubrica,
        })
        var index = rubricas.indexOf(elemento);
        rubricas.splice(index,1);
    }

    const peticionPostPregunta = async()=>{
        console.log(encuestaSeleccionada)
        await axios.post(urlPregunta+"InsertarPreguntaEncuesta",encuestaSeleccionada,{
            _method: 'POST'
          })
        .then(response=>{
          closePostModal();
          openGuardadoModal();
          window.location.reload(false);
          console.log(response)
        }).catch(error =>{
          console.log(error.message);
        })
      }
    
      const peticionPreguntas =async()=>{
        console.log("PETICION DE PREGUNTAS")
        await axios.get(urlPregunta+"BuscarPreguntaEncuestaXIdEncuesta?idEncuesta="+id)
        .then(response=>{
            setPreguntas(response.data);
            console.log(preguntas)
        }).catch(error =>{
        console.log(error.message);
        })
      }
    useEffect(()=>{
        peticionPreguntas();
        console.log("SOY EL ENTREGABLE");
        console.log(entregable);
     },[]) 

    
    return (      
        <div class ="CONTAINERADMIN " >   
    
        <h1 class=" mb-5">Datos Encuesta</h1>


        <div class=" row" >
            <div class="col-2">
                <p>Encuesta</p>
            </div>
            <div class="col">
                <div class="mb-3">
                    <input type="text" disabled class="form-control" name="entregable" placeholder="Nombre Encuesta" value={entregable.nombre}/>
                </div>
            </div>
        </div>

        <div class=" row" >
            <div class="col-2">
                <p>Curso</p>
            </div>
            <div class="col">
                <div class="mb-3 ">
                    <input type="text" disabled class="form-control" name="rubro" placeholder="Curso" value={curso.nombre} />
                </div>
            </div>
        </div>

        <div class=" row" >
            <div class="col-2">
                <p>Pregunta</p>
            </div>
            <div class="col">
                <div class="mb-3 ">
                    <input type="text" class="form-control" name="pregunta" id = 'pregunta' placeholder="Pregunta de la encuesta" 
                          onChange={handleChange} />
                </div>
            </div>
        </div>

        <div class="row ">                            
                <div class="INSERTAR-BOTONES">
                    <button class="btn AÑADIR" type="button" onClick={()=>peticionSelecter()}><span>Añadir</span></button>
                </div>
        </div>   
  
          <h2 class=" mt-3" >Preguntas</h2>
          <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
          <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
          <div class = "row LISTAR-TABLA-EV">
            <div class=" col-12  ">
              <table className='table fs-6 '>
                <thead class >
                  <tr class>
                      <th style ={{width: 100}}>Numero</th>
                      <th style = {{width:300}} >Pregunta</th>
                      <th style = {{width:50}} >Acciones</th>
                  </tr>
                </thead>
                <tbody >
                  {preguntas.map(elemento => (
                    <tr key={elemento.idPreguntaEncuesta}>
                        <td >{elemento.idPreguntaEncuesta}</td>    
                        <td >{elemento.pregunta}</td>       
                        <td>
                        <button  class="btn BTN-ACCIONES" title="Eliminar" onClick={()=>peticionDeletePregunta(elemento.idPreguntaEncuesta)}> <BootIcons.BsTrash /></button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ModalPregunta
              isOpen={isOpenEditModal} 
              closeModal={closeEditModal}
              procedimiento = "modificar"
              objeto="la evaluación"
              elemento={entregable && entregable.nombre}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionPutEntregable()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeEditModal}>Cancelar</Button>
              </div>
            </ModalPregunta>             

          <ModalConfirmación
              isOpen={isOpenEditadoModal} 
              closeModal={closeEditadoModal}
              procedimiento= "modificado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={terminar}>Entendido</Button>
              </div>
            </ModalConfirmación>

          <ModalInsertar
              isOpen={isOpenPostModal} 
              closeModal={closePostModal}
              procedimiento = "añadir"
              objeto="pregunta"
              elemento={entregable && entregable.nombre}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionPostPregunta()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closePostModal}>Cancelar</Button>
              </div>
            </ModalInsertar>
            <ModalConfirmación
              isOpen={isOpenGuardadoModal} 
              closeModal={closeGuardadoModal}
              procedimiento= "guardado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={closeGuardadoModal}>Entendido</Button>
              </div>
            </ModalConfirmación>
                   
        </div>              
    )
}
export default DatosEncuesta;