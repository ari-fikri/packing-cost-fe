import React, { useState } from 'react';
import SearchSection from './cps/SearchSection';
import ResultSection from './cps/ResultSection';

export default function Cps() {
  // States for controlling modals
  const [showPersonPicker, setShowPersonPicker] = useState(false);
  const [personPickerTarget, setPersonPickerTarget] = useState('');
  const [showNewCps, setShowNewCps] = useState(false);

  // States for search filters
  const [cpsNo, setCpsNo] = useState('');
  const [refCpsNo, setRefCpsNo] = useState('');
  const [model, setModel] = useState('');
  const [cfcPjt, setCfcPjt] = useState('');
  const [fromUser, setFromUser] = useState('');
  const [toUser, setToUser] = useState('');
  const [issuedFrom, setIssuedFrom] = useState('');
  const [issuedTo, setIssuedTo] = useState('');
  const [effectiveFrom, setEffectiveFrom] = useState('');
  const [effectiveTo, setEffectiveTo] = useState('');
  const [status, setStatus] = useState('Any');

  // States for pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  // Mock data for the results table
  const [filteredCps, setFilteredCps] = useState([]);

  const handleSearch = () => {
    // In a real app, you'd fetch data from an API based on filters
    const mockData = [
        { id: 1, cpsNo: "CPS-001", refCpsNo: 'REF-001', dpiNo: 'DPI-001', issuedDate: '2023-01-01', effectiveDate: '2023-02-01', cfcPjt: 'CFC1', model: "Model A", parts: [1,2,3], fromUser: 'UserA', toUser: 'UserB', status: "Approved" },
        { id: 2, cpsNo: "CPS-002", refCpsNo: 'REF-002', dpiNo: 'DPI-002', issuedDate: '2023-01-02', effectiveDate: '2023-02-02', cfcPjt: 'CFC2', model: "Model B", numParts: 5, fromUser: 'UserC', toUser: 'UserD', status: "Pending" },
    ];
    setFilteredCps(mockData);
  };

  const handleClear = () => {
    setCpsNo('');
    setRefCpsNo('');
    setModel('');
    setCfcPjt('');
    setFromUser('');
    setToUser('');
    setIssuedFrom('');
    setIssuedTo('');
    setEffectiveFrom('');
    setEffectiveTo('');
    setStatus('Any');
    setFilteredCps([]);
  };

  const handlePersonPicker = (target) => {
    setPersonPickerTarget(target);
    setShowPersonPicker(true);
  };

  const filters = {
    cpsNo,
    refCpsNo,
    model,
    cfcPjt,
    fromUser,
    toUser,
    issuedFrom,
    issuedTo,
    effectiveFrom,
    effectiveTo,
    status,
  };

  const setters = {
    setCpsNo,
    setRefCpsNo,
    setModel,
    setCfcPjt,
    setFromUser,
    setToUser,
    setIssuedFrom,
    setIssuedTo,
    setEffectiveFrom,
    setEffectiveTo,
    setStatus,
  };

  return (
    <div className="container-fluid">
      {/* Page title */}
      <div className="row mb-2">
        <div className="col-6">
          <h1 className="h3 mb-0 text-gray-800">CPS List</h1>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowNewCps(true)}
          >
            <i className="fas fa-plus mr-1" />
            Create CPS
          </button>
        </div>
      </div>

      {/* Search section */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Search Criteria</h6>
        </div>
        <div className="card-body">
          <SearchSection
            filters={filters}
            setters={setters}
            onSearch={handleSearch}
            onClear={handleClear}
            onPersonPicker={handlePersonPicker}
          />
        </div>
      </div>

      {/* Result section */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Search Result</h6>
        </div>
        <div className="card-body">
          <ResultSection
            filteredCps={filteredCps}
            page={page}
            perPage={perPage}
            setPage={setPage}
            setPerPage={setPerPage}
          />
        </div>
      </div>
    </div>
  );
}