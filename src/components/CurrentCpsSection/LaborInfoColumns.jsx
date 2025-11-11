// LaborInfoColumns.jsx
import React from "react";

/**
 * Man Hour Requirement leaf headers (the 13 columns)
 */
export function LaborManHourHeaders() {
  return (
    <>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Receiving</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Inspection</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Delivery Course</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Pallet Supply</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Binding</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Sorting & Supply</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Pick & Packing</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Vanning</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Box/Valet Return</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Mix Van</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Lashing</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Total Time Req</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Others</th>
    </>
  );
}

/**
 * Labor Cost leaf headers (4 columns)
 */
export function LaborCostHeaders() {
  return (
    <>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Current</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>DL</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>IDL</th>
      <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Facility Others</th>
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