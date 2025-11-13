// OuterInfoColumns.jsx
import React from "react";
import { MaterialLeafHeaders, MaterialLeafCells } from "./MaterialInfoColumns";

/**
 * Outer Info group headers (Material 1 .. Material N)
 */
export function OuterGroupHeaders({ count = 10, isPseUser}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <th key={`outerGroupHdr-${i}`} colSpan={isPseUser ? 2 : 4} className="align-middle">
          Outer {i + 1}
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
