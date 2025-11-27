import React from 'react';

export function PartInfoHeaders({ checked }) {
  return (
    <>
      {checked.includes('part_no_part') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Part No </th>}
      {checked.includes('part_name') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Part Name</th>}
      {checked.includes('parent_part') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Parent Part</th>}
      {checked.includes('supplier_code') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Supplier Code</th>}
      {checked.includes('supplier_name') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Supplier Name</th>}
      {checked.includes('part_status') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Part Status</th>}
      {checked.includes('dtl_part_status') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Dtl Part Status</th>}
      {checked.includes('pack_spec_status') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Pack Spec Status</th>}
      {checked.includes('weight_pc') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Weight/Pc (Kg)</th>}
      {checked.includes('qty_box') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Qty/Box</th>}
    </>
  );
}

export function PartInfoCells({ partInfo, checked }) {
  return (
    <>
      {checked.includes('part_no_part') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.part_no ?? "-"}</td>}
      {checked.includes('part_name') && <td className="align-middle">{partInfo.part_name ?? "-"}</td>}
      {checked.includes('parent_part') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.parent_no ?? "-"}</td>}
      {checked.includes('supplier_code') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.supplier?.supplier_code ?? "-"}</td>}
      {checked.includes('supplier_name') && <td className="align-middle">{partInfo.supplier?.supplier_name ?? "-"}</td>}
      {checked.includes('part_status') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.part_status ?? "-"}</td>}
      {checked.includes('dtl_part_status') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.detail_part_status ?? "-"}</td>}
      {checked.includes('pack_spec_status') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.packing_spec_status ?? "-"}</td>}
      {checked.includes('weight_pc') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.weightPerPc ?? "-"}</td>}
      {checked.includes('qty_box') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.qtyPerBox ?? "-"}</td>}
    </>
  );
}