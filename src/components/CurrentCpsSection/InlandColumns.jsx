// InlandColumns.jsx
import React from "react";

/**
 * Inland header leafs for the 3rd row
 */
export function InlandLeafHeaders() {
  return (
    <>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Pack Time (V-PASS)</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Inland Cost (m³)</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Diff</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Milkrun Cost</th>
    </>
  );
}

/**
 * Inland data cells
 */
export function InlandLeafCells({ inland = {} }) {
  return (
    <>
      <td className="align-middle">{inland.packTimeVPass ?? "-"}</td>
      <td className="align-middle">{inland.costM3 ?? "-"}</td>
      <td className="align-middle">{inland.diff ?? "-"}</td>
      <td className="align-middle">{inland.milkrunCost ?? "-"}</td>
    </>
  );
}