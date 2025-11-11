// InnerInfoColumns.jsx
import React from "react";
import { MaterialLeafHeaders, MaterialLeafCells } from "./MaterialInfoColumns";

/**
 * Renders the top row groups for Inner Info: Material 1 .. Material N
 */
export function InnerGroupHeaders({ count = 10 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <th key={`innerGroupHdr-${i}`} colSpan={i === 0 ? 8 : 2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef', border: '1px solid #000' }}>
          Material {i + 1}
        </th>
      ))}
    </>
  );
}

/**
 * Renders the 3rd-row leaf headers for inner materials (Mat No / Qty / Price / Sum)
 */
export function InnerLeafHeaders({ count = 10 }) {
  return <MaterialLeafHeaders count={count} />;
}

/**
 * Renders the data cells for inner materials
 */
export function InnerLeafCells({ data = [], count = 10 }) {
  //  {if (data.length > 0)
  //     debugger;
  //  }
  return <MaterialLeafCells arr={data} count={count} />;
}