// src/pages/Projects.jsx
import React, { useState, useEffect } from 'react'
import NewProjectModal from '../components/NewProjectModal'
import projectsData from '../data/projects.json' // Import the dummy data

export default function Projects() {
  // filter states
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [models, setModels] = useState('')
  const [sopPacking, setSopPacking] = useState('')
  const [manager, setManager] = useState('')
  const [statuses, setStatuses] = useState({
    all: true, draft: false, active: false, onhold: false, completed: false
  })

  // modal + results
  const [showNewModal, setShowNewModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [results, setResults] = useState([]) // filtered projects

  // Load dummy data on mount
  useEffect(() => {
    setResults(projectsData)
  }, [])

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
    setSopPacking(''); setManager('')
    setStatuses({ all: true, draft: false, active: false, onhold: false, completed: false })
    setResults(projectsData)
  }

  function handleSearch() {
    let filtered = projectsData.filter(p =>
      (!code || p.code.toLowerCase().includes(code.toLowerCase())) &&
      (!name || p.name.toLowerCase().includes(name.toLowerCase())) &&
      (!models || p.models.toLowerCase().includes(models.toLowerCase())) &&
      (!sopPacking || p.sopPacking.toLowerCase().includes(sopPacking.toLowerCase())) &&
      (!manager || p.manager.toLowerCase().includes(manager.toLowerCase()))
    );
    // Status filter
    if (!statuses.all) {
      const statusKeys = [];
      if (statuses.draft) statusKeys.push('Draft');
      if (statuses.active) statusKeys.push('Active');
      if (statuses.onhold) statusKeys.push('On Hold');
      if (statuses.completed) statusKeys.push('Completed');
      if (statusKeys.length > 0) {
        filtered = filtered.filter(p => statusKeys.includes(p.status));
      }
    }
    setResults(filtered);
  }

  function handleOpenNew() {
    setEditingIndex(null)
    setShowNewModal(true)
  }
  function handleCloseNew() {
    setShowNewModal(false)
  }

  function handleSaveNew(payload) {
    const newRow = {
      code: payload.code || `CFC-${(results.length + 1).toString().padStart(3, '0')}`,
      name: payload.name || '(No name)',
      sopPacking: payload.sopPacking || '',
      manager: payload.manager || '',
      status: payload.status || 'Draft',
      models: (payload.models || []).map(m => m.code).join(', ')
    }

    if (editingIndex !== null) {
      setResults(prev => prev.map((r, i) => (i === editingIndex ? newRow : r)))
    } else {
      setResults(prev => [newRow, ...prev])
    }
    setShowNewModal(false)
    setEditingIndex(null)
  }

  function handleEdit(index) {
    setEditingIndex(index);
    setShowNewModal(true);
  }

  function handleDelete(index) {
    setResults(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container-fluid">
      <div className="card card-outline card-secondary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>CFC / Pjt List</b></h3>
          <div className="card-tools ml-auto">
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
        </div>

        {/* Filters */}
        <div className="card-body">
          {/* Row 1: Code + Name */}
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

          {/* Row 2: Related Models + SOP Packing */}
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

          {/* Row 3: Status + Project Manager */}
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

          {/* Buttons row */}
          <div className="row mt-2">
            <div className="col-12 d-flex justify-content-end">
              <button type="button" className="btn btn-primary btn-sm mr-2" onClick={handleSearch}><i className="fas fa-search mr-1"></i> Filter</button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={clearFilters}><i className="fas fa-times mr-1"></i> Clear</button>
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
                  <th>Project Manager</th>
                  <th>SOP Packing</th>
                  <th>Status</th>
                  <th>Models</th>
                  <th style={{ width: 120 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 && (
                  <tr><td colSpan="7" className="text-center py-4 text-muted">No Data Found</td></tr>
                )}
                {results.map((r, idx) => (
                  <tr key={idx}>
                    <td>{r.code}</td>
                    <td>{r.name}</td>
                    <td>{r.manager}</td>
                    <td>{r.sopPacking}</td>
                    <td>{r.status}</td>
                    <td>
                      {Array.isArray(r.models)
                        ? r.models
                            .map(m => (typeof m === 'string' ? m : m.code))
                            .join(', ')
                        : r.models}
                    </td>
                    <td>
                      <button type="button" className="btn btn-sm btn-outline-primary mr-1" onClick={() => handleEdit(idx)}><i className="fas fa-edit" /></button>
                      <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(idx)}><i className="fas fa-trash" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <NewProjectModal
        visible={showNewModal}
        onClose={handleCloseNew}
        onSave={handleSaveNew}
        initialData={
          editingIndex !== null && results[editingIndex]
            ? {
                ...results[editingIndex],
                models: Array.isArray(results[editingIndex].models)
                  ? results[editingIndex].models.map(m =>
                      typeof m === 'string'
                        ? { code: m, name: '', remark: '' }
                        : m
                    )
                  : (results[editingIndex].models || '').split(',').map(m => ({ code: m.trim(), name: '', remark: '' }))
              }
            : null
        }
      />
    </div>
  )
}
