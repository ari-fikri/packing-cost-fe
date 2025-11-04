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

  const getModelData = (modelCode) => {
    if (!models) {
      return {};
    }
    return models.find((m) => m.code === modelCode) || {};
  };

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
              <th>Impl. Time</th>
              <th>Destination</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th>Submit Date</th>
              <th style={{ width: 120 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCps.length === 0 ? (
              <tr>
                <td colSpan="14" className="text-center py-4 text-muted">
                  No Data Found
                </td>
              </tr>
            ) : (
              visibleRows.map((r, i) => {
                console.log(">>>>>>>>"+ r.model.code + " >>> "+ r.model.destinationCode + " >> " + r.model.implementationPeriod);
                const modelData = getModelData(r.model.code);
                console.log("================="+ modelData.model);
                return (                  
                  <tr key={i}>
                    <td>{(page - 1) * perPage + i + 1}</td>
                    <td>{r.cpsNo}</td>
                    <td>{getType(r.cpsNo)}</td>
                    <td>{r.refCpsNo}</td>
                    <td>{r.part_no}</td>
                    <td>{r.cfcPjt}</td>                          {/*Project*/}
                    <td>{r.model.code}</td>
                    <td>{r.model.implementationPeriod}</td>
                    <td>{r.model.destinationCode + "<< "}</td>
                    <td>{r.fromUser}</td>
                    <td>{r.toUser}</td>
                    <td>{r.status}</td>
                    <td>{r.issuedDate}</td>
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