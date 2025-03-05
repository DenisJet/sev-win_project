import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { Row } from "src/api/api.types";

export const RowComponent = ({
  row,
  level = 0,
}: {
  row: Row;
  level?: number;
}) => {
  let paddingLeft = 10 + level * 10;

  return (
    <>
      <TableRow key={row.id}>
        <TableCell
          style={{ paddingLeft: `${paddingLeft}px` }}
          component="th"
          scope="row"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
        </TableCell>
        <TableCell>{row.rowName}</TableCell>
        <TableCell>{row.salary}</TableCell>
        <TableCell>{row.equipmentCosts}</TableCell>
        <TableCell>{row.overheads}</TableCell>
        <TableCell>{row.estimatedProfit}</TableCell>
      </TableRow>
      {row.child &&
        row.child.length > 0 &&
        row.child.map((childRow) => {
          paddingLeft = paddingLeft + 5;
          return (
            <RowComponent key={childRow.id} row={childRow} level={level + 1} />
          );
        })}
    </>
  );
};
