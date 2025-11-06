// src/components/MaterialPickerModal.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import materialsData from "../data/Materials.json";

export default function MaterialPickerModal({
  show = false,
  onClose = () => {},
  onAdd = () => {},
  selectionMode = "single",
  zIndex = 1050,
  filter = "all",
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMaterialNo, setFilterMaterialNo] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState(selectionMode === "multi" ? [] : null);
  const [displayedMaterials, setDisplayedMaterials] = useState(materialsData);
  const materialsPerPage = 15;

  useEffect(() => {
    if (show) {
      let initialMaterials = materialsData;
      if (typeof filter === "string" && filter !== "all") {
        initialMaterials = materialsData.filter(
          (m) => m.materialType.toLowerCase() === filter.toLowerCase()
        );
      }

      setFilterMaterialNo("");
      setFilterName("");
      setFilterType("");
      setSelectedMaterials(selectionMode === "multi" ? [] : null);
      setDisplayedMaterials(initialMaterials);
      setCurrentPage(1);
    }
  }, [show, selectionMode, filter]);

  const handleSelectionChange = (materialNo) => {
    if (selectionMode === "multi") {
      setSelectedMaterials((prev) => (prev.includes(materialNo) ? prev.filter((m) => m !== materialNo) : [...prev, materialNo]));
    } else {
      setSelectedMaterials(materialNo);
    }
  };

  const handleSearch = () => {
    const filtered = materialsData.filter(
      (m) =>
        m.materialNo.toLowerCase().includes(filterMaterialNo.toLowerCase()) &&
        m.name.toLowerCase().includes(filterName.toLowerCase()) &&
        m.type.toLowerCase().includes(filterType.toLowerCase())
    );
    setDisplayedMaterials(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilterMaterialNo("");
    setFilterName("");
    setFilterType("");
    setDisplayedMaterials(materialsData);
    setCurrentPage(1);
  };

  const handleAdd = () => {
    if (typeof onAdd === "function") {
      if (selectionMode === "multi") {
        onAdd(selectedMaterials.map((materialNo) => materialsData.find((m) => m.materialNo === materialNo)));
      } else {
        const selectedMaterial = materialsData.find((m) => m.materialNo === selectedMaterials);
        console.log(">>>>" + selectedMaterial);
        onAdd(selectedMaterial);
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
              <span aria-hidden="true">&times;</span>
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
                  onChange={(e) => setFilterMaterialNo(e.target.value)}
                />
              </div>
              <div className="form-group col-md-4">
                <label className="small">Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-3">
                <label className="small">Type</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
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