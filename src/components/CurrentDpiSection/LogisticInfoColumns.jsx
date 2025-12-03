import React from 'react';

export function LogisticInfoHeaders({ checked }) {
  return (
    <>
      {checked.includes('dock_code') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Dock Code</th>}
      {checked.includes('address') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Address</th>}
      {checked.includes('process_type') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Process Type</th>}
    </>
  );
}

export function LogisticInfoCells({ logisticInfo, checked }) {
  const { dock_code, address_rack, process_type } = logisticInfo || {};
  return (
    <>
      {checked.includes('dock_code') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{dock_code ?? '-'}</td>}
      {checked.includes('address') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{address_rack ?? '-'}</td>}
      {checked.includes('process_type') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{process_type ?? '-'}</td>}
    </>
  );
}