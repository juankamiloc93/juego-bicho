import { useState, useEffect, useCallback } from "react";
import { useToken } from "@/hooks/useToken";
import axios from "axios";

export default function useDrawsHttp() {
  const [draws, setDraws] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiBaseUrl = 'http://localhost:8000/api';
  const url = 'draws';

  const getHeaders = async () => {
    const { getToken } = useToken();
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return headers;
  };

  // Obtener draws
  const fetchDraws = useCallback(async () => {
    const headers = await getHeaders();
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${apiBaseUrl}/${url}`, { headers });
      setDraws(data);
      localStorage.setItem("draws", JSON.stringify(data));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear draw
  const createDraw = async (newDraw) => {
    const headers = await getHeaders();
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${apiBaseUrl}/${url}`, newDraw, { headers });
      await fetchDraws(); // refrescar lista
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar draw
  const updateDraw = async (id, updatedData) => {
    const headers = await getHeaders();
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${apiBaseUrl}/${url}/${id}`, updatedData, { headers });
      await fetchDraws();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar draw
  const deleteDraw = async (id) => {
    const headers = await getHeaders();
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${apiBaseUrl}/${url}/${id}`, { headers });
      await fetchDraws();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar draws al inicio
  useEffect(() => {
    fetchDraws();
  }, [fetchDraws]);

  return {
    draws,
    loading,
    error,
    fetchDraws,
    createDraw,
    updateDraw,
    deleteDraw,
  };
}
