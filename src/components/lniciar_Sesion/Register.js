import {useRef,useState,useEffect} from 'react';
import { faCheck,faTimes,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from 'react';
import axios from 'axios';
import "../../stylesheets/Iniciar_Sesion.css";
import Select from 'react-select';
import useModal from '../../hooks/useModals';

const USER_REGEX= /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'http://44.210.195.91/api/Alumno/PostAlumno';


const Register = () => {
    const userRef =useRef();
    const errRef = useRef();
    const [value,setValues] = useState(null);
    
    const [user,setUser] = useState('');
    const [validName,setValidName]=useState(false);
    const [userFocus,setUserFocus] = useState(false);

    const [pwd,SetPwd] = useState('');
    const [validPwd,setValidPwd]=useState(false);
    const [pwdFocus,setPwdFocus] = useState(false);

    const [matchPwd,setMatchPwd] = useState('');
    const [validMatch,setValidMatch]=useState(false);
    const [matchFocus,setMatchFocus] = useState(false);

    const [errMsg,setErrMsg] = useState('');
    const [success,setSuccess]=useState(false);
   

    const [isOpenEditModal, openEditModal ,closeEditModal ] = useModal();
    const [isOpenPostModal, openPostModal ,closePostModal ] = useModal();
    const [isOpenEditadoModal, openEditadoModal ,closeEditadoModal ] = useModal();
    const [isOpenGuardadoModal, openGuardadoModal ,closeGuardadoModal ] = useModal();
    
    const [UsuarioSeleccionado, setUsuarioSeleccionado]=useState({
        IdUsuario: 0,
        Nombres: '',
        ApePat: '',
        ApeMat:'',
        Correo:'',
        CodigoPucp:'',
        Imagen: null,
        LinkCalendario:''
      })

    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        const result=USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    },[user])

    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match =pwd ===matchPwd;
        setValidMatch(match);
    },[pwd,matchPwd])

    useEffect(()=>{
        setErrMsg('');
    },[user,pwd,matchPwd])

    const handleSubmit =async (e)=>{
        e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2){
            setErrMsg("invalid Entry");
            return;
        }
        try{/*Poner como en el backend*/ 
            UsuarioSeleccionado.ApePat=pwd;
            UsuarioSeleccionado.Correo=user;
            console.log(UsuarioSeleccionado)
            const response = await axios.post(REGISTER_URL,JSON.stringify({UsuarioSeleccionado}),
            {
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            });
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear input fields*/            
        }
        catch(err){
            if(!err?.response){
                setErrMsg('No server Response')
            }
            else if(err.response?.status===409){
                setErrMsg('Username Taken')
            }
            else{
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    const options=[
        {value:'Administrador',label:'Administrador'},
        {value:'Docente',label:'Docente'},
        {value:'Alumno',label:'Alumno'}
    ]

    const onDropDownChange = (value) =>{
            console.log(value);
            setValues(value);
    }
    
    
    return (
        <>
        {success?(
            <section>
                <h1>Exitoso!</h1>
                <p>
                    <a href="#">Inicio Sesion</a>
                </p>
            </section>
        ):(
            <div className='CONTAINER-GENERAL-REGISTRO'>
        <section className='CONTAINER-REGISTRO'>
            <p ref={errRef} className={errMsg? "errmsg":"offscreen"}
            aria-live="assertive">
                {errMsg}
            </p>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Usuario:
                    <span className={validName?"valid":"hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validName || !user ? "hide":
                    "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e)=>setUser(e.target.value)}
                    required
                    aria-invalid={validName?"false":"true"}
                    aria-describedby ="uidnote"
                    onFocus={()=>setUserFocus(true)}
                    onBlur ={()=>setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus  && user &&
                !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    4 a 24 caracteres.<br/>
                    Debe comenzar con una letra.<br/>
                    Letras, numeros,guiones permitidos.
                </p>
                <label htmlFor="password">
                    Contraseña:
                    <span className={validPwd?"valid":"hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validPwd || !pwd ? "hide":
                    "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e)=>SetPwd(e.target.value)}
                    required
                    aria-invalid={validPwd?"false":"true"}
                    aria-describedby ="pwdnote"
                    onFocus={()=>setPwdFocus(true)}
                    onBlur ={()=>setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus &&
                !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    8 a 24 caracteres.<br/>
                    Debe incluir letras mayusculas y minusculas,
                    un numero y un caracter especial.<br/>
                    Letras, numeros,guiones permitidos.<br/>
                    Estan permitidos caracteres especiales: <span aria-label="exclamation mark">!</span>
                    <span aria-label ="at symbol">@</span><span aria-labe="hashtag">#</span>
                    <span aria-label="dolar sign"> $</span><span aria-label='percent'>%</span>
                </p>
                <label htmlFor="confirm_pwd">
                    Confirmar Contraseña:
                    <span className={validMatch && matchPwd?"valid":"hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validMatch || !matchPwd ? "hide":
                    "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e)=>setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch?"false":"true"}
                    aria-describedby ="confirmnote"
                    onFocus={()=>setMatchFocus(true)}
                    onBlur ={()=>setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus &&
                !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                        Debe coincidir con la contrasena.
                </p>
                <label >
                    Rol:
                    
                </label>
                <Select
                    value={value}
                    options={options}
                    onChange={onDropDownChange}
                />

                <button disabled={!validName || !validPwd || !validMatch ||value===null ?true:false}>
                    Registrar
                </button>
                <p>
                    ¿Ya estas registrado?<br/>
                    <span className='line'>
                        {/*Put router link here*/ }
                        <a href="/">Iniciar Sesion</a>
                    </span>
                </p>
            </form>
        </section>
        </div>)}
        </>
    )
}

export default Register
