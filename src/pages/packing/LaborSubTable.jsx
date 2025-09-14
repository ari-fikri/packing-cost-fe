import React from "react";

/**
 * LaborSubTable
 * props:
 *  - part
 *  - labor: { totalCost, prevYear, diff } (optional)
 */
export default function LaborSubTable({ part, labor = { totalCost: 0 } }) {
  const rows = [
    { label: "Receiving", qty: 1, rate: Math.round((labor.totalCost || 0) * 0.4) },
    { label: "Pick & Pack", qty: 1, rate: Math.round((labor.totalCost || 0) * 0.35) },
    { label: "Vanning", qty: 1, rate: Math.round((labor.totalCost || 0) * 0.25) },
  ];

  return (
    <div className="mb-3">
      <table className="table table-sm table-bordered mb-1 w-100">
        <thead>
          <tr style={{ backgroundColor: "#d0d0d0" }}>
            <th colSpan={20} className="text-left">
              <strong>LABOR</strong>
            </th>
          </tr>
          <tr style={{ backgroundColor: "#efefef" }}>
            <th>Activity</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Sum</th>
            <th>Requirement</th>
            <th>Current</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((lr, idx) => (
            <tr key={idx}>
              <td className="text-left">{lr.label}</td>
              <td>{lr.qty}</td>
              <td>{lr.rate}</td>
              <td>{lr.rate * lr.qty}</td>
              <td>{lr.qty}</td>
              <td>{lr.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
