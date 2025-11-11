// OuterInfoColumns.jsx
import React from "react";
import { MaterialLeafHeaders, MaterialLeafCells } from "./MaterialInfoColumns";

export function OuterGroupHeaders({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <th key={`outerGrp-${i}`} colSpan={i === 0 ? 8 : 2}>
          {`Outer ${i + 1}`}
        </th>
      ))}
    </>
  );
}

export const OuterLeafHeaders = ({ count }) => (
  <MaterialLeafHeaders count={count} />
);
export const OuterLeafCells = ({ data, count }) => (
  <MaterialLeafCells arr={data} count={count} />
);