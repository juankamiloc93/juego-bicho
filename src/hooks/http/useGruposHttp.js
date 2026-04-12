import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function useGruposHttp() {
  const [grupos, setGrupos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const apiBaseUrl = 'http://localhost:8000/api';
  const url = 'modes'

  const fetchGrupos = useCallback(async () => {    
    setCargando(true);
    setError(null);
    try {
      const { data } = await axios.get(`${apiBaseUrl}/${url}`);      
      setGrupos(data);   
      localStorage.setItem("grupos", JSON.stringify(data));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  const crearGrupo = async (nuevoGrupo) => {
    setCargando(true);
    setError(null);
    try {
      await axios.post(`${apiBaseUrl}/${url}`, nuevoGrupo);
      await fetchGrupos(); // refrescar lista
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };


  const actualizarGrupo = async (id, datosActualizados) => {
    setCargando(true);
    setError(null);
    try {
      await axios.put(`${apiBaseUrl}/${url}/${id}`, datosActualizados);
      await fetchGrupos();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };


  const eliminarGrupo = async (id) => {
    setCargando(true);
    setError(null);
    try {
      await axios.delete(`${apiBaseUrl}/${url}/${id}`);
      await fetchUsuarios();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };

  // 📌 Cargar usuarios al inicio
  useEffect(() => {
    fetchGrupos();
  }, [fetchGrupos]);

  return {
    grupos,
    cargando,
    error,
    fetchGrupos,
    crearGrupo,
    actualizarGrupo,
    eliminarGrupo,
  };
}