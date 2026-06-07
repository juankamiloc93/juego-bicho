import Form from '@/components/Form';
import useClientesHttp from '@/hooks/http/useClientesHttp';
import columnas from './columnas';

export default function Nuevo(props) {
  const { crearCliente } = useClientesHttp();    

  return (
    <>            
      <Form 
        columnas={columnas}
        registro={null}
        submitFuncion={crearCliente}
        titulo="cliente"
      />
    </>
  );
}
