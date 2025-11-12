import React from 'react';

export function PseInfoHeaders() {
  return (
    <>
      <th colSpan={2} className="align-middle border text-center tbl-row2-hdr">Packing Plant</th>
      <th colSpan={2} className="align-middle border text-center tbl-row2-hdr">Vanning Plant</th>
      <th colSpan={2} className="align-middle border text-center tbl-row2-hdr">Order Pattern</th>
      <th colSpan={4} className="align-middle border text-center tbl-row2-hdr">Katashiiki</th>
      <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Importer Line Process</th>
      <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Case code</th>
      <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Box Number</th>
      <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Renban</th>
      <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Renban Eff</th>
      <th colSpan={2} className="align-middle border text-center tbl-row2-hdr">Packing Process</th>
    </>
  );
}

export function PseInfoSubHeaders() {
    return (
      <>
        {/* Packing Plant */}
        <th className="align-middle border text-center tbl-row2-hdr">Current</th>
        <th className="align-middle border text-center tbl-row2-hdr">Next</th>
        {/* Vanning Plant */}
        <th className="align-middle border text-center tbl-row2-hdr">Current</th>
        <th className="align-middle border text-center tbl-row2-hdr">Next</th>
        {/* Order Pattern */}
        <th className="align-middle border text-center tbl-row2-hdr">Current</th>
        <th className="align-middle border text-center tbl-row2-hdr">Next</th>
        {/* Katashiiki */}
        <th className="align-middle border text-center tbl-row2-hdr">AD</th>
        <th className="align-middle border text-center tbl-row2-hdr">AU</th>
        <th className="align-middle border text-center tbl-row2-hdr">AF</th>
        <th className="align-middle border text-center tbl-row2-hdr">AX</th>
        {/* Packing Process */}
        <th className="align-middle border text-center tbl-row2-hdr">Boxing</th>
        <th className="align-middle border text-center tbl-row2-hdr">Stacking</th>
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