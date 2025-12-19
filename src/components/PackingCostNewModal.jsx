// src/components/PackingCostNewModal.jsx
import React, { useState, useEffect } from "react";
import PartPickerModal from "./PartPickerModal";
import ModelPickerModal from "./ModelPickerModal";
import DestCodePickerModal from './DestCodePickerModal';
import SearchSection from "./PackingCostNewModalSections/SearchSection";
import ResultSection from "./PackingCostNewModalSections/ResultSection";
import Pagination from "./PackingCostNewModalSections/Pagination";

const emptyForm = {
  part: [],
  partInput: "",
  period: "All",
  destCode: [],
  modelCfc: [],
  modelCfcInput: "",
  type: "PxP",
};

/**
 * Modal for creating a new Packing Cost Calculation.
 * Manages state for the form, parts, and interactions within the modal.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {function} props.onClose - Callback to close the modal.
 * @param {function} props.onSave - Callback to save the data.
 */
export default function PackingCostNewModal({ show = false, onClose, onSave }) {
  // State for the main form inputs
  const [form, setForm] = useState(emptyForm);
  // State for the parts displayed in the result table
  const [parts, setParts] = useState([]);
  // State for parts selected from the picker, before being "calculated"
  const [stagedParts, setStagedParts] = useState([]);
  // State for pagination: items per page
  const [perPage, setPerPage] = useState(5);
  // State for pagination: current page
  const [page, setPage] = useState(1);
  // State to control the visibility of the Part Picker Modal
  const [showPartPicker, setShowPartPicker] = useState(false);
  // State to control the visibility of the Model Picker Modal
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [showDestCodePicker, setShowDestCodePicker] = useState(false);
  // State for remarks on each part row
  const [remarks, setRemarks] = useState({});
  // State to track selected rows in the result table
  const [selectedRows, setSelectedRows] = useState({});
  // State to track expanded rows in the result table
  const [expandedRows, setExpandedRows] = useState({});
  const [cpsData, setCpsData] = useState([]);

  // Effect to handle modal visibility changes
  useEffect(() => {
    if (show) {
      // Reset state when modal is opened
      setForm(emptyForm);
      setParts([]);
      setStagedParts([]);
      setPage(1);
      setExpandedRows({});
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    // Cleanup effect
    return () => document.body.classList.remove("modal-open");
  }, [show]);

  useEffect(() => {
    const dataUrl = `${import.meta.env.BASE_URL}generatedData.json`;
    fetch(dataUrl)
      .then(response => response.json())
      .then(data => {
        setCpsData(data.cpsData);
      })
      .catch((error) => console.error("Error loading generated data:", error));
  }, []);

  // Do not render if not visible
  if (!show) return null;

  /**
   * Handles changes in form input fields.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} e - The change event.
   */
  function change(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  /**
   * Handles the 'keydown' event for the model cfc input.
   * Converts typed text into a model cfc pill when the space key is pressed.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   */
  function handleModelCfcKeyDown(e) {
    if (e.key === " " && form.modelCfcInput.trim()) {
      e.preventDefault();
      const newModelCfc = form.modelCfcInput.trim();
      setForm((prev) => {
        // Avoid adding duplicate model cfcs
        if (prev.modelCfc.includes(newModelCfc)) {
          return { ...prev, modelCfcInput: "" };
        }
        return {
          ...prev,
          modelCfc: [...prev.modelCfc, newModelCfc],
          modelCfcInput: "",
        };
      });
    }
  }

  /**
   * Handles the 'keydown' event for the part input.
   * Converts typed text into a part number pill when the space key is pressed.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   */
  function handlePartKeyDown(e) {
    if (e.key === " " && form.partInput.trim()) {
      e.preventDefault();
      const newPartNo = form.partInput.trim();

      // Add to form's part array for display as a pill
      setForm((prev) => {
        if (prev.part.includes(newPartNo)) {
          return { ...prev, partInput: "" };
        }
        return {
          ...prev,
          part: [...prev.part, newPartNo],
          partInput: "",
        };
      });

      // Add to staged parts for later calculation
      setStagedParts((prev) => {
        const exists = prev.some((p) => p.partNo === newPartNo);
        if (exists) {
          return prev;
        }
        // Create a part object, not just a string
        return [...prev, { partNo: newPartNo }];
      });
    }
  }

  function handlePartInputBlur() {
    addPart();
  }

  /**
   * Handles the calculation process when the "Calculate" button is clicked.
   * It takes the parts that have been staged (e.g., from the part picker or manual input),
   * finds their corresponding data in the asynchronously loaded `cpsData`,
   * formats the data for display in the results table, and updates the component's state.
   */
  const norm = (v) => String(v ?? "").trim().toUpperCase();

const handleCalculate = () => {
  // flow sama seperti versi lama: stagedParts -> search cpsData
  if (!cpsData || cpsData.length === 0) {
    console.error("CPS data is not loaded yet.");
    setParts([]); // biar jelas kosong
    return;
  }

  // Filter by Model CFC if provided (pakai norm biar tidak miss)
  let dataToSearch = cpsData;
  if (form.modelCfc?.length > 0) {
    const allowed = new Set(form.modelCfc.map(norm));
    dataToSearch = cpsData.filter((cps) => allowed.has(norm(cps.model_cfc)));
  }

  let calculatedParts = [];

  // CASE 1: ada stagedParts
  if (stagedParts?.length > 0) {
    console.info(stagedParts)
    console.info(dataToSearch)
    calculatedParts = stagedParts.flatMap((sp) => {
      const spPartNo = norm(sp.partNo);

      // cari di cpsData (norm part_no)
      const matchingData = dataToSearch.filter((cps) => {
        const cpsPartNo = norm(cps.part_no ?? cps.partNo);
        return cpsPartNo === spPartNo;
      });

      // kalau ketemu, pakai CPS sebagai source-of-truth
      if (matchingData.length > 0) {
        return matchingData.map((row) => mapCpsToRow(row, sp));
      }

      // kalau tidak ketemu CPS, baru fallback:
      // - kalau sp dari picker, tampilkan data picker supaya user tetap lihat sesuatu
      const isFromPicker = !!sp.partName;
      if (isFromPicker) {
        return [{
          ...sp,
          partNo: sp.partNo,
          parentNo: sp.parentPartNo ?? sp.parentNo ?? "",
          supplierCode: sp.supplierCode ?? sp.supplierId ?? "",
          calculationTime: new Date().toISOString(),
        }];
      }
      // manual tapi tidak ketemu
      return [{
        partNo: sp.partNo,
        description: "NOT FOUND",
        calculationTime: new Date().toISOString(),
      }];
    });
  }
  // CASE 2: tidak ada stagedParts, tapi ada modelCfc => tampilkan semua hasil filter
  else if (form.modelCfc?.length > 0) {
    calculatedParts = dataToSearch.map(mapCpsToRow);
  }

  setParts(calculatedParts);
};

function toDiffStr(diff) {
  if (diff == null) return "0%";
  if (typeof diff === "string") return diff.includes("%") ? diff : `${diff}%`;
  const n = Number(diff);
  return Number.isFinite(n) ? `${n}%` : "0%";
}

function mapCpsToRow(cpsRow, stagedPart) {
  const subtotals = cpsRow?.subtotals || {};
  const packing = cpsRow?.cps?.packing || {};

  // dimensi: utamakan stagedPart, fallback ke cpsRow kalau suatu saat ada
  const L = stagedPart?.L ?? cpsRow?.L ?? "";
  const W = stagedPart?.W ?? cpsRow?.W ?? "";
  const H = stagedPart?.H ?? cpsRow?.H ?? "";
  const boxM3 = stagedPart?.boxM3 ?? cpsRow?.boxM3 ?? "";

  return {
    // identitas part
    partNo: cpsRow?.part_no ?? cpsRow?.partNo ?? stagedPart?.partNo ?? "",
    suffix: stagedPart?.suffix ?? "",
    partName: cpsRow?.cps?.part_name ?? cpsRow?.partName ?? stagedPart?.partName ?? "N/A",
    parentPartNo: stagedPart?.parentPartNo ?? "",
    parentNo: cpsRow?.parentNo ?? stagedPart?.parentNo ?? "",

    supplierCode: cpsRow?.supplierCode ?? stagedPart?.supplierId ?? "",
    supplierName: cpsRow?.supplierName ?? stagedPart?.supplierName ?? "",

    // dimensi yang Anda butuhkan di table
    L,
    W,
    H,
    boxM3,

    cpsNo: cpsRow?.cpsNo ?? cpsRow?.cps?.cps_no ?? "",
    calculationTime: new Date().toISOString(),

    inner: {
      totalCost: subtotals.inner?.total ?? 0,
      prevYear: subtotals.inner?.prev_year ?? 0,
      diff: toDiffStr(subtotals.inner?.diff),
      materials: packing.inner ?? [],
    },
    outer: {
      totalCost: subtotals.outer?.total ?? 0,
      prevYear: subtotals.outer?.prev_year ?? 0,
      diff: toDiffStr(subtotals.outer?.diff),
      materials: packing.outer ?? [],
    },
    material: {
      totalCost: subtotals.material?.total ?? 0,
      prevYear: subtotals.material?.prev_year ?? 0,
      diff: toDiffStr(subtotals.material?.diff),
    },
    labor: {
      totalCost: subtotals.labor?.total ?? 0,
      prevYear: subtotals.labor?.prev_year ?? 0,
      diff: toDiffStr(subtotals.labor?.diff),
      // jika ResultSection butuh detail labor dari stagedPart, Anda bisa merge di sini juga
      ...(stagedPart?.labor ? { ...stagedPart.labor } : {}),
    },
    inland: {
      totalCost: subtotals.inland?.total ?? 0,
      prevYear: subtotals.inland?.prev_year ?? 0,
      diff: toDiffStr(subtotals.inland?.diff),
      ...(stagedPart?.inland ? { ...stagedPart.inland } : {}),
    },
    total: {
      totalCost: subtotals.total?.total ?? 0,
      prevYear: subtotals.total?.prev_year ?? 0,
      diff: toDiffStr(subtotals.total?.diff),
    },

    cps: cpsRow?.cps,
    subtotals: cpsRow?.subtotals,
  };
}


  /**
   * Clears the form and all part lists.
   */
  function handleClear() {
    setForm(emptyForm);
    setParts([]);
    setStagedParts([]);
  }

  /**
   * Handles models selected from the ModelPickerModal.
   * @param {Array<object>} models - The array of selected model objects.
   */
  function handleModelsPicked(models) {
    if (Array.isArray(models) && models.length > 0) {
      const newModelCfcs = models.map((m) => m.cfc);
      setForm((prev) => {
        const existingModelCfcs = prev.modelCfc || [];
        // Filter out duplicates
        const uniqueNewCfcs = newModelCfcs.filter((cfc) => !existingModelCfcs.includes(cfc));
        return {
          ...prev,
          modelCfc: [...existingModelCfcs, ...uniqueNewCfcs],
          modelCfcInput: "", // Clear input on pick
        };
      });
    }
    setShowModelPicker(false);
  }

  function handleDestCodesPicked(destCodes) {
    if (Array.isArray(destCodes) && destCodes.length > 0) {
      const newDestCodes = destCodes.map(d => d.destCode);
      setForm(prev => {
        const existingDestCodes = prev.destCode || [];
        const uniqueNewDestCodes = newDestCodes.filter(code => !existingDestCodes.includes(code));
        return { ...prev, destCode: [...existingDestCodes, ...uniqueNewDestCodes] };
      });
    }
    setShowDestCodePicker(false);
  }

  /**
   * Removes a model cfc from the form.
   * @param {string} modelCfcToRemove - The model cfc to remove.
   */
  function handleModelRemove(modelCfcToRemove) {
    setForm((prev) => ({
      ...prev,
      modelCfc: prev.modelCfc.filter((cfc) => cfc !== modelCfcToRemove),
    }));
  }

  function handleDestCodeRemove(destCodeToRemove) {
    setForm(prev => ({
      ...prev,
      destCode: prev.destCode.filter(code => code !== destCodeToRemove),
    }));
  }

  /**
   * Prepares and sends the final data payload for saving.
   */
  function handleSave() {
    const payload = { ...form, parts };
    onSave && onSave(payload);
  }

  /**
   * Closes the modal.
   */
  function handleCancel() {
    onClose && onClose();
  }

  /**
   * Handles parts selected from the PartPickerModal.
   * @param {Array<object>} selected - The array of selected part objects.
   */
  function handlePartsPicked(selected) {
    if (!Array.isArray(selected) || selected.length === 0) {
      setShowPartPicker(false);
      return;
    }
    // Map selected data to the structure needed for the results table
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
      inner: {
        totalCost: p.innerTotal ?? 0,
        prevYear: p.prevYear ?? 0,
        diff: p.diffPerc ?? "0%",
        materials: p.innerMaterials || [],
      },
      outer: {
        totalCost: p.outerTotal ?? 0,
        prevYear: p.prevYear ?? 0,
        diff: p.diffPerc ?? "0%",
        materials: p.outerMaterials || [],
      },
      material: {
        totalCost: p.materialTotal ?? 0,
        prevYear: p.prevYear ?? 0,
        diff: p.diffPerc ?? "0%",
      },
      labor: {
        totalCost: p.laborTotal ?? 20,
        prevYear: p.prevYear ?? 0,
        diff: p.diffPerc ?? "0%",
        manHour: p.laborManHour ?? 1.5,
        cost: p.laborCost ?? 25,
        receiving: 0.1,
        inspection: 0.2,
        deliveryCourse: 0.1,
        supply: 0.1,
        binding: 0.1,
        sortingSupply: 0.2,
        pickPacking: 0.3,
        vanning: 0.2,
        boxValetReturn: 0.1,
        mixVan: 0.1,
        lashing: 0.1,
        totalTime: 1.5,
        requirement: 1,
        currentDL: 1,
        idl: 0,
        facilityOthers: 0,
      },
      inland: {
        totalCost: p.inlandTotal ?? 30,
        prevYear: p.prevYear ?? 0,
        diff: p.diffPerc ?? "0%",
        cost: p.inlandCost ?? 35,
        packTime: p.inlandPackTime ?? '10:00',
        inlandCost: p.inlandInlandCost ?? 40,
        inlandCostM3: p.inlandInlandCostM3 ?? 5,
        milkrunCost: p.inlandMilkrunCost ?? 15,
      },
      total: { totalCost: p.totalCost ?? 0, prevYear: p.prevYear ?? 0, diff: p.diffPerc ?? "0%" },
    }));

    // Add new unique parts to the staged list
    setStagedParts((prev) => {
      const existingPartNos = prev.map(p => p.partNo);
      const uniqueNewParts = mapped.filter(p => !existingPartNos.includes(p.partNo));
      return [...prev, ...uniqueNewParts];
    });

    // Add new unique part numbers to the form for pill display
    const newPartNos = mapped.map(p => p.partNo);
    setForm(prevForm => {
        const existingPartNos = prevForm.part || [];
        const uniqueNewPartNos = newPartNos.filter(code => !existingPartNos.includes(code));
        return { ...prevForm, part: [...existingPartNos, ...uniqueNewPartNos] };
    });

    setShowPartPicker(false);
  }
  /**
   * Removes a part from both the form and the staged parts list.
   * @param {string} partNoToRemove - The part number to remove.
   */
  function handlePartRemove(partNoToRemove) {
    setForm((prev) => ({
      ...prev,
      part: prev.part.filter((partNo) => partNo !== partNoToRemove),
    }));
    setStagedParts((prev) => prev.filter((p) => p.partNo !== partNoToRemove));
  }

  // Pagination logic
  const total = parts.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  function goToPage(p) {
    setPage(Math.min(Math.max(1, p), totalPages));
  }
  const visibleParts = parts.slice((page - 1) * perPage, page * perPage);

  /**
   * Updates the remark for a specific part.
   * @param {number} index - The global index of the part.
   * @param {string} value - The new remark text.
   */
  function handleRemarkChange(index, value) {
    setRemarks((prev) => ({ ...prev, [index]: value }));
  }

  /**
   * Updates the state of selected rows.
   * @param {object} newSelectedRows - The new object of selected rows.
   */
  function handleCheckboxChange(newSelectedRows) {
    setSelectedRows(newSelectedRows);
  }

  /**
   * Toggles the expanded state of a row.
   * @param {number} index - The index of the row to toggle.
   */
  function handleToggleExpand(index) {
    setExpandedRows((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  /**
   * Deletes all currently selected parts from the results table.
   */
  function handleDeleteSelectedParts() {
    const toDelete = Object.keys(selectedRows)
      .filter(idx => selectedRows[idx])
      .map(idx => Number(idx));
    if (toDelete.length === 0) return;

    const remainingParts = parts.filter((_, idx) => !toDelete.includes(idx));
    setParts(remainingParts);

    const remainingStaged = stagedParts.filter(sp => remainingParts.some(rp => rp.partNo === sp.partNo));
    setStagedParts(remainingStaged);

    const partNosToKeep = new Set(remainingParts.map(p => p.partNo));
    setForm(prev => ({
      ...prev,
      part: prev.part.filter(pn => partNosToKeep.has(pn)),
    }));

    setSelectedRows({});
  }

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      aria-labelledby="packingCostNewModalLabel"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="packingCostNewModalLabel">
              Packing Cost Calculation New
            </h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={handleCancel}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <SearchSection
              form={form}
              change={change}
              handlePartKeyDown={handlePartKeyDown}
              handlePartRemove={handlePartRemove}
              handleModelCfcKeyDown={handleModelCfcKeyDown}
              handleModelRemove={handleModelRemove}
              handleDestCodeRemove={handleDestCodeRemove}
              setShowPartPicker={setShowPartPicker}
              setShowModelPicker={setShowModelPicker}
              setShowDestCodePicker={setShowDestCodePicker}
              handleCalculate={handleCalculate}
              handleClear={handleClear}
              handlePartInputBlur={handlePartInputBlur}
            />

            <ResultSection
              visibleParts={visibleParts}
              selectedRows={selectedRows}
              handleCheckboxChange={handleCheckboxChange}
              page={page}
              perPage={perPage}
              remarks={remarks}
              handleRemarkChange={handleRemarkChange}
              expandedRows={expandedRows}
              handleToggleExpand={handleToggleExpand}
            />
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            goToPage={goToPage}
            perPage={perPage}
            setPerPage={setPerPage}
            total={total}
          />

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <PartPickerModal
        show={showPartPicker}
        onClose={() => setShowPartPicker(false)}
        onPick={handlePartsPicked}
      />

      <ModelPickerModal
        show={showModelPicker}
        onClose={() => setShowModelPicker(false)}
        onPick={handleModelsPicked}
      />

      <DestCodePickerModal
        show={showDestCodePicker}
        onClose={() => setShowDestCodePicker(false)}
        onPick={handleDestCodesPicked}
        initialSelected={form.destCode}
      />
    </div>
  );
}