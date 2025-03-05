import { useState, useEffect } from "react";
import { API_BASE_URL, ENTITY_ID } from "src/api/api.constants";
import { Row } from "src/api/api.types";

export const useFetchData = () => {
  const [data, setData] = useState<Row[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/${ENTITY_ID}/row/list`);
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }
        const result = await response.json();
        setData(result);
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

    getData();
  }, []);

  return { data, loading, error };
};
