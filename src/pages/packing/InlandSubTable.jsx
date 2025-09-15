// src/components/packing/InlandSubTable.jsx
import React, { useState } from "react";

export default function InlandSubTable({ part = {}, inland = { totalCost: 0 } }) {
  const [expanded, setExpanded] = useState(true);
  const toggle = () => setExpanded((v) => !v);

  const total = Number(inland.totalCost || 0);

  // Heuristic example values
  const packTime = part.partNo || ""; 
  const inlandCost = Math.round(total * 0.7) || 0;
  const inlandCostM3 = Math.round(total * 0.3) || 0;
  const diff =
    inland.diff ??
    (inland.prevYear
      ? `${Math.round(((total - inland.prevYear) / Math.max(1, inland.prevYear)) * 100)}%`
      : "—");
  const milkrunCost = Math.max(1, Math.round(total * 0.02));

  const fmt = (v) => (v === null || v === undefined ? "" : String(v));

  return (
    <div className="mb-3">
      <table className="table table-sm table-bordered mb-1 w-100">
        <thead>
          {/* Title row with chevron */}
          <tr style={{ backgroundColor: "#d0d0d0" }}>
            <th colSpan={5} className="text-left" style={{ verticalAlign: "middle" }}>
              <button
                type="button"
                onClick={toggle}
                className="btn btn-sm btn-light"
                aria-expanded={expanded}
                style={{ padding: "0 .45rem", marginRight: 8 }}
                title={expanded ? "Collapse INLAND" : "Expand INLAND"}
              >
                <i className={`fas ${expanded ? "fa-chevron-down" : "fa-chevron-right"}`} />
              </button>
              <strong>INLAND</strong>
            </th>
          </tr>

          {/* Header row */}
          {expanded && (
            <tr style={{ backgroundColor: "#efefef" }}>
              <th>Pack Time (V-PASS)</th>
              <th>Inland Cost</th>
              <th>Inland Cost M3</th>
              <th>Diff</th>
              <th>Milkrun cost</th>
            </tr>
          )}
        </thead>

        {expanded && (
          <tbody>
            <tr>
              <td className="text-left">{fmt(packTime)}</td>
              <td>{fmt(inlandCost)}</td>
              <td>{fmt(inlandCostM3)}</td>
              <td>{fmt(diff)}</td>
              <td>{fmt(milkrunCost)}</td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}
