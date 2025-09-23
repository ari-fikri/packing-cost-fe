// src/components/MultiPartsComparisonModal.jsx
import React from "react";

const MultiPartsComparisonModal = ({ isOpen, onClose, parts, extraClass }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`modal fade show ${extraClass || ""}`}
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-xl" style={{ maxWidth: "95%" }}>
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header bg-primary">
            <h5 className="modal-title">Multi Parts Comparison</h5>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          {/* Body */}
          <div className="modal-body p-0">
            <div className="table-responsive" style={{ maxHeight: "70vh" }}>
              <table className="table table-bordered table-hover table-sm text-nowrap">
                <thead className="thead-dark sticky-top">
                  <tr>
                    <th>Attribute</th>
                    {parts.map((part, index) => (
                      <th key={index} className="text-center">
                        {part.partNo}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Part Name</td>
                    {parts.map((p, i) => (
                      <td key={i}>{p.name}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Supplier</td>
                    {parts.map((p, i) => (
                      <td key={i}>{p.supplier}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Price</td>
                    {parts.map((p, i) => (
                      <td key={i}>${p.price}</td>
                    ))}
                  </tr>
                  <tr>
                    <td>Lead Time</td>
                    {parts.map((p, i) => (
                      <td key={i}>{p.leadTime} days</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button type="button" className="btn btn-success">
              Export to Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiPartsComparisonModal;
