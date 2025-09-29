// src/pages/Models.jsx
import React, { useState, useEffect } from 'react'
import NewModelModal from '../components/NewModelModal'
import SearchSection from '../components/ModelsSections/SearchSection'
import ResultSection from '../components/ModelsSections/ResultSection'
import modelsData from '../data/models.json'

export default function Models() {
  // filters
  const [code, setCode] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterRemark, setFilterRemark] = useState('')

  // modal & data
  const [showNewModal, setShowNewModal] = useState(false)
  const [models, setModels] = useState([])
  const [filteredModels, setFilteredModels] = useState([])

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Load models data on mount
  useEffect(() => {
    setModels(modelsData)
    setFilteredModels(modelsData)
  }, [])

  function handleFilter() {
    let filtered = modelsData.filter(model =>
      (!code || model.code?.toLowerCase().includes(code.toLowerCase())) &&
      (!filterName || model.name?.toLowerCase().includes(filterName.toLowerCase())) &&
      (!filterRemark || model.remark?.toLowerCase().includes(filterRemark.toLowerCase()))
    )
    setFilteredModels(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }
  
  function handleClearFilters() {
    setCode('')
    setFilterName('')
    setFilterRemark('')
    setFilteredModels(modelsData) // Reset to all models
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
    const newModels = [payload, ...models]
    setModels(newModels)
    setFilteredModels(newModels)
    setShowNewModal(false)
  }

  function handleDeleteModel(index) {
    if (!confirm('Delete this model?')) return
    const newModels = models.filter((_, i) => i !== index)
    setModels(newModels)
    setFilteredModels(newModels)
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
          models={filteredModels}
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
