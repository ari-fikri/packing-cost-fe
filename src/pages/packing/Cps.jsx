import React, { useState, useEffect } from 'react';
import SearchSection from './cps/SearchSection';
import ResultSection from './cps/ResultSection';
import HeaderActions from './cps/HeaderActions';
import DESTINATIONS from '../../data/destinations';
import { cpsData } from '../../data/cps';

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
  const [status, setStatus] = useState('Any');
  const [destCode, setDestCode] = useState('');
  const [destCountry, setDestCountry] = useState('');
  const [cpsPsiEci, setCpsPsiEci] = useState('');

  // States for pagination
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  // State for the results table
  const [filteredCps, setFilteredCps] = useState([]);

  const handleSearch = () => {
    const noFiltersApplied =
      !cpsNo &&
      !refCpsNo &&
      !model &&
      !cfcPjt &&
      !fromUser &&
      !toUser &&
      status === 'Any' &&
      !destCode &&
      !cpsPsiEci &&
      !issuedFrom &&
      !issuedTo;

    let filtered = cpsData;

    if (noFiltersApplied) {
      filtered = [...cpsData].sort((a, b) => new Date(b.issuedDate) - new Date(a.issuedDate));
    } else {
      filtered = cpsData.filter(item => {
        return (
          (cpsNo ? item.cpsNo.toLowerCase().includes(cpsNo.toLowerCase()) : true) &&
          (refCpsNo ? item.refCpsNo.toLowerCase().includes(refCpsNo.toLowerCase()) : true) &&
          (model ? item.model.toLowerCase().includes(model.toLowerCase()) : true) &&
          (cfcPjt ? item.cfcPjt.toLowerCase().includes(cfcPjt.toLowerCase()) : true) &&
          (fromUser ? item.fromUser.toLowerCase().includes(fromUser.toLowerCase()) : true) &&
          (toUser ? item.toUser.toLowerCase().includes(toUser.toLowerCase()) : true) &&
          (status !== 'Any' ? item.status === status : true) &&
          (destCode ? item.destCode === destCode : true) &&
          (cpsPsiEci ? item.cpsPsiEci === cpsPsiEci : true) &&
          (!issuedFrom || new Date(item.issuedDate) >= new Date(issuedFrom)) &&
          (!issuedTo || new Date(item.issuedDate) <= new Date(issuedTo))
        );
      });
    }
    setFilteredCps(filtered);
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
    setStatus('Any');
    setDestCode('');
    setDestCountry('');
    setCpsPsiEci('');
    setFilteredCps([]);
  };

  const handleCreatePsi = () => {
    console.log("Create PSI clicked");
    // Placeholder for Create PSI functionality
  };

  const handleCreateEci = () => {
    console.log("Create ECI clicked");
    // Placeholder for Create ECI functionality
  };

  const handleComparePcs = () => {
    console.log("Compare PCS clicked");
    // Placeholder for Compare PCS functionality
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
    status,
    destCode,
    destCountry,
    cpsPsiEci,
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
    setStatus,
    setDestCode,
    setDestCountry,
    setCpsPsiEci,
  };

  return (
    <div className="container-fluid">
      <div className="card card-outline card-secondary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>CPS List</b></h3>
          <HeaderActions
            onNewCps={() => setShowNewCps(true)}
            onCreatePsi={handleCreatePsi}
            onCreateEci={handleCreateEci}
            onComparePcs={handleComparePcs}
          />
        </div>
        <div className="card-body">
          <SearchSection
            filters={filters}
            setters={setters}
            onSearch={handleSearch}
            onClear={handleClear}
            onPersonPicker={handlePersonPicker}
            destinations={DESTINATIONS}
          />
          <hr />
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