import React from 'react';

export default function LogisticSection(props) {
  const {
    config,
    logisticOpen,
    setLogisticOpen,
    tmmindDestDockCode,
    setTmmindDestDockCode,
    logisticRemark,
    setLogisticRemark,
    processType,
    setProcessType,
    addressRack,
    setAddressRack,
  } = props;

  return (
    <div className="mb-3">
      <button
        type="button"
        className="btn btn-sm btn-link p-0 section-header"
        onClick={() => setLogisticOpen((v) => !v)}
        aria-expanded={logisticOpen}
        aria-controls="logisticSection"
      >
        <strong>
          <i className={`fas ${logisticOpen ? "fa-chevron-down" : "fa-chevron-right"} mr-2`} />
          Logistic Information
        </strong>
      </button>
      {logisticOpen && (
        <div id="logisticSection" className="mt-2">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="small mb-1">TMMIN Dest Dock Code</label>
              <div className="input-group">
                <input
                  className="form-control form-control-sm"
                  value={tmmindDestDockCode}
                  onChange={e => setTmmindDestDockCode(e.target.value)}
                  disabled={!config.editable}
                  placeholder="Dock Code"
                />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary btn-sm" title="Search">
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label className="small mb-1">Address Rack</label>
              <input
                className="form-control form-control-sm"
                value={addressRack}
                onChange={e => setAddressRack(e.target.value)}
                disabled={!config.editable}
                placeholder="Address Rack"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="small mb-1">Remark</label>
            <textarea
              className="form-control form-control-sm"
              rows={3}
              value={logisticRemark}
              onChange={e => setLogisticRemark(e.target.value)}
              disabled={!config.editable}
              placeholder="Remark"
            />
          </div>
          <div className="form-group">
            <label className="small mb-1">Process Type</label>
            <div>
              {["N", "W", "X", "Y"].map((type) => (
                <label key={type} className="mr-3">
                  <input
                    type="radio"
                    name="processType"
                    value={type}
                    checked={processType === type}
                    onChange={() => setProcessType(type)}
                    disabled={!config.editable}
                  />{" "}
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}