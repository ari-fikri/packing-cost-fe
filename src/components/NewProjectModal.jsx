// src/components/NewProjectModal.jsx
import React, { useState } from 'react'

export default function NewProjectModal({ visible, onClose, onSave }) {
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [type, setType] = useState('PxP')
  const [description, setDescription] = useState('')
  const [manager, setManager] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [status, setStatus] = useState('Draft')
  const [note, setNote] = useState('')
  const [models, setModels] = useState([]) // simple array of {code,name,remark}

  function handleAddModel() {
    // placeholder: push a demo row (you can replace with modal selector later)
    const idx = models.length + 1
    setModels(prev => [...prev, { code: `MDL-${idx}`, name: `Model ${idx}`, remark: '' }])
  }

  function handleRemoveModel(i) {
    setModels(prev => prev.filter((_, idx) => idx !== i))
  }

  function handleSave() {
    const payload = { code, name, type, description, manager, startDate, endDate, status, note, models }
    if (onSave) onSave(payload)
    // keep modal open to let parent decide; parent will call onClose typically
  }

  if (!visible) return null

  return (
    <div className="np-modal-backdrop">
      <div className="np-modal card card-outline card-primary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>ProCFC/Pjt - New</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-tool" aria-label="Close" onClick={onClose}><i className="fas fa-times" /></button>
          </div>
        </div>

        <div className="card-body">
          {/* form left-right two columns, stacked rows like SALT */}
          <div className="row">
            <div className="col-12 col-md-6">
              <label className="small">CFC/PJT Code</label>
              <input className="form-control form-control-sm mb-2" value={code} onChange={e=>setCode(e.target.value)} placeholder="286W" />
            </div>
            <div className="col-12 col-md-6">
              <label className="small">CFC/PJT Name</label>
              <input className="form-control form-control-sm mb-2" value={name} onChange={e=>setName(e.target.value)} placeholder="Engine Redesign" />
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6">
              <label className="small">Description</label>
              <textarea className="form-control form-control-sm" rows="3" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Complete redesign of the engine system..."></textarea>
            </div>

            <div className="col-12 col-md-6">
              <label className="small">Project Manager</label>
              <div className="input-group input-group-sm mb-2">
                <input className="form-control form-control-sm" value={manager} onChange={e=>setManager(e.target.value)} placeholder="Arif Fikri" />
                <div className="input-group-append">
                  <button type="button" className="btn btn-outline-secondary btn-sm" title="Select manager"><i className="fas fa-users"></i></button>
                </div>
              </div>

              <label className="small">Start Date</label>
              <div className="d-flex mb-2">
                <input type="date" className="form-control form-control-sm" value={startDate} onChange={e=>setStartDate(e.target.value)} />
              </div>

              <label className="small">End Date</label>
              <div className="d-flex">
                <input type="date" className="form-control form-control-sm" value={endDate} onChange={e=>setEndDate(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12 col-md-6">
              <label className="small">CFC/PJT Type</label>
              <select className="form-control form-control-sm" value={type} onChange={e=>setType(e.target.value)}>
                <option>PxP</option>
                <option>Lot</option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="small">Status</label>
              <select className="form-control form-control-sm" value={status} onChange={e=>setStatus(e.target.value)}>
                <option>Draft</option>
                <option>Active</option>
                <option>On Hold</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <label className="small">Note</label>
              <textarea className="form-control form-control-sm" rows="2" value={note} onChange={e=>setNote(e.target.value)} />
            </div>
          </div>

          {/* action toolbar */}
          <div className="row mt-3 align-items-center">
            <div className="col-8">
              <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleAddModel}><i className="fas fa-plus mr-1"></i> Add Model</button>
              <button type="button" className="btn btn-sm btn-outline-secondary mr-1"><i className="fas fa-cloud-upload-alt"></i></button>
              <button type="button" className="btn btn-sm btn-outline-secondary"><i className="fas fa-cloud-download-alt"></i></button>
            </div>
            <div className="col-4 text-right">
              {/* Save/Cancel in header area duplicated below for user convenience */}
            </div>
          </div>

          {/* models table */}
          <div className="card mt-3">
            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-sm table-striped mb-0">
                  <thead>
                    <tr><th style={{width:50}}>No</th><th>Model Code</th><th>Model Name</th><th>Remark</th><th style={{width:90}}>Action</th></tr>
                  </thead>
                  <tbody>
                    {models.length === 0 && (
                      <tr><td colSpan="5" className="text-center text-muted py-4">No Data Found</td></tr>
                    )}
                    {models.map((m, i) => (
                      <tr key={i}>
                        <td>{i+1}</td>
                        <td>{m.code}</td>
                        <td>{m.name}</td>
                        <td>{m.remark}</td>
                        <td>
                          <button type="button" className="btn btn-sm btn-danger" onClick={()=>handleRemoveModel(i)}><i className="fas fa-trash" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        <div className="card-footer text-right">
          <button type="button" className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
