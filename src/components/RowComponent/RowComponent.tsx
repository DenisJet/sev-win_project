import { TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Row } from "src/api/api.types";
import { NewRow } from "../NewRow";
import { API_BASE_URL, ENTITY_ID } from "src/api/api.constants";
import { deleteItemById, updateChangedItems } from "src/helpers/updateStorage";

export default function RowComponent({
  row,
  level = 0,
  setNewRowClick,
  newRowId,
  refetch,
  saveData,
  getData,
}: {
  row: Row;
  setNewRowClick: (id: number) => void;
  newRowId: number;
  refetch: () => void;
  saveData: (data: Row[]) => void;
  getData: () => Row[] | null;
  level?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  let paddingLeft = 10 + level * 20;

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/${ENTITY_ID}/row/${id}/delete`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const changedData = await response.json();
      const storageData = getData();

      if (storageData) {
        const updatedData = updateChangedItems(
          storageData,
          changedData.changed,
        );
        const finalData = deleteItemById(updatedData, id);
        saveData(finalData);
      }
    } catch (error) {
      console.error("Ошибка при удалении строки:", error);
    }
  };

  return (
    <>
      {isEdit && (
        <NewRow
          paddingLeft={paddingLeft}
          parentId={row.id}
          setNewRowClick={setNewRowClick}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          row={row}
          getData={getData}
          saveData={saveData}
        />
      )}
      {!isEdit && (
        <TableRow
          key={row.id}
          className="row"
          onDoubleClick={() => {
            setIsEdit(true);
            setNewRowClick(0);
          }}
        >
          <TableCell
            className="row_level"
            style={{ paddingLeft: `${paddingLeft}px` }}
            component="th"
            scope="row"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <svg
              onClick={() => setNewRowClick(row.id)}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-code"
            >
              <path d="M10 12.5 8 15l2 2.5" />
              <path d="m14 12.5 2 2.5-2 2.5" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
            </svg>
            <svg
              style={{ visibility: `${isHovered ? "visible" : "hidden"}` }}
              onClick={() => handleDelete(row.id)}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash-2"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </TableCell>
          <TableCell>{row.rowName}</TableCell>
          <TableCell>{row.salary}</TableCell>
          <TableCell>{row.equipmentCosts}</TableCell>
          <TableCell>{row.overheads}</TableCell>
          <TableCell>{row.estimatedProfit}</TableCell>
        </TableRow>
      )}
      {row.child &&
        row.child.length > 0 &&
        row.child.map((childRow) => {
          paddingLeft = paddingLeft + 5;
          return (
            <RowComponent
              key={childRow.id}
              row={childRow}
              newRowId={newRowId}
              level={level + 1}
              setNewRowClick={setNewRowClick}
              refetch={refetch}
              saveData={saveData}
              getData={getData}
            />
          );
        })}
      {newRowId === row.id ? (
        <NewRow
          paddingLeft={paddingLeft + 15}
          parentId={row.id}
          setNewRowClick={setNewRowClick}
          getData={getData}
          saveData={saveData}
          row={null}
        />
      ) : null}
    </>
  );
}
