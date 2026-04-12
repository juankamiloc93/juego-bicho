import Tabla from '@/components/Tabla';
import useGruposHttp from '@/hooks/http/useGruposHttp';

import columnas from './columnas';

export default function Grupos() { 

  const {
    grupos 
  } = useGruposHttp();    

  return (  
    <>        
      <Tabla
        columnas={columnas}
        registros={grupos}
      />
    </>
  );
}