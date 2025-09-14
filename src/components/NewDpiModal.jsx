import React, { useState, useEffect } from 'react'

// Bootstrap-style modal compatible with NewCpsModal API
// Props: show (bool), onClose(), onSave(payload), onSubmit(payload), initial
export default function NewDpiModal({ show = false, onClose, initial = null, onSave, onSubmit }) {
  const [form, setForm] = useState(
    initial || {
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
    }
  )

  // keep form in sync if `initial` changes
  useEffect(() => {
    if (initial) setForm(initial)
  }, [initial])

  useEffect(() => {
    // add/remove body modal-open class to prevent background scroll when shown
    if (show) document.body.classList.add('modal-open')
    else document.body.classList.remove('modal-open')
    return () => document.body.classList.remove('modal-open')
  }, [show])

  if (!show) return null

  function change(e) {
    const { name, value } = e.target
    setForm(s => ({ ...s, [name]: value }))
  }

  function handleSave(e) {
    e && e.preventDefault && e.preventDefault()
    onSave && onSave(form)
  }

  function handleSubmit(e) {
    e && e.preventDefault && e.preventDefault()
    onSubmit && onSubmit(form)
  }

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true" style={{ paddingRight: 17 }}>
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">New DPI</h5>
              <button type="button" className="close" onClick={onClose} aria-label="Close">
                <span aria-hidden>×</span>
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>DPI No.</label>
                    <input name="dpiNo" className="form-control form-control-sm" value={form.dpiNo} onChange={change} />
                  </div>

                  <div className="form-group col-md-6">
                    <label>Ref DPI No.</label>
                    <input name="refDpiNo" className="form-control form-control-sm" value={form.refDpiNo} onChange={change} />
                  </div>

                  <div className="form-group col-md-6">
                    <label>Issued Date</label>
                    <input type="date" name="issuedDate" className="form-control form-control-sm" value={form.issuedDate} onChange={change} />
                  </div>

                  <div className="form-group col-md-6">
                    <label>Effective Date</label>
                    <input type="date" name="effectiveDate" className="form-control form-control-sm" value={form.effectiveDate} onChange={change} />
                  </div>

                  <div className="form-group col-md-6">
                    <label>CFC / Pjt</label>
                    <input name="cfcPjt" className="form-control form-control-sm" value={form.cfcPjt} onChange={change} />
                  </div>

                  <div className="form-group col-md-6">
                    <label>Model</label>
                    <input name="model" className="form-control form-control-sm" value={form.model} onChange={change} />
                  </div>

                  <div className="form-group col-md-4">
                    <label># Parts</label>
                    <input type="number" name="numParts" className="form-control form-control-sm" value={form.numParts} onChange={change} />
                  </div>

                  <div className="form-group col-md-4">
                    <label># CPS</label>
                    <input type="number" name="numCps" className="form-control form-control-sm" value={form.numCps} onChange={change} />
                  </div>

                  <div className="form-group col-md-4">
                    <label>Supplier</label>
                    <input name="supplier" className="form-control form-control-sm" value={form.supplier} onChange={change} />
                  </div>

                  <div className="form-group col-md-6">
                    <label>From</label>
                    <input name="from" className="form-control form-control-sm" value={form.from} onChange={change} />
                  </div>

                  <div className="form-group col-md-6">
                    <label>To</label>
                    <input name="to" className="form-control form-control-sm" value={form.to} onChange={change} />
                  </div>

                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* backdrop */}
      <div className="modal-backdrop fade show" />
    </>
  )
}
