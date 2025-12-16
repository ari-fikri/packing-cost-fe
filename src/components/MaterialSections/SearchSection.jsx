import React from 'react'
import { handleInputChange } from '../../utils/globalFunctions'

export default function SearchSection({
  // Search filter states
  materialNo,
  setMaterialNo,
  materialName,
  setMaterialName,
  parentMaterial,
  setParentMaterial,
  itemNo,
  setItemNo,
  price,
  setPrice,
  materialType,
  setMaterialType,
  // Search actions
  onFilter,
  onClearFilters
}) {
  return (
    <>
      {/* Search Section - Two column layout */}
      <div className="form-row mb-3">
        {/* Left Column */}
        <div className="col-md-6">
          <div className="form-group">
            <label className="small mb-1">Item No</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={materialNo}
              onChange={handleInputChange(setMaterialNo)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onFilter(); } }}
              placeholder="Material No"
            />
          </div>
          <div className="form-group">
            <label className="small mb-1">Material Name</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={materialName}
              onChange={handleInputChange(setMaterialName)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onFilter(); } }}
              placeholder="Material Name"
            />
          </div>
          <div className="form-group">
            <label className="small mb-1">Parent Material</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={parentMaterial}
              onChange={handleInputChange(setParentMaterial)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onFilter(); } }}
              placeholder="Parent Material"
            />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="col-md-6">
          <div className="form-group">
            <label className="small mb-1">eWarehouse Item No</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={itemNo}
              onChange={handleInputChange(setItemNo)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onFilter(); } }}
              placeholder="Item No"
            />
          </div>
          <div className="form-group">
            <label className="small mb-1">Price</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={price}
              onChange={handleInputChange(setPrice)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onFilter(); } }}
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
              <option value="Box">Module</option>
            </select>
          </div>
        </div>
      </div>

      {/* Search Actions */}
      <div className="form-group text-right mb-3">
        <button type="button" className="btn btn-sm btn-primary mr-2" onClick={onFilter}>
          <i className="fas fa-search mr-1" /> Search
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClearFilters}>
          <i className="fas fa-undo mr-1" /> Clear
        </button>
      </div>
    </>
  )
}