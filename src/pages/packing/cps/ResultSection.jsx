import React from 'react';
import Pagination from '../../../components/Pagination';

export default function ResultSection({
  filteredCps,
  page,
  perPage,
  setPage,
  setPerPage,
  onEdit,
  onClone,
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
              <th style={{ fontSize: '10pt' }}>No</th>
              <th style={{ fontSize: '10pt' }}>CPS/PCI/ECI No</th>
              <th style={{ fontSize: '10pt' }}>Type</th>
              <th style={{ fontSize: '10pt' }}>Ref CPS No</th>
              <th style={{ fontSize: '10pt' }}>Part No</th>
              <th style={{ fontSize: '10pt' }}>Project Code</th>
              <th style={{ fontSize: '10pt' }}>Model</th>
              <th style={{ fontSize: '10pt' }}>From</th>
              <th style={{ fontSize: '10pt' }}>To</th>
              <th style={{ fontSize: '10pt' }}>Status</th>
              <th style={{ fontSize: '10pt' }}>Submit Date</th>
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
                    <td style={{ fontSize: '10pt' }}>{(page - 1) * perPage + i + 1}</td>
                    <td style={{ fontSize: '10pt' }}>{r.cpsNo}</td>
                    <td style={{ fontSize: '10pt' }}>{getType(r.cpsNo)}</td>
                    <td style={{ fontSize: '10pt' }}>{r.refCpsNo}</td>
                    <td style={{ fontSize: '10pt' }}>{r.partNo}</td>
                    <td style={{ fontSize: '10pt' }}>{r.cfcPjtCode}</td>
                    <td style={{ fontSize: '10pt' }}>{r.model}</td>
                    <td style={{ fontSize: '10pt' }}>{r.fromUser}</td>
                    <td style={{ fontSize: '10pt' }}>{r.toUser}</td>
                    <td style={{ fontSize: '10pt' }}>{r.status}</td>
                    <td style={{ fontSize: '10pt' }}>{r.issueDate}</td>
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
                        onClick={() => onEdit(r)}
                      >
                        <i className="fas fa-pencil-alt" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary mr-1"
                        onClick={() => onClone(r)}
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