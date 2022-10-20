import React, { useMemo,useState, useEffect } from 'react';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import "./buttonGroup.css";
import  '../../stylesheets/Asesor.css';
import { useTable ,useFilters} from 'react-table';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

function AlumnosAsesorados() {
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [filterInput, setFilterInput] = useState("");
    useEffect(() => {
      getData();
    }, []);
 
    async function getData() {
      (async () => {
        const result = await axios("http://44.210.195.91/api/Alumno/ListAlumnosXIdAsesor?idAsesor=2");
        setData(result.data);
        console.log(data)
      })();
    };

    const columns = React.useMemo(
        () => [
          {
            Header: 'Apellido(s) / Nombre',
            accessor: d => `${d.apePat} ${d.nombres}`, // accessor is the "key" in the data
          },
          {
            Header: 'Tema Tesis',
            accessor: 'correo',
          },

        ],
        []
    )
    const handleFilterChange = e => {
      const value = e.target.value || undefined;
      setFilter("apePat", value);
      setFilterInput(value);
    };
   
   
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      setFilter // The useFilter Hook provides a way to set the filter
    } = useTable(
      {
        columns,
        data
      },
      useFilters // Adding the useFilters Hook to the table
      // You can add as many Hooks as you want. Check the documentation for details. You can even add custom Hooks for react-table here
    );
    return(
  
        <div className='CONTAINERASESOR'>
        <h1 className='HEADER-TEXT1'>Alumnos Asesorados</h1>
        <h2 className='HEADER-TEXT2'>TESIS 1 - INGENIERIA INFORMATICA</h2>
        <input
    value={filterInput}
    onChange={handleFilterChange}
    placeholder={"Search"}
        />
        <table   {...getTableProps()} style={{minWidth: 650, borderCollapse: 'separate',
    borderSpacing: '0px 20px'}}>
         <thead>
         {headerGroups.map(headerGroup => (
             <tr {...headerGroup.getHeaderGroupProps()}>
               {headerGroup.headers.map(column => (
                   <th
                       {...column.getHeaderProps()}
                       style={{
                         borderBottom: 'solid 3px darkblue',
                         color: 'black',
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
               <tr {...row.getRowProps()} onClick={() =>navigate("alumnoSeleccionado",{state:{idAlumno:row.original.idAlumno,nombres:row.original.nombres,apellidoPat:row.original.apePat,apellidoMaterno:row.original.apeMat}})}>
                 {row.cells.map(cell => {
                   return (
                       <td
                           {...cell.getCellProps()}
                           style={{
                             padding: '12px',
                             border: 'solid 1px gray',
                           }}
                       >
                         {cell.render('Cell')}
                       </td>
                   )
                 })}
               </tr>
           )
         })}
         </tbody>
       </table>
        </div>
    );

}
export default  AlumnosAsesorados;