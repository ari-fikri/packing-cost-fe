import React, { useState } from 'react';
import NewDpiModal from '../../components/NewDpiModal';
import { dpiData } from '../../data/dpi.json';
import SearchSection from './dpi/SearchSection';
import ResultSection from './dpi/ResultSection';
import ActionHeaderButtons from './dpi/ActionHeaderButtons';

export default function DPI() {
  // filter fields
  const [dpiNo, setDpiNo] = useState('');
  const [refDpiNo, setRefDpiNo] = useState('');
  const [model, setModel] = useState('');
  const [cfcPjt, setCfcPjt] = useState('');
  const [fromUser, setFromUser] = useState('');
  const [toUser, setToUser] = useState('');
  const [issuedFrom, setIssuedFrom] = useState('');
  const [issuedTo, setIssuedTo] = useState('');
  const [effectiveFrom, setEffectiveFrom] = useState('');
  const [effectiveTo, setEffectiveTo] = useState('');
  
  const STATUS_OPTIONS = ['Draft', 'Submitted', 'Rejected', 'Approved'];
  const [statuses, setStatuses] = useState([]);

  // modal state
  const [showNewDpi, setShowNewDpi] = useState(false);

  // table data
  const [rows, setRows] = useState([]);

  // paging
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  function handleSearch() {
    const sortedData = [...dpiData].sort((a, b) => b.implementation_period.localeCompare(a.implementation_period));
    setRows(sortedData);
    setPage(1);
  }

  function handleClear() {
    setDpiNo('');
    setRefDpiNo('');
    setModel('');
    setCfcPjt('');
    setFromUser('');
    setToUser('');
    setIssuedFrom('');
    setIssuedTo('');
    setEffectiveFrom('');
    setEffectiveTo('');
    setStatuses([]);
    setRows([]);
    setPage(1);
  }

  // actions
  function handleCreateDpi() {
    setShowNewDpi(true);
  }
  function handleCreatePci() {
    alert('Create PCI - placeholder');
  }
  function handleUpload() {
    alert('Upload placeholder');
  }
  function handleTemplate() {
    alert('Download template placeholder');
  }

  function goToPage(p) {
    const p2 = Math.min(Math.max(1, p), totalPages);
    setPage(p2);
  }

  function toggleStatus(status) {
    setStatuses(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
  }

  // slice rows for current page
  const visibleRows = rows.slice((page - 1) * perPage, page * perPage);

  function handleSaveNewDpi(payload) {
    const newRow = {
      dpiNo: payload.dpiNo || '',
      refDpiNo: payload.refDpiNo || '',
      issuedDate: payload.issuedDate || '',
      effectiveDate: payload.effectiveDate || '',
      cfcPjt: payload.cfcPjt || '',
      model: payload.model || '',
      parts: payload.parts || [],
      numCps: payload.numCps || 0,
      supplier: payload.supplier || '',
      fromUser: payload.from || '',
      toUser: payload.to || '',
      status: 'Draft',
      raw: payload,
    };
    setRows(prev => [newRow, ...prev]);
    setShowNewDpi(false);
    setPage(1);
  }

  function handleSubmitNewDpi(payload) {
    const newRow = {
      dpiNo: payload.dpiNo || '',
      refDpiNo: payload.refDpiNo || '',
      issuedDate: payload.issuedDate || '',
      effectiveDate: payload.effectiveDate || '',
      cfcPjt: payload.cfcPjt || '',
      model: payload.model || '',
      parts: payload.parts || [],
      numCps: payload.numCps || 0,
      supplier: payload.supplier || '',
      fromUser: payload.from || '',
      toUser: payload.to || '',
      status: 'Submitted',
      raw: payload,
    };
    setRows(prev => [newRow, ...prev]);
    setShowNewDpi(false);
    setPage(1);
  }

  const searchFilters = {
    dpiNo, refDpiNo, model, cfcPjt, fromUser, toUser, issuedFrom, issuedTo, effectiveFrom, effectiveTo
  };

  const searchSetters = {
    setDpiNo, setRefDpiNo, setModel, setCfcPjt, setFromUser, setToUser, setIssuedFrom, setIssuedTo, setEffectiveFrom, setEffectiveTo
  };

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>DPI List</b></h3>
          <ActionHeaderButtons
            onUpload={handleUpload}
            onTemplate={handleTemplate}
            onCreateDpi={handleCreateDpi}
            onCreatePci={handleCreatePci}
          />
        </div>

        <SearchSection
          filters={searchFilters}
          setters={searchSetters}
          statuses={statuses}
          toggleStatus={toggleStatus}
          onSearch={handleSearch}
          onClear={handleClear}
          STATUS_OPTIONS={STATUS_OPTIONS}
        />

        <ResultSection
          rows={rows}
          visibleRows={visibleRows}
          page={page}
          perPage={perPage}
          total={total}
          totalPages={totalPages}
          goToPage={goToPage}
          setPerPage={setPerPage}
        />
      </div>

      <NewDpiModal
        show={showNewDpi}
        onClose={() => setShowNewDpi(false)}
        onSave={handleSaveNewDpi}
        onSubmit={handleSubmitNewDpi}
      />
    </div>
  );
}