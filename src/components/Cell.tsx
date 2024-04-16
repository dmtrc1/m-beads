import { memo } from "react";
import { beadsConfig } from "../beadsConfig";

type CellProps = {
  color: string;
  quantity?: number;
  rowIndex?: number;
  cellIndex?: number;
  handleCellClick?: (rowIndex: number, cellIndex: number) => void;
};

const Cell = ({ color, rowIndex, cellIndex, handleCellClick }: CellProps) => {
  return (
    <div
      style={{
        backgroundColor: color || "",
        width: beadsConfig.cellSize,
        minWidth: beadsConfig.cellSize,
        flexBasis: beadsConfig.cellSize,
        height: beadsConfig.cellSize,
        cursor: handleCellClick ? "pointer" : "",
      }}
      className="border border-slate-900"
      onClick={
        handleCellClick && rowIndex !== undefined && cellIndex !== undefined
          ? () => handleCellClick(rowIndex, cellIndex)
          : undefined
      }
    />
  );
};

export default memo(Cell);
