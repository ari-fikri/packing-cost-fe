// src/pages/Parts.jsx
import React, { useState } from 'react'

export default function Parts() {
  // filter fields
  const [partNo, setPartNo] = useState('')
  const [uniqueNo, setUniqueNo] = useState('')
  const [supplierId, setSupplierId] = useState('')
  const [supplierName, setSupplierName] = useState('')
  const [parentPart, setParentPart] = useState('')
  const [hasSubparts, setHasSubparts] = useState('')

  // parts list
  const [parts, setParts] = useState([])

  function handleSearch() {
    console.log('Search parts with', { partNo, uniqueNo, supplierId, supplierName, parentPart, hasSubparts })
  }
  function handleClear() {
    setPartNo('')
    setUniqueNo('')
    setSupplierId('')
    setSupplierName('')
    setParentPart('')
    setHasSubparts('')
  }
  function handleAddPart() {
    alert('Add Part placeholder')
  }
  function handleUpload() {
    alert('Upload placeholder')
  }
  function handleTemplate() {
    alert('Template placeholder')
  }
  function handleDelete(idx) {
    if (!confirm('Delete this part?')) return
    setParts(prev => prev.filter((_, i) => i !== idx))
  }

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        {/* HEADER with toolbar */}
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Part List</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleAddPart}>
              <i className="fas fa-file mr-1" /> Add Part
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary mr-1" onClick={handleUpload} title="Upload">
              <i className="fas fa-cloud-upload-alt" />
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleTemplate} title="Template">
              <i className="fas fa-cloud-download-alt" />
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* FILTERS occupy full width */}
          <div className="row">
            {/* Row 1: Part No + Unique No */}
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Part No</label>
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-sm"
                    value={partNo}
                    onChange={e => setPartNo(e.target.value)}
                    placeholder="Part No"
                  />
                  <div className="input-group-append">
                    <button type="button" className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Unique No</label>
                <input
                  className="form-control form-control-sm"
                  value={uniqueNo}
                  onChange={e => setUniqueNo(e.target.value)}
                  placeholder="Unique No"
                />
              </div>
            </div>
          </div>

          <div className="row">
            {/* Row 2: Supplier ID + Supplier Name */}
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Supplier ID</label>
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-sm"
                    value={supplierId}
                    onChange={e => setSupplierId(e.target.value)}
                    placeholder="Supplier ID"
                  />
                  <div className="input-group-append">
                    <button type="button" className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Supplier Name</label>
                <input
                  className="form-control form-control-sm"
                  value={supplierName}
                  onChange={e => setSupplierName(e.target.value)}
                  placeholder="Supplier Name"
                />
              </div>
            </div>
          </div>

          <div className="row">
            {/* Row 3: Parent Part + Has Subparts */}
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Parent Part</label>
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-sm"
                    value={parentPart}
                    onChange={e => setParentPart(e.target.value)}
                    placeholder="Parent Part"
                  />
                  <div className="input-group-append">
                    <button type="button" className="btn btn-outline-secondary btn-sm">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Has Subparts?</label>
                <select
                  className="form-control form-control-sm"
                  value={hasSubparts}
                  onChange={e => setHasSubparts(e.target.value)}
                >
                  <option value="">—</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 4: Search + Clear buttons */}
          <div className="row mb-3">
            <div className="col-12 text-right">
              <button type="button" className="btn btn-sm btn-primary mr-2" onClick={handleSearch}>
                <i className="fas fa-search mr-1" /> Search
              </button>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleClear}>
                <i className="fas fa-times mr-1" /> Clear
              </button>
            </div>
          </div>

          {/* Row 5: Table */}
          <div className="table-responsive">
            <table className="table table-striped table-sm mb-0">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>#</th>
                  <th>Part No</th>
                  <th>Suffix</th>
                  <th>Unique No</th>
                  <th>Name</th>
                  <th>Supplier Name</th>
                  <th>Parent Part No</th>
                  <th>Subparts</th>
                  <th>L</th>
                  <th>W</th>
                  <th>H</th>
                  <th>Qty/Box</th>
                  <th>Total Wt</th>
                  <th style={{ width: 110 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {parts.length === 0 ? (
                  <tr>
                    <td colSpan="14" className="text-center py-4 text-muted">No Data Found</td>
                  </tr>
                ) : (
                  parts.map((p, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{p.partNo}</td>
                      <td>{p.suffix}</td>
                      <td>{p.uniqueNo}</td>
                      <td>{p.name}</td>
                      <td>{p.supplierName}</td>
                      <td>{p.parentPartNo}</td>
                      <td>{p.subparts ? p.subparts.length : 0}</td>
                      <td>{p.L}</td>
                      <td>{p.W}</td>
                      <td>{p.H}</td>
                      <td>{p.qtyBox}</td>
                      <td>{p.totalWt}</td>
                      <td>
                        <button type="button" className="btn btn-sm btn-outline-primary mr-1">
                          <i className="fas fa-pencil-alt" />
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(i)}>
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Row 6: Pagination */}
          <div className="d-flex align-items-center justify-content-between mt-3">
            <div>
              <button type="button" className="btn btn-sm btn-light mr-1">{'<<'}</button>
              <button type="button" className="btn btn-sm btn-light mr-1">{'<'}</button>
              <button type="button" className="btn btn-sm btn-light mr-1">1</button>
              <button type="button" className="btn btn-sm btn-light mr-1">2</button>
              <button type="button" className="btn btn-sm btn-light">3</button>
              <button type="button" className="btn btn-sm btn-light ml-2">{'>'}</button>
            </div>

            <div className="form-inline small">
              <span className="mr-3">Total: {parts.length}</span>
              <div className="dropdown mr-2">
                <button className="btn btn-sm btn-light dropdown-toggle" type="button" data-toggle="dropdown">
                  10 per page
                </button>
                <div className="dropdown-menu">
                  <button className="dropdown-item" type="button">10</button>
                  <button className="dropdown-item" type="button">25</button>
                  <button className="dropdown-item" type="button">50</button>
                </div>
              </div>
              <i className="fas fa-chevron-down" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
