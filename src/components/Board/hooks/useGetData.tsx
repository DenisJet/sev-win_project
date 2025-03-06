import { useState, useEffect } from "react";
import { API_BASE_URL, ENTITY_ID } from "src/api/api.constants";
import { Row } from "src/api/api.types";

const STORAGE_KEY = "cachedData";

export const useFetchData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Row[] | null>(null);

  const getData = (): Row[] | null => {
    const cachedData = localStorage.getItem(STORAGE_KEY);
    return cachedData ? JSON.parse(cachedData) : null;
  };

  const saveData = (newData: Row[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    setData(newData);
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/${ENTITY_ID}/row/list`);
      if (!response.ok) {
        throw new Error("Ошибка при получении данных");
      }

      const result = await response.json();
      saveData(result);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Произошла неизвестная ошибка");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = getData();
    if (!cachedData) {
      fetchData();
    } else {
      setData(cachedData);
      setLoading(false);
    }
  }, []);

  return {
    getData,
    loading,
    error,
    fetchData,
    saveData,
  };
};
