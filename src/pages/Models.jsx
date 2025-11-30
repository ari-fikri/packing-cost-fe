// src/pages/Models.jsx
import React, { useState, useEffect } from 'react'
import NewModelModal from '../components/NewModelModal'
import SearchSection from '../components/ModelsSections/SearchSection'
import ResultSection from '../components/ModelsSections/ResultSection'

export default function Models() {
  // filters
  const [code, setCode] = useState('')
  const [projectCode, setProjectCode] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterCfc, setFilterCfc] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterRemark, setFilterRemark] = useState('')
  const [implementationPeriod, setImplementationPeriod] = useState('')
  const [destinationCode, setDestinationCode] = useState('')
  const [destinationCountryCode, setDestinationCountryCode] = useState('')
  const [country, setCountry] = useState('')

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
    const modelUrl = `${import.meta.env.BASE_URL}models.json`;
    fetch(modelUrl)
      .then(response => response.json())
      .then(data => {
        const sortedData = data.sort((a, b) => new Date(b.model_implementation_period) - new Date(a.model_implementation_period));
        setModels(sortedData);
        setFilteredModels([]);
      });
  }, [])

  function handleFilter() {
    const noFilters = !code && !projectCode && !filterName && !filterCfc && !filterType && !filterRemark && !implementationPeriod && !destinationCode;

    if (noFilters) {
      setFilteredModels([...models].reverse());
      setCurrentPage(1);
      return;
    }

    let filtered = models.filter(model =>
      (!code || model.model_code?.toLowerCase().includes(code.toLowerCase())) &&
      (!projectCode || model.project.project_code?.toLowerCase().includes(projectCode.toLowerCase())) &&
      (!filterName || model.model_name?.toLowerCase().includes(filterName.toLowerCase())) &&
      (!filterCfc || model.model_cfc?.toLowerCase().includes(filterCfc.toLowerCase())) &&
      (!filterType || model.model_type?.toLowerCase().includes(filterType.toLowerCase())) &&
      (!filterRemark || model.model_remark?.toLowerCase().includes(filterRemark.toLowerCase())) &&
      (!implementationPeriod || model.model_implementation_period?.toLowerCase().includes(implementationPeriod.toLowerCase())) &&
      (!destinationCode || model.model_destination_code?.toLowerCase().includes(destinationCode.toLowerCase()))
    )

    setFilteredModels(filtered)
    setCurrentPage(1) // Reset to first page when filtering
  }
  
  function handleClearFilters() {
    setCode('')
    setProjectCode('')
    setFilterName('')
    setFilterCfc('')
    setFilterType('')
    setFilterRemark('')
    setImplementationPeriod('')
    setDestinationCode('')
    setDestinationCountryCode('')
    setCountry('')
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
        if (model.model_code === editingModel.model_code && 
            model.model_name === editingModel.model_name && 
            model.model_remark === editingModel.model_remark) {
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
        (!code || payload.model_code?.toLowerCase().includes(code.toLowerCase())) &&
        (!projectCode || payload.project.project_code?.toLowerCase().includes(projectCode.toLowerCase())) &&
        (!filterName || payload.model_name?.toLowerCase().includes(filterName.toLowerCase())) &&
        (!filterCfc || payload.model_cfc?.toLowerCase().includes(filterCfc.toLowerCase())) &&
        (!filterType || payload.model_type?.toLowerCase().includes(filterType.toLowerCase())) &&
        (!filterRemark || payload.model_remark?.toLowerCase().includes(filterRemark.toLowerCase())) &&
        (!implementationPeriod || payload.model_implementation_period?.toLowerCase().includes(implementationPeriod.toLowerCase())) &&
        (!destinationCode || payload.model_destination_code?.toLowerCase().includes(destinationCode.toLowerCase()))
      
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
      m.model_code === modelToEdit.model_code && 
      m.model_name === modelToEdit.model_name && 
      m.model_remark === modelToEdit.model_remark
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
      m.model_code === modelToDelete.model_code && 
      m.model_name === modelToDelete.model_name && 
      m.model_remark === modelToDelete.model_remark
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
          projectCode={projectCode}
          setProjectCode={setProjectCode}
          filterName={filterName}
          setFilterName={setFilterName}
          filterCfc={filterCfc}
          setFilterCfc={setFilterCfc}
          filterType={filterType}
          setFilterType={setFilterType}
          filterRemark={filterRemark}
          setFilterRemark={setFilterRemark}
          implementationPeriod={implementationPeriod}
          setImplementationPeriod={setImplementationPeriod}
          destinationCode={destinationCode}
          setDestinationCode={setDestinationCode}
          destinationCountryCode={destinationCountryCode}
          setDestinationCountryCode={setDestinationCountryCode}
          country={country}
          setCountry={setCountry}
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