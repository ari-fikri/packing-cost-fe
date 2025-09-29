import React from 'react'

export default function ResultSection({
  results,
  handleEdit,
  handleDelete,
  currentPage,
  setCurrentPage,
  pageSize
}) {
  const totalPages = Math.ceil(results.length / pageSize)
  const paginatedResults = results.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className="card-body pt-0">
      <div className="table-responsive">
        <table className="table table-striped table-sm mb-0">
          <thead className="thead-light">
            <tr>
              <th>CFC/PJT Code</th>
              <th>CFC/PJT Name</th>
              <th>Project Manager</th>
              <th>SOP Packing</th>
              <th>Status</th>
              <th>Models</th>
              <th style={{ width: 120 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedResults.length === 0 && (
              <tr><td colSpan="7" className="text-center py-4 text-muted">No Data Found</td></tr>
            )}
            {paginatedResults.map((r, idx) => (
              <tr key={idx}>
                <td>{r.code}</td>
                <td>{r.name}</td>
                <td>{r.manager}</td>
                <td>{r.sopPacking}</td>
                <td>{r.status}</td>
                <td>
                  {Array.isArray(r.models)
                    ? r.models
                        .map(m => (typeof m === 'string' ? m : m.code))
                        .join(', ')
                    : r.models}
                </td>
                <td>
                  <button type="button" className="btn btn-sm btn-outline-primary mr-1" onClick={() => handleEdit((currentPage - 1) * pageSize + idx)}><i className="fas fa-edit" /></button>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete((currentPage - 1) * pageSize + idx)}><i className="fas fa-trash" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <div>
          <button
            className="btn btn-sm btn-outline-secondary mr-1"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &lt; Prev
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>
  )
}