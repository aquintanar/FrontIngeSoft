import {useState , useEffect} from "react";
import React from 'react'
import * as BsIcons from 'react-icons/bs';
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import '../../stylesheets/Administrador.css'
import '../../stylesheets/Calendar.css'
import '../../stylesheets/DatePicker.css';
import useModal from '../../hooks/useModals';
import DatePicker from "react-date-picker";
import { useNavigate } from 'react-router-dom';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import axios from 'axios';
import {  Button} from '@material-ui/core';

const url1= "https://localhost:7012/api/Entregable/";

const AddEncuesta = () => {
    const [entregableSeleccionado, setEntregableSeleccionado]=useState({
        idEntregable: 0,
        nombre: '',
        descripcion: '',
        fechaEntregaAsesor: null,
        fechaLimite: null,
        fechaPresentacionAlumno: null,
        tipoEntregable: 0,
        responsableSubir: 0,
        responsableEvaluar: 0
    })
    const [data, setData]=useState([]);
    const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
    const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();    
    const [currentPage,SetCurrentPage] = useState(0);
    let filtrado =[];
    let navigate = useNavigate();
    
    filtrado = filtrado.slice(currentPage,currentPage+5);
    const nextPage = () =>{
        //if(filtrado.length>=currentPage) //VER CODIGO
        SetCurrentPage(currentPage+5);
    }
    const previousPage =() =>{
        //if(currentPage>0)
        SetCurrentPage(currentPage-5);
    }

    const seleccionarEntregable=(entregable)=>{
        setEntregableSeleccionado(entregable);
        openDeleteModal();
    }

    const peticionDelete=async()=>{
        await axios.delete(url1+ "DeleteEntregable?idEntregable="+entregableSeleccionado.idEntregable).
        then(response=>{
          setData(data.filter(entregable=>entregable.idEntregable!==entregableSeleccionado.idEntregable));
          closeDeleteModal();
          openConfirmModal();
        })
      }


    return(
             
        <div class ="CONTAINERADMIN ">
            <p class="HEADER-TEXT1 mb-4">Encuesta de satisfacción</p>
            <p class="HEADER-TEXT2 mt-5" >Registrar encuesta</p>
            <div class="row DATOS" >
                <p>Nombre de la encuesta:</p>
                <div className = " input-group col-md-12 mb-3">
                    <input  type='text' className="form-control" id="nombreEncuesta" name="nombreEncuesta" placeholder="Nombre de la Encuesta" />
                </div>
                <div class="col-lg-3 FILTRO-LISTAR" >
                    <div class=" fs-5 fw-normal  mb-1 "><p>Seleccione un horario</p></div>
                    <select select class="form-select Cursor" aria-label="Default select example">
                        <option key="0" selected value = "0">Horarios disponibles</option>
                        <option key="1" value="1">H-991</option>
                        <option key="2" value="2">H-992</option>
                        <option key="3" value="3">H-993</option>
                        <option key="4" value="4">H-994</option>
                    </select>
                </div>
            </div>
            <p class="HEADER-TEXT2 mt-5" >Lista de encuestas</p>
            <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
            <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
            <div class = "row LISTAR-TABLA">
                <div class=" col-12 ">
                <table className='table fs-6 '>
                    <thead class >
                    <tr class>
                        <th style ={{width: 20}}>Numero</th>
                        <th style = {{width:100}}>Nombre de la encuesta</th>
                        <th style = {{width:100}}>Acciones</th>
                    </tr>
                    </thead>
                    <tbody >
                    {filtrado.map(entregable => (
                        <tr key={entregable.idEntregable}>
                            <td >{entregable.nombre}</td>                   
                            <td>{entregable.fechaLimite.substr(0,10)}</td>
                            <td>
                            <button class="btn BTN-ACCIONES" onClick={()=>{navigate("lista/"+entregable.idEntregable)}}> <FaIcons.FaEdit /></button>
                            <button  class=" btn BTN-ACCIONES" onClick={()=>seleccionarEntregable(entregable)}> <BootIcons.BsTrash /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            </div>


            <div class="row INSERTAR-BOTONES">                            
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-primary fs-4 fw-bold   CANCELAR" type="button" ><span>Cancelar</span></button>
                    <button class="btn btn-primary fs-4 fw-bold SIGUIENTE" type="button"><span>Siguiente</span></button>
                </div>
            </div>

            
            <ModalPregunta
            isOpen={isOpenDeleteModal} 
            closeModal={closeDeleteModal}
            procedimiento = "eliminar"
            objeto="el entregable"
            elemento={entregableSeleccionado && entregableSeleccionado.nombre}
          >
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
              <Button class="btn  btn-success btn-lg" onClick={()=>peticionDelete()}  >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button class="btn btn-danger btn-lg"  onClick={closeDeleteModal}>Cancelar</Button>
            </div>
          </ModalPregunta>
    
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