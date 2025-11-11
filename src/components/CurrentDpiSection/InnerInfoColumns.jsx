// InnerInfoColumns.jsx
import React from "react";
import { MaterialLeafHeaders, MaterialLeafCells } from "./MaterialInfoColumns";

export function InnerGroupHeaders({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <th key={`innerGrp-${i}`} colSpan={i === 0 ? 8 : 2}>
          {`Inner ${i + 1}`}
        </th>
      ))}
    </>
  );
}

export const InnerLeafHeaders = ({ count }) => (
  <MaterialLeafHeaders count={count} />
);
export const InnerLeafCells = ({ data, count }) => {
  //debugger;
  (
  <MaterialLeafCells arr={data} count={count} />
)};