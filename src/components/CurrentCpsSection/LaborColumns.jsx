// src/components/CurrentCpsSection/LaborColumns.jsx
import React from 'react';

export function LaborHeader() {
  return <th colSpan="11">Labor - Man Hour Requirement</th>;
}

export function LaborSubHeaders() {
  return (
    <>
      <th>Receiving</th>
      <th>Inspection</th>
      <th>Delivery Course</th>
      <th>Pallet Supply</th>
      <th>Pick & Packing</th>
      <th>Vanning</th>
      <th>Box/Valet Return</th>
      <th>Mix Van</th>
      <th>Lashing</th>
      <th>Total Time Req</th>
      <th>Others</th>
    </>
  );
}

export function LaborData({ labor }) {
  return (
    <>
      <td>{labor.receiving}</td>
      <td>{labor.inspection}</td>
      <td>{labor.deliveryCourse}</td>
      <td>{labor.palletSupply}</td>
      <td>{labor.pickPacking}</td>
      <td>{labor.vanning}</td>
      <td>{labor.boxValetReturn}</td>
      <td>{labor.mixVan}</td>
      <td>{labor.lashing}</td>
      <td>{labor.totalTimeReq}</td>
      <td>{labor.others}</td>
    </>
  );
}
