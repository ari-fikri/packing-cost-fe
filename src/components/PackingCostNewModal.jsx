// src/components/PackingCostNewModal.jsx
import React, { useState, useEffect } from "react";

// PackingCostNewModal — blank-slate initial view matching the provided salt design
// Props: show (bool), onClose(), onSave(payload)
export default function PackingCostNewModal({ show = false, onClose, onSave }) {
  const emptyForm = {
    calCode: "",
    period: "All",
    destCode: "All",
    modelCode: "",
    type: "PxP",
  };

  const [form, setForm] = useState(emptyForm);
  const [parts, setParts] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (show) {
      setForm(emptyForm);
      setParts([]);
      setPage(1);
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => document.body.classList.remove("modal-open");
  }, [show]);

  if (!show) return null;

  function change(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleAddPart() {
    // placeholder: will open part picker or add blank row in future
    setParts((prev) => [
      ...prev,
      {
        partNo: "",
        suffix: "",
        partName: "",
        parent: "",
        supplierId: "",
        supplierName: "",
        L: "",
        W: "",
        H: "",
        boxM3: "",
        totalCost: "",
      },
    ]);
    setPage(1);
  }

  function handleSave() {
    const payload = { ...form, parts };
    onSave && onSave(payload);
  }

  function handleCancel() {
    onClose && onClose();
  }

  const total = parts.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  function goToPage(p) {
    setPage(Math.min(Math.max(1, p), totalPages));
  }
  const visibleParts = parts.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        style={{ paddingRight: 0 }}
      >
        <div className="modal-dialog modal-fullscreen" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <strong>Packing Cost Calculation New</strong>
              </h5>
              <button
                type="button"
                className="close"
                onClick={handleCancel}
                aria-label="Close"
              >
                <span aria-hidden>×</span>
              </button>
            </div>

            <div className="modal-body">
              {/* Header form in two columns */}
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Pack Cost Cal Code</label>
                    <div className="input-group input-group-sm">
                      <input
                        className="form-control form-control-sm"
                        name="calCode"
                        value={form.calCode}
                        onChange={change}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                        >
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Period</label>
                    <select
                      className="form-control form-control-sm"
                      name="period"
                      value={form.period}
                      onChange={change}
                    >
                      <option>All</option>
                      <option>01.2025</option>
                      <option>02.2025</option>
                    </select>
                  </div>

                  {/* keep Type here (only one copy) */}
                  <div className="form-group">
                    <label>Type</label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="type_pxp"
                          name="type"
                          value="PxP"
                          checked={form.type === "PxP"}
                          onChange={(e) =>
                            setForm((s) => ({ ...s, type: e.target.value }))
                          }
                        />
                        <label
                          className="form-check-label ml-2"
                          htmlFor="type_pxp"
                        >
                          PxP
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          id="type_lot"
                          name="type"
                          value="Lot"
                          checked={form.type === "Lot"}
                          onChange={(e) =>
                            setForm((s) => ({ ...s, type: e.target.value }))
                          }
                        />
                        <label
                          className="form-check-label ml-2"
                          htmlFor="type_lot"
                        >
                          Lot
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Dest Code</label>
                    <select
                      className="form-control form-control-sm"
                      name="destCode"
                      value={form.destCode}
                      onChange={change}
                    >
                      <option>All</option>
                      <option value="TASA">TASA - Argentina</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Model Code</label>
                    <div className="input-group input-group-sm">
                      <input
                        className="form-control form-control-sm"
                        name="modelCode"
                        value={form.modelCode}
                        onChange={change}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                        >
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="d-flex align-items-center justify-content-between my-2">
                <div>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary mr-2"
                    onClick={handleAddPart}
                  >
                    <i className="fas fa-plus mr-1" /> Add Part
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary mr-2"
                  >
                    <i className="fas fa-cloud-upload-alt mr-1" /> Upload
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    <i className="fas fa-cloud-download-alt mr-1" /> Part
                    Template
                  </button>
                </div>
              </div>

              {/* Parts table (blank-slate) */}
              <div className="table-responsive">
                <table className="table table-bordered table-sm text-center w-100">
                  <thead>
                    <tr style={{ backgroundColor: "#d0d0d0" }}>
                      <th rowSpan={2}>Part No</th>
                      <th rowSpan={2}>Suffix</th>
                      <th rowSpan={2}>Part Name</th>
                      <th rowSpan={2}>Parent Part No</th>
                      <th rowSpan={2}>Supplier ID</th>
                      <th rowSpan={2}>Supplier Name</th>
                      <th rowSpan={2}>L</th>
                      <th rowSpan={2}>W</th>
                      <th rowSpan={2}>H</th>
                      <th rowSpan={2}>Box M3</th>
                      <th colSpan={3}>INNER</th>
                      <th colSpan={3}>OUTER</th>
                      <th colSpan={3}>MATERIAL</th>
                      <th colSpan={3}>LABOR</th>
                      <th colSpan={3}>INLAND</th>
                      <th colSpan={3}>TOTAL</th>
                    </tr>
                    <tr style={{ backgroundColor: "#efefef" }}>
                      <th>Total Cost</th>
                      <th>Prev Year</th>
                      <th>Diff</th>
                      <th>Total Cost</th>
                      <th>Prev Year</th>
                      <th>Diff</th>
                      <th>Total Cost</th>
                      <th>Prev Year</th>
                      <th>Diff</th>
                      <th>Total Cost</th>
                      <th>Prev Year</th>
                      <th>Diff</th>
                      <th>Total Cost</th>
                      <th>Prev Year</th>
                      <th>Diff</th>
                      <th>Total Cost</th>
                      <th>Prev Year</th>
                      <th>Diff</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={28} className="text-center">
                        No Data Found
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              <div className="d-flex align-items-center justify-content-between mt-2">
                <div>
                  <button
                    type="button"
                    className="btn btn-sm btn-light mr-1"
                    onClick={() => goToPage(1)}
                  >
                    {"<<"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-light mr-1"
                    onClick={() => goToPage(Math.max(1, page - 1))}
                  >
                    {"<"}
                  </button>
                  {[...Array(totalPages).keys()].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`btn btn-sm mr-1 ${page === n + 1 ? "btn-primary" : "btn-light"
                        }`}
                      onClick={() => goToPage(n + 1)}
                    >
                      {n + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-light ml-2"
                    onClick={() => goToPage(Math.min(totalPages, page + 1))}
                  >
                    {">"}
                  </button>
                </div>

                <div className="form-inline small">
                  <span className="mr-3">5 per page</span>
                </div>
              </div>
            </div>

            <div className="modal-footer d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-success mr-2"
                onClick={handleSave}
              >
                <i className="fas fa-download mr-1" /> Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                <i className="fas fa-times mr-1" /> Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" />
    </>
  );
}
