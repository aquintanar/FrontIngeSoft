import React from 'react'
import {useState , useEffect} from "react";
import useModal from '../../../hooks/useModals';
import {  Button} from '@material-ui/core';
import {  useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../../stylesheets/Alumno.css'
import '../../../stylesheets/Comite.css'
import "../../../stylesheets/General.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as AntIcons from "react-icons/ai";
import {ModalConfirmación, ModalPregunta} from '../../../components/Modals';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const url = "http://34.195.33.246/"
// const url = "http://34.195.33.246/"

const urlArea= url + "api/Area/";

function ListaAreas()  {

    let navigate = useNavigate();
    const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
    const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();
    const esCoord = window.localStorage.getItem("ESCOORDINADOR");
    const infoEspecialidad = JSON.parse(localStorage.getItem('infoEspecialidad'))
    const [areas, setAreas] = useState ([]);
    const [search, setSearch] = useState("");
    const [idesp,SetIDEsp]=useState(0);
    const [idfac,SetIDFac]=useState(0);
    const [infoCurso,setInfoCurso] = useState({
        idEspec:0,
        idFac:0
    })
   
    const [areaSeleccionada, setAreaSeleccionada]=useState({
        idArea: 0,
        idEspecialidad:0,
        nombre: '',
    })

    const seleccionarArea=(not, a)=>{
        areaSeleccionada.idArea = not.idArea;
        areaSeleccionada.nombre = not.nombre;
        openDeleteModal();
    }

    const buscador = e=>{                           //Controla buscador--
        setSearch(e.target.value);
    }

    let filtrado =[];
    if(!search){//sin filtro
        filtrado=areas;
    }
    else{
        if(search)
            filtrado=areas.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
    }

    const peticionDelete=async()=>{                 //Eliminar una nota? de un curso--
        await axios.delete(urlArea+"DeleteArea?idArea=" + areaSeleccionada.idArea
        ).then(response=>{
            closeDeleteModal();
            peticionGetAreas();
            openConfirmModal();
        })
    }

    const peticionGetAreas=async()=>{               //Listar notas de un curso 
        let ides = JSON.parse(window.localStorage.getItem("infoCurso"))
        await axios.get(urlArea+ "GetAreaXEspecialidad?idEspecialidad="+ides.idEspec)       
        .then(response=>{
            console.log("LAS ESPECIALIDADES");
            console.log(response.data);
            setAreas(response.data)
        }).catch(error =>{
            console.log(error.message);
        })
    }
    const peticionGetInfo=async()=>{
        let idcur = window.localStorage.getItem("idCurso");
        let response=await axios.get("http://34.195.33.246/api/Curso/BuscarCursoXId?idCurso="+idcur)
        .then((response)=>{
            console.log("ESTE ES EL CURSO");
            infoCurso.idEspec = response.data[0].idEspecialidad;
            infoCurso.idFac = response.data[0].idFacultad;
            window.localStorage.setItem("infoCurso",JSON.stringify(infoCurso));
            areaSeleccionada.idEspecialidad=response.data[0].idEspecialidad;
            peticionGetAreas();
        }).catch(()=>{

        })
    }
    useEffect(()=>{
        console.log(infoEspecialidad)
        peticionGetInfo();
    },[])
    const notify=()=>{
        toast.warn("Solo el coordinador puede acceder a esta funcionalidad");
    }
    const revisarCoordinador=()=>{
        let escoordinador = window.localStorage.getItem("ESCOORDINADOR");
        if(escoordinador=="SI"){
            navigate("datoArea/0")
        }
        else{
            notify();
        }
    }
    return (
        <div class=" CONTAINERADMIN" style={{}} >
             <h1>Gestión de Áreas</h1>

                <div class="row">
                    <div class="col-6" >
                        <p>Ingresar nombre del área</p>
                        <div class="input-group  ">
                            <input type="search" value={search} class="form-control icon-search" size="5" name="search" placeholder="Nombre del área" aria-label="serach" onChange={buscador}/>
                        </div>
                    </div>
                </div>
                
                {filtrado.map(not => (
                <tr key={not.idArea}>
                    <td><p class="BTN-CUADRADO-SISTEV">
                        <td title= {not.codigo} style ={{width: 50, paddingLeft: '0.2%', paddingRight: '2%'}}>{not.codigo}</td>
                        <td title= {not.nombre} style ={{width: 500, paddingLeft: '0.5%', paddingRight: '5%'}}>{not.nombre}</td>
                        
                            {esCoord === "NO" ? null : 
                                <td class = "text-center" style ={{width: 80}}>
                                    <button title="Editar área"  class="btn BTN-ACCIONES" onClick={()=>{navigate("datoArea/" + not.idArea)}}> <FaIcons.FaEdit/></button>
                                    <button title="Eliminar área" class=" btn BTN-ACCIONES" onClick={()=>seleccionarArea(not, 'Eliminar')}> <BootIcons.BsTrash/></button>   
                                </td>
                            }
                            
                    </p></td>                    
                </tr>
                ))}

            {esCoord === "NO" ? null : 
                <div className='INSERTAR-BOTONES '>
                    <button title="Registrar área" className='btn REGISTRAR' onClick={()=>{ revisarCoordinador()}} ><span>Registrar</span></button>
                </div>
            }

             
            <ToastContainer/>
            <ModalPregunta      isOpen={isOpenDeleteModal}      closeModal={closeDeleteModal}   procedimiento = "eliminar"  
                                objeto = "el área"              elemento = {areaSeleccionada && areaSeleccionada.nombre}        >
                <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                    <Button class="btn  btn-success btn-lg" onClick={()=>peticionDelete()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button class="btn btn-danger btn-lg"  onClick={closeDeleteModal}>Cancelar</Button>
                </div>
            </ModalPregunta>

            <ModalConfirmación  isOpen={isOpenConfirmModal}     closeModal={closeConfirmModal}  procedimiento = "eliminado"     >
                <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                    <Button class="btn btn-success btn-lg" onClick={closeConfirmModal}>Entendido</Button>
                </div>
            </ModalConfirmación>
        </div>
    )
}

export default ListaAreas
