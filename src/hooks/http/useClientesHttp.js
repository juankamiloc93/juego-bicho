import { useState, useEffect, useCallback } from "react";
import { useToken } from "@/hooks/useToken";
import { useDispatch } from "react-redux";
import { setClients } from "@/redux/feactures/clients";
import axios from "axios";

export default function useClientesHttp() {
  const [clientes, setClientesLocal] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const apiBaseUrl = 'http://localhost:8000/api';
  const url = 'clients';

  const getHeaders = async () => {
    const { getToken } = useToken();
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return headers;
  };

  const fetchClientes = useCallback(async () => {
    const headers = await getHeaders();
    setCargando(true);
    setError(null);
    try {
      const { data } = await axios.get(`${apiBaseUrl}/${url}`, { headers });
      setClientesLocal(data);
      dispatch(setClients(data));
      localStorage.setItem("clientes", JSON.stringify(data));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  }, [dispatch]);

  const crearCliente = async (nuevoCliente) => {
    const headers = await getHeaders();
    setCargando(true);
    setError(null);
    try {
      await axios.post(`${apiBaseUrl}/${url}`, nuevoCliente, { headers });
      await fetchClientes(); // refrescar lista
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  const actualizarCliente = async (id, datosActualizados) => {
    const headers = await getHeaders();
    setCargando(true);
    setError(null);
    try {
      await axios.put(`${apiBaseUrl}/${url}/${id}`, datosActualizados, { headers });
      await fetchClientes();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  const eliminarCliente = async (id) => {
    const headers = await getHeaders();
    setCargando(true);
    setError(null);
    try {
      await axios.delete(`${apiBaseUrl}/${url}/${id}`, { headers });
      await fetchClientes();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setCargando(false);
    }
  };

  // 📌 Cargar clientes al inicio
  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);

  return {
    clientes,
    cargando,
    error,
    fetchClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
  };
}
