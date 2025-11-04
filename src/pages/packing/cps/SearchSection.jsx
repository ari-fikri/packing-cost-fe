import React from 'react';

export default function SearchSection({
  filters,
  setters,
  onSearch,
  onClear,
  onPersonPicker,
}) {
  const {
    cpsNo,
    refCpsNo,
    model,
    cfcPjt,
    fromUser,
    toUser,
    issuedFrom,
    issuedTo,
    effectiveFrom,
    effectiveTo,
    status,
  } = filters;

  const {
    setCpsNo,
    setRefCpsNo,
    setModel,
    setCfcPjt,
    setFromUser,
    setToUser,
    setIssuedFrom,
    setIssuedTo,
    setEffectiveFrom,
    setEffectiveTo,
    setStatus,
  } = setters;

  return (
    <div className="row">
      {/* Left column */}
      <div className="col-12 col-md-6">
        <div className="form-row">
          <div className="form-group col-12">
            <label className="small mb-1">CPS No</label>
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-sm"
                value={cpsNo}
                onChange={(e) => setCpsNo(e.target.value)}
                placeholder="CPS No"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  title="Search CPS No"
                  onClick={() => alert('Search CPS No placeholder')}
                >
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </div>

          <div className="form-group col-12">
            <label className="small mb-1">Model</label>
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-sm"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Model"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  title="Search Model"
                  onClick={() => alert('Search Model placeholder')}
                >
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </div>

          <div className="form-group col-12">
            <label className="small mb-1">From</label>
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-sm"
                value={fromUser}
                onChange={(e) => setFromUser(e.target.value)}
                placeholder="From user"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  title="People picker"
                  onClick={() => onPersonPicker('from')}
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
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={issuedFrom}
                  onChange={(e) => setIssuedFrom(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={issuedTo}
                  onChange={(e) => setIssuedTo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="col-12 col-md-6">
        <div className="form-row">
          <div className="form-group col-12">
            <label className="small mb-1">Ref CPS No</label>
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-sm"
                value={refCpsNo}
                onChange={(e) => setRefCpsNo(e.target.value)}
                placeholder="Ref CPS No"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  title="Search Ref CPS No"
                  onClick={() => alert('Search Ref CPS No placeholder')}
                >
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </div>

          <div className="form-group col-12">
            <label className="small mb-1">CFC / Pjt</label>
            <div className="input-group input-group-sm">
              <input
                className="form-control form-control-sm"
                value={cfcPjt}
                onChange={(e) => setCfcPjt(e.target.value)}
                placeholder="CFC / Project"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  title="Search CFC/Pjt"
                  onClick={() => alert('Search CFC/Pjt placeholder')}
                >
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </div>

          <div className="form-group col-12">
            <label className="small mb-1">Status</label>
            <div className="input-group input-group-sm">
              <select
                className="form-control form-control-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
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
              <input
                className="form-control form-control-sm"
                value={toUser}
                onChange={(e) => setToUser(e.target.value)}
                placeholder="To user"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  title="People picker"
                  onClick={() => onPersonPicker('to')}
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
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={effectiveFrom}
                  onChange={(e) => setEffectiveFrom(e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="date"
                  className="form-control form-control-sm"
                  value={effectiveTo}
                  onChange={(e) => setEffectiveTo(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="col-12 d-flex">
        <div className="col-md-6" />
        <div className="col-md-6 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-sm btn-primary mr-2"
            onClick={onSearch}
          >
            <i className="fas fa-search mr-1" /> Search
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={onClear}
          >
            <i className="fas fa-times mr-1" /> Clear
          </button>
        </div>
      </div>
    </div>
  );
}