import React from 'react';

/**
 * Search section for the Packing Cost New Modal.
 * Contains input fields for filtering and actions like calculate and clear.
 *
 * @param {object} props - Component props.
 * @param {object} props.form - The state of the form from the parent component.
 * @param {function} props.change - Handler for input changes.
 * @param {function} props.setShowPartPicker - Function to show the part picker modal.
 * @param {function} props.setShowModelPicker - Function to show the model picker modal.
 * @param {function} props.handleCalculate - Handler for the calculate button.
 * @param {function} props.handleClear - Handler for the clear button.
 * @param {function} props.onModelRemove - Handler to remove a model pill.
 * @param {function} props.onPartRemove - Handler to remove a part pill.
 * @param {function} props.onModelCfcKeyDown - Keydown handler for model cfc input.
 * @param {function} props.onPartKeyDown - Keydown handler for part input.
 */
export default function SearchSection({ form, change, setShowPartPicker, setShowModelPicker, handleCalculate, handleClear, onModelRemove, onPartRemove, onModelCfcKeyDown, onPartKeyDown }) {
  return (
    <>
      {/* Header form with input fields */}
      <div className="row">
        {/* Left column */}
        <div className="col-md-6">
          {/* Model CFC input with pills */}
          <div className="form-group">
            <label>Model CFC</label>
            <div className="input-group input-group-sm">
              <div className="form-control form-control-sm" style={{ height: 'auto', display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
                {/* Display selected model cfcs as pills */}
                {form.modelCfc.map(cfc => (
                  <span key={cfc} className="badge badge-pill badge-info" style={{ display: 'flex', alignItems: 'center' }}>
                    {cfc}
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      style={{ color: 'white', marginLeft: '5px', textShadow: 'none', opacity: 0.7, fontSize: '1.2em', lineHeight: '0.8' }}
                      onClick={() => onModelRemove(cfc)}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </span>
                ))}
                {/* Input for typing new model cfcs */}
                <input
                  type="text"
                  name="modelCfcInput"
                  value={form.modelCfcInput}
                  onChange={change}
                  onKeyDown={onModelCfcKeyDown}
                  style={{ border: 'none', outline: 'none', flexGrow: 1, padding: 0, margin: 0, height: '20px' }}
                />
              </div>
              <div className="input-group-append">
                <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Model CFC" onClick={() => setShowModelPicker(true)}>
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
          </div>
          {/* Implementation Period dropdown */}
          <div className="form-group">
            <label>Implementation Period</label>
            <select className="form-control form-control-sm" name="period" value={form.period} onChange={change}>
              <option>All</option>
              <option>01.2025</option>
              <option>02.2025</option>
            </select>
          </div>
        </div>

        {/* Right column */}
        <div className="col-md-6">
          {/* Destination Code dropdown */}
          <div className="form-group">
            <label>Dest Code</label>
            <select className="form-control form-control-sm" name="destCode" value={form.destCode} onChange={change}>
              <option>All</option>
              <option value="TASA">TASA - Argentina</option>
            </select>
          </div>
          {/* Part input with pills */}
          <div className="form-group">
            <label>Part</label>
            <div className="input-group input-group-sm">
              <div className="form-control form-control-sm" style={{ height: 'auto', display: 'flex', flexWrap: 'wrap', gap: '5px', alignItems: 'center' }}>
                {/* Display selected part numbers as pills */}
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
                {/* Input for typing new part numbers */}
                <input
                  type="text"
                  name="partInput"
                  value={form.partInput}
                  onChange={change}
                  onKeyDown={onPartKeyDown}
                  style={{ border: 'none', outline: 'none', flexGrow: 1, padding: 0, margin: 0, height: '20px' }}
                />
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

      {/* Action buttons row */}
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