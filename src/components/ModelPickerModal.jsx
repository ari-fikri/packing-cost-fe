// src/components/ModelPickerModal.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export default function ModelPickerModal({ show, onClose, onAdd, selectionMode = "multi" }) {
  const [modelsData, setModelsData] = useState([]);
  const [filterCode, setFilterCode] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterCfc, setFilterCfc] = useState("");
  const [filterDestCode, setFilterDestCode] = useState("");
  const [filterImplPeriod, setFilterImplPeriod] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterRemark, setFilterRemark] = useState("");
  const [selectedModels, setSelectedModels] = useState(selectionMode === "multi" ? [] : null);
  const [displayedModels, setDisplayedModels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 15;

  useEffect(() => {
    const dataUrl = `${import.meta.env.BASE_URL}models.json`;
    fetch(dataUrl)
      .then(response => response.json())
      .then(data => {
        setModelsData(data);
        setDisplayedModels(data);
      });
  }, []);

  useEffect(() => {
    if (show) {
      setFilterCode("");
      setFilterName("");
      setFilterCfc("");
      setFilterDestCode("");
      setFilterImplPeriod("");
      setFilterType("");
      setFilterRemark("");
      setSelectedModels(selectionMode === "multi" ? [] : null);
      setDisplayedModels(modelsData);
      setCurrentPage(1);
    }
  }, [show, selectionMode]);

  const handleSelectionChange = (code) => {
    if (selectionMode === "multi") {
      setSelectedModels((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
    } else {
      setSelectedModels(code);
    }
  };

  const handleSearch = () => {
    const filtered = modelsData.filter(
      (m) =>
        m.model_code.toLowerCase().includes(filterCode.toLowerCase()) &&
        m.model_name.toLowerCase().includes(filterName.toLowerCase()) &&
        (m.model_cfc || '').toLowerCase().includes(filterCfc.toLowerCase()) &&
        (m.destination_code || '').toLowerCase().includes(filterDestCode.toLowerCase()) &&
        (m.model_implementation_period || '').toLowerCase().includes(filterImplPeriod.toLowerCase()) &&
        (m.model_type || '').toLowerCase().includes(filterType.toLowerCase()) &&
        m.model_remark.toLowerCase().includes(filterRemark.toLowerCase())
    );
    setDisplayedModels(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setFilterCode("");
    setFilterName("");
    setFilterCfc("");
    setFilterDestCode("");
    setFilterImplPeriod("");
    setFilterType("");
    setFilterRemark("");
    setDisplayedModels(modelsData);
    setCurrentPage(1);
  };

  const handleAdd = () => {
    if (typeof onAdd === "function") {
      if (selectionMode === "multi") {
        onAdd(selectedModels.map((code) => modelsData.find((m) => m.model_code === code)));
      } else {
        const selectedModel = modelsData.find((m) => m.model_code === selectedModels);
        onAdd(selectedModel);
      }
    }
    setSelectedModels(selectionMode === "multi" ? [] : null);
    if (typeof onClose === "function") onClose();
  };

  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = displayedModels.slice(indexOfFirstModel, indexOfLastModel);
  const totalPages = Math.ceil(displayedModels.length / modelsPerPage);

  if (!show) return null;

  const modal = (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="modal-dialog modal-lg" role="document" style={{ zIndex: 2100 }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Select Model</h5>
            <button type="button" className="close" onClick={onClose} aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            {/* Filters */}
            <div className="form-row align-items-end mb-3">
              <div className="form-group col-md-2">
                <label className="small">Model Code</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterCode}
                  onChange={(e) => setFilterCode(e.target.value)}
                />
              </div>
              <div className="form-group col-md-2">
                <label className="small">Name</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                />
              </div>
              <div className="form-group col-md-1">
                <label className="small">CFC</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterCfc}
                  onChange={(e) => setFilterCfc(e.target.value)}
                />
              </div>
              <div className="form-group col-md-2">
                <label className="small">Dest Code</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterDestCode}
                  onChange={(e) => setFilterDestCode(e.target.value)}
                />
              </div>
              <div className="form-group col-md-2">
                <label className="small">Impl. Period</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterImplPeriod}
                  onChange={(e) => setFilterImplPeriod(e.target.value)}
                />
              </div>
              <div className="form-group col-md-1">
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
                      <th>Model Code</th>
                      <th>Name</th>
                      <th>CFC</th>
                      <th>Dest Code</th>
                      <th>Impl. Period</th>
                      <th>Type</th>
                      <th>Remark</th>
                      <th>Katashiiki</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentModels.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center text-muted" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
                          No models found
                        </td>
                      </tr>
                    ) : (
                      currentModels.map((m) => (
                        <tr key={m.model_code}>
                          <td>
                            <input
                              type={selectionMode === "multi" ? "checkbox" : "radio"}
                              name="model-selection"
                              checked={selectionMode === "multi" ? selectedModels.includes(m.model_code) : selectedModels === m.model_code}
                              onChange={() => handleSelectionChange(m.model_code)}
                            />
                          </td>
                          <td>{m.model_code}</td>
                          <td>{m.model_name}</td>
                          <td>{m.model_cfc}</td>
                          <td>{m.destination_code}</td>
                          <td>{m.model_implementation_period}</td>
                          <td>{m.model_type}</td>
                          <td>{m.model_remark}</td>
                          <td>
                            {Array.isArray(m.katashiki) && m.katashiki.length > 0 ? (
                              m.katashiki.map((k, i) => (
                                <span key={i} className="badge badge-primary mr-1">{k.string} : {k.number}</span>
                              ))
                            ) : (
                              '-'
                            )}
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
              <button className="btn btn-primary mr-2" onClick={handleAdd} type="button" disabled={selectionMode === "multi" ? selectedModels.length === 0 : !selectedModels}>
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