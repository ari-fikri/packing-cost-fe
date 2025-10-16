import React, { useState } from 'react'

export default function NewMaterialModal({ show, onClose, onSave }) {
  // Form fields based on the attachment
  const [materialNo, setMaterialNo] = useState('')
  const [materialName, setMaterialName] = useState('')
  const [parentMaterial, setParentMaterial] = useState('')
  const [itemNo, setItemNo] = useState('')
  const [price, setPrice] = useState('')
  const [materialType, setMaterialType] = useState('')

  function handleSave() {
    // Basic validation
    if (!materialNo || !materialName || !materialType) {
      alert('Please fill in Material No, Material Name, and Material Type')
      return
    }

    // Create material object
    const newMaterial = {
      materialNo,
      materialName,
      parentMaterial,
      itemNo,
      price,
      materialType,
      createdDate: new Date().toLocaleDateString()
    }

    // Send to parent
    onSave(newMaterial)
    handleClear()
  }

  function handleClear() {
    setMaterialNo('')
    setMaterialName('')
    setParentMaterial('')
    setItemNo('')
    setPrice('')
    setMaterialType('')
  }

  function handleClose() {
    handleClear()
    onClose()
  }

  if (!show) return null

  return (
    <div className="np-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) handleClose() }}>
      <div className="np-modal card card-outline card-primary" style={{ maxWidth: 800 }}>
        
        {/* Modal Header */}
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0">
            <b>Material - New</b>
          </h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-tool" onClick={handleClose}>
              <i className="fas fa-times" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="card-body">
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">
                  Material No <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={materialNo}
                  onChange={e => setMaterialNo(e.target.value)}
                  placeholder="Enter Material No"
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Material Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={materialName}
                  onChange={e => setMaterialName(e.target.value)}
                  placeholder="Enter Material Name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Parent Material</label>
                <input
                  type="text"
                  className="form-control"
                  value={parentMaterial}
                  onChange={e => setParentMaterial(e.target.value)}
                  placeholder="Enter Parent Material"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <div className="form-group">
                <label className="form-label">Item No</label>
                <input
                  type="text"
                  className="form-control"
                  value={itemNo}
                  onChange={e => setItemNo(e.target.value)}
                  placeholder="Enter Item No"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="Enter Price"
                  step="0.01"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Material Type <span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
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

          <div className="form-group mt-3">
            <small className="text-muted">
              <span className="text-danger">*</span> Required fields
            </small>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="card-footer text-right">
          <button type="button" className="btn btn-secondary mr-2" onClick={handleClose}>
            <i className="fas fa-times mr-1"></i>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            <i className="fas fa-save mr-1"></i>
            Save Material
          </button>
        </div>
      </div>
    </div>
  )
}