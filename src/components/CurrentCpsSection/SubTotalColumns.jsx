// src/components/CurrentCpsSection/SubTotalColumns.jsx
import React from 'react';

export function SubTotalHeader() {
  return <th rowSpan="4">Sub Total Costs</th>;
}

export function SubTotalData({ current }) {
  return <td>{current.subTotal || ''}</td>;
}
