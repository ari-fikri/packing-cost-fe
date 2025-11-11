import React from 'react';

export function PartInfoHeaders() {
  return (
    <>
      <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        Part No
      </th>
      <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        Part Name
      </th>
      <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        Parent Part
      </th>
      <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        Supplier Code
      </th>
      <th rowSpan={2} className="align-middle">
        Supplier Name
      </th>
      <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        Part Status
      </th>
      <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        Dtl Part Status
      </th>
      <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        Pack Spec Status
      </th>
      <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        Weight/Pc (Kg)
      </th>
      <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        Qty/Box
      </th>
    </>
  );
}

export function PartInfoCells({ partInfo }) {
  return (
    <>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.part_no ?? "-"}</td>
      <td className="align-middle">{partInfo.part_name ?? "-"}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.parent_no ?? "-"}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.supplier?.supplier_code ?? "-"}</td>
      <td className="align-middle">{partInfo.supplier?.supplier_name ?? "-"}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.part_status ?? "-"}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.detail_part_status ?? "-"}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.packing_spec_status ?? "-"}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.weightPerPc ?? "-"}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{partInfo.qtyPerBox ?? "-"}</td>
    </>
  );
}