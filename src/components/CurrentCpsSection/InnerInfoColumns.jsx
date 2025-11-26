// InnerInfoColumns.jsx
import React from "react";
import { MaterialLeafHeaders, MaterialLeafCells } from "./MaterialInfoColumns";

/**
 * Renders the top row groups for Inner Info: Material 1 .. Material N
 */
export function InnerGroupHeaders({ count = 10, isPseUser }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <th key={`innerGroupHdr-${i}`} colSpan={isPseUser ? 2 : 4} className="align-middle border text-center tbl-row2-hdr text-nowrap">
          {i === 0 ? 'Box' : `Inner ${i}`}
        </th>
      ))}
    </>
  );
}

/**
 * Renders the 3rd-row leaf headers for inner materials (Mat No / Qty / Price / Sum)
 */
export function InnerLeafHeaders({ count = 10, isPseUser }) {
  return <MaterialLeafHeaders count={count} isPseUser={isPseUser} />;
}

/**
 * Renders the data cells for inner materials
 */
export function InnerLeafCells({ data = [], count = 10, isPseUser }) {
  return <MaterialLeafCells arr={data} count={count} isPseUser />;
}