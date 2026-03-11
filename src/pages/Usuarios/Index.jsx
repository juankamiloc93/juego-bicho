import Tabla from '@/components/Tabla';
import useUsuariosHttp from '@/hooks/http/useUsuariosHttp';

import columnas from './columnas';

export default function Productos() { 

  const {
    usuarios,
    cargando,
    error,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
  } = useUsuariosHttp();    

  return (  
    <>        
      <Tabla
        columnas={columnas}
        registros={usuarios}
      />
    </>
  );
}