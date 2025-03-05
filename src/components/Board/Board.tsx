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
import { useEffect, useState } from "react";
import { API_BASE_URL, ENTITY_ID } from "src/api/api.constants";
import { Row } from "src/api/api.types";
import { RowComponent } from "./Board.service";
import { useFetchData } from "./hooks/useGetData";

export default function Board() {
  const { data, loading, error } = useFetchData();

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
                return <RowComponent key={row.id} row={row} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
