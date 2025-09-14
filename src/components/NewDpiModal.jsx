// src/components/NewDpiModal.jsx
import React, { useState, useEffect } from 'react'

export default function NewDpiModal({ show = false, onClose, initial = null, onSave, onSubmit }) {
  const emptyForm = {
    dpiNo: '',
    refDpiNo: '',
    issuedDate: '',
    effectiveDate: '',
    cfcPjt: '',
    model: '',
    from: '',
    to: '',
    supplier: '',
    numParts: 0,
    numCps: 0,
    status: 'Draft',
    notes: '',
  }

  const [form, setForm] = useState(initial || emptyForm)
  const [parts, setParts] = useState([])

  useEffect(() => {
    if (show) {
      setForm(initial || emptyForm)
      setParts((initial && initial.parts) || [])
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
    return () => document.body.classList.remove('modal-open')
  }, [show, initial])

  if (!show) return null

  function change(e) {
    const { name, value } = e.target
    setForm(s => ({ ...s, [name]: value }))
  }

  function addPart() {
    const newPart = {
      cps: '',
      partNo: '',
      suffix: '',
      name: '',
      parent: '',
      supplierCode: '',
      supplierName: '',
      L: '',
      W: '',
      H: '',
      wtPc: '',
      qtyBox: '',
      totalWt: '',
    }
    setParts(prev => [...prev, newPart])
  }

  function updatePart(idx, key, value) {
    setParts(prev => prev.map((p, i) => i === idx ? { ...p, [key]: value } : p))
  }

  function removePart(idx) {
    setParts(prev => prev.filter((_, i) => i !== idx))
  }

  async function fetchDpiByRef(ref) {
    await new Promise(r => setTimeout(r, 200))
    return null
  }

  async function onRefDpiBlur() {
    const ref = (form.refDpiNo || '').trim()
    if (!ref) return
    try {
      const copied = await fetchDpiByRef(ref)
      if (copied) {
        setForm(s => ({ ...s, ...copied }))
        setParts(copied.parts || [])
      }
    } catch (err) {
      console.error('fetch dpi by ref failed', err)
    }
  }

 function handleSave(e) {
    e && e.preventDefault && e.preventDefault()
    const payload = { ...form, status: 'Draft', parts }
    onSave && onSave(payload)
  }

  function handleSubmit(e) {
    e && e.preventDefault && e.preventDefault()
    const payload = { ...form, status: 'Submitted', parts }
    onSubmit && onSubmit(payload)
  }

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"><strong>DPI New</strong></h5>
              <button type="button" className="close" onClick={onClose} aria-label="Close">
                <span aria-hidden>×</span>
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label><strong>DPI No.</strong></label>
                      <input name="dpiNo" className="form-control form-control-sm" value={form.dpiNo} onChange={change} />
                    </div>

                    <div className="form-group">
                      <label>CFC / PJT</label>
                      <input name="cfcPjt" className="form-control form-control-sm" value={form.cfcPjt} onChange={change} />
                    </div>

                    <div className="form-group">
                      <label>Issued Date</label>
                      <input type="date" name="issuedDate" className="form-control form-control-sm" value={form.issuedDate} onChange={change} />
                    </div>

                    <div className="form-group">
                      <label>From</label>
                      <input name="from" className="form-control form-control-sm" value={form.from} onChange={change} />
                    </div>

                    <div className="form-group">
                      <label>Supplier</label>
                      <input name="supplier" className="form-control form-control-sm" value={form.supplier} onChange={change} />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label><strong>DPI Ref No.</strong></label>
                      <div className="input-group input-group-sm">
                        <input
                          name="refDpiNo"
                          className="form-control form-control-sm"
                          value={form.refDpiNo}
                          onChange={change}
                          onBlur={onRefDpiBlur}
                        />
                        <div className="input-group-append">
                          <button type="button" className="btn btn-outline-secondary btn-sm"><i className="fas fa-search" /></button>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Model</label>
                      <input name="model" className="form-control form-control-sm" value={form.model} onChange={change} />
                    </div>

                    <div className="form-group">
                      <label>Effective Date</label>
                      <input type="date" name="effectiveDate" className="form-control form-control-sm" value={form.effectiveDate} onChange={change} />
                    </div>

                    <div className="form-group">
                      <label>To</label>
                      <input name="to" className="form-control form-control-sm" value={form.to} onChange={change} />
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-3 mb-2">
                  <h6><i className="fas fa-chevron-down" /> <strong>Parts</strong></h6>
                  <div>
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={addPart}><i className="fas fa-plus" /> add</button>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-sm table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>CPS</th>
                        <th>Part No</th>
                        <th>Suffix</th>
                        <th>Name</th>
                        <th>Parent</th>
                        <th>Supplier Code</th>
                        <th>Supplier Name</th>
                        <th>L</th>
                        <th>W</th>
                        <th>H</th>
                        <th>Wt/pc</th>
                        <th>Qty/box</th>
                        <th>Total Wt</th>
                        <th style={{ width: 120 }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parts.length === 0 ? (
                        <tr>
                          <td colSpan="14" className="text-center text-muted py-4">No parts. Click "add" to insert a new part.</td>
                        </tr>
                      ) : (
                        parts.map((p, i) => (
                          <tr key={i}>
                            <td><input className="form-control form-control-sm" value={p.cps} onChange={e => updatePart(i, 'cps', e.target.value)} /></td>
                            <td><input className="form-control form-control-sm" value={p.partNo} onChange={e => updatePart(i, 'partNo', e.target.value)} /></td>
                            <td><input className="form-control form-control-sm" value={p.suffix} onChange={e => updatePart(i, 'suffix', e.target.value)} /></td>
                            <td><input className="form-control form-control-sm" value={p.name} onChange={e => updatePart(i, 'name', e.target.value)} /></td>
                            <td><input className="form-control form-control-sm" value={p.parent} onChange={e => updatePart(i, 'parent', e.target.value)} /></td>
                            <td><input className="form-control form-control-sm" value={p.supplierCode} onChange={e => updatePart(i, 'supplierCode', e.target.value)} /></td>
                            <td><input className="form-control form-control-sm" value={p.supplierName} onChange={e => updatePart(i, 'supplierName', e.target.value)} /></td>
                            <td><input className="form-control form-control-sm" value={p.L} onChange={e => updatePart(i, 'L', e.target.value)} /></td>
                            <td><input className="form-control form-control-sm" value={p.W} onChange={e => updatePart(i, 'W', e.target.value)} /></td>
                            <td><input className="form-control form-control-sm" value={p.H} onChange={e => updatePart(i, 'H', e.target.value)} /></td>
                            <td><input className="form-control form-control-sm" value={p.wtPc} onChange={e => updatePart(i, 'wtPc', e.target.value)} /></td>
                            <td><input className="form-control form-control-sm" value={p.qtyBox} onChange={e => updatePart(i, 'qtyBox', e.target.value)} /></td>
                            <td><input className="form-control form-control-sm" value={p.totalWt} onChange={e => updatePart(i, 'totalWt', e.target.value)} /></td>
                            <td>
                              <button type="button" className="btn btn-sm btn-outline-secondary mr-1" title="Edit"><i className="fas fa-pencil-alt" /></button>
                              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removePart(i)} title="Delete"><i className="fas fa-trash" /></button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3">
                  <label><strong>Note :</strong></label>
                  <textarea className="form-control form-control-sm" rows={4} value={form.notes} onChange={e => setForm(s => ({ ...s, notes: e.target.value }))} />
                </div>
              </div>

              <div className="modal-footer d-flex justify-content-end">
                <button type="button" className="btn btn-success mr-2" onClick={handleSave}>Save</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" />
    </>
  )
}
