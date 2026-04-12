import Tabla from '@/components/Tabla';
import useNumerosHttp from '@/hooks/http/useNumeros';

import columnas from './columnas';

export default function Numeros() { 

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