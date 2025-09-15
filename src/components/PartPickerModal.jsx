// src/components/PartPickerModal.jsx
import React, { useState, useEffect } from 'react'
import PARTS from '../data/parts'

// PartPickerModal
// Props: show (bool), onClose(), onSelect(selectedParts:Array)
// Displays a list of parts (provided data) and extra generated fields (dimensions, costs, supplierId, parent)
export default function PartPickerModal({ show = false, onClose, onSelect }) {

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
    const material = randFromIndex(i + 11, 50, 15000)
    const outer = randFromIndex(i + 13, 10, 5000)
    const labor = randFromIndex(i + 17, 5, 2000)
    const inland = randFromIndex(i + 19, 1, 1000)
    const totalCost = material + outer + labor + inland
    const prevYear = Math.max(1, Math.round(totalCost * (0.9 + ((randFromIndex(i+23,0,20))/100))))
    const diffPerc = (((totalCost - prevYear) / prevYear) * 100).toFixed(1) + '%'
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
      innerTotal: material,
      outerTotal: outer,
      materialTotal: material, // reuse for demo
      laborTotal: labor,
      inlandTotal: inland,
      totalCost,
      prevYear,
      diffPerc
    }
  })

  const [filters, setFilters] = useState({ partNo: '', partName: '', supplierName: '' })
  const [selected, setSelected] = useState({})
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  useEffect(() => {
    if (show) {
      setFilters({ partNo: '', partName: '', supplierName: '' })
      setSelected({})
      setPage(1)
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => document.body.classList.remove('modal-open')
  }, [show])

  if (!show) return null

  function handleFilterChange(e) {
    const { name, value } = e.target
    setFilters(f => ({ ...f, [name]: value }))
    setPage(1)
  }

  function filteredParts() {
    const qPart = filters.partNo.trim().toLowerCase()
    const qName = filters.partName.trim().toLowerCase()
    const qSup = filters.supplierName.trim().toLowerCase()
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
  const visible = allFiltered.slice((page-1)*perPage, page*perPage)

  function toggleSelect(idxGlobal) {
    setSelected(s => ({ ...s, [idxGlobal]: !s[idxGlobal] }))
  }

  function selectAllOnPage(checked) {
    const base = (page-1)*perPage
    const updates = {}
    visible.forEach((_, i) => { updates[base + i] = checked })
    setSelected(s => ({ ...s, ...updates }))
  }

  function handleAddSelected() {
    const chosen = Object.keys(selected).filter(k => selected[k]).map(k => allFiltered[Number(k)])
    onSelect && onSelect(chosen)
    onClose && onClose()
  }

  function goToPage(p) { setPage(Math.min(Math.max(1, p), totalPages)) }

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"><strong>Select Parts</strong></h5>
              <button type="button" className="close" onClick={onClose} aria-label="Close"><span aria-hidden>×</span></button>
            </div>

            <div className="modal-body">
              <div className="form-row mb-2">
                <div className="form-group col-12 col-md-4">
                  <label className="small mb-1">Part No</label>
                  <input name="partNo" value={filters.partNo} onChange={handleFilterChange} className="form-control form-control-sm" />
                </div>
                <div className="form-group col-12 col-md-4">
                  <label className="small mb-1">Part Name</label>
                  <input name="partName" value={filters.partName} onChange={handleFilterChange} className="form-control form-control-sm" />
                </div>
                <div className="form-group col-12 col-md-4">
                  <label className="small mb-1">Supplier Name</label>
                  <input name="supplierName" value={filters.supplierName} onChange={handleFilterChange} className="form-control form-control-sm" />
                </div>
              </div>

              <div className="table-responsive">
                <table className="table table-sm table-striped table-bordered">
                  <thead>
                    <tr>
                      <th style={{width:36}}><input type="checkbox" onChange={e => selectAllOnPage(e.target.checked)} /></th>
                      <th>Part No</th>
                      <th>Part Name</th>
                      <th>Supplier Name</th>
                      <th>Supplier ID</th>
                      <th>Parent Part No</th>
                      <th>L (mm)</th>
                      <th>W (mm)</th>
                      <th>H (mm)</th>
                      <th>Box M3</th>
                      <th>Inner</th>
                      <th>Outer</th>
                      <th>Material</th>
                      <th>Labor</th>
                      <th>Inland</th>
                      <th>Total Cost</th>
                      <th>Prev Year</th>
                      <th>Diff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.length === 0 ? (
                      <tr><td colSpan={18} className="text-center text-muted py-4">No Data Found</td></tr>
                    ) : visible.map((p, i) => {
                      const idxGlobal = (page-1)*perPage + i
                      return (
                        <tr key={idxGlobal}>
                          <td className="text-center"><input type="checkbox" checked={!!selected[idxGlobal]} onChange={() => toggleSelect(idxGlobal)} /></td>
                          <td>{p.partNo}</td>
                          <td className="text-left">{p.partName}</td>
                          <td>{p.supplierName}</td>
                          <td>{p.supplierId}</td>
                          <td>{p.parentPartNo}</td>
                          <td>{p.L}</td>
                          <td>{p.W}</td>
                          <td>{p.H}</td>
                          <td>{p.boxM3}</td>
                          <td>{p.innerTotal}</td>
                          <td>{p.outerTotal}</td>
                          <td>{p.materialTotal}</td>
                          <td>{p.laborTotal}</td>
                          <td>{p.inlandTotal}</td>
                          <td>{p.totalCost}</td>
                          <td>{p.prevYear}</td>
                          <td>{p.diffPerc}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div>
                  <button className="btn btn-sm btn-light mr-1" onClick={() => goToPage(1)}>{'<<'}</button>
                  <button className="btn btn-sm btn-light mr-1" onClick={() => goToPage(Math.max(1, page-1))}>{'<'}</button>
                  {[...Array(totalPages).keys()].map(n => (
                    <button key={n} className={`btn btn-sm mr-1 ${page === n+1 ? 'btn-primary' : 'btn-light'}`} onClick={() => goToPage(n+1)}>{n+1}</button>
                  ))}
                  <button className="btn btn-sm btn-light" onClick={() => goToPage(Math.min(totalPages, page+1))}>{'>'}</button>
                </div>
                <div className="small text-muted">Total: {total}</div>
              </div>

            </div>

            <div className="modal-footer d-flex justify-content-end">
              <button className="btn btn-sm btn-primary mr-2" onClick={handleAddSelected}>Add Selected</button>
              <button className="btn btn-sm btn-secondary" onClick={onClose}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  )
}
