import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./Board.style.scss";
import { Row } from "src/api/api.types";
import { useFetchData } from "./hooks/useGetData";
import { RowComponent } from "../RowComponent";
import { useState } from "react";

export default function Board() {
  const [newRowId, setNewRowId] = useState<number>(0);
  const { data, loading, error, fetchData } = useFetchData();

  const handleRowIdChange = (id: number) => {
    setNewRowId(id);
  };

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
        <TableContainer component={Paper} className="board_table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Уровень</TableCell>
                <TableCell>Наименование работ</TableCell>
                <TableCell>Основная з/п</TableCell>
                <TableCell>Оборудование</TableCell>
                <TableCell>Накладные расходы</TableCell>
                <TableCell>Сметная прибыль</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: Row) => {
                return (
                  <RowComponent
                    key={row.id}
                    row={row}
                    newRowId={newRowId}
                    setNewRowClick={handleRowIdChange}
                    refetch={fetchData}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
