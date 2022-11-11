import React from 'react'
import {useState , useEffect, useContext} from "react";
import useModal from '../../hooks/useModals';
import {  Button, Collapse} from '@material-ui/core';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';
import * as BsIcons from 'react-icons/bs';
import '../../stylesheets/Alumno.css'
import '../../stylesheets/Comite.css'
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as RiIcons  from "react-icons/ri";
import {ModalConfirmación, ModalPregunta} from '../../components/Modals';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';

import { UserContext } from '../../UserContext';
import { AiTwotoneDollarCircle } from 'react-icons/ai';

const urlNota= "https://localhost:7012/api/Nota/";

var form = "";

function ListSistEvaluacion()  {

    let navigate = useNavigate();
    const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
    const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();
    const [modalEliminar, setModalEliminar]=useState(false);
    const [nota, setNota] = useState ([]);
    const [notaSeleccionada, setNotaSeleccionada]=useState({
        idNota: 0,
        nombre: '',
        peso: 1,
        codigo: '',
        fidTipoEntregable: 0,
    })


    const seleccionarNota=(not, a)=>{
        notaSeleccionada.idNota = not.idNota;
        notaSeleccionada.nombre = not.nombre;
        notaSeleccionada.peso = not.peso;
        notaSeleccionada.codigo = not.codigo;
        notaSeleccionada.fidTipoEntregable = not.fidTipoEntregable;
        delete notaSeleccionada.estado;
        console.log(notaSeleccionada)
        openDeleteModal();

      }

    //Listar notas de un curso *falta curso
    const peticionGetNota=async()=>{
        await axios.get(urlNota+ "GetNotas")       
        .then(response=>{
            setNota(response.data);
            obtFormula(response.data);
        }).catch(error =>{
            console.log(error.message);
        })
      }
    
    //Eliminar una nota? de un curso--
    const peticionDelete=async()=>{
        console.log(notaSeleccionada)
        var string = " " + urlNota+"DeleteSemestre"+notaSeleccionada
        console.log(string)
        await axios.delete(urlNota+"DeleteSemestre", {data:{
            idNota: notaSeleccionada.idNota,
            nombre: notaSeleccionada.nombre,
            peso: notaSeleccionada.peso,
            codigo: notaSeleccionada.codigo,
            fidTipoEntregable: notaSeleccionada.fidTipoEntregable,
        }}
        ).then(response=>{
            closeDeleteModal();
            peticionGetNota();
            openConfirmModal();
        })
    }

    const obtFormula = (datos, st) => {
        form = st;
        var pesoSum=0;
        if(datos.length == 0){
            form = "NF = 1";
        }
        else{
            datos.forEach((elem) =>{
                if(pesoSum == 0){
                    form = "NF = (" + elem.peso + "*" + elem.codigo;
                    pesoSum = pesoSum + elem.peso;
                }
                else{
                    form = form + " + " + elem.peso + "*" + elem.codigo;
                    pesoSum = pesoSum + elem.peso;
                }
            })
            form = form + ")/"+ pesoSum;
        }
    }

/*
    //Listar reuniones tabla del asesor--'ReunionAlumnoAsesor/BuscarReunionesXIdAsesorYIdCurso?idAsesor=2&idCurso=1'
    const peticionGet=async()=>{
        await axios.get(url+ "BuscarReunionesXIdAsesorYIdCurso?idAsesor=2&idCurso=1")       //cambiae
        //await axios.get(url+ "BuscarReunionesXIdAsesorYIdCurso?idAsesor="+reunionSeleccionada.idAsesor+ "&idCurso=" +reunionSeleccionada.idCurso)       //cambiae
        .then(response=>{
          setData(response.data);
          console.log("response.data");
          console.log(response.data);
        }).catch(error =>{
          console.log(error.message);
        })
      }

    //Eliminar una reunion de un alumno--
    const peticionDelete=async()=>{
        await axios.delete(url+ "EliminarReunion?idReunionAlumnoAsesor="+reunionSeleccionada.idReunionAlumnoAsesor).         //cambiar
        then(response=>{
          setData(data.filter(reunion=>reunion.idReunion!==reunionSeleccionada.idReunion));
          closeDeleteModal();
          openConfirmModal();
        })
      }

    //lista de alumnos asesorados
    const peticionListAlumAs=async()=>{
        await axios.get(urlAlxAs+ "ListAlumnosXIdAsesor?idAsesor=2").         //cambiar
        then(response=>{
            setAlumnos(response.data);
            asesor.alumnos = response.data;
        })
      }
*/
    useEffect(()=>{
        peticionGetNota();
    },[])


  return (      
    <div class=" CONTAINERADMIN">   
        <p class="HEADER-TEXT1">Fórmula de calificación de la nota final</p>

        <p class="BTN-CUADRADO-SISTEV NO-SQ"> {form}</p>

        <p class="HEADER-SISTEV">
                <td style ={{width: 220, paddingLeft: '0.95%', paddingRight: '2%'}}>Código</td>
                <td style ={{width: 380, paddingLeft: '0.95%', paddingRight: '5%'}}>Nombre </td>
                <td style ={{width: 120}}>Peso </td>
                <td style ={{width: 80}}>Acciones </td>
        </p>  
        
        {nota.map(not => (
                <tr key={not.idNota}>
                    <td><p class="BTN-CUADRADO-SISTEV">
                        <td title= {not.codigo} style ={{width: 220, paddingLeft: '0.5%', paddingRight: '2%'}}>{not.codigo}</td>
                        <td title= {not.nombre} style ={{width: 380, paddingLeft: '0.5%', paddingRight: '5%'}}>{not.nombre}</td>
                        <td style ={{width: 120}}>{not.peso} </td>
                        <td class = "text-center" style ={{width: 80}}>
                            <button class="btn BTN-ACCIONES" onClick={()=>{navigate("datoSistEvalución/" + not.idNota)}}> <FaIcons.FaEdit/></button>
                            <button  class=" btn BTN-ACCIONES" onClick={()=>seleccionarNota(not, 'Eliminar')}> <BootIcons.BsTrash/></button>   
                        </td>
                    </p></td>                    
                </tr>
         ))}
         <p>   NF: <m> Nota Final </m> </p>

        <div className='LISTAR-ESPECIALIDADES-BOTON'>
            <button className='btn btn-primary fs-4 fw-bold mb-3' onClick={()=>{ navigate("datoSistEvalución/0")}} ><span>Registrar</span></button>
        </div> 

        <ModalPregunta
            isOpen={isOpenDeleteModal} 
            closeModal={closeDeleteModal}
            procedimiento = "eliminar"
            objeto="la nota"
            elemento={notaSeleccionada && notaSeleccionada.codigo}
            >
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
            <Button class="btn  btn-success btn-lg" onClick={()=>peticionDelete()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
  )
}

export default ListSistEvaluacion;