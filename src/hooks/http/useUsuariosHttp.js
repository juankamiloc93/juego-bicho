import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function useUsuariosHttp() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const apiBaseUrl = 'http://localhost:8000/api';

  // 📌 Obtener productos
  const fetchUsuarios = useCallback(async () => {    
    setCargando(true);
    setError(null);
    try {
      const { data } = await axios.get(`${apiBaseUrl}/users`);      
      setUsuarios(data);   
      localStorage.setItem("usuarios", JSON.stringify(data));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  // 📌 Crear producto
  const crearUsuario = async (nuevoUsuario) => {
    setCargando(true);
    setError(null);
    try {
      await axios.post(`${apiBaseUrl}/usuarios`, nuevoUsuario);
      await fetchUsuarios(); // refrescar lista
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };

  // 📌 Actualizar producto
  const actualizarUsuario = async (id, datosActualizados) => {
    setCargando(true);
    setError(null);
    try {
      await axios.put(`${apiBaseUrl}/usuarios/${id}`, datosActualizados);
      await fetchUsuarios();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };

  // 📌 Eliminar producto
  const eliminarUsuario = async (id) => {
    setCargando(true);
    setError(null);
    try {
      await axios.delete(`${apiBaseUrl}/usuarios/${id}`);
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