import React, { useState } from 'react'
import NewMaterialModal from '../components/NewMaterialModal'
import materialsData from '../data/materials.json'

export default function Material() {
  // Search filters - based on the form fields in the attachment
  const [materialNo, setMaterialNo] = useState('')
  const [materialName, setMaterialName] = useState('')
  const [parentMaterial, setParentMaterial] = useState('')
  const [itemNo, setItemNo] = useState('')
  const [price, setPrice] = useState('')
  const [materialType, setMaterialType] = useState('')
  const [showNewModal, setShowNewModal] = useState(false)

  // Table data - initialize with sample data
  const [materials, setMaterials] = useState(materialsData)

  function handleFilter() {
    console.log('Filter materials by', { materialNo, materialName, parentMaterial, itemNo, price, materialType })
  }

  function handleClearFilters() {
    setMaterialNo('')
    setMaterialName('')
    setParentMaterial('')
    setItemNo('')
    setPrice('')
    setMaterialType('')
  }

  function handleOpenNew() {
    setShowNewModal(true)
  }

  function handleCloseNew() {
    setShowNewModal(false)
  }

  // **Receive new material from modal and add to table**
  function handleSaveNewMaterial(payload) {
    setMaterials(prev => [payload, ...prev])
    setShowNewModal(false)
  }

  function handleDeleteMaterial(index) {
    if (!confirm('Delete this material?')) return
    setMaterials(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Material List</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleOpenNew}>
              <i className="fas fa-file mr-1" /> Add Material
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary mr-1" onClick={() => alert('Upload placeholder')}>
              <i className="fas fa-cloud-upload-alt" /> Upload
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => alert('Download template placeholder')}>
              <i className="fas fa-cloud-download-alt" /> Template
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Search Section - Two column layout as requested */}
          <div className="form-row mb-3">
            {/* Left Column */}
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Material No</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  value={materialNo} 
                  onChange={e => setMaterialNo(e.target.value)} 
                  placeholder="Material No" 
                />
              </div>
              <div className="form-group">
                <label className="small mb-1">Material Name</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  value={materialName} 
                  onChange={e => setMaterialName(e.target.value)} 
                  placeholder="Material Name" 
                />
              </div>
              <div className="form-group">
                <label className="small mb-1">Parent Material</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  value={parentMaterial} 
                  onChange={e => setParentMaterial(e.target.value)} 
                  placeholder="Parent Material" 
                />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Item No</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  value={itemNo} 
                  onChange={e => setItemNo(e.target.value)} 
                  placeholder="Item No" 
                />
              </div>
              <div className="form-group">
                <label className="small mb-1">Price</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm" 
                  value={price} 
                  onChange={e => setPrice(e.target.value)} 
                  placeholder="Price" 
                />
              </div>
              <div className="form-group">
                <label className="small mb-1">Material Type</label>
                <select 
                  className="form-control form-control-sm" 
                  value={materialType} 
                  onChange={e => setMaterialType(e.target.value)}
                >
                  <option value="">Select Material Type</option>
                  <option value="Inner">Inner</option>
                  <option value="Outer">Outer</option>
                  <option value="Module">Module</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-group text-right mb-3">
            <button type="button" className="btn btn-sm btn-primary mr-2" onClick={handleFilter}>
              <i className="fas fa-search mr-1" /> Search
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleClearFilters}>
              <i className="fas fa-undo mr-1" /> Clear
            </button>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-striped table-sm mb-0">
              <thead>
                <tr>
                  <th style={{ width: 50 }}>No</th>
                  <th>Material No</th>
                  <th>Material Name</th>
                  <th>Parent Material</th>
                  <th>Item No</th>
                  <th>Price</th>
                  <th>Material Type</th>
                  <th style={{ width: 120 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {materials.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">No Data Found</td>
                  </tr>
                ) : (
                  materials.map((material, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{material.materialNo}</td>
                      <td>{material.materialName}</td>
                      <td>{material.parentMaterial}</td>
                      <td>{material.itemNo}</td>
                      <td>{material.price}</td>
                      <td>{material.materialType}</td>
                      <td>
                        <button type="button" className="btn btn-sm btn-outline-primary mr-1" onClick={() => alert('Edit placeholder')}>
                          <i className="fas fa-pencil-alt" />
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteMaterial(i)}>
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
          <button type="button" className="btn btn-primary mr-2" onClick={() => alert('Save placeholder')}>Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => alert('Cancel placeholder')}>Cancel</button>
        </div>

        {/* Modal */}
        <NewMaterialModal
          show={showNewModal}
          onClose={handleCloseNew}
          onSave={handleSaveNewMaterial}
        />
      </div>
    </div>
  )
}