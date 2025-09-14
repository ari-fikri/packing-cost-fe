// src/components/PackingCostNewModal.jsx
import React, { useState, useEffect } from "react";
import PartPickerModal from "./PartPickerModal";

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
  const [showPartPicker, setShowPartPicker] = useState(false);
  const [expandedRows, setExpandedRows] = useState(new Set());

  useEffect(() => {
    if (show) {
      setForm(emptyForm);
      setParts([]);
      setPage(1);
      setExpandedRows(new Set());
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

  function handleSave() {
    const payload = { ...form, parts };
    onSave && onSave(payload);
  }

  function handleCancel() {
    onClose && onClose();
  }

  // Called when PartPicker returns selected parts
  function handlePartsPicked(selected) {
    if (!Array.isArray(selected) || selected.length === 0) {
      setShowPartPicker(false);
      return;
    }
    const mapped = selected.map((p) => ({
      partNo: p.partNo,
      suffix: "",
      partName: p.partName,
      parentPartNo: p.parentPartNo || p.parent || "",
      supplierId: p.supplierId || "",
      supplierName: p.supplierName || "",
      L: p.L || "",
      W: p.W || "",
      H: p.H || "",
      boxM3: p.boxM3 || "",
      inner: { totalCost: p.innerTotal ?? 0, prevYear: p.prevYear ?? 0, diff: p.diffPerc ?? "0%" },
      outer: { totalCost: p.outerTotal ?? 0, prevYear: p.prevYear ?? 0, diff: p.diffPerc ?? "0%" },
      // material subtable removed, but keep a main-table material total if desired:
      material: { totalCost: p.materialTotal ?? 0, prevYear: p.prevYear ?? 0, diff: p.diffPerc ?? "0%" },
      labor: { totalCost: p.laborTotal ?? 0, prevYear: p.prevYear ?? 0, diff: p.diffPerc ?? "0%" },
      inland: { totalCost: p.inlandTotal ?? 0, prevYear: p.prevYear ?? 0, diff: p.diffPerc ?? "0%" },
      total: { totalCost: p.totalCost ?? 0, prevYear: p.prevYear ?? 0, diff: p.diffPerc ?? "0%" },
    }));

    setParts((prev) => [...prev, ...mapped]);
    setShowPartPicker(false);
    setPage(1);
  }

  function toggleExpand(rowIndex) {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(rowIndex)) next.delete(rowIndex);
      else next.add(rowIndex);
      return next;
    });
  }

  const total = parts.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  function goToPage(p) {
    setPage(Math.min(Math.max(1, p), totalPages));
  }
  const visibleParts = parts.slice((page - 1) * perPage, page * perPage);

  // Helpers
  const distributeAcross = (value, buckets = 10) => {
    const val = Number(value) || 0;
    const base = Math.floor(val / buckets);
    const remainder = val - base * buckets;
    return Array.from({ length: buckets }).map((_, i) => base + (i === 0 ? remainder : 0));
  };

  const fmt = (v) => (v === null || v === undefined ? "" : String(v));

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
              {/* Header form */}
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

                  <div className="form-group">
                    <label>Type</label>
                    <div>
                      <label className="mr-2">
                        <input
                          type="radio"
                          name="type"
                          value="PxP"
                          checked={form.type === "PxP"}
                          onChange={(e) =>
                            setForm((s) => ({ ...s, type: e.target.value }))
                          }
                        />{" "}
                        PxP
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="type"
                          value="Lot"
                          checked={form.type === "Lot"}
                          onChange={(e) =>
                            setForm((s) => ({ ...s, type: e.target.value }))
                          }
                        />{" "}
                        Lot
                      </label>
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
                    onClick={() => setShowPartPicker(true)}
                  >
                    <i className="fas fa-plus mr-1" /> Add Part
                  </button>
                </div>
              </div>

              {/* Parts table */}
              <div className="table-responsive">
                <table className="table table-bordered table-sm text-center w-100">
                  <thead>
                    <tr style={{ backgroundColor: "#d0d0d0" }}>
                      <th rowSpan={2} style={{ width: 40 }}></th>
                      <th rowSpan={2} style={{ width: 40 }}>
                        No
                      </th>
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
                      {[...Array(6)].map((_, i) => (
                        <React.Fragment key={i}>
                          <th>Total Cost</th>
                          <th>Prev Year</th>
                          <th>Diff</th>
                        </React.Fragment>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleParts.length === 0 ? (
                      <tr>
                        <td colSpan={30} className="text-center py-4 text-muted">
                          No Data Found
                        </td>
                      </tr>
                    ) : (
                      visibleParts.map((p, i) => {
                        const globalIndex = (page - 1) * perPage + i;
                        const isExpanded = expandedRows.has(globalIndex);

                        // Prepare distributed arrays for inner/outer (10 materials)
                        const innerArr = distributeAcross(p.inner.totalCost || 0, 10);
                        const outerArr = distributeAcross(p.outer.totalCost || 0, 10);

                        // Simple labor breakdown demo
                        const laborRows = [
                          { label: "Receiving", qty: 1, rate: Math.round((p.labor.totalCost || 0) * 0.4) },
                          { label: "Pick & Pack", qty: 1, rate: Math.round((p.labor.totalCost || 0) * 0.35) },
                          { label: "Vanning", qty: 1, rate: Math.round((p.labor.totalCost || 0) * 0.25) },
                        ];

                        return (
                          <React.Fragment key={globalIndex}>
                            <tr>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-light"
                                  onClick={() => toggleExpand(globalIndex)}
                                  title={isExpanded ? "Collapse" : "Expand"}
                                >
                                  <i className={`fas ${isExpanded ? "fa-chevron-down" : "fa-chevron-right"}`} />
                                </button>
                              </td>

                              <td>{globalIndex + 1}</td>
                              <td>{fmt(p.partNo)}</td>
                              <td>{fmt(p.suffix)}</td>
                              <td className="text-left">{fmt(p.partName)}</td>
                              <td>{fmt(p.parentPartNo)}</td>
                              <td>{fmt(p.supplierId)}</td>
                              <td>{fmt(p.supplierName)}</td>
                              <td>{fmt(p.L)}</td>
                              <td>{fmt(p.W)}</td>
                              <td>{fmt(p.H)}</td>
                              <td>{fmt(p.boxM3)}</td>

                              <td>{fmt(p.inner.totalCost)}</td>
                              <td>{fmt(p.inner.prevYear)}</td>
                              <td>{fmt(p.inner.diff)}</td>

                              <td>{fmt(p.outer.totalCost)}</td>
                              <td>{fmt(p.outer.prevYear)}</td>
                              <td>{fmt(p.outer.diff)}</td>

                              <td>{fmt(p.material.totalCost)}</td>
                              <td>{fmt(p.material.prevYear)}</td>
                              <td>{fmt(p.material.diff)}</td>

                              <td>{fmt(p.labor.totalCost)}</td>
                              <td>{fmt(p.labor.prevYear)}</td>
                              <td>{fmt(p.labor.diff)}</td>

                              <td>{fmt(p.inland.totalCost)}</td>
                              <td>{fmt(p.inland.prevYear)}</td>
                              <td>{fmt(p.inland.diff)}</td>

                              <td>{fmt(p.total.totalCost)}</td>
                              <td>{fmt(p.total.prevYear)}</td>
                              <td>{fmt(p.total.diff)}</td>
                            </tr>

                            {isExpanded && (
                              <tr>
                                <td colSpan={30} className="p-0">
                                  <div className="bg-white border-top p-3">
                                    {/* INNER sub-table */}
                                    <div className="mb-3">
                                      <table className="table table-sm table-bordered mb-1 w-100">
                                        <thead>
                                          <tr style={{ backgroundColor: "#d0d0d0" }}>
                                            <th colSpan={40} className="text-left">
                                              <strong>INNER</strong>
                                            </th>
                                          </tr>

                                          {/* Material 1..10 header */}
                                          <tr style={{ backgroundColor: "#d0d0d0" }}>
                                            {Array.from({ length: 10 }).map((_, m) => (
                                              <th key={m} colSpan={4} className="text-center">
                                                Material {m + 1}
                                              </th>
                                            ))}
                                          </tr>

                                          <tr style={{ backgroundColor: "#efefef" }}>
                                            {Array.from({ length: 10 }).map((_, j) => (
                                              <React.Fragment key={j}>
                                                <th>Part No</th>
                                                <th>Qty</th>
                                                <th>Price</th>
                                                <th>Sum</th>
                                              </React.Fragment>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            {Array.from({ length: 10 }).map((_, m) => {
                                              const price = innerArr[m] || 0;
                                              const qty = 1;
                                              const sum = price * qty;
                                              return (
                                                <React.Fragment key={m}>
                                                  <td className="text-left">{fmt(p.partNo)}</td>
                                                  <td>{qty}</td>
                                                  <td>{price}</td>
                                                  <td>{sum}</td>
                                                </React.Fragment>
                                              );
                                            })}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>

                                    {/* OUTER sub-table */}
                                    <div className="mb-3">
                                      <table className="table table-sm table-bordered mb-1 w-100">
                                        <thead>
                                          <tr style={{ backgroundColor: "#d0d0d0" }}>
                                            <th colSpan={40} className="text-left">
                                              <strong>OUTER</strong>
                                            </th>
                                          </tr>

                                          {/* Material 1..10 header */}
                                          <tr style={{ backgroundColor: "#d0d0d0" }}>
                                            {Array.from({ length: 10 }).map((_, m) => (
                                              <th key={m} colSpan={4} className="text-center">
                                                Material {m + 1}
                                              </th>
                                            ))}
                                          </tr>

                                          <tr style={{ backgroundColor: "#efefef" }}>
                                            {Array.from({ length: 10 }).map((_, j) => (
                                              <React.Fragment key={j}>
                                                <th>Part No</th>
                                                <th>Qty</th>
                                                <th>Price</th>
                                                <th>Sum</th>
                                              </React.Fragment>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            {Array.from({ length: 10 }).map((_, m) => {
                                              const price = outerArr[m] || 0;
                                              const qty = 1;
                                              const sum = price * qty;
                                              return (
                                                <React.Fragment key={m}>
                                                  <td className="text-left">{fmt(p.partNo)}</td>
                                                  <td>{qty}</td>
                                                  <td>{price}</td>
                                                  <td>{sum}</td>
                                                </React.Fragment>
                                              );
                                            })}
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>

                                    {/* LABOR sub-table */}
                                    <div className="mb-3">
                                      <table className="table table-sm table-bordered mb-1 w-100">
                                        <thead>
                                          <tr style={{ backgroundColor: "#d0d0d0" }}>
                                            <th colSpan={20} className="text-left">
                                              <strong>LABOR</strong>
                                            </th>
                                          </tr>
                                          <tr style={{ backgroundColor: "#efefef" }}>
                                            <th>Activity</th>
                                            <th>Qty</th>
                                            <th>Rate</th>
                                            <th>Sum</th>
                                            <th>Requirement</th>
                                            <th>Current</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {(() => {
                                            return [
                                              { label: "Receiving", qty: 1, rate: Math.round((p.labor.totalCost || 0) * 0.4) },
                                              { label: "Pick & Pack", qty: 1, rate: Math.round((p.labor.totalCost || 0) * 0.35) },
                                              { label: "Vanning", qty: 1, rate: Math.round((p.labor.totalCost || 0) * 0.25) },
                                            ].map((lr, idx) => (
                                              <tr key={idx}>
                                                <td className="text-left">{lr.label}</td>
                                                <td>{lr.qty}</td>
                                                <td>{lr.rate}</td>
                                                <td>{lr.rate * lr.qty}</td>
                                                <td>{lr.qty}</td>
                                                <td>{lr.rate}</td>
                                              </tr>
                                            ));
                                          })()}
                                        </tbody>
                                      </table>
                                    </div>

                                    {/* INLAND sub-table */}
                                    <div className="mb-3">
                                      <table className="table table-sm table-bordered mb-1 w-100">
                                        <thead>
                                          <tr style={{ backgroundColor: "#d0d0d0" }}>
                                            <th colSpan={10} className="text-left">
                                              <strong>INLAND</strong>
                                            </th>
                                          </tr>
                                          <tr style={{ backgroundColor: "#efefef" }}>
                                            <th>Item</th>
                                            <th>Value</th>
                                            <th>M3</th>
                                            <th>Diff</th>
                                            <th>Note</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td className="text-left">Pack Time (V-PASS)</td>
                                            <td>{Math.round((p.inland.totalCost || 0) * 0.6)}</td>
                                            <td>{fmt(p.boxM3)}</td>
                                            <td>—</td>
                                            <td />
                                          </tr>
                                          <tr>
                                            <td className="text-left">Inland Cost</td>
                                            <td>{Math.round((p.inland.totalCost || 0) * 0.4)}</td>
                                            <td>{fmt(p.boxM3)}</td>
                                            <td>—</td>
                                            <td />
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>

                                    {/* TOTAL summary */}
                                    <div>
                                      <table className="table table-sm table-bordered mb-0 w-100">
                                        <thead>
                                          <tr style={{ backgroundColor: "#d0d0d0" }}>
                                            <th colSpan={8} className="text-left">
                                              <strong>TOTAL</strong>
                                            </th>
                                          </tr>
                                          <tr style={{ backgroundColor: "#efefef" }}>
                                            <th>Inner</th>
                                            <th>Outer</th>
                                            <th>Material</th>
                                            <th>Labor</th>
                                            <th>Inland</th>
                                            <th>Total Cost</th>
                                            <th>Prev Year</th>
                                            <th>Diff</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>{fmt(p.inner.totalCost)}</td>
                                            <td>{fmt(p.outer.totalCost)}</td>
                                            <td>{fmt(p.material.totalCost)}</td>
                                            <td>{fmt(p.labor.totalCost)}</td>
                                            <td>{fmt(p.inland.totalCost)}</td>
                                            <td>{fmt(p.total.totalCost)}</td>
                                            <td>{fmt(p.total.prevYear)}</td>
                                            <td>{fmt(p.total.diff)}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              <div className="d-flex align-items-center justify-content-between mt-2">
                <div>
                  <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(1)}>
                    {"<<"}
                  </button>
                  <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(Math.max(1, page - 1))}>
                    {"<"}
                  </button>
                  {[...Array(totalPages).keys()].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className={`btn btn-sm mr-1 ${page === n + 1 ? "btn-primary" : "btn-light"}`}
                      onClick={() => goToPage(n + 1)}
                    >
                      {n + 1}
                    </button>
                  ))}
                  <button type="button" className="btn btn-sm btn-light ml-2" onClick={() => goToPage(Math.min(totalPages, page + 1))}>
                    {">"}
                  </button>
                </div>

                <div className="form-inline small">
                  <span className="mr-3">{perPage} per page</span>
                </div>
              </div>
            </div>

            <div className="modal-footer d-flex justify-content-end">
              <button type="button" className="btn btn-success mr-2" onClick={handleSave}>
                <i className="fas fa-download mr-1" /> Save
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                <i className="fas fa-times mr-1" /> Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" />

      <PartPickerModal show={showPartPicker} onClose={() => setShowPartPicker(false)} onSelect={handlePartsPicked} />
    </>
  );
}
