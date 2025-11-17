// src/components/PackingCostNewModal.jsx
import React, { useState, useEffect } from "react";
import PartPickerModal from "./PartPickerModal";
import ModelPickerModal from "./ModelPickerModal";
import SearchSection from "./PackingCostNewModalSections/SearchSection";
import ResultSection from "./PackingCostNewModalSections/ResultSection";
import Pagination from "./PackingCostNewModalSections/Pagination";

const emptyForm = {
  part: "",
  period: "All",
  destCode: "All",
  modelCode: [],
  type: "PxP",
};

export default function PackingCostNewModal({ show = false, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [parts, setParts] = useState([]);
  const [perPage, setPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [showPartPicker, setShowPartPicker] = useState(false);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [remarks, setRemarks] = useState({});
  const [selectedRows, setSelectedRows] = useState({});

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

  function handleCalculate() {
    // Placeholder for calculation logic
    alert("Calculate button clicked!");
  }

  function handleClear() {
    setForm(emptyForm);
  }

  function handleModelsPicked(models) {
    if (Array.isArray(models) && models.length > 0) {
      const newModelCodes = models.map((m) => m.code);
      setForm((prev) => {
        const existingModelCodes = prev.modelCode || [];
        const uniqueNewCodes = newModelCodes.filter((code) => !existingModelCodes.includes(code));
        return { ...prev, modelCode: [...existingModelCodes, ...uniqueNewCodes] };
      });
    }
    setShowModelPicker(false);
  }

  function handleModelRemove(modelCodeToRemove) {
    setForm((prev) => ({
      ...prev,
      modelCode: prev.modelCode.filter((code) => code !== modelCodeToRemove),
    }));
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

  const total = parts.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  function goToPage(p) {
    setPage(Math.min(Math.max(1, p), totalPages));
  }
  const visibleParts = parts.slice((page - 1) * perPage, page * perPage);

  function handleRemarkChange(index, value) {
    setRemarks((prev) => ({ ...prev, [index]: value }));
  }

  function handleCheckboxChange(newSelectedRows) {
    setSelectedRows(newSelectedRows);
  }

  function handleDeleteSelectedParts() {
    const toDelete = Object.keys(selectedRows)
      .filter(idx => selectedRows[idx])
      .map(idx => Number(idx));
    if (toDelete.length === 0) return;
    
    const newParts = parts.filter((_, i) => !toDelete.includes(i));
    setParts(newParts);

    const newSelectedRows = {};
    const newRemarks = {};
    
    // Adjust selected rows and remarks indices
    const remainingParts = parts.map((part, i) => (toDelete.includes(i) ? null : part)).filter(Boolean);
    
    remainingParts.forEach((part, i) => {
        const oldIndex = parts.indexOf(part);
        if (selectedRows[oldIndex]) {
            newSelectedRows[i] = true;
        }
        if (remarks[oldIndex]) {
            newRemarks[i] = remarks[oldIndex];
        }
    });

    setSelectedRows(newSelectedRows);
    setRemarks(newRemarks);
  }

  return (
    <>
      <div className="np-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) handleCancel() }}>
        <div className="np-modal card card-outline card-primary" style={{ maxWidth: '95vw', maxHeight: '90vh', width: '95vw', height: '90vh' }}>
            <div className="card-header">
              <h5 className="card-title mb-0"><strong>Packing Cost Calculation New</strong></h5>
              <button type="button" className="close" onClick={handleCancel} aria-label="Close"><span aria-hidden>×</span></button>
            </div>

            <div className="card-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
              <SearchSection
                form={form}
                change={change}
                setShowPartPicker={setShowPartPicker}
                setShowModelPicker={setShowModelPicker}
                handleCalculate={handleCalculate}
                handleClear={handleClear}
                onModelRemove={handleModelRemove}
              />

              <ResultSection
                visibleParts={visibleParts}
                selectedRows={selectedRows}
                handleCheckboxChange={handleCheckboxChange}
                page={page}
                perPage={perPage}
                remarks={remarks}
                handleRemarkChange={handleRemarkChange}
              />

              <Pagination 
                page={page}
                totalPages={totalPages}
                goToPage={goToPage}
                perPage={perPage}
              />
            </div>

            <div className="card-footer d-flex justify-content-end">
              <button type="button" className="btn btn-success mr-2" onClick={handleSave}>
                <i className="fas fa-download mr-1" /> Save
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                <i className="fas fa-times mr-1" /> Cancel
              </button>
            </div>
          </div>
        </div>

      {showPartPicker && (
        <PartPickerModal 
          show={showPartPicker} 
          onClose={() => setShowPartPicker(false)} 
          onSelect={handlePartsPicked} 
        />
      )}

      {showModelPicker && (
        <ModelPickerModal
          show={showModelPicker}
          onClose={() => setShowModelPicker(false)}
          onAdd={handleModelsPicked}
          selectionMode="multi"
        />
      )}
    </>
  );
}