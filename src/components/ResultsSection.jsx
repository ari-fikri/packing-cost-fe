// src/components/ResultsSection.jsx
import React from "react";

export default function ResultsSection({ filteredParts = [], onSelectPart }) {
  return (
    <div className="mb-1">
      <h6 className="mb-2">Search Results</h6>
      <div className="table-responsive" style={{ maxHeight: 260, overflowY: 'auto' }}>
        <table className="table table-sm table-hover table-bordered mb-0">

          <tbody>
            {filteredParts.length === 0 ? (
              <tr><td colSpan="7" className="text-center text-muted py-3">No results</td></tr>
            ) : filteredParts.map((p, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{p.partNo}</td>
                <td>{p.name}</td>
                <td>{p.supplier}</td>
                <td>{typeof p.price !== 'undefined' ? p.price : '—'}</td>
                <td>{typeof p.leadTime !== 'undefined' ? p.leadTime : '—'}</td>
                <td>
                  <div className="btn-group btn-group-sm" role="group">
                    <button className="btn btn-outline-primary" onClick={() => onSelectPart(p)}>Select</button>
                    <button className="btn btn-outline-secondary" onClick={() => alert(`View ${p.partNo}`)}>View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
