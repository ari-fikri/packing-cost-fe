// InnerInfoColumns.jsx
import React from "react";
import { MaterialLeafHeaders, MaterialLeafCells } from "./MaterialInfoColumns";

export function InnerGroupHeaders({ count = 1, visibleColumns }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <th className="align-middle border text-center tbl-row2-hdr text-nowrap" key={`innerGrp-${i}`} colSpan={i === 0 ? 8 : 2}>
          {i === 0 ? 'Box' : `Inner ${i}`}
        </th>
      ))}
    </>
  );
}

export const InnerLeafHeaders = ({ count, visibleColumns }) => (
  <MaterialLeafHeaders count={count} visibleColumns={visibleColumns} />
);
export const InnerLeafCells = ({ data, count, visibleColumns }) => {
  return <MaterialLeafCells arr={data} count={count} visibleColumns={visibleColumns} />;
};