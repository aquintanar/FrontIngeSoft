import React from 'react'
import {useState , useEffect, useContext} from "react";
import useModal from '../../../hooks/useModals';
import {  Button, Collapse} from '@material-ui/core';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate ,useParams} from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';
import * as BsIcons from 'react-icons/bs';
import '../../../stylesheets/Asesor.css'
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as RiIcons  from "react-icons/ri";
import {ModalConfirmación, ModalPregunta} from '../../../components/Modals';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';

import { UserContext } from '../../../UserContext';
import { AiTwotoneDollarCircle } from 'react-icons/ai';

const url = "http://34.195.33.246/"
// const url = "http://34.195.33.246/"

const urlNota = url + "api/Nota/";
const urlTipoEnt= url + "api/TipoEntregable/"
const urlEnt= url + "api/Entregable/";

var dsots = [];

function DatoSistEvaluacion()  {

    let navigate = useNavigate();
    let {id} = useParams();
    const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
    const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
    const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
    const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
    const [mostrar, setMostrar] = useState(1);
    const [subTitulo,setSubtitulo] = useState("Registrar nota");

    const [listEntCursoTipo, setListEntCursoTipo] = useState ([]);
    const [data, setData] = useState ([]);
    const [listEnt, setListEnt] = useState ([]);
    const [listEntCursoTipoModify, setListEntCursoTipoModify] = useState ([]);
    const [idTipoIni, setIdTipoIni] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);

    const [nota, setNota] = useState({
        idNota: 0,
        codigo: '',
        nombre: '',
        peso: 1,
        fidTipoEntregable: 0,
        estado: 1,
        entregables: selectedRows,
    })

    //Control cambio en inputs de titulo--
    const handleChange=e=>{
        const {name, value}=e.target;
        setNota(prevState=>({
            ...prevState,
            [name]: value
        }))
        console.log(nota);
    }

    //Listar notas de un curso 
    const peticionGetNotas=async(arr)=>{
      await axios.get(urlNota+ "GetNotas_x_idCurso?idCurso="+localStorage.getItem('idCurso'))       
      .then(response=>{
          setData(response.data);
          console.log(response.data)
          dsots = response.data
          console.log("arr",arr)
        }).catch(error =>{
          console.log(error.message);
      })
    }

    //Controla cambio en combo box del tipo Entregable--
    const cambioSelectTipoEnt =e=>{
        setNota(prevState => ({
            ...prevState,
            fidTipoEntregable: parseInt(e.target.value)
        }))
        console.log(nota);
    }

    const cerrarPost=()=>{
        closeGuardadoModal();
        navigate("../sistEvaluacion");
      }

    
    //Selección entre modificar o insertar
    const peticionSelecter =async()=>{
        console.log("nota");
        
        if(id==='0'){
            openPostModal();
            await peticionGetEntCursoTipo(1, nota.fidTipoEntregable);
        }
        else{
            openEditModal();  
            await peticionGetEntCursoTipo(2, nota.fidTipoEntregable);
            if(idTipoIni !== nota.fidTipoEntregable){
              console.log("anteerio")
                //anterior
                cambiarIdNota(listEntCursoTipo, 1);
                console.log(listEntCursoTipo)
                //actual
                console.log("actual", nota.idNota, nota)
                cambiarIdNota(listEntCursoTipoModify, nota.idNota);
                console.log(listEntCursoTipoModify)
                console.log("ergvoemdogvoiser")
            }
        }
    }


    const carga =(arr)=>{
      console.log("llegue")
      console.log(arr)
      if(arr.length === nota.entregables.length)  return;
      arr.forEach(element => {
        var i = nota.entregables.findIndex(e => e.idEntregable === element.idEntregable );
          nota.entregables.push({idEntregable:element.idEntregable})
          })
        setNota(prevState=>({
        ...prevState,
        entregables: prevState.entregables,
        }))
      console.log(nota);
      console.log(nota.entregables)
      console.log("fint Llegue")
    }

    const cerrarPut=()=>{
        closeEditadoModal();
        navigate("../sistEvaluacion");
      }
    
    //Listar entregables de un curso 
    const peticionGetEntreg=async()=>{
      await axios.get(urlEnt+ "ListEntregablesXIdCurso?idCurso="+localStorage.getItem('idCurso'))       
      .then(response=>{
          removeDup(response.data);
      }).catch(error =>{
          console.log(error.message);
      })
    }
    //obtiene los tipos de entregables usados en el curso   setListEnt
    const removeDup =async(array)=>{
        var hash = {};
        array = array.filter(function(current) {
            var exists = !hash[current.fidTipoEntregable];
            hash[current.fidTipoEntregable] = true;
            return exists;
          })
          setListEnt(array)
          if(id==='0'){
            var aux2 =[];
            await peticionGetNotas(aux2);
            removeReg (array, aux2);
          }
          
    }
    //
    const removeReg=(arr)=>{
      console.log("data", dsots);
      console.log("listEnt", arr);
      dsots.forEach(element =>{
        for(let x=0; x < arr.length; x++){
          if(element.fidTipoEntregable === arr[x].fidTipoEntregable){
            arr.splice(x, 1)
          }
        }
      })
      console.log("listEnt", arr);
    }

    //-----------------------------------------POST-----------------------------------------------------------
    //Listar tipos de entregables por curso y por tipoEntregable     setListEntCursoTipo
    const peticionGetEntCursoTipo=async(i, idTipoEnt)=>{
        await axios.get(urlEnt+ "ListEntregablesXIdCursoYIdTipoEntregable?idCurso=" + localStorage.getItem('idCurso') + "&idTipoEntregable=" + idTipoEnt)  
        .then(response=>{
          console.log("response.data", response.data)
          if(i == 1){
            setListEntCursoTipo(response.data);
            if(id==='0')
              carga(response.data);
          }
          else if(i ==2){
            setListEntCursoTipoModify(response.data);
          }
            console.log(response.data);
        }).catch(error =>{
            console.log(error.message);
        })
        
      }

    //--------------------------------------------PUT--------------------------------------------------------------
    const cambiarIdNota=async(arr, id)=>{
        arr.forEach((element) =>{
          element.fidNota = id;
        })
    }

    const modificarEnt = async(ent) => {
      console.log(ent)
      await axios.put(urlEnt+"PutEntregable",ent)
            .then(response=>{
            closeEditModal();
            openEditadoModal();
        }).catch(error =>{
            console.log(error.message);
        })
    }

    //--------------------------------------------------------------------------------------------------------------

    //Insertar nueva nota--
    const peticionPost=async()=>{
      console.log("nota", nota);
      await axios.post(urlNota+"PostNota",nota)
        .then(response=>{
        closePostModal();
        openGuardadoModal();
      }).catch(error =>{
      console.log(error.message);
      })
    }

    //Modificar nota--
    const peticionPut=async()=>{
        nota.peso = parseInt(nota.peso)
        peticionGetEntCursoTipo(2, nota.fidTipoEntregable);
        if(idTipoIni !== nota.fidTipoEntregable){
          //before
          listEntCursoTipo.forEach(element => {
            modificarEnt(element);
          });

          //after
          listEntCursoTipoModify.forEach(element => {
            modificarEnt(element);
          });
        }
        await axios.put(urlNota+"ModifyNota",nota)
            .then(response=>{
            closeEditModal();
            openEditadoModal();
        }).catch(error =>{
            console.log(error.message);
        })
    }

    //Carga especialidad a modificar
    const cargarNota=async()=>{
      
        if(id!=='0'){console.log("ini carga de mod");
        const response = await axios.get(urlNota+"GetNotaXId?idNota="+parseInt(id));
        setNota({
            idNota: response.data[0].idNota,
            codigo: response.data[0].codigo,
            nombre: response.data[0].nombre,
            fidTipoEntregable: response.data[0].fidTipoEntregable,
            peso: response.data[0].peso,
        }
        );
            setSubtitulo("Modificar nota");
            console.log(response.data[0]);
            peticionGetEntCursoTipo(1, response.data[0].fidTipoEntregable);
            setIdTipoIni(response.data[0].fidTipoEntregable);
            console.log(nota);
            console.log("fin carga de mod");
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
        cargarNota();           //Si es para modiifcar o registrar
        peticionGetEntreg();    //listar tipos de entregas activas en el curso
    },[])


  return (      
    <div class=" CONTAINERALUMNO">   
        <p class="HEADER-TEXT1">{subTitulo}</p>

        <div class="row">
            <div class="col-4 DATOS" >
                    <div class="text-start fs-6  mb-1 fw-normal "><p>Código</p></div>
                    <div class="input-group mb-2 ">
                        <input type="text"  class="form-control" name="codigo" placeholder="Código" aria-label="codigo"  
                            onChange={handleChange} value={nota.codigo}/>
                    </div>
            </div>
            
            <div class="col-8 DATOS1" >
                    <p>Nombre</p>
                    <div class="input-group mb-2 ">
                        <textarea class="form-control TEXTAREA2" name="nombre" placeholder="Nombre" aria-label="nombre"  
                            onChange={handleChange} value={nota && nota.nombre}/>
                    </div>
            </div>
        </div>

        <div class="row">
                <div class= "col-4 DATOS">
                  <p>Tipo de evaluación</p>
                  <select select class="form-select Cursor" onChange= {cambioSelectTipoEnt} selected value = {nota.fidTipoEntregable}>
                      <option selected value = "0">Seleccionar</option>
                      {listEnt.map(elemento=>(
                        <option key={elemento.fidTipoEntregable} value={elemento.fidTipoEntregable}>{elemento.tipoEntregable}</option>  
                      ))} 
                    </select>
                </div>
                <div class = "col-3 DATOS" >
                    <p>Peso</p>
                    <input type="number" min="1" class="form-control" name="peso" placeholder="Peso" aria-label="peso"  
                                onChange={handleChange} value={nota && nota.peso}/>
                </div>
        </div>

        <ModalPregunta
              isOpen={isOpenEditModal} 
              closeModal={closeEditModal}
              procedimiento = "modificar"
              objeto="la nota"
              elemento={nota && nota.codigo}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionPut()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closeEditModal}>Cancelar</Button>
              </div>
            </ModalPregunta>
                        
            <ModalPregunta
              isOpen={isOpenPostModal} 
              closeModal={closePostModal}
              procedimiento = "guardar"
              objeto="la nota"
              elemento={nota && nota.codigo}
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn  btn-success btn-lg" onClick={()=>peticionPost()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button class="btn btn-danger btn-lg"  onClick={closePostModal}>Cancelar</Button>
              </div>
            </ModalPregunta>

            <ModalConfirmación
              isOpen={isOpenEditadoModal} 
              closeModal={closeEditadoModal}
              procedimiento= "modificado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={()=>cerrarPut()}>Entendido</Button>
              </div>
            </ModalConfirmación>

            <ModalConfirmación
              isOpen={isOpenGuardadoModal} 
              closeModal={closeGuardadoModal}
              procedimiento= "guardado"
            >
              <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                <Button class="btn btn-success btn-lg" onClick={()=>cerrarPost()}>Entendido</Button>
              </div>
            </ModalConfirmación>


        <div class="row INSERTAR-BOTONES">                            
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>peticionSelecter()} ><span>Guardar</span></button>
                <button class="btn btn-primary fs-4 fw-bold   CANCELAR" type="button" onClick={()=>{navigate("../sistEvaluacion")}}><span>Cancelar</span></button>
            </div>
        </div>
    </div>              
  )
}

export default DatoSistEvaluacion;

//<button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>peticionSelecter()}><span>Guardar</span></button>
/*
    <p>Forma de aplicar los pesos</p>
                    <div class="row">
                        <div class = "col-4"><input type="radio" value={1} defaultChecked  onChange={handleChangeButton} name="tipoAplicarPeso" /> Por promedio</div>
                        <div class = "col-4"><input type="radio" value={0} onChange={handleChangeButton} name="tipoAplicarPeso" /> Por evaluación</div>
                    </div>
*/