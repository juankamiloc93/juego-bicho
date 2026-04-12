import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function useUsuariosHttp() {
  const [numeros, setNumeros] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const apiBaseUrl = 'http://localhost:8000/api';
  const url = 'modes'

  const fetchNumeros = useCallback(async () => {    
    setCargando(true);
    setError(null);
    try {
      const { data } = await axios.get(`${apiBaseUrl}/${url}`);      
      setNumeros(data);   
      localStorage.setItem("usuarios", JSON.stringify(data));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  const crearNumero = async (nuevo) => {
    setCargando(true);
    setError(null);
    try {
      await axios.post(`${apiBaseUrl}/${url}`, nuevo);
      await fetchNumeros(); // refrescar lista
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };


  const actualizarNumero = async (id, datosActualizados) => {
    setCargando(true);
    setError(null);
    try {
      await axios.put(`${apiBaseUrl}/${url}/${id}`, datosActualizados);
      await fetchNumeros();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };


  const eliminarNumero = async (id) => {
    setCargando(true);
    setError(null);
    try {
      await axios.delete(`${apiBaseUrl}/${url}/${id}`);
      await fetchNumeros();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };

  // 📌 Cargar usuarios al inicio
  useEffect(() => {
    fetchNumeros();
  }, [fetchNumeros]);

  return {
    numeros,
    cargando,
    error,
    fetchNumeros,
    crearNumero,
    actualizarNumero,
    eliminarNumero ,
  };
}