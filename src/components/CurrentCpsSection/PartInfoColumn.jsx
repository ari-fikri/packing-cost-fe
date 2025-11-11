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
      <td>{current.cps?.part_no || ''}</td>
      <td>{current.cps?.part_name || ''}</td>
      <td>{current.cps?.parent_mo || ''}</td>
      <td>{current.cps?.supplier?.supplier_code || ''}</td>
      <td>{current.cps?.supplier?.supplier_name || ''}</td>
      <td>{current.cps?.weightPerPc || ''}</td>
      <td>{current.cps?.qtyPerBox || ''}</td>
    </>
  );
}
