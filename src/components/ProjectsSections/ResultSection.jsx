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

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          className={`btn btn-sm ${currentPage === 1 ? 'btn-primary' : 'btn-outline-primary'} mr-1`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>
      )
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis" className="mx-1">...</span>)
      }
    }

    // Visible page range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`btn btn-sm ${currentPage === i ? 'btn-primary' : 'btn-outline-primary'} mr-1`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      )
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="end-ellipsis" className="mx-1">...</span>)
      }
      pages.push(
        <button
          key={totalPages}
          className={`btn btn-sm ${currentPage === totalPages ? 'btn-primary' : 'btn-outline-primary'} mr-1`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      )
    }

    return pages
  }

  return (
    <div className="card-body pt-0">
      {/* Scrollable Table */}
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

      {/* Fixed Pagination at Bottom */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3 bg-light p-2 border rounded" style={{ position: 'sticky', bottom: 0, zIndex: 10 }}>
          <div className="small text-muted">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, results.length)} of {results.length} entries
          </div>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-sm btn-outline-secondary mr-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              <i className="fas fa-angle-double-left"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-secondary mr-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <i className="fas fa-angle-left"></i>
            </button>
            {renderPagination()}
            <button
              className="btn btn-sm btn-outline-secondary ml-2"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <i className="fas fa-angle-right"></i>
            </button>
            <button
              className="btn btn-sm btn-outline-secondary ml-2"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              <i className="fas fa-angle-double-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}