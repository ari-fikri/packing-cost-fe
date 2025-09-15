// src/components/packing/InnerSubTable.jsx
import React, { useState } from "react";

/**
 * InnerSubTable
 * props:
 *  - part: part object (used to show Part No in each material column)
 *  - innerArr: array of length 10 (price or per-material values). If shorter, missing values default to 0.
 *
 * Behavior:
 *  - Shows a title row with a chevron + "INNER" (chevron toggles expand/collapse)
 *  - Default state: expanded
 *  - When collapsed only the title row is visible
 *  - When expanded it shows:
 *      - a row of Material 1..10 (each with colSpan=4)
 *      - a row of sub-headers: Part No | Qty | Price | Sum (repeated 10 times)
 *      - one data row using part.partNo, qty=1, price from innerArr, sum = price * qty
 */
export default function InnerSubTable({ part = {}, innerArr = [] }) {
  const [expanded, setExpanded] = useState(true);

  const toggle = () => setExpanded((v) => !v);

  const fmt = (v) => (v === null || v === undefined ? "" : String(v));

  return (
    <div className="mb-3">
      <table className="table table-sm table-bordered mb-1 w-100">
        <thead>
          {/* Title row: chevron + INNER */}
          <tr style={{ backgroundColor: "#d0d0d0" }}>
            <th colSpan={40} className="text-left" style={{ verticalAlign: "middle" }}>
              <button
                type="button"
                onClick={toggle}
                className="btn btn-sm btn-light"
                aria-expanded={expanded}
                style={{ padding: "0 .45rem", marginRight: 8 }}
                title={expanded ? "Collapse INNER" : "Expand INNER"}
              >
                <i className={`fas ${expanded ? "fa-chevron-down" : "fa-chevron-right"}`} />
              </button>
              <strong>INNER</strong>
            </th>
          </tr>

          {/* Secondary headers only when expanded */}
          {expanded && (
            <>
              <tr style={{ backgroundColor: "#d0d0d0" }}>
                {Array.from({ length: 10 }).map((_, m) => (
                  <th key={m} colSpan={4} className="text-center">
                    Material {m + 1}
                  </th>
                ))}
              </tr>

              <tr style={{ backgroundColor: "#efefef" }}>
                {Array.from({ length: 10 }).map((_, j) => (
                  <React.Fragment key={j}>
                    <th>Part No</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Sum</th>
                  </React.Fragment>
                ))}
              </tr>
            </>
          )}
        </thead>

        {/* Body only when expanded */}
        {expanded && (
          <tbody>
            <tr>
              {Array.from({ length: 10 }).map((_, m) => {
                const price = Number(innerArr[m] || 0);
                const qty = 1;
                const sum = price * qty;
                return (
                  <React.Fragment key={m}>
                    <td className="text-left">{fmt(part.partNo)}</td>
                    <td>{qty}</td>
                    <td>{fmt(price)}</td>
                    <td>{fmt(sum)}</td>
                  </React.Fragment>
                );
              })}
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}
