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
import * as BootIcons  from "react-icons/bs";

const url= "https://localhost:7012/api/Semestre/";
const urlFacu= "https://localhost:7012/api/Facultad/";
const urlEsp= "https://localhost:7012/api/Especialidad/";
const urlUser= "https://localhost:7012/api/Asesor/";
const urlComi= "https://localhost:7012/api/ComiteTesis/";
const urlSemComi= "https://localhost:7012/api/SemestreXComiteTesis/";


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

function DatosSemestre() {
  let navigate = useNavigate();
  let {id} = useParams();
  const [facus, setFacus] = useState([]);
  const [esp, setEsp] = useState([]);
  const [espBus, setEspBus] = useState([]);
  const [subTitulo,setSubtitulo] = useState("Nuevo Semestre");
  const [modificar, setModificar] = useState([0]);
  const [coordinadores, setCoord] = useState([]);
  const [list, setListar] = useState(true);
  const [docentes, setDocentes] = useState([]);

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

  //Objeto semestre
  const [semestreSeleccionada, setSemestreSeleccionada]=useState({
      idSemestre: 0,
      nombre: "",
      anho: year,
      enCurso: true,
      numSemestre: 1,
      idEspecialidad: 0,
      lista_coordinadores: selectedRows
  });

  const [coordinadorSeleccionada, setCoordinadorSeleccionada]=useState({
    idComiteTesis: 0,
    nombres: ''
    }); 



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
        nombre: semestreSeleccionada.anho + "-" + semestreSeleccionada.numSemestre + "-"
      }))
      console.log(semestreSeleccionada);
    }

    //Control de cambio en select de anio
    const cambioSelectAnio =e=>{
        setSemestreSeleccionada(prevState=>({
        ...prevState,
          anho: e.target.value,
        }))
        console.log(semestreSeleccionada);
      }

      //Control de cambio en select de semestre
      const cambioSelectSem =e=>{
        setSemestreSeleccionada(prevState=>({
        ...prevState,
          numSemestre: e.target.value,
        }))
        console.log(semestreSeleccionada);
      }

    //Control de cambio en select de especialidad
    const cambioSelectEsp =e=>{
        setSemestreSeleccionada(prevState=>({
        ...prevState,
          idEspecialidad: e.target.value,
          nombre: semestreSeleccionada.anho + "-" + semestreSeleccionada.numSemestre + "-" 
        }))
        console.log(semestreSeleccionada);
        
      }

    //Lista facultades combo box--
    const petitionFacu=async()=>{
        await axios.get(urlFacu+"GetFacultades/")
        .then(response=>{
            setFacus(response.data);
        }).catch(error =>{
            console.log(error.message);
        })
    }

    //Lista especialidades combo box--
    const petitionEsp=async()=>{
        await axios.get(urlEsp+"GetEspecialidades/")
        .then(response=>{
        setEsp(response.data);
        }).catch(error =>{
        console.log(error.message);
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

    //Lista de asesores
    const petitionUser=async()=>{
        await axios.get(urlUser+"GetAsesores/")
        .then(response=>{
          console.log(response);
          setData(response.data);
        }).catch(error =>{
          console.log(error.message);
        })
    }

    //Insertar nuevo semestre--
    const peticionPost=async()=>{
        await axios.post(url+"PostSemestre",semestreSeleccionada,{
            _method: 'POST'
        })
          .then(response=>{
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
        /*await axios.post(url+"ModifySemestre", semestreSeleccionada),{
          method: 'PUT', 
        })
          .then(response=>{
          closeEditModal();
          openEditadoModal();
        }).catch(error =>{
        console.log(error.message);
        })*/
    }

    const cerrarPut=()=>{
        closeEditadoModal();
        navigate("../gestion/gesSemestre");
    }

    //Lista los coordinadores de ese semestre
    const petitionCoord=async()=>{
        await axios.get(urlComi+"GetComiteTesisXIdSemestre?idSemestre=" +parseInt(id))
        .then(response=>{
          console.log(response);
          setCoord(response.data);
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
        petitionEspBusc();
        semestreSeleccionada.nombre = semestreSeleccionada.anho + "-" + semestreSeleccionada.numSemestre + "-" + espBus
        if(id==='0'){           
          openPostModal();
        }
        else{
          openEditModal();  
        }
    }

  //Carga semestre a modificar
    const cargarSemestre=async()=>{
        if(id!=='0'){
            petitionCoord();
            const response = await axios.get(url+"GetSemestreXId?idSemestre="+parseInt(id));
            setModificar(1);
            setSemestreSeleccionada({
                idSemestre: response.data[0].idSemestre,
                nombre: response.data[0].nombre,
                anho: response.data[0].anho,
                numSemestre: response.data[0].numSemestre,
                idEspecialidad: response.data[0].idEspecialidad,
                estado: response.data[0].estado}
            );
            setSubtitulo("Modificar Semestre");
            
        }
        else{
          setModificar(0);
        }
    }

    const COlumns = useMemo(() => [     //para user
      { Header: "ID",        accessor: "idUsuario", },
      { Header: "Nombres",          accessor: "nombres", },
      { Header: "Apellido Materno", accessor: "apeMat", },
    ], [data]);

    const handleListPress = () => {
        setListar((isVisible) => !isVisible);
      };

     const seleccionarCoordinador=(coord)=>{
        setCoordinadorSeleccionada(coord);
        openDeleteModal();
    }

    useEffect(()=>{
        petitionFacu();
        petitionEsp();
        cargarSemestre();
        petitionUser();
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


  return (
    <div class=" CONTAINERADMIN">

            <div class="row">
                <p class="HEADER-TEXT1">Gestión General</p>
                <p class="HEADER-TEXT2">Gestión de Semestre - {subTitulo}</p>
            </div> 

            <div class="row DATOS">

                <div class="col-4" >
                    <div class="text-start fs-5 fw-normal  mb-1">Seleccione Facultad</div>
                    <div class="input-group mb-3 ">
                        <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelect} >
                        <option selected value = "0">Todos</option>
                            {facus.map(elemento=>(
                              <option key={elemento.idFacultad} value={elemento.idFacultad}>{elemento.nombre}</option>  
                            ))} 
                        </select>
                    </div>
                </div>

                <div class="col-4" >
                  <div class="  fs-5 fw-normal  mb-1 ">Seleccione año</div>
                  <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelectAnio} selected value = {semestreSeleccionada.anho}>
                    <option value={year}>{year}</option> 
                    <option value={year+1}>{year+1}</option>     
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
                  <div class="fs-5 fw-normal  mb-1 ">Seleccione especialidad</div>
                  <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelectEsp} selected value = {semestreSeleccionada.idEspecialidad}>
                      <option selected value = "0">Todos</option>
                      {esp.map(elemento=>(
                        <option key={elemento.idEspecialidad} value={elemento.idEspecialidad}>{elemento.nombre}</option>  
                      ))} 
                    </select>
                </div>

            </div>

            {modificar ? 
                <table>
                    <thead>
                        <tr>
                            <th style={{width: 100}}>ID</th>
                            <th style ={{width: 250}}>Nombre</th>
                            <th style = {{width:250}}>E-mail</th>
                            <th style = {{width:100}}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coordinadores.map(coord =>(
                            <tr key={coord.idComiteTesis}>
                                <td >{coord.idComiteTesis}</td>
                                <td >{coord.nombres} {coord.apePat} {coord.apeMat}</td>
                                <td >{coord.correo}</td>
                                <td>
                                    <button  className=" btn" onClick={()=>seleccionarCoordinador(coord)}> <BootIcons.BsTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> : null
            }

            <p>   </p>
            <div class="row">
                <div class="col-sm-6">
                    <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header >Coordinadores Seleccionados</Accordion.Header>
                        <Accordion.Body>
                        
                        <table class= "">
                            <thead class = "fs-5">
                            <tr class>
                                <th style={{width: 100}}>ID</th>
                                <th style ={{width: 150}}>Nombre</th>
                                <th style = {{width:100}}>E-mail</th>
                            </tr>
                            </thead>
                            <tbody class= "fs-5">
                            {selectedRows.map(docente => (
                                <tr key={docente.idUsuario}>
                                    <td >{docente.idUsuario}</td>
                                    <td >{docente.nombres} {docente.apeMat}</td>                    
                                    <td>{docente.correo}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                </div>
                
                <div class="col-sm-6">
                    <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Lista de docentes</Accordion.Header>
                        <Accordion.Body>
                            <div class = 'row'>
                            <div class = 'col-4'>
                                <div class="text-start fs-6 mb-1 fw-normal ">Ingresar nombre del usuario:</div>
                            </div>
                            <div class = 'col-8'>
                                <div class="col-2 input-group mb-3 ">
                                <input type="text" placeholder="Ingresar nombre de usuario" class="form-control" aria-label="Especialidad" 
                                        aria-describedby="button-addon2" onChange={(e) => { setSearchKeyword(e.target.value); }}/>
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2" >Buscar</button>
                                </div>
                            </div>
                            </div>

                            <div>
                            <DataTable class="fs-6" columns={COlumns} data={data} onChangeSelectedRowsId={(selectedIds) => { setForceSelectionIdxs(selectedIds); }} searchKeyword={searchKeyword}/>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                </div>
            </div>

            <p>   </p>

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
                    <button class="btn btn-primary fs-4 fw-bold   CANCELAR" type="button" onClick={()=>{navigate("../gestion/gesSemestre")}}><span>Cancelar</span></button>
                    <button class="btn btn-primary fs-4 fw-bold GUARDAR" type="button" onClick={()=>peticionSelecter()}><span>Guardar</span></button>
                </div>
            </div>
    </div>
  )
}

export default DatosSemestre
