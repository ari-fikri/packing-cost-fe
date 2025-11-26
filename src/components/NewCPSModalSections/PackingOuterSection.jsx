import React, { useState } from 'react';

export default function PackingOuterSection(props) {
  const {
    config,
    outerRows,
    setOuterRows,
    newOuter,
    setNewOuter,
    openMaterialPicker,
  } = props;

  const [showNewRow, setShowNewRow] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOuterRow = () => {
    if (!newOuter.materialNo.trim()) {
      alert('Enter Module Type');
      return;
    }
    setOuterRows(prev => [...prev, { ...newOuter }]);
    setNewOuter({
      materialNo: '',
      materialName: '',
      dimension: { L: '', W: '', H: '' },
      volume: '',
      innerVolume: '',
    });
    setShowNewRow(false);
  };

  const handleRemoveOuterRow = (index) => {
    setOuterRows(prev => prev.filter((_, i) => i !== index));
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = outerRows.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setOuterRows(updatedRows);
  };

  const renderRow = (r, i) => {
    const isEditing = editingIndex === i;
    return (
      <tr key={i} onClick={() => !isEditing && config.editable && setEditingIndex(i)}>
        <td>{i + 1}</td>
        <td>
          {isEditing ? (
            <div className="input-group input-group-sm">
              <input
                value={r.materialNo}
                onChange={(e) => handleRowChange(i, 'materialNo', e.target.value)}
                className="form-control form-control-sm"
                disabled={!config.editable}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  type="button"
                  onClick={() => openMaterialPicker('module', i)}
                  disabled={!config.editable}
                >
                  ...
                </button>
              </div>
            </div>
          ) : (
            r.materialNo
          )}
        </td>
        <td>{r.materialName}</td>
        <td>{r.dimension.L}</td>
        <td>{r.dimension.W}</td>
        <td>{r.dimension.H}</td>
        <td>{r.innerVolume}</td>
        <td>{r.volume}</td>
        <td>
          {isEditing ? (
            <button className="btn btn-sm btn-primary" onClick={() => setEditingIndex(null)} disabled={!config.editable}>
              Save
            </button>
          ) : (
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveOuterRow(i);
              }}
              disabled={!config.editable}
            >
              <i className="fas fa-trash" />
            </button>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="row mt-3">
      <div className="col-12">
        <div className="d-flex justify-content-between align-items-center">
          <label className="small mb-1">OUTER (Module)</label>
          <div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => {
                setEditingIndex(null);
                setShowNewRow(true);
              }}
              disabled={showNewRow || !config.editable}
            >
              Add
            </button>
          </div>
        </div>
        <div className="table-responsive mt-2">
          <table className="table table-sm table-bordered mb-0 small">
            <thead>
              <tr className="text-center">
                <th style={{ width: 30 }}>No</th>
                <th>Module Type</th>
                <th>Material Name</th>
                <th style={{ width: 60 }}>L</th>
                <th style={{ width: 60 }}>W</th>
                <th style={{ width: 60 }}>H</th>
                <th>Inner (m³)</th>
                <th>Outer (m³)</th>
                <th style={{ width: 80 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {outerRows.length === 0 && !showNewRow ? (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-3">
                    No Data Found
                  </td>
                </tr>
              ) : (
                outerRows.map(renderRow)
              )}
              {showNewRow && (
                <tr>
                  <td>+</td>
                  <td>
                    <div className="input-group input-group-sm">
                      <input
                        className="form-control form-control-sm"
                        value={newOuter.materialNo}
                        onChange={(e) => setNewOuter(n => ({ ...n, materialNo: e.target.value }))}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                          onClick={() => openMaterialPicker('module', 'new')}
                          disabled={!config.editable}
                        >
                          ...
                        </button>
                      </div>
                    </div>
                  </td>
                  <td><input readOnly className="form-control form-control-sm" value={newOuter.materialName} /></td>
                  <td><input readOnly className="form-control form-control-sm" value={newOuter.dimension.L} /></td>
                  <td><input readOnly className="form-control form-control-sm" value={newOuter.dimension.W} /></td>
                  <td><input readOnly className="form-control form-control-sm" value={newOuter.dimension.H} /></td>
                  <td><input readOnly className="form-control form-control-sm" value={newOuter.innerVolume} /></td>
                  <td><input readOnly className="form-control form-control-sm" value={newOuter.volume} /></td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={handleAddOuterRow}
                        disabled={!config.editable}
                      >
                        Add
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setShowNewRow(false)}
                        disabled={!config.editable}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}