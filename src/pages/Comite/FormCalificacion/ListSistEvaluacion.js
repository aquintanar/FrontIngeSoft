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
import {ModalConfirmación, ModalPregunta} from '../../../components/Modals';

const url = "https://localhost:7012/api/"
// const url = "http://34.195.33.246/api/"

const urlNota= url + "Nota/";
const urlEnt= url + "Entregable/";

var form = "";

function ListSistEvaluacion()  {

    let navigate = useNavigate();
    const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
    const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();
    const [modalEliminar, setModalEliminar]=useState(false);
    const [notas, setNotas] = useState ([]);
    const [evaluaciones, setEvaluaciones] = useState ([]);
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
        openDeleteModal();
      }

    const peticionGetNotas=async()=>{               //Listar notas de un curso 
        await axios.get(urlNota+ "GetNotas_x_idCurso?idCurso="+localStorage.getItem('idCurso'))       
        .then(response=>{
            setNotas(response.data);
            obtFormula(response.data, "")
        }).catch(error =>{
            console.log(error.message);
        })
      }
    
    const peticionDelete=async()=>{                 //Eliminar una nota? de un curso-
        //setear en 0 a las fid nota o en null
        await axios.delete(urlNota+"DeleteSemestre", {data:{
            idNota: notaSeleccionada.idNota,
            nombre: notaSeleccionada.nombre,
            peso: notaSeleccionada.peso,
            codigo: notaSeleccionada.codigo,
            fidTipoEntregable: notaSeleccionada.fidTipoEntregable, 
        }}
        ).then(response=>{
            eliminarEv();
            closeDeleteModal();
            peticionGetNotas();
            openConfirmModal();
        })
    }

    const eliminarEv=async()=>{                 //Eliminar una nota? de un curso-
        await axios.get(urlEnt+ "ListEntregablesXIdNota?idNota="+notaSeleccionada.idNota)       
        .then(response=>{
            eliminarEvPetcion(response.data)
        }).catch(error =>{
            console.log(error.message);
        })
    }

    const eliminarEvPetcion=async(array)=>{                 //Eliminar una nota? de un curso-
        //setear en 0 a las fid nota o en null
        for(let i=0; i<array.length; i++){    //registras evaluaciones
            await axios.put(urlEnt + "InsertarNotaToEntregable?idNota=0&idEntregable=" + array[i].idEntregable)
            .then(response=>{
                return;
            }).catch(error =>{
              console.log(error.message);
            })
            }
        
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

    useEffect(()=>{
        form = ""
        peticionGetNotas();
    },[])

  return (      
    <div class=" CONTAINERADMIN">   
        <h1>Fórmula de calificación de la nota final</h1>

        <p class="BTN-CUADRADO-SISTEV NO-SQ"> {form}</p>
        {notas ? null : 
            <p class="HEADER-SISTEV">
                    <td style ={{width: 300, paddingLeft: '0.95%', paddingRight: '2%'}}>Código</td>
                    <td style ={{width: 350, paddingLeft: '0.95%', paddingRight: '5%'}}>Nombre </td>
                    <td style ={{width: 120}}>Peso </td>
                    <td style ={{width: 80}}>Acciones </td>
            </p>  
        }
        {notas.map(not => (
                <tr key={not.idNota}>
                    <td><p class="BTN-CUADRADO-SISTEV">
                        <td title= {not.codigo} style ={{width: 300, paddingLeft: '0.5%', paddingRight: '2%'}}>{not.codigo}</td>
                        <td title= {not.nombre} style ={{width: 380, paddingLeft: '0.5%', paddingRight: '5%'}}>{not.nombre}</td>
                        <td title= "Peso" style ={{width: 100}}>{not.peso} </td>
                        <td class = "text-center" style ={{width: 70}}>
                            <button title="Editar nota" class="btn BTN-ACCIONES" onClick={()=>{navigate("datoSistEvalucion/" + not.idNota)}}> <FaIcons.FaEdit/></button>
                            <button title="Eliminar nota" class=" btn BTN-ACCIONES" onClick={()=>seleccionarNota(not, 'Eliminar')}> <BootIcons.BsTrash/></button>   
                        </td>
                    </p></td>                    
                </tr>
         ))}
         <p>   NF: <m> Nota Final </m> </p>

        <div className="d-grid gap-2 d-md-flex justify-content-md-end INSERTAR-BOTONES ">
            <button title="Registrar nota" className='btn btn-primary fs-4 fw-bold mb-3 REGISTRAR' onClick={()=>{ navigate("datoSistEvalucion/0")}} ><span>Registrar</span></button>
        </div> 

        <ModalPregunta      isOpen={isOpenDeleteModal}      closeModal={closeDeleteModal}   procedimiento = "eliminar"
                            objeto="la nota"                elemento={notaSeleccionada && notaSeleccionada.codigo}      >
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionDelete()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeDeleteModal}>Cancelar</Button>
            </div>
        </ModalPregunta>

        <ModalConfirmación  isOpen={isOpenConfirmModal}     closeModal={closeConfirmModal}  procedimiento= "eliminado"  >
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={closeConfirmModal}>Entendido</Button>
            </div>
        </ModalConfirmación>
    </div>              
  )
}

export default ListSistEvaluacion;