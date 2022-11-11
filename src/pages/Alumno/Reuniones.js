import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {  Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Administrador.css'
import '../../stylesheets/Alumno.css'
import useModal from '../../hooks/useModals';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import * as BsIcons from 'react-icons/bs';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';

const url= "http://34.195.33.246/api/ReunionAlumnoAsesor/";

function Reuniones()  {

    let navigate = useNavigate();
    const [fil, setFil] = useState(0);
    const [currentPage,SetCurrentPage] = useState(0);
    const [fechas, setFechas] = useState([new Date(),new Date()]);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

    let filtrado =[];

    if(!search && !fechas && !fil){   //sin filtro
      filtrado = data;
    }
    else{
      if(search && fechas && fil){    //tiene lo tres filtros activos
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
      }
      else{
        if(search && fil ){
          filtrado=data.filter((dato)=>dato.nombre.toLowerCase().includes(search.toLocaleLowerCase())) ;
          filtrado=filtrado.filter((dato)=>dato.estadoReunion===fil) ;
        }
        else if(fil && fechas){
          filtrado = data.filter(element => {
            let ok =false;
            const fec = Date.parse(element.fechaHoraInicio);
            if(fechas[1]>=fec && fec>=fechas[0]){
              ok = true;
            }
            return ok;
          });
          filtrado=filtrado.filter((dato)=>dato.estadoReunion===fil) ;
        }
        else if(search && fechas){
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

    const cambioSelectSt =e=>{
      const valor = parseInt(e.target.value)
      setFil(valor)
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

    //Listar reuniones tabla del alumno -
    const peticionGet=async()=>{
      await axios.get(url+ "BuscarReunionesXIdAlumnoYIdCurso?idAlumno=8&idCurso=1")       //cambiae
      //await axios.get(url+ "BuscarReunionesXIdAsesorYIdCurso?idAsesor="+reunionSeleccionada.idAsesor+ "&idCurso=" +reunionSeleccionada.idCurso)       //cambiae
      .then(response=>{
        setData(response.data);
        console.log("response.data");
        console.log(response.data);
      }).catch(error =>{
        console.log(error.message);
      })
    }

    useEffect(()=>{
      peticionGet();
      setFechas(0);
      
    },[])

  return (      
    <div class=" CONTAINERALUMNO">   

        <p class="HEADER-TEXT1">Reuniones</p>
        <p class="HEADER-TEXT2">Búsqueda de reuniones</p>

        <div class="col-lg-7 FILTRO-LISTAR-BUSCAR" >
              <div class="text-start fs-6  mb-1 fw-normal "><p>Ingresar nombre de la reunión</p></div>
              <div class="input-group mb-2 ">
                <input size="10" type="text" value={search} class="form-control" name="search" placeholder="Reunión" aria-label="serach" onChange={buscador}/>
              </div>
          </div>

        <div class="row">
            <div class="col-4 FILTRO-FECHA" >
                  <p>Rango de Fechas</p>
                  <DateRangePicker onChange={setFechas} value={fechas} />
            </div>
            <div class="col-4 DATOS" >
                <div class=" fs-4 fw-normal  mb-1 ">Estado</div>
                <select select class="form-select Cursor" aria-label="Default select example" onChange= {cambioSelectSt}>
                    <option  value = {0}>Todos</option>
                    <option  value = {1}>Asistió</option>
                    <option value = {2}>Tardanza</option>
                    <option  value = {3}>No asistió</option>
                    <option  value = {4}>Pendiente</option>
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
                      <th style ={{width: 215}}>Nombre</th>
                      <th style = {{width:215}}>Fecha de la reunión</th>
                      <th style = {{width:175}}>Descripción</th>
                      <th style = {{width:100}}>Estado</th>
                      <th style = {{width:120}}>Cant. de part.</th>
                      <th style = {{width:10}}></th>
                  </tr>
                </thead>
                <tbody >
                  {filtrado.map(reunion => (
                    <tr key={reunion.idReunion}>
                        <td>
                        <a class = "LINK" href= {reunion.enlace}  target="_blank">{reunion.nombre}</a>    
                        </td> 
                        <td>{reunion.fechaHoraInicio}</td>  
                        <td>{reunion.descripcion}</td>  
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

                        <td class="text-center">{reunion.cantParticipantes}</td>
                        <td>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
     
    </div>              
  )
}

export default Reuniones;