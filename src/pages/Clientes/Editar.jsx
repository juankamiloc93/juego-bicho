import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Form from '@/components/Form';
import useClientesHttp from '@/hooks/http/useClientesHttp';
import columnas from './columnas';

export default function Editar() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");    

  const { actualizarCliente } = useClientesHttp();
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    const clientesGuardados = JSON.parse(localStorage.getItem("clientes")) || [];
    const clienteActual = clientesGuardados.find(c => String(c.id) === String(id));
    if (clienteActual) {
      setCliente(clienteActual);
    }
  }, [id]);

  const handleSubmit = async (data) => {
    await actualizarCliente(id, data);
  };

  return (
    <Form 
      columnas={columnas} 
      registro={cliente}
      submitFuncion={handleSubmit}
      titulo="cliente"
    />
  );
}
