import React from 'react';

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
  return (
    <>
      {/* small spacer */}
      <div className="mb-2" />

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-sm mb-0" style={{ whiteSpace: 'nowrap' }}>
          <thead>
            <tr>
              <th style={{ width: 40 }}>No</th>
              <th>Impl Period</th>
              <th>Dest Code</th>
              <th>Model code</th>
              <th>Model</th>
              <th>Part No</th>
              <th>Part Name</th>
              <th>Supplier Code</th>
              <th>Supplier Name</th>
              <th>Part Status</th>
              <th>Detail Part Status</th>
              <th>CPS Status</th>
              <th>CPSNo</th>
              <th>Part Category</th>
              <th style={{ width: 120 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="15" className="text-center py-4 text-muted">No Data Found</td>
              </tr>
            ) : (
              visibleRows.map((r, i) => (
                <tr key={i}>
                  <td>{(page - 1) * perPage + i + 1}</td>
                  <td>{r.implementation_period}</td>
                  <td>{r.cps.model.destination.code}</td>
                  <td>{r.model_code}</td>
                  <td>{r.cps.model.model_name}</td>
                  <td>{r.part_no}</td>
                  <td>{r.cps.part_name}</td>
                  <td>{r.cps.supplier.supplier_code}</td>
                  <td>{r.cps.supplier.supplier_name}</td>
                  <td>{r.partStatus || ''}</td>
                  <td>{r.detailPartStatus || ''}</td>
                  <td>{r.status || ''}</td>
                  <td>{r.cps.cps_no}</td>
                  <td>{r.cps.pse_info.category}</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-outline-primary mr-1" onClick={() => alert('View placeholder')}>
                      <i className="fas fa-eye" />
                    </button>
                  </td>
                </tr>
              ))
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