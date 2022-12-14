import {useState , useEffect} from "react";
import React from 'react'
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import '../../stylesheets/Administrador.css'
import '../../stylesheets/General.css'
import '../../stylesheets/Calendar.css'
import '../../stylesheets/DatePicker.css';
import useModal from '../../hooks/useModals';
import DatePicker from "react-date-picker";
import { useNavigate, useParams } from 'react-router-dom';
import {ModalPregunta, ModalConfirmación , ModalInsertar} from '../../components/Modals';
import axios from 'axios';
import {  Button} from '@material-ui/core';
import { isCursorAtStart } from "@testing-library/user-event/dist/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url1= "http://34.195.33.246/api/Entregable/";
const urlCurso = "http://34.195.33.246/api/Curso/"
const urlEncuesta = "http://34.195.33.246/api/Encuesta/"
const AddEncuesta = () => {
    const [encuestaSeleccionada, setEncuestaSeleccionada]=useState({
        idEncuesta: 0 , 
        fidCurso: 1, 
        nombre: '' , 
    })
    const [data, setData]=useState([]);
    const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
    const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
    const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
    const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();    
    const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
    const [currentPage,SetCurrentPage] = useState(0);
    const [fil , SetFil] = useState(0);
    const [cursos,SetCursos] = useState([]);
    const [encuestas , SetEncuestas] = useState([]);


    let filtrado =[];
    let navigate = useNavigate();
    let {id} = useParams();
    filtrado = filtrado.slice(currentPage,currentPage+5);
    const nextPage = () =>{
        //if(filtrado.length>=currentPage) //VER CODIGO
        SetCurrentPage(currentPage+5);
    }
    const previousPage =() =>{
        //if(currentPage>0)
        SetCurrentPage(currentPage-5);
    }

    const handleChange=e=>{
        const {name, value}=e.target;
        setEncuestaSeleccionada(prevState=>({
          ...prevState,
          [name]: value
        }))
        console.log(encuestaSeleccionada);
      }

    const peticionGetEncuesta = async()=>{
        let idcur = window.localStorage.getItem("idCurso");
        await axios.get("http://34.195.33.246/api/Encuesta/BuscarEncuestaXIdCurso?idCurso="+idcur)
        .then(response => {
            setData(response.data);
        }).catch(error => {
            console.log(error.message);
        })
    }

    const petitionCursos = async()=>{
        let idcur = window.localStorage.getItem("idCurso");
        const response=await axios.get("http://34.195.33.246/api/Curso/BuscarCursoXId?idCurso="+ idcur)
        .then((response)=>{
            SetCursos(response.data);
        }).catch(()=>{

        })
        
        /*


        await axios.get(urlCurso+"GetCursos")
        .then(response=>{
            SetCursos(response.data);
        }).catch(error =>{
        console.log(error.message);
        })*/
    }
    const notify = () => {
        toast.warn("Solo se puede tener una encuesta a la vez.");
      };
    const petitionEncuesta = async()=> {
        let idcur = window.localStorage.getItem("idCurso");
        await axios.get("http://34.195.33.246/api/Encuesta/BuscarEncuestaXIdCurso?idCurso="+idcur)
        .then(response => {
            SetEncuestas(response.data);
        }).catch(error => {
            console.log(error.message);
        })

        /*
        await axios.get(urlEncuesta+"LeerEncuestas")
        .then(response=>{
            SetEncuestas(response.data);
        }).catch(error => {
            console.log(error.message);
        })*/
    }

    const peticionSelecter=()=>{
        console.log('peticionSelecterFuncionaaaaaaaaaaaaaaaaa')
        openPostModal()
    }
    const peticionPost=async()=>{
        console.log(encuestaSeleccionada);
        encuestaSeleccionada.fidCurso=window.localStorage.getItem("idCurso");
        await axios.post(urlEncuesta+"InsertarEncuesta",encuestaSeleccionada,{
            _method: 'POST'
          })
        .then(response=>{
          closePostModal();
          openGuardadoModal();
          navigate(-1);
        }).catch(error =>{
          console.log(error.message);
        })
      }
      const buscarEncuestaxCurso = async()=>{
        let idcur = window.localStorage.getItem("idCurso");
        await axios.get("http://34.195.33.246/api/Encuesta/BuscarEncuestaXIdCurso?idCurso="+idcur)
        .then((response)=>{
            console.log(response.data);
            console.log(Object.keys(response.data).length)
            if(Object.keys(response.data).length==1){
                notify();
            }
            else{
                openPostModal()
            }
        }).catch(()=>{

        })
      }
    const cambioSelect = e =>{
        setEncuestaSeleccionada(prevState=>({
            ...prevState, 
            fidCurso: e.target.value
        }))
        console.log(encuestaSeleccionada)
        //SetFil(valor)
    }


    useEffect(()=>{
        petitionCursos();
        petitionEncuesta();
        console.log("USSE EFFECETT")
        console.log(encuestas);
     },[])

     filtrado = encuestas ;
    function seleccionarEncuesta(e){
        deleteEncuesta(e);
    }
    const deleteEncuesta = async(e)=>{
        axios.delete("http://34.195.33.246/api/Encuesta/EliminarEncuesta?idEncuesta="+e)
        .then(()=>{

        }).catch(()=>{
            
        })
        window.location.reload(false);
    }
    return(
             
        <div class ="CONTAINERADMIN ">
            <h1 >Encuesta de satisfacción</h1>
            <h2 >Registrar encuesta</h2>
            <div class="row " >
                <div className = " col-md-8 mb-3">
                    <p>Nombre de la encuesta:</p>
                    <input  type='search' className="form-control icon-search" id="nombre" name="nombre" placeholder="Nombre de la Encuesta"
                    onChange={handleChange}/>
                </div>
                <div class="col-lg-4 " >
                    <div class=" fs-5 fw-normal  mb-1 "><p>Seleccione el Curso</p></div>
                    <select select class="form-select" aria-label="Default select example" onChange={cambioSelect}>
                        
                        <option selected value = "0">Cursos disponibles</option>
                        {cursos.map(elemento =>(
                            <option key = {elemento.idCurso} value = {elemento.idCurso}>{elemento.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div class="row">                            
                <div class="INSERTAR-BOTONES">
                    <button class="btn AÑADIR" title="Añadir encuesta" type="button" onClick={()=>buscarEncuestaxCurso()}><span>Añadir</span></button>
                </div>
            </div>   
            <h2  >Lista de encuestas</h2>
            <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
            <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
            <div class = "row LISTAR-TABLA">
                <div class=" col-12 ">
                <table className='table fs-6 '>
                    <thead class >
                    <tr class>
                        <th style ={{width: 10}}>ID encuesta</th>
                        <th style = {{width:180}}>Nombre de la encuesta</th>
                        <th style = {{width:20}}>Acciones</th>
                    </tr>
                    </thead>
                    <tbody >
                    {filtrado.map(encuestas => (
                        <tr key={encuestas.idEncuesta}>
                            <td >{encuestas.idEncuesta}</td>                   
                            <td>{encuestas.nombre}</td>
                            <td>
                            <button class="btn BTN-ACCIONES" title="Modificar encuesta" onClick={()=>{navigate("lista/"+encuestas.idEncuesta)}}> <FaIcons.FaEdit /></button>
                            <button  class=" btn BTN-ACCIONES" title="Eliminar encuesta" onClick={()=>{seleccionarEncuesta(encuestas.idEncuesta)}}> <BootIcons.BsTrash /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>
            <ToastContainer/>
            
            <ModalInsertar
            isOpen={isOpenPostModal} 
            closeModal={closePostModal}
            procedimiento = "insertar "
            objeto="encuesta"
            elemento={encuestaSeleccionada && encuestaSeleccionada.nombre}
          >
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <Button class="btn  btn-success btn-lg" onClick = {()=>peticionPost()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button class="btn btn-danger btn-lg"  onClick={closePostModal}>Cancelar</Button>
            </div>
          </ModalInsertar>
    
          <ModalConfirmación
            isOpen={isOpenConfirmModal} 
            closeModal={closeConfirmModal}
            procedimiento= "eliminado"
          >
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <Button class="btn btn-success btn-lg" onClick={closeConfirmModal}>Entendido</Button>
            </div>
          </ModalConfirmación>
        </div>
    );    
}
export default AddEncuesta;