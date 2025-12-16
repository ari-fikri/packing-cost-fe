import React from "react";

export default function GeneralInfoSection(props) {
  // Destructure props as needed
  const {
    config,
    cpsNo,
    setCpsNo,
    refCpsNo,
    setRefCpsNo,
    cfcPjtCode,
    setCfcPjtCode,
    model,
    setModel,
    partNo,
    setPartNo,
    partName,
    setPartName,
    supplier,
    setSupplier,
    plantCode,
    setPlantCode,
    dockCode,
    setDockCode,
    openPartPicker,
    openModelPicker,
    setComparisonOpen,
  } = props;

  return (
    <div>
      {/* Your General Info JSX form fields here */}
      {/* Example: */}
      {/* Top grid */}
      <div className="row">
        <div className="col-md-6">
          <div className="form-row">
            <div className="form-group col-12">
              <label className="small mb-1">
                <b>CPS/PSI/ECI No.</b>
              </label>
              <input
                className="form-control form-control-sm"
                value={cpsNo}
                onChange={(e) => setCpsNo(e.target.value)}
                disabled={!config.editable}
                placeholder="CPSxxxx..."
              />
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">
                <b>CFC/Model</b>
              </label>
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-sm"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={openModelPicker}
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">
                <b>Part No</b>
              </label>
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-sm"
                  value={partNo}
                  onChange={(e) => setPartNo(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    id="partPickerBtn"
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    title="Search Part"
                    onClick={openPartPicker}
                  >
                    <i className="fas fa-search" />
                  </button>

                  {/* Compare button next to search */}
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    title="Compare"
                    style={{ marginLeft: 6 }}
                    onClick={() => setComparisonOpen(true)}
                  >
                    Compare
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right top */}
        <div className="col-md-6">
          <div className="form-row">
            <div className="form-group col-12">
              <label className="small mb-1">
                <b>Ref CPS No.</b>
              </label>
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-sm"
                  value={refCpsNo}
                  onChange={(e) => setRefCpsNo(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    title="Search Ref CPS"
                    onClick={() => alert("Search Ref CPS placeholder")}
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">
                <b>Project Code</b>
              </label>
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-sm"
                  value={cfcPjtCode}
                  onChange={(e) => setCfcPjtCode(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => alert("Search CFC/PJT placeholder")}
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">
                <b>Part Name</b>
              </label>
              <input
                className="form-control form-control-sm"
                value={partName}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-4">
          <label className="small mb-1">
            <b>Supplier</b>
          </label>
          <input
            className="form-control form-control-sm"
            value={supplier}
            readOnly
          />
        </div>

        <div className="form-group col-md-4">
          <label className="small mb-1">Plant Code</label>
          <input
            className="form-control form-control-sm"
            value={plantCode}
            readOnly
          />
        </div>
        <div className="form-group col-md-4">
          <label className="small mb-1">Dock Code</label>
          <input
            className="form-control form-control-sm"
            value={dockCode}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}