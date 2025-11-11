// SubTotalColumns.jsx
import React from "react";

/**
 * SubTotal header cells (Top-level cell already spans rows in main component).
 * This component renders the 3rd-row subheaders: Inner, Outer, Material, Labor, Inland
 */
export function SubTotalHeaders() {
  return (
    <>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef', whiteSpace: 'nowrap' }}>Inner</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef', whiteSpace: 'nowrap' }}>Outer</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef', whiteSpace: 'nowrap' }}>Material</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef', whiteSpace: 'nowrap' }}>Labor</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#e9ecef', whiteSpace: 'nowrap' }}>Inland</th>
    </>
  );
}

/**
 * SubTotal data cells
 */
export function SubTotalData({ current = {} }) {
  return (
    <>
      <td className="align-middle">{current.subTotalInner ?? "-"}</td>
      <td className="align-middle">{current.subTotalOuter ?? "-"}</td>
      <td className="align-middle">{current.subTotalMaterial ?? "-"}</td>
      <td className="align-middle">{current.subTotalLabor ?? "-"}</td>
      <td className="align-middle">{current.subTotalInland ?? "-"}</td>
    </>
  );
}