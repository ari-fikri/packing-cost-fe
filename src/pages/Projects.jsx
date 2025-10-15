// src/pages/Projects.jsx
import React, { useState, useEffect } from 'react'
import NewProjectModal from '../components/NewProjectModal'
import projectsData from '../data/projects.json'
import SearchSection from '../components/ProjectsSections/SearchSection'
import ResultSection from '../components/ProjectsSections/ResultSection'

export default function Projects() {
  // filter states
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [models, setModels] = useState('')
  const [manager, setManager] = useState('')
  const [statuses, setStatuses] = useState({
    all: true, draft: false, active: false, onhold: false, completed: false
  })

  // modal + results
  const [showNewModal, setShowNewModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [results, setResults] = useState([])

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  useEffect(() => {
    setResults(projectsData)
  }, [])

  function clearFilters() {
    setCode(''); setName(''); setModels('')
    setManager('')
    setStatuses({ all: true, draft: false, active: false, onhold: false, completed: false })
    setResults(projectsData)
    setCurrentPage(1)
  }

  function handleSearch() {
    let filtered = projectsData.filter(p =>
      (!code || p.code?.toLowerCase().includes(code.toLowerCase())) &&
      (!name || p.name?.toLowerCase().includes(name.toLowerCase())) &&
      (!models || (Array.isArray(p.models)
        ? p.models.join(', ').toLowerCase().includes(models.toLowerCase())
        : (p.models || '').toLowerCase().includes(models.toLowerCase()))) &&
      (!manager || p.manager?.toLowerCase().includes(manager.toLowerCase()))
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
    setCurrentPage(1)
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
          <h3 className="card-title mb-0"><b>Project List</b></h3>
          {/* TopSection */}
          <div className="ml-auto">
            <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleOpenNew}>
              <i className="fas fa-plus mr-1"></i> New Project
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary mr-1" title="Upload">
              <i className="fas fa-cloud-upload-alt"></i>
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" title="Download Template">
              <i className="fas fa-cloud-download-alt"></i>
            </button>
          </div>
        </div>
        <SearchSection
          code={code} setCode={setCode}
          name={name} setName={setName}
          models={models} setModels={setModels}
          manager={manager} setManager={setManager}
          statuses={statuses} setStatuses={setStatuses}
          handleSearch={handleSearch}
          clearFilters={clearFilters}
          handleOpenNew={handleOpenNew}
        />
        <ResultSection
          results={results}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
        />
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
