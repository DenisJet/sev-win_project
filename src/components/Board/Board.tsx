import "./Board.style.scss";
import { useEffect, useState } from "react";
import { API_BASE_URL, ENTITY_ID } from "src/api/api.constants";

export default function Board() {
  const [data, setData] = useState(null);
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
        console.log("result", result);
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

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="board">
      <div className="board_name">Строительно-монтажные работы</div>
      {data && (
        <table className="board_table">
          <thead>
            <tr>
              <th>Уровень</th>
              <th>Наименование работ</th>
              <th>Основная з/п</th>
              <th>Оборудование</th>
              <th>Накладные расходы</th>
              <th>Сметная прибыль</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.level}</td>
                  <td>{item.workName}</td>
                  <td>{item.baseSalary}</td>
                  <td>{item.equipment}</td>
                  <td>{item.overhead}</td>
                  <td>{item.estimatedProfit}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  Нет данных для отображения
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
