import React from "react";

/**
 * OuterSubTable
 * props:
 *  - part
 *  - outerArr
 */
export default function OuterSubTable({ part, outerArr = [] }) {
  return (
    <div className="mb-3">
      <table className="table table-sm table-bordered mb-1 w-100">
        <thead>
          <tr style={{ backgroundColor: "#d0d0d0" }}>
            <th colSpan={40} className="text-left">
              <strong>OUTER</strong>
            </th>
          </tr>

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
        </thead>

        <tbody>
          <tr>
            {Array.from({ length: 10 }).map((_, m) => {
              const price = outerArr[m] || 0;
              const qty = 1;
              const sum = price * qty;
              return (
                <React.Fragment key={m}>
                  <td className="text-left">{part.partNo}</td>
                  <td>{qty}</td>
                  <td>{price}</td>
                  <td>{sum}</td>
                </React.Fragment>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
