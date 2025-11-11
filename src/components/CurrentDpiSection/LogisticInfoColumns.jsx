import React from 'react';

export function LogisticInfoHeaders() {
  return (
    <>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Dock Code</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Address</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Process Type</th>
    </>
  );
}

export function LogisticInfoCells({ logisticInfo }) {
  const { dock_code, address_rack, process_type } = logisticInfo || {};
  return (
    <>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{dock_code ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{address_rack ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{process_type ?? '-'}</td>
    </>
  );
}