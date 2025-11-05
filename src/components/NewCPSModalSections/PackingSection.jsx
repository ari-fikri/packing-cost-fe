import React from "react";

export default function PackingSection(props) {
  // Destructure props as needed
  const {
    packingOpen,
    setPackingOpen,
    outerModuleType,
    setOuterModuleType,
    outerDimension,
    setOuterDimension,
    innerVolume,
    setInnerVolume,
    outerVolume,
    setOuterVolume,
    innerRows,
    setInnerRows,
    newInner,
    setNewInner,
    handleAddInnerRow,
    handleRemoveInnerRow,
  } = props;

  const [showNewInnerRow, setShowNewInnerRow] = React.useState(false);

  return (
    <div>
      {/* Packing outer summary (collapsible) - simpler static table preserved */}
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => setPackingOpen((v) => !v)}
          aria-expanded={packingOpen}
          aria-controls="packingSection"
        >
          <strong>
            <i
              className={`fas ${
                packingOpen ? "fa-chevron-down" : "fa-chevron-right"
              } mr-2`}
            />
            Packing
          </strong>
        </button>
        {packingOpen && (
          <div id="packingSection">
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="small">Module Type (Outer)</label>
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-sm"
                    value={outerModuleType}
                    onChange={(e) => setOuterModuleType(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => alert("Search module type placeholder")}
                    >
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>

                <div className="form-row mt-2">
                  <div className="col">
                    <label className="small">Dimension (cm)</label>
                    <div className="d-flex">
                      <input
                        className="form-control form-control-sm"
                        value={outerDimension.L}
                        onChange={(e) =>
                          setOuterDimension((d) => ({
                            ...d,
                            L: e.target.value,
                          }))
                        }
                        placeholder="L"
                      />
                      <input
                        className="form-control form-control-sm mx-1"
                        value={outerDimension.W}
                        onChange={(e) =>
                          setOuterDimension((d) => ({
                            ...d,
                            W: e.target.value,
                          }))
                        }
                        placeholder="W"
                      />
                      <input
                        className="form-control form-control-sm"
                        value={outerDimension.H}
                        onChange={(e) =>
                          setOuterDimension((d) => ({
                            ...d,
                            H: e.target.value,
                          }))
                        }
                        placeholder="H"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row mt-2">
                  <div className="col">
                    <label className="small">Inner (m³)</label>
                    <input
                      className="form-control form-control-sm"
                      value={innerVolume}
                      onChange={(e) => setInnerVolume(e.target.value)}
                    />
                  </div>
                  <div className="col">
                    <label className="small">Outer (m³)</label>
                    <input
                      className="form-control form-control-sm"
                      value={outerVolume}
                      onChange={(e) => setOuterVolume(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Inner pack materials table in a new row, full width (kept simple) */}
            <div className="row mt-3">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <label className="small mb-1">INNER (Pack Material)</label>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setShowNewInnerRow(true)}
                      disabled={showNewInnerRow}
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="table-responsive mt-2">
                  <table className="table table-sm table-bordered mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: 40 }}>No</th>
                        <th>Pack Material No</th>
                        <th>Suffix</th>
                        <th>Name</th>
                        <th>Supplier</th>
                        <th>L</th>
                        <th>W</th>
                        <th>H</th>
                        <th>Wt/PC</th>
                        <th>Qty</th>
                        <th>Total Wt</th>
                        <th style={{ width: 80 }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {innerRows.length === 0 && !showNewInnerRow ? (
                        <tr>
                          <td
                            colSpan="12"
                            className="text-center text-muted py-3"
                          >
                            No Data Found
                          </td>
                        </tr>
                      ) : (
                        innerRows.map((r, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{r.materialNo}</td>
                            <td>{r.suffix}</td>
                            <td>{r.name}</td>
                            <td>{r.supplierName}</td>
                            <td>{r.L}</td>
                            <td>{r.W}</td>
                            <td>{r.H}</td>
                            <td>{r.wtPerPc}</td>
                            <td>{r.qty}</td>
                            <td>
                              {(
                                Number(r.wtPerPc || 0) * Number(r.qty || 0)
                              ).toFixed(2)}
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleRemoveInnerRow(i)}
                              >
                                <i className="fas fa-trash" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                      {showNewInnerRow && (
                        <tr>
                          <td>+</td>
                          <td>
                            <div className="input-group input-group-sm">
                              <input
                                className="form-control form-control-sm"
                                value={newInner.materialNo}
                                onChange={(e) =>
                                  setNewInner((n) => ({
                                    ...n,
                                    materialNo: e.target.value,
                                  }))
                                }
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-secondary btn-sm"
                                  type="button"
                                  onClick={() => alert("...")}
                                >
                                  ...
                                </button>
                              </div>
                            </div>
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={newInner.suffix}
                              onChange={(e) =>
                                setNewInner((n) => ({
                                  ...n,
                                  suffix: e.target.value,
                                }))
                              }
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={newInner.name}
                              onChange={(e) =>
                                setNewInner((n) => ({
                                  ...n,
                                  name: e.target.value,
                                }))
                              }
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={newInner.supplierName}
                              onChange={(e) =>
                                setNewInner((n) => ({
                                  ...n,
                                  supplierName: e.target.value,
                                }))
                              }
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={newInner.L}
                              onChange={(e) =>
                                setNewInner((n) => ({ ...n, L: e.target.value }))
                              }
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={newInner.W}
                              onChange={(e) =>
                                setNewInner((n) => ({ ...n, W: e.target.value }))
                              }
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={newInner.H}
                              onChange={(e) =>
                                setNewInner((n) => ({ ...n, H: e.target.value }))
                              }
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={newInner.wtPerPc}
                              onChange={(e) =>
                                setNewInner((n) => ({
                                  ...n,
                                  wtPerPc: e.target.value,
                                }))
                              }
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={newInner.qty}
                              onChange={(e) =>
                                setNewInner((n) => ({
                                  ...n,
                                  qty: e.target.value,
                                }))
                              }
                            />
                          </td>
                          <td>-</td>
                          <td>
                            <div className="btn-group">
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={handleAddInnerRow}
                              >
                                Add
                              </button>
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => {
                                  setNewInner({
                                    materialNo: "",
                                    suffix: "",
                                    name: "",
                                    parent: "",
                                    supplierId: "",
                                    supplierName: "",
                                    L: "",
                                    W: "",
                                    H: "",
                                    wtPerPc: "",
                                    qty: "",
                                  });
                                  setShowNewInnerRow(false);
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}