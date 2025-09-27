import React from "react";

export default function GeneralInfoSection(props) {
  // Destructure props as needed
  const {
    cpsNo,
    setCpsNo,
    refCpsNo,
    setRefCpsNo,
    issueDate,
    setIssueDate,
    effectiveDate,
    setEffectiveDate,
    dpiNo,
    setDpiNo,
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
    setPartPickerOpen,
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
                <b>CPS No.</b>
              </label>
              <input
                className="form-control form-control-sm"
                value={cpsNo}
                onChange={(e) => setCpsNo(e.target.value)}
                placeholder="CPSxxxx..."
              />
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">
                <b>DPI No.</b>
              </label>
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-sm"
                  value={dpiNo}
                  onChange={(e) => setDpiNo(e.target.value)}
                />
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    title="Search DPI"
                    onClick={() => alert("Search DPI placeholder")}
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">
                <b>Model</b>
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
                    onClick={() => alert("Search Model placeholder")}
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
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    title="Search Part"
                    onClick={() => setPartPickerOpen(true)}
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

            <div className="form-group col-12">
              <label className="small mb-1">
                <b>Issued Date</b>
              </label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
              />
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">
                <b>Effective Date</b>
              </label>
              <input
                type="date"
                className="form-control form-control-sm"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
              />
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
                <b>CFC / PJT Code</b>
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
                onChange={(e) => setPartName(e.target.value)}
              />
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">
                <b>Supplier</b>
              </label>
              <input
                className="form-control form-control-sm"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </div>

            <div className="form-group col-6">
              <label className="small mb-1">Plant Code</label>
              <input
                className="form-control form-control-sm"
                value={plantCode}
                onChange={(e) => setPlantCode(e.target.value)}
              />
            </div>
            <div className="form-group col-6">
              <label className="small mb-1">Dock Code</label>
              <input
                className="form-control form-control-sm"
                value={dockCode}
                onChange={(e) => setDockCode(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
