// src/components/NewProjectModal.jsx
import React, { useState, useEffect } from 'react';
import ModelPickerModal from './ModelPickerModal';

export default function NewProjectModal({ visible, onClose, onSave, initialData }) {
  // basic form fields
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Draft');
  const [manager, setManager] = useState('');
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');
  const [models, setModels] = useState([]); // array of {code,name,remark}
  const [isModelPickerVisible, setIsModelPickerVisible] = useState(false);

  useEffect(() => {
    if (initialData) {
      setCode(initialData.project_code || '');
      setName(initialData.project_name || '');
      setStatus(initialData.project_status || 'Draft');
      setManager(initialData.project_manager || '');
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
    setIsModelPickerVisible(true);
  };

  const handleSelectModels = (selected) => {
    setModels(prev => [...prev, ...selected]);
    setIsModelPickerVisible(false);
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
      <div className="np-modal card card-outline card-primary" style={{ maxWidth: 1000, margin: '40px auto', zIndex: 1041 }}>
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Project - New</b></h3>
          <div className="card-tools ml-auto">
            <button type="button" className="btn btn-tool" aria-label="Close" onClick={onClose}><i className="fas fa-times" /></button>
          </div>
        </div>

        <div className="card-body">
          {/* Two-column layout */}
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label className="small">Project Code <span style={{color: 'red'}}>*</span></label>
                <input className="form-control form-control-sm mb-2" value={code} onChange={e => setCode(e.target.value)} placeholder="Project Code" />
              </div>
              <div className="form-group">
                <label className="small">Project Name</label>
                <input className="form-control form-control-sm mb-2" value={name} onChange={e => setName(e.target.value)} placeholder="Project Name" />
              </div>
              <div className="form-group">
                <label className="small">Status <span style={{color: 'red'}}>*</span></label>
                <select className="form-control form-control-sm mb-2" value={status} onChange={e => setStatus(e.target.value)}>
                  <option>Draft</option>
                  <option>Active</option>
                  <option>On Hold</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card-body">
            {/* Two-column layout */}
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="small">Project Code</label>
                  <input className="form-control form-control-sm mb-2" value={code} onChange={e => setCode(e.target.value)} placeholder="Project Code" />
                </div>
                <div className="form-group">
                  <label className="small">Project Name</label>
                  <input className="form-control form-control-sm mb-2" value={name} onChange={e => setName(e.target.value)} placeholder="Project Name" />
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
              <div className="col-md-6">
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
          </div>

          {/* models table */}
          <div className="card mt-3">
            <div className="card-body p-2">
              <div className="row mb-2">
                <div className="col-12">
                  <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleAddModel}>
                    <i className="fas fa-plus mr-1"></i> Add Model
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-secondary mr-1"><i className="fas fa-cloud-upload-alt"></i> Upload</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary"><i className="fas fa-cloud-download-alt"></i> Template</button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-sm table-bordered mb-0">
                  <thead>
                    <tr>
                      <th style={{ width: 40, textAlign: 'center' }}>No</th>
                      <th style={{ textAlign: 'center' }}>Model Code</th>
                      <th style={{ textAlign: 'center' }}>CFC</th>
                      <th style={{ textAlign: 'center' }}>Model Name</th>
                      <th style={{ textAlign: 'center' }}>Impl. Period</th>
                      <th style={{ textAlign: 'center' }}>Dest. Code</th>
                      <th style={{ textAlign: 'center' }}>Type</th>
                      <th style={{ textAlign: 'center' }}>Remark</th>
                      <th style={{ width: 90, textAlign: 'center' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {models.length === 0 ? (
                      <tr><td colSpan="9" className="text-center text-muted py-4">No Data Found</td></tr>
                    ) : (
                      models.map((m, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={m.model_code}
                              onChange={e => handleModelChange(i, 'model_code', e.target.value)}
                              placeholder="Model Code"
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={m.model_cfc}
                              onChange={e => handleModelChange(i, 'model_cfc', e.target.value)}
                              placeholder="CFC"
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={m.model_name}
                              onChange={e => handleModelChange(i, 'model_name', e.target.value)}
                              placeholder="Model Name"
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={m.model_implementation_period}
                              onChange={e => handleModelChange(i, 'model_implementation_period', e.target.value)}
                              placeholder="Implementation Period"
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={m.model_destination_code}
                              onChange={e => handleModelChange(i, 'model_destination_code', e.target.value)}
                              placeholder="Destination Code"
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={m.model_type}
                              onChange={e => handleModelChange(i, 'model_type', e.target.value)}
                              placeholder="Type"
                              readOnly
                            />
                          </td>
                          <td>
                            <input
                              className="form-control form-control-sm"
                              value={m.model_remark}
                              onChange={e => handleModelChange(i, 'model_remark', e.target.value)}
                              placeholder="Remark"
                              readOnly
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

          <div className="card-footer text-right">
            <button type="button" className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
      <ModelPickerModal
        show={isModelPickerVisible}
        onClose={() => setIsModelPickerVisible(false)}
        onAdd={handleSelectModels}
      />
    </>
  );
}