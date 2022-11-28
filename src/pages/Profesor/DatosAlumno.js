import React, {useEffect, useState} from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import '../../stylesheets/Comite.css'
import axios from 'axios';
import * as BootIcons  from "react-icons/bs";
import * as BsIcons from 'react-icons/bs';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
/*
const urlAs= "http://34.195.33.246/api/Alumno/";
const urlEsp= "http://34.195.33.246/api/Especialidad/";
*/
const urlAs= "https://localhost:7012/api/Alumno/";
const urlEsp= "https://localhost:7012/api/Especialidad/";
const urlAse = "https://localhost:7012/api/Asesor/";
const urlJur = "https://localhost:7012/api/Jurado/";
const urlJuradoxAlumno = "https://localhost:7012/api/JuradoXAlumno/";

let idEs = 0;

function DatosAlumno() {
  let navigate = useNavigate();
  let {id} = useParams();
  let idCursoGlobal = localStorage.getItem("idCurso");
  const [currentPage,SetCurrentPage] = useState(0);
  const [especialidadAs, setespecialidadAs] =useState({
      idEspecialidad: 0,
      nombre: '',
      descripcion: '',
      idFacultad: 0,
      estado: false
  })
  const [asesorSeleccionado, setAsesorSeleccionado]=useState({
      idAlumno: 0,
      linkCalendario: '',
      tieneTema: 0,
      nombres: '',
      apePat: '',
      apeMat: '',
      correo: '',
      codigoPucp: '',
      contrasena:'',
      imagen: '',
      contrasena: '',
      idEspecialidad: 0,
      nombre: '',
      descripcion: '',
      idFacultad: 0
  })
  const [asesor,setAsesor] = useState([]);
  const [jurados,setJurados] = useState([]);
  const [juradoSelec,setJuradoSelec] = useState([]);
  const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
  const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();

  const cargarAlumno=async()=>{
      if(id!=='0'){
        const response = await axios.get(urlAs+"GetAlumnoXId?idAlumno="+parseInt(id));
        setAsesorSeleccionado({
            idAlumno: response.data[0].idAlumno,
            linkCalendario: response.data[0].linkCalendario,
            tieneTema: response.data[0].tieneTema,
            nombres: response.data[0].nombres,
            apePat: response.data[0].apePat,
            apeMat: response.data[0].apeMat,
            correo: response.data[0].correo,
            codigoPucp: response.data[0].codigoPucp,
            contrasena: response.data[0].contrasena,
            imagen: response.data[0].imagen,
            idEspecialidad: response.data[0].idEspecialidad,
            nombre: response.data[0].nombre,
            descripcion: response.data[0].descripcion,
            idFacultad: response.data[0].idFacultad
        });
        idEs = response.data[0].idEspecialidad
        cargarEspecialidad()
      }
  }

  const cargarEspecialidad=async()=>{
      console.log(idEs);
      await axios.get(urlEsp+"GetEspecialidadXId?idEspecialidad="+idEs)
      .then(response=>{
          setespecialidadAs(response.data[0]);
          console.log(response.data);
      }).catch(error =>{
      console.log(error.message);
      })
  }
  const cargarAsesor=async()=>{
      console.log(idEs);
      await axios.get(urlAse+"ListAsesoresXAlumnoXCurso?idAlumno="+parseInt(id)+"&idCurso="+idCursoGlobal)
      .then(response=>{
          setAsesor(response.data);
      }).catch(error =>{
      console.log(error.message);
      })
  }
  const cargarJurados=async()=>{
      console.log(idEs);
      await axios.get(urlJur+"ListarJuradosXAlumno?idAlumno="+parseInt(id))
      .then(response=>{
        setJurados(response.data);
      }).catch(error =>{
      console.log(error.message);
      })
  }
  const seleccionarAsesor=(asesor)=>{
    setJuradoSelec(asesor);
    openDeleteModal();
  }
    const nextPage = () =>{
        if(jurados.length>=5) //VER CODIGO
        SetCurrentPage(currentPage+5);
    }
    const previousPage =() =>{
        if(currentPage>0)
        SetCurrentPage(currentPage-5);
    }

    
    const peticionDelete=async()=>{
        await axios.delete(urlJuradoxAlumno+ "DeleteJuradoXAlumno?idJurado="+juradoSelec.idJurado+"&idAlumno="+id+"&idCurso"+localStorage.getItem('idCurso'))
        .then(response=>{
          closeDeleteModal();
          openConfirmModal();
          setJurados(jurados.filter(jurado=>jurado.idJurado!==juradoSelec.idJurado));
        })
        
    }

  useEffect(()=>{
      cargarAlumno();
      cargarAsesor();
      cargarJurados();
  },[])


    return(
        <div class="CONTAINERCOMITE">
            <p className="HEADER-TEXT1">{asesorSeleccionado.nombres + " " + asesorSeleccionado.apePat+ " " + asesorSeleccionado.apeMat}</p>
            <div className='row'>
                <div className='col-6 PERFIL'>
                        <div class='BLOCK PERFIL-HEADER fw-bold'>{asesorSeleccionado.correo} </div>
                        <div class='BLOCK' >
                            <div class = 'PERFIL-TITLE fw-bold'> 	ALUMNO MATRIC:
                                <div class = " PERFIL-SUBTITLE fw-normal text-black ms-3"> {asesorSeleccionado.codigoPucp}</div>
                            </div>
                            <div class = 'PERFIL-TITLE fw-bold'> Áreas de interés y especialización:
                                <div class = " PERFIL-SUBTITLE fw-normal text-black ms-3"> {especialidadAs.nombre}</div>
                            </div>
                            <div class = ' PERFIL-TITLE fw-bold'> Asesor:
                            {asesor.length ===0
                            ?<div class = " PERFIL-SUBTITLE fw-normal text-black ms-3"> No tiene asesor asignado</div>
                            :<div class = " PERFIL-SUBTITLE fw-normal text-black ms-3"> - {asesor[0].nombres + " " + asesor[0].apePat + " " + asesor[0].apeMat}</div>
                            }
                            </div>
                        </div>
                </div>
        </div>
        <p class="HEADER-TEXT2 mt-5" >Jurados asignados</p>
        <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
        <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
        <div class = "row LISTAR-TABLA">
          <div class=" col-12 ">
            <table className='table fs-6 '>
              <thead class >
                <tr class>
                    <th style ={{width: 275}}>Nombre</th>
                    <th style ={{width: 150}}>Correo</th>
                    <th style = {{width:100}}>Acciones</th>
                </tr>
              </thead>
              <tbody >
                {jurados.map(asesor => (
                  <tr key={asesor.idUsuario}>
                      <td >{asesor.nombres + " " + asesor.apePat+ " " + asesor.apeMat}</td>
                      <td >{asesor.correo}</td>
                      <td>
                      <button class=" btn BTN-ACCIONES" onClick={()=>seleccionarAsesor(asesor)}> <BootIcons.BsTrash /></button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div class="row INSERTAR-BOTONES">                            
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary fs-4 fw-bold AÑADIR mt-3" type="button" onClick={()=>{navigate("../alumnos/alumnoSeleccionado/asignarJurado/"+asesorSeleccionado.idAlumno)}}><span>Asignar jurados</span></button>
                <button class="btn btn-primary fs-4 fw-bold   CANCELAR" type="button" onClick={()=>{navigate(-1)}}><span>Cancelar</span></button>
                </div>
            </div>

            <ModalPregunta
            isOpen={isOpenDeleteModal} 
            closeModal={closeDeleteModal}
            procedimiento = "desasignar al"
            objeto="jurado"
            elemento={juradoSelec && juradoSelec.nombres}
            >
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionDelete()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeDeleteModal}>Cancelar</Button>
            </div>
            </ModalPregunta>

            <ModalConfirmación
            isOpen={isOpenConfirmModal} 
            closeModal={closeConfirmModal}
            procedimiento= "deasignado"
            >
            <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={closeConfirmModal}>Entendido</Button>
            </div>
            </ModalConfirmación>
        </div>
        
    )
}

export default DatosAlumno