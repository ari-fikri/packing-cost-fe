import React from 'react';

/**
 * Renders the leaf headers for a material table (e.g., Part No, Qty, Price, Sum).
 * @param {object} props - The component props.
 * @param {number} props.count - The number of material columns to render.
 * @returns {JSX.Element} The rendered table headers.
 */
export function MaterialLeafHeaders({ count = 10 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={`mat-leaf-hdr-${i}`}>
          <th className="align-middle border text-center text-nowrap">Part No</th>
          <th className="align-middle border text-center text-nowrap">Qty</th>
          <th className="align-middle border text-center text-nowrap">Price</th>
          <th className="align-middle border text-center text-nowrap">Sum</th>
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * Renders the data cells for a material table.
 * @param {object} props - The component props.
 * @param {Array<object>} props.arr - The array of material data.
 * @param {number} props.count - The number of material columns to render.
 * @returns {JSX.Element} The rendered table cells.
 */
export function MaterialLeafCells({ arr = [], count = 10 }) {
  const cells = [];
  for (let i = 0; i < count; i++) {
    const m = arr[i];
    cells.push(
      <React.Fragment key={`mat-leaf-cell-${i}`}>
        <td className="align-middle">{m?.partNo ?? '-'}</td>
        <td className="align-middle">{m?.qty ?? '-'}</td>
        <td className="align-middle">{m?.price ?? '-'}</td>
        <td className="align-middle">{m?.sum ?? '-'}</td>
      </React.Fragment>
    );
  }
  return <>{cells}</>;
}