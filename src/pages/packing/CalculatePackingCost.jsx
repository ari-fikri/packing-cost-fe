// src/pages/packing/CalculatePackingCost.jsx
import React, { useState } from 'react'
import PackingCostNewModal from '../../components/PackingCostNewModal'

export default function CalculatePackingCost() {
  // filters (two-column layout)
  const [calCode, setCalCode] = useState('')
  const [period, setPeriod] = useState('All')
  const [destCode, setDestCode] = useState('All')
  const [modelCode, setModelCode] = useState('')
  const [type, setType] = useState('All') // 'All' | 'PxP' | 'Lot'

  // table / paging state (empty for now)
  const [rows, setRows] = useState([]) // <-- use both!
  const [perPage, setPerPage] = useState(3)
  const [page, setPage] = useState(1)
  const total = rows.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))

  // Modal state
  const [showNewModal, setShowNewModal] = useState(false)

  function handleFilter(e) {
    e && e.preventDefault && e.preventDefault()
    console.log('Filter with', { calCode, period, destCode, modelCode, type })
    setPage(1)
  }

  function handleClear() {
    setCalCode('')
    setPeriod('All')
    setDestCode('All')
    setModelCode('')
    setType('All')
    setPage(1)
  }

  function goToPage(p) {
    const p2 = Math.min(Math.max(1, p), totalPages)
    setPage(p2)
  }

  const visibleRows = rows.slice((page - 1) * perPage, page * perPage)

  // Called when modal Save is pressed (payload contains modal form + parts)
  function handleModalSave(payload) {
    console.log('Packing cost saved payload:', payload)
    setRows(prev => [...prev, payload]);
    setShowNewModal(false)
    // TODO: send payload to backend / add to list
  }

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        {/* header */}
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Packing Cost Calculation List</b></h3>
          <div className="card-tools ml-auto d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-sm btn-success mr-2"
              title="Calculate Packing Cost"
              onClick={() => setShowNewModal(true)}
            >
              <i className="fas fa-calculator mr-1" /> Calculate Packing Cost
            </button>

            <button type="button" className="btn btn-sm btn-outline-secondary mr-1" title="Upload">
              <i className="fas fa-cloud-upload-alt" /> Upload
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" title="Template">
              <i className="fas fa-cloud-download-alt" /> Template
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Filters form (two-column layout) */}
          <form onSubmit={handleFilter} className="mb-3">
            <div className="row">
              {/* left column */}
              <div className="col-12 col-md-6">
                <div className="form-row">
                  <div className="form-group col-12">
                    <label className="small mb-1">Pack Cost Cal Code</label>
                    <div className="input-group input-group-sm">
                      <input
                        className="form-control form-control-sm"
                        value={calCode}
                        onChange={e => setCalCode(e.target.value)}
                        placeholder="Pack Cost Cal Code"
                      />
                      <div className="input-group-append">
                        <button type="button" className="btn btn-outline-secondary btn-sm" title="Search">
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="form-group col-12">
                    <label className="small mb-1">Dest Code</label>
                    <select className="form-control form-control-sm" value={destCode} onChange={e => setDestCode(e.target.value)}>
                      <option value="All">All</option>
                      <option value="024W">024W</option>
                      <option value="ARG">ARG</option>
                    </select>
                  </div>

                  <div className="form-group col-12">
                    <label className="small mb-1">Type</label>
                    <div className="form-control form-control-sm" style={{ minHeight: 44 }}>
                      <div className="form-check form-check-inline mr-3">
                        <input className="form-check-input" type="radio" name="typeRadio" id="type_all" value="All" checked={type === 'All'} onChange={() => setType('All')} />
                        <label className="form-check-label ml-2" htmlFor="type_all">All</label>
                      </div>
                      <div className="form-check form-check-inline mr-3">
                        <input className="form-check-input" type="radio" name="typeRadio" id="type_pxp" value="PxP" checked={type === 'PxP'} onChange={() => setType('PxP')} />
                        <label className="form-check-label ml-2" htmlFor="type_pxp">PxP</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="typeRadio" id="type_lot" value="Lot" checked={type === 'Lot'} onChange={() => setType('Lot')} />
                        <label className="form-check-label ml-2" htmlFor="type_lot">Lot</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* right column */}
              <div className="col-12 col-md-6">
                <div className="form-row">
                  <div className="form-group col-12">
                    <label className="small mb-1">Period</label>
                    <select className="form-control form-control-sm" value={period} onChange={e => setPeriod(e.target.value)}>
                      <option>All</option>
                      <option>01.2025</option>
                      <option>02.2025</option>
                      <option>03.2025</option>
                    </select>
                  </div>

                  <div className="form-group col-12">
                    <label className="small mb-1">Model Code</label>
                    <div className="input-group input-group-sm">
                      <input
                        className="form-control form-control-sm"
                        value={modelCode}
                        onChange={e => setModelCode(e.target.value)}
                        placeholder="Model Code"
                      />
                      <div className="input-group-append">
                        <button type="button" className="btn btn-outline-secondary btn-sm" title="Search">
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Filter & Clear Buttons — moved just above the table, right-aligned */}
          <div className="d-flex justify-content-end mb-3">
            <button type="button" className="btn btn-sm btn-primary mr-2" onClick={handleFilter}>
              <i className="fas fa-search mr-1" /> Filter
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleClear}>
              <i className="fas fa-times mr-1" /> Clear
            </button>
          </div>

          {/* table */}
          <div className="table-responsive">
            <table className="table table-striped table-sm mb-0">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>No</th>
                  <th>PPR Code</th>
                  <th>Period</th>
                  <th>Dest Code</th>
                  <th>Dest Country</th>
                  <th>Model Code</th>
                  <th># Parts</th>
                  <th>Type</th>
                  <th style={{ width: 120 }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-muted">No Data Found</td>
                  </tr>
                ) : (
                  visibleRows.map((r, i) => (
                    <tr key={i}>
                      <td>{(page - 1) * perPage + i + 1}</td>
                      <td>{r.pprCode}</td>
                      <td>{r.period}</td>
                      <td>{r.destCode}</td>
                      <td>{r.destCountry}</td>
                      <td>{r.modelCode}</td>
                      <td>{r.numParts}</td>
                      <td>{r.type}</td>
                      <td>
                        <button type="button" className="btn btn-sm btn-outline-primary mr-1" onClick={() => alert('View placeholder')}><i className="fas fa-eye" /></button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => alert('Delete placeholder')}><i className="fas fa-trash" /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          <div className="d-flex align-items-center justify-content-between mt-3">
            <div>
              <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(1)}>{'<<'}</button>
              <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(Math.max(1, page - 1))}>{'<'}</button>
              {[...Array(totalPages).keys()].map(n => (
                <button
                  key={n}
                  type="button"
                  className={`btn btn-sm mr-1 ${page === n + 1 ? 'btn-primary' : 'btn-light'}`}
                  onClick={() => goToPage(n + 1)}
                >
                  {n + 1}
                </button>
              ))}
              <button type="button" className="btn btn-sm btn-light ml-2" onClick={() => goToPage(Math.min(totalPages, page + 1))}>{'>'}</button>
            </div>

            <div className="form-inline small">
              <span className="mr-3">Total: {total}</span>
              <div className="dropdown mr-2">
                <button className="btn btn-sm btn-light dropdown-toggle" type="button" data-toggle="dropdown">
                  {perPage} per page
                </button>
                <div className="dropdown-menu">
                  <button className="dropdown-item" type="button" onClick={() => { setPerPage(3); setPage(1) }}>3</button>
                  <button className="dropdown-item" type="button" onClick={() => { setPerPage(10); setPage(1) }}>10</button>
                  <button className="dropdown-item" type="button" onClick={() => { setPerPage(25); setPage(1) }}>25</button>
                </div>
              </div>

              <i className="fas fa-chevron-down" />
            </div>
          </div>
        </div>
      </div>

      {/* Packing Cost New Modal */}
      <PackingCostNewModal
        show={showNewModal}
        onClose={() => setShowNewModal(false)}
        onSave={handleModalSave}
      />
    </div>
  )
}
