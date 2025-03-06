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
import { useEffect, useState } from "react";
import { NewRow } from "../NewRow";

export default function Board() {
  const [newRowId, setNewRowId] = useState<number>(0);
  const { getData, loading, error, fetchData, saveData } = useFetchData();

  const data = getData();

  useEffect(() => {
    fetchData();
  }, []);

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
            {data && data.length > 0 ? (
              data.map((row: Row) => {
                return (
                  <RowComponent
                    key={row.id}
                    row={row}
                    newRowId={newRowId}
                    setNewRowClick={handleRowIdChange}
                    refetch={fetchData}
                    saveData={saveData}
                    getData={() => data}
                  />
                );
              })
            ) : (
              <NewRow
                paddingLeft={10}
                setNewRowClick={handleRowIdChange}
                parentId={null}
                refetch={fetchData}
                getData={() => data}
                saveData={saveData}
                row={null}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
