import { useState, useEffect, useCallback } from "react";
import { useToken } from "@/hooks/useToken";
import axios from "axios";

export default function useUsuariosHttp() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const apiBaseUrl = 'http://localhost:8000/api';
  const url = 'users'

  const getHeaders = async () => {
    const { getToken } = useToken();
    const token = await getToken();
    const headers = {Authorization: `Bearer ${token}`}
    return headers
  }
  
  const fetchUsuarios = useCallback(async () => {    
    const headers = await getHeaders();
    setCargando(true);
    setError(null);
    try {
      const { data } = await axios.get(`${apiBaseUrl}/${url}`, {headers});      
      setUsuarios(data);   
      localStorage.setItem("usuarios", JSON.stringify(data));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  const crearUsuario = async (nuevoUsuario) => {
     const headers = await getHeaders();
    setCargando(true);
    setError(null);
    try {
      await axios.post(`${apiBaseUrl}/${url}`, nuevoUsuario, {headers});
      await fetchUsuarios(); // refrescar lista
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };


  const actualizarUsuario = async (id, datosActualizados) => {
     const headers = await getHeaders();
    setCargando(true);
    setError(null);
    try {
      await axios.put(`${apiBaseUrl}/${url}/${id}`, datosActualizados, {headers});
      await fetchUsuarios();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };


  const eliminarUsuario = async (id) => {
    const headers = await getHeaders();
    setCargando(true);
    setError(null);
    try {
      await axios.delete(`${apiBaseUrl}/${url}/${id}`, {headers});
      await fetchUsuarios();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };

  // 📌 Cargar usuarios al inicio
  useEffect(() => {
    fetchUsuarios();
  }, [fetchUsuarios]);

  return {
    usuarios,
    cargando,
    error,
    fetchUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario ,
  };
}