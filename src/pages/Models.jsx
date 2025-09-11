// src/pages/Models.jsx
import React, { useState } from 'react'
import NewModelModal from '../components/NewModelModal'

export default function Models() {
  // filters
  const [code, setCode] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterRemark, setFilterRemark] = useState('')

  // modal & data
  const [showNewModal, setShowNewModal] = useState(false)
  const [models, setModels] = useState([])

  function handleFilter() {
    console.log('Filter models by', { code, filterName, filterRemark })
    // implement client-side or API filtering as required
  }
  function handleClearFilters() {
    setCode('')
    setFilterName('')
    setFilterRemark('')
  }

  function handleOpenNew() {
    console.log('opening NewModelModal')
    setShowNewModal(true)
  }
  function handleCloseNew() {
    setShowNewModal(false)
  }

  // called by NewModelModal when user saves a model (payload includes parts if any)
  function handleSaveNewModel(payload) {
    // payload: { code, name, remark, parts: [...] }
    setModels(prev => [payload, ...prev])
    setShowNewModal(false)
  }

  function handleDeleteModel(index) {
    if (!confirm('Delete this model?')) return
    setModels(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Model List</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleOpenNew}>
              <i className="fas fa-file mr-1" /> Add New Model
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary mr-1" title="Upload" onClick={() => alert('Upload placeholder')}>
              <i className="fas fa-cloud-upload-alt" />
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" title="Template" onClick={() => alert('Download template placeholder')}>
              <i className="fas fa-cloud-download-alt" />
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Filters (Projects-style rows) */}
          <div className="form-row mb-3">
            <div className="form-group col-md-6">
              <label className="small mb-1">Model Code</label>
              <div className="input-group input-group-sm">
                <input
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="form-control form-control-sm"
                  placeholder="Code"
                />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary btn-sm" title="Search code" onClick={() => alert('Search code placeholder')}>
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group col-md-6">
              <label className="small mb-1">Model Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={filterName}
                onChange={e => setFilterName(e.target.value)}
                placeholder="Name"
              />
            </div>

            <div className="form-group col-md-12">
              <label className="small mb-1">Remark</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={filterRemark}
                onChange={e => setFilterRemark(e.target.value)}
                placeholder="Remark"
              />
            </div>

            <div className="form-group col-md-12 text-right">
              <button type="button" className="btn btn-sm btn-primary mr-2" onClick={handleFilter}>
                <i className="fas fa-search mr-1" /> Search
              </button>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleClearFilters}>
                <i className="fas fa-undo mr-1" /> Reset
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-striped table-sm mb-0">
              <thead>
                <tr>
                  <th style={{ width: 50 }}>#</th>
                  <th>Model Code</th>
                  <th>Model Name</th>
                  <th>Remark</th>
                  <th>Parts</th>
                  <th style={{ width: 120 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {models.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">No Data Found</td>
                  </tr>
                ) : (
                  models.map((m, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{m.code}</td>
                      <td>{m.name}</td>
                      <td>{m.remark}</td>
                      <td>{Array.isArray(m.parts) ? m.parts.length : 0}</td>
                      <td>
                        <button type="button" className="btn btn-sm btn-outline-primary mr-1" onClick={() => alert('Edit placeholder')}>
                          <i className="fas fa-pencil-alt" />
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteModel(i)}>
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-footer text-right">
          <button type="button" className="btn btn-primary mr-2" onClick={() => alert('Save (placeholder)')}>Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => alert('Cancel (placeholder)')}>Cancel</button>
        </div>
      </div>

      {/* NEW MODEL MODAL (separate component) */}
      <NewModelModal
        show={showNewModal}
        onClose={handleCloseNew}
        onSave={handleSaveNewModel}
      />
    </div>
  )
}
