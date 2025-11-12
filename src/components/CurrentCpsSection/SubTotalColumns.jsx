// SubTotalColumns.jsx
import React from "react";

/**
 * SubTotal header cells (Top-level cell already spans rows in main component).
 * This component renders the 3rd-row subheaders: Inner, Outer, Material, Labor, Inland
 */
export function SubTotalHeaders() {
  return (
    <>
      <th className="align-middle">Inner</th>
      <th className="align-middle">Outer</th>
      <th className="align-middle">Material</th>
      <th className="align-middle">Labor</th>
      <th className="align-middle">Inland</th>
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
