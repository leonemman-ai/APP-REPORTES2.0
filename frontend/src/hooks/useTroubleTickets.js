import { useState, useEffect } from 'react';
import { getAllTT } from '../services/api';

export const useTroubleTickets = () => {
  const [troubleTickets, setTroubleTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTT = async () => {
      try {
        setLoading(true);
        const data = await getAllTT();
        setTroubleTickets(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTT();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await getAllTT();
      setTroubleTickets(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { troubleTickets, loading, error, refetch };
};
