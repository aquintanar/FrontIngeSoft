import React, {useEffect, useState} from 'react';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import * as BsIcons from 'react-icons/bs';
import {  Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../stylesheets/Administrador.css'
import '../../stylesheets/DateRangePicker.css'
import '../../stylesheets/Calendar.css'
import "../../stylesheets/General.css";
import useModal from '../../hooks/useModals';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';

const url1= "http://34.195.33.246/api/Entregable/";

//const url1= "http://44.210.195.91/api/Entregable/";

function ListaEntregables()  {
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

     //Controla buscador--
    const buscador = e=>{
        setSearch(e.target.value);
    }

    //------
    const [currentPage,SetCurrentPage] = useState(0);
    //-----------
    let navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [data, setData]=useState([]);
    const [fil, setFil] = useState(0);
    const [fechas, setFechas] = useState([new Date(),new Date()]);
    const [isOpenDeleteModal, openDeleteModal ,closeDeleteModal ] = useModal();
    const [isOpenConfirmModal, openConfirmModal ,closeConfirmModal ] = useModal();
    const [numTesis, setNumTesis] = useState([]);    

    let filtrado =[];
    
    if(!search && !fil  && !fechas){//sin filtro
      filtrado=data;
    }
    else{
      if(search && fil && fechas){//ambos filtros
        filtrado = data.filter(element => {
          let ok =false;
          const fec = Date.parse(element.fechaLimite);
          if(fechas[1]>=fec && fec>=fechas[0]){
            ok = true;
          }
          return ok;
        });
        filtrado=filtrado.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
        filtrado=filtrado.filter((dato)=>dato.fidTipoEntregable===fil) ;
      }
      else{
        if(search && fil ){
          filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
          filtrado=filtrado.filter((dato)=>dato.fidTipoEntregable===fil) ;
        }
        else if(fil && fechas){
          filtrado = data.filter(element => {
            let ok =false;
            const fec = Date.parse(element.fechaLimite);
            if(fechas[1]>=fec && fec>=fechas[0]){
              ok = true;
            }
            return ok;
          });
          filtrado=filtrado.filter((dato)=>dato.fidTipoEntregable===fil) ;
        }
        else if(search && fechas){
          filtrado = data.filter(element => {
            let ok =false;
            const fec = Date.parse(element.fechaLimite);
            if(fechas[1]>=fec && fec>=fechas[0]){
              ok = true;
            }
            return ok;
          });
          filtrado=filtrado.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
        }
        else{
          if(fil)//filtro por facultad
           filtrado=data.filter((dato)=>dato.fidTipoEntregable===fil) ;
          if(search)//filtro por nombre
            filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
          if(fechas)
            filtrado = data.filter(element => {
              let ok =false;
              const fec = Date.parse(element.fechaLimite);
              if(fechas[1]>=fec && fec>=fechas[0]){
                ok = true;
              }
              return ok;
            });
        }
      }
    }

    filtrado = filtrado.slice(currentPage,currentPage+5);


    //Controla cambio en combo box--
    const cambioSelect =e=>{
      const valor = parseInt(e.target.value)
      setFil(valor)
    }

    const nextPage = () =>{
        if(filtrado.length>=5) //VER CODIGO
        SetCurrentPage(currentPage+5);
    }
    const previousPage =() =>{
        if(currentPage>0)
        SetCurrentPage(currentPage-5);
    }

    const seleccionarEntregable=(entregable)=>{
        setEntregableSeleccionado(entregable);
        openDeleteModal();
    }

    const infoCurso = async () => {
      const response = await axios
        .get(
          "http://34.195.33.246/api/Curso/BuscarCursoXId",
          { params: { idCurso: localStorage.getItem("idCurso") } },
          {
            _method: "GET",
          }
        )
        .then((response) => {
          setNumTesis(response.data[0].numTesis);
          
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    //Listar entregable tabla--
    const peticionGet=async()=>{
      await axios.get(url1+"ListEntregablesXIdCurso?idCurso="+localStorage.getItem('idCurso'))
      .then(response=>{
        setData(response.data);
        
      }).catch(error =>{
        console.log(error.message);
      })
    }
    //Eliminar un entregable--
    const peticionDelete=async()=>{
      await axios.delete(url1+ "DeleteEntregable?idEntregable="+entregableSeleccionado.idEntregable).
      then(response=>{
        setData(data.filter(entregable=>entregable.idEntregable!==entregableSeleccionado.idEntregable));
        closeDeleteModal();
        openConfirmModal();
      })
    }

    useEffect(()=>{
      peticionGet();
      infoCurso();
      setFechas(0);
    },[])

    return (      
        <div class=" CONTAINERADMIN">   
    
        <h1>Gestión de entregas y presentaciones</h1>
        <h2>Búsqueda de entregas o presentaciones</h2>
   
        <div class="row">
              <div class="col " >
                  <p>Ingresar nombre de la entregas o presentación</p>
                  <div class="input-group  ">
                      <input size="10" type="search" value={search} class="form-control icon-search" name="search" placeholder="Nombre de la entrega o presentación" aria-label="serach" onChange={buscador}/>
                  </div>
              </div>
        </div>

        <div class="row">
              <div class="col-6 FILTRO-FECHA" >
                  <p>Rango de Fechas</p>
                  <DateRangePicker onChange={setFechas} value={fechas} />
              </div>

              <div class="col-lg-3 " >
                <p>Tipo</p>
                {(() => {
                  switch(numTesis){
                    case 1 : return <select select class="form-select  "  aria-label="Default select example" onChange={cambioSelect} 
                    id="fidTipoEntregable" name="fidTipoEntregable" >  
                        <option key={0} selected value={0}>Todos</option>
                        <option key={1} value={1}>Entregable parcial</option>
                        <option key={2} value={2}>Entregable</option>
                        <option key={3} value={3}>Exposición</option>
                        <option key={4} value={4}>Entregable Final</option>
                    </select>;
                    case 2: return <select select class="form-select  "  aria-label="Default select example" onChange={cambioSelect} 
                    id="fidTipoEntregable" name="fidTipoEntregable" >  
                        <option key={0} selected value={0}>Todos</option>
                        <option key={5} value={5}>Exposiciones</option>
                        <option key={6} value={6}>Exposición Parcial</option>
                        <option key={7} value={7}>Exposición Final</option>
                        <option key={8} value={8}>Documento Parcial</option>
                        <option key={9} value={9}>Documento Final</option>
                    </select>;
                    
                  }
                }) ()}
              </div>
        </div>
  
          <h2>Lista de entregas y presentaciones</h2>
          <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
          <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
          <div class = "row LISTAR-TABLA">
            <div class=" col-12 ">
              <table className='table fs-6 '>
                <thead class >
                  <tr class>
                      <th style ={{width: 275}}>Nombre</th>
                      <th style = {{width:100}}>Tipo</th>
                      <th style = {{width:100}}>Fecha Límite</th>
                      <th style = {{width:100}}>Acciones</th>
                  </tr>
                </thead>
                <tbody >
                  {filtrado.map(entregable => (
                    <tr key={entregable.idEntregable}>
                        <td >{entregable.nombre}</td>    
                        <td>{entregable.tipoEntregable}</td>                
                        <td>{entregable.fechaLimite.substr(0,10)}</td>
                        <td>
                        <button title='Modificar entrega o presentación' class="btn BTN-ACCIONES" onClick={()=>{navigate("menu/"+entregable.idEntregable)}}> <FaIcons.FaEdit /></button>
                        <button  title='Eliminar entrega o presentación' class=" btn BTN-ACCIONES" onClick={()=>seleccionarEntregable(entregable)}> <BootIcons.BsTrash /></button>
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
            objeto={entregableSeleccionado.fidTipoEntregable===4? "la exposición":"la entrega" }
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
          
          <div className='INSERTAR-BOTONES'>
              <button title="Registrar entrega o presentación" className='btn REGISTRAR' onClick={()=>{navigate("menu/0")}}><span>Registrar</span></button>
          </div>             
        </div>              
    )
}

export default ListaEntregables;