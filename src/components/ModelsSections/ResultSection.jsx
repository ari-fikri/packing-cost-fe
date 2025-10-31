import React from 'react'
import Pagination from '../Pagination'

export default function ResultSection({
  models,
  handleDeleteModel,
  handleEditModel,
  currentPage,
  setCurrentPage,
  pageSize
}) {
  const totalPages = Math.ceil(models.length / pageSize)
  const paginatedModels = models.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className="card-body pt-0">
      {/* Fixed Table Container with Scrollable Body */}
      <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table className="table table-striped table-sm mb-0">
          <thead className="thead-light" style={{ position: 'sticky', top: 0, zIndex: 5 }}>
            <tr>
              <th style={{ width: 50 }}>No</th>
              <th>Model Code</th>
              <th>Model Name</th>
              <th>Project Code</th>
              <th>Impl Period</th>
              <th>Dest Code</th>
              <th>Country Code</th>
              <th>Country</th>
              <th>Remark</th>
              <th>Parts</th>
              <th style={{ width: 120 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedModels.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center py-4 text-muted">No Data Found</td>
              </tr>
            ) : (
              paginatedModels.map((m, idx) => (
                <tr key={idx}>
                  <td>{(currentPage - 1) * pageSize + idx + 1}</td>
                  <td>{m.code}</td>
                  <td>{m.name}</td>
                  <td>{m.project.code}</td>
                  <td>{m.implementationPeriod}</td>
                  <td>{m.destinationCode}</td>
                  <td>{m.destinationCountryCode}</td>
                  <td>{m.country}</td>
                  <td>{m.remark}</td>
                  <td>{Array.isArray(m.parts) ? m.parts.length : 0}</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-outline-primary mr-1" onClick={() => handleEditModel((currentPage - 1) * pageSize + idx)}>
                      <i className="fas fa-pencil-alt" />
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteModel((currentPage - 1) * pageSize + idx)}>
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reusable Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={models.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}