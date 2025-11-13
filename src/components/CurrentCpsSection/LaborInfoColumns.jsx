// LaborInfoColumns.jsx
import React from "react";

/**
 * Man Hour Requirement leaf headers (the 13 columns)
 */
export function LaborManHourHeaders() {
  return (
    <>
      <th className="align-middle">Receiving</th>
      <th className="align-middle">Inspection</th>
      <th className="align-middle">Dlvr Course</th>
      <th className="align-middle">Pallet Supply</th>
      <th className="align-middle">Binding</th>
      <th className="align-middle">Sort & Supply</th>
      <th className="align-middle">Pick & Packing</th>
      <th className="align-middle">Vanning</th>
      <th className="align-middle">Box/Valet Rtrn</th>
      <th className="align-middle">Mix Van</th>
      <th className="align-middle">Lashing</th>
      <th className="align-middle">Total Time Req</th>
      <th className="align-middle">Others</th>
    </>
  );
}

/**
 * Labor Cost leaf headers (4 columns)
 */
export function LaborCostHeaders() {
  return (
    <>
      <th className="align-middle">Current</th>
      <th className="align-middle">DL</th>
      <th className="align-middle">IDL</th>
      <th className="align-middle">Facility Others</th>
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
