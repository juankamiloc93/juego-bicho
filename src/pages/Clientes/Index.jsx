import Tabla from '@/components/Tabla';
import useClientesHttp from '@/hooks/http/useClientesHttp';
import columnas from './columnas';

export default function Clientes() { 

  const {
    clientes,
    cargando,
    error,
  } = useClientesHttp();    

  return (  
    <>        
      <Tabla
        carregando={cargando}
        columnas={columnas}
        registros={clientes}
      />
    </>
  );
}
