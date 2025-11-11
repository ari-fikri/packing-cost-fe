import React from 'react';

export function PseInfoHeaders() {
  return (
    <>
      <th colSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Packing Plant</th>
      <th colSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Vanning Plant</th>
      <th colSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Order Pattern</th>
      <th colSpan={4} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Katashiiki</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Importer Line Process</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Case code</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Box Number</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Renban</th>
      <th rowSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Renban Eff</th>
      <th colSpan={2} className="align-middle border text-center" style={{ backgroundColor: '#dee2e6' }}>Packing Process</th>
    </>
  );
}

export function PseInfoSubHeaders() {
    return (
      <>
        <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Current</th>
        <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Next</th>
        <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Current</th>
        <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Next</th>
        <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Current</th>
        <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Next</th>
        <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>AD</th>
        <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>AU</th>
        <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>AF</th>
        <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>AX</th>
        <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Boxing</th>
        <th className="align-middle border text-center" style={{ backgroundColor: '#dee2e6', whiteSpace: 'nowrap' }}>Stacking</th>
      </>
    );
}

export function PseInfoCells({ pseInfo }) {
  const {
    packing_plant_curr,
    packing_plant_next,
    vanning_plant_curr,
    vanning_plant_next,
    order_pattern_curr,
    order_pattern_next,
    // katashiki_ad,
    // katashiki_au,
    // katashiki_af,
    // katashiki_ax,
    katashiki,
    importer_line_process,
    case_code,
    box_number,
    renban,
    renban_eff,
    packing_process_boxing,
    packing_process_stacking
  } = pseInfo || {};
  return (
    <>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{packing_plant_curr ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{packing_plant_next ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{vanning_plant_curr ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{vanning_plant_next ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{order_pattern_curr ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{order_pattern_next ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{katashiki?.AD ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{katashiki?.AU ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{katashiki?.AF ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{katashiki?.AX ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{importer_line_process ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{case_code ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{box_number ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{renban ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{renban_eff ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{packing_process_boxing ?? '-'}</td>
      <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{packing_process_stacking ?? '-'}</td>
    </>
  );
}