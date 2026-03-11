import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Form from '@/components/Form';

import columnas from './columnas';

export default function Editar(){

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [usuario, setUsuario] = useState({})

    const id = queryParams.get("id");    

    useEffect(() => {

        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        console.log(usuariosGuardados); 

        const usuarioActual = usuariosGuardados.find(u => u.id==id)
        console.log('id', id)
        console.log('usuario', usuarioActual)

        setUsuario(usuarioActual)

    }, [])


    return(
       <Form 
            columnas={columnas} 
            registro={usuario}          
        />
    )

}