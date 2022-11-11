import React from 'react'
import './proponerTemaAsesor.css';
import {useState , useEffect, useContext} from "react";
import useModal from '../../hooks/useModals';
import {  Button, Collapse} from '@material-ui/core';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';
import * as BsIcons from 'react-icons/bs';
import '../../stylesheets/Asesor.css'
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as RiIcons  from "react-icons/ri";
import {ModalConfirmación, ModalPregunta} from '../../components/Modals';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import DatoReunion from './DatoReunion';

import { UserContext } from '../../UserContext';
import { AsesorContext } from './AsesorContext';
import { AiTwotoneDollarCircle } from 'react-icons/ai';

const url= "http://34.195.33.246/api/ReunionAlumnoAsesor/";
const urlAlxAs = "http://34.195.33.246/api/Alumno/";
//const url= "http://44.210.195.91/api/Reunion/";

function ListaReunion(alumno, setAlumno)  {

    let navigate = useNavigate();
    const[active, setActive] = useState("Registrar reunión");
    const [currentPage,SetCurrentPage] = useState(0);
    const [reunionSeleccionada, setReunionSeleccionada] = useState({
        idReunionAlumnoAsesor: 0,
        idAlumno: 0,
        idAsesor: 2,
        idCurso: 1,
        nombre: '',
        descripcion: '',
        fechaHoraInicio: new Date(),
        fechaHoraFin: new Date(),
        estadoReunion: 4,
        cantParticipantes: 2,
        enlace: ''
    })
    
    const [search, setSearch] = useState("");
    const [fechas, setFechas] = useState([new Date(),new Date()]);
    const [data, setData]=useState([]);
    const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
    const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();    
    const [fil, setFil] = useState(0);
    const [fol, setFol] = useState(0);
    const {value,setValue} = useContext(UserContext);
    const [alumnos, setAlumnos] = useState([]);
    const asesor = useContext(AsesorContext);

    let filtrado =[];

    if(!search && !fechas && !fil && !fol){   //sin filtro
      filtrado = data;
    }
    else{
      if(search && fechas && fil && fol){    //tiene lo cuatro filtros activos
        filtrado = data.filter(element => {
          let ok =false;
          const fec = Date.parse(element.fechaHoraInicio);
          if(fechas[1]>=fec && fec>=fechas[0]){
            ok = true;
          }
          return ok;
        });
        filtrado=filtrado.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
        filtrado=filtrado.filter((dato)=>dato.estadoReunion===fil) ;
        filtrado=filtrado.filter((dato)=>dato.idAlumno===fol) ;
      }
      else{                                  //tiene a lo mas tres filtros activos
        if(search && fil){               
          filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
          filtrado=filtrado.filter((dato)=>dato.estadoReunion===fil) ;
          if(fol)
            filtrado=filtrado.filter((dato)=>dato.idAlumno===fol) ;
          else if(fechas){
            filtrado = data.filter(element => {
                let ok =false;
                const fec = Date.parse(element.fechaHoraInicio);
                if(fechas[1]>=fec && fec>=fechas[0]){
                  ok = true;
                }
                return ok;
              });
          }
        }
        else if(fol && fechas){       
          filtrado = data.filter(element => {
            let ok =false;
            const fec = Date.parse(element.fechaHoraInicio);
            if(fechas[1]>=fec && fec>=fechas[0]){
              ok = true;
            }
            return ok;
          });
          filtrado=filtrado.filter((dato)=>dato.idAlumno===fol) ;
          if(fil)
            filtrado=filtrado.filter((dato)=>dato.estadoReunion===fil) ;
          else if(search)
            filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
        }
        else if(search && fechas){          //tiene a los mas dos filtros
          filtrado = data.filter(element => {
            let ok =false;
            const fec = Date.parse(element.fechaHoraInicio);
            if(fechas[1]>=fec && fec>=fechas[0]){
              ok = true;
            }
            return ok;
          });
          filtrado=filtrado.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
        }
        else{   
          if(fil)//filtro por estado
           filtrado=data.filter((dato)=>dato.estadoReunion===fil) ;
          if(search)//filtro por nombre
            filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
          if(fol)//filtro por alumno
            filtrado=data.filter((dato)=>dato.idAlumno===fol) ;
          if(fechas)
            filtrado = data.filter(element => {
              let ok =false;
              const fec = Date.parse(element.fechaHoraInicio);
              if(fechas[1]>=fec && fec>=fechas[0]){
                ok = true;
              }
              return ok;
            });
        }
      }
    }

    //Controla buscador
    const buscador = e=>{
        setSearch(e.target.value);
    }

    const cambioSelect =e=>{
        const valor = parseInt(e.target.value)
        setFil(valor)
    }

    //Controla cambio en combo box--
    const cambioSelectAlumno =e=>{
        const valor = parseInt(e.target.value)
        setFol(valor)
    }

    filtrado = filtrado.slice(currentPage,currentPage+5);
    const nextPage = () =>{
        if(filtrado.length>=currentPage) //VER CODIGO
        SetCurrentPage(currentPage+5);
    }
    const previousPage =() =>{
        if(currentPage>0)
        SetCurrentPage(currentPage-5);
    }

    const seleccionarReunion = (reunion) => {
        setReunionSeleccionada(reunion);
        console.log(reunionSeleccionada)
        openDeleteModal();
    }

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

    const abrirDato = (i, reunion) => {
        asesor.tipo = i;    
        if(i == 0){
            asesor.reunion = reunion;
        }
        else{
            asesor.reunion = reunionSeleccionada;
        }
    } 

    useEffect(()=>{
        peticionGet();
        setFechas(0);
        asesor.idAsesor = value;
        console.log("inicio");
        console.log(asesor);
        console.log(value);
        peticionListAlumAs();
        console.log("fin");
        

    },[])


  return (      
    <div class=" CONTAINERALUMNO">   
        <p class="HEADER-TEXT1">Reuniones</p>
        <p class="HEADER-TEXT2">Búsqueda de reuniones</p>

        <div class="row">
            <div class="col-6 DATOS" >
                <div class="text-start fs-6  mb-1 fw-normal "><p>Ingresar nombre de la reunión</p></div>
                <div class="input-group mb-2 ">
                    <input size="20" type="text" value={search} class="form-control" name="search" placeholder="Reunión" aria-label="serach" onChange={buscador}/>
                </div>
            </div>

            <div class="col-6 DATOS" >
                <div class="text-start fs-6  mb-1 fw-normal "><p>Alumno</p></div>
                <div class="input-group mb-2 ">
                        <select select class="form-select Cursor" aria-label="Default select example"  onChange= {cambioSelectAlumno} >  
                            <option selected value = "0">Todos</option>
                            {alumnos.map(elemento=>(
                                <option key={elemento.idAlumno} value={elemento.idAlumno}>{elemento.nombres} {elemento.apePat} {elemento.apeMat}</option>  
                            ))}
                        </select>
                </div>
            </div>
        </div>

        <div class="row">
              <div class="col-4 FILTRO-FECHA DATOS" >
                  <p>Rango de Fechas</p>
                  <DateRangePicker onChange={setFechas} value={fechas} />
              </div>
              <div class="col-4 DATOS" >
                <div class=" fs-5 fw-normal  mb-1 "><p>Estado</p></div>
                <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelect}>
                    <option key="0" selected value = "0">Todos</option>
                    <option key="1" value="1">Asitió</option>
                    <option key="2" value="2">No asistió</option>
                    <option key="3" value="3">Tardanza</option>
                    <option key="4" value="4">Pendiente</option>
                </select>
              </div>
        </div>


        <p class="HEADER-TEXT2">Lista de reuniones</p>
        <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
        <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>

        <div class = "row LISTAR-TABLA">
            <div class=" col-12 ">
              <table className='table fs-6 '>
                <thead class >
                  <tr class>
                      <th style ={{width: 150}}>Nombre</th>
                      <th style ={{width: 155}}>Alumno</th>
                      <th style = {{width:245}}>Fecha de la reunión</th>
                      <th style = {{width:100}}>Estado</th>
                      <th  style = {{width:120}}>Cant. de part.</th>
                      <th style = {{width:100}}>Acciones</th>
                  </tr>
                </thead>
                <tbody >
                  {filtrado.map(reunion => (
                    <tr>
                        <td>
                        <a class = "LINK" href= {reunion.enlace} target="_blank"   >{reunion.nombre}</a>    
                        </td>
                        <td>{reunion.nombresAlumno} {reunion.apePatAlumno}</td>
                        <td>{reunion.fechaHoraInicio}</td>                

                        <td>    
                            {(() => {
                                switch(reunion.estadoReunion){
                                    case 1 : return <td class = "text-success">Asistió</td> ;
                                    case 2 : return <td class = "text-warning">Tardanza</td> ;
                                    case 3 : return <td class = "text-danger">No asistió</td> ;
                                    default: return <td>Pendiente</td>
                                }
                            }) ()}
                        </td>

                        <td class = "text-center">{reunion.cantParticipantes}</td>
                        <td>
                        <button class="btn BTN-ACCIONES" onClick={()=>{ abrirDato(0, reunion); navigate("datoReunion/")}}> <FaIcons.FaEdit /></button>
                        <button  class=" btn BTN-ACCIONES" onClick={()=>seleccionarReunion(reunion)}> <BootIcons.BsTrash /></button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>

        <div className='LISTAR-ESPECIALIDADES-BOTON'>
            <button className='btn btn-primary fs-4 fw-bold mb-3' onClick={()=>{ abrirDato(1, []); navigate("datoReunion/")}} ><span>Registrar</span></button>
        </div> 

        <ModalPregunta
            isOpen={isOpenDeleteModal} 
            closeModal={closeDeleteModal}
            procedimiento = "eliminar"
            objeto="la reunión"
            elemento={reunionSeleccionada && reunionSeleccionada.nombre}
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
  )
}

export default ListaReunion;