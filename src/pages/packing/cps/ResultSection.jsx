import React from 'react';
import Pagination from '../../../components/Pagination';

export default function ResultSection({
  filteredCps,
  page,
  perPage,
  setPage,
  setPerPage,
}) {
  const visibleRows = filteredCps.slice((page - 1) * perPage, page * perPage);

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped table-sm mb-0">
          <thead>
            <tr>
              <th style={{ width: 40 }}>No</th>
              <th>CPS No.</th>
              <th>Ref CPS No.</th>
              <th>DPI No</th>
              <th>Issued Date</th>
              <th>Effective Date</th>
              <th>CFC / Pjt</th>
              <th>Model</th>
              <th># Parts</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th style={{ width: 120 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCps.length === 0 ? (
              <tr>
                <td colSpan="13" className="text-center py-4 text-muted">
                  No Data Found
                </td>
              </tr>
            ) : (
              visibleRows.map((r, i) => (
                <tr key={i}>
                  <td>{(page - 1) * perPage + i + 1}</td>
                  <td>{r.cpsNo}</td>
                  <td>{r.refCpsNo}</td>
                  <td>{r.dpiNo}</td>
                  <td>{r.issuedDate}</td>
                  <td>{r.effectiveDate}</td>
                  <td>{r.cfcPjt}</td>
                  <td>{r.model}</td>
                  <td>{Array.isArray(r.parts) ? r.parts.length : r.numParts ?? 0}</td>
                  <td>{r.fromUser}</td>
                  <td>{r.toUser}</td>
                  <td>{r.status}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-primary mr-1"
                      onClick={() => alert('View placeholder')}
                    >
                      <i className="fas fa-eye" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => alert('Delete placeholder')}
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalItems={filteredCps.length}
        itemsPerPage={perPage}
        onPageChange={setPage}
        onItemsPerPageChange={(p) => {
          setPerPage(p);
          setPage(1);
        }}
      />
    </div>
  );
}