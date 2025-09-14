// src/components/PackingCostNewModal.jsx
import React, { useState, useEffect } from "react";
import PartPickerModal from "./PartPickerModal";
import PartsTableRow from "../pages/packing/PartsTableRow";

const emptyForm = {
  calCode: "",
  period: "All",
  destCode: "All",
  modelCode: "",
  type: "PxP",
};

export default function PackingCostNewModal({ show = false, onClose, onSave }) {
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
      supplierId: p.supplierName ? (p.supplierId || p.supplierCode || "") : "",
      supplierName: p.supplierName,
      L: p.L || "",
      W: p.W || "",
      H: p.H || "",
      boxM3: p.boxM3 || "",
      inner: { totalCost: p.innerTotal ?? 0, prevYear: p.prevYear ?? 0, diff: p.diffPerc ?? "0%" },
      outer: { totalCost: p.outerTotal ?? 0, prevYear: p.prevYear ?? 0, diff: p.diffPerc ?? "0%" },
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

  const distributeAcross = (value, buckets = 10) => {
    const val = Number(value) || 0;
    const base = Math.floor(val / buckets);
    const remainder = val - base * buckets;
    return Array.from({ length: buckets }).map((_, i) => base + (i === 0 ? remainder : 0));
  };

  const fmt = (v) => (v === null || v === undefined ? "" : String(v));

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true" style={{ paddingRight: 0 }}>
        <div className="modal-dialog modal-fullscreen" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"><strong>Packing Cost Calculation New</strong></h5>
              <button type="button" className="close" onClick={handleCancel} aria-label="Close"><span aria-hidden>×</span></button>
            </div>

            <div className="modal-body" style={{ maxHeight: "78vh", overflowY: "auto" }}>
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
                        <input type="radio" name="type" value="PxP" checked={form.type === "PxP"} onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))} /> PxP
                      </label>
                      <label>
                        <input type="radio" name="type" value="Lot" checked={form.type === "Lot"} onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))} /> Lot
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
                </div>
              </div>

              {/* Parts table */}
              <div className="table-responsive">
                <table className="table table-bordered table-sm text-center w-100">
                  <thead>
                    <tr style={{ backgroundColor: "#d0d0d0" }}>
                      <th rowSpan={2} style={{ width: 40 }}></th>
                      <th rowSpan={2} style={{ width: 40 }}>No</th>
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
                        <td colSpan={30} className="text-center py-4 text-muted">No Data Found</td>
                      </tr>
                    ) : (
                      visibleParts.map((p, i) => {
                        const globalIndex = (page - 1) * perPage + i;
                        const isExpanded = expandedRows.has(globalIndex);

                        return (
                          <PartsTableRow
                            key={globalIndex}
                            index={globalIndex}
                            part={p}
                            isExpanded={isExpanded}
                            onToggleExpand={toggleExpand}
                            distributeAcross={distributeAcross}
                          />
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* pagination */}
              <div className="d-flex align-items-center justify-content-between mt-2">
                <div>
                  <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(1)}>{"<<"}</button>
                  <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(Math.max(1, page - 1))}>{"<"}</button>
                  {[...Array(totalPages).keys()].map((n) => (
                    <button key={n} type="button" className={`btn btn-sm mr-1 ${page === n + 1 ? "btn-primary" : "btn-light"}`} onClick={() => goToPage(n + 1)}>{n + 1}</button>
                  ))}
                  <button type="button" className="btn btn-sm btn-light ml-2" onClick={() => goToPage(Math.min(totalPages, page + 1))}>{">"}</button>
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
