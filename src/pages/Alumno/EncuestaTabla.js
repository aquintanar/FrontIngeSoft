import { Radio } from '@material-ui/core';
import React from 'react'
import '../../stylesheets/Asesor.css'


const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const opciones2 = { month: 'long', day: 'numeric' };

const sumarDias=(date, days)=>{
    var res = new Date(date);
    console.log(res);
    res.setDate(res.getDate() + days);
    console.log(res);
    return res;
}

export const EncuestaTabla = ({ ind, inicio,fecha,ini}) =>{
  return (
    
        <div class = "row LISTAR-TABLA2 justify-content-center">
            <div class=" col-11 ">
     
                <p class="HEADER-TEXT3 mt-4 mb-0">Pregunta {ini+1} </p>    
                <table class="table table-borderless">
                    <thead  >
                        <tr >
                            <th style ={{width: 100}}>Puntaje</th>
                            <th style = {{width:250}}>Descripción</th>
                            <th style = {{width:150}}>Marque la respuesta</th>
                        </tr>
                    </thead>
                    <tbody >
                       
                        <tr>
                            <td>5</td>
                            <td>Totalmente de acuerdo</td>
                            <td><input class="form-check-input" type="radio" value="" id="flexCheckDefault" ></input></td>
                        </tr>

                        <tr>
                            <td>4</td>
                            <td>Parcialmente de acuerdo</td>
                            <td><input class="form-check-input" type="radio" value="" id="flexCheckDefault" ></input></td>
                        </tr>

                        <tr>
                            <td>3</td>
                            <td>Ni de acuerdo ni en desacuerdo</td>
                            <td><input class="form-check-input" type="radio" value="" id="flexCheckDefault" ></input></td>
                        </tr>

                        <tr>
                            <td>2</td>
                            <td>Parcialmente en desacuerdo</td>
                            <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" ></input></td>
                        </tr>

                        <tr>
                            <td>1</td>
                            <td>Totalmente en desacuerdo</td>
                            <td><input class="form-check-input" type="radio" value="" id="flexCheckDefault" ></input></td>
                        </tr>
                    
                    </tbody>
                </table>

            </div>
        </div>
    
  )
}
