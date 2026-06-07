import { useState, useEffect, useCallback } from "react";
import { useToken } from "@/hooks/useToken";
import axios from "axios";

export default function useBetsHttp() {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiBaseUrl = 'http://localhost:8000/api';

  const getHeaders = async () => {
    const { getToken } = useToken();
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` }
    return headers;
  };

  // Obtener bets
  const fetchBets = useCallback(async () => {
    const headers = await getHeaders();
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${apiBaseUrl}/bets`, { headers });
      setBets(data);
      localStorage.setItem("bets", JSON.stringify(data));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear bet
  const createBet = async (newBet) => {
    const headers = await getHeaders();
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${apiBaseUrl}/bets`, newBet, { headers });
      await fetchBets(); // refrescar lista
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  //  Actualizar bet
  const updateBet = async (id, updatedData) => {
    const headers = await getHeaders();
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${apiBaseUrl}/bets/${id}`, updatedData, { headers });
      await fetchBets();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  //  Eliminar bet
  const deleteBet = async (id) => {
    const headers = await getHeaders();
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${apiBaseUrl}/bets/${id}`, { headers });
      await fetchBets();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Cargar bets al inicio
  useEffect(() => {
    fetchBets();
  }, [fetchBets]);

  return {
    bets,
    loading,
    error,
    fetchBets,
    createBet,
    updateBet,
    deleteBet,
  };
}