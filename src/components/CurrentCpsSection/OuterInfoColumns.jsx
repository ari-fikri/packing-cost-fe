// OuterInfoColumns.jsx
import React from "react";
import { MaterialLeafHeaders, MaterialLeafCells } from "./MaterialInfoColumns";

/**
 * Outer Info group headers (Material 1 .. Material N)
 */
export function OuterGroupHeaders({ count = 10 }) {
  return (
    <>
      {/*Array.from({ length: count }).map((_, i) => (
        <th key={`outerGroupHdr-${i}`} colSpan={i === 0 ? 8 : 2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef', border: '1px solid #000' }}>
          Material {i + 1}
        </th>
      ))*/}

      {Array.from({ length: count }).map((_, i) => {
        debugger;
        return (
        <th key={`outerGroupHdr-${i}`} colSpan={i===0 ? 8 : 2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef' }}>
          Material {i + 1}
        </th>
      )
    }
    )}
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