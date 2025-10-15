// src/pages/NewModelModal.jsx
import React, { useState, useEffect } from 'react'
import PartPickerModal from '../components/PartPickerModal' // Uncomment and adjust path as needed
import DESTINATIONS from '../data/destinations'

export default function NewModelModal({ 
  show, 
  onClose, 
  onSave, 
  initialData 
}) {
  // form fields
  const [newCode, setNewCode] = useState('')
  const [newName, setNewName] = useState('')
  const [newRemark, setNewRemark] = useState('')
  const [implementationPeriod, setImplementationPeriod] = useState('')
  const [destinationCode, setDestinationCode] = useState('')
  const [destinationCountryCode, setDestinationCountryCode] = useState('')
  const [country, setCountry] = useState('')

  // parts
  const [parts, setParts] = useState([])
  const [showPartPicker, setShowPartPicker] = useState(false)

  useEffect(() => {
    if (show) {
      if (initialData) {
        // Populate form with existing data for editing
        setNewCode(initialData.code || '')
        setNewName(initialData.name || '')
        setNewRemark(initialData.remark || '')
        setImplementationPeriod(initialData.implementationPeriod || '')
        setDestinationCode(initialData.destinationCode || '')
        setDestinationCountryCode(initialData.destinationCountryCode || '')
        setCountry(initialData.country || '')
        setParts(initialData.parts || [])
      } else {
        // Clear form for new entry
        setNewCode('')
        setNewName('')
        setNewRemark('')
        setImplementationPeriod('')
        setDestinationCode('')
        setDestinationCountryCode('')
        setCountry('')
        setParts([])
      }
      setShowPartPicker(false)
    }
  }, [show, initialData])

  function handleAddPartClick() {
    setShowPartPicker(true)
  }

  function handlePartPicked(selectedParts) {
    // Assume selectedParts is an array of part objects
    setParts(prev => [...prev, ...selectedParts])
    setShowPartPicker(false)
  }

  function handleRemovePart(idx) {
    setParts(prev => prev.filter((_, i) => i !== idx))
  }

  // Handle destination code change and auto-populate related fields
  function handleDestinationCodeChange(value) {
    setDestinationCode(value)
    const destination = DESTINATIONS.find(dest => dest.destCode === value)
    if (destination) {
      setDestinationCountryCode(destination.code)
      setCountry(destination.country)
    } else {
      setDestinationCountryCode('')
      setCountry('')
    }
  }

  function handleSaveModel() {
    if (!newCode.trim()) {
      alert('Please enter Model Code')
      return
    }
    const payload = {
      code: newCode,
      name: newName,
      remark: newRemark,
      implementationPeriod,
      destinationCode,
      destinationCountryCode,
      country,
      parts: parts.slice(),
    }
    console.log('Saving model:', payload)
    onSave(payload)
  }

  // If modal should not be shown, return null (keep this behavior),
  // but we already console.log when show toggles so you can confirm.
  if (!show) return null

  return (
    <div className="np-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="np-modal card card-outline card-success" style={{ maxWidth: 980 }}>
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0">
            <b>Model - {initialData ? 'Edit' : 'New'}</b>
          </h3>
          <div className="ml-2 text-muted small" style={{ marginLeft: 8 }}>|</div>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-tool" onClick={onClose}><i className="fas fa-times" /></button>
          </div>
        </div>

        <div className="card-body">
          {/* Two columns layout for fields */}
          <div className="row">
            <div className="col-md-6">
              <label className="small">Code</label>
              <input className="form-control form-control-sm mb-2" value={newCode} onChange={e => setNewCode(e.target.value)} placeholder="Model Code" />
            </div>
            <div className="col-md-6">
              <label className="small">Name</label>
              <input className="form-control form-control-sm mb-2" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Model Name" />
            </div>
            <div className="col-md-6">
              <label className="small">Implementation Period <span className="text-muted ml-2"><i>e.g., Q2 2025</i></span></label>
              <input className="form-control form-control-sm mb-2" value={implementationPeriod} onChange={e => setImplementationPeriod(e.target.value)} placeholder="Implementation Period" />
            </div>
            <div className="col-md-6">
              <label className="small">Destination Code</label>
              <div className="input-group input-group-sm mb-2">
                <input className="form-control form-control-sm" value={destinationCode} onChange={e => handleDestinationCodeChange(e.target.value)} placeholder="Destination Code" />
                <div className="input-group-append">
                  <span className="input-group-text"><i className="fas fa-map-marker-alt" /></span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="small">Destination Country Code</label>
              <input className="form-control form-control-sm mb-2" value={destinationCountryCode} readOnly placeholder="Auto-filled" style={{backgroundColor: '#f8f9fa'}} />
            </div>
            <div className="col-md-6">
              <label className="small">Country</label>
              <input className="form-control form-control-sm mb-2" value={country} readOnly placeholder="Auto-filled" style={{backgroundColor: '#f8f9fa'}} />
            </div>
            <div className="col-md-12">
              <label className="small">Remark</label>
              <input className="form-control form-control-sm mb-2" value={newRemark} onChange={e => setNewRemark(e.target.value)} placeholder="Remark" />
            </div>
          </div>

          {/* Actions */}
          <div className="d-flex align-items-center mb-3">
            <button type="button" className="btn btn-sm btn-outline-primary mr-2" onClick={handleAddPartClick}>
              <i className="fas fa-file mr-1" /> Add Part
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary mr-2" onClick={() => alert('Upload placeholder')}>
              <i className="fas fa-cloud-upload-alt mr-1" /> Upload
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => alert('Download template placeholder')}>
              <i className="fas fa-cloud-download-alt mr-1" /> Template
            </button>
          </div>

          {/* Parts table */}
          <div className="table-responsive">
            <table className="table table-sm table-bordered mb-2">
              <thead>
                <tr>
                  <th>Part No</th>
                  <th>Suffix</th>
                  <th>Name</th>
                  <th>Parent</th>
                  <th>Supplier ID</th>
                  <th>Supplier Name</th>
                  <th>L</th>
                  <th>W</th>
                  <th>H</th>
                  <th>Wt/PC</th>
                  <th>Qty</th>
                  <th>Total Wt</th>
                  <th style={{ width: 90 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {parts.length === 0 ? (
                  <tr>
                    <td colSpan="13" className="text-center text-muted">- No parts added yet -</td>
                  </tr>
                ) : (
                  parts.map((p, idx) => (
                    <tr key={idx}>
                      <td>{p.partNo}</td>
                      <td>{p.suffix}</td>
                      <td>{p.name}</td>
                      <td>{p.parent}</td>
                      <td>{p.supplierId}</td>
                      <td>{p.supplierName}</td>
                      <td>{p.L}</td>
                      <td>{p.W}</td>
                      <td>{p.H}</td>
                      <td>{p.wtPerPc}</td>
                      <td>{p.qty}</td>
                      <td>{p.totalWt}</td>
                      <td>
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

        <div className="card-footer text-right" style={{ marginTop: 8 }}>
          <button type="button" className="btn btn-primary mr-2" onClick={handleSaveModel}>
            <i className="fas fa-save mr-1" /> Save
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
            <i className="fas fa-times mr-1" /> Cancel
          </button>
        </div>
      </div>

      {/* PartPickerModal integration */}
      {showPartPicker && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000 }}>
          <PartPickerModal
            show={showPartPicker}
            onClose={() => setShowPartPicker(false)}
            //onPicked={handlePartPicked}
            onSelect={handlePartPicked}
          />
        </div>
      )}

      <style>{`
        .np-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .np-modal { width: 100%; z-index: 2001; }
        .table-sm td, .table-sm th { vertical-align: middle; }
      `}</style>
    </div>
  )
}
