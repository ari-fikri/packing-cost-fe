// src/components/MaterialPickerModal.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { handleInputChange } from "../utils/globalFunctions";

export default function MaterialPickerModal({
  show = false,
  onClose = () => {},
  onAdd = () => {},
  selectionMode = "single",
  zIndex = 1050,
  filter = "all",
}) {
  const [materialsData, setMaterialsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMaterialNo, setFilterMaterialNo] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState(selectionMode === "multi" ? [] : null);
  const [displayedMaterials, setDisplayedMaterials] = useState([]);
  const materialsPerPage = 15;

  useEffect(() => {
    const materialsUrl = `${import.meta.env.BASE_URL}materials.json`;
    fetch(materialsUrl)
      .then((response) => response.json())
      .then((data) => setMaterialsData(data))
      .catch((error) => console.error("Error fetching materials:", error));
  }, []);

  useEffect(() => {
    if (show) {
      setDisplayedMaterials([]);
      setSearchTerm('');
      setCurrentPage(1);
    }
  }, [show]);

  function handleSelectionChange(materialNo) {
    if (selectionMode === "multi") {
      setSelectedMaterials((prev) => (prev.includes(materialNo) ? prev.filter((m) => m !== materialNo) : [...prev, materialNo]));
    } else {
      setSelectedMaterials(materialNo);
    }
  }

  const handleSearch = () => {
    let filtered = materialsData;
    if (filter) {
      const filterLower = filter.toLowerCase();
      if (filterLower === 'module') {
        filtered = filtered.filter(m => m.materialType.toLowerCase() === 'outer' || m.materialType.toLowerCase() === 'module');
      } else if (filterLower === 'outer') {
        filtered = filtered.filter(m => m.materialType.toLowerCase() === 'outer' || m.materialType.toLowerCase() === 'module');
      } else if (filterLower === 'inner') {
        filtered = filtered.filter(m => m.materialType.toLowerCase() === 'inner' || m.materialType.toLowerCase() === 'box');
      } else if (filterLower === 'box') {
        filtered = filtered.filter(m => m.materialType.toLowerCase() === 'inner' || m.materialType.toLowerCase() === 'box');
      }
    }
    filtered = filtered.filter(
      (m) =>
        (m.materialNo || "").toLowerCase().includes(filterMaterialNo.toLowerCase()) &&
        (m.materialName || "").toLowerCase().includes(filterName.toLowerCase()) &&
        (m.materialType || "").toLowerCase().includes(filterType.toLowerCase())
    );
    setDisplayedMaterials(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilterMaterialNo("");
    setFilterName("");
    setFilterType("");
    let cleared = materialsData;
    if (filter) {
      const filterLower = filter.toLowerCase();
      if (filterLower === 'module') {
        cleared = cleared.filter(m => m.materialType.toLowerCase() === 'module');
      } else if (filterLower === 'outer') {
        cleared = cleared.filter(m => m.materialType.toLowerCase() === 'outer');
      } else if (filterLower === 'inner') {
        cleared = cleared.filter(m => m.materialType.toLowerCase() === 'inner' || m.materialType.toLowerCase() === 'box');
      } else if (filterLower === 'box') {
        cleared = cleared.filter(m => m.materialType.toLowerCase() === 'box');
      }
    }
    setDisplayedMaterials(cleared);
    setCurrentPage(1);
  };

  const handleAdd = () => {
    if (typeof onAdd === "function") {
      if (selectionMode === "multi") {
        const selectedMaterialObjects = selectedMaterials.map((materialNo) => {
          const material = materialsData.find((m) => m.materialNo === materialNo);
          // Ensure supplierName field exists
          return {
            ...material,
            supplierName: material.supplier?.supplier_name || material.supplierName
          };
        });
        onAdd(selectedMaterialObjects);
      } else {
        const selectedMaterial = materialsData.find((m) => m.materialNo === selectedMaterials);
        console.log("Selected material:", selectedMaterial);
        // Ensure supplierName field exists
        const materialWithSupplierName = {
          ...selectedMaterial,
          supplierName: selectedMaterial.supplier?.supplier_name || selectedMaterial.supplierName
        };
        onAdd(materialWithSupplierName);
      }
    }
    setSelectedMaterials(selectionMode === "multi" ? [] : null);
    if (typeof onClose === "function") onClose();
  };

  const indexOfLastMaterial = currentPage * materialsPerPage;
  const indexOfFirstMaterial = indexOfLastMaterial - materialsPerPage;
  const currentMaterials = displayedMaterials.slice(indexOfFirstMaterial, indexOfLastMaterial);
  const totalPages = Math.ceil(displayedMaterials.length / materialsPerPage);

  const formatDecimal = (num) => {
    if (typeof num !== "number") {
      return num;
    }
    return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatInteger = (num) => {
    if (typeof num !== "number") {
      return num;
    }
    return num.toLocaleString("en-US");
  };

  if (!show) return null;

  const modal = (
    <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", zIndex }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select Material</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div className="modal-body">
            {/* Filters */}
            <div className="form-row align-items-end mb-3">
              <div className="form-group col-md-3">
                <label className="small">Material No</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterMaterialNo}
                  onChange={handleInputChange(setFilterMaterialNo)}
                />
              </div>
              <div className="form-group col-md-4">
                <label className="small">Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterName}
                  onChange={handleInputChange(setFilterName)}
                />
              </div>
              <div className="form-group col-md-3">
                <label className="small">Type</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterType}
                  onChange={handleInputChange(setFilterType)}
                />
              </div>
              <div className="form-group col-md-2 text-right">
                <button className="btn btn-sm btn-primary mr-1" onClick={handleSearch} type="button">
                  Search
                </button>
                <button className="btn btn-sm btn-secondary" onClick={handleClear} type="button">
                  Clear
                </button>
              </div>
            </div>

            {/* Table */}
            <div style={{ height: "450px" }}>
              <div className="table-responsive" style={{ height: "100%", overflowY: "auto" }}>
                <table className="table table-striped table-sm mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: 30 }}></th>
                      <th>Material No</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Supplier</th>
                      <th style={{ textAlign: "right" }}>L</th>
                      <th style={{ textAlign: "right" }}>W</th>
                      <th style={{ textAlign: "right" }}>H</th>
                      <th style={{ textAlign: "right" }}>Inner</th>
                      <th style={{ textAlign: "right" }}>Outer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentMaterials.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center text-muted" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                          No materials found
                        </td>
                      </tr>
                    ) : (
                      currentMaterials.map((m) => (
                        <tr key={m.materialNo}>
                          <td>
                            <input
                              type={selectionMode === "multi" ? "checkbox" : "radio"}
                              name="material-selection"
                              checked={selectionMode === "multi" ? selectedMaterials.includes(m.materialNo) : selectedMaterials === m.materialNo}
                              onChange={() => handleSelectionChange(m.materialNo)}
                            />
                          </td>
                          <td>{m.materialNo}</td>
                          <td>{m.materialName}</td>
                          <td>{m.materialType}</td>
                          <td>{m.supplier?.supplier_name || m.supplierName || ''}</td>
                          <td style={{ textAlign: "right" }}>{formatInteger(m.dimension_length)}</td>
                          <td style={{ textAlign: "right" }}>{formatInteger(m.dimension_width)}</td>
                          <td style={{ textAlign: "right" }}>{formatInteger(m.dimension_height)}</td>
                          <td style={{ textAlign: "right" }}>
                            {formatDecimal((m.dimension_inner_length * m.dimension_inner_width * m.dimension_inner_height) / 1000000)}
                          </td>
                          <td style={{ textAlign: "right" }}>
                            {formatDecimal((m.dimension_outer_length * m.dimension_outer_width * m.dimension_outer_height) / 1000000)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="modal-footer d-flex justify-content-between">
            <div>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
            <div>
              <button className="btn btn-primary" onClick={handleAdd} type="button">
                Add <i className="fas fa-check" />
              </button>
              <button className="btn btn-secondary" onClick={onClose} type="button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, typeof document !== "undefined" ? document.body : null);
}