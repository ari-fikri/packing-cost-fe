import React from 'react';

export function PseInfoHeaders({ visibleColumns }) {
  return (
    <>
      {visibleColumns.packingPlant && <th colSpan={2} className="align-middle border text-center tbl-row2-hdr">Packing Plant</th>}
      {visibleColumns.vanningPlant && <th colSpan={2} className="align-middle border text-center tbl-row2-hdr">Vanning Plant</th>}
      {visibleColumns.orderPattern && <th colSpan={2} className="align-middle border text-center tbl-row2-hdr">Order Pattern</th>}
      {visibleColumns.katashiiki && <th colSpan={4} className="align-middle border text-center tbl-row2-hdr">Katashiiki</th>}
      {visibleColumns.importerLineProcess && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Importer Line Process</th>}
      {visibleColumns.caseCode && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Case code</th>}
      {visibleColumns.boxNumber && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Box Number</th>}
      {visibleColumns.renban && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Renban</th>}
      {visibleColumns.renbanEff && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Renban Eff</th>}
      {visibleColumns.packingProcess && <th colSpan={2} className="align-middle border text-center tbl-row2-hdr">Packing Process</th>}
    </>
  );
}

export function PseInfoSubHeaders({ visibleColumns }) {
    return (
      <>
        {/* Packing Plant */}
        {visibleColumns.packingPlant && <th className="align-middle border text-center tbl-row2-hdr">Current</th>}
        {visibleColumns.packingPlant && <th className="align-middle border text-center tbl-row2-hdr">Next</th>}
        {/* Vanning Plant */}
        {visibleColumns.vanningPlant && <th className="align-middle border text-center tbl-row2-hdr">Current</th>}
        {visibleColumns.vanningPlant && <th className="align-middle border text-center tbl-row2-hdr">Next</th>}
        {/* Order Pattern */}
        {visibleColumns.orderPattern && <th className="align-middle border text-center tbl-row2-hdr">Current</th>}
        {visibleColumns.orderPattern && <th className="align-middle border text-center tbl-row2-hdr">Next</th>}
        {/* Katashiiki */}
        {visibleColumns.katashiiki && <th className="align-middle border text-center tbl-row2-hdr">AD</th>}
        {visibleColumns.katashiiki && <th className="align-middle border text-center tbl-row2-hdr">AU</th>}
        {visibleColumns.katashiiki && <th className="align-middle border text-center tbl-row2-hdr">AF</th>}
        {visibleColumns.katashiiki && <th className="align-middle border text-center tbl-row2-hdr">AX</th>}
        {/* Packing Process */}
        {visibleColumns.packingProcess && <th className="align-middle border text-center tbl-row2-hdr">Boxing</th>}
        {visibleColumns.packingProcess && <th className="align-middle border text-center tbl-row2-hdr">Stacking</th>}
      </>
    );
}

export function PseInfoCells({ pseInfo, visibleColumns }) {
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
      {visibleColumns.packingPlant && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{packing_plant_curr ?? '-'}</td>}
      {visibleColumns.packingPlant && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{packing_plant_next ?? '-'}</td>}
      {visibleColumns.vanningPlant && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{vanning_plant_curr ?? '-'}</td>}
      {visibleColumns.vanningPlant && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{vanning_plant_next ?? '-'}</td>}
      {visibleColumns.orderPattern && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{order_pattern_curr ?? '-'}</td>}
      {visibleColumns.orderPattern && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{order_pattern_next ?? '-'}</td>}
      {visibleColumns.katashiiki && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{katashiki?.AD ?? '-'}</td>}
      {visibleColumns.katashiiki && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{katashiki?.AU ?? '-'}</td>}
      {visibleColumns.katashiiki && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{katashiki?.AF ?? '-'}</td>}
      {visibleColumns.katashiiki && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{katashiki?.AX ?? '-'}</td>}
      {visibleColumns.importerLineProcess && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{importer_line_process ?? '-'}</td>}
      {visibleColumns.caseCode && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{case_code ?? '-'}</td>}
      {visibleColumns.boxNumber && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{box_number ?? '-'}</td>}
      {visibleColumns.renban && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{renban ?? '-'}</td>}
      {visibleColumns.renbanEff && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{renban_eff ?? '-'}</td>}
      {visibleColumns.packingProcess && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{packing_process_boxing ?? '-'}</td>}
      {visibleColumns.packingProcess && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{packing_process_stacking ?? '-'}</td>}
    </>
  );
}