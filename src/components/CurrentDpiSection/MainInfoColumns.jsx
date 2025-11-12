import React from 'react';

export function MainInfoHeaders() {
  return (
    <>
      <th rowSpan={3} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        Destination
      </th>
      <th rowSpan={3} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        Model
      </th>
      <th rowSpan={3} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        Impl Period
      </th>
      <th rowSpan={3} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        CPS No
      </th>
    </>
  );
}

export function MainInfoCells({ mainInfo }) {
  const { destination, model_name, impl_period, cps_no } = mainInfo || {};
  debugger;
  return (
    <>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{mainInfo?.cps?.model?.destination?.code ?? "-"}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{mainInfo?.model_code ?? "-"}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{mainInfo?.implementation_period ?? "-"}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{mainInfo?.cps?.cps_no ?? "-"}</td>
    </>
  );
}