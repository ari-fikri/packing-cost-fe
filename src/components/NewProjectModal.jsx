// src/components/NewProjectModal.jsx
import React, { useState, useEffect } from 'react';

export default function NewProjectModal({ visible, onClose, onSave, initialData }) {
  // basic form fields
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Draft');
  const [manager, setManager] = useState('');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');
  const [models, setModels] = useState([]); // array of {code,name,remark}

  useEffect(() => {
    if (initialData) {
      setCode(initialData.code || '');
      setName(initialData.name || '');
      setStatus(initialData.status || 'Draft');
      setManager(initialData.manager || '');
      setDescription(initialData.description || '');
      setNote(initialData.note || '');
      setModels(initialData.models || []);
    } else {
      setCode('');
      setName('');
      setStatus('Draft');
      setManager('');
      setDescription('');
      setNote('');
      setModels([]);
    }
  }, [initialData, visible]);

  const handleAddModel = () => {
    setModels(prev => [...prev, { code: '', name: '', remark: '' }]);
  };

  const handleModelChange = (idx, field, value) => {
    setModels(prev => prev.map((m, i) => i === idx ? { ...m, [field]: value } : m));
  };

  const handleDeleteModel = (idx) => {
    setModels(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSave = () => {
    const payload = { code, name, status, manager, description, note, models };
    if (onSave) onSave(payload);
  };

  if (!visible) return null;

  return (
    <div className="np-modal-backdrop" style={{ position: 'fixed', inset: 0, zIndex: 1040 }}>
      <div className="np-modal card card-outline card-primary" style={{ maxWidth: 600, margin: '40px auto', zIndex: 1041 }}>
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>CFC/Pjt - New</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-tool" aria-label="Close" onClick={onClose}><i className="fas fa-times" /></button>
          </div>
        </div>

        <div className="card-body">
          {/* Two-column layout */}
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label className="small">CFC/PJT Code</label>
                <input className="form-control form-control-sm mb-2" value={code} onChange={e => setCode(e.target.value)} placeholder="CFC/PJT Code" />
              </div>
              <div className="form-group">
                <label className="small">CFC/PJT Name</label>
                <input className="form-control form-control-sm mb-2" value={name} onChange={e => setName(e.target.value)} placeholder="CFC/PJT Name" />
              </div>
              <div className="form-group">
                <label className="small">Status</label>
                <select className="form-control form-control-sm mb-2" value={status} onChange={e => setStatus(e.target.value)}>
                  <option>Draft</option>
                  <option>Active</option>
                  <option>On Hold</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label className="small">Project Manager</label>
                <div className="input-group input-group-sm mb-2">
                  <input className="form-control form-control-sm" value={manager} onChange={e => setManager(e.target.value)} placeholder="Project Manager" />
                  <div className="input-group-append">
                    <span className="input-group-text"><i className="fas fa-user" /></span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="small">Description</label>
                <input className="form-control form-control-sm mb-2" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
              </div>
              <div className="form-group">
                <label className="small">Note</label>
                <textarea className="form-control form-control-sm mb-2" value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Note" />
              </div>
            </div>
          </div>

          {/* Add Model, Upload, Template buttons */}
          <div className="row mt-3">
            <div className="col-8">
              <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleAddModel}>
                <i className="fas fa-plus mr-1"></i> Add Model
              </button>
              <button type="button" className="btn btn-sm btn-outline-secondary mr-1"><i className="fas fa-cloud-upload-alt"></i> Upload</button>
              <button type="button" className="btn btn-sm btn-outline-secondary"><i className="fas fa-cloud-download-alt"></i> Template</button>
            </div>
          </div>

          {/* models table */}
          <div className="card mt-3">
            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-sm table-bordered mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: 40 }}>No</th>
                      <th>Model Code</th>
                      <th>Model Name</th>
                      <th>Remark</th>
                      <th style={{ width: 90 }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {models.length === 0 ? (
                      <tr><td colSpan="5" className="text-center text-muted py-4">No Data Found</td></tr>
                    ) : (
                      models.map((m, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={m.code}
                              onChange={e => handleModelChange(i, 'code', e.target.value)}
                              placeholder="Model Code"
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={m.name}
                              onChange={e => handleModelChange(i, 'name', e.target.value)}
                              placeholder="Model Name"
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={m.remark}
                              onChange={e => handleModelChange(i, 'remark', e.target.value)}
                              placeholder="Remark"
                            />
                          </td>
                          <td>
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteModel(i)}>
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
          </div>

        </div>

        <div className="card-footer text-right">
          <button type="button" className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
