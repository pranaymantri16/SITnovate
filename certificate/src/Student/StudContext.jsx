import axios from 'axios';
import {useContext,createContext, useEffect, useState} from 'react';
const AuthContext=createContext()

// eslint-disable-next-line react/prop-types
const AuthProvider=({children})=>{

    const[auth,setAuth]=useState({
        user:null,
        token:""
    })

    axios.defaults.headers.common['Authorization']=auth?.token

useEffect(()=>{
    const data=localStorage.getItem("student");
    if(data){
    const parseData=JSON.parse(data)
        setAuth({
            ...auth,
            user:parseData.user,
            token:parseData.token,
        })
    }
// eslint-disable-next-line
} ,[]);

    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}


const useAuth= () => useContext(AuthContext)

export { useAuth ,AuthProvider };