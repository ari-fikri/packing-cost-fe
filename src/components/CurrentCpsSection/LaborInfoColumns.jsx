// LaborInfoColumns.jsx
import React from "react";

/**
 * Man Hour Requirement leaf headers (the 13 columns)
 */
export function LaborManHourHeaders() {
  return (
    <>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Receiving</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Inspection</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Delivery Course</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Pallet Supply</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Binding</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Sorting & Supply</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Pick & Packing</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Vanning</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Box/Valet Return</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Mix Van</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Lashing</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Total Time Req</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Others</th>
    </>
  );
}

/**
 * Labor Cost leaf headers (4 columns)
 */
export function LaborCostHeaders() {
  return (
    <>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Current</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>DL</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>IDL</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Facility Others</th>
    </>
  );
}

/**
 * Data cells for man hour requirement (expects labor object)
 */
export function LaborManHourCells({ labor = {} }) {
  return (
    <>
      <td className="align-middle">{labor.receiving ?? "-"}</td>
      <td className="align-middle">{labor.inspection ?? "-"}</td>
      <td className="align-middle">{labor.deliveryCourse ?? "-"}</td>
      <td className="align-middle">{labor.palletSupply ?? "-"}</td>
      <td className="align-middle">{labor.binding ?? "-"}</td>
      <td className="align-middle">{labor.sorting ?? "-"}</td>
      <td className="align-middle">{labor.pickPacking ?? "-"}</td>
      <td className="align-middle">{labor.vanning ?? "-"}</td>
      <td className="align-middle">{labor.boxValetReturn ?? "-"}</td>
      <td className="align-middle">{labor.mixVan ?? "-"}</td>
      <td className="align-middle">{labor.lashing ?? "-"}</td>
      <td className="align-middle">{labor.totalTimeReq ?? "-"}</td>
      <td className="align-middle">{labor.others ?? "-"}</td>
    </>
  );
}

/**
 * Data cells for labor cost
 */
export function LaborCostCells({ labor = {} }) {
  return (
    <>
      <td className="align-middle">{labor.laborCostCurrent ?? "-"}</td>
      <td className="align-middle">{labor.laborCostDL ?? "-"}</td>
      <td className="align-middle">{labor.laborCostIDL ?? "-"}</td>
      <td className="align-middle">{labor.laborCostFacility ?? "-"}</td>
    </>
  );
}