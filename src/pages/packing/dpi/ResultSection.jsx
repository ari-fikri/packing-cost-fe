import React from 'react';
import { makeColGroup } from '../../../data/TableColumnDefs';
import { SubTotalData } from '../../../components/CurrentCpsSection/SubTotalColumns';
import { InnerLeafCells } from '../../../components/CurrentCpsSection/InnerInfoColumns';
import { OuterLeafCells } from '../../../components/CurrentCpsSection/OuterInfoColumns';
import { LaborManHourCells, LaborCostCells } from '../../../components/CurrentCpsSection/LaborInfoColumns';
import { InlandLeafCells } from '../../../components/CurrentCpsSection/InlandColumns';

const INNER_COUNT = 10;
const OUTER_COUNT = 10;

export default function ResultSection({
  rows,
  visibleRows,
  page,
  perPage,
  total,
  totalPages,
  goToPage,
  setPerPage,
}) {
  const { colGroup, totalWidth } = makeColGroup(INNER_COUNT, OUTER_COUNT);

  return (
    <>
      {/* small spacer */}
      <div className="mb-2" />

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-sm mb-0" style={{ width: totalWidth, whiteSpace: 'nowrap', fontSize: '8pt' }}>
          {colGroup}
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="100%" className="text-center py-4 text-muted">No Data Found</td>
              </tr>
            ) : (
              visibleRows.map((r, i) => {
                // if (r.cps?.cps_no === 'CPS-2024-001') {
                  // debugger;
                // }
                return (
                  <tr key={i}>
                    <td>
                      <button className="btn btn-sm btn-light" onClick={() => alert('placeholder')}>
                        <i className="fas fa-pencil-alt" />
                      </button>
                    </td>
                    <td>{(page - 1) * perPage + i + 1}</td>
                    <td>{r.cps?.cps_no}</td>
                    
                    <td>{r.cps?.part?.part_no || ''}</td>
                    <td>{r.cps?.part?.part_name || ''}</td>
                    <td>{r.cps?.part?.parent_no || ''}</td>
                    <td>{r.cps?.supplier?.supplier_code || ''}</td>
                    <td>{r.cps?.supplier?.supplier_name || ''}</td>
                    <td>{r.cps?.part?.weight || ''}</td>
                    <td>{r.cps?.part?.qty_per_box || ''}</td>

                    <SubTotalData current={r.subtotal} />
                    <td>-</td>
                    <InnerLeafCells data={r.cps?.packing?.inner} count={INNER_COUNT} />
                    <OuterLeafCells data={r.cps?.packing?.outer} count={OUTER_COUNT} />
                    <LaborManHourCells labor={r.manhour} />
                    <LaborCostCells labor={r.labor} />
                    <InlandLeafCells inland={r.inland} />
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(1)}>{'<<'}</button>
          <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(Math.max(1, page - 1))}>{'<'}</button>
          {[...Array(totalPages).keys()].map(n => (
            <button
              key={n}
              type="button"
              className={`btn btn-sm mr-1 ${page === n + 1 ? 'btn-primary' : 'btn-light'}`}
              onClick={() => goToPage(n + 1)}
            >
              {n + 1}
            </button>
          ))}
          <button type="button" className="btn btn-sm btn-light ml-2" onClick={() => goToPage(Math.min(totalPages, page + 1))}>{'>'}</button>
        </div>

        <div className="form-inline small">
          <span className="mr-3">Total: {total}</span>

          <div className="dropdown mr-2">
            <button className="btn btn-sm btn-light dropdown-toggle" type="button" data-toggle="dropdown">
              {perPage} per page
            </button>
            <div className="dropdown-menu">
              <button className="dropdown-item" type="button" onClick={() => { setPerPage(10); goToPage(1); }}>10</button>
              <button className="dropdown-item" type="button" onClick={() => { setPerPage(25); goToPage(1); }}>25</button>
              <button className="dropdown-item" type="button" onClick={() => { setPerPage(50); goToPage(1); }}>50</button>
            </div>
          </div>

          <i className="fas fa-chevron-down" />
        </div>
      </div>
    </>
  );
}