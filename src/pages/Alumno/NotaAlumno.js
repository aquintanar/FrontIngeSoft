import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import * as BootIcons  from "react-icons/bs";
import {  Button} from '@material-ui/core';
import {  useNavigate } from 'react-router-dom';
import '../../stylesheets/Alumno.css'
import useModal from '../../hooks/useModals';
import {ModalPregunta, ModalConfirmación} from '../../components/Modals';
import * as BsIcons from 'react-icons/bs';
import { useContext } from 'react';
import { UserContext } from '../../UserContext'



function NotaAlumno()  {
    let url="-";
    const {value,setValue} = useContext(UserContext);
let navigate = useNavigate();

const [detalleNota, setDetalleNota]=useState({
    puntajeTotal: 0,

})
const [valor , setValor] = useState(0);
const [valorA , setValorA] = useState(0);
const [valorE , setValorE] = useState(0);
const [valorEx , setValorEx] = useState(0);
const [notaEntregablesParciales , SetNotaEntregablesParciales] = useState(0);
const [notaFinal , SetNotaFinal] = useState(0);
const [notas , SetNotas] = useState([]);
const [formula,setFormula] = useState("NF = (3*PE + 3*DF + 2*EF + 2*PE)/10");
const [abreviacion,setAbreviacion] = useState("PE: Promedio de Entregas");
const [abreviacion1,setAbreviacion1] = useState("DF: Nota de Documento Final. Incluye el ítem Entrega 4");
const [abreviacion2,setAbreviacion2] = useState("EF: Nota de Exposición Final");
const [abreviacion3,setAbreviacion3] = useState("PE: Promedio de Entregas Parciales");
const [abreviacion4,setAbreviacion4] = useState("");
const [abreviacion5,setAbreviacion5] = useState("");
const [entregables , SetEntregables] = useState([]);
const [entregablesParciales , SetEntregablesParciales] = useState([]);
const [avances , SetAvances] = useState([]);
const [exposiciones , SetExposiciones] = useState([]);
const peticionNotasEntregables = async() => {
    const idAlumno = 1 
    const idEntregable = 4 
var  parcial=0;
    //console.log(data)
    
    (async () => {
        const result = await axios('https://localhost:7012/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+2);
        //SetEntregablesParciales(result.data);
        let i = 0  ; 
        let index = 0 ; 
        for ( i = 0 ; i < result.data.length ; i++){
              if(result.data[i].notaVersion >= 0) index = index +result.data[i].notaVersion;   
              else index=0;
              console.log(index);
        }   
        if(result.data.length==0) result.data.length=1;
        
        const resultAvance = await axios('https://localhost:7012/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+1);
        //SetEntregablesParciales(result.data);
        let j = 0  ; 
        let indexAvance = 0 ; 
        for ( j = 0 ; j < resultAvance.data.length ; j++){
            if(resultAvance.data[j].notaVersion >= 0) indexAvance = indexAvance +resultAvance.data[j].notaVersion;   
            else indexAvance=0;
        }   
        if(resultAvance.data.length==0) resultAvance.data.length=1;
        const resultEntregable = await axios('https://localhost:7012/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+3);
        //SetEntregablesParciales(result.data);
        let k = 0  ; 
        let indexEntregable = 0 ; 
        for ( k = 0 ; k < resultEntregable.data.length ; k++){
            if(resultEntregable.data[k].notaVersion >= 0) indexEntregable = indexEntregable +resultEntregable.data[k].notaVersion; 
            else indexEntregable=0;      
        }   
        if(resultEntregable.data.length==0) resultEntregable.data.length=1;
        const resultExposicion = await axios('https://localhost:7012/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+4);
        //SetEntregablesParciales(result.data);
        let l = 0  ; 
        let indexExposicion = 0 ; 
        for ( l = 0 ; l < resultExposicion.data.length ; l++){
            if(resultExposicion.data[l].notaVersion >= 0) indexExposicion = indexExposicion +resultEntregable.data[l].notaVersion; 
            else indexExposicion=0;        
        }   
        if(resultExposicion.data.length==0) resultExposicion.data.length=1;
        SetNotaFinal(((2*(index/result.data.length))+(3*(indexAvance/resultAvance.data.length))+(3*(indexEntregable/resultEntregable.data.length))+(2*(indexExposicion/resultExposicion.data.length)))/10)
        console.log(notaFinal);
      })();
    const urlAvances  = 'https://localhost:7012/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+1
    const responseAvances = await fetch(urlAvances)
    const dataAvances = await responseAvances.json()
 //   console.log(dataAvances)
    SetAvances(dataAvances)

    const urlEntregablesParciales  = 'https://localhost:7012/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+2
    const responseEntregablesParciales = await fetch(urlEntregablesParciales)
    const dataEntregablesParciales = await responseEntregablesParciales.json()
    SetEntregablesParciales(dataEntregablesParciales);

    const urlEntregables  = 'https://localhost:7012/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+3
    const responseEntregables = await fetch(urlEntregables)
    const dataEntregables = await responseEntregables.json()
  //  console.log(dataEntregables)
    SetEntregables(dataEntregables)
    const urlExposiciones = 'https://localhost:7012/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+4
    const responseExposiciones = await fetch(urlExposiciones)
    const dataExposiciones = await responseExposiciones.json()
   // console.log(dataExposiciones)
    SetExposiciones(dataExposiciones)
}



/*
  function getDetallesNotaExposicion(idEntregable) {
    (async () => {
        const resultIndex = await axios('https://localhost:7012/api/Entregable/CalcularPuntajeEntregableXAlumno?idEntregable='+idEntregable+'&idAlumno='+1);
        if(resultIndex.data[0].puntajeTotal>=0) setValorEx(resultIndex.data[0].puntajeTotal); 
        else setValorEx(0); 
        console.log(resultIndex.data[0].puntajeTotal);
        return resultIndex.data[0].puntajeTotal;
    })();
  };

*/
useEffect(()=>{
    peticionNotasEntregables();
 },[])
  return (      
    <div class=" CONTAINERALUMNO">   

        <p class="HEADER-TEXT1">Notas  </p>

        <div align="center">
        <p class="HEADER-TEXT10">{formula}</p>
        </div>
        <p class="HEADER-TEXT11">{'Donde:'}</p>
        <p class="HEADER-TEXT11">NF: Nota final del curso </p>
        <p class="HEADER-TEXT11">{abreviacion}</p>
        <p class="HEADER-TEXT11">{abreviacion1}</p>
        
        <p class="HEADER-TEXT11">{abreviacion2}</p>
        
        <p class="HEADER-TEXT11">{abreviacion3}</p>

        <p class="HEADER-TEXT11">{abreviacion4}</p>

        <u><p class="HEADER-TEXT11">Entregas Parciales</p></u>
        {entregablesParciales.map(entregable => (
                <tr key={entregable.idVersion}>
                    <td><p class="BTN-CUADRADO-NOTA">{entregable.nombre}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {((entregable.notaVersion >= 0) ? entregable.notaVersion : "-" )}</p></td>                    
                </tr>
         ))}

       <u><p class="HEADER-TEXT11">Documento Final</p></u>
        {avances.map(entregable => (
                <tr key={entregable.idVersion}>
                    <td><p class="BTN-CUADRADO-NOTA">{entregable.nombre}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {((entregable.notaVersion >= 0) ? entregable.notaVersion : "-" )} </p></td>                    
                </tr>
              ))}

<u><p class="HEADER-TEXT11">Entregas</p></u>
        {entregables.map(entregable => (
                <tr key={entregable.idVersion}>
                    <td><p class="BTN-CUADRADO-NOTA">{entregable.nombre} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {((entregable.notaVersion >= 0) ? entregable.notaVersion : "-" )}   </p></td>                    
                </tr>
              ))}

   <u><p class="HEADER-TEXT11">Exposicion Final</p></u>
        {exposiciones.map(entregable => (
                <tr key={entregable.idVersion}>
                    <td><p class="BTN-CUADRADO-NOTA">{entregable.nombre}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {((entregable.notaVersion >= 0) ? entregable.notaVersion : "-" )} </p></td>                    
                </tr>
              ))}
        <p class="HEADER-TEXT5">Nota Final:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{notaFinal}</p>
    </div>  
                
  )
  
}

export default NotaAlumno;
