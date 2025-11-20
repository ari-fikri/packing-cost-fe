// src/components/PackingCostNewModal.jsx
import React, { useState, useEffect } from "react";
import PartPickerModal from "./PartPickerModal";
import ModelPickerModal from "./ModelPickerModal";
import SearchSection from "./PackingCostNewModalSections/SearchSection";
import ResultSection from "./PackingCostNewModalSections/ResultSection";
import Pagination from "./PackingCostNewModalSections/Pagination";

const emptyForm = {
  part: [],
  partInput: "",
  period: "All",
  destCode: "All",
  modelCode: [],
  modelCodeInput: "",
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
    import("../data/generatedData.json")
      .then((module) => {
        setCpsData(module.default.cpsData);
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
   * Handles the 'keydown' event for the model code input.
   * Converts typed text into a model code pill when the space key is pressed.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   */
  function handleModelCodeKeyDown(e) {
    if (e.key === " " && form.modelCodeInput.trim()) {
      e.preventDefault();
      const newModelCode = form.modelCodeInput.trim();
      setForm((prev) => {
        // Avoid adding duplicate model codes
        if (prev.modelCode.includes(newModelCode)) {
          return { ...prev, modelCodeInput: "" };
        }
        return {
          ...prev,
          modelCode: [...prev.modelCode, newModelCode],
          modelCodeInput: "",
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

  /**
   * Handles the calculation process when the "Calculate" button is clicked.
   * It takes the parts that have been staged (e.g., from the part picker or manual input),
   * finds their corresponding data in the asynchronously loaded `cpsData`,
   * formats the data for display in the results table, and updates the component's state.
   */
  function handleCalculate() {
    // Check if the CPS data has been loaded. If not, log an error and exit.
    if (cpsData.length === 0) {
      console.error("CPS data is not loaded yet.");
      return;
    }

    // Map over the staged parts to find their corresponding data and format them.
    const calculatedParts = stagedParts
      .map((stagedPart) => {
        // Find the CPS data for the current part number, ensuring cps and cps.part exist.
        const data = cpsData.find(
          (cps) => cps && cps.part && cps.part.part_no === stagedPart.partNo
        );

        // If no data is found for the part, return a default object indicating it was not found.
        if (!data) {
          return {
            partNo: stagedPart.partNo,
            partName: "Part not found in generatedData.json",
            suffix: "",
            parentPartNo: "",
            supplierId: "",
            supplierName: "",
            L: "",
            W: "",
            H: "",
            boxM3: 0,
            inner: { totalCost: 0, prevYear: 0, diff: "0%", materials: [] },
            outer: { totalCost: 0, prevYear: 0, diff: "0%", materials: [] },
            material: { totalCost: 0, prevYear: 0, diff: "0%" },
            labor: {
              totalCost: 0,
              prevYear: 0,
              diff: "0%",
              manHour: 0,
              cost: 0,
              receiving: 0,
              inspection: 0,
              deliveryCourse: 0,
              supply: 0,
              binding: 0,
              sortingSupply: 0,
              pickPacking: 0,
              vanning: 0,
              boxValetReturn: 0,
              mixVan: 0,
              lashing: 0,
              totalTime: 0,
              requirement: 0,
              currentDL: 0,
              idl: 0,
              facilityOthers: 0,
            },
            inland: {
              totalCost: 0,
              prevYear: 0,
              diff: "0%",
              cost: 0,
              packTime: 0,
              inlandCost: 0,
              inlandCostM3: 0,
              milkrunCost: 0,
            },
            total: { totalCost: 0, prevYear: 0, diff: "0%" },
          };
        }

        // Destructure the data from the found CPS entry.
        const {
          cps,
          part,
          supplier,
          subTotalMaterial,
          subTotalLabor,
          subTotalInland,
          subTotal,
          diffPct,
        } = data;
        const { packing, labor, manhour, inland } = cps;

        // Calculate the total man-hour from the manhour object.
        const totalManhour = Object.values(manhour).reduce((a, b) => a + b, 0);

        // Return the formatted part data for the results table.
        return {
          partNo: cps.part_no,
          suffix: cps.suffix,
          partName: cps.part_name,
          parentPartNo: "", // This data is not available in generatedData.json
          supplierId: cps.supplier.code,
          supplierName: cps.supplier.name,
          L: cps.packing.outer.length > 0 ? cps.packing.outer[0].l : "",
          W: cps.packing.outer.length > 0 ? cps.packing.outer[0].w : "",
          H: cps.packing.outer.length > 0 ? cps.packing.outer[0].h : "",
          boxM3: cps.packing.outer.reduce((acc, item) => acc + item.m3, 0),
          inner: {
            totalCost: cps.packing.inner.reduce((acc, item) => acc + item.sum, 0),
            prevYear: 0, // Placeholder
            diff: "0%", // Placeholder
            materials: packing.inner,
          },
          outer: {
            totalCost: cps.packing.outer.reduce((acc, item) => acc + item.sum, 0),
            prevYear: 0, // Placeholder
            diff: "0%", // Placeholder
            materials: cps.packing.outer,
          },
          material: {
            totalCost: cps.subTotalMaterial,
            prevYear: 0, // Placeholder
            diff: "0%", // Placeholder
          },
          labor: {
            totalCost: cps.subTotalLabor,
            prevYear: 0, // Placeholder
            diff: "0%", // Placeholder
            manHour: cps.totalManhour,
            cost: cps.labor.dl + cps.labor.idl,
            receiving: cps.manhour.receiving,
            inspection: cps.manhour.inspection,
            deliveryCourse: cps.manhour.delivery_course,
            supply:
              (cps.manhour.pallet_supply || 0) + (cps.manhour.non_pallet_supply || 0),
            binding: cps.manhour.binding,
            sortingSupply: 0, // Placeholder
            pickPacking: cps.manhour.pick_packing,
            vanning: 0, // Placeholder
            boxValetReturn: cps.manhour.empty_box,
            mixVan: cps.manhour.mix_van,
            lashing: cps.manhour.lashing,
            totalTime: cps.totalManhour,
            requirement: 1, // Placeholder
            currentDL: cps.labor.dl,
            idl: cps.labor.idl,
            facilityOthers: cps.labor.facility,
          },
          inland: {
            totalCost: cps.subTotalInland,
            prevYear: 0, // Placeholder
            diff: "0%", // Placeholder
            cost: cps.inland.inland_cost,
            packTime: cps.inland.packing_time,
            inlandCost: cps.inland.inland_cost,
            inlandCostM3: 0, // Placeholder
            milkrunCost: cps.inland.milkrun_cost,
          },
          total: {
            totalCost: cps.subTotal,
            prevYear: 0, // Placeholder
            diff: cps.diffPct,
          },
        };
      })
      .filter(Boolean); // Filter out any null/undefined entries from parts not found.

    // Get the part numbers of the parts already in the results table.
    const existingPartNos = parts.map((p) => p.partNo);
    // Filter out parts that are already in the table to avoid duplicates.
    const newParts = calculatedParts.filter(
      (p) => !existingPartNos.includes(p.partNo)
    );

    // Add the new, unique parts to the results table.
    setParts((prevParts) => [...prevParts, ...newParts]);
    // Clear the staged parts.
    setStagedParts([]);
    // Reset to the first page of the results table.
    setPage(1);
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
      const newModelCodes = models.map((m) => m.code);
      setForm((prev) => {
        const existingModelCodes = prev.modelCode || [];
        // Filter out duplicates
        const uniqueNewCodes = newModelCodes.filter((code) => !existingModelCodes.includes(code));
        return { ...prev, modelCode: [...existingModelCodes, ...uniqueNewCodes] };
      });
    }
    setShowModelPicker(false);
  }

  /**
   * Removes a model code from the form.
   * @param {string} modelCodeToRemove - The model code to remove.
   */
  function handleModelRemove(modelCodeToRemove) {
    setForm((prev) => ({
      ...prev,
      modelCode: prev.modelCode.filter((code) => code !== modelCodeToRemove),
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
    
    const newParts = parts.filter((_, i) => !toDelete.includes(i));
    setParts(newParts);

    const newSelectedRows = {};
    const newRemarks = {};
    
    // Re-index selected rows and remarks after deletion
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
      {/* Modal backdrop */}
      <div className="np-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) handleCancel() }}>
        {/* Modal dialog */}
        <div className="np-modal card card-outline card-primary" style={{ maxWidth: '95vw', maxHeight: '90vh', width: '95vw', height: '90vh' }}>
            <div className="card-header">
              <h5 className="card-title mb-0"><strong>Packing Cost Calculation New</strong></h5>
              <button type="button" className="close" onClick={handleCancel} aria-label="Close"><span aria-hidden>×</span></button>
            </div>

            {/* Modal body with scrolling content */}
            <div className="card-body" style={{ maxHeight: "70vh", overflowY: "auto" }}>
              <SearchSection
                form={form}
                change={change}
                setShowPartPicker={setShowPartPicker}
                setShowModelPicker={setShowModelPicker}
                handleCalculate={handleCalculate}
                handleClear={handleClear}
                onModelRemove={handleModelRemove}
                onPartRemove={handlePartRemove}
                onModelCodeKeyDown={handleModelCodeKeyDown}
                onPartKeyDown={handlePartKeyDown}
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
                threshold_percentage={5}
              />

              <Pagination 
                page={page}
                totalPages={totalPages}
                goToPage={goToPage}
                perPage={perPage}
              />
            </div>

            {/* Modal footer with action buttons */}
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

      {/* Part Picker Modal, shown conditionally */}
      {showPartPicker && (
        <PartPickerModal 
          show={showPartPicker} 
          onClose={() => setShowPartPicker(false)} 
          onSelect={handlePartsPicked} 
        />
      )}

      {/* Model Picker Modal, shown conditionally */}
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