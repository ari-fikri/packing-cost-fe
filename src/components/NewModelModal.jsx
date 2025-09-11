// src/pages/NewModelModal.jsx
import React, { useState, useEffect } from 'react'

export default function NewModelModal({ show = false, onClose = () => {}, onSave = () => {} }) {
  // form fields
  const [newCode, setNewCode] = useState('')
  const [newName, setNewName] = useState('')
  const [newRemark, setNewRemark] = useState('')

  // parts
  const [parts, setParts] = useState([])
  const [showAddPartRow, setShowAddPartRow] = useState(false)
  const [partForm, setPartForm] = useState({
    partNo: '',
    suffix: '',
    name: '',
    parent: '',
    supplierId: '',
    supplierName: '',
    L: '',
    W: '',
    H: '',
    wtPerPc: '',
    qty: '',
  })

  useEffect(() => {
    console.log('NewModelModal show=', show)
    if (show) {
      // reset the modal fields whenever it's opened
      setNewCode('')
      setNewName('')
      setNewRemark('')
      setParts([])
      setShowAddPartRow(false)
      setPartForm({
        partNo: '',
        suffix: '',
        name: '',
        parent: '',
        supplierId: '',
        supplierName: '',
        L: '',
        W: '',
        H: '',
        wtPerPc: '',
        qty: '',
      })
    }
  }, [show])

  function resetPartForm() {
    setPartForm({
      partNo: '',
      suffix: '',
      name: '',
      parent: '',
      supplierId: '',
      supplierName: '',
      L: '',
      W: '',
      H: '',
      wtPerPc: '',
      qty: '',
    })
  }

  function handleAddPartClick() {
    setShowAddPartRow(true)
  }

  function handleSavePart() {
    if (!partForm.partNo.trim()) {
      alert('Please enter Part No')
      return
    }
    const qty = Number(partForm.qty) || 0
    const wt = Number(partForm.wtPerPc) || 0
    const newPart = {
      ...partForm,
      qty,
      wtPerPc: wt,
      totalWt: +(qty * wt).toFixed(3),
    }
    setParts(prev => [...prev, newPart])
    resetPartForm()
    setShowAddPartRow(false)
  }

  function handleRemovePart(idx) {
    setParts(prev => prev.filter((_, i) => i !== idx))
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
      parts: parts.slice(),
    }
    console.log('saving model payload:', payload)
    onSave(payload)
  }

  // If modal should not be shown, return null (keep this behavior),
  // but we already console.log when show toggles so you can confirm.
  if (!show) return null

  return (
    <div className="np-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="np-modal card card-outline card-success" style={{ maxWidth: 980 }}>
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Model - New</b></h3>
          <div className="ml-2 text-muted small" style={{ marginLeft: 8 }}>|</div>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-tool" onClick={onClose}><i className="fas fa-times" /></button>
          </div>
        </div>

        <div className="card-body">
          {/* Fields */}
          <div className="row">
            <div className="col-md-4">
              <label className="small">Code</label>
              <input className="form-control form-control-sm mb-2" value={newCode} onChange={e => setNewCode(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="small">Name</label>
              <input className="form-control form-control-sm mb-2" value={newName} onChange={e => setNewName(e.target.value)} />
            </div>
            <div className="col-md-4">
              <label className="small">Remark</label>
              <input className="form-control form-control-sm mb-2" value={newRemark} onChange={e => setNewRemark(e.target.value)} />
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

          {/* Parts table — ALWAYS rendered (shows "- No parts added yet -" when empty) */}
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

                {/* Inline Add Part row */}
                {showAddPartRow && (
                  <tr>
                    <td><input className="form-control form-control-sm" value={partForm.partNo} onChange={e => setPartForm(f => ({ ...f, partNo: e.target.value }))} /></td>
                    <td><input className="form-control form-control-sm" value={partForm.suffix} onChange={e => setPartForm(f => ({ ...f, suffix: e.target.value }))} /></td>
                    <td><input className="form-control form-control-sm" value={partForm.name} onChange={e => setPartForm(f => ({ ...f, name: e.target.value }))} /></td>
                    <td><input className="form-control form-control-sm" value={partForm.parent} onChange={e => setPartForm(f => ({ ...f, parent: e.target.value }))} /></td>
                    <td><input className="form-control form-control-sm" value={partForm.supplierId} onChange={e => setPartForm(f => ({ ...f, supplierId: e.target.value }))} /></td>
                    <td><input className="form-control form-control-sm" value={partForm.supplierName} onChange={e => setPartForm(f => ({ ...f, supplierName: e.target.value }))} /></td>
                    <td style={{ width: 80 }}><input className="form-control form-control-sm" value={partForm.L} onChange={e => setPartForm(f => ({ ...f, L: e.target.value }))} /></td>
                    <td style={{ width: 80 }}><input className="form-control form-control-sm" value={partForm.W} onChange={e => setPartForm(f => ({ ...f, W: e.target.value }))} /></td>
                    <td style={{ width: 80 }}><input className="form-control form-control-sm" value={partForm.H} onChange={e => setPartForm(f => ({ ...f, H: e.target.value }))} /></td>
                    <td style={{ width: 90 }}><input type="number" className="form-control form-control-sm" value={partForm.wtPerPc} onChange={e => setPartForm(f => ({ ...f, wtPerPc: e.target.value }))} /></td>
                    <td style={{ width: 80 }}><input type="number" className="form-control form-control-sm" value={partForm.qty} onChange={e => setPartForm(f => ({ ...f, qty: e.target.value }))} /></td>
                    <td style={{ width: 90 }} className="align-middle text-center">—</td>
                    <td style={{ width: 90 }}>
                      <div className="btn-group" role="group">
                        <button type="button" className="btn btn-sm btn-primary" onClick={handleSavePart}>Add</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => { resetPartForm(); setShowAddPartRow(false); }}>Cancel</button>
                      </div>
                    </td>
                  </tr>
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
