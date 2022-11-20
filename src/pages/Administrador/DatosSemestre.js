import React, {useEffect, useState, useMemo} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import '../../stylesheets/Administrador.css'
import {  Button} from '@material-ui/core';
import useModal from '../../hooks/useModals';
import {ModalConfirmación, ModalPregunta} from '../../components/Modals';
import DataTable from "./DataTable";
import * as Ionicons5 from 'react-icons/io5';
import * as BsIcons from 'react-icons/bs';
import * as BootIcons  from "react-icons/bs";
import ModalBuscarUsuario from './ModalBuscarUsuario';
import DatePicker from "react-date-picker";
import '../../stylesheets/Calendar.css'
import '../../stylesheets/DatePicker.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url= "https://localhost:7012/api/Semestre/";
const urlFacu= "http://34.195.33.246/api/Facultad/";
const urlEsp= "http://34.195.33.246/api/Especialidad/";
const urlUser= "http://34.195.33.246/api/Asesor/";
const urlComi= "http://34.195.33.246/api/ComiteTesis/";
const urlSemComi= "http://34.195.33.246/api/SemestreXComiteTesis/";


/*
const url= "http://44.210.195.91/api/Semestre/";
const urlFacu= "http://44.210.195.91/api/Facultad/";
const urlEsp= "http://44.210.195.91/api/Especialidad/";
const urlUser= "http://44.210.195.91/api/Asesor/";
const urlComi= "https://44.210.195.91/api/ComiteTesis/";
const urlSemComi= "https://44.210.195.91/api/SemestreXComiteTesis/";
*/


var currentTime= new Date();
var year = currentTime.getFullYear();
var espDec = "";
var datos;
var coordRegist;

function DatosSemestre() {
  let navigate = useNavigate();
  let {id} = useParams();
  const [facus, setFacus] = useState([]);
  const [esp, setEsp] = useState([]);
  const [espBus, setEspBus] = useState([]);
  const [subTitulo,setSubtitulo] = useState("Registrar Semestre Académico");
  const [modificar, setModificar] = useState([0]);
  const [coordinadores, setCoord] = useState([]);		/// los seleccionados
	const [coordElim, setCoordelim] = useState([]); 	/// los que se eliminaran
	const [coordReg, setCoordReg] = useState([]);		/// los ya registrados
	const [coordAReg, setCoordAReg] = useState([]);		/// los que se registraran
  const [list, setListar] = useState(true);
  const [currentPage,SetCurrentPage] = useState(0);
 
  const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
  const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
  const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
  const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();
  const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
  const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();

  //Para la lista de docentes
  const [forceSelectionIdxs, setForceSelectionIdxs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [data, setData] = useState([]);   //para User
  const [fac, setFac] = useState(0);
  const [nn, setnn] =useState({
      imagen: null,
  })

  //Objeto semestre
  const [semestreSeleccionada, setSemestreSeleccionada]=useState({
      idSemestre: 0,
      nombre: "",
      anho: 0,
      numSemestre: 1,
      fechaInicio: new Date(),
      fechaFin: new Date(),
      enCurso:true
  });

  const [fechaIni, setFechaIni] = useState(semestreSeleccionada.fechaInicio);
  const [fechaFin, setFechaFin] = useState(semestreSeleccionada.fechaFin);

  const [coordinadorSeleccionada, setCoordinadorSeleccionada]=useState({
    idComiteTesis: 0,
    nombres: ''
    }); 

  let especialidades = !fac? esp:esp.filter((dato)=>dato.facultad.idFacultad===fac);

  var lista = []

  //Control cambio en inputs--
  const handleChange=e=>{
    const {name, value}=e.target;
    setSemestreSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(semestreSeleccionada);
  }

  //Control cambio en combo box--
  const cambioSelect =e=>{
      setSemestreSeleccionada(prevState=>({
        ...prevState,
        nombre: semestreSeleccionada.anho + "-" + semestreSeleccionada.numSemestre + "-"  + espDec
      }))
      console.log(semestreSeleccionada);
    }

    //Control de cambio en select de anio
    const cambioSelectAnio =e=>{
      const {name, value}=e.target;
      semestreSeleccionada.anho=value;
      //cargaNombre(semestreSeleccionada.idEspecialidad)
      setSemestreSeleccionada(prevState=>({
        ...prevState,
        }))
        semestreSeleccionada.nombre= semestreSeleccionada.anho + "-" + semestreSeleccionada.numSemestre;
      }

      //Control de cambio en select de semestre
      const cambioSelectSem =e=>{
        const {name, value}=e.target;
        semestreSeleccionada.numSemestre=value;
        setSemestreSeleccionada(prevState=>({
        ...prevState,
        }))
        semestreSeleccionada.nombre= semestreSeleccionada.anho + "-" + semestreSeleccionada.numSemestre;
        console.log(semestreSeleccionada);
      }
    //Control de cambio en select de especialidad
    const cambioSelectEsp =e=>{
        cargaNombre(e.target.value);
        setSemestreSeleccionada(prevState=>({
        ...prevState,
          idEspecialidad: e.target.value,
          nombre: semestreSeleccionada.anho + "-" + semestreSeleccionada.numSemestre + "-"  + espDec
        }))
        console.log(semestreSeleccionada);
      }

    //no hacer nada
    const carga =()=>{
      console.log("llegue")
      console.log()
      selectedRows.forEach(element => {
          semestreSeleccionada.lista_coordinadores.push({idComiteTesis:element.idUsuario})
        })

        setSemestreSeleccionada(prevState=>({
        ...prevState,
          lista_coordinadores: prevState.lista_coordinadores,
        }))
      
      console.log(lista)
      console.log(semestreSeleccionada)
    }

    //Carga el nombre del semestre
    function cargaNombre(i){
      especialidades.forEach((especialidad) => {
        if(especialidad.idEspecialidad == i){
          semestreSeleccionada.nombre = semestreSeleccionada.anho + "-" + semestreSeleccionada.numSemestre + "-" + especialidad.descripcion
          espDec = especialidad.descripcion
        }
      })
    }

    

    

    //Busca la descripcion de la especialidad por un id
    const petitionEspBusc=async()=>{
      await axios.get(urlEsp + "GetEspecialidadXId?idEspecialidad=" + semestreSeleccionada.idEspecialidad)
      .then(response=>{
        setEspBus(response.data[0].descripcion);
      }).catch(error =>{
          console.log(error.message);
      })
    }

    

    //Insertar nuevo semestre--
    const peticionPost=async()=>{
        //carga();
        console.log("Entro post")
        cargaDatosFechas();
        semestreSeleccionada.idSemestre=0;
        console.log(semestreSeleccionada);
        console.log("HOLAXD");
        await axios.post(url+"PostSemestre",semestreSeleccionada)
          .then(response=>{
           console.log("SE GUARDO")
          closePostModal();
          openGuardadoModal();
        }).catch(error =>{
        console.log(error.message);
        })
    }

    const cerrarPost=()=>{
        closeGuardadoModal();
        navigate("../gestion/gesSemestre");
    }

    //Modificar semestre--
    const peticionPut=async()=>{
      console.log("Modificar coord regis");
      coordRegElim();
      
      if(coordElim.length== 0 & coordAReg.length  == 0){
        closePostModal();
        openGuardadoModal();
      }

      //son para los coordinadores que se registraran
        for(let i=0; i<coordAReg.length; i++){
          await axios.post(urlSemComi + "PostSemestreXComiteTesis?idSemestre="+ parseInt(id) + "&idComiteTesis=" + coordAReg[i].idComiteTesis)
            .then(response=>{
            closePostModal();
            openGuardadoModal();
            console.log("Modificar coord");
        })  .catch(error =>{ console.log(error.message);  })
        }
      
      //son para los coordinadores que estaban registrados, pero seran eliminados
        for(let i=0; i<coordElim.length; i++){
            await axios.delete(urlSemComi + "DeleteSemestreXComiteTesis?idSemestre="+ parseInt(id) + "&idComiteTesis=" + coordElim[i].idComiteTesis)
              .then(response=>{
              closePostModal();
              openGuardadoModal();
          })  .catch(error =>{ console.log(error.message);  })
        }

        semestreSeleccionada.lista_coordinadores.push(nn);
        semestreSeleccionada.enCurso = true;
        semestreSeleccionada.idEspecialidad = parseInt(semestreSeleccionada.idEspecialidad);
        await axios.put(url + "ModifySemestre", semestreSeleccionada)
              .then(response=>{
                closeEditModal();
                openEditadoModal();
          })  .catch(error =>{ console.log(error.message);  })
        semestreSeleccionada.lista_coordinadores.push(nn);
      
    }

    const coordRegElim =()=>{
      //buscaremos a los que registraremos
      console.log(coordRegist);
      coordinadores.forEach((element) => {
          var index = coordRegist.indexOf(element);
          if(index === -1){ //no encontro al coordSelec en los registrados
              //se registrará 
              var indexa = coordAReg.indexOf(element);
              if(indexa === -1){
                coordAReg.push(element);}
          }
      })

      //buscaremos a los que eliminaremos
      coordRegist.forEach((element) => {
          var index = coordinadores.indexOf(element);
          if(index === -1){ //no encontro al registrado previamente en los coordSelec
            //se eliminará 
            var indexa = coordElim.indexOf(element);
              if(indexa === -1){
                coordElim.push(element);}
        }
      })

    }

    const cerrarPut=()=>{
        closeEditadoModal();
        navigate("../gestion/gesSemestre");
    }

    //Lista los coordinadores de ese semestre
    const petitionCoord=async()=>{
        await axios.get(urlComi+"GetComiteTesisXIdSemestre?idSemestre=" +parseInt(id))
        .then(response=>{
          console.log("coordinadores");
          console.log(response);
          datos = response.data;
          setCoord(response.data);
          coordRegist = Object.assign(lista, datos);
          console.log(coordRegist)
        }).catch(error =>{
          console.log(error.message);
        })
    }

    //elimina coordinador en ese semestre
    const peticionDelete=async()=>{
        await axios.delete(urlSemComi+ "DeleteSemestreXComiteTesis?idSemestre="+ parseInt(id) + "&idComiteTesis=" + coordinadorSeleccionada.idComiteTesis).then(response=>{
          setCoord(data.filter(coordinador=>coordinador.idComiteTesis!==coordinadorSeleccionada.idComiteTesis));
          closeDeleteModal();
          openConfirmModal();
          petitionCoord();
        })
    }

    //Selección entre modificar o insertar
    const peticionSelecter =()=>{
        if(id==='0'){           
          openPostModal();
        }
        else{
          openEditModal();  
        }
    }

  //Carga semestre a modificar
    const cargarSemestre=async()=>{
        var ide;
        if(id!=='0'){
            petitionCoord();
            const response = await axios.get(url+"GetSemestreXId?idSemestre="+parseInt(id));
            setModificar(1);
            console.log("response inicios");
            console.log(response);
            ide = response.data[0].idEspecialidad;
            setSemestreSeleccionada({
                idSemestre: response.data[0].idSemestre,
                nombre: response.data[0].nombre,
                anho: response.data[0].anho,
                numSemestre: response.data[0].numSemestre,
                fechaInicio: new Date( response.data[0].fechaInicio),
                fechaFin: new Date(response.data[0].fechaFin),
                idEspecialidad: response.data[0].idEspecialidad,
                enCurso: response.data[0].enCurso,
                lista_coordinadores: [],
              }
                
            );
            setSubtitulo("Modificar Semestre Académico");
            cargaNombre(response.data[0].idEspecialidad)
            console.log(semestreSeleccionada);
            console.log("response fin");
            setFechaIni(new Date( response.data[0].fechaInicio));
            setFechaFin(new Date(response.data[0].fechaFin));
            semestreSeleccionada.lista_coordinadores.push(nn)
        }
        else{
          setModificar(0);
        }
    }

    

    const handleListPress = () => {
        setListar((isVisible) => !isVisible);
      };

     const seleccionarCoordinador=(coord)=>{
        setCoordinadorSeleccionada(coord);
        openDeleteModal();
    }

    const cambio = (selectedIds) => {
      setForceSelectionIdxs(selectedIds);
      console.log("Hola");
      console.log(selectedRows);
      console.log(forceSelectionIdxs);
    } 

    const cambioFacu =e=>{
      setFac( parseInt(e.target.value));
    }

    useEffect(()=>{
      console.log(id)

        cargarSemestre();
    },[])

    useEffect(() => {  //para user
        setTableData(data);
      }, [data]);
    
    useEffect(() => {     //para user
        const selected = tableData.filter((idxn, idx) => {
          return Object.keys(forceSelectionIdxs).some((id) => {
            return idx === Number(id);
          });
        });
        setSelectedRows(selected);
    }, [forceSelectionIdxs, tableData]);


    const nextPage = () =>{
      if(coordinadores.length>=currentPage) //VER CODIGO
      SetCurrentPage(currentPage+5);
    }
    const previousPage =() =>{
        if(currentPage>0)
        SetCurrentPage(currentPage-5);
    }

    //const [coordinadores, setCoord] = useState([]);   //tiene los coordinadores del usuario en modificar
    const [show, setShow] = useState(false);
    const [selectCoord, setSelectCoord] =useState([]);
    const [docentes, setDocentes] = useState({
      idComiteTesis: 0,
      nombres: '',
      apeMat: '',
      correo: '',
      codigoPUCP: 0,

      esCoordinador: '',
      imagen: '',
      esDocente: 0,
      apePat: '',
    })

    const [edit, SetEdit] = useState(0);
    const quitaCoord=(elemento)=>{
      var index = coordinadores.indexOf(elemento);
      console.log("quitaCoord de fsdc")
      console.log(index);
      coordinadores.splice(index,1);
      SetEdit(!edit);
    }

    const agregarDatos=(doc1)=>{
      console.log("agregar datos");
      if(docentes.idUsuario == 0) return;
      console.log(doc1);
      let variable  = false;
      //busca si ya está ingresado
      coordinadores.forEach((element) =>{
        if(element.idComiteTesis === doc1.idComiteTesis){
            variable = element.idComiteTesis === doc1.idComiteTesis;
            console.log(variable);
        }
      })
      if(!variable){
        console.log("se hace push");
        coordinadores.push(doc1);
      }       
      setDocentes({
        idComiteTesis: 0,
        nombres: '',
        apeMat: '',
        correo: '',
        codigoPUCP: 0,

        esCoordinador: '',
        imagen: null,
        esDocente: 0,
        apePat: '',
      })
      console.log(coordinadores);
      console.log(coordReg);
      console.log(coordRegist);
      console.log(datos);
      console.log("fin agregar datos");
    }

    

    const cargaDatosFechas=()=>{
      semestreSeleccionada.fechaInicio = fechaIni;
      semestreSeleccionada.fechaFin = fechaFin;
  }
    
    const handleChangeCoord = e =>{
      setSelectCoord({
          ...selectCoord,
          [e.target.name]: e.target.value
      })
    /*
      const handleChange = e =>{
      setTemaTesis({
          ...temaTesis,
          [e.target.name]: e.target.value
      })*/
    }

  return (
    <div class=" CONTAINERADMIN">

            <div class="row">
                <p class="HEADER-TEXT1">Gestión de Semestres Académicos</p>
                <p class="HEADER-TEXT2">{subTitulo}</p>
            </div> 

            <div class="row DATOS">


                <div class="col-4" >
                  <div class="  fs-5 fw-normal  mb-1 ">Seleccione año</div>
                  <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelectAnio} selected value = {semestreSeleccionada.anho}>
                    <option value={year}>{year}</option> 
                    <option value={year+1}>{year+1}</option> 
                    <option value={year+2}>{year+2}</option>  
                    <option value={year+3}>{year+3}</option>   
                       
                  </select>
                </div>

                <div class="col-4" >
                  <div class="  fs-5 fw-normal  mb-1 ">Seleccione semestre</div>
                  <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelectSem} selected value = {semestreSeleccionada.numSemestre}>
                    <option value={1}>1</option>  
                    <option value={2}>2</option> 
                  </select>
                </div>

                

                <div class= "col-4">
                    <div class="fs-5 fw-normal  mb-1 ">Fecha de inicio</div>
                    <div class="mb-3 FILTRO-FECHA">
                        <DatePicker onChange={setFechaIni} value={fechaIni} />
                    </div>
                </div>

                <div class= "col-4">
                    <div class="fs-5 fw-normal  mb-1 ">Fecha fin</div>
                    <div class="mb-3 FILTRO-FECHA">
                    <DatePicker onChange={setFechaFin} value={fechaFin} />
                    </div>
                </div>
                <p></p>
                
            </div>
            <ModalPregunta
                isOpen={isOpenDeleteModal} 
                closeModal={closeDeleteModal}
                procedimiento = "eliminar"
                objeto="al coordinador"
                elemento={coordinadorSeleccionada && coordinadorSeleccionada.nombres}
                >
                <div align='center' class='d-grid gap-1 d-md-block justify-content-center sticky-sm-bottom'>
                    <Button class="btn  btn-success btn-lg" onClick={()=>peticionDelete()} >Confirmar</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button class="btn btn-danger btn-lg"  onClick={closeDeleteModal}>Cancelar</Button>
                </div>
            </ModalPregunta>

                        
            <ModalPregunta
              isOpen={isOpenEditModal} 
              closeModal={closeEditModal}
              procedimiento = "modificar"
              objeto="semestre académico"
              elemento={semestreSeleccionada && semestreSeleccionada.nombre}
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
              objeto="semestre académico"
              elemento={semestreSeleccionada && semestreSeleccionada.nombre}
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
                    <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>peticionSelecter()}><span>Guardar</span></button>
                    <button class="btn btn-primary fs-4 fw-bold   CANCELAR" type="button" onClick={()=>{navigate("../gestion/gesSemestre")}}><span>Cancelar</span></button>
                </div>
            </div>
    </div>
  )
}

export default DatosSemestre
