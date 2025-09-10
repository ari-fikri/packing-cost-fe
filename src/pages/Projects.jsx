// src/pages/Projects.jsx
import React, { useState } from 'react'

export default function Projects() {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [models, setModels] = useState('')
  const [type, setType] = useState('all')
  const [startFrom, setStartFrom] = useState('')
  const [startTo, setStartTo] = useState('')
  const [endFrom, setEndFrom] = useState('')
  const [endTo, setEndTo] = useState('')
  const [manager, setManager] = useState('')
  const [statuses, setStatuses] = useState({
    all: true, draft: false, active: false, onhold: false, completed: false
  })

  function toggleStatus(key) {
    if (key === 'all') {
      const newVal = !statuses.all
      setStatuses({ all: newVal, draft: false, active: false, onhold: false, completed: false })
    } else {
      setStatuses(prev => ({ ...prev, [key]: !prev[key], all: false }))
    }
  }

  function clearFilters() {
    setCode(''); setName(''); setModels('')
    setType('all'); setStartFrom(''); setStartTo('')
    setEndFrom(''); setEndTo(''); setManager('')
    setStatuses({ all: true, draft: false, active: false, onhold: false, completed: false })
  }

  function handleSearch() {
    console.log('Search with filters:', {
      code, name, models, type,
      startFrom, startTo, endFrom, endTo,
      manager, statuses
    })
  }

  return (
    <div className="container-fluid">
      <div className="card card-outline card-secondary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>CFC / Project List</b></h3>
          <div className="card-tools ml-auto">
            <button className="btn btn-sm btn-success mr-2"><i className="fas fa-plus mr-1"></i> New CFC/PJT</button>
            <button className="btn btn-sm btn-outline-secondary mr-1"><i className="fas fa-cloud-upload-alt"></i></button>
            <button className="btn btn-sm btn-outline-secondary"><i className="fas fa-cloud-download-alt"></i></button>
          </div>
        </div>

        {/* Filters */}
        <div className="card-body">
          {/* Row 1: Code + Name */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">CFC / PJT Code</label>
                <div className="input-group input-group-sm">
                  <input value={code} onChange={e => setCode(e.target.value)} className="form-control form-control-sm" placeholder="Code" />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary btn-sm" title="Search code"><i className="fas fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">CFC / PJT Name</label>
                <input value={name} onChange={e => setName(e.target.value)} className="form-control form-control-sm" placeholder="Project name" />
              </div>
            </div>
          </div>

          {/* Row 2: Models + Type */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Related Models</label>
                <div className="input-group input-group-sm">
                  <input value={models} onChange={e => setModels(e.target.value)} className="form-control form-control-sm" placeholder="Model code / name" />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary btn-sm" title="Select Model"><i className="fas fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1 d-block">Type</label>
                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                  <label className={"btn btn-sm " + (type === 'all' ? 'btn-primary' : 'btn-outline-secondary')} onClick={() => setType('all')}>All</label>
                  <label className={"btn btn-sm " + (type === 'pxp' ? 'btn-primary' : 'btn-outline-secondary')} onClick={() => setType('pxp')}>PxP</label>
                  <label className={"btn btn-sm " + (type === 'lot' ? 'btn-primary' : 'btn-outline-secondary')} onClick={() => setType('lot')}>Lot</label>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Start + End Dates */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Start Date</label>
                <div className="d-flex">
                  <input type="date" value={startFrom} onChange={e => setStartFrom(e.target.value)} className="form-control form-control-sm" />
                  <div className="px-2 align-self-center">—</div>
                  <input type="date" value={startTo} onChange={e => setStartTo(e.target.value)} className="form-control form-control-sm" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">End Date</label>
                <div className="d-flex">
                  <input type="date" value={endFrom} onChange={e => setEndFrom(e.target.value)} className="form-control form-control-sm" />
                  <div className="px-2 align-self-center">—</div>
                  <input type="date" value={endTo} onChange={e => setEndTo(e.target.value)} className="form-control form-control-sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Manager + Status */}
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Project Manager</label>
                <div className="input-group input-group-sm">
                  <input value={manager} onChange={e => setManager(e.target.value)} className="form-control form-control-sm" placeholder="Manager name" />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary btn-sm" title="Select Model"><i className="fas fa-search"></i></button>
                  </div>                  
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <label className="small mb-1 d-block">Status</label>
              <div className="form-inline flex-wrap">
                {['all', 'draft', 'active', 'onhold', 'completed'].map(key => (
                  <div className="form-check mr-3" key={key}>
                    <input type="checkbox" className="form-check-input" id={key} checked={statuses[key]} onChange={() => toggleStatus(key)} />
                    <label className="form-check-label small ml-1" htmlFor={key}>{key === 'onhold' ? 'On Hold' : key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons row */}
          <div className="row mt-2">
            <div className="col-12 d-flex justify-content-end">
              <button className="btn btn-primary btn-sm mr-2" onClick={handleSearch}><i className="fas fa-search mr-1"></i> Search</button>
              <button className="btn btn-secondary btn-sm" onClick={clearFilters}><i className="fas fa-undo mr-1"></i> Reset</button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="card-body pt-0">
          <div className="table-responsive">
            <table className="table table-striped table-sm mb-0">
              <thead className="thead-light">
                <tr>
                  <th>CFC/PJT Code</th>
                  <th>CFC/PJT Name</th>
                  <th>Type</th>
                  <th>Project Manager</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Models</th>
                  <th style={{ width: 120 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan="9" className="text-center py-4 text-muted">No Data Found</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
