// src/pages/packing/DPI.jsx
import React, { useState } from 'react'
import NewDpiModal from '../../components/NewDpiModal'
import { dpiData } from '../../data/dpi.json'

export default function DPI() {
  // filter fields (match CPS style)
  const [dpiNo, setDpiNo] = useState('')
  const [refDpiNo, setRefDpiNo] = useState('')
  const [model, setModel] = useState('')
  const [cfcPjt, setCfcPjt] = useState('')
  const [fromUser, setFromUser] = useState('')
  const [toUser, setToUser] = useState('')
  const [issuedFrom, setIssuedFrom] = useState('')
  const [issuedTo, setIssuedTo] = useState('')
  const [effectiveFrom, setEffectiveFrom] = useState('')
  const [effectiveTo, setEffectiveTo] = useState('')
  //const [status, setStatus] = useState('Any')

  const STATUS_OPTIONS = ['Draft', 'Submitted', 'Rejected', 'Approved']
  const [statuses, setStatuses] = useState([])


// modal state
const [showNewDpi, setShowNewDpi] = useState(false)

  // table data (empty initially)
  const [rows, setRows] = useState(dpiData)

  // paging
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const total = rows.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))

  function handleSearch() {
    console.log('Search DPI with', {
      dpiNo,
      refDpiNo,
      model,
      cfcPjt,
      fromUser,
      toUser,
      issuedFrom,
      issuedTo,
      effectiveFrom,
      effectiveTo,
      status,
    })
    // TODO: replace with real API call / filter logic
  }

  function handleClear() {
    setDpiNo('')
    setRefDpiNo('')
    setModel('')
    setCfcPjt('')
    setFromUser('')
    setToUser('')
    setIssuedFrom('')
    setIssuedTo('')
    setEffectiveFrom('')
    setEffectiveTo('')
    setStatus('Any')
  }

  // actions
  function handleCreateDpi() {
    setShowNewDpi(true)
  }
  function handleCreatePci() {
    alert('Create PCI - placeholder')
  }
  function handleUpload() {
    alert('Upload placeholder')
  }
  function handleTemplate() {
    alert('Download template placeholder')
  }

  function goToPage(p) {
    const p2 = Math.min(Math.max(1, p), totalPages)
    setPage(p2)
  }

  function toggleStatus(status) {
    setStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status])
  }

  // slice rows for current page
  const visibleRows = rows.slice((page - 1) * perPage, page * perPage)

  // Called when NewDpiModal saves a DPI payload
  function handleSaveNewDpi(payload) {
    const newRow = {
      dpiNo: payload.dpiNo || '',
      refDpiNo: payload.refDpiNo || '',
      issuedDate: payload.issuedDate || '',
      effectiveDate: payload.effectiveDate || '',
      cfcPjt: payload.cfcPjt || '',
      model: payload.model || '',
      parts: payload.parts || [],
      numCps: payload.numCps || 0,
      supplier: payload.supplier || '',
      fromUser: payload.from || '',
      toUser: payload.to || '',
      status: 'Draft',
      raw: payload,
    }
    setRows(prev => [newRow, ...prev])
    setShowNewDpi(false)
    setPage(1)
  }

  // Called when NewDpiModal submits (set status Submitted)
  function handleSubmitNewDpi(payload) {
    const newRow = {
      dpiNo: payload.dpiNo || '',
      refDpiNo: payload.refDpiNo || '',
      issuedDate: payload.issuedDate || '',
      effectiveDate: payload.effectiveDate || '',
      cfcPjt: payload.cfcPjt || '',
      model: payload.model || '',
      parts: payload.parts || [],
      numCps: payload.numCps || 0,
      supplier: payload.supplier || '',
      fromUser: payload.from || '',
      toUser: payload.to || '',
      status: 'Submitted',
      raw: payload,
    }
    setRows(prev => [newRow, ...prev])
    setShowNewDpi(false)
    setPage(1)
  }

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        {/* header */}
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>DPI List</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-sm btn-outline-secondary mr-1" onClick={handleUpload} title="Upload">
              <i className="fas fa-cloud-upload-alt" /> Upload
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary mr-2" onClick={handleTemplate} title="Template">
              <i className="fas fa-cloud-download-alt" /> Template
            </button>
            <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleCreateDpi}>
              <i className="fas fa-file mr-1" /> Add DPI
            </button>
            <button type="button" className="btn btn-sm btn-primary" onClick={handleCreatePci}>
              <i className="fas fa-file-alt mr-1" /> Create PCI
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Filters using two-column layout */}
          <div className="row">
            {/* Left column */}
            <div className="col-12 col-md-6">
              <div className="form-row">
                <div className="form-group col-12">
                  <label className="small mb-1">DPI No</label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={dpiNo} onChange={e => setDpiNo(e.target.value)} placeholder="DPI No" />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-secondary btn-sm" title="Search DPI No" onClick={() => alert('Search DPI No placeholder')}>
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1">From</label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={fromUser} onChange={e => setFromUser(e.target.value)} placeholder="From user" />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-secondary btn-sm" title="People picker" onClick={() => alert('People picker placeholder')}>
                        <i className="fas fa-users" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1">Model</label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={model} onChange={e => setModel(e.target.value)} placeholder="Model" />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Model" onClick={() => alert('Search Model placeholder')}>
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1">Issued Date (from → to)</label>
                  <div className="form-row">
                    <div className="col">
                      <input type="date" className="form-control form-control-sm" value={issuedFrom} onChange={e => setIssuedFrom(e.target.value)} />
                    </div>
                    <div className="col">
                      <input type="date" className="form-control form-control-sm" value={issuedTo} onChange={e => setIssuedTo(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="col-12 col-md-6">
              <div className="form-row">
                <div className="form-group col-12">
                  <label className="small mb-1">Ref DPI No</label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={refDpiNo} onChange={e => setRefDpiNo(e.target.value)} placeholder="Ref DPI No" />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Ref DPI No" onClick={() => alert('Search Ref DPI No placeholder')}>
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1">CFC / Pjt</label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={cfcPjt} onChange={e => setCfcPjt(e.target.value)} placeholder="CFC / Project" />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-secondary btn-sm" title="Search CFC/Pjt" onClick={() => alert('Search CFC/Pjt placeholder')}>
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-group col-12">
                  <label className="small mb-1">Status (multi)</label>
                  <div className="form-control form-control-sm" style={{ minHeight: 44 }}>
                    <div className="d-flex flex-wrap" style={{ gap: '0.5rem' }}>
                      {STATUS_OPTIONS.map(s => (
                        <div key={s} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`status_${s}`}
                            checked={statuses.includes(s)}
                            onChange={() => toggleStatus(s)}
                          />
                          <label className="form-check-label ml-2" htmlFor={`status_${s}`}>{s}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <small className="form-text text-muted">You can select multiple statuses to filter.</small>
                </div>
                <div className="form-group col-12">
                  <label className="small mb-1">To</label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={toUser} onChange={e => setToUser(e.target.value)} placeholder="To user" />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-secondary btn-sm" title="People picker" onClick={() => alert('People picker placeholder')}>
                        <i className="fas fa-users" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1">Effective Date (from → to)</label>
                  <div className="form-row">
                    <div className="col">
                      <input type="date" className="form-control form-control-sm" value={effectiveFrom} onChange={e => setEffectiveFrom(e.target.value)} />
                    </div>
                    <div className="col">
                      <input type="date" className="form-control form-control-sm" value={effectiveTo} onChange={e => setEffectiveTo(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 6: Buttons — right aligned in second column */}
            <div className="col-12 d-flex">
              <div className="col-md-6" />
              <div className="col-md-6 d-flex justify-content-end">
                <button type="button" className="btn btn-sm btn-primary mr-2" onClick={handleSearch}>
                  <i className="fas fa-search mr-1" /> Search
                </button>
                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleClear}>
                  <i className="fas fa-times mr-1" /> Clear
                </button>
              </div>
            </div>

          </div>

          {/* small spacer */}
          <div className="mb-2" />

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-striped table-sm mb-0" style={{ whiteSpace: 'nowrap' }}>
              <thead>
                <tr>
                  <th style={{ width: 40 }}>No</th>
                  <th>Impl Period</th>
                  <th>Dest Code</th>
                  <th>Model code</th>
                  <th>Model</th>
                  <th>Part No</th>
                  <th>Part Name</th>
                  <th>Supplier Code</th>
                  <th>Supplier Name</th>
                  <th>Part Status</th>
                  <th>Detail Part Status</th>
                  <th>CPS Status</th>
                  <th>CPSNo</th>
                  <th>Part Category</th>
                  <th style={{ width: 120 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan="15" className="text-center py-4 text-muted">No Data Found</td>
                  </tr>
                ) : (
                  visibleRows.map((r, i) => (
                    <tr key={i}>                      
                      <td>{(page - 1) * perPage + i + 1}</td>
                      <td>{r.implementation_period}</td>
                      <td>{r.cps.model.destination.code}</td>
                      <td>{r.model_code}</td>
                      <td>{r.cps.model.model_name}</td>
                      <td>{r.part_no}</td>
                      <td>{r.cps.part_name}</td>
                      <td>{r.cps.supplier.supplier_code}</td>
                      <td>{r.cps.supplier.supplier_name}</td>
                      <td>{r.partStatus || ''}</td>
                      <td>{r.detailPartStatus || ''}</td>
                      <td>{r.status || ''}</td>
                      <td>{r.cps.cps_no}</td>
                      <td>{r.cps.pse_info.category}</td>                      
                      <td>
                        <button type="button" className="btn btn-sm btn-outline-primary mr-1" onClick={() => alert('View placeholder')}>
                          <i className="fas fa-eye" />
                        </button>
                      </td>
                    </tr>                    
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
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
                  <button className="dropdown-item" type="button" onClick={() => { setPerPage(10); setPage(1) }}>10</button>
                  <button className="dropdown-item" type="button" onClick={() => { setPerPage(25); setPage(1) }}>25</button>
                  <button className="dropdown-item" type="button" onClick={() => { setPerPage(50); setPage(1) }}>50</button>
                </div>
              </div>

              <i className="fas fa-chevron-down" />
            </div>
          </div>

        </div>
      </div>

      {/* New DPI Modal */}
      <NewDpiModal
        show={showNewDpi}
        onClose={() => setShowNewDpi(false)}
        onSave={handleSaveNewDpi}
        onSubmit={handleSubmitNewDpi}
      />
    </div>
  )
}