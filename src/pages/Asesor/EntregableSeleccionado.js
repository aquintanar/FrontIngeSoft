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

function EntregableSeleccionado(){
    let navigate = useNavigate();
    const location = useLocation();
      const [data, setData] = useState([]);
    useEffect(() => {
      getData();
    }, []);
    const [dataRubrica, setDataRubrica] = useState([]);
    useEffect(() => {
      getDataRubrica();
    }, []);
 
    async function getData() {
      (async () => {
        const result = await axios(`http://44.210.195.91/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno=${location.state.idAlumno}&idTipoEntregable=3`);
        setData(result.data);
        console.log(data)
      })();
    };
    async function getDataRubrica() {
      (async () => {
        const result = await axios(``);
        setDataRubrica(result.data);
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
        <h1 className='HEADER-TEXT1'>Entregable - { location.state.tituloDoc }</h1>
        <h2 className='HEADER-TEXT2'>Alumno - { location.state.apellidoPat }  {location.state.apellidoMat}, {location.state.nombres}</h2>
        <form action="http://react-s3-software.s3.amazonaws.com/0.+MOS4E.Ch.02.5.pdf">
    <input type="submit" value={location.state.tituloDoc } />
</form>
        </div>
    );
}
export default  EntregableSeleccionado;