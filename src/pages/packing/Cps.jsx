import React, { useState, useEffect } from 'react';
import SearchSection from './cps/SearchSection';
import ResultSection from './cps/ResultSection';
import NewCPSModal from '../../components/NewCPSModal';
import PersonPickerModal from '../../components/PersonPickerModal';
import DESTINATIONS from '../../data/destinations.js';
import { cpsData as initialCpsData } from '../../data/cps.js';
import HeaderActions from './cps/HeaderActions';
import { cpsPageConfig, ROLES } from '../../config/cpsPageConfig.js';
import { useAuth } from '../../auth.jsx';

const Cps = () => {
  const { user } = useAuth();

  const getConfig = () => {
    if (user && user.department && user.role) {
      const departmentConfig = cpsPageConfig[user.department];
      if (departmentConfig && departmentConfig[user.role]) {
        return departmentConfig[user.role];
      }
    }
    // Fallback to a default config if no user or specific config found
    return cpsPageConfig.default;
  };
  const config = getConfig();

  const [cpsData, setCpsData] = useState(initialCpsData);
  const [filteredCps, setFilteredCps] = useState([]);
  const [showNewCps, setShowNewCps] = useState(false);
  const [editingCps, setEditingCps] = useState(null);
  const [showPersonPicker, setShowPersonPicker] = useState(false);
  const [personPickerTarget, setPersonPickerTarget] = useState(null);

  // Filter states
  const [cpsNo, setCpsNo] = useState('');
  const [refCpsNo, setRefCpsNo] = useState('');
  const [model, setModel] = useState('');
  const [partNo, setPartNo] = useState('');
  const [cfcPjt, setCfcPjt] = useState('');
  const [fromUser, setFromUser] = useState('');
  const [toUser, setToUser] = useState('');
  const [status, setStatus] = useState('');
  const [destCode, setDestCode] = useState('');
  const [destCountry, setDestCountry] = useState('');
  const [cpsPsiEci, setCpsPsiEci] = useState('');

  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 5
  });

  const handleClear = () => {
    setCpsNo('');
    setRefCpsNo('');
    setModel('');
    setPartNo('');
    setCfcPjt('');
    setFromUser('');
    setToUser('');
    setStatus('');
    setDestCode('');
    setDestCountry('');
    setCpsPsiEci('');
    setFilteredCps([]);
  };

  const handleSearch = (searchFilters) => {
    const filtersToUse = searchFilters || filters;
    const filtered = cpsData.filter(item => {
      return (
        (filtersToUse.cpsNo ? item.cpsNo.includes(filtersToUse.cpsNo) : true) &&
        (filtersToUse.refCpsNo ? item.refCpsNo.includes(filtersToUse.refCpsNo) : true) &&
        (filtersToUse.model ? item.model.toLowerCase().includes(filtersToUse.model.toLowerCase()) : true) &&
        (filtersToUse.partNo ? item.partNo.includes(filtersToUse.partNo) : true) &&
        (filtersToUse.cfcPjt ? item.cfcPjtCode.includes(filtersToUse.cfcPjt) : true) &&
        (filtersToUse.fromUser ? new Date(item.issuedDate) >= new Date(filtersToUse.fromUser) : true) &&
        (filtersToUse.toUser ? new Date(item.issuedDate) <= new Date(filtersToUse.toUser) : true) &&
        (filtersToUse.status ? item.status === filtersToUse.status : true) &&
        (filtersToUse.destCode ? item.destCode === filtersToUse.destCode : true) &&
        (filtersToUse.cpsPsiEci ? item.docType === filtersToUse.cpsPsiEci : true)
      );
    });

    setFilteredCps(filtered);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSave = (savedCps) => {
    let newCpsData;
    if (editingCps) {
      // Update existing CPS
      newCpsData = cpsData.map(item =>
        item.id === editingCps.id ? { ...item, ...savedCps } : item
      );
    } else {
      // Add new CPS
      const newId = cpsData.length > 0 ? Math.max(...cpsData.map(c => c.id)) + 1 : 1;
      newCpsData = [...cpsData, { ...savedCps, id: newId }];
    }
    setCpsData(newCpsData);
    setFilteredCps(newCpsData);
    setShowNewCps(false);
    setEditingCps(null);
  };

  const handleEdit = (cps) => {
    setEditingCps(cps);
    setShowNewCps(true);
  };

  const handleCloseModal = () => {
    setShowNewCps(false);
    setEditingCps(null);
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
    cpsNo, refCpsNo, model, partNo, cfcPjt, fromUser, toUser,
    status, destCode, destCountry, cpsPsiEci
  };

  const setters = {
    setCpsNo, setRefCpsNo, setModel, setPartNo, setCfcPjt, setFromUser, setToUser,
    setStatus, setDestCode, setDestCountry, setCpsPsiEci
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
            onSearch={() => handleSearch()}
            onClear={handleClear}
            onPersonPicker={handlePersonPicker}
            destinations={DESTINATIONS}
          />
          <hr />
          <ResultSection
            filteredCps={filteredCps}
            page={pagination.currentPage}
            perPage={pagination.perPage}
            setPage={(page) => setPagination(p => ({...p, currentPage: page}))}
            setPerPage={(perPage) => setPagination(p => ({...p, perPage: perPage}))}
            onEdit={handleEdit}
          />
        </div>
      </div>
      <NewCPSModal
        show={showNewCps}
        onClose={handleCloseModal}
        onSave={handleSave}
        editData={editingCps}
        config={config}
      />
      {showPersonPicker && (
        <PersonPickerModal
          show={showPersonPicker}
          onClose={() => setShowPersonPicker(false)}
          onSelect={(person) => {
            if (personPickerTarget === 'from') {
              // logic for "from"
            } else if (personPickerTarget === 'to') {
              // logic for "to"
            }
            setShowPersonPicker(false);
          }}
        />
      )}
    </div>
  );
}

export default Cps;