import React from 'react';

export default function SearchSection({
  filters,
  setters,
  statuses,
  toggleStatus,
  onSearch,
  onClear,
  STATUS_OPTIONS
}) {
  const {
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
  } = filters;

  const {
    setDpiNo,
    setRefDpiNo,
    setModel,
    setCfcPjt,
    setFromUser,
    setToUser,
    setIssuedFrom,
    setIssuedTo,
    setEffectiveFrom,
    setEffectiveTo,
  } = setters;

  return (
    <div className="card-body">
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
            <button type="button" className="btn btn-sm btn-primary mr-2" onClick={onSearch}>
              <i className="fas fa-search mr-1" /> Search
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClear}>
              <i className="fas fa-times mr-1" /> Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}