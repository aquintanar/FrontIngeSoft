import React from 'react'
import {useState , useEffect} from "react";
import useModal from '../../../hooks/useModals';
import {  Button} from '@material-ui/core';
import {  useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../../stylesheets/Alumno.css'
import '../../../stylesheets/Comite.css'
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
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
             <p class="HEADER-TEXT1">Gestión de Áreas</p>
                
                {areas.map(not => (
                <tr key={not.idArea}>
                    <td><p class="BTN-CUADRADO-SISTEV">
                        <td title= {not.idArea} style ={{width: 50, paddingLeft: '0.5%', paddingRight: '2%'}}>{not.idArea}</td>
                        <td title= {not.codigo} style ={{width: 50, paddingLeft: '0.5%', paddingRight: '2%'}}>{not.codigo}</td>
                        <td title= {not.nombre} style ={{width: 500, paddingLeft: '0.5%', paddingRight: '5%'}}>{not.nombre}</td>
                        <td class = "text-center" style ={{width: 80}}>
                            <button title="Editar área" class="btn BTN-ACCIONES" onClick={()=>{navigate("datoArea/" + not.idArea)}}> <FaIcons.FaEdit/></button>
                            <button title="Eliminar área" class=" btn BTN-ACCIONES" onClick={()=>seleccionarArea(not, 'Eliminar')}> <BootIcons.BsTrash/></button>   
                        </td>
                    </p></td>                    
                </tr>
                ))}

            <div className='LISTAR-ESPECIALIDADES-BOTON'>
                <button className='btn btn-primary fs-4 fw-bold mb-3' onClick={()=>{ navigate("datoArea/0")}} ><span>Registrar</span></button>
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