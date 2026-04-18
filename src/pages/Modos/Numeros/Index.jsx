import Tabla from '@/components/Tabla';
import useNumerosHttp from '@/hooks/http/useNumerosHttp';

import columnas from './columnas';

export default function Numeros() { 

  const {
    usuarios,
    cargando,
    error,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
  } = useNumerosHttp();    

  return (  
    <>        
      <Tabla
        columnas={columnas}
        registros={usuarios}
      />
    </>
  );
}