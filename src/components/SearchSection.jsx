// src/components/SearchSection.jsx
import React from "react";

export default function SearchSection({
  current,
  partNoQuery,
  partNameQuery,
  supplierQuery,
  onPartNoChange,
  onPartNameChange,
  onSupplierChange,
  onGo
}) {
  return (
    <div className="mb-3">
      <div className="d-flex align-items-center">
        <h5 className="mb-0 mr-3">Select part</h5>
      </div>

      <div className="row mt-2">
        <div className="col-md-3">
          <label className="small mb-1">Part No</label>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Enter Part No"
            value={partNoQuery}
            onChange={e => onPartNoChange(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="small mb-1">Part Name</label>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Enter Part Name"
            value={partNameQuery}
            onChange={e => onPartNameChange(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="small mb-1">Supplier Name</label>
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Enter Supplier Name"
            value={supplierQuery}
            onChange={e => onSupplierChange(e.target.value)}
          />
        </div>
        <div className="col-md-3 d-flex align-items-end">
          <button
            className="btn btn-sm btn-primary w-100"
            type="button"
            onClick={onGo}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}
