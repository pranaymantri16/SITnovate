import { useEffect, useState } from 'react'
import { useAuth } from './AuthContext';
import { Outlet} from 'react-router-dom';
import axios from 'axios';
import NotFound from '../Pages/NotFound';

export default function Access(){
    const[ok,setOk]=useState(false)
    const[auth]=useAuth()

    useEffect(()=>{
        const AuthCheck=async()=>{
            const res= await axios.get('/api/auth/uni-auth')
        if(res.data.ok){
            setOk(true)
        }
        else{
            setOk(false)
        }
        };
    if (auth?.token){
        AuthCheck();
    }
    },[auth?.token]);

    return ok ? <Outlet/>:<NotFound/> 
}
