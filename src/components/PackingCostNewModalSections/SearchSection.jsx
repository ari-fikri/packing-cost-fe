import React from 'react';

export default function SearchSection({ form, change, setShowPartPicker, setShowModelPicker, handleCalculate, handleClear }) {
  return (
    <>
      {/* Header form */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Model Code</label>
            <div className="input-group input-group-sm">
              <input className="form-control form-control-sm" name="modelCode" value={form.modelCode} onChange={change} />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Model Code" onClick={() => setShowModelPicker(true)}>
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Implementation Period</label>
            <select className="form-control form-control-sm" name="period" value={form.period} onChange={change}>
              <option>All</option>
              <option>01.2025</option>
              <option>02.2025</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label>Dest Code</label>
            <select className="form-control form-control-sm" name="destCode" value={form.destCode} onChange={change}>
              <option>All</option>
              <option value="TASA">TASA - Argentina</option>
            </select>
          </div>
          <div className="form-group">
            <label>Part</label>
            <div className="input-group input-group-sm">
              <input className="form-control form-control-sm" name="part" value={form.part} onChange={change} />
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Part" onClick={() => setShowPartPicker(true)}>
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action row */}
      <div className="d-flex justify-content-end my-2">
        <button type="button" className="btn btn-sm btn-primary mr-2" onClick={handleCalculate}>
          <i className="fas fa-calculator mr-1" /> Calculate
        </button>
        <button type="button" className="btn btn-sm btn-secondary" onClick={handleClear}>
          <i className="fas fa-eraser mr-1" /> Clear
        </button>
      </div>
    </>
  );
}