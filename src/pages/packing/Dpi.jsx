import React, { useState, useEffect } from 'react';
import NewDpiModal from '../../components/NewDpiModal';
import SearchSection from './dpi/SearchSection';
import ResultSection from './dpi/ResultSection';
import ActionHeaderButtons from './dpi/ActionHeaderButtons';
import ModelPickerModal from '../../components/ModelPickerModal';
import ColumnSelectionModal from '../../components/ColumnSelectionModal';
import PartPickerModal from '../../components/PartPickerModal';
import DestinationPickerModal from '../../components/DestinationPickerModal';
import SupplierPickerModal from '../../components/SupplierPickerModal';

export default function DPI() {
  // filter fields
  const [modelCfc, setModelCfc] = useState('');
  const [destCode, setDestCode] = useState('');
  const [partNo, setPartNo] = useState([]);
  const [supplierCode, setSupplierCode] = useState('');
  const [cpsNo, setCpsNo] = useState('');
  const [implementationPeriod, setImplementationPeriod] = useState('');

  // modal state
  const [showNewDpi, setShowNewDpi] = useState(false);
  const [showPartPicker, setShowPartPicker] = useState(false);
  const [showModelPicker, setShowModelPicker] = useState(false);
  const [showDpiPicker, setShowDpiPicker] = useState(false);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [showDestinationPicker, setShowDestinationPicker] = useState(false);
  const [showSupplierPicker, setShowSupplierPicker] = useState(false);

  const [checked, setChecked] = useState([
    'main_info', 'destination', 'model', 'impl_period', 'cps_no',
    'part_info', 'part_no_part', 'part_name', 'parent_part', 'supplier_code', 'supplier_name',
    'part_status', 'dtl_part_status', 'pack_spec_status', 'weight_pc', 'qty_box',
    'pse_info', 'packing_plant', 'packing_plant_current', 'packing_plant_next',
    'vanning_plant', 'vanning_plant_current', 'vanning_plant_next', 'order_pattern',
    'order_pattern_current', 'order_pattern_next', 'katashiiki', 'importer_line_process', 'case_code', 'box_number',
    'renban', 'renban_eff', 'packing_process', 'packing_process_boxing', 'packing_process_stacking',
    'logistic_info', 'dock_code', 'address', 'process_type',
    'images', 'part_image', 'packing_image', 'outer_image', 'qkp_image', 'bkp_image'
  ]);

  // table data
  const [rows, setRows] = useState([]);
  const [dpiData, setDpiData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // paging
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  useEffect(() => {
    const dpiUrl = `${import.meta.env.BASE_URL}dpi.json`;
    fetch(dpiUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        const allRows = data.dpiData || [];
        // Sort data initially
        const sortedData = [...allRows].sort((a, b) =>
          (b.implementation_period || '').localeCompare(a.implementation_period || '')
        );
        setDpiData(sortedData);
        setRows([]); // Set rows to empty to prevent initial load
        setHasSearched(false);
      })
      .catch(error => {
        console.error('Error fetching DPI data:', error);
      });
  }, []);

  function handleSearch() {
    setHasSearched(true);
    const noFilters = !modelCfc && (!partNo || partNo.length === 0) && !destCode && !supplierCode && !cpsNo && !implementationPeriod;

    if (noFilters) {
      setRows(dpiData);
      setPage(1);
      return;
    }

    console.log("Filtering with modelCfc:", modelCfc); // Add this line
    let filteredData = [...dpiData];
    // debugger;
    // Apply filters
    if (modelCfc) {
      filteredData = filteredData.filter(item =>
        item.model_cfc?.toLowerCase().includes(modelCfc.toLowerCase())
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
        item.cps?.model?.destination?.code?.toLowerCase().includes(destCode.toLowerCase())
      );
    }
    if (supplierCode) {
      filteredData = filteredData.filter(item =>
        item.cps?.supplier?.supplier_code?.toLowerCase().includes(supplierCode.toLowerCase())
      );
    }
    if (cpsNo) {
      filteredData = filteredData.filter(item =>
        item.cps?.cps_no?.toLowerCase().includes(cpsNo.toLowerCase())
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
    setHasSearched(false);
  }

  function handleModelPicked(model) {
    if (model && model.model_cfc) {
      setModelCfc(model.model_cfc);
    }
    setShowModelPicker(false);
  }

  function handleDestinationPicked(destination) {
    if (destination) {
      setDestCode(destination.destCode);
    }
    setShowDestinationPicker(false);
  }

  function handleSupplierPicked(supplier) {
    if (supplier) {
      setSupplierCode(supplier.code);
    }
    setShowSupplierPicker(false);
  }

  function handleDpiPicked(dpi) {
    if (dpi) {
      setCpsNo(dpi.cps_no);
    }
    setShowDpiPicker(false);
  }

  function handlePartPicked(parts) {
    if (parts && parts.length > 0) {
      const newPartNumbers = parts.map(p => p.partNo);
      setPartNo(prev => [...new Set([...prev, ...newPartNumbers])]);
    }
    setShowPartPicker(false);
  }

  function handleClear() {
    setModelCfc('');
    setDestCode('');
    setPartNo([]);
    setSupplierCode('');
    setCpsNo('');
    setImplementationPeriod('');
    setRows(dpiData);
    setPage(1);
    setHasSearched(false);
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

  function handleColumnSelectionChange(newChecked) {
    setChecked(newChecked);
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
    modelCfc,
    destCode,
    partNo,
    supplierCode,
    cpsNo,
    implementationPeriod
  };

  const searchSetters = {
    setModelCfc,
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
          onModelSearch={() => setShowModelPicker(true)}
          onDpiSearch={() => setShowDpiPicker(true)}
          onSearchDestination={() => setShowDestinationPicker(true)}
          onSearchSupplier={() => setShowSupplierPicker(true)}
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
            checked={checked}
            hasSearched={hasSearched}
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

      <ModelPickerModal
        show={showModelPicker}
        onClose={() => setShowModelPicker(false)}
        onAdd={handleModelPicked}
        selectionMode="single"
      />

      <DestinationPickerModal
        show={showDestinationPicker}
        onClose={() => setShowDestinationPicker(false)}
        onAdd={handleDestinationPicked}
        selectionMode="single"
      />

      <SupplierPickerModal
        show={showSupplierPicker}
        onClose={() => setShowSupplierPicker(false)}
        onSelect={handleSupplierPicked}
        mode="single"
      />

      <ColumnSelectionModal
        isOpen={showColumnSelector}
        toggle={handleToggleColumnSelector}
        checked={checked}
        onCheckedChange={handleColumnSelectionChange}
      />
    </div>
  );
}