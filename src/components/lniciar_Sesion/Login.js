import React from 'react'
import {useRef,useState,useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios'
import '../../stylesheets/Iniciar_Sesion.css'
import { useAuth0 } from '@auth0/auth0-react';

const LOGIN_URL = 'https://localhost:7012/api/login/GetLogin'
function Login() {
    const {loginWithRedirect,isAuthenticated} = useAuth0();
    
    const [cuentaSeleccionada, setCuentaSeleccionada]=useState({
        correo: "",
        contrasena: ""
      })


    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from =location.state?.from?.pathname || "/";
    
    const userRef = useRef();
    const errRef = useRef();

    const [user,setUser] = useState('');
    const [pwd,setPwd] = useState('');
    const [errMsg,setErrMsg] = useState('');
    

    useEffect(()=>{
        setErrMsg('');
    },[user,pwd]);

    useEffect(()=>{
        userRef.current.focus();
    },[])
    
    const handleSubmit =async (e) =>{
        e.preventDefault();
        
        try{
            cuentaSeleccionada.correo=user;
            cuentaSeleccionada.contrasena=pwd;
            console.log(cuentaSeleccionada);
            
           
            const response = await axios.get(LOGIN_URL,
                {params:{correo:user,contrasena:pwd}},
                {
                    _method:'GET'
                })
                .then(response=>{
                        console.log(response);
                        if(response.data.id===11){
                            navigate('/administrador')
                        }
                        else if(response.data.id===12){
                            navigate('/comite');
                        }
                        else if(response.data.id===13){
                            navigate('/alumno');
                        }
                        else if(response.data.id===14){
                            navigate('/asesor');
                        }
                }).catch(error=>{
                    if(!error?.response){
                        setErrMsg('No Server Response')
                    }
                    else if(error.response?.status===400){
                        setErrMsg('Missing Username or Password');
                    }
                    else if(error.response?.status===401){
                        setErrMsg('Unauthorized');
                    }
                    else{
                        setErrMsg('Login Failed');
                    }
                    errRef.current.focus();
                });
                
                /*lOS ROLES SON UN ARREGLO DE NUMEROS */
            /*setAuth({user,pwd,roles,accessToken});

            setUser('');
            setPwd('');*/
            //navigate(from,{replace:true});
            //console.log(user)
            /*if(user==="Administrador"){
                navigate('/administrador');
            }
            else if(user==="Alumno"){
                navigate('/alumno');
            }
            else if(user==="Comite"){
                navigate('/comite');
            }
            else if(user==="Asesor"){
                navigate('/asesor');
            }*/
        }
        catch(err){
                
        }   
    }
    function Autenticacion(){
        if(isAuthenticated){
            navigate('/administrador')
        }
    }
    window.onload=Autenticacion()
    return (
        
        <div className='CONTAINER-GENERAL-LOGIN'>
        <section className='CONTAINER-LOGIN'>
            <p ref={errRef} className={errMsg?"errmsg" :
             "offscreen"} aria-live ="assertive">{errMsg}</p>
        <h1>Inicio de Sesión</h1>
        <form onSubmit={handleSubmit} onLoad='Autenticacion'>
            <label htmlFor='username'>
                Usuario:
            </label>
            <input 
                    type="text" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e)=>setUser(e.target.value)}
                    value={user}
                    required
            />
            <label htmlFor='password'>
                    Contraseña:
                </label>
                <input 
                    type="password" 
                    id="password"
                    onChange={(e)=>setPwd(e.target.value)}
                    value={pwd}
                    required
            />
            <button>Iniciar Sesion</button>
            
            <div onClick ={()=>loginWithRedirect() }className="google-btn">
                   <div className="google-icon-wrapper">
                        <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                   </div>
                   <p className='btn-text'>
                       Iniciar Sesion
                   </p>
            </div>
            
            
        </form>
        <p className='TEXTO-ABAJO'>
            ¿Necesita una cuenta?<br/>
            <span className='line'>
                    {/*Put router */}
                    <a href="/Register"> Crear Cuenta</a>
            </span>
        </p>

        </section>
        </div>
        
    )
}

export default Login
