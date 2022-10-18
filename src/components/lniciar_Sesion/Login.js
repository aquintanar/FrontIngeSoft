import React from 'react'
import {useRef,useState,useEffect} from 'react';
import useAuth from '../../hooks/useAuth';
import {Link,useNavigate,useLocation} from 'react-router-dom';
import axios from 'axios'
function Login() {
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
            const response = await axios.post("LOGIN_URL",
                JSON.stringify({user,pwd}),
                {
                    headers:{'Contet-Type': 'application-json'},
                    withCredentials:true
                });
                console.log(JSON.stringify(response?.data));

                const accessToken = response?.data.accessToken;
                const roles =response?.data?.roles;
                setAuth({user,pwd,roles,accessToken});

            setUser('');
            setPwd('');
            navigate(from,{replace:true});
        }
        catch(err){
                if(!err?.response){
                    setErrMsg('No Server Response')
                }
                else if(err.response?.status===400){
                    setErrMsg('Missing Username or Password');
                }
                else if(err.response?.status===401){
                    setErrMsg('Unauthorized');
                }
                else{
                    setErrMsg('Login Failed');
                }
                errRef.current.focus();
        }   
    }
    
    return (
        <section className='CONTAINER-LOGIN'>
        <form>
            <label htmlFor='username'>
                Username:
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
                    Password:
                </label>
                <input 
                    type="password" 
                    id="password"
                    onChange={(e)=>setPwd(e.target.value)}
                    value={pwd}
                    required
            />
            <button>Iniciar Sesion</button>
        </form>
        <p>
            Necesita una cuenta?<br/>
            <span className='line'>
                    {/*Put router */}
                    <a href="/Register"> Crear Cuenta</a>
            </span>
        </p>

        </section>
    )
}

export default Login
