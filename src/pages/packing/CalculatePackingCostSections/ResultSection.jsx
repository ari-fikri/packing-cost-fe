import React, { useState } from 'react';
import MaterialCostDetail from '../../../components/PackingCostNewModalSections/MaterialCostDetail';

export default function ResultSection({
  rows, visibleRows,
  page, totalPages, goToPage,
  perPage, setPerPage, total
}) {
  const [expandedRow, setExpandedRow] = useState(null);

  const fmt = (v) => {
    if (v === null || v === undefined || v === "") return "";
    const num = Number(v);
    if (isNaN(num)) return String(v);
    return num.toFixed(2);
  };

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="card-body">
      <div className="table-responsive">
        <table className="table table-striped table-sm mb-0">
          <thead>
            <tr>
              <th style={{ width: 40 }}>No</th>
              <th>Pack Cost Cal Code</th>
              <th>Period</th>
              <th>Dest Code</th>
              <th>Dest Country</th>
              <th>Model Code</th>
              <th># Parts</th>
              <th>Type</th>
              <th style={{ width: 120 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-muted">No Data Found</td>
              </tr>
            ) : (
              visibleRows.map((r, i) => {
                const fullIndex = (page - 1) * perPage + i;
                return (
                  <React.Fragment key={i}>
                    <tr>
                      <td>{String(fullIndex + 1).padStart(2, '0')}</td>
                      <td>{r.calCode}</td>
                      <td>{r.period}</td>
                      <td>{r.destCode}</td>
                      <td>{r.destCountry}</td>
                      <td>{r.modelCode}</td>
                      <td>{fmt(r.numParts)}</td>
                      <td>{r.type}</td>
                      <td>
                        <button type="button" className="btn btn-sm btn-outline-primary mr-1" onClick={() => toggleRow(fullIndex)}><i className="fas fa-eye" /></button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => alert('Delete placeholder')}><i className="fas fa-trash" /></button>
                      </td>
                    </tr>
                    {expandedRow === fullIndex && (
                      <tr>
                        <td colSpan="9">
                          {r.parts.map((part, partIndex) => (
                            <MaterialCostDetail key={partIndex} part={part} />
                          ))}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex align-items-center justify-content-between mt-3">
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
              <button className="dropdown-item" type="button" onClick={() => { setPerPage(3); setPage(1) }}>3</button>
              <button className="dropdown-item" type="button" onClick={() => { setPerPage(10); setPage(1) }}>10</button>
              <button className="dropdown-item" type="button" onClick={() => { setPerPage(25); setPage(1) }}>25</button>
            </div>
          </div>

          <i className="fas fa-chevron-down" />
        </div>
      </div>
    </div>
  );
}