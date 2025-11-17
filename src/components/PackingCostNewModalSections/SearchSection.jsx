import React from 'react';

export default function SearchSection({ form, change, setShowPartPicker, setShowModelPicker, handleCalculate, handleClear, onModelRemove, onPartRemove }) {
  return (
    <>
      {/* Header form */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Model Code</label>
            <div className="input-group input-group-sm">
              <div className="form-control form-control-sm" style={{ height: 'auto', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {form.modelCode.map(code => (
                  <span key={code} className="badge badge-pill badge-info" style={{ display: 'flex', alignItems: 'center' }}>
                    {code}
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      style={{ color: 'white', marginLeft: '5px', textShadow: 'none', opacity: 0.7, fontSize: '1.2em', lineHeight: '0.8' }}
                      onClick={() => onModelRemove(code)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </span>
                ))}
              </div>
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
              <div className="form-control form-control-sm" style={{ height: 'auto', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {Array.isArray(form.part) && form.part.map(partNo => (
                  <span key={partNo} className="badge badge-pill badge-info" style={{ display: 'flex', alignItems: 'center' }}>
                    {partNo}
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      style={{ color: 'white', marginLeft: '5px', textShadow: 'none', opacity: 0.7, fontSize: '1.2em', lineHeight: '0.8' }}
                      onClick={() => onPartRemove(partNo)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </span>
                ))}
              </div>
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