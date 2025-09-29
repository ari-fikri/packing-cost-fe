import React from 'react'

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className = ""
}) {
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
          onClick={() => onPageChange(1)}
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
          onClick={() => onPageChange(i)}
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
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      )
    }

    return pages
  }

  if (totalPages <= 1) return null

  return (
    <div className={`d-flex justify-content-between align-items-center mt-3 bg-light p-2 border rounded ${className}`}>
      <div className="small text-muted">
        Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalItems)} of {totalItems} entries
      </div>
      <div className="d-flex align-items-center">
        <button
          className="btn btn-sm btn-outline-secondary mr-2"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          <i className="fas fa-angle-double-left"></i>
        </button>
        <button
          className="btn btn-sm btn-outline-secondary mr-2"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <i className="fas fa-angle-left"></i>
        </button>
        {renderPagination()}
        <button
          className="btn btn-sm btn-outline-secondary ml-2"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <i className="fas fa-angle-right"></i>
        </button>
        <button
          className="btn btn-sm btn-outline-secondary ml-2"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          <i className="fas fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  )
}