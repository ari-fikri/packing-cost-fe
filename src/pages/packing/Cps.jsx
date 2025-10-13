// src/pages/packing/Cps.jsx
import React, { useState } from 'react'
import NewCpsModal from '../../components/NewCPSModal.jsx'
import PersonPickerModal from '../../components/PersonPickerModal' // <-- import the modal

export default function Cps() {
  // filter fields
  const [cpsNo, setCpsNo] = useState('')
  const [refCpsNo, setRefCpsNo] = useState('')
  const [model, setModel] = useState('')
  const [dpiNo, setDpiNo] = useState('')
  const [cfcPjt, setCfcPjt] = useState('')
  const [fromUser, setFromUser] = useState('')
  const [toUser, setToUser] = useState('')
  const [issuedFrom, setIssuedFrom] = useState('')
  const [issuedTo, setIssuedTo] = useState('')
  const [effectiveFrom, setEffectiveFrom] = useState('')
  const [effectiveTo, setEffectiveTo] = useState('')
  const [status, setStatus] = useState('Any')

  // modal state
  const [showNewCps, setShowNewCps] = useState(false)

  // person picker state
  const [showPersonPicker, setShowPersonPicker] = useState(false)
  const [personPickerTarget, setPersonPickerTarget] = useState('from') // 'from' or 'to'

  // table data (empty initially)
  const [rows, setRows] = useState([])

  // paging
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const total = rows.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))

  function handleSearch() {
    console.log('Search CPS with', {
      cpsNo,
      refCpsNo,
      model,
      dpiNo,
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
    setCpsNo('')
    setRefCpsNo('')
    setModel('')
    setDpiNo('')
    setCfcPjt('')
    setFromUser('')
    setToUser('')
    setIssuedFrom('')
    setIssuedTo('')
    setEffectiveFrom('')
    setEffectiveTo('')
    setStatus('Any')
  }

  // open modal
  function handleCreateCps() {
    setShowNewCps(true)
  }
  function handleCreatePsi() {
    alert('Create PSI - placeholder')
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

  // slice rows for current page
  const visibleRows = rows.slice((page - 1) * perPage, page * perPage)

  // Called when NewCpsModal saves a CPS payload
  function handleSaveNewCps(payload) {
    // build a minimal row object for table (you can adapt fields)
    const newRow = {
      cpsNo: payload.cpsNo || '',
      refCpsNo: payload.refCpsNo || '',
      dpiNo: payload.dpiNo || '',
      issuedDate: payload.issueDate || '',
      effectiveDate: payload.effectiveDate || '',
      cfcPjt: payload.cfcPjtCode || '',
      model: payload.model || '',
      parts: payload.packing?.innerRows || [],
      fromUser: '', // empty for now
      toUser: '', // empty for now
      status: 'Draft',
      raw: payload,
    }
    setRows(prev => [newRow, ...prev])
    setShowNewCps(false)
    setPage(1)
  }

  // Optional submit handler (Submit from modal)
  function handleSubmitNewCps(payload) {
    // for now treat submit same as save but set status Submitted
    const newRow = {
      cpsNo: payload.cpsNo || '',
      refCpsNo: payload.refCpsNo || '',
      dpiNo: payload.dpiNo || '',
      issuedDate: payload.issueDate || '',
      effectiveDate: payload.effectiveDate || '',
      cfcPjt: payload.cfcPjtCode || '',
      model: payload.model || '',
      parts: payload.packing?.innerRows || [],
      fromUser: '',
      toUser: '',
      status: 'Submitted',
      raw: payload,
    }
    setRows(prev => [newRow, ...prev])
    setShowNewCps(false)
    setPage(1)
  }

  // Handler for picking a person
  function handlePersonPicked(person) {
    if (personPickerTarget === 'from') setFromUser(person.name)
    else if (personPickerTarget === 'to') setToUser(person.name)
    setShowPersonPicker(false)
  }

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        {/* header */}
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>CPS List</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-sm btn-outline-secondary mr-1" onClick={handleUpload} title="Upload">
              <i className="fas fa-cloud-upload-alt" /> Upload
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary mr-2" onClick={handleTemplate} title="Template">
              <i className="fas fa-cloud-download-alt" /> Template
            </button>
            <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleCreateCps}>
              <i className="fas fa-file mr-1" /> Create CPS
            </button>
            <button type="button" className="btn btn-sm btn-primary" onClick={handleCreatePsi}>
              <i className="fas fa-file-alt mr-1" /> Create PSI
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Filters using two-column layout */}
          <div className="row">
            {/* Left column (col-md-6) */}
            <div className="col-12 col-md-6">
              <div className="form-row">
                <div className="form-group col-12">
                  <label className="small mb-1">CPS No</label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={cpsNo} onChange={e => setCpsNo(e.target.value)} placeholder="CPS No" />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-secondary btn-sm" title="Search CPS No" onClick={() => alert('Search CPS No placeholder')}>
                        <i className="fas fa-search" />
                      </button>
                    </div>
                  </div>
                </div>

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
                  <label className="small mb-1">From</label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={fromUser} onChange={e => setFromUser(e.target.value)} placeholder="From user" />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        title="People picker"
                        onClick={() => { setPersonPickerTarget('from'); setShowPersonPicker(true) }}
                      >
                        <i className="fas fa-users" />
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

            {/* Right column (col-md-6) */}
            <div className="col-12 col-md-6">
              <div className="form-row">
                <div className="form-group col-12">
                  <label className="small mb-1">Ref CPS No</label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={refCpsNo} onChange={e => setRefCpsNo(e.target.value)} placeholder="Ref CPS No" />
                    <div className="input-group-append">
                      <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Ref CPS No" onClick={() => alert('Search Ref CPS No placeholder')}>
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
                  <label className="small mb-1">Status</label>
                  <div className="input-group input-group-sm">
                    <select className="form-control form-control-sm" value={status} onChange={e => setStatus(e.target.value)}>
                      <option value="Any">Any</option>
                      <option value="Draft">Draft</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Approved">Approved</option>
                    </select>
                  </div>
                </div>

                <div className="form-group col-12">
                  <label className="small mb-1">To</label>
                  <div className="input-group input-group-sm">
                    <input className="form-control form-control-sm" value={toUser} onChange={e => setToUser(e.target.value)} placeholder="To user" />
                    <div className="input-group-append">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        title="People picker"
                        onClick={() => { setPersonPickerTarget('to'); setShowPersonPicker(true) }}
                      >
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
            <table className="table table-striped table-sm mb-0">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>No</th>
                  <th>CPS No.</th>
                  <th>Ref CPS No.</th>
                  <th>DPI No</th>
                  <th>Issued Date</th>
                  <th>Effective Date</th>
                  <th>CFC / Pjt</th>
                  <th>Model</th>
                  <th># Parts</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th style={{ width: 120 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan="13" className="text-center py-4 text-muted">No Data Found</td>
                  </tr>
                ) : (
                  visibleRows.map((r, i) => (
                    <tr key={i}>
                      <td>{(page - 1) * perPage + i + 1}</td>
                      <td>{r.cpsNo}</td>
                      <td>{r.refCpsNo}</td>
                      <td>{r.dpiNo}</td>
                      <td>{r.issuedDate}</td>
                      <td>{r.effectiveDate}</td>
                      <td>{r.cfcPjt}</td>
                      <td>{r.model}</td>
                      <td>{Array.isArray(r.parts) ? r.parts.length : (r.numParts ?? 0)}</td>
                      <td>{r.fromUser}</td>
                      <td>{r.toUser}</td>
                      <td>{r.status}</td>
                      <td>
                        <button type="button" className="btn btn-sm btn-outline-primary mr-1" onClick={() => alert('View placeholder')}>
                          <i className="fas fa-eye" />
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => alert('Delete placeholder')}>
                          <i className="fas fa-trash" />
                        </button>
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

      {/* New CPS Modal */}
      <NewCpsModal
        show={showNewCps}
        onClose={() => setShowNewCps(false)}
        onSave={handleSaveNewCps}
        onSubmit={handleSubmitNewCps}
      />

      {/* Person Picker Modal */}
      {showPersonPicker && (
        <PersonPickerModal
          show={showPersonPicker}
          onClose={() => setShowPersonPicker(false)}
          onSelect={handlePersonPicked}
        />
      )}
    </div>
  )
}
