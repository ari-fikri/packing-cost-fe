import React from "react";

/**
 * TotalSummary
 * props:
 *  - part
 */
export default function TotalSummary({ part }) {
  return (
    <div>
      <table className="table table-sm table-bordered mb-0 w-100">
        <thead>
          <tr style={{ backgroundColor: "#d0d0d0" }}>
            <th colSpan={8} className="text-left">
              <strong>TOTAL</strong>
            </th>
          </tr>
          <tr style={{ backgroundColor: "#efefef" }}>
            <th>Inner</th>
            <th>Outer</th>
            <th>Material</th>
            <th>Labor</th>
            <th>Inland</th>
            <th>Total Cost</th>
            <th>Prev Year</th>
            <th>Diff</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{part.inner?.totalCost ?? ""}</td>
            <td>{part.outer?.totalCost ?? ""}</td>
            <td>{part.material?.totalCost ?? ""}</td>
            <td>{part.labor?.totalCost ?? ""}</td>
            <td>{part.inland?.totalCost ?? ""}</td>
            <td>{part.total?.totalCost ?? ""}</td>
            <td>{part.total?.prevYear ?? ""}</td>
            <td>{part.total?.diff ?? ""}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
