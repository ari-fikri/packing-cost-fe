// src/pages/Models.jsx
import React, { useState } from 'react'
import NewModelModal from '../components/NewModelModal'
import SearchSection from '../components/ModelsSections/SearchSection'
import ResultSection from '../components/ModelsSections/ResultSection'

export default function Models() {
  // filters
  const [code, setCode] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterRemark, setFilterRemark] = useState('')

  // modal & data
  const [showNewModal, setShowNewModal] = useState(false)
  const [models, setModels] = useState([])

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  function handleFilter() {
    console.log('Filter models by', { code, filterName, filterRemark })
    // implement client-side or API filtering as required
    setCurrentPage(1) // Reset to first page when filtering
  }
  
  function handleClearFilters() {
    setCode('')
    setFilterName('')
    setFilterRemark('')
    setCurrentPage(1) // Reset to first page when clearing filters
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
          {/* TopSection */}
          <div className="ml-auto">
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

        <SearchSection
          code={code}
          setCode={setCode}
          filterName={filterName}
          setFilterName={setFilterName}
          filterRemark={filterRemark}
          setFilterRemark={setFilterRemark}
          handleFilter={handleFilter}
          handleClearFilters={handleClearFilters}
          handleOpenNew={handleOpenNew}
        />

        <ResultSection
          models={models}
          handleDeleteModel={handleDeleteModel}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
        />

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
