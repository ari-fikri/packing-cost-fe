import React, { useState, useEffect } from 'react'
import { handleInputChange } from '../utils/globalFunctions'

export default function SupplierPickerModal({ show = false, onClose, onSelect, zIndex = 4000, mode = 'single' }) {
  const [suppliers, setSuppliers] = useState([])
  const [filterCode, setFilterCode] = useState('')
  const [filterName, setFilterName] = useState('')
  const [activeFilters, setActiveFilters] = useState({ code: '', name: '' })
  const [hasSearched, setHasSearched] = useState(false)
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  useEffect(() => {
    fetch('/suppliers.json')
      .then(res => res.json())
      .then(data => setSuppliers(data))
      .catch(err => console.error("Failed to load suppliers:", err))
  }, [])

  useEffect(() => {
    if (show) {
      setFilterCode('')
      setFilterName('')
      setActiveFilters({ code: '', name: '' })
      setHasSearched(false)
      setSelected(null)
      setPage(1)
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => document.body.classList.remove('modal-open')
  }, [show])

  if (!show) return null

  function handleSearch() {
    setPage(1)
    setHasSearched(true)
    setActiveFilters({
      code: filterCode,
      name: filterName,
    })
  }

  function handleClear() {
    setPage(1)
    setFilterCode('')
    setFilterName('')
    setActiveFilters({ code: '', name: '' })
    setHasSearched(false)
  }

  function filteredSuppliers() {
    if (!hasSearched) return []

    const qCode = activeFilters.code.trim().toLowerCase()
    const qName = activeFilters.name.trim().toLowerCase()

    return suppliers.filter((s) => {
      if (qCode && !s.code.toLowerCase().includes(qCode)) return false
      if (qName && !s.name.toLowerCase().includes(qName)) return false
      return true
    })
  }

  const allFiltered = filteredSuppliers()
  const total = allFiltered.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const visible = allFiltered.slice((page - 1) * perPage, page * perPage)

  function toggleSelect(idxGlobal) {
    if (mode === 'multi') {
      // For future use if multi-select is needed
      setSelected(s => ({ ...s, [idxGlobal]: !s[idxGlobal] }))
    } else {
      setSelected(idxGlobal)
    }
  }

  function handleAddSelected() {
    if (selected !== null) {
      const chosen = allFiltered[selected]
      onSelect && onSelect(chosen)
      onClose && onClose()
    } else {
      onClose && onClose()
    }
  }

  function goToPage(p) { setPage(Math.min(Math.max(1, p), totalPages)) }

  const modalBodyStyle = {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }

  const stickyFiltersStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 5,
    background: 'white',
    padding: '1rem 1rem 0.5rem 1rem',
    borderBottom: '1px solid #e9ecef'
  }

  const tableScrollStyle = {
    overflow: 'auto',
    padding: '0 1rem 1rem 1rem'
  }

  return (
    <div
      className="supplier-picker-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: zIndex,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="supplier-picker-modal"
        style={{
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
          zIndex: zIndex + 1,
          width: '100%',
          maxWidth: 800,
          minHeight: 400,
          display: 'flex',
          flexDirection: 'column',
          height: 'min(90vh, 700px)',
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title"><strong>Select Supplier</strong></h5>
          <button type="button" className="close" onClick={onClose} aria-label="Close"><span aria-hidden>×</span></button>
        </div>

        <div className="modal-body" style={modalBodyStyle}>
          <div style={stickyFiltersStyle}>
            <div className="form-row">
              <div className="form-group col-12 col-md-6">
                <label className="small mb-1">Supplier Code</label>
                <input value={filterCode} onChange={handleInputChange(setFilterCode)} className="form-control form-control-sm" />
              </div>
              <div className="form-group col-12 col-md-6">
                <label className="small mb-1">Supplier Name</label>
                <input value={filterName} onChange={handleInputChange(setFilterName)} className="form-control form-control-sm" />
              </div>
            </div>
            <div className="form-row">
              <div className="col-12 text-right mb-2">
                <button type="button" className="btn btn-sm btn-primary mr-2" onClick={handleSearch}>
                  <i className="fas fa-search mr-1" /> Search
                </button>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleClear}>
                  <i className="fas fa-eraser mr-1" /> Clear
                </button>
              </div>
            </div>
          </div>

          <div style={tableScrollStyle}>
            <div className="table-responsive">
              <table className="table table-sm table-striped table-bordered mb-0">
                <thead>
                  <tr>
                    <th style={{width:36}}></th>
                    <th>Supplier Code</th>
                    <th>Supplier Name</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.length === 0 ? (
                    <tr><td colSpan={4} className="text-center text-muted py-4">
                      {hasSearched ? 'No Data Found' : 'Please click Search to begin'}
                    </td></tr>
                  ) : visible.map((s, i) => {
                    const idxGlobal = (page - 1) * perPage + i
                    return (
                      <tr key={idxGlobal}>
                        <td className="text-center">
                          <input type="radio" name="supplier-picker-radio" checked={selected === idxGlobal} onChange={() => toggleSelect(idxGlobal)} />
                        </td>
                        <td>{s.code}</td>
                        <td>{s.name}</td>
                        <td>{s.address}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="modal-footer d-flex justify-content-between align-items-center">
          <div>
            <button className="btn btn-sm btn-light mr-1" onClick={() => goToPage(1)} disabled={page <= 1}>{'<<'}</button>
            <button className="btn btn-sm btn-light mr-1" onClick={() => goToPage(page - 1)} disabled={page <= 1}>{'<'}</button>
            <span className='mr-1'>Page {page} of {totalPages}</span>
            <button className="btn btn-sm btn-light" onClick={() => goToPage(page + 1)} disabled={page >= totalPages}>{'>'}</button>
            <button className="btn btn-sm btn-light ml-1" onClick={() => goToPage(totalPages)} disabled={page >= totalPages}>{'>>'}</button>
            <span className="ml-2 small text-muted">Total: {total}</span>
          </div>

          <div>
            <button className="btn btn-sm btn-primary mr-2" onClick={handleAddSelected} disabled={selected === null}>Add Selected</button>
            <button className="btn btn-sm btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}