// src/components/MultiPartsComparisonModal.jsx
import React, { useState, useMemo } from 'react';
import SearchSection from './SearchSection';
import CurrentCpsSection from './CurrentCpsSection';
import ResultsSection from './ResultsSection';
import { currentDummy, partsDummy } from "../data/comparison";

export default function MultiPartsComparisonModal({
  isOpen = false,
  onClose = () => {},
  parts = [],        // array of part objects for search results
  current = {},      // object containing current CPS data
  onSelectPart = () => {}
}) {
  // 3 query states for search inputs
  const [partNoQuery, setPartNoQuery] = useState('');
  const [partNameQuery, setPartNameQuery] = useState('');
  const [supplierQuery, setSupplierQuery] = useState('');

  // Filtering parts based on the three fields
  const filteredParts = useMemo(() => {
    return parts.filter(p => {
      const pn = partNoQuery.trim().toLowerCase();
      const pname = partNameQuery.trim().toLowerCase();
      const sup = supplierQuery.trim().toLowerCase();
      const partNoMatch = pn === '' || (p.partNo && p.partNo.toLowerCase().includes(pn));
      const partNameMatch = pname === '' || (p.name && p.name.toLowerCase().includes(pname));
      const supplierMatch = sup === '' || (p.supplier && p.supplier.toLowerCase().includes(sup));
      return partNoMatch && partNameMatch && supplierMatch;
    });
  }, [parts, partNoQuery, partNameQuery, supplierQuery]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="np-modal-backdrop multi-parts-modal" style={{ zIndex: 3000 }} onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="np-modal card card-outline card-primary" style={{ maxWidth: 1200, width: '100%' }}>
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Parts Comparison</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-tool" onClick={onClose}><i className="fas fa-times"></i></button>
          </div>
        </div>

        <div className="card-body">
          {/* 1st Section: Search / Select Part */}
          <SearchSection
            current={current}
            partNoQuery={partNoQuery}
            partNameQuery={partNameQuery}
            supplierQuery={supplierQuery}
            onPartNoChange={setPartNoQuery}
            onPartNameChange={setPartNameQuery}
            onSupplierChange={setSupplierQuery}
            onGo={() => {
              // Maybe you want to trigger some action on Go, or just rely on filteredParts
              // For example, you could focus results section or fetch new parts
            }}
          />

          <hr />

          {/* 2nd Section: Current CPS data */}
          <CurrentCpsSection current={current} />

          <hr />

          {/* 3rd Section: Search Results */}
          <ResultsSection
            filteredParts={filteredParts}
            onSelectPart={(p) => {
              onSelectPart(p);
              // maybe close modal or update current state
            }}
          />
        </div>

        <div className="card-footer text-right">
          <button className="btn btn-sm btn-primary mr-2" onClick={() => { /* maybe combine selections, or confirm */ }}>Add</button>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>Close</button>
        </div>

        <style>{`
          .multi-parts-modal .np-modal { max-width: 1200px; }
          .np-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; padding: 1rem; }
          .np-modal { width: 100%; max-height: 95vh; overflow: auto; }
          .table-sm td, .table-sm th { vertical-align: middle; white-space: nowrap; }
        `}</style>
      </div>
    </div>
  );
}
