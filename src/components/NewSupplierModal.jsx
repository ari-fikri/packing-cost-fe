import React, { useState, useEffect } from 'react';

export default function NewSupplierModal({ show = false, onClose = () => {}, onSave = () => {}, initialData = null }) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (show) {
      if (initialData) {
        setCode(initialData.code || '');
        setName(initialData.name || '');
        setAddress(initialData.address || '');
      } else {
        setCode('');
        setName('');
        setAddress('');
      }
    }
  }, [show, initialData]);

  function handleSave() {
    if (!code.trim() || !name.trim()) {
      alert('Please enter Supplier Code and Name');
      return;
    }
    onSave({ code, name, address });
  }

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{initialData ? 'Edit Supplier' : 'Add Supplier'}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Supplier Code</label>
              <input
                type="text"
                className="form-control"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                readOnly={!!initialData}
              />
            </div>
            <div className="form-group">
              <label>Supplier Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                className="form-control"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1050;
        }
        .modal-dialog {
          width: 500px;
        }
      `}</style>
    </div>
  );
}