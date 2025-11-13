import React from "react";

export function PartInfoHeaders() {
  return (
    <>
      <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Part No</th>
      <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Part Name</th>
      <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Parent No</th>
      <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Supplier Code</th>
      <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Supplier Name</th>
      <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Weight/pc</th>
      <th className="align-middle border text-center tbl-row2-hdr text-nowrap">Qty/Box</th>
    </>
  );
}

export function PartInfoCells({ part }) {
  return (
    <>
      <td className="align-middle">{part.partNo ?? "-"}</td>
      <td className="align-middle">{part.partName ?? (part.name ?? "-")}</td>
      <td className="align-middle">{part.parentNo ?? "-"}</td>
      <td className="align-middle">{part.supplierCode ?? "-"}</td>
      <td className="align-middle">{part.supplierName ?? "-"}</td>
      <td className="align-middle">{part.weightPerPc ?? "-"}</td>
      <td className="align-middle">{part.qtyPerBox ?? "-"}</td>
    </>
  );
}