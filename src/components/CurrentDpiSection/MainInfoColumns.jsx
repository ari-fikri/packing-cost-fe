import React from 'react';

export function MainInfoHeaders({ checked }) {
  return (
    <>
      {checked.includes('destination') && <th rowSpan={3} className="align-middle border text-center tbl-row1-hdr text-nowrap">Destination</th>}
      {checked.includes('model') && <th rowSpan={3} className="align-middle border text-center tbl-row1-hdr text-nowrap">Model</th>}
      {checked.includes('impl_period') && <th rowSpan={3} className="align-middle border text-center tbl-row1-hdr text-nowrap">Impl Period</th>}
      {checked.includes('cps_no') && <th rowSpan={3} className="align-middle border text-center tbl-row1-hdr text-nowrap">CPS No</th>}
    </>
  );
}

export function MainInfoCells({ mainInfo, checked }) {
  const { destination, model_name, impl_period, cps_no } = mainInfo || {};
  // debugger;
  return (
    <>
      {checked.includes('destination') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{mainInfo?.cps?.model?.destination?.code ?? "-"}</td>}
      {checked.includes('model') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{mainInfo?.model_code ?? "-"}</td>}
      {checked.includes('impl_period') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{mainInfo?.implementation_period ?? "-"}</td>}
      {checked.includes('cps_no') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{mainInfo?.cps?.cps_no ?? "-"}</td>}
    </>
  );
}