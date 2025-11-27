import React from 'react';

export function LogisticInfoHeaders({ visibleColumns }) {
  return (
    <>
      {visibleColumns.dockCode && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Dock Code</th>}
      {visibleColumns.address && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Address</th>}
      {visibleColumns.processType && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Process Type</th>}
    </>
  );
}

export function LogisticInfoCells({ logisticInfo, visibleColumns }) {
  const { dock_code, address_rack, process_type } = logisticInfo || {};
  return (
    <>
      {visibleColumns.dockCode && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{dock_code ?? '-'}</td>}
      {visibleColumns.address && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{address_rack ?? '-'}</td>}
      {visibleColumns.processType && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{process_type ?? '-'}</td>}
    </>
  );
}