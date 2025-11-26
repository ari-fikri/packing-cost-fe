// OuterInfoColumns.jsx
import React from "react";
import { MaterialLeafHeaders, MaterialLeafCells } from "./MaterialInfoColumns";

/**
 * Outer Info group headers (Material 1 .. Material N)
 */
export function OuterGroupHeaders({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <th className="align-middle border text-center tbl-row2-hdr text-nowrap" key={`outerGrp-${i}`} colSpan={2}>
          {i === 0 ? 'Module' : `Outer ${i}`}
        </th>
      ))}
    </>
  );
}

/**
 * Outer leaf headers
 */
export function OuterLeafHeaders({ count = 10, isPseUser }) {
  return <MaterialLeafHeaders count={count} isPseUser={isPseUser} />;
}

/**
 * Outer data cells
 */
export function OuterLeafCells({ data = [], count = 10, isPseUser }) {
  debugger;
  return <MaterialLeafCells arr={data} count={count} isPseUser={isPseUser} />;
}