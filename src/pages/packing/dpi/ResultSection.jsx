import React from 'react';
import {
  InnerGroupHeaders,
  InnerLeafHeaders,
  InnerLeafCells,
} from "../../../components/CurrentDpiSection/InnerInfoColumns";
import {
  OuterGroupHeaders,
  OuterLeafHeaders,
  OuterLeafCells,
} from "../../../components/CurrentDpiSection/OuterInfoColumns";
import {
  SubTotalHeaders,
  SubTotalData,
} from "../../../components/CurrentCpsSection/SubTotalColumns";
import {
  LaborManHourHeaders,
  LaborCostHeaders,
  LaborManHourCells,
  LaborCostCells,
} from "../../../components/CurrentCpsSection/LaborInfoColumns";
import {
  InlandLeafHeaders,
  InlandLeafCells,
} from "../../../components/CurrentCpsSection/InlandColumns";

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
  //debugger;
  const firstRowCps = visibleRows[0]?.cps || {};
  // const innerCount = firstRowCps.innerMaterials?.length || 1;
  const innerCount = firstRowCps.packing?.inner?.length || 1;
  const outerCount = firstRowCps.packing?.outer?.length || 1;
  // const outerCount = firstRowCps.outerMaterials?.length || 1;

  return (
    <>
      {/* small spacer */}
      <div className="mb-2" />

      {/* Table */}
      <div
        className="table-responsive mt-2"
        style={{ overflowX: "auto", overflowY: "hidden" }}
      >
        <table
          className="table table-sm table-bordered mb-0 text-center"
          style={{ tableLayout: "fixed", width: "auto" }}
        >
          <thead style={{ fontSize: '8pt' }}>
            <tr>
              <th rowSpan={3} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
                No
              </th>
              <th rowSpan={3} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
                CPS No
              </th>
              <th colSpan={7} className="align-middle">
                Part Information
              </th>
              <th colSpan={4} className="align-middle">
                Sub Total (USD)
              </th>
              <th rowSpan={3} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
                Diff (%)
              </th>
              <th colSpan={innerCount > 0 ? innerCount * 2 + 6 : 0}>Inner Materials</th>
              <th colSpan={outerCount > 0 ? outerCount * 2 + 6 : 0}>Outer Materials</th>
              <th colSpan={5}>Labor Man Hour</th>
              <th colSpan={5}>Labor Cost</th>
              <th colSpan={2}>Inland Trucking Cost</th>
            </tr>
            <tr>
              <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
                Part No
              </th>
              <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
                Part Name
              </th>
              <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
                Parent Part
              </th>
              <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
                Supplier Code
              </th>
              <th rowSpan={2} className="align-middle">
                Supplier Name
              </th>
              <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
                Weight/Pc (Kg)
              </th>
              <th rowSpan={2} className="align-middle" style={{ whiteSpace: 'nowrap' }}>
                Qty/Box
              </th>

              <SubTotalHeaders />

              <InnerGroupHeaders count={innerCount} />
              <OuterGroupHeaders count={outerCount} />

              <LaborManHourHeaders />
              <LaborCostHeaders />

              <InlandLeafHeaders />
            </tr>
            <tr>
              <InnerLeafHeaders count={innerCount} />
              <OuterLeafHeaders count={outerCount} />
            </tr>
          </thead>
          <tbody style={{ fontSize: '8pt' }}>
            {visibleRows.map((row, i) => {
              //debugger;              
              const current = row.cps || {};
              const innerData = current.packing?.inner || [];
              const outerData = current.packing?.outer || [];
              const labor = current.labor || {};
              const inland = current.inland || {};
              return (
                <tr key={i}>
                  <td>{((page - 1) * perPage) + i + 1}</td>
                  <td className="align-middle" style={{ whiteSpace: 'nowrap' }}>{current.cps_no ?? "-"}</td>
                  <td className="align-middle">{current.part_no ?? "-"}</td>
                  <td className="align-middle">{current.part_name ?? "-"}</td>
                  <td className="align-middle">{current.parent_no ?? "-"}</td>
                  <td className="align-middle">{current.supplier?.supplier_code ?? "-"}</td>
                  <td className="align-middle">{current.supplier?.supplier_name ?? "-"}</td>
                  <td className="align-middle">{current.weightPerPc ?? "-"}</td>
                  <td className="align-middle">{current.qtyPerBox ?? "-"}</td>
                  <SubTotalData current={current} />
                  <td className="align-middle">{current.diffPct ?? "-"}</td>
                  <InnerLeafCells data={innerData} count={innerCount} />
                  <OuterLeafCells data={outerData} count={outerCount} />
                  <LaborManHourCells labor={labor} />
                  <LaborCostCells labor={labor} />
                  <InlandLeafCells inland={inland} />
                </tr>
              );
            })}
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