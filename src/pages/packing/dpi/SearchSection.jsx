import React from 'react';

export default function SearchSection({
  filters,
  setters,
  onSearch,
  onClear,
}) {
  const {
    modelCode,
    destCode,
    partNo,
    supplierCode,
    cpsNo,
    implementationPeriod,
  } = filters;

  const {
    setModelCode,
    setDestCode,
    setPartNo,
    setSupplierCode,
    setCpsNo,
    setImplementationPeriod,
  } = setters;

  return (
    <div className="card-body">
      <div className="row">
        {/* Left column */}
        <div className="col-12 col-md-6">
          <div className="form-row">
            <div className="form-group col-12">
              <label className="small mb-1">Model Code</label>
              <div className="input-group input-group-sm">
                <input className="form-control form-control-sm" value={modelCode} onChange={e => setModelCode(e.target.value)} placeholder="Model Code" />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Model Code" onClick={() => alert('Search Model Code placeholder')}>
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">Implementation Period</label>
              <div className="input-group input-group-sm">
                <input className="form-control form-control-sm" value={implementationPeriod} onChange={e => setImplementationPeriod(e.target.value)} placeholder="Implementation Period" />
              </div>
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">Part No</label>
              <div className="input-group input-group-sm">
                <input className="form-control form-control-sm" value={partNo} onChange={e => setPartNo(e.target.value)} placeholder="Part No" />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Part No" onClick={() => alert('Search Part No placeholder')}>
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right column */}
        <div className="col-12 col-md-6">
          <div className="form-row">
            <div className="form-group col-12">
              <label className="small mb-1">Dest Code</label>
              <div className="input-group input-group-sm">
                <input className="form-control form-control-sm" value={destCode} onChange={e => setDestCode(e.target.value)} placeholder="Dest Code" />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Dest Code" onClick={() => alert('Search Dest Code placeholder')}>
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>

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
              <label className="small mb-1">Supplier Code</label>
              <div className="input-group input-group-sm">
                <input className="form-control form-control-sm" value={supplierCode} onChange={e => setSupplierCode(e.target.value)} placeholder="Supplier Code" />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Supplier" onClick={() => alert('Search Supplier placeholder')}>
                    <i className="fas fa-search" />
                  </button>
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