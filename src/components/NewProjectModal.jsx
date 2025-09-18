// src/components/NewProjectModal.jsx
import React, { useState } from 'react';
import ModelPickerModal from './ModelPickerModal';

export default function NewProjectModal({ visible, onClose, onSave }) {
  // basic form fields
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('PxP');
  const [description, setDescription] = useState('');
  const [manager, setManager] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('Draft');
  const [note, setNote] = useState('');

  // models shown in the table
  const [models, setModels] = useState([]); // array of {code,name,remark}

  // modal state
  const [showModelPicker, setShowModelPicker] = useState(false);

  const handleOpenModelPicker = () => {
    // open picker
    console.log('Opening ModelPickerModal');
    setShowModelPicker(true);
  };
  const handleCloseModelPicker = () => {
    console.log('Closing ModelPickerModal');
    setShowModelPicker(false);
  };

  // RECEIVER: This is the important handler. ModelPickerModal will call onAdd(arrayOfModels)
  const handleAddModels = (newModels = []) => {
    console.log('handleAddModels called with:', newModels);

    if (!Array.isArray(newModels) || newModels.length === 0) {
      setShowModelPicker(false);
      return;
    }

    // avoid duplicates by model.code
    setModels((prev) => {
      const existing = new Set(prev.map((m) => m.code));
      const filtered = newModels.filter((m) => m && !existing.has(m.code));
      const result = [...prev, ...filtered];
      console.log('models after merge:', result);
      return result;
    });

    // close picker
    setShowModelPicker(false);
  };

  const handleRemoveModel = (index) => {
    setModels((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const payload = { code, name, type, description, manager, startDate, endDate, status, note, models };
    console.log('Saving project payload:', payload);
    if (onSave) onSave(payload);
  };

  if (!visible) return null;

  return (
    <>
      <div className="np-modal-backdrop" style={{ position: 'fixed', inset: 0, zIndex: 1040 }}>
        <div className="np-modal card card-outline card-primary" style={{ maxWidth: 1000, margin: '40px auto', zIndex: 1041 }}>
          <div className="card-header d-flex align-items-center">
            <h3 className="card-title mb-0"><b>ProCFC/Pjt - New</b></h3>
            <div className="card-tools ml-auto">
              <button type="button" className="btn btn-tool" aria-label="Close" onClick={onClose}><i className="fas fa-times" /></button>
            </div>
          </div>

          <div className="card-body">
            {/* basic fields (omitted for brevity, keep your original layout) */}
            <div className="row">
              <div className="col-12 col-md-6">
                <label className="small">CFC/PJT Code</label>
                <input className="form-control form-control-sm mb-2" value={code} onChange={e => setCode(e.target.value)} placeholder="286W" />
              </div>
              <div className="col-12 col-md-6">
                <label className="small">CFC/PJT Name</label>
                <input className="form-control form-control-sm mb-2" value={name} onChange={e => setName(e.target.value)} placeholder="Engine Redesign" />
              </div>
            </div>

            {/* ... keep other fields as-is ... */}
            <div className="row mt-3">
              <div className="col-8">
                <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleOpenModelPicker}>
                  <i className="fas fa-plus mr-1"></i> Add Model
                </button>
                <button type="button" className="btn btn-sm btn-outline-secondary mr-1"><i className="fas fa-cloud-upload-alt"></i></button>
                <button type="button" className="btn btn-sm btn-outline-secondary"><i className="fas fa-cloud-download-alt"></i></button>
              </div>
            </div>

            {/* models table */}
            <div className="card mt-3">
              <div className="card-body p-2">
                <div className="table-responsive">
                  <table className="table table-sm table-striped mb-0">
                    <thead>
                      <tr><th style={{ width: 50 }}>No</th><th>Model Code</th><th>Model Name</th><th>Remark</th><th style={{ width: 90 }}>Action</th></tr>
                    </thead>
                    <tbody>
                      {models.length === 0 ? (
                        <tr><td colSpan="5" className="text-center text-muted py-4">No Data Found</td></tr>
                      ) : (
                        models.map((m, i) => (
                          <tr key={m.code ?? i}>
                            <td>{i + 1}</td>
                            <td>{m.code}</td>
                            <td>{m.name}</td>
                            <td>{m.remark}</td>
                            <td>
                              <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveModel(i)}><i className="fas fa-trash" /></button>
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

      {/* ModelPickerModal stays rendered here — but it uses a portal so it renders in document.body */}
      <ModelPickerModal
        show={showModelPicker}
        onClose={handleCloseModelPicker}
        onAdd={handleAddModels}
      />
    </>
  );
}
