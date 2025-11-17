import React from 'react';

export default function SearchSection({ form, change, setShowPartPicker, handleDeleteSelectedParts, visibleParts }) {
  return (
    <>
      {/* Header form */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Pack Cost Cal Code</label>
            <div className="input-group input-group-sm">
              <input className="form-control form-control-sm" name="calCode" value={form.calCode} onChange={change} />
            </div>
          </div>
          <div className="form-group">
            <label>Period</label>
            <select className="form-control form-control-sm" name="period" value={form.period} onChange={change}>
              <option>All</option>
              <option>01.2025</option>
              <option>02.2025</option>
            </select>
          </div>

          <div className="form-group">
            <label>Type</label>
            <div>
              <label className="mr-2">
                <input type="radio" name="type" value="PxP" checked={form.type === "PxP"} onChange={(e) => change({ target: { name: 'type', value: e.target.value }})} /> PxP
              </label>
              <label>
                <input type="radio" name="type" value="Lot" checked={form.type === "Lot"} onChange={(e) => change({ target: { name: 'type', value: e.target.value }})} /> Lot
              </label>
            </div>
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
            <label>Model Code</label>
            <div className="input-group input-group-sm">
              <input className="form-control form-control-sm" name="modelCode" value={form.modelCode} onChange={change} />
            </div>
          </div>
        </div>
      </div>

      {/* Action row */}
      <div className="d-flex align-items-center justify-content-between my-2">
        <div>
          <button type="button" className="btn btn-sm btn-primary mr-2" onClick={() => setShowPartPicker(true)}>
            <i className="fas fa-plus mr-1" /> Add Part
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={handleDeleteSelectedParts}
            disabled={visibleParts.length === 0}
          >
            <i className="fas fa-trash mr-1" /> Delete Part
          </button>
        </div>
      </div>
    </>
  );
}