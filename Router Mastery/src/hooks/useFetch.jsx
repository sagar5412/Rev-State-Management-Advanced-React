import { useState, useEffect } from "react";

const cache = new Map();

export function useFetch(url, options = {}) {
  const [data, setData] = useState(cache.get(url) || null);
  const [loading, setLoading] = useState(!cache.has(url));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache.has(url)) {
      setData(cache.get(url));
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(res.statusText);
        const json = await res.json();
        cache.set(url, json);
        setData(json);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
