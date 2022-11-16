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

const urlNota= "http://34.195.33.246/api/Nota/";
var form = "";

function NotaAlumno()  {
    let url="-";
    const {value,setValue} = useContext(UserContext);
let navigate = useNavigate();

const [detalleNota, setDetalleNota]=useState({
    puntajeTotal: 0,

})
const [notaFinal , SetNotaFinal] = useState(0);
const [notas , SetNotas] = useState([]);
const [entregables , SetEntregables] = useState([]);
const [entregablesParciales , SetEntregablesParciales] = useState([]);
const [avances , SetAvances] = useState([]);
const [exposiciones , SetExposiciones] = useState([]);
const peticionNotasEntregables = async() => {
const idAlumno = localStorage.getItem('IDUSUARIO');
    (async () => {
        const result = await axios('http://34.195.33.246/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+2);
        //SetEntregablesParciales(result.data);
        let i = 0  ; 
        let index = 0 ; 
        for ( i = 0 ; i < result.data.length ; i++){
              if(result.data[i].notaVersion >= 0) index = index +result.data[i].notaVersion;   
              else index=0;
              console.log(index);
        }   
        if(result.data.length==0) result.data.length=1;
        
        const resultAvance = await axios('http://34.195.33.246/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+1);
        //SetEntregablesParciales(result.data);
        let j = 0  ; 
        let indexAvance = 0 ; 
        for ( j = 0 ; j < resultAvance.data.length ; j++){
            if(resultAvance.data[j].notaVersion >= 0) indexAvance = indexAvance +resultAvance.data[j].notaVersion;   
            else indexAvance=0;
        }   
        if(resultAvance.data.length==0) resultAvance.data.length=1;
        const resultEntregable = await axios('http://34.195.33.246/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+3);
        //SetEntregablesParciales(result.data);
        let k = 0  ; 
        let indexEntregable = 0 ; 
        for ( k = 0 ; k < resultEntregable.data.length ; k++){
            if(resultEntregable.data[k].notaVersion >= 0) indexEntregable = indexEntregable +resultEntregable.data[k].notaVersion; 
            else indexEntregable=0;      
        }   
        if(resultEntregable.data.length==0) resultEntregable.data.length=1;
        const resultExposicion = await axios('http://34.195.33.246/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+4);
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
    const urlAvances  = 'http://34.195.33.246/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+1
    const responseAvances = await fetch(urlAvances)
    const dataAvances = await responseAvances.json()
 //   console.log(dataAvances)
    SetAvances(dataAvances)

    const urlEntregablesParciales  = 'http://34.195.33.246/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+2
    const responseEntregablesParciales = await fetch(urlEntregablesParciales)
    const dataEntregablesParciales = await responseEntregablesParciales.json()
    SetEntregablesParciales(dataEntregablesParciales);

    const urlEntregables  = 'http://34.195.33.246/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+3
    const responseEntregables = await fetch(urlEntregables)
    const dataEntregables = await responseEntregables.json()
  //  console.log(dataEntregables)
    SetEntregables(dataEntregables)
    const urlExposiciones = 'http://34.195.33.246/api/Version/ListVersionesXIdAlumnoYIdTipoEntregable?idAlumno='+idAlumno+'&idTipoEntregable='+4
    const responseExposiciones = await fetch(urlExposiciones)
    const dataExposiciones = await responseExposiciones.json()
   // console.log(dataExposiciones)
    SetExposiciones(dataExposiciones)
}





  //Listar notas de un curso *falta curso
  const peticionGetNota=async()=>{
    await axios.get(urlNota+ "GetNotas")       
    .then(response=>{
        SetNotas(response.data);
        obtFormula(response.data);
    }).catch(error =>{
        console.log(error.message);
    })
  }

  const obtFormula = (datos) => {
    var pesoSum=0;
    if(datos.length == 0){
        form = "NF = 1";
    }
    else{
        datos.forEach((elem) =>{
            if(pesoSum == 0){
                form = "NF = (" + elem.peso + "*" + elem.codigo;
                pesoSum = pesoSum + elem.peso;
            }
            else{
                form = form + " + " + elem.peso + "*" + elem.codigo;
                pesoSum = pesoSum + elem.peso;
            }
        })
        form = form + ")/"+ pesoSum;
    }
  }

useEffect(()=>{
    peticionNotasEntregables();
    peticionGetNota();
 },[])
  return (      
    <div class=" CONTAINERALUMNO">   

        <p class="HEADER-TEXT1">Notas  </p>

        <div align="center">
          <p class="HEADER-TEXT10">{form}</p>
        </div>
        <p class="HEADER-TEXT11">{'Donde:'}</p>
        <p class="HEADER-TEXT11">NF: <a class ='fw-normal'>Nota final del curso </a></p>
        <p>
          {notas.map(element => 
              <td class="HEADER-TEXT11">{element.codigo}: <a class ='fw-normal'>{element.nombre}</a></td>
          )}
        </p>

        <u><p class="HEADER-TEXT11">Entregas Parciales</p></u>
        {entregablesParciales.map(entregable => (
                <tr class="BTN-CUADRADO-NOTA" key={entregable.idVersion}>
                    <td style ={{width: 800, paddingLeft: '0.5%', paddingRight: '5%'}}>{entregable.nombre}</td>                    
                    <td style ={{width: 150, paddingLeft: '0.5%', paddingRight: '5%'}}> {((entregable.notaVersion >= 0) ? entregable.notaVersion : "-" )}</td>
                </tr>
         ))}

        <u><p class="HEADER-TEXT11">Documento Final</p></u>
        {avances.map(entregable => (
                <tr class="BTN-CUADRADO-NOTA" key={entregable.idVersion}>
                    <td style ={{width: 800, paddingLeft: '0.5%', paddingRight: '5%'}}>{entregable.nombre}</td>                    
                    <td style ={{width: 150, paddingLeft: '0.5%', paddingRight: '5%'}}> {((entregable.notaVersion >= 0) ? entregable.notaVersion : "-" )} </td>
                </tr>
              ))}

        <u><p class="HEADER-TEXT11">Entregas</p></u>
        {entregables.map(entregable => (
                <tr class="BTN-CUADRADO-NOTA" key={entregable.idVersion}>
                    <td style ={{width: 800, paddingLeft: '0.5%', paddingRight: '5%'}}>{entregable.nombre} </td>    
                    <td style ={{width: 150, paddingLeft: '0.5%', paddingRight: '5%'}}> {((entregable.notaVersion >= 0) ? entregable.notaVersion : "-" )} </td>                  
                </tr>
              ))}

        <u><p class="HEADER-TEXT11">Exposición Final</p></u>
        {exposiciones.map(entregable => (
                <tr class="BTN-CUADRADO-NOTA" key={entregable.idVersion}>
                    <td style ={{width: 800, paddingLeft: '0.5%', paddingRight: '5%'}}>{entregable.nombre} </td>    
                    <td style ={{width: 150, paddingLeft: '0.5%', paddingRight: '5%'}}> {((entregable.notaVersion >= 0) ? entregable.notaVersion : "-" )} </td>              
                </tr>
              ))}
        <p class="HEADER-TEXT5">Nota Final:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{notaFinal}</p>
    </div>  
                
  )
  
}

export default NotaAlumno;
