// === NEW MODEL MODAL COMPONENT ===
// Modal component for creating and editing model information with parts management
// Includes destination code auto-population functionality

import React, { useState, useEffect } from 'react'
import PartPickerModal from '../components/PartPickerModal'   // Part selection modal component
import DESTINATIONS from '../data/destinations'               // Destination lookup data

export default function NewModelModal({ 
  show,        // Boolean: Controls modal visibility
  onClose,     // Function: Callback to close modal
  onSave,      // Function: Callback to save model data
  initialData  // Object: Initial data for editing existing model
}) {
  // === FORM FIELD STATE VARIABLES ===
  // Basic Model Information Fields
  const [newCode, setNewCode] = useState('')                          // Model code input
  const [newName, setNewName] = useState('')                          // Model name input
  const [newRemark, setNewRemark] = useState('')                      // Model remark/description input
  
  // Implementation and Destination Fields
  const [implementationPeriod, setImplementationPeriod] = useState('') // Implementation period input
  const [destinationCode, setDestinationCode] = useState('')          // Destination code input (triggers auto-population)
  const [destinationCountryCode, setDestinationCountryCode] = useState('') // Auto-populated country code (read-only)
  const [country, setCountry] = useState('')                          // Auto-populated country name (read-only)

  // === PARTS MANAGEMENT STATE ===
  const [parts, setParts] = useState([])                             // Array of selected parts for this model
  const [showPartPicker, setShowPartPicker] = useState(false)        // Boolean: Controls part picker modal visibility

  // === FORM INITIALIZATION EFFECT ===
  // Initialize form data when modal is shown or initialData changes
  useEffect(() => {
    if (show) {
      if (initialData) {
        // === EDIT MODE: Populate form with existing data ===
        setNewCode(initialData.code || '')                              // Set existing model code
        setNewName(initialData.name || '')                              // Set existing model name
        setNewRemark(initialData.remark || '')                          // Set existing model remark
        setImplementationPeriod(initialData.implementationPeriod || '') // Set existing implementation period
        setDestinationCode(initialData.destinationCode || '')           // Set existing destination code
        setDestinationCountryCode(initialData.destinationCountryCode || '') // Set existing country code
        setCountry(initialData.country || '')                           // Set existing country
        setParts(initialData.parts || [])                               // Set existing parts array
      } else {
        // === NEW MODE: Clear all form fields ===
        setNewCode('')                                                   // Clear model code
        setNewName('')                                                   // Clear model name
        setNewRemark('')                                                 // Clear model remark
        setImplementationPeriod('')                                      // Clear implementation period
        setDestinationCode('')                                           // Clear destination code
        setDestinationCountryCode('')                                    // Clear country code
        setCountry('')                                                   // Clear country
        setParts([])                                                     // Clear parts array
      }
      setShowPartPicker(false)                                           // Always close part picker when modal opens
    }
  }, [show, initialData])

  // === EVENT HANDLER FUNCTIONS ===
  
  // Handler: Open part picker modal
  function handleAddPartClick() {
    setShowPartPicker(true)                                              // Show part picker modal
  }

  // Handler: Process selected parts from part picker
  function handlePartPicked(selectedParts) {
    // selectedParts is an array of part objects from the part picker
    setParts(prev => [...prev, ...selectedParts])                       // Add selected parts to existing parts array
    setShowPartPicker(false)                                             // Close part picker modal
  }

  // Handler: Remove specific part from parts array
  function handleRemovePart(idx) {
    setParts(prev => prev.filter((_, i) => i !== idx))                   // Remove part at specified index
  }

  // Handler: Destination code change with auto-population logic
  function handleDestinationCodeChange(value) {
    setDestinationCode(value)                                            // Set the destination code input value
    // Look up destination details from DESTINATIONS data
    const destination = DESTINATIONS.find(dest => dest.destCode === value)
    if (destination) {
      // Auto-populate related fields if destination found
      setDestinationCountryCode(destination.code)                        // Set 3-character country code
      setCountry(destination.country)                                     // Set full country name
    } else {
      // Clear related fields if destination not found
      setDestinationCountryCode('')                                       // Clear country code
      setCountry('')                                                      // Clear country name
    }
  }

  // Handler: Save model data with validation
  function handleSaveModel() {
    // Validation: Check if model code is provided
    if (!newCode.trim()) {
      alert('Please enter Model Code')                                    // Show validation error
      return                                                              // Exit function if validation fails
    }
    
    // Create payload object with all form data
    const payload = {
      code: newCode,                                                      // Model code
      name: newName,                                                      // Model name
      remark: newRemark,                                                  // Model remark
      implementationPeriod,                                               // Implementation period
      destinationCode,                                                    // Destination code
      destinationCountryCode,                                             // Auto-populated country code
      country,                                                            // Auto-populated country name
      parts: parts.slice(),                                               // Copy of parts array
    }
    console.log('Saving model:', payload)                                 // Debug log
    onSave(payload)                                                       // Call parent save callback
  }

  // === CONDITIONAL RENDERING ===
  // Return null if modal should not be displayed
  if (!show) return null

  // === MAIN COMPONENT RENDER ===
  return (
    <div className="np-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      {/* Modal Container */}
      <div className="np-modal card card-outline card-success" style={{ maxWidth: 980 }}>
        
        {/* === MODAL HEADER SECTION === */}
        <div className="card-header d-flex align-items-center">
          {/* Modal Title - Dynamic based on edit/new mode */}
          <h3 className="card-title mb-0">
            <b>Model - {initialData ? 'Edit' : 'New'}</b>
          </h3>
          {/* Visual Separator */}
          <div className="ml-2 text-muted small" style={{ marginLeft: 8 }}>|</div>
          {/* Close Button */}
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-tool" onClick={onClose}><i className="fas fa-times" /></button>
          </div>
        </div>

        {/* === MODAL BODY SECTION === */}
        <div className="card-body">
          {/* === FORM FIELDS SECTION === */}
          {/* Row 1: Basic Model Information */}
          <div className="row">
            {/* Model Code Input - Left Column */}
            <div className="col-md-6">
              <label className="small">Code</label>
              <input className="form-control form-control-sm mb-2" value={newCode} onChange={e => setNewCode(e.target.value)} placeholder="Model Code" />
            </div>
            {/* Model Name Input - Right Column */}
            <div className="col-md-6">
              <label className="small">Name</label>
              <input className="form-control form-control-sm mb-2" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Model Name" />
            </div>
            
            {/* Row 2: Implementation and Destination Information */}
            {/* Implementation Period Input - Left Column */}
            <div className="col-md-6">
              <label className="small">Implementation Period <span className="text-muted ml-2"><i>e.g., Q2 2025</i></span></label>
              <input className="form-control form-control-sm mb-2" value={implementationPeriod} onChange={e => setImplementationPeriod(e.target.value)} placeholder="Implementation Period" />
            </div>
            {/* Destination Code Input with Icon - Right Column */}
            <div className="col-md-6">
              <label className="small">Destination Code</label>
              <div className="input-group input-group-sm mb-2">
                <input className="form-control form-control-sm" value={destinationCode} onChange={e => handleDestinationCodeChange(e.target.value)} placeholder="Destination Code" />
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fas fa-map-marker-alt" /></span>
                </div>
              </div>
            </div>
            
            {/* Row 3: Auto-populated Destination Information (Read-only) */}
            {/* Destination Country Code - Auto-filled, Left Column */}
            <div className="col-md-6">
              <label className="small">Destination Country Code</label>
              <input className="form-control form-control-sm mb-2" value={destinationCountryCode} readOnly placeholder="Auto-filled" style={{backgroundColor: '#f8f9fa'}} />
            </div>
            {/* Country Name - Auto-filled, Right Column */}
            <div className="col-md-6">
              <label className="small">Country</label>
              <input className="form-control form-control-sm mb-2" value={country} readOnly placeholder="Auto-filled" style={{backgroundColor: '#f8f9fa'}} />
            </div>
            
            {/* Row 4: Remark Field - Full Width */}
            <div className="col-md-12">
              <label className="small">Remark</label>
              <input className="form-control form-control-sm mb-2" value={newRemark} onChange={e => setNewRemark(e.target.value)} placeholder="Remark" />
            </div>
          </div>

          {/* === ACTION BUTTONS SECTION === */}
          <div className="d-flex align-items-center mb-3">
            {/* Add Part Button - Opens part picker modal */}
            <button type="button" className="btn btn-sm btn-outline-primary mr-2" onClick={handleAddPartClick}>
              <i className="fas fa-file mr-1" /> Add Part
            </button>
            {/* Upload Button - Placeholder functionality */}
            <button type="button" className="btn btn-sm btn-outline-secondary mr-2" onClick={() => alert('Upload placeholder')}>
              <i className="fas fa-cloud-upload-alt mr-1" /> Upload
            </button>
            {/* Template Download Button - Placeholder functionality */}
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => alert('Download template placeholder')}>
              <i className="fas fa-cloud-download-alt mr-1" /> Template
            </button>
          </div>

          {/* === PARTS DATA TABLE SECTION === */}
          {/* Responsive Table Container */}
          <div className="table-responsive">
            {/* Parts Information Table */}
            <table className="table table-sm table-bordered mb-2">
              {/* Table Header */}
              <thead>
                <tr>
                  <th>Part No</th>        {/* Part number column */}
                  <th>Suffix</th>         {/* Part suffix column */}
                  <th>Name</th>           {/* Part name column */}
                  <th>Parent</th>         {/* Parent part column */}
                  <th>Supplier ID</th>    {/* Supplier ID column */}
                  <th>Supplier Name</th>  {/* Supplier name column */}
                  <th>L</th>              {/* Length dimension column */}
                  <th>W</th>              {/* Width dimension column */}
                  <th>H</th>              {/* Height dimension column */}
                  <th>Wt/PC</th>          {/* Weight per piece column */}
                  <th>Qty</th>            {/* Quantity column */}
                  <th>Total Wt</th>       {/* Total weight column */}
                  <th style={{ width: 90 }}>Action</th>  {/* Action buttons column */}
                </tr>
              </thead>
              {/* Table Body - Dynamic content based on parts array */}
              <tbody>
                {parts.length === 0 ? (
                  /* Empty State Row - Shown when no parts are added */
                  <tr>
                    <td colSpan="13" className="text-center text-muted">- No parts added yet -</td>
                  </tr>
                ) : (
                  /* Parts Data Rows - Map through parts array */
                  parts.map((p, idx) => (
                    <tr key={idx}>
                      <td>{p.partNo}</td>        {/* Display part number */}
                      <td>{p.suffix}</td>        {/* Display part suffix */}
                      <td>{p.name}</td>          {/* Display part name */}
                      <td>{p.parent}</td>        {/* Display parent part */}
                      <td>{p.supplierId}</td>    {/* Display supplier ID */}
                      <td>{p.supplierName}</td>  {/* Display supplier name */}
                      <td>{p.L}</td>             {/* Display length */}
                      <td>{p.W}</td>             {/* Display width */}
                      <td>{p.H}</td>             {/* Display height */}
                      <td>{p.wtPerPc}</td>       {/* Display weight per piece */}
                      <td>{p.qty}</td>           {/* Display quantity */}
                      <td>{p.totalWt}</td>       {/* Display total weight */}
                      <td>
                        {/* Remove Part Button */}
                        <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleRemovePart(idx)}>
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* === MODAL FOOTER SECTION === */}
        <div className="card-footer text-right" style={{ marginTop: 8 }}>
          {/* Save Button - Primary action */}
          <button type="button" className="btn btn-primary mr-2" onClick={handleSaveModel}>
            <i className="fas fa-save mr-1" /> Save
          </button>
          {/* Cancel Button - Secondary action */}
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
            <i className="fas fa-times mr-1" /> Cancel
          </button>
        </div>
      </div>

      {/* === PART PICKER MODAL INTEGRATION === */}
      {/* Conditionally render Part Picker Modal when showPartPicker is true */}
      {showPartPicker && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000 }}>
          <PartPickerModal
            show={showPartPicker}                              // Pass show state
            onClose={() => setShowPartPicker(false)}           // Close handler
            onSelect={handlePartPicked}                        // Part selection handler
          />
        </div>
      )}

      {/* === COMPONENT STYLES === */}
      <style>{`
        /* Modal Backdrop Styling */
        .np-modal-backdrop {
          position: fixed;                    /* Fixed position overlay */
          inset: 0;                          /* Cover entire viewport */
          background: rgba(0,0,0,0.35);      /* Semi-transparent dark background */
          z-index: 2000;                     /* High z-index for overlay */
          display: flex;                     /* Flexbox for centering */
          align-items: center;               /* Vertical centering */
          justify-content: center;           /* Horizontal centering */
          padding: 1rem;                     /* Padding around modal */
        }
        
        /* Modal Container Styling */
        .np-modal { 
          width: 100%;                       /* Full width within constraints */
          z-index: 2001;                     /* Higher z-index than backdrop */
        }
        
        /* Table Cell Alignment */
        .table-sm td, .table-sm th { 
          vertical-align: middle;            /* Middle vertical alignment for table cells */
        }
      `}</style>
    </div>
  )
}
