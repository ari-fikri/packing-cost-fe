import React, { useState } from 'react';
import NewDpiModal from '../../components/NewDpiModal';
import { dpiData } from '../../data/dpi.json';
import SearchSection from './dpi/SearchSection';
import ResultSection from './dpi/ResultSection';
import ActionHeaderButtons from './dpi/ActionHeaderButtons';
import PartPickerModal from '../../components/PartPickerModal';
import ColumnSelectionModal from '../../components/ColumnSelectionModal';

export default function DPI() {
  // filter fields
  const [modelCode, setModelCode] = useState('');
  const [destCode, setDestCode] = useState('');
  const [partNo, setPartNo] = useState([]);
  const [supplierCode, setSupplierCode] = useState('');
  const [cpsNo, setCpsNo] = useState('');
  const [implementationPeriod, setImplementationPeriod] = useState('');

  // modal state
  const [showNewDpi, setShowNewDpi] = useState(false);
  const [showPartPicker, setShowPartPicker] = useState(false);
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  // column visibility - This will be wired up later
  // const [visibleColumns, setVisibleColumns] = useState(() => getInitialVisibility(columnsConfig, initialVisibleColumns));

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
    if (partNo && partNo.length > 0) {
      const lowerCasePartNos = partNo.map(pn => pn.toLowerCase());
      filteredData = filteredData.filter(item =>
        lowerCasePartNos.includes(item.part_no?.toLowerCase()) ||
        lowerCasePartNos.includes(item.cps?.part_no?.toLowerCase())
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

  function handlePartPicked(parts) {
    if (parts && parts.length > 0) {
      const newPartNumbers = parts.map(p => p.partNo);
      setPartNo(prev => [...new Set([...prev, ...newPartNumbers])]);
    }
    setShowPartPicker(false);
  }

  function handleClear() {
    setModelCode('');
    setDestCode('');
    setPartNo([]);
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

  function handleToggleColumnSelector() {
    setShowColumnSelector(prev => !prev);
  }

  function handleViewDpi() {
    const newWindow = window.open('', '_blank', 'fullscreen=yes');
    newWindow.document.write('<html><head><title>DPI View</title>');
    newWindow.document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />');
    newWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">');
    newWindow.document.write('</head><body>');
    newWindow.document.write('<button id="download-pdf">Download PDF</button>');
    newWindow.document.write('<button id="download-csv">Download CSV</button>');
    newWindow.document.write('<div id="dpi-content" class="card card-outline card-primary"></div>');
    newWindow.document.write('</body></html>');
    newWindow.document.close();

    const content = document.getElementById('result-section').innerHTML;
    const dpiContent = newWindow.document.getElementById('dpi-content');
    if (dpiContent) {
      dpiContent.innerHTML = content;
    }

    newWindow.document.getElementById('download-pdf').addEventListener('click', () => newWindow.print());

    newWindow.document.getElementById('download-csv').addEventListener('click', () => {
      const table = dpiContent.querySelector('table');
      let csv = [];
      for (const row of table.rows) {
        const rowData = [];
        for (const cell of row.cells) {
          rowData.push(cell.innerText);
        }
        csv.push(rowData.join(','));
      }
      const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'dpi_data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  function goToPage(p) {
    const p2 = Math.min(Math.max(1, p), totalPages);
    setPage(p2);
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
    partNo,
    supplierCode,
    cpsNo,
    implementationPeriod
  };

  const searchSetters = {
    setModelCode,
    setDestCode,
    setPartNo,
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
            onToggleColumnSelector={handleToggleColumnSelector}
            viewDpiDisabled={rows.length === 0}
          />
        </div>

        <SearchSection
          filters={searchFilters}
          setters={searchSetters}
          onSearch={handleSearch}
          onClear={handleClear}
          onPartSearch={() => setShowPartPicker(true)}
        />

        <div id="result-section">
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
      </div>

      <NewDpiModal
        show={showNewDpi}
        onClose={() => setShowNewDpi(false)}
        onSave={handleSaveNewDpi}
        onSubmit={handleSubmitNewDpi}
      />

      <PartPickerModal
        show={showPartPicker}
        onClose={() => setShowPartPicker(false)}
        onSelect={handlePartPicked}
        mode="multi"
      />

      <ColumnSelectionModal
        isOpen={showColumnSelector}
        toggle={handleToggleColumnSelector}
      />
    </div>
  );
}