// MaterialInfoColumns.jsx
import React from "react";

/**
 * Material leaf headers (Mat No / Qty / Price / Sum)
 */
export function MaterialLeafHeaders({ count = 1, isPseUser }) {
  // returns sequence of <th> * count * 4
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={`matLeafHdr-${i}`}>
          <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Mat No</th>
          <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Qty</th>
          {!isPseUser && <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Price</th>}
          {!isPseUser && <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Sum</th>}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * Material leaf data cells (Mat No / Qty / Price / Sum)
 * innerArr is an array of material objects; if missing an entry, cells show '-'
 */
export function MaterialLeafCells({ arr = [], count = 1, isPseUser }) {
  debugger;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const mat = arr[i] || {};
        return (
          <React.Fragment key={`matLeafData-${i}`}>
            <td className="align-middle">{mat.materialNo ?? "-"}</td>
            <td className="text-right">{mat.qty ?? "-"}</td>
            {!isPseUser && <td className="text-right">{mat.price ?? "-"}</td>}
            {!isPseUser && <td className="text-right">{mat.sum ?? "-"}</td>}
          </React.Fragment>
        );
      })}
    </>
  );
}