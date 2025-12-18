import React from 'react'
import Pagination from '../Pagination'
import DESTINATIONS from '../../data/destinations'

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
          <thead className="thead-light" style={{ position: 'sticky', top: 0, zIndex: 5, fontSize: '0.8rem' }}>
            <tr>
              <th style={{ width: 50, textAlign: 'center' }}>No</th>
              <th style={{ textAlign: 'center' }}>Model Code</th>
              <th style={{ textAlign: 'center' }}>Model Name</th>
              <th style={{ textAlign: 'center' }}>CFC</th>
              <th style={{ textAlign: 'center' }}>Type</th>
              <th style={{ textAlign: 'center' }}>Project Code</th>
              <th style={{ textAlign: 'center' }}>Impl Period</th>
              <th style={{ textAlign: 'center' }}>Dest Code</th>
              <th style={{ textAlign: 'center' }}>Country Code</th>
              <th style={{ textAlign: 'center' }}>Country</th>
              <th style={{ textAlign: 'center' }}>Remark</th>
              <th style={{ textAlign: 'center' }}>Katashiiki</th>
              <th style={{ textAlign: 'center' }}>Parts</th>
              <th style={{ width: 120, textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.8rem' }}>
            {paginatedModels.length === 0 ? (
              <tr>
                <td colSpan="14" className="text-center">No models found</td>
              </tr>
            ) : (
              paginatedModels.map((m, idx) => {
                const destination = DESTINATIONS.find(d => d.destCode === m.model_destination_code);
                return (
                <tr key={idx}>
                  <td>{(currentPage - 1) * pageSize + idx + 1}</td>
                  <td style={{ textAlign: 'center' }}>{m.model_code}</td>
                  <td style={{ textAlign: 'center' }}>{m.model_name}</td>
                  <td style={{ textAlign: 'center' }}>{m.model_cfc}</td>
                  <td style={{ textAlign: 'center' }}>{m.model_type}</td>
                  <td style={{ textAlign: 'center' }}>{m.project?.project_code}</td>
                  <td style={{ textAlign: 'center' }}>{m.model_implementation_period}</td>
                  <td style={{ textAlign: 'center' }}>{m.model_destination_code}</td>
                  <td style={{ textAlign: 'center' }}>{destination ? destination.code : ''}</td>
                  <td style={{ textAlign: 'center' }}>{destination ? destination.country : ''}</td>
                  <td style={{ textAlign: 'center' }}>{m.model_remark}</td>
                  <td style={{ textAlign: 'center' }}>
                    {Array.isArray(m.katashiki) && m.katashiki.length > 0 ? (
                      m.katashiki.map((k, i) => (
                        <span key={i} className="badge badge-primary mr-1">{k.string} : {k.number}</span>
                      ))
                    ) : (
                      '-'
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>{Array.isArray(m.parts) ? m.parts.length : 0}</td>
                  <td>
                    <button type="button" className="btn btn-sm btn-outline-primary mr-1" onClick={() => handleEditModel((currentPage - 1) * pageSize + idx)}>
                      <i className="fas fa-pencil-alt" />
                    </button>
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteModel((currentPage - 1) * pageSize + idx)}>
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              )})
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