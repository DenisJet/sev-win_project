import "./NewRow.style.scss";
import { TableCell, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import { API_BASE_URL, ENTITY_ID } from "src/api/api.constants";

export type NewRowData = {
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  parentId: number | null;
  rowName: string;
  salary: number;
  supportCosts: number;
};

export default function NewRow({
  paddingLeft,
  parentId,
  refetch,
  setNewRowClick,
}: {
  paddingLeft: number;
  setNewRowClick: (id: number) => void;
  parentId: number | null;
  refetch: () => void;
}) {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("0");
  const [equipmentCosts, setEquipmentCosts] = useState("0");
  const [overheads, setOverheads] = useState("0");
  const [estimatedProfit, setEstimatedProfit] = useState("0");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const rowData = {
        equipmentCosts: Number(equipmentCosts),
        estimatedProfit: Number(estimatedProfit),
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        overheads: Number(overheads),
        parentId: parentId,
        rowName: name,
        salary: Number(salary),
        supportCosts: 0,
      };
      sendDataToServer(rowData);
    }
  };

  const sendDataToServer = async (rowData: NewRowData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${ENTITY_ID}/row/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rowData),
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      refetch();
      setNewRowClick(0);
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
    }
  };

  return (
    <TableRow className="new-row">
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
      <TableCell>
        <TextField
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          value={equipmentCosts}
          onChange={(e) => setEquipmentCosts(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          value={overheads}
          onChange={(e) => setOverheads(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          variant="outlined"
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          value={estimatedProfit}
          onChange={(e) => setEstimatedProfit(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          variant="outlined"
          size="small"
        />
      </TableCell>
    </TableRow>
  );
}
