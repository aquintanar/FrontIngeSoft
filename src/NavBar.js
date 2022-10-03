import React from 'react'
import {Link} from 'react-router-dom'

function NavBar(){
    const linkStyle = {
        margin: "0.3rem",
        textDecoration: "none",
        color: 'blue'
    };
    return(

          
        <ul>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/administrador" style={linkStyle}>Administrador</Link>
            <Link to="/asesor" style={linkStyle}>Asesor</Link>
            <Link to="/alumno" style={linkStyle}>Alumno</Link>
            <Link to="/comite">Comite</Link>
            <Link to="/profesor" style={linkStyle}>Profesor</Link>

        </ul>
    );
}
export default NavBar;