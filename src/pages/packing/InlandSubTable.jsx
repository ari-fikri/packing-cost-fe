// src/components/packing/InlandSubTable.jsx
import React from "react";

/**
 * InlandSubTable
 * props:
 *  - part: part object (used for partNo / boxM3 if needed)
 *  - inland: { totalCost, prevYear, diff } (optional)
 *
 * Layout:
 *  - Left-aligned "INLAND" title row
 *  - Header: Pack Time(V-PASS) | Inland Cost | Inland Cost M3 | Diff | Milkrun cost
 *  - One data row with simple derived values
 */
export default function InlandSubTable({ part = {}, inland = { totalCost: 0 } }) {
  const total = Number(inland.totalCost || 0);

  // Heuristics for example values (replace with real formulas if available)
  const packTime = part.partNo || ""; // per screenshot, first cell shows partNo in row
  const inlandCost = Math.round(total * 0.7) || 0;
  const inlandCostM3 = Math.round(total * 0.3) || 0;
  const diff = inland.diff ?? (inland.prevYear ? `${Math.round(((total - inland.prevYear) / Math.max(1, inland.prevYear)) * 100)}%` : "—");
  const milkrunCost = Math.max(1, Math.round(total * 0.02));

  const fmt = (v) => (v === null || v === undefined ? "" : String(v));

  return (
    <div className="mb-3">
      <table className="table table-sm table-bordered mb-1 w-100">
        <thead>
          {/* Title row: left aligned INLAND */}
          <tr style={{ backgroundColor: "#d0d0d0" }}>
            <th colSpan={5} className="text-left">
              <strong>INLAND</strong>
            </th>
          </tr>

          {/* Header row */}
          <tr style={{ backgroundColor: "#efefef" }}>
            <th>Pack Time (V-PASS)</th>
            <th>Inland Cost</th>
            <th>Inland Cost M3</th>
            <th>Diff</th>
            <th>Milkrun cost</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="text-left">{fmt(packTime)}</td>
            <td>{fmt(inlandCost)}</td>
            <td>{fmt(inlandCostM3)}</td>
            <td>{fmt(diff)}</td>
            <td>{fmt(milkrunCost)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
