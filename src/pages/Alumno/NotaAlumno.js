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
const urlNota= "https://localhost:7012/api/Nota/";



var notaFinalisima = 0;
var form = "";
var longitud=0;
const idAlumno = localStorage.getItem('IDUSUARIO');

function NotaAlumno()  {
  const urlCodigo = "https://localhost:7012/";



    let url="-";
    const {value,setValue} = useContext(UserContext);
let navigate = useNavigate();

const [detalleNota, setDetalleNota]=useState({
    puntajeTotal: 0,

})
const [notaFinal , SetNotaFinal] = useState(0);
const [formNota , SetForm] = useState(0);
const [sumaNotas , SetFSumaNotas] = useState(0);
const [notas , SetNotas] = useState([]);
const [entregables , SetEntregables] = useState([]);
const [entregablesParciales , SetEntregablesParciales] = useState([]);
const [documentoFinal , SetDocumentoFinal] = useState([]);
const [exposiciones , SetExposiciones] = useState([]);
const [entregables5 , SetEntregables5] = useState([]);
const [cursos , SetCursos] = useState([]);
const peticionNotasEntregables = async() => {

    (async () => {
        const result = await axios(urlCodigo+'api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso='+localStorage.getItem('idCurso')+'&idTipoEntregable='+2+'&idAlumno='+idAlumno);
        //SetEntregablesParciales(result.data);
        let i = 0  ; 
        let index = 0 ; 
        for ( i = 0 ; i < result.data.length ; i++){
              if(result.data[i].notaVersionMasReciente >= 0) index = index +result.data[i].notaVersionMasReciente;   
              else index=index+0;
          //    console.log(index);
        }   
        if(result.data.length==0) result.data.length=1;
        
        const resultAvance = await axios(urlCodigo+'api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso='+localStorage.getItem('idCurso')+'&idTipoEntregable='+1+'&idAlumno='+idAlumno);
        //SetEntregablesParciales(result.data);
        let j = 0  ; 
        let indexAvance = 0 ; 
        for ( j = 0 ; j < resultAvance.data.length ; j++){
            if(resultAvance.data[j].notaVersionMasReciente >= 0) indexAvance = indexAvance +resultAvance.data[j].notaVersionMasReciente;   
            else indexAvance=indexAvance+0;
        }   
        if(resultAvance.data.length==0) resultAvance.data.length=1;
        const resultEntregable = await axios(urlCodigo+'api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso='+localStorage.getItem('idCurso')+'&idTipoEntregable='+3+'&idAlumno='+idAlumno);
        //SetEntregablesParciales(result.data);
        let k = 0  ; 
        let indexEntregable = 0 ; 
        for ( k = 0 ; k < resultEntregable.data.length ; k++){
            if(resultEntregable.data[k].notaVersionMasReciente >= 0) indexEntregable = indexEntregable +resultEntregable.data[k].notaVersionMasReciente; 
            else indexEntregable=indexEntregable+0;      
        }   
        if(resultEntregable.data.length==0) resultEntregable.data.length=1;
        const resultExposicion = await axios(urlCodigo+'api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso='+localStorage.getItem('idCurso')+'&idTipoEntregable='+4+'&idAlumno='+idAlumno);
        //SetEntregablesParciales(result.data);
        let l = 0  ; 
        let indexExposicion = 0 ; 
        for ( l = 0 ; l < resultExposicion.data.length ; l++){
            if(resultExposicion.data[l].notaVersionMasReciente >= 0) indexExposicion = indexExposicion +resultEntregable.data[l].notaVersionMasReciente; 
            else indexExposicion=indexExposicion+0;        
        }   
        if(resultExposicion.data.length==0) resultExposicion.data.length=1;
        SetNotaFinal(((2*(index/result.data.length))+(3*(indexAvance/resultAvance.data.length))+(3*(indexEntregable/resultEntregable.data.length))+(2*(indexExposicion/resultExposicion.data.length)))/10)
        console.log(notaFinal);
      })();
      const urlCurso = 'https://localhost:7012/api/Curso/BuscarCursoXId?idCurso='+localStorage.getItem('idCurso');
      const responseCurso = await fetch(urlCurso);
      const dataCurso = await responseCurso.json();
      SetCursos(dataCurso);
      console.log(dataCurso);
  var idEntregable1 = 1;  
  var idEntregable2 = 2;   
  var idEntregable3 = 3;   
  var idEntregable4 = 4;   
  var idEntregable5 = 0;     
  if(dataCurso[0].numTesis==2){
    var idEntregable1 = 5;  
    var idEntregable2 = 6;   
    var idEntregable3 = 7;   
    var idEntregable4 = 8;   
    var idEntregable5 = 9;   

  }
    const urlEntregablesParciales  = (urlCodigo+'api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso='+localStorage.getItem('idCurso')+'&idTipoEntregable='+idEntregable1+'&idAlumno='+idAlumno);
    const responseEntregablesParciales = await fetch(urlEntregablesParciales)
    const dataEntregablesParciales = await responseEntregablesParciales.json()
    SetEntregablesParciales(dataEntregablesParciales);

    const urlEntregables  = (urlCodigo+'api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso='+localStorage.getItem('idCurso')+'&idTipoEntregable='+idEntregable2+'&idAlumno='+idAlumno);
    const responseEntregables = await fetch(urlEntregables)
    const dataEntregables = await responseEntregables.json()
  //  console.log(dataEntregables)
    SetEntregables(dataEntregables)
    const urlExposiciones = (urlCodigo+'api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso='+localStorage.getItem('idCurso')+'&idTipoEntregable='+idEntregable3+'&idAlumno='+idAlumno);
    const responseExposiciones = await fetch(urlExposiciones)
    const dataExposiciones = await responseExposiciones.json()
   // console.log(dataExposiciones)
    SetExposiciones(dataExposiciones)

    const urlDocumentoFinal  = (urlCodigo+'api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso='+localStorage.getItem('idCurso')+'&idTipoEntregable='+idEntregable4+'&idAlumno='+idAlumno);
    const responseDocumentoFinal = await fetch(urlDocumentoFinal)
    const dataDocumentoFinal = await responseDocumentoFinal.json()
 //   console.log(dataAvances)
    SetDocumentoFinal(dataDocumentoFinal)

    const urlEntregables5  = (urlCodigo+'api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso='+localStorage.getItem('idCurso')+'&idTipoEntregable='+idEntregable5+'&idAlumno='+idAlumno);
    const responseEntregables5 = await fetch(urlEntregables5)
    const dataEntregables5 = await responseEntregables.json()
  //  console.log(dataEntregables)
    SetEntregables5(dataEntregables5) 
}





  //Listar notas de un curso *falta curso
  const peticionGetNota=async()=>{
    await axios.get(urlNota+ "GetNotas_x_idCurso?idCurso="+localStorage.getItem('idCurso'))   
    .then(response=>{
        SetNotas(response.data);
        obtFormula(response.data);
    }).catch(error =>{
        console.log(error.message);
    })
  }

  const obtFormula = (datos) => {
    var pesoSum=0;
    var index = 0 ; 
var index2 = 0;
var sumEntregables=0;
    if(datos.length == 0){
        form = "NF = 1";
    }
    else{
      datos.forEach(async (elem) =>{
            if(pesoSum == 0){
                form = "NF = (" + elem.peso + "*" + elem.codigo;
                pesoSum = pesoSum + elem.peso;
                const result = await axios(urlCodigo+'api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso='+localStorage.getItem('idCurso')+'&idTipoEntregable='+elem.fidTipoEntregable+'&idAlumno='+idAlumno);
                //SetEntregablesParciales(result.data);
                let i = 0  ; 
                index = 0 ; 
                
                for ( i = 0 ; i < result.data.length ; i++){
                      if(result.data[i].notaVersionMasReciente >= 0) index = index +result.data[i].notaVersionMasReciente;   
                      else index=index+0;
                      console.log("if");
                      
                      
                }   
                console.log(index);
                console.log(result.data.length);
                if(result.data.length==0) result.data.length=1;
                if(result.data.length>0) sumEntregables = sumEntregables +  ((index/result.data.length)*elem.peso);
                console.log(sumEntregables);
                index = 0 ; 
            }
            else{
                form = form + " + " + elem.peso + "*" + elem.codigo;
                pesoSum = pesoSum + elem.peso;
                index2 = 0 ; 
                  const result = await axios(urlCodigo+'api/Entregable/ListEntregablesXIdCursoYIdTipoEntregableYIdAlumno?idCurso='+localStorage.getItem('idCurso')+'&idTipoEntregable='+elem.fidTipoEntregable+'&idAlumno='+idAlumno);
                  //SetEntregablesParciales(result.data);
                  let i = 0  ; 
                  for ( i = 0 ; i < result.data.length ; i++){
                        if(result.data[i].notaVersionMasReciente >= 0) index2 = index2 +result.data[i].notaVersionMasReciente;   
                        else index2=index2+0;
                        console.log("else");
                        
                        
                  }   
                  console.log(index2);
                  console.log(result.data.length);
                  if(result.data.length==0) result.data.length=1;
                  if(result.data.length>0) sumEntregables = sumEntregables+  ((index2/result.data.length)*elem.peso);
                  console.log(sumEntregables);
                  index2 = 0 ; 
            }
            SetFSumaNotas((sumEntregables/pesoSum).toFixed(2));
          })
          notaFinalisima = notaFinalisima/pesoSum;
        form = form + ")/"+ pesoSum;
        SetForm(pesoSum);
        console.log(sumEntregables);
        console.log(form);
    }

  }

useEffect(()=>{
  peticionGetNota();
    peticionNotasEntregables();

 },[])
  return (      
    <div class=" CONTAINERALUMNO">   

        <p class="HEADER-TEXT1">Notas  </p>

        <div align="center">
          <p class="HEADER-TEXT10"> {form}</p>
        </div>
        <p class="HEADER-TEXT11">{'Donde:'}</p>
        <p class="HEADER-TEXT11">NF: <a class ='fw-normal'>Nota final del curso </a></p>
        <p>
          {notas.map(element => 
               <p class="HEADER-TEXT11">{element.codigo}: <a class ='fw-normal'>{element.nombre}</a></p>
          )}
        </p>

        {cursos.map(curso => (
          <u><p class="HEADER-TEXT11">{curso.numTesis==1?"Entregables Parciales":"Exposiciones"}</p></u>
         ))}
        {entregablesParciales.map(entregable => (
                <tr class="BTN-CUADRADO-NOTA" key={entregable.idVersion}>
                    <td style ={{width: 800, paddingLeft: '0.5%', paddingRight: '5%'}}>{entregable.nombre}</td>                    
                    <td style ={{width: 150, paddingLeft: '0.5%', paddingRight: '5%'}}> {((entregable.notaVersionMasReciente >= 0) ? entregable.notaVersionMasReciente : "-" )}</td>
                </tr>
         ))}

{cursos.map(curso => (
          <u><p class="HEADER-TEXT11">{curso.numTesis==1?"Entregas":"Exposición Parcial"}</p></u>
         ))}
        {entregables.map(entregable => (
                <tr class="BTN-CUADRADO-NOTA" key={entregable.idVersion}>
                    <td style ={{width: 800, paddingLeft: '0.5%', paddingRight: '5%'}}>{entregable.nombre} </td>    
                    <td style ={{width: 150, paddingLeft: '0.5%', paddingRight: '5%'}}> {((entregable.notaVersionMasReciente >= 0) ? entregable.notaVersionMasReciente : "-" )} </td>                  
                </tr>
              ))}

{cursos.map(curso => (
          <u><p class="HEADER-TEXT11">{curso.numTesis==1?"Exposición Final":"Exposición Final"}</p></u>
         ))}
        {exposiciones.map(entregable => (
                <tr class="BTN-CUADRADO-NOTA" key={entregable.idVersion}>
                    <td style ={{width: 800, paddingLeft: '0.5%', paddingRight: '5%'}}>{entregable.nombre} </td>    
                    <td style ={{width: 150, paddingLeft: '0.5%', paddingRight: '5%'}}> {((entregable.notaVersionMasReciente >= 0) ? entregable.notaVersionMasReciente : "-" )} </td>              
                </tr>
              ))}
        {cursos.map(curso => (
          <u><p class="HEADER-TEXT11">{curso.numTesis==1?"Documento Final":"Documento Parcial"}</p></u>
         ))}

        {documentoFinal.map(entregable => (
                <tr class="BTN-CUADRADO-NOTA" key={entregable.idVersion}>
                    <td style ={{width: 800, paddingLeft: '0.5%', paddingRight: '5%'}}>{entregable.nombre}</td>                    
                    <td style ={{width: 150, paddingLeft: '0.5%', paddingRight: '5%'}}> {((entregable.notaVersionMasReciente >= 0) ? entregable.notaVersionMasReciente : "-" )} </td>
                </tr>
              ))}


        {cursos.map(curso => (
          <u><p class="HEADER-TEXT11">{curso.numTesis==1?"":"Documento Final"}</p></u>
         ))}


        {entregables5.map(entregable => (
                <tr class="BTN-CUADRADO-NOTA" key={entregable.idVersion}>
                    <td style ={{width: 800, paddingLeft: '0.5%', paddingRight: '5%'}}>{entregable.nombre} </td>    
                    <td style ={{width: 150, paddingLeft: '0.5%', paddingRight: '5%'}}> {((entregable.notaVersionMasReciente >= 0) ? entregable.notaVersionMasReciente : "-" )} </td>                  
                </tr>
              ))}


        <p class="HEADER-TEXT5">Nota Final:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {sumaNotas}</p>
    </div>  
                
  )
  
}

export default NotaAlumno;
