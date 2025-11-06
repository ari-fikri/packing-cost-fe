import React from 'react';
import Pagination from '../../../components/Pagination';

export default function ResultSection({
  filteredCps,
  page,
  perPage,
  setPage,
  setPerPage,
  models,
}) {
  const visibleRows = filteredCps.slice((page - 1) * perPage, page * perPage);

  const getType = (cpsNo) => {
    if (cpsNo.includes('CPS')) return 'CPS';
    if (cpsNo.includes('PCI')) return 'PCI';
    if (cpsNo.includes('ECI')) return 'ECI';
    return '';
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped table-sm mb-0">
          <thead>
            <tr>
              <th style={{ width: 40 }}>No</th>
              <th>CPS/PCI/ECI No</th>
              <th>Type</th>
              <th>Ref CPS No</th>
              <th>Part No</th>
              <th>Project Code</th>
              <th>Model</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Submit Date</th>
              <th style={{ width: 160 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCps.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center py-4 text-muted">
                  No Data Found
                </td>
              </tr>
            ) : (
              visibleRows.map((r, i) => {
                return (                  
                  <tr key={i}>
                    <td>{(page - 1) * perPage + i + 1}</td>
                    <td>{r.cpsNo}</td>
                    <td>{getType(r.cpsNo)}</td>
                    <td>{r.refCpsNo}</td>
                    <td>{r.partNo}</td>
                    <td>{r.cfcPjtCode}</td>
                    <td>{r.model}</td>
                    <td>{r.fromUser}</td>
                    <td>{r.toUser}</td>
                    <td>{r.status}</td>
                    <td>{r.issueDate}</td>
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
                        className="btn btn-sm btn-outline-info mr-1"
                        onClick={() => alert('Edit placeholder')}
                      >
                        <i className="fas fa-pencil-alt" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary mr-1"
                        onClick={() => alert('Clone placeholder')}
                      >
                        <i className="fas fa-clone" />
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
                );
              })
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