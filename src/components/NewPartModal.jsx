// src/components/NewPartModal.jsx
import React, { useState, useEffect } from 'react'

export default function NewPartModal({ show = false, onClose = () => {}, onSave = () => {} }) {
  // main fields
  const [partNo, setPartNo] = useState('')
  const [uniqueNo, setUniqueNo] = useState('')
  const [suffixCode, setSuffixCode] = useState('')
  const [partName, setPartName] = useState('')
  const [parentPartNo, setParentPartNo] = useState('')
  const [suppCode, setSuppCode] = useState('')
  const [supplierName, setSupplierName] = useState('')
  const [supplierAddress, setSupplierAddress] = useState('')
  const [plantCode, setPlantCode] = useState('')
  const [uniqueNo2, setUniqueNo2] = useState('')

  // dimensions & weights
  const [lengthMM, setLengthMM] = useState('')
  const [widthMM, setWidthMM] = useState('')
  const [heightMM, setHeightMM] = useState('')
  const [weightPerPc, setWeightPerPc] = useState('')
  const [qtyBox, setQtyBox] = useState('')
  // Remove totalWeight state, always compute

  // child parts inside modal
  const [childParts, setChildParts] = useState([])
  const [showAddChildRow, setShowAddChildRow] = useState(false)
  const [childForm, setChildForm] = useState({
    partNo: '',
    suffix: '',
    uniqueNo: '',
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
    if (show) {
      setPartNo(''); setUniqueNo(''); setSuffixCode(''); setPartName('')
      setParentPartNo(''); setSuppCode(''); setSupplierName(''); setSupplierAddress(''); setPlantCode('')
      setUniqueNo2('')
      setLengthMM(''); setWidthMM(''); setHeightMM(''); setWeightPerPc(''); setQtyBox('')
      setChildParts([]); setShowAddChildRow(false)
      setChildForm({
        partNo: '', suffix: '', uniqueNo: '', name: '', parent: '',
        supplierId: '', supplierName: '', L: '', W: '', H: '', wtPerPc: '', qty: ''
      })
    }
  }, [show])

  function computeVolume(l, w, h) {
    const L = Number(l) || 0
    const W = Number(w) || 0
    const H = Number(h) || 0
    if (!L || !W || !H) return ''
    return ((L * W * H) / 1000000).toFixed(3)
  }

  function computeTotalWeight(wtGr, qtyN) {
    const w = Number(wtGr) || 0
    const q = Number(qtyN) || 0
    if (!w || !q) return ''
    return (w * q).toFixed(3)
  }

  function handleAddChildClick() {
    setShowAddChildRow(true)
  }
  function handleSaveChild() {
    if (!childForm.partNo.trim()) {
      alert('Enter child Part No')
      return
    }
    const qty = Number(childForm.qty) || 0
    const wt = Number(childForm.wtPerPc) || 0
    const cp = { ...childForm, qty, wtPerPc: wt, totalWt: +(qty * wt).toFixed(3) }
    setChildParts(prev => [...prev, cp])
    setChildForm({ partNo: '', suffix: '', uniqueNo: '', name: '', parent: '', supplierId: '', supplierName: '', L: '', W: '', H: '', wtPerPc: '', qty: '' })
    setShowAddChildRow(false)
  }
  function handleRemoveChild(idx) {
    setChildParts(prev => prev.filter((_, i) => i !== idx))
  }

  function handleSave() {
    if (!partNo.trim()) {
      alert('Please enter Part No')
      return
    }
    const payload = {
      partNo, uniqueNo, suffixCode, partName, parentPartNo, suppCode, supplierName, supplierAddress,
      plantCode, uniqueNo2,
      dimensions: { L: lengthMM, W: widthMM, H: heightMM },
      weightPerPc: Number(weightPerPc) || 0,
      qtyBox: Number(qtyBox) || 0,
      totalWeight: Number(computeTotalWeight(weightPerPc, qtyBox)) || 0,
      childParts: childParts.slice()
    }
    onSave(payload)
  }

  if (!show) return null

  return (
    <div className="np-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="np-modal card card-outline card-primary" style={{ maxWidth: 980 }}>
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Part New</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-tool" onClick={onClose}><i className="fas fa-times" /></button>
          </div>
        </div>

        <div className="card-body">
          {/* 1st row */}
          <div className="form-row">
            <div className="form-group col-md-6 d-flex">
              <div style={{ flex: 1 }}>
                <label className="small mb-1">Part No</label>
                <input className="form-control form-control-sm mb-1" value={partNo} onChange={e => setPartNo(e.target.value)} />
              </div>
              <div style={{ width: '30%', marginLeft: 8 }}>
                <label className="small mb-1">Suffix Code</label>
                <input className="form-control form-control-sm mb-1" value={suffixCode} onChange={e => setSuffixCode(e.target.value)} />
              </div>
            </div>
            <div className="form-group col-md-6">
              <label className="small mb-1">Parent Part No</label>
              <div className="input-group input-group-sm">
                <input className="form-control form-control-sm" value={parentPartNo} onChange={e => setParentPartNo(e.target.value)} />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => alert('Search Parent placeholder')}>
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd row */}
          <div className="form-row">
            <div className="form-group col-md-12">
              <label className="small mb-1">Unique No</label>
              <input className="form-control form-control-sm" value={uniqueNo} onChange={e => setUniqueNo(e.target.value)} />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="small mb-1">Supplier Code</label>
              <input className="form-control form-control-sm" value={suppCode} onChange={e => setSuppCode(e.target.value)} />
            </div>
            <div className="form-group col-md-6">
              <label className="small mb-1">Supplier Name</label>
              <input className="form-control form-control-sm" value={supplierName} readOnly />
            </div>
          </div>

          {/* 4th row */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="small mb-1">Supplier Address</label>
              <input className="form-control form-control-sm" value={supplierAddress} readOnly />
            </div>
            <div className="form-group col-md-6">
              <label className="small mb-1">Supplier Plant Code</label>
              <input className="form-control form-control-sm" value={plantCode} readOnly />
            </div>
          </div>

          {/* 5th row: Dimensions */}
          <div className="form-row align-items-end">
            <div className="form-group col-md-6 mb-0">
              <label className="small">Dimension (mm)</label>
              <div className="form-row">
                <div className="form-group col-md-4 mb-0">
                  <label className="small mb-1">Length</label>
                  <input className="form-control form-control-sm" value={lengthMM} onChange={e => setLengthMM(e.target.value)} />
                </div>
                <div className="form-group col-md-4 mb-0">
                  <label className="small mb-1">Width</label>
                  <input className="form-control form-control-sm" value={widthMM} onChange={e => setWidthMM(e.target.value)} />
                </div>
                <div className="form-group col-md-4 mb-0">
                  <label className="small mb-1">Height</label>
                  <input className="form-control form-control-sm" value={heightMM} onChange={e => setHeightMM(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="form-group col-md-6 mb-0 d-flex align-items-end">
              <div style={{ width: '100%' }}>
                <label className="small mb-1">Volume (m³)</label>
                <input className="form-control form-control-sm" value={computeVolume(lengthMM, widthMM, heightMM)} readOnly />
              </div>
            </div>
          </div>

          {/* 6th row: Weight and Qty */}
          <div className="form-row">
            <div className="form-group col-md-6 d-flex">
              <div style={{ flex: 1, marginRight: 8 }}>
                <label className="small mb-1">Weight/PC (gr)</label>
                <input type="number" className="form-control form-control-sm" value={weightPerPc} onChange={e => setWeightPerPc(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label className="small mb-1">Qty/Box</label>
                <input type="number" className="form-control form-control-sm" value={qtyBox} onChange={e => setQtyBox(e.target.value)} />
              </div>
            </div>
            <div className="form-group col-md-6">
              <label className="small mb-1">Total Weight (gr)</label>
              <input className="form-control form-control-sm" value={computeTotalWeight(weightPerPc, qtyBox)} readOnly />
            </div>
          </div>

          {/* Add Child Part toolbar */}
          <div className="mb-3">
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleAddChildClick}>
              <i className="fas fa-file mr-1" /> Add Child Part
            </button>
          </div>

          {/* Child parts table */}
          <div className="table-responsive">
            <table className="table table-sm table-bordered mb-2">
              <thead>
                <tr>
                  <th style={{ width: 40 }}>No</th>
                  <th>Part No</th><th>Suffix</th><th>Unique No</th><th>Name</th><th>Parent</th>
                  <th>Supplier ID</th><th>Supplier Name</th><th>L</th><th>W</th><th>H</th>
                  <th>Wt/PC</th><th>Qty</th><th>Total Wt</th><th style={{ width: 90 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {childParts.length === 0 ? (
                  <tr>
                    <td colSpan="15" className="text-center py-4 text-muted">No Data Found</td>
                  </tr>
                ) : (
                  childParts.map((cp, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{cp.partNo}</td>
                      <td>{cp.suffix}</td>
                      <td>{cp.uniqueNo}</td>
                      <td>{cp.name}</td>
                      <td>{cp.parent}</td>
                      <td>{cp.supplierId}</td>
                      <td>{cp.supplierName}</td>
                      <td>{cp.L}</td>
                      <td>{cp.W}</td>
                      <td>{cp.H}</td>
                      <td>{cp.wtPerPc}</td>
                      <td>{cp.qty}</td>
                      <td>{cp.totalWt}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemoveChild(i)}
                        >
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

        <div className="card-footer text-right">
          <button className="btn btn-primary mr-2" onClick={handleSave}><i className="fas fa-save mr-1" /> Save</button>
          <button className="btn btn-outline-secondary" onClick={onClose}><i className="fas fa-times mr-1" /> Cancel</button>
        </div>
      </div>

      <style>{`
        .np-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 2000; display:flex; align-items:center; justify-content:center; padding:1rem; }
        .np-modal { width: 100%; max-height: 95vh; overflow: auto; z-index: 2001; }
        .table-sm td, .table-sm th { vertical-align: middle; }
      `}</style>
    </div>
  )
}
