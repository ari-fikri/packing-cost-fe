// MaterialInfoColumns.jsx
import React from "react";

/**
 * Material leaf headers (Mat No / Qty / Price / Sum)
 */
export function MaterialLeafHeaders({ count = 1 }) {
  // returns sequence of <th> * count * 4
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={`matLeafHdr-${i}`}>
          <th className="align-middle">Mat No</th>
          <th className="align-middle">Qty</th>
          <th className="align-middle">Price</th>
          <th className="align-middle">Sum</th>
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * Material leaf data cells (Mat No / Qty / Price / Sum)
 * innerArr is an array of material objects; if missing an entry, cells show '-'
 */
export function MaterialLeafCells({ arr = [], count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const mat = arr[i] || {};
        return (
          <React.Fragment key={`matLeafData-${i}`}>
            <td className="align-middle">{mat.materialNo ?? "-"}</td>
            <td className="align-middle">{mat.qty ?? "-"}</td>
            <td className="align-middle">{mat.price ?? "-"}</td>
            <td className="align-middle">{mat.sum ?? "-"}</td>
          </React.Fragment>
        );
      })}
    </>
  );
}
