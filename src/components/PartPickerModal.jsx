// src/components/PartPickerModal.jsx
import React, { useState, useEffect } from 'react'
import PARTS from '../data/parts'
import { handleInputChange } from '../utils/globalFunctions'

// PartPickerModal
// Props: show (bool), onClose(), onSelect(selectedParts:Array), mode ('single'|'multi')
// Displays a list of parts (provided data) and extra generated fields (dimensions, costs, supplierId, parent)
export default function PartPickerModal({ show = false, onClose, onSelect, zIndex = 4000, mode = 'multi' }) {

  // deterministic pseudo-random generator based on index (keeps values stable across renders)
  function randFromIndex(i, min, max) {
    const seed = (i + 1) * 9301 + 49297
    const rnd = (seed % 233280) / 233280
    return Math.floor(min + rnd * (max - min + 1))
  }

  // build enriched parts list with extra fields
  const enriched = PARTS.map((r, i) => {
    const L = randFromIndex(i, 50, 1400) // mm
    const W = randFromIndex(i + 3, 20, 600)
    const H = randFromIndex(i + 7, 10, 800)
    const boxM3 = Number(((L * W * H) / 1_000_000).toFixed(3))
    const parent = 'P' + String(100000 + randFromIndex(i, 1, 9999))
    const supplierId = 'S' + String(200 + (i % 999))

    return {
      partNo: r[0],
      partName: r[1],
      supplierName: r[2],
      parentPartNo: parent,
      supplierId,
      L, W, H,
      boxM3,
    }
  })

  const [filterPartNo, setFilterPartNo] = useState('')
  const [filterPartName, setFilterPartName] = useState('')
  const [filterSupplierName, setFilterSupplierName] = useState('')
  const [activeFilters, setActiveFilters] = useState({})
  const [hasSearched, setHasSearched] = useState(false)
  const [selected, setSelected] = useState(mode === 'multi' ? {} : null)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  useEffect(() => {
    if (show) {
      setFilterPartNo('')
      setFilterPartName('')
      setFilterSupplierName('')
      setActiveFilters({})
      setHasSearched(false)
      setSelected(mode === 'multi' ? {} : null)
      setPage(1)
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => document.body.classList.remove('modal-open')
  }, [show])

  if (!show) return null

  function filteredParts() {
    if (!hasSearched) return []

    const qPart = (activeFilters.partNo || '').trim().toLowerCase()
    const qName = (activeFilters.partName || '').trim().toLowerCase()
    const qSup = (activeFilters.supplierName || '').trim().toLowerCase()

    return enriched.filter((p) => {
      if (qPart && !p.partNo.toLowerCase().includes(qPart)) return false
      if (qName && !p.partName.toLowerCase().includes(qName)) return false
      if (qSup && !p.supplierName.toLowerCase().includes(qSup)) return false
      return true
    })
  }

  const allFiltered = filteredParts()
  const total = allFiltered.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const visible = allFiltered.slice((page - 1) * perPage, page * perPage)

  const handleSearch = () => {
    setPage(1)
    setActiveFilters({
      partNo: filterPartNo,
      partName: filterPartName,
      supplierName: filterSupplierName,
    })
    setHasSearched(true)
  }

  const handleClear = () => {
    setFilterPartNo('')
    setFilterPartName('')
    setFilterSupplierName('')
    setActiveFilters({})
    setHasSearched(false)
    setPage(1)
  }

  function toggleSelect(idxGlobal) {
    if (mode === 'multi') {
      setSelected(s => ({ ...s, [idxGlobal]: !s[idxGlobal] }))
    } else {
      setSelected(idxGlobal)
    }
  }

  function selectAllOnPage(checked) {
    if (mode !== 'multi') return
    const base = (page - 1) * perPage
    const updates = {}
    visible.forEach((_, i) => { updates[base + i] = checked })
    setSelected(s => ({ ...s, ...updates }))
  }

  function handleAddSelected() {
    if (mode === 'multi') {
      const chosen = Object.keys(selected).filter(k => selected[k]).map(k => allFiltered[Number(k)])
      onSelect && onSelect(chosen)
      onClose && onClose()
    } else {
      if (selected !== null) {
        const chosen = allFiltered[selected]
        onSelect && onSelect(chosen)
        onClose && onClose()
      } else {
        onClose && onClose()
      }
    }
  }

  function goToPage(p) { setPage(Math.min(Math.max(1, p), totalPages)) }

  const modalBodyStyle = {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden', // we'll make inner table area scroll
  }

  // sticky filter row style — will stay visible while the table scrolls
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
    padding: '0 1rem 1rem 1rem',
    flex: '1 1 auto'
  }

  return (
    <div
      className="part-picker-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: zIndex, // use the prop
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="part-picker-modal"
        style={{
          background: '#fff',
          borderRadius: 8,
          boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
          zIndex: zIndex + 1, // ensure modal is above backdrop
          width: 'min(90vw, 1200px)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: 'min(90vh, 900px)',
        }}
      >
        <div className="modal-header">
          <h5 className="modal-title"><strong>Select Parts</strong></h5>
          <button type="button" className="close" onClick={onClose} aria-label="Close"><span aria-hidden>×</span></button>
        </div>

        {/* BODY (filters sticky + scrollable table) */}
        <div className="modal-body" style={modalBodyStyle}>

          {/* Sticky filter row — stays visible while table scrolls */}
          <div style={stickyFiltersStyle}>
            <div className="form-row align-items-end">
              <div className="form-group col-12 col-md-3">
                <label className="small mb-1">Part No</label>
                <input value={filterPartNo} onChange={handleInputChange(setFilterPartNo)} className="form-control form-control-sm" />
              </div>
              <div className="form-group col-12 col-md-3">
                <label className="small mb-1">Part Name</label>
                <input value={filterPartName} onChange={handleInputChange(setFilterPartName)} className="form-control form-control-sm" />
              </div>
              <div className="form-group col-12 col-md-3">
                <label className="small mb-1">Supplier Name</label>
                <input value={filterSupplierName} onChange={handleInputChange(setFilterSupplierName)} className="form-control form-control-sm" />
              </div>
              <div className="form-group col-12 col-md-3 d-flex">
                <button className="btn btn-primary btn-sm mr-2" onClick={handleSearch}>Search</button>
                <button className="btn btn-secondary btn-sm" onClick={handleClear}>Clear</button>
              </div>
            </div>
          </div>

          {/* Scrollable area that contains the table and pagination preview (pagination moved to footer) */}
          <div style={tableScrollStyle}>
            <div className="table-responsive">
              <table className="table table-sm table-striped table-bordered mb-0">
                <thead>
                  <tr>
                    <th style={{ width: 36 }}>
                      {mode === 'multi' && <input type="checkbox" onChange={e => selectAllOnPage(e.target.checked)} />}
                    </th>
                    <th>Part No</th>
                    <th>Part Name</th>
                    <th>Supplier Name</th>
                    <th>Supplier ID</th>
                    <th>Parent Part No</th>
                    <th>L (mm)</th>
                    <th>W (mm)</th>
                    <th>H (mm)</th>
                    <th>Box M3</th>
                  </tr>
                </thead>
                <tbody>
                  {allFiltered.length === 0 ? (
                    <tr><td colSpan={10} className="text-center text-muted py-4">
                      {hasSearched ? 'No Data Found' : 'Click Search to view parts'}
                    </td></tr>
                  ) : visible.map((p, i) => {
                    const idxGlobal = (page - 1) * perPage + i
                    return (
                      <tr key={idxGlobal}>
                        <td className="text-center">
                          {mode === 'multi' ? (
                            <input type="checkbox" checked={!!selected[idxGlobal]} onChange={() => toggleSelect(idxGlobal)} />
                          ) : (
                            <input type="radio" name="part-picker-radio" checked={selected === idxGlobal} onChange={() => toggleSelect(idxGlobal)} />
                          )}
                        </td>
                        <td>{p.partNo}</td>
                        <td className="text-left">{p.partName}</td>
                        <td>{p.supplierName}</td>
                        <td>{p.supplierId}</td>
                        <td>{p.parentPartNo}</td>
                        <td>{p.L}</td>
                        <td>{p.W}</td>
                        <td>{p.H}</td>
                        <td>{p.boxM3}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FOOTER (always visible) — contains pagination + action buttons */}
        <div className="modal-footer d-flex justify-content-between align-items-center">
          <div>
            <button className="btn btn-sm btn-light mr-1" onClick={() => goToPage(1)}>{'<<'}</button>
            <button className="btn btn-sm btn-light mr-1" onClick={() => goToPage(Math.max(1, page - 1))}>{'<'}</button>
            {[...Array(totalPages).keys()].map(n => (
              <button key={n} className={`btn btn-sm mr-1 ${page === n + 1 ? 'btn-primary' : 'btn-light'}`} onClick={() => goToPage(n + 1)}>{n + 1}</button>
            ))}
            <button className="btn btn-sm btn-light" onClick={() => goToPage(Math.min(totalPages, page + 1))}>{'>'}</button>
            <span className="ml-2 small text-muted">Total: {total}</span>
          </div>

          <div>
            <button className="btn btn-sm btn-primary mr-2" onClick={handleAddSelected}>Add Selected</button>
            <button className="btn btn-sm btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </div>

      </div>
    </div>
  )
}