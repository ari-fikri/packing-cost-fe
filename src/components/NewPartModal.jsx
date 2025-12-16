// src/components/NewPartModal.jsx
import React, { useState, useEffect } from 'react'
import PartPickerModal from './PartPickerModal' // adjust path if needed
import SupplierPickerModal from './SupplierPickerModal'
import { handleInputChange } from '../utils/globalFunctions'

export default function NewPartModal({ show = false, onClose = () => {}, onSave = () => {}, initialData = null }) {
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
  })

  // new state for part picker modal
  const [showPartPicker, setShowPartPicker] = useState(false)
  const [partPickerMode, setPartPickerMode] = useState('parent') // 'parent' or 'child'
  const [showSupplierPicker, setShowSupplierPicker] = useState(false)

  useEffect(() => {
    if (show) {
      if (initialData) {
        setPartNo(initialData.partNo || '')
        setUniqueNo(initialData.uniqueNo || '')
        setSuffixCode(initialData.suffixCode || '')
        setPartName(initialData.partName || '')
        setParentPartNo(initialData.parentPartNo || '')
        setSuppCode(initialData.suppCode || '')
        setSupplierName(initialData.supplierName || '')
        setSupplierAddress(initialData.supplierAddress || '')
        setPlantCode(initialData.plantCode || '')
        setUniqueNo2(initialData.uniqueNo2 || '')
        setChildParts(initialData.childParts || [])
        setShowAddChildRow(false)
        setChildForm({
          partNo: '', suffix: '', uniqueNo: '', name: '', parent: '',
          supplierId: '', supplierName: '',
        })
      } else {
        setPartNo(''); setUniqueNo(''); setSuffixCode(''); setPartName('')
        setParentPartNo(''); setSuppCode(''); setSupplierName(''); setSupplierAddress(''); setPlantCode('')
        setUniqueNo2('')
        setChildParts([]); setShowAddChildRow(false)
        setChildForm({
          partNo: '', suffix: '', uniqueNo: '', name: '', parent: '',
          supplierId: '', supplierName: '',
        })
      }
    }
  }, [show, initialData])

  function handleAddChildClick() {
    setShowAddChildRow(true)
  }
  function handleSaveChild() {
    if (!childForm.partNo.trim()) {
      alert('Enter child Part No')
      return
    }
    const cp = { ...childForm }
    setChildParts(prev => [...prev, cp])
    setChildForm({ partNo: '', suffix: '', uniqueNo: '', name: '', parent: '', supplierId: '', supplierName: '' })
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
      childParts: childParts.slice()
    }
    onSave(payload)
  }

  // Handler for picking parent part
  function handlePickParentPart(part) {
    if (part) {
      setParentPartNo(part.partNo)
    }
    setShowPartPicker(false)
  }

  function handlePickSupplier(supplier) {
    if(supplier) {
      setSuppCode(supplier.code)
      setSupplierName(supplier.name)
      setSupplierAddress(supplier.address)
    }
    setShowSupplierPicker(false)
  }

  // Handler for picking child parts
  function handlePickChildParts(parts) {
    if (parts && parts.length > 0) {
      // Map selected parts to table row structure
      const mapped = parts.map(p => ({
        partNo: p.partNo || p[0] || '',
        suffix: p.suffix || p[1] || '',
        uniqueNo: p.uniqueNo || '',
        name: p.name || p[2] || '',
        parent: p.parent || '',
        supplierId: p.supplierId || '',
        supplierName: p.supplierName || p[3] || '',
      }))
      setChildParts(prev => [...prev, ...mapped])
    }
    setShowPartPicker(false)
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
                <input className="form-control form-control-sm mb-1" value={partNo} onChange={handleInputChange(setPartNo)} />
              </div>
              <div style={{ width: '30%', marginLeft: 8 }}>
                <label className="small mb-1">Suffix Code</label>
                <input className="form-control form-control-sm mb-1" value={suffixCode} onChange={handleInputChange(setSuffixCode)} />
              </div>
            </div>
            <div className="form-group col-md-6">
              <label className="small mb-1">Parent Part No</label>
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-sm"
                  value={parentPartNo}
                  onChange={handleInputChange(setParentPartNo)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    type="button"
                    onClick={() => { setPartPickerMode('parent'); setShowPartPicker(true); }} // <-- set mode here
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2nd row */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="small mb-1">Unique No</label>
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-sm"
                  value={uniqueNo}
                  onChange={handleInputChange(setUniqueNo)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    type="button"
                    onClick={() => alert('Flash/Generate Unique No')}
                  >
                    <i className="fas fa-bolt" />
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group col-md-6"></div>
          </div>
          {/* end 2nd row */}

          {/* 3rd row */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label className="small mb-1">Supplier Code</label>
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-sm"
                  value={suppCode}
                  onChange={handleInputChange(setSuppCode)}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    type="button"
                    onClick={() => setShowSupplierPicker(true)}
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
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

          {/* Add Child Part toolbar */}
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={() => { setPartPickerMode('child'); setShowPartPicker(true); }}
            >
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
                  <th>Supplier ID</th><th>Supplier Name</th><th style={{ width: 90 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {childParts.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-muted">No Data Found</td>
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

      {/* PartPickerModal for Parent Part No or Child Parts */}
      {showPartPicker && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000 }}>
          <PartPickerModal
            show={showPartPicker}
            mode={partPickerMode === 'parent' ? 'single' : 'multi'}
            onClose={() => setShowPartPicker(false)}
            onSelect={partPickerMode === 'parent' ? handlePickParentPart : handlePickChildParts}
          />
        </div>
      )}

      {showSupplierPicker && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000 }}>
          <SupplierPickerModal
            show={showSupplierPicker}
            onClose={() => setShowSupplierPicker(false)}
            onSelect={handlePickSupplier}
          />
        </div>
      )}

      <style>{`
        .np-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.35); z-index: 2000; display:flex; align-items:center; justify-content:center; padding:1rem; }
        .np-modal { width: 100%; max-height: 95vh; overflow: auto; z-index: 2001; }
        .table-sm td, .table-sm th { vertical-align: middle; }
      `}</style>
    </div>
  )
}