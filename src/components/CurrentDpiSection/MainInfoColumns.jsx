import React from 'react';

export function MainInfoHeaders({ visibleColumns }) {
  return (
    <>
      {visibleColumns.destination && <th rowSpan={3} className="align-middle border text-center tbl-row1-hdr text-nowrap\">Destination</th>}
      {visibleColumns.model && <th rowSpan={3} className="align-middle border text-center tbl-row1-hdr text-nowrap\">Model</th>}
      <th rowSpan={3} className="align-middle border text-center tbl-row1-hdr text-nowrap">Impl Period</th>
      <th rowSpan={3} className="align-middle border text-center tbl-row1-hdr text-nowrap">CPS No</th>
    </>
  );
}

export function MainInfoCells({ mainInfo, visibleColumns }) {
  const { destination, model_name, impl_period, cps_no } = mainInfo || {};
  debugger;
  return (
    <>
      {visibleColumns.destination && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{mainInfo?.cps?.model?.destination?.code ?? "-"}</td>}
      {visibleColumns.model && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{mainInfo?.model_code ?? "-"}</td>}
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{mainInfo?.implementation_period ?? "-"}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{mainInfo?.cps?.cps_no ?? "-"}</td>
    </>
  );
}