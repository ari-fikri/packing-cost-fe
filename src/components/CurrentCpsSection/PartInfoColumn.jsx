// src/components/CurrentCpsSection/PartInfoColumns.jsx
import React from 'react';

export function PartInfoHeader() {
  return (
    <>
      <th rowSpan="4">Part No</th>
      <th rowSpan="4">Part Name</th>
      <th rowSpan="4">Parent No</th>
      <th rowSpan="4">Supplier Code</th>
      <th rowSpan="4">Supplier Name</th>
      <th rowSpan="4">Weight/pc</th>
      <th rowSpan="4">Qty/Box</th>
    </>
  );
}

export function PartInfoData({ current }) {
  return (
    <>
      <td>{current.partNo || ''}</td>
      <td>{current.partName || ''}</td>
      <td>{current.parentNo || ''}</td>
      <td>{current.supplierCode || ''}</td>
      <td>{current.supplierName || ''}</td>
      <td>{current.weightPerPc || ''}</td>
      <td>{current.qtyPerBox || ''}</td>
    </>
  );
}
