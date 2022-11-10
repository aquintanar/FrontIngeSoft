import React from 'react'
import '../../stylesheets/Asesor.css'


const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const opciones2 = { month: 'long', day: 'numeric' };

const sumarDias=(date, days)=>{
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
}

export const CalendarioTablas = ({ ind, inicio,fecha,ini}) =>{
  return (
    <div class = "row LISTAR-TABLA2 justify-content-center">
        <div class=" col-11 ">
            <p class="HEADER-TEXT3 mt-4 mb-0">Semana {ini+1} ( {(sumarDias(fecha,ini*7)).toLocaleDateString("es-MX",opciones2)} - {(sumarDias(fecha,ini*7+5)).toLocaleDateString("es-MX",opciones2)} )</p>    
            <table className='table fs-6'>
                <thead class >
                    <tr class>
                        <th style ={{width: 100}}>Tipo</th>
                        <th style = {{width:250}}>Entregable</th>
                        <th style = {{width:150}}>Fecha de Entrega</th>
                    </tr>
                </thead>
                <tbody >
                    {ind.filter((elem)=> elem.sem ===inicio+ini).map(entregable => (
                        <tr key={entregable.idEntregable}>
                            <td >{entregable.tipoEntregable}</td>    
                            <td>{entregable.nombre}</td>                
                            <td>{(new Date(entregable.fechaPresentacionAlumno)).toLocaleDateString("es-MX",opciones) }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}
