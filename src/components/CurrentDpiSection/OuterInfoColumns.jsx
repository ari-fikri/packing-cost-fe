// OuterInfoColumns.jsx
import React from "react";
import { MaterialLeafHeaders, MaterialLeafCells } from "./MaterialInfoColumns";

export function OuterGroupHeaders({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <th className="align-middle border text-center tbl-row2-hdr text-nowrap" key={`outerGrp-${i}`} colSpan={i === 0 ? 8 : 2}>
          {i === 0 ? 'Module' : `Outer ${i}`}
        </th>
      ))}
    </>
  );
}

export const OuterLeafHeaders = ({ count }) => (
  <MaterialLeafHeaders count={count} />
);

export const OuterLeafCells = ({ data, count }) => {  
  //debugger;
  return <MaterialLeafCells arr={data} count={count} />
  ;}