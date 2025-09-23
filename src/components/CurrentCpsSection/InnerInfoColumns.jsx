// src/components/CurrentCpsSection/InnerInfoColumns.jsx
import React from 'react';

export function InnerInfoHeader({ innerMaterials }) {
  return (
    <>
      <th colSpan={innerMaterials.length * 4}>Inner Info</th>
    </>
  );
}

// For the 2nd header row under Inner Info: Material 1, Material 2, ...
export function InnerMaterialsGroupHeaders({ innerMaterials }) {
  return (
    <>
      {innerMaterials.map((mat, idx) => (
        <th key={`innerMatHdr${idx}`} colSpan="4">Material {idx + 1}</th>
      ))}
    </>
  );
}

// For the 3rd & 4th levels: sub-headers and data
export function InnerInfoSubHeaders({ innerMaterials }) {
  return (
    <>
      {innerMaterials.map((mat, idx) => (
        <React.Fragment key={`innerMatSubHdr${idx}`}>
          <th>Mat No</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Sum</th>
        </React.Fragment>
      ))}
    </>
  );
}

export function InnerInfoData({ innerMaterials }) {
  return (
    <>
      {innerMaterials.map((mat, idx) => (
        <React.Fragment key={`innerMatData${idx}`}>
          <td>{mat.materialNo}</td>
          <td>{mat.qty}</td>
          <td>{mat.price}</td>
          <td>{mat.sum}</td>
        </React.Fragment>
      ))}
    </>
  );
}
