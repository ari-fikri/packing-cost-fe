// InnerInfoColumns.jsx
import React from "react";
import { MaterialLeafHeaders, MaterialLeafCells } from "./MaterialInfoColumns";

export function InnerGroupHeaders({ count = 1 }) {
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

export const InnerLeafHeaders = ({ count }) => (
  <MaterialLeafHeaders count={count} />
);
export const InnerLeafCells = ({ data, count }) => {
  return <MaterialLeafCells arr={data} count={count} />;
};