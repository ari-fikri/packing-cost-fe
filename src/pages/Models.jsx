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
  const [editingIndex, setEditingIndex] = useState(null)
  const [editingModel, setEditingModel] = useState(null)
  const [models, setModels] = useState([])
  const [filteredModels, setFilteredModels] = useState([])

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  // Load models data on mount
  useEffect(() => {
    setModels(modelsData)
    // Do not populate filteredModels on initial load so the table header
    // is visible but no data rows are shown. The user must click Filter to
    // load results; clicking Filter with no criteria will show latest-first.
    setFilteredModels([])
  }, [])

  function handleFilter() {
    let filtered = models.filter(model =>
      (!code || model.code?.toLowerCase().includes(code.toLowerCase())) &&
      (!filterName || model.name?.toLowerCase().includes(filterName.toLowerCase())) &&
      (!filterRemark || model.remark?.toLowerCase().includes(filterRemark.toLowerCase()))
    )

    const noFilters = !code && !filterName && !filterRemark

    // If no filters provided, show latest-first (reverse original models order)
    if (noFilters) {
      setFilteredModels([...models].reverse())
    } else {
      setFilteredModels(filtered)
    }
    setCurrentPage(1) // Reset to first page when filtering
  }
  
  function handleClearFilters() {
    setCode('')
    setFilterName('')
    setFilterRemark('')
    setFilteredModels([]) // Clear results (keep header visible)
    setCurrentPage(1) // Reset to first page when clearing filters
  }

  function handleOpenNew() {
    setEditingIndex(null)
    setEditingModel(null)
    setShowNewModal(true)
  }
  
  function handleCloseNew() {
    setShowNewModal(false)
    setEditingIndex(null)
    setEditingModel(null)
  }

  // called by NewModelModal when user saves a model (payload includes parts if any)
  function handleSaveNewModel(payload) {
    // payload: { code, name, remark, parts: [...] }
    if (editingIndex !== null) {
      // Editing existing model
      const newModels = models.map((model, index) => 
        index === editingIndex ? payload : model
      )
      setModels(newModels)
      
      // Update filtered models as well
      const newFilteredModels = filteredModels.map(model => {
        // Find if this model is the one being edited
        if (model.code === editingModel.code && 
            model.name === editingModel.name && 
            model.remark === editingModel.remark) {
          return payload
        }
        return model
      })
      setFilteredModels(newFilteredModels)
    } else {
      // Adding new model      
      const newModels = [payload, ...models]
      setModels(newModels)
      
      // Check if new model matches current filter criteria
      const matchesFilter = 
        (!code || payload.code?.toLowerCase().includes(code.toLowerCase())) &&
        (!filterName || payload.name?.toLowerCase().includes(filterName.toLowerCase())) &&
        (!filterRemark || payload.remark?.toLowerCase().includes(filterRemark.toLowerCase()))
      
      if (matchesFilter) {
        setFilteredModels([payload, ...filteredModels])
      }
    }
    
    console.log('Model saved:', payload)
    setShowNewModal(false)
    setEditingIndex(null)
    setEditingModel(null)
  }

  function handleEditModel(filteredIndex) {
    // Find the model in filtered results
    const modelToEdit = filteredModels[filteredIndex]
    // Find its index in the original models array
    const originalIndex = models.findIndex(m => 
      m.code === modelToEdit.code && 
      m.name === modelToEdit.name && 
      m.remark === modelToEdit.remark
    )
    
    console.log('Editing model:', modelToEdit) // Debug log
    console.log('Original index:', originalIndex) // Debug log
    
    setEditingIndex(originalIndex)
    setEditingModel(modelToEdit)
    setShowNewModal(true)
  }

  function handleDeleteModel(filteredIndex) {
    if (!confirm('Delete this model?')) return
    const modelToDelete = filteredModels[filteredIndex]
    const originalIndex = models.findIndex(m => 
      m.code === modelToDelete.code && 
      m.name === modelToDelete.name && 
      m.remark === modelToDelete.remark
    )
    
    if (originalIndex !== -1) {
      const newModels = models.filter((_, i) => i !== originalIndex)
      setModels(newModels)
      const newFilteredModels = filteredModels.filter((_, i) => i !== filteredIndex)
      setFilteredModels(newFilteredModels)
    }
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
          handleEditModel={handleEditModel}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
        />
      </div>

      {/* NEW/EDIT MODEL MODAL */}
      <NewModelModal
        show={showNewModal}
        onClose={handleCloseNew}
        onSave={handleSaveNewModel}
        initialData={editingModel}
      />
    </div>
  )
}
