import React, { useState } from 'react';
import { handleInputChange } from '../../../utils/globalFunctions';

export default function SearchSection(props) {
  // Log all incoming props to see what the component is receiving
  console.log("Props received by SearchSection:", props);

  const {
    filters,
    setters,
    onSearch,
    onClear,
    onPartSearch,
  } = props;

  const {
    modelCode,
    destCode,
    partNo,
    supplierCode,
    cpsNo,
    implementationPeriod,
  } = filters || {}; // Added fallback for safety

  const {
    setModelCode,
    setDestCode,
    setPartNo,
    setSupplierCode,
    setCpsNo,
    setImplementationPeriod,
  } = setters || {}; // Added fallback for safety

  const [partNoInput, setPartNoInput] = useState('');

  const handlePartNoKeyDown = (e) => {
    if (e.key === ' ' || e.key === ',') {
      e.preventDefault();
      const newPart = partNoInput.trim();
      if (newPart) {
        setPartNo(prev => [...new Set([...prev, newPart])]);
      }
      setPartNoInput('');
    }
  };

  const removePartNo = (partToRemove) => {
    setPartNo(prev => prev.filter(p => p !== partToRemove));
  };

  const handleSearch = () => {
    console.log("Search button clicked in SearchSection");
    if (onSearch) {
      onSearch();
    } else {
      console.error("onSearch prop is NOT DEFINED in SearchSection. Check the parent component.");
    }
  };

  return (
    <div className="card-body">
      <div className="row">
        {/* Left column */}
        <div className="col-12 col-md-6">
          <div className="form-row">
            <div className="form-group col-12">
              <label className="small mb-1">Model Code</label>
              <div className="input-group input-group-sm">
                <input className="form-control form-control-sm" value={modelCode || ''} onChange={setModelCode ? handleInputChange(setModelCode) : undefined} placeholder="Model Code" />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Model Code" onClick={() => alert('Search Model Code placeholder')}>
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">Implementation Period</label>
              <div className="input-group input-group-sm">
                <input className="form-control form-control-sm" value={implementationPeriod || ''} onChange={setImplementationPeriod ? handleInputChange(setImplementationPeriod) : undefined} placeholder="Implementation Period" />
              </div>
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">Part No</label>
              <div className="input-group input-group-sm">
                <div className="form-control form-control-sm" style={{ height: 'auto', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {partNo.map(part => (
                    <span key={part} className="badge badge-primary" style={{ display: 'flex', alignItems: 'center', padding: '4px 8px' }}>
                      {part}
                      <button
                        type="button"
                        className="close"
                        aria-label="Remove"
                        onClick={() => removePartNo(part)}
                        style={{ color: 'white', marginLeft: '8px', textShadow: 'none', opacity: 1, fontSize: '1rem' }}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </span>
                  ))}
                  <input
                    style={{ border: 'none', outline: 'none', flex: '1', minWidth: '100px' }}
                    value={partNoInput}
                    onChange={handleInputChange(setPartNoInput)}
                    onKeyDown={handlePartNoKeyDown}
                    placeholder="Type and press space"
                  />
                </div>
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Part No" onClick={onPartSearch}>
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right column */}
        <div className="col-12 col-md-6">
          <div className="form-row">
            <div className="form-group col-12">
              <label className="small mb-1">Dest Code</label>
              <div className="input-group input-group-sm">
                <input className="form-control form-control-sm" value={destCode || ''} onChange={setDestCode ? handleInputChange(setDestCode) : undefined} placeholder="Dest Code" />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Dest Code" onClick={() => alert('Search Dest Code placeholder')}>
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">CPS No</label>
              <div className="input-group input-group-sm">
                <input className="form-control form-control-sm" value={cpsNo || ''} onChange={setCpsNo ? handleInputChange(setCpsNo) : undefined} placeholder="CPS No" />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary btn-sm" title="Search CPS No" onClick={() => alert('Search CPS No placeholder')}>
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group col-12">
              <label className="small mb-1">Supplier Code</label>
              <div className="input-group input-group-sm">
                <input className="form-control form-control-sm" value={supplierCode || ''} onChange={setSupplierCode ? handleInputChange(setSupplierCode) : undefined} placeholder="Supplier Code" />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Supplier" onClick={() => alert('Search Supplier placeholder')}>
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 6: Buttons — right aligned in second column */}
        <div className="col-12 d-flex">
          <div className="col-md-6" />
          <div className="col-md-6 d-flex justify-content-end">
            <button type="button" className="btn btn-sm btn-primary mr-2" onClick={handleSearch}>
              <i className="fas fa-search mr-1" /> Search
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClear}>
              <i className="fas fa-times mr-1" /> Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}