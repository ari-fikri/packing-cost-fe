import React from 'react'
import Pagination from '../Pagination'

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
      {/* Fixed Table Container with Scrollable Body */}
      <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table className="table table-striped table-sm mb-0">
          <thead className="thead-light" style={{ position: 'sticky', top: 0, zIndex: 5 }}>
            <tr>
              <th style={{ width: 50 }}>No</th>
              <th>Project Code</th>
              <th>Project Name</th>
              <th>Project Manager</th>
              <th>Impl Period</th>
              <th>Status</th>
              <th>Models</th>
              <th style={{ width: 120 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedResults.length === 0 && (
              <tr><td colSpan="8" className="text-center py-4 text-muted">No Data Found</td></tr>
            )}
            {paginatedResults.map((r, idx) => (
              <tr key={idx}>
                <td>{(currentPage - 1) * pageSize + idx + 1}</td>
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

      {/* Reusable Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={results.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}