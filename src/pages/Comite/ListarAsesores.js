import React, {useEffect, useState} from 'react';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Comite.css'
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as BsIcons from 'react-icons/bs';
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';

const urlAs= "https://localhost:7012/api/Asesor/";
const urlEsp= "https://localhost:7012/api/Especialidad/";

function ListarAsesores()  {
    let navigate = useNavigate();
    const [currentPage,SetCurrentPage] = useState(0);
    const [data, setData]=useState([]);
    const [selEsp, setSelEsp] = useState(0);
    const [tieneAlumn, setTieneAlum] = useState(0);
    const [observado, setObservado] = useState(0);
    const [search, setSearch] = useState("");
    const [as, setAs] = useState([]);
    const [esp, setEsp] = useState([]);
    const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
    const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();

    let filtrado =[];
    const buscador = e=>{
        setSearch(e.target.value);
    }
    /*
    if(!search && !selFac){//sin filtro
      filtrado=data;
    }
    else{
      if(search && selFac && selSem && selEsp){//ambos filtros
        filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
        filtrado=data.filter((dato)=>dato.idFacultad===selFac) ;
        filtrado=data.filter((dato)=>dato.idSemestre===selSem) ;
        filtrado=data.filter((dato)=>dato.idEspecialidad===selEsp) ;
      }
      if(selFac)//filtro por facultad
      filtrado=data.filter((dato)=>dato.idFacultad===selFac) ;
      if(selSem)//filtro por facultad
      filtrado=data.filter((dato)=>dato.idSemestre===selSem) ;
      if(selEsp)//filtro por facultad
      filtrado=data.filter((dato)=>dato.idEspecialidad===selEsp) ;
      if(search)//filtro por nombre
        filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
    }*/

    const cambioSelectEspp =e=>{
        const valor = parseInt(e.target.value)
        setSelEsp(valor)
      }
    const cambioTieneAlum =e=>{
        const valor = parseInt(e.target.value)
        setTieneAlum(valor)
    }
    const cambioEstaObservado =e=>{
        const valor = parseInt(e.target.value)
        setObservado(valor)
    }

    const nextPage = () =>{
          if(filtrado.length>=currentPage) //VER CODIGO
          SetCurrentPage(currentPage+5);
      }
    const previousPage =() =>{
          if(currentPage>0)
          SetCurrentPage(currentPage-5);
      }
  
    const seleccionarAsesor=(asesor)=>{
        setAsesorSeleccionado(asesor);
          openDeleteModal();
      }
      
    

    filtrado = filtrado.slice(currentPage,currentPage+5);

    const [asesorSeleccionado, setAsesorSeleccionado]=useState({
        idUsuario: 0,
        nombres: '',
        apeMat: '',
        correo: '',
        codigoPUCP: '',
        imagen: '',
        maxAsesorados: 0,
        estaObservado: 0,
        estado: 1
    })

    const petitionAs=async()=>{
        await axios.get(urlAs+"GetAsesores/")
        .then(response=>{
        setAs(response.data);
        }).catch(error =>{
        console.log(error.message);
        })
    }
    
      const petitionEsp=async()=>{
        await axios.get(urlEsp+"GetEspecialidades/")
        .then(response=>{
          setEsp(response.data);
        }).catch(error =>{
          console.log(error.message);
        })
      }

    
      const peticionDelete=async()=>{
        await axios.delete(urlAs+ "DeleteAsesor?idAsesor="+ asesorSeleccionado.idUsuario).then(response=>{
            petitionAs();
          closeDeleteModal();
          openConfirmModal();
        })
      }

    
    useEffect(()=>{
        petitionAs();
        petitionEsp();
    },[])

    return(
        <div className="CONTAINERCOMITE">
            <h1 className="HEADER-TEXT1">Asesores</h1>
            <div class="row">
              <div class="col-12 FILTRO-LISTAR-BUSCAR" >
                  <p>Ingrese el nombre del asesor</p>
                  <div class="input-group  ">
                      <input size="10" type="text" value={search} class="form-control" name="search" placeholder="Nombre del curso" aria-label="serach" onChange={buscador}/>
                  </div>
              </div>
              <div class="col-4 FILTRO-LISTAR" >
                  <p>Seleccione especialidad</p>
                  <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelectEspp}>
                      <option selected value = "0">Todos</option>
                      {esp.map(elemento=>(
                        <option key={elemento.idEspecialidad} value={elemento.idEspecialidad}>{elemento.nombre}</option>  
                      ))} 
                  </select>
                </div>
                <div class="col-4 FILTRO-LISTAR" >
                  <p> ¿Tiene asesorado?</p>
                  <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioTieneAlum} value ={tieneAlumn}>
                        <option key={0} value = {0}>Todos</option>
                        <option key={1} value = {1}>Si</option>
                        <option key={2} value={2}>No</option>
                  </select>
                </div>
                <div class="col-4 FILTRO-LISTAR" >
                  <p> ¿Está observado?</p>
                  <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioEstaObservado} value ={observado}>
                        <option key={0} value = {0}>Todos</option>
                        <option key={1} value = {1}>Si</option>
                        <option key={2} value={2}>No</option>
                  </select>
                </div>
            </div>

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
                  {as.map(asesor => (
                    <tr key={asesor.idUsuario}>
                        <td >{asesor.nombres + " " + asesor.apeMat}</td>
                        <td >{asesor.correo}</td>
                        <td>
                        <button class="btn BTN-ACCIONES" onClick={()=>{navigate("DatosAsesor/"+asesor.idUsuario)}}> <FaIcons.FaEdit /></button>
                        <button class=" btn BTN-ACCIONES" onClick={()=>seleccionarAsesor(asesor)}> <BootIcons.BsTrash /></button>
                        <input type="checkbox" />
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <ModalPregunta
        isOpen={isOpenDeleteModal} 
        closeModal={closeDeleteModal}
        procedimiento = "eliminar"
        objeto="la especialidad"
        elemento={asesorSeleccionado && asesorSeleccionado.nombres}
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
export default ListarAsesores;