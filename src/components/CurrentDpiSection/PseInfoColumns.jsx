import React from 'react';

export function PseInfoHeaders({ checked }) {
  const showPackingPlant = checked.includes('packing_plant_current') || checked.includes('packing_plant_next');
  const packingPlantColSpan = [checked.includes('packing_plant_current'), checked.includes('packing_plant_next')].filter(Boolean).length;

  const showVanningPlant = checked.includes('vanning_plant_current') || checked.includes('vanning_plant_next');
  const vanningPlantColSpan = [checked.includes('vanning_plant_current'), checked.includes('vanning_plant_next')].filter(Boolean).length;

  const showOrderPattern = checked.includes('order_pattern_current') || checked.includes('order_pattern_next');
  const orderPatternColSpan = [checked.includes('order_pattern_current'), checked.includes('order_pattern_next')].filter(Boolean).length;

  const showKatashiiki = checked.includes('katashiiki');

  const showPackingProcess = checked.includes('packing_process_boxing') || checked.includes('packing_process_stacking');
  const packingProcessColSpan = [checked.includes('packing_process_boxing'), checked.includes('packing_process_stacking')].filter(Boolean).length;

  return (
    <>
      {showPackingPlant && <th colSpan={packingPlantColSpan} className="align-middle border text-center tbl-row2-hdr">Packing Plant</th>}
      {showVanningPlant && <th colSpan={vanningPlantColSpan} className="align-middle border text-center tbl-row2-hdr">Vanning Plant</th>}
      {showOrderPattern && <th colSpan={orderPatternColSpan} className="align-middle border text-center tbl-row2-hdr">Order Pattern</th>}
      {showKatashiiki && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Katashiiki</th>}
      {checked.includes('importer_line_process') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr text-nowrap">Importer Line Process</th>}
      {checked.includes('case_code') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Case code</th>}
      {checked.includes('box_number') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Box Number</th>}
      {checked.includes('renban') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Renban</th>}
      {checked.includes('renban_eff') && <th rowSpan={2} className="align-middle border text-center tbl-row2-hdr">Renban Eff</th>}
      {showPackingProcess && <th colSpan={packingProcessColSpan} className="align-middle border text-center tbl-row2-hdr">Packing Process</th>}
    </>
  );
}

export function PseInfoSubHeaders({ checked }) {
    return (
      <>
        {/* Packing Plant */}
        {checked.includes('packing_plant_current') && <th className="align-middle border text-center tbl-row2-hdr">Current</th>}
        {checked.includes('packing_plant_next') && <th className="align-middle border text-center tbl-row2-hdr">Next</th>}
        {/* Vanning Plant */}
        {checked.includes('vanning_plant_current') && <th className="align-middle border text-center tbl-row2-hdr">Current</th>}
        {checked.includes('vanning_plant_next') && <th className="align-middle border text-center tbl-row2-hdr">Next</th>}
        {/* Order Pattern */}
        {checked.includes('order_pattern_current') && <th className="align-middle border text-center tbl-row2-hdr">Current</th>}
        {checked.includes('order_pattern_next') && <th className="align-middle border text-center tbl-row2-hdr">Next</th>}
        {/* Packing Process */}
        {checked.includes('packing_process_boxing') && <th className="align-middle border text-center tbl-row2-hdr">Boxing</th>}
        {checked.includes('packing_process_stacking') && <th className="align-middle border text-center tbl-row2-hdr">Stacking</th>}
      </>
    );
}

export function PseInfoCells({ pseInfo, checked }) {
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
      {checked.includes('packing_plant_current') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{packing_plant_curr ?? '-'}</td>}
      {checked.includes('packing_plant_next') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{packing_plant_next ?? '-'}</td>}
      {checked.includes('vanning_plant_current') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{vanning_plant_curr ?? '-'}</td>}
      {checked.includes('vanning_plant_next') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{vanning_plant_next ?? '-'}</td>}
      {checked.includes('order_pattern_current') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{order_pattern_curr ?? '-'}</td>}
      {checked.includes('order_pattern_next') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{order_pattern_next ?? '-'}</td>}
      {checked.includes('katashiiki') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>
        {Array.isArray(katashiki) && katashiki.length > 0 ? (
          katashiki.map((k, i) => (
            <span key={i} className="badge badge-primary mr-1">{k.string} : {k.number}</span>
          ))
        ) : (
          '-'
        )}
      </td>}
      {checked.includes('importer_line_process') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{importer_line_process ?? '-'}</td>}
      {checked.includes('case_code') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{case_code ?? '-'}</td>}
      {checked.includes('box_number') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{box_number ?? '-'}</td>}
      {checked.includes('renban') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{renban ?? '-'}</td>}
      {checked.includes('renban_eff') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{renban_eff ?? '-'}</td>}
      {checked.includes('packing_process_boxing') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{packing_process_boxing ?? '-'}</td>}
      {checked.includes('packing_process_stacking') && <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{packing_process_stacking ?? '-'}</td>}
    </>
  );
}