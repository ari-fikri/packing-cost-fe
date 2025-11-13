// src/components/MultiPartsComparisonModal.jsx
import React, { useState, useMemo, useRef } from 'react';
import { SearchSection, CurrentCpsSection, ResultsSection } from './MultiPartsComparisonModalSections'
import { useAuth } from '../auth';

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

  const { user } = useAuth();
  const isPseUser = user && user.department === 'PSE' && !['pic', 'sh', 'dph'].includes(user.role);

  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const isSyncing = useRef(false);

  const handleScroll = (scrollingRef, otherRef) => {
    if (!isSyncing.current) {
      isSyncing.current = true;
      if (otherRef.current && scrollingRef.current) {
        otherRef.current.scrollLeft = scrollingRef.current.scrollLeft;
      }
      isSyncing.current = false;
    }
  };

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
      <div
        className="np-modal card card-outline card-primary"
        style={{
          maxWidth: 1200,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          height: '700px',
          maxHeight: '700px',
          minHeight: '700px',
        }}
      >
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Parts Comparison</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-tool" onClick={onClose}><i className="fas fa-times"></i></button>
          </div>
        </div>

        <div className="card-body" style={{ verticalAlign: 'top', paddingBottom: 0, maxHeight: "fit-content" }}>
          {/* 1st Section: Search / Select Part */}
          <SearchSection
            current={current}
            partNoQuery={partNoQuery}
            partNameQuery={partNameQuery}
            supplierQuery={supplierQuery}
            onPartNoChange={setPartNoQuery}
            onPartNameChange={setPartNameQuery}
            onSupplierChange={setSupplierQuery}
            onGo={() => {}}
          />
        </div>

        <hr className="my-0" />

        <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '8px', paddingBottom: '8px'}}>
          {/* 2nd Section: Current CPS data */}
          <CurrentCpsSection
            current={current}
            scrollRef={scrollRef1}
            onScroll={() => handleScroll(scrollRef1, scrollRef2)}
            isPseUser={isPseUser}
          />

          <hr style={{ margin: '8px 0' }} />

          {/* 3rd Section: Search Results */}
          <ResultsSection
            filteredParts={filteredParts}
            onSelectPart={onSelectPart}
            scrollRef={scrollRef2}
            onScroll={() => handleScroll(scrollRef2, scrollRef1)}
            isPseUser={isPseUser}
          />
        </div>

        <div className="card-footer text-right">
          <button className="btn btn-sm btn-primary mr-2" onClick={() => {}}>Add</button>
          <button className="btn btn-sm btn-outline-secondary" onClick={onClose}>Close</button>
        </div>

        <style>{`
          .multi-parts-modal .np-modal { max-width: 1200px; height: 700px; min-height: 700px; max-height: 700px; }
          .np-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; padding: 1rem; }
          .np-modal { width: 100%; height: 700px; min-height: 700px; max-height: 700px; }
          .table-sm td, .table-sm th { vertical-align: middle; white-space: nowrap; }
          .card-body { vertical-align: top; }
        `}</style>
      </div>
    </div>
  );
}