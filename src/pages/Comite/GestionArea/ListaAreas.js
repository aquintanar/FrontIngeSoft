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

const url = "https://localhost:7012/"
// const url = "http://34.195.33.246/"

const urlArea= url + "api/Area/";

function ListaAreas()  {

    let navigate = useNavigate();
    const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
    const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();
    const infoEspecialidad = JSON.parse(localStorage.getItem('infoEspecialidad'))
    const [areas, setAreas] = useState ([]);
    const [search, setSearch] = useState("");

    const [areaSeleccionada, setAreaSeleccionada]=useState({
        idArea: 0,
        idEspecialidad: infoEspecialidad.numEsp,
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
        await axios.get(urlArea+ "GetAreaXEspecialidad?idEspecialidad="+infoEspecialidad.numEsp)       
        .then(response=>{
            setAreas(response.data)
        }).catch(error =>{
            console.log(error.message);
        })
    }

    useEffect(()=>{
        console.log(infoEspecialidad)
        peticionGetAreas(); 
    },[])

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
                        <td title= {not.idArea} style ={{width: 50, paddingLeft: '0.5%', paddingRight: '2%'}}>{not.idArea}</td>
                        <td title= {not.codigo} style ={{width: 50, paddingLeft: '0.5%', paddingRight: '2%'}}>{not.codigo}</td>
                        <td title= {not.nombre} style ={{width: 500, paddingLeft: '0.5%', paddingRight: '5%'}}>{not.nombre}</td>
                        <td class = "text-center" style ={{width: 80}}>
                            <button title="Editar área"  class="btn BTN-ACCIONES" onClick={()=>{navigate("datoArea/" + not.idArea)}}> <FaIcons.FaEdit/></button>
                            <button title="Eliminar área" class=" btn BTN-ACCIONES" onClick={()=>seleccionarArea(not, 'Eliminar')}> <BootIcons.BsTrash/></button>   
                        </td>
                    </p></td>                    
                </tr>
                ))}

            <div className='d-grid gap-2 d-md-flex justify-content-md-end INSERTAR-BOTONES '>
                <button title="Registrar área" className='btn btn-primary fs-4 fw-bold mb-3 REGISTRAR' onClick={()=>{ navigate("datoArea/0")}} ><span>Registrar</span></button>
            </div> 

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