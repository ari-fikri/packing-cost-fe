// src/pages/Parts.jsx
import React, { useState, useEffect } from 'react'
import NewPartModal from '../components/NewPartModal' // make sure this file exists
import PartPickerModal from '../components/PartPickerModal' // wired picker
import ConfirmationDialog from '../components/ConfirmationDialog';
import partsData from '../data/parts'

// Transform the raw parts data into a more usable format
const transformedParts = partsData.map((part, index) => ({
  id: index,
  partNo: part[0],
  name: part[1],
  supplierName: part[2],
  // Add other fields with default values if they don't exist in the raw data
  suffix: 'A',
  uniqueNo: `UN-00${index + 1}`,
  parentPartNo: null,
  childParts: [],
  dimensions: { L: 10, W: 10, H: 10 },
  qtyBox: 1,
  totalWeight: 1,
}));


export default function Parts() {
  // filter fields
  const [partNo, setPartNo] = useState('')
  const [uniqueNo, setUniqueNo] = useState('')
  const [supplierId, setSupplierId] = useState('')
  const [supplierName, setSupplierName] = useState('')
  const [parentPart, setParentPart] = useState('')
  const [hasSubparts, setHasSubparts] = useState('')

  // parts list (table)
  const [parts, setParts] = useState([]) // initially empty
  const [filteredParts, setFilteredParts] = useState([]);


  // modal state
  const [showNewPartModal, setShowNewPartModal] = useState(false)
  const [editingPart, setEditingPart] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [partToDelete, setPartToDelete] = useState(null);


  // Part picker state
  const [showPartPicker, setShowPartPicker] = useState(false)
  // which field opened the picker: \'partNo\' | \'parentPart\' — used in onSelect
  const [pickerTarget, setPickerTarget] = useState(null)

  // pagination placeholders
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const total = filteredParts.length;


  useEffect(() => {
    setParts(transformedParts);
    setFilteredParts([]);
  }, []);


  // actions
  function handleSearch() {
    const noFilters = !partNo && !uniqueNo && !supplierId && !supplierName && !parentPart && !hasSubparts;

    if (noFilters) {
      setFilteredParts([...parts].reverse());
      setPage(1);
      return;
    }

    let filtered = parts.filter(p => {
      const partNoMatch = !partNo || p.partNo.toLowerCase().includes(partNo.toLowerCase());
      const uniqueNoMatch = !uniqueNo || (p.uniqueNo && p.uniqueNo.toLowerCase().includes(uniqueNo.toLowerCase()));
      const supplierIdMatch = !supplierId || (p.supplierId && p.supplierId.toLowerCase().includes(supplierId.toLowerCase()));
      const supplierNameMatch = !supplierName || p.supplierName.toLowerCase().includes(supplierName.toLowerCase());
      const parentPartMatch = !parentPart || (p.parentPartNo && p.parentPartNo.toLowerCase().includes(parentPart.toLowerCase()));
      const hasSubpartsMatch = !hasSubparts || (hasSubparts === 'Yes' && p.childParts && p.childParts.length > 0) || (hasSubparts === 'No' && (!p.childParts || p.childParts.length === 0));
      return partNoMatch && uniqueNoMatch && supplierIdMatch && supplierNameMatch && parentPartMatch && hasSubpartsMatch;
    });

    setFilteredParts(filtered);
    setPage(1);
  }

  function handleClear() {
    setPartNo('')
    setUniqueNo('')
    setSupplierId('')
    setSupplierName('')
    setParentPart('')
    setHasSubparts('')
    setFilteredParts([]);
    setPage(1);
  }

  function handleAddPart() {
    setEditingPart(null)
    setShowNewPartModal(true)
  }
  function handleCloseNewPart() {
    setEditingPart(null)
    setShowNewPartModal(false)
  }
  function handleSaveNewPart(payload) {
    if (editingPart) {
      // Update existing part
      const updatedParts = parts.map(p => p.id === editingPart.id ? { ...p, ...payload } : p)
      setParts(updatedParts)
      const updatedFilteredParts = filteredParts.map(p => p.id === editingPart.id ? { ...p, ...payload } : p)
      setFilteredParts(updatedFilteredParts)
    } else {
      // Add new part
      const newPart = { ...payload, id: parts.length }
      setParts(prev => [newPart, ...prev])
    }
    setShowNewPartModal(false)
    setEditingPart(null)
  }

  function handleEdit(part) {
    setEditingPart(part)
    setShowNewPartModal(true)
  }

  function handleUpload() {
    alert('Upload placeholder')
  }
  function handleTemplate() {
    alert('Template placeholder')
  }

  function handleDelete(part) {
    setPartToDelete(part);
    setShowConfirmDialog(true);
  }

  function confirmDelete() {
    if (partToDelete) {
      const updatedParts = parts.filter(p => p.id !== partToDelete.id);
      setParts(updatedParts);
      const updatedFilteredParts = filteredParts.filter(p => p.id !== partToDelete.id);
      setFilteredParts(updatedFilteredParts);
      setPartToDelete(null);
    }
    setShowConfirmDialog(false);
  }

  // simple pagination controls (visual placeholders)
  function goToPage(p) {
    setPage(p)
  }

  // --- Part picker helpers ---
  // open picker for a particular target field
  function openPartPickerFor(target) {
    setPickerTarget(target) // 'partNo' or 'parentPart'
    setShowPartPicker(true)
  }

  // called when PartPickerModal returns selection(s)
  // PartPickerModal may return array of selected parts or single object;
  // we pick the first selection and populate the input for the pickerTarget.
  function handlePartPicked(selected) {
    if (!selected) {
      setShowPartPicker(false)
      setPickerTarget(null)
      return
    }

    // if array, pick the first item
    const item = Array.isArray(selected) ? selected[0] : selected

    if (!item) {
      setShowPartPicker(false)
      setPickerTarget(null)
      return
    }

    // Normalize keys commonly used in your codebase
    const chosenPartNo = item.partNo ?? item.part_number ?? item.code ?? ''
    const chosenParent = item.partNo ?? item.partNoParent ?? item.parentPartNo ?? ''

    if (pickerTarget === 'partNo') {
      setPartNo(chosenPartNo)
    } else if (pickerTarget === 'parentPart') {
      // some pickers return parent id/partNo in different fields — use best effort
      setParentPart(chosenParent || chosenPartNo)
    }

    // Optionally fill other quick fields (supplier etc.) if you want:
    // if (item.supplierName) setSupplierName(item.supplierName)
    // if (item.supplierId) setSupplierId(item.supplierId)

    // close picker and reset target
    setShowPartPicker(false)
    setPickerTarget(null)
  }

  return (
    <div className="container-fluid">
      <div className="card card-outline card-primary">
        {/* header toolbar */}
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Part List</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleAddPart}>
              <i className="fas fa-file mr-1" /> Add Part
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary mr-1" onClick={handleUpload} title="Upload">
              <i className="fas fa-cloud-upload-alt" />
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleTemplate} title="Template">
              <i className="fas fa-cloud-download-alt" />
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Filters — full width rows */}
          <div className="row">
            {/* Row 1: Part No + Unique No */}
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Part No</label>
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-sm"
                    value={partNo}
                    onChange={e => setPartNo(e.target.value)}
                    placeholder="Part No"
                  />
                  <div className="input-group-append">
                    {/* open part picker for Part No */}
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      title="Pick Part"
                      onClick={() => openPartPickerFor('partNo')}
                    >
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Unique No</label>
                <input
                  className="form-control form-control-sm"
                  value={uniqueNo}
                  onChange={e => setUniqueNo(e.target.value)}
                  placeholder="Unique No"
                />
              </div>
            </div>
          </div>

          <div className="row">
            {/* Row 2: Supplier ID + Supplier Name */}
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Supplier ID</label>
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-sm"
                    value={supplierId}
                    onChange={e => setSupplierId(e.target.value)}
                    placeholder="Supplier ID"
                  />
                  <div className="input-group-append">
                    <button type="button" className="btn btn-outline-secondary btn-sm" title="Search Supplier" onClick={() => alert('search supplier placeholder')}>
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Supplier Name</label>
                <input
                  className="form-control form-control-sm"
                  value={supplierName}
                  onChange={e => setSupplierName(e.target.value)}
                  placeholder="Supplier Name"
                />
              </div>
            </div>
          </div>

          <div className="row">
            {/* Row 3: Parent Part + Has Subparts */}
            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Parent Part</label>
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-sm"
                    value={parentPart}
                    onChange={e => setParentPart(e.target.value)}
                    placeholder="Parent Part"
                  />
                  <div className="input-group-append">
                    {/* open part picker for Parent Part */}
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      title="Pick Parent Part"
                      onClick={() => openPartPickerFor('parentPart')}
                    >
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label className="small mb-1">Has Subparts?</label>
                <select className="form-control form-control-sm" value={hasSubparts} onChange={e => setHasSubparts(e.target.value)}>
                  <option value="">—</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* Row 4: Search + Clear */}
          <div className="row mb-3">
            <div className="col-12 text-right">
              <button type="button" className="btn btn-sm btn-primary mr-2" onClick={handleSearch}>
                <i className="fas fa-search mr-1" /> Search
              </button>
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={handleClear}>
                <i className="fas fa-times mr-1" /> Clear
              </button>
            </div>
          </div>

          {/* Row 5: Table full width */}
          <div className="table-responsive mb-3">
            <table className="table table-striped table-sm mb-0">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>#</th>
                  <th>Part No</th>
                  <th>Suffix</th>
                  <th>Unique No</th>
                  <th>Name</th>
                  <th>Supplier Name</th>
                  <th>Parent Part No</th>
                  <th>Subparts</th>
                  <th>L</th>
                  <th>W</th>
                  <th>H</th>
                  <th>Qty/Box</th>
                  <th>Total Wt</th>
                  <th style={{ width: 110 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredParts.length === 0 ? (
                  <tr>
                    <td colSpan="14" className="text-center py-4 text-muted">No Data Found</td>
                  </tr>
                ) : (
                  filteredParts.slice((page - 1) * perPage, page * perPage).map((p, i) => (
                    <tr key={i}>
                      <td>{(page - 1) * perPage + i + 1}</td>
                      <td>{p.partNo}</td>
                      <td>{p.suffixCode ?? p.suffix}</td>
                      <td>{p.uniqueNo}</td>
                      <td>{p.partName ?? p.name}</td>
                      <td>{p.supplierName}</td>
                      <td>{p.parentPartNo ?? p.parent}</td>
                      <td>{p.childParts ? p.childParts.length : (p.subparts ? p.subparts.length : 0)}</td>
                      <td>{p.dimensions?.L ?? p.L}</td>
                      <td>{p.dimensions?.W ?? p.W}</td>
                      <td>{p.dimensions?.H ?? p.H}</td>
                      <td>{p.qtyBox ?? p.qty}</td>
                      <td>{p.totalWeight ?? p.totalWt}</td>
                      <td>
                        <button type="button" className="btn btn-sm btn-outline-primary mr-1" onClick={() => handleEdit(p)}>
                          <i className="fas fa-pencil-alt" />
                        </button>
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p)}>
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Row 6: Pagination */}
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(1)}>{'<<'}</button>
              <button type="button" className="btn btn-sm btn-light mr-1" onClick={() => goToPage(Math.max(1, page - 1))}>{'<'}</button>

              {/* simple numeric pages (visual) */}
              {[...Array(Math.max(1, Math.ceil(total / perPage))).keys()].map(n => (
                <button
                  key={n}
                  type="button"
                  className={`btn btn-sm mr-1 ${page === n + 1 ? 'btn-primary' : 'btn-light'}`}
                  onClick={() => goToPage(n + 1)}
                >
                  {n + 1}
                </button>
              ))}

              <button type="button" className="btn btn-sm btn-light ml-2" onClick={() => goToPage(Math.min(Math.ceil(total / perPage) || 1, page + 1))}>{'>'}</button>
            </div>

            <div className="form-inline small">
              <span className="mr-3">Total: {total}</span>
              <div className="dropdown mr-2">
                <button className="btn btn-sm btn-light dropdown-toggle" type="button" data-toggle="dropdown">
                  {perPage} per page
                </button>
                <div className="dropdown-menu">
                  <button className="dropdown-item" type="button" onClick={() => setPerPage(10)}>10</button>
                  <button className="dropdown-item" type="button" onClick={() => setPerPage(25)}>25</button>
                  <button className="dropdown-item" type="button" onClick={() => setPerPage(50)}>50</button>
                </div>
              </div>
              <i className="fas fa-chevron-down" />
            </div>
          </div>
        </div>
      </div>

      {/* New Part Modal */}
      <NewPartModal
        show={showNewPartModal}
        onClose={handleCloseNewPart}
        onSave={handleSaveNewPart}
        initialData={editingPart}
      />

      <ConfirmationDialog
        show={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={confirmDelete}
        title="Deletion Confirmation"
        message="Do you want to delete this data?"
      />

      {/* Part Picker Modal — shared for Part No and Parent Part */}
      <PartPickerModal
        show={showPartPicker}
        onClose={() => { setShowPartPicker(false); setPickerTarget(null); }}
        onSelect={handlePartPicked}
      />
    </div>
  )
}