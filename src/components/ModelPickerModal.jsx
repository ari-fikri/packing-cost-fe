// src/components/ModelPickerModal.jsx
import React, { useState } from "react";
import ReactDOM from "react-dom";
import modelsData from "../data/models.json";

export default function ModelPickerModal({ show, onClose, onAdd }) {
  const [filterCode, setFilterCode] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterRemark, setFilterRemark] = useState("");
  const [selectedModels, setSelectedModels] = useState([]);

  // use imported JSON data
  // modelsData is already available from the import

  const handleCheckboxChange = (code) => {
    setSelectedModels((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleSearch = () => {
    // no-op: filtering is reactive via filteredModels
  };

  const handleClear = () => {
    setFilterCode("");
    setFilterName("");
    setFilterRemark("");
  };

  const filteredModels = modelsData.filter(
    (m) =>
      m.code.toLowerCase().includes(filterCode.toLowerCase()) &&
      m.name.toLowerCase().includes(filterName.toLowerCase()) &&
      m.remark.toLowerCase().includes(filterRemark.toLowerCase())
  );

  const handleAdd = () => {
    if (typeof onAdd === "function") {
      onAdd(selectedModels.map((code) => modelsData.find((m) => m.code === code)));
    }
    setSelectedModels([]);
    if (typeof onClose === "function") onClose();
  };

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
              <div className="form-group col-md-3">
                <label className="small">Model Code</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterCode}
                  onChange={(e) => setFilterCode(e.target.value)}
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
              <div className="form-group col-md-4">
                <label className="small">Remark</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={filterRemark}
                  onChange={(e) => setFilterRemark(e.target.value)}
                />
              </div>
              <div className="form-group col-md-1 text-right">
                <button className="btn btn-sm btn-outline-primary mr-1" onClick={handleSearch} type="button">
                  <i className="fas fa-search" />
                </button>
                <button className="btn btn-sm btn-outline-secondary" onClick={handleClear} type="button">
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-striped table-sm mb-0">
                <thead>
                  <tr>
                    <th style={{ width: 30 }}></th>
                    <th>Model Code</th>
                    <th>Name</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModels.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        No models found
                      </td>
                    </tr>
                  ) : (
                    filteredModels.map((m) => (
                      <tr key={m.code}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedModels.includes(m.code)}
                            onChange={() => handleCheckboxChange(m.code)}
                          />
                        </td>
                        <td>{m.code}</td>
                        <td>{m.name}</td>
                        <td>{m.remark}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="modal-footer">
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
  );

  return ReactDOM.createPortal(modal, typeof document !== "undefined" ? document.body : null);
}
