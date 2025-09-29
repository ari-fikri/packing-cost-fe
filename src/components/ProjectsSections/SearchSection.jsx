import React from 'react'

export default function SearchSection({
  code, setCode,
  name, setName,
  models, setModels,
  sopPacking, setSopPacking,
  manager, setManager,
  statuses, setStatuses,
  handleSearch,
  clearFilters,
  handleOpenNew
}) {
  function toggleStatus(key) {
    if (key === 'all') {
      const newVal = !statuses.all
      setStatuses({ all: newVal, draft: false, active: false, onhold: false, completed: false })
    } else {
      setStatuses(prev => ({ ...prev, [key]: !prev[key], all: false }))
    }
  }

  return (
    <div className="card-body">
      {/* TopSection */}
      <div className="d-flex mb-3">
        <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleOpenNew}>
          <i className="fas fa-plus mr-1"></i> New CFC/PJT
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary mr-1" title="Upload">
          <i className="fas fa-cloud-upload-alt"></i>
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary" title="Download Template">
          <i className="fas fa-cloud-download-alt"></i>
        </button>
      </div>
      {/* MidSection */}
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label className="small mb-1">CFC / PJT Code</label>
            <div className="input-group input-group-sm">
              <input value={code} onChange={e => setCode(e.target.value)} className="form-control form-control-sm" placeholder="Code" />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary btn-sm" title="Search code"><i className="fas fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label className="small mb-1">CFC / PJT Name</label>
            <div className="input-group input-group-sm">
              <input value={name} onChange={e => setName(e.target.value)} className="form-control form-control-sm" placeholder="Project name" />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary btn-sm" title="Search name"><i className="fas fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label className="small mb-1">Related Models</label>
            <div className="input-group input-group-sm">
              <input value={models} onChange={e => setModels(e.target.value)} className="form-control form-control-sm" placeholder="Model code / name" />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary btn-sm" title="Select Model"><i className="fas fa-search"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label className="small mb-1">SOP Packing <span className="text-muted ml-2"><i>cth: 02.2025</i></span></label>
            <input value={sopPacking} onChange={e => setSopPacking(e.target.value)} className="form-control form-control-sm" placeholder="SOP Packing" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6">
          <label className="small mb-1 d-block">Status</label>
          <div className="form-inline flex-wrap">
            {['all', 'draft', 'active', 'onhold', 'completed'].map(key => {
              const id = `status-${key}`
              return (
                <div className="form-check mr-3" key={key}>
                  <input id={id} type="checkbox" className="form-check-input" checked={statuses[key]} onChange={() => toggleStatus(key)} />
                  <label className="form-check-label small ml-1" htmlFor={id}>{key === 'onhold' ? 'On Hold' : key.charAt(0).toUpperCase() + key.slice(1)}</label>
                </div>
              )
            })}
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label className="small mb-1">Project Manager</label>
            <div className="input-group input-group-sm">
              <input value={manager} onChange={e => setManager(e.target.value)} className="form-control form-control-sm" placeholder="Manager name" />
              <div className="input-group-append">
                <span className="input-group-text"><i className="fas fa-user" /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* BottomSection */}
      <div className="row mt-2">
        <div className="col-12 d-flex justify-content-end">
          <button type="button" className="btn btn-primary btn-sm mr-2" onClick={handleSearch}><i className="fas fa-search mr-1"></i> Filter</button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={clearFilters}><i className="fas fa-times mr-1"></i> Clear</button>
        </div>
      </div>
    </div>
  )
}