// src/pages/ModuleType.jsx
import React, { useState } from 'react'

export default function ModuleType() {
  // Filters
  const [typeCode, setTypeCode] = useState('')
  const [itemNo, setItemNo] = useState('')
  const [destination, setDestination] = useState('')
  const [price, setPrice] = useState('')

  // Table data
  const [modules, setModules] = useState([])

  function handleFilter() {
    console.log('Filter module types by', { typeCode, itemNo, destination, price })
    // implement filtering logic here
  }

  function handleClearFilters() {
    setTypeCode('')
    setItemNo('')
    setDestination('')
    setPrice('')
  }

  function handleDeleteModule(index) {
    if (!confirm('Delete this module type?')) return
    setModules(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Module Type List</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-sm btn-success mr-2" onClick={() => alert('Add placeholder')}>
              <i className="fas fa-file mr-1" /> Add
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
          {/* Filters */}
          <div className="form-row mb-3">
            <div className="form-group col-md-3">
              <label className="small mb-1">Type Code</label>
              <input type="text" className="form-control form-control-sm" value={typeCode} onChange={e => setTypeCode(e.target.value)} placeholder="Type Code" />
            </div>
            <div className="form-group col-md-3">
              <label className="small mb-1">Item No</label>
              <input type="text" className="form-control form-control-sm" value={itemNo} onChange={e => setItemNo(e.target.value)} placeholder="Item No" />
            </div>
            <div className="form-group col-md-3">
              <label className="small mb-1">Destination</label>
              <input type="text" className="form-control form-control-sm" value={destination} onChange={e => setDestination(e.target.value)} placeholder="Destination" />
            </div>
            <div className="form-group col-md-3">
              <label className="small mb-1">Price</label>
              <input type="text" className="form-control form-control-sm" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
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
                  <th>Type Code</th>
                  <th>Dest Code</th>
                  <th>Dest Name</th>
                  <th>Item No</th>
                  <th>Dimension (cm)</th>
                  <th>Outer (m³)</th>
                  <th>Inner (m³)</th>
                  <th>Price</th>
                  <th style={{ width: 120 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {modules.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-4 text-muted">No Data Found</td>
                  </tr>
                ) : (
                  modules.map((m, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{m.typeCode}</td>
                      <td>{m.destCode}</td>
                      <td>{m.destName}</td>
                      <td>{m.itemNo}</td>
                      <td>{m.dimension}</td>
                      <td>{m.outer}</td>
                      <td>{m.inner}</td>
                      <td>{m.price}</td>
                      <td>
                        <button type="button" className="btn btn-sm btn-outline-primary mr-1" onClick={() => alert('Edit placeholder')}>
                          <i className="fas fa-pencil-alt" />
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteModule(i)}>
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
      </div>
    </div>
  )
}
