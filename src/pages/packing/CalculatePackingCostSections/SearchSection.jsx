import React from 'react';

/**
 * SearchSection component for filtering packing cost calculations.
 *
 * @param {object} props - The props for the component.
 * @param {string} props.calCode - The packing cost calculation code.
 * @param {function} props.setCalCode - Function to set the packing cost calculation code.
 * @param {string} props.period - The selected period.
 * @param {function} props.setPeriod - Function to set the period.
 * @param {string} props.destCode - The destination code.
 * @param {function} props.setDestCode - Function to set the destination code.
 * @param {string} props.modelCode - The model code.
 * @param {function} props.setModelCode - Function to set the model code.
 * @param {string} props.type - The calculation type ('All', 'PxP', 'Lot').
 * @param {function} props.setType - Function to set the calculation type.
 * @param {function} props.handleFilter - Function to apply the filters.
 * @param {function} props.handleClear - Function to clear the filters.
 * @returns {JSX.Element} The rendered search section.
 */
export default function SearchSection({
  calCode, setCalCode,
  period, setPeriod,
  destCode, setDestCode,
  modelCode, setModelCode,
  type, setType,
  handleFilter, handleClear
}) {
  return (
    <div className="card-body">
      {/* Filter form */}
      <form onSubmit={handleFilter} className="mb-3">
        <div className="row">
          {/* Left column for inputs */}
          <div className="col-12 col-md-6">
            <div className="form-row">
              {/* Pack Cost Cal Code input */}
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

              {/* Destination Code dropdown */}
              <div className="form-group col-12">
                <label className="small mb-1">Dest Code</label>
                <select className="form-control form-control-sm" value={destCode} onChange={e => setDestCode(e.target.value)}>
                  <option value="All">All</option>
                  <option value="024W">024W</option>
                  <option value="ARG">ARG</option>
                </select>
              </div>

              {/* Type radio buttons */}
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

          {/* Right column for inputs */}
          <div className="col-12 col-md-6">
            <div className="form-row">
              {/* Period dropdown */}
              <div className="form-group col-12">
                <label className="small mb-1">Period</label>
                <select className="form-control form-control-sm" value={period} onChange={e => setPeriod(e.target.value)}>
                  <option>All</option>
                  <option>01.2025</option>
                  <option>02.2025</option>
                  <option>03.2025</option>
                </select>
              </div>

              {/* Model Code input */}
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

      {/* Action buttons */}
      <div className="d-flex justify-content-end mb-3">
        <button type="button" className="btn btn-sm btn-primary mr-2" onClick={handleFilter}>
          <i className="fas fa-search mr-1" /> Filter
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleClear}>
          <i className="fas fa-times mr-1" /> Clear
        </button>
      </div>
    </div>
  );
}