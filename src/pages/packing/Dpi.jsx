import React, { useState } from 'react';
import NewDpiModal from '../../components/NewDpiModal';
import { dpiData } from '../../data/dpi.json';
import SearchSection from './dpi/SearchSection';
import ResultSection from './dpi/ResultSection';
import ActionHeaderButtons from './dpi/ActionHeaderButtons';

export default function DPI() {
  // filter fields
  const [modelCode, setModelCode] = useState('');
  const [destCode, setDestCode] = useState('');
  const [supplierCode, setSupplierCode] = useState('');
  const [cpsNo, setCpsNo] = useState('');
  const [implementationPeriod, setImplementationPeriod] = useState('');

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
    let filteredData = [...dpiData];
    
    // Apply filters
    if (modelCode) {
      filteredData = filteredData.filter(item => 
        item.model_code?.toLowerCase().includes(modelCode.toLowerCase())
      );
    }
    if (destCode) {
      filteredData = filteredData.filter(item => 
        item.cps.model.destination.code?.toLowerCase().includes(destCode.toLowerCase())
      );
    }
    if (supplierCode) {
      filteredData = filteredData.filter(item => 
        item.cps.supplier.supplier_code?.toLowerCase().includes(supplierCode.toLowerCase())
      );
    }
    if (cpsNo) {
      filteredData = filteredData.filter(item => 
        item.cps.cps_no?.toLowerCase().includes(cpsNo.toLowerCase())
      );
    }
    if (implementationPeriod) {
      filteredData = filteredData.filter(item => 
        item.implementation_period?.toLowerCase().includes(implementationPeriod.toLowerCase())
      );
    }

    // Sort by implementation period
    const sortedData = filteredData.sort((a, b) => 
      (b.implementation_period || '').localeCompare(a.implementation_period || '')
    );
    
    setRows(sortedData);
    setPage(1);
  }

  function handleClear() {
    setModelCode('');
    setDestCode('');
    setSupplierCode('');
    setCpsNo('');
    setImplementationPeriod('');
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

  function handleViewDpi() {
    alert('View DPI placeholder');
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
    modelCode,
    destCode,
    supplierCode,
    cpsNo,
    implementationPeriod
  };

  const searchSetters = {
    setModelCode,
    setDestCode,
    setSupplierCode,
    setCpsNo,
    setImplementationPeriod
  };

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>DPI List</b></h3>
          <ActionHeaderButtons
            onViewDpi={handleViewDpi}
            onUpload={handleUpload}
            onTemplate={handleTemplate}
            onCreateDpi={handleCreateDpi}
            onCreatePci={handleCreatePci}
          />
        </div>

        <SearchSection
          filters={searchFilters}
          setters={searchSetters}
          onSearch={handleSearch}
          onClear={handleClear}
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