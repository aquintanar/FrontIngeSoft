import React, { useMemo,useState, useEffect } from 'react';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import  '../../stylesheets/Profesor.css';
import { useTable ,useFilters,setFilter} from 'react-table';
import axios from 'axios';
import {  useNavigate ,useLocation} from 'react-router-dom';
import * as BsIcons from 'react-icons/bs';
import { NonceProvider } from 'react-select';

function Alumnos() {
    let navigate = useNavigate();
    const location = useLocation();
    let [dataI, setDataI] = useState([]);
    let [curso, setCurso] = useState([]);
    const [currentPage,SetCurrentPage] = useState(0);
    const [search1, setSearch1] = useState("");
    const [search2, setSearch2] = useState("");

  
    useEffect(() => {
      getDataI();
      getCurso();
    }, []);
 
    async function getDataI() {
      (async () => {
        const result = await axios(`https://localhost:7012/api/Alumno/ListAlumnosXIdCurso?idCurso=${localStorage.getItem('idCurso')}`);
        //const result = await axios("http://44.210.195.91/api/Alumno/ListAlumnosXIdCurso?idCurso=1");
        setDataI(result.data);
      })();
    };

    async function getCurso() {
      (async () => {
        const result = await axios(`https://localhost:7012/api/Curso/BuscarCursoXId?idCurso=${localStorage.getItem('idCurso')}`);
        //const result = await axios("http://44.210.195.91/api/Curso/BuscarCursoXId?idCurso=");
        setCurso(result.data[0]);
      })();
    };
  
    const columns = React.useMemo(
        () => [
          {
            Header: 'Apellido(s) / Nombre',
            accessor: d => `${d.apePat} ${d.nombres}`, // accessor is the "key" in the data
            Cell: ({ value }) => (
              <button class="btn btn-lg navbar-toggle"> {value}
              </button>
            )
          },
          {
            Header: 'Correo',
            accessor: 'correo',
            Cell: ({ value }) => (
              <button class="btn btn-lg navbar-toggle"> {value}
              </button>
            )
          },
          {
            Header: 'Código Pucp',
            accessor: 'codigoPucp',
            Cell: ({ value }) => (
              <button class="btn btn-lg navbar-toggle"> {value}
              </button>
            )
          },

        ],
        []
    )
      //Controla buscador--
    const buscador1 = e=>{
      setSearch1(e.target.value);
    }
    const buscador2 = e=>{
      setSearch2(e.target.value);
    }

    let data =[];

    if(!search1 && !search2){//sin filtro
    data=dataI;
  }
  else{
    if(search1 && search2){//ambos filtros
      data=dataI.filter((dato)=>{
        let a = dato.nombres + " " + dato.apePat + " " + dato.apeMat
        console.log(a)
        return a.toLowerCase().includes(search1.toLocaleLowerCase());
      }) ;
      data=data.filter((dato)=>dato.codigoPucp.includes(search2)) ;
    }
    else{
      if(search1)
        data=dataI.filter((dato)=>{
          let a = dato.nombres + " " + dato.apePat + " " + dato.apeMat
          console.log(a)
          return a.toLowerCase().includes(search1.toLocaleLowerCase());
        }) ;
      if(search2)
        data=data.filter((dato)=>dato.codigoPucp.includes(search2)) ;
    }
  }
    data = data.slice(currentPage,currentPage+4);
    console.log(data);
    const nextPage = () =>{
      if(data.length>=currentPage) //VER CODIGO
        SetCurrentPage(currentPage+4);
    }
    const previousPage =() =>{
      if(currentPage>0)
        SetCurrentPage(currentPage-4);
    }
   
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      //setFilter, // The useFilter Hook provides a way to set the filter
    } = useTable(
      {
        columns,
        data:data,
      },
      //useFilters, // Adding the useFilters Hook to the table

    );
    return(
  
        <div className='CONTAINERASESOR'>
        <h1 >Alumnos</h1>
        <h2 >{curso.nombre} - {curso.nombreEspecialidad}</h2>
      
        <div className="row " >
          <div class= "col-6">
              <p>Ingresar nombre del alumno</p>
              <input size="10" type="search" value={search1} class="form-control icon-search" name="search1" placeholder="Nombre del alumno" aria-label="serach" onChange={buscador1}/>
          </div>
          <div class= "col-6"> 
              <p>Ingresar código del alumno</p>
              <input size="10" type="search" value={search2} class="form-control icon-search" name="search2" placeholder="Código del alumno" aria-label="serach" onChange={buscador2}/>
          </div>
        </div>

          <div className="ContenidoPrincipal">
            <h2>Seleccione un alumno para ver su portafolio de entregables/asignarle un jurado:</h2>
        <button onClick={previousPage} className="PAGINACION-BTN"><BsIcons.BsCaretLeftFill/></button>
        <button onClick={nextPage} className="PAGINACION-BTN"><BsIcons.BsCaretRightFill/></button>
        <table   {...getTableProps()} style={{minWidth: 650, borderCollapse: 'separate',
    borderSpacing: '0px 10px'}}>
         <thead>
         {headerGroups.map(headerGroup => (
             <tr {...headerGroup.getHeaderGroupProps()}>
               {headerGroup.headers.map(column => (
                   <th
                       {...column.getHeaderProps()}
                       style={{
                         borderBottom: 'solid 3px darkblue',
                         color: '#031D45',

                       }}
                   >
                     {column.render('Header')}
                   </th>
               ))}
             </tr>
         ))}
         </thead>
         <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
               <tr {...row.getRowProps()}  style={{cursor:"pointer" }} onClick={() =>navigate("alumnoSeleccionado",{state:{idAlumno:row.original.idAlumno,nombres:row.original.nombres,apellidoPat:row.original.apePat,apellidoMat:row.original.apeMat}})}>
               
                 {row.cells.map(cell => {
                   return (
                       <td
                           {...cell.getCellProps()}
                           style={{
                             padding: '12px',
                             border: 'solid 1px gray',
                             borderLeft: "none",
                             borderRight: "none",
                           }}
                           
                       >
                         {cell.render('Cell') }
                       </td>
                   )
                 })}
               </tr>
           )
         })}
         </tbody>
       </table>
       </div>
        </div>
    );

}
export default  Alumnos;