import { API_BASE_URL, ENTITY_ID } from "./api.constants";
import { Row } from "./api.types";

export const fetchData = async (): Promise<Row[]> => {
  const response = await fetch(`${API_BASE_URL}/${ENTITY_ID}/row/list`);
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  return await response.json();
};
