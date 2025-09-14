import React from "react";

/**
 * InlandSubTable
 * props:
 *  - part
 *  - inland: { totalCost } optional
 */
export default function InlandSubTable({ part, inland = { totalCost: 0 } }) {
  return (
    <div className="mb-3">
      <table className="table table-sm table-bordered mb-1 w-100">
        <thead>
          <tr style={{ backgroundColor: "#d0d0d0" }}>
            <th colSpan={10} className="text-left">
              <strong>INLAND</strong>
            </th>
          </tr>
          <tr style={{ backgroundColor: "#efefef" }}>
            <th>Item</th>
            <th>Value</th>
            <th>M3</th>
            <th>Diff</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left">Pack Time (V-PASS)</td>
            <td>{Math.round((inland.totalCost || 0) * 0.6)}</td>
            <td>{part.boxM3 || ""}</td>
            <td>—</td>
            <td />
          </tr>
          <tr>
            <td className="text-left">Inland Cost</td>
            <td>{Math.round((inland.totalCost || 0) * 0.4)}</td>
            <td>{part.boxM3 || ""}</td>
            <td>—</td>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
