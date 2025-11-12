// OuterInfoColumns.jsx
import React from "react";
import { MaterialLeafHeaders, MaterialLeafCells } from "./MaterialInfoColumns";

/**
 * Outer Info group headers (Material 1 .. Material N)
 */
export function OuterGroupHeaders({ count = 10 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <th key={`outerGroupHdr-${i}`} colSpan={4} className="align-middle">
          Material {i + 1}
        </th>
      ))}
    </>
  );
}

/**
 * Outer leaf headers
 */
export function OuterLeafHeaders({ count = 10 }) {
  return <MaterialLeafHeaders count={count} />;
}

/**
 * Outer data cells
 */
export function OuterLeafCells({ data = [], count = 10 }) {
  return <MaterialLeafCells arr={data} count={count} />;
}
