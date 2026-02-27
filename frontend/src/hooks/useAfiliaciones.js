import { useState, useEffect } from 'react';
import { getAfiliaciones } from '../services/api';

export const useAfiliaciones = () => {
  const [afiliaciones, setAfiliaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAfiliaciones = async () => {
      try {
        setLoading(true);
        const data = await getAfiliaciones();
        setAfiliaciones(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAfiliaciones();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await getAfiliaciones();
      setAfiliaciones(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { afiliaciones, loading, error, refetch };
};
