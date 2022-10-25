import React from 'react'
import './proponerTemaAsesor.css';
import {useState , useEffect} from "react";
import ModalBuscarAsesor from './ModalBuscarAsesor';
import {ModalConfirmación, ModalPregunta} from '../../components/Modals';
import useModal from '../../hooks/useModals';
import {  Button} from '@material-ui/core';
import { BrowserRouter as Router , Routes, Route, Link, useLocation } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';

function Entregables(){
    let navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState([]);
    useEffect(() => {
      getData();
    }, []);

 
    async function getData() {
      (async () => {
        const result = await axios(`https://localhost:7012/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno=${location.state.idAlumno}&idTipoEntregable=2`);
        //const result = await axios(`http://44.210.195.91/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno=${location.state.idAlumno}&idTipoEntregable=2`);
        setData(result.data);
        console.log(data)
      })();
    };
   
  
    const columns = React.useMemo(
        () => [
          {
            Header: 'Entregable',
            accessor: 'documentosAlumno',
          },
        ],
        []
    )
   
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data })
    return(
        <div className='CONTAINERASESOR'>
        <h1 className='HEADER-TEXT1'>Entregables</h1>
        <h2 className='HEADER-TEXT2'>Alumno - { location.state.apellidoPat }  {location.state.apellidoMat}, {location.state.nombres}</h2>
        <table   {...getTableProps()} style={{minWidth: 650, borderCollapse: 'separate',
    borderSpacing: '0px 15px'}}>
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
               <tr {...row.getRowProps()} onClick={() =>navigate("entregableSeleccionado",{state:{idAlumno:row.original.idAlumno,nombres:row.original.nombres,apellidoPat:row.original.apePat,
               apellidoMaterno:row.original.apeMat,tituloDoc:row.original.documentosAlumno,linkDoc:row.original.linkDoc,idEntregable:row.original.fidEntregable}})}>
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
export default  Entregables;