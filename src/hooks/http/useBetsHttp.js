import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function useBetsHttp() {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiBaseUrl = 'http://localhost:8000/api';

  // Obtener bets
  const fetchBets = useCallback(async () => {    
    setCargando(true);
    setError(null);
    try {
      const { data } = await axios.get(`${apiBaseUrl}/bets`);      
      setBets(data);
      localStorage.setItem("bets", JSON.stringify(data));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  // Crear bet
  const createBet = async (newBet) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${apiBaseUrl}/bets`, newBet);
      await fetchBets(); // refrescar lista
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  //  Actualizar bet
  const updateBet = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`${apiBaseUrl}/bets/${id}`, updatedData);
      await fetchBets();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setCargando(false);
    }
  };

  //  Eliminar bet
  const deleteBet = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${apiBaseUrl}/bets/${id}`);
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
  }, []);

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