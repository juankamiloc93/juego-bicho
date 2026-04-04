import Form from '@/components/Form';
import useUsuariosHttp from '@/hooks/http/useUsuariosHttp';

import columnas from './columnas';

export default function Nuevo(props){

      const {
        uysuarios,
        cargando,
        error,
        crearUsuario,
        actualizarUsuario,
        eliminarUsuario,
      } = useUsuariosHttp();    
    

    return (
        <>            
            <Form 
                columnas={columnas}
                registro={null}
                submitFuncion={crearUsuario}
            />
        </>
    );

}